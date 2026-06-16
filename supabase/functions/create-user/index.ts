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

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { email, password, name, plan } = await req.json()

    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios')
    }

    console.log(`Criando conta para: ${email}`)

    // 1. Criar usuário no Auth já confirmado
    const { data: userData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, plan }
    })

    if (authError) {
      // Se o erro for que o usuário já existe, não tem problema, retornamos sucesso
      if (authError.message.includes('already registered') || authError.message.includes('already exists')) {
        return new Response(JSON.stringify({ success: true, message: 'Usuário já existe' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200
        })
      }
      throw authError
    }

    return new Response(JSON.stringify({ success: true, user: userData.user }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400
    })
  }
})
