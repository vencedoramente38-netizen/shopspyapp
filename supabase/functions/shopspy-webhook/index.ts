import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  let payload: any
  let transactionId = ''

  try {
    payload = await req.json()
    console.log('--- SHOPSPY WEBHOOK RECEIVED ---')

    const event = String(
      payload.event_type || payload.event || payload.type || ''
    ).toLowerCase()

    transactionId = String(
      payload.sale_id || payload.id ||
      payload.transaction?.id || payload.purchase?.id ||
      payload.identifier || 'NO_TRANS_ID'
    )

    console.log(`Event: ${event} | Transaction: ${transactionId}`)

    // Log webhook
    const { data: logData } = await supabase
      .from('webhook_logs_shopspy')
      .insert({ event_type: event, payload, processed: false })
      .select()
    const logId = logData?.[0]?.id

    // Extrair dados do cliente de forma mais robusta (case-insensitive e múltiplos campos)
    const findValue = (obj: any, ...keys: string[]) => {
      for (const key of keys) {
        if (obj && obj[key]) return obj[key];
        // Busca case-insensitive
        const found = Object.keys(obj || {}).find(k => k.toLowerCase() === key.toLowerCase());
        if (found) return obj[found];
      }
      return null;
    };

    const customer = payload.customer || payload.buyer || payload.client || payload.Customer || payload.Client || {};
    
    // Tenta encontrar o email em várias fontes comuns
    let rawEmail = findValue(customer, 'email', 'customer_email', 'client_email') || 
                   findValue(payload, 'email', 'customer_email', 'client_email', 'buyer_email');
    
    // Tenta encontrar o nome em várias fontes comuns
    let rawName = findValue(customer, 'name', 'customer_name', 'client_name', 'first_name') || 
                  findValue(payload, 'name', 'customer_name', 'client_name', 'full_name') || 
                  'Usuário ShopSpy';

    // Se o email extraído não contiver '@', pode ser que pegou o nome por engano (alguns provedores trocam os campos)
    if (rawEmail && !rawEmail.includes('@') && rawName && rawName.includes('@')) {
      console.log('Detectada troca de campos Email/Nome. Corrigindo...');
      const temp = rawEmail;
      rawEmail = rawName;
      rawName = temp;
    }

    const email = String(rawEmail || '').toLowerCase().trim();
    const name = String(rawName || '').trim();

    console.log(`Dados Extraídos -> Email: ${email} | Nome: ${name}`);

    if (!email || !email.includes('@')) {
      console.warn('Webhook rejeitado: Email ausente ou inválido:', JSON.stringify(payload));
      return new Response(JSON.stringify({ success: false, message: 'Invalid or missing email' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200
      })
    }

    // Extrair valor pago
    let amount = 0
    if (payload.total_price && typeof payload.total_price === 'string') {
      amount = Number(payload.total_price.replace(/[^\d.-]/g, '').replace(',', '.'))
    } else {
      amount = Number(
        payload.amount || payload.transaction?.amount ||
        payload.purchase?.amount || payload.price || 0
      )
    }

    // LÓGICA DE PLANO:
    // R$ 147 ou menos = mensal (30 dias)
    // R$ 297 ou mais = vitalício (sem expiração)
    const isVitalicio = amount >= 290 ||
      String(payload.product?.name || '').toLowerCase().includes('vitalicio') ||
      String(payload.product?.name || '').toLowerCase().includes('vitalício') ||
      String(payload.product?.name || '').toLowerCase().includes('lifetime')

    const plan = isVitalicio ? 'vitalicio' : 'mensal'
    const expiresAt = isVitalicio
      ? null
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

    const defaultPassword = 'shopspy12345'

    console.log(`Email: ${email} | Plano: ${plan} | Valor: R$${amount}`)

    // Verificar eventos de compra aprovada
    const isPurchaseApproved =
      event === 'purchase.approved' ||
      event === 'sale_approved' ||
      event === 'sale.approved' ||
      event === 'subscription.activated' ||
      event === 'transaction_paid' ||
      event === 'order_approved' ||
      (payload.status && String(payload.status).toLowerCase() === 'approved') ||
      (payload.transaction?.status && String(payload.transaction.status).toLowerCase() === 'completed')

    if (isPurchaseApproved) {
      // Verificar se já existe na tabela
      const { data: existingUser } = await supabase
        .from('users_shopspy')
        .select('id, email')
        .eq('email', email)
        .maybeSingle();

      if (!existingUser) {
        // Criar usuário no Auth com senha temporária
        const tempPassword = `temp_${Date.now()}_shopspy`;
        const { data: newAuthUser, error: authError } = await supabase.auth.admin.createUser({
          email,
          password: tempPassword,
          email_confirm: true,
          user_metadata: { name, plan, needs_password_reset: true }
        });

        const userId = newAuthUser?.user?.id;

        if (userId) {
          // Inserir na tabela liberando o email
          await supabase.from('users_shopspy').insert({
            id: userId,
            email,
            name,
            plan,
            plan_expires_at: expiresAt,
            is_active: true,
            transaction_id: transactionId,
            customer_name: name
          });
        }
      } else {
        // Atualizar plano se já existir
        await supabase.from('users_shopspy')
          .update({ plan, plan_expires_at: expiresAt, is_active: true })
          .eq('email', email);
      }
    }

    // Renovação de assinatura
    else if (event === 'subscription.renewed' || event === 'sale.renewed') {
      const newExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      await supabase.from('users_shopspy')
        .update({ plan_expires_at: newExpiry, is_active: true })
        .eq('email', email)
      console.log(`Renovação processada: ${email}`)
    }

    // Cancelamento ou reembolso
    else if (
      event === 'subscription.canceled' ||
      event === 'subscription.expired' ||
      event === 'sale.refunded' ||
      event === 'sale.chargeback'
    ) {
      await supabase.from('users_shopspy')
        .update({ is_active: false })
        .eq('email', email)
      console.log(`Cancelamento processado: ${email}`)
    }

    // Marcar log como processado
    if (logId) {
      await supabase.from('webhook_logs_shopspy')
        .update({ processed: true })
        .eq('id', logId)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Webhook processado com sucesso' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (err: any) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    console.error('ERRO CRÍTICO:', errorMsg)

    try {
      await supabase.from('webhook_logs_shopspy').insert({
        event_type: 'error',
        payload: payload || {},
        processed: false,
        error: errorMsg
      })
    } catch (e) {
      console.error('Erro ao salvar log de erro:', e)
    }

    return new Response(
      JSON.stringify({ success: true, error: errorMsg }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  }
})
