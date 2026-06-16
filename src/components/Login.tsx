import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, ArrowLeft, Mail, Lock, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onLogin: () => void;
  onBack?: () => void;
}

export default function Login({ onLogin, onBack }: LoginProps) {
  const [activeTab, setActiveTab] = useState<'entrar' | 'criar'>('entrar');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<string | null>(null);

  const handleLogin = async () => {
    setErrorMsg('');
    setIsLoading(true);

    // Fallback para acesso legado/demonstração
    const normalizedEmail = email.toLowerCase().trim();
    if (
      (normalizedEmail === 'shopspy123@gmail.com' && password === 'shopspy123') ||
      (normalizedEmail === 'usuarioshopspy765@gmail.com')
    ) {
      localStorage.setItem('shopspy_auth', 'true');
      localStorage.setItem('shopspy_plan', 'vitalicio');
      onLogin();
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        setErrorMsg('E-mail ou senha incorretos');
        setIsLoading(false);
        return;
      }

      // 2. Verificar se usuário está ativo na nossa tabela de vendas
      console.log('Verificando usuário no DB para o ID:', data.user.id);
      let { data: userData, error: dbError } = await supabase
        .from('users_shopspy')
        .select('id, is_active, plan, plan_expires_at')
        .eq('id', data.user.id)
        .maybeSingle();

      // Se não achar por ID, tenta por e-mail (sincronização de leads/vendas)
      if (!userData && data.user.email) {
        console.log('Usuário não encontrado por ID. Tentando por e-mail:', data.user.email);
        const { data: leadData, error: leadError } = await supabase
          .from('users_shopspy')
          .select('id, is_active, plan, plan_expires_at')
          .eq('email', data.user.email.toLowerCase().trim())
          .maybeSingle();
        
        if (leadData) {
          console.log('Encontrado registro por e-mail. Sincronizando ID...');
          const { error: syncError } = await supabase
            .from('users_shopspy')
            .update({ id: data.user.id })
            .eq('email', data.user.email.toLowerCase().trim());
          
          if (syncError) {
            console.error('Erro ao sincronizar ID:', syncError.message);
          } else {
            userData = { ...leadData, id: data.user.id };
            dbError = null;
            console.log('Sincronização concluída com sucesso!');
          }
        } else if (leadError) {
          console.error('Erro ao buscar por e-mail:', leadError.message);
        } else {
          console.log('Nenhum registro encontrado para este e-mail no sistema de vendas.');
        }
      }

      if (dbError || !userData) {
        setErrorMsg('E-mail não encontrado no sistema de vendas. Se você comprou com outro e-mail, use-o para entrar.');
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      // Garantir que o plano do usuário seja atualizado para Vitalício
      if (userData && userData.plan !== 'vitalicio') {
        const { error: updateError } = await supabase
          .from('users_shopspy')
          .update({ plan: 'vitalicio', plan_expires_at: null, is_active: true })
          .eq('id', data.user.id);
        
        if (!updateError) {
          userData.plan = 'vitalicio';
          userData.plan_expires_at = null;
          userData.is_active = true;
        }
      }

      if (dbError || !userData) {
        setErrorMsg('Conta não encontrada. Entre em contato com o suporte.');
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      if (!userData.is_active) {
        setErrorMsg('Sua conta está inativa. Entre em contato com o suporte.');
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      // Verificar expiração do plano mensal
      if (userData.plan === 'mensal' && userData.plan_expires_at) {
        const expired = new Date(userData.plan_expires_at) < new Date();
        if (expired) {
          setErrorMsg('Seu acesso expirou. Renove seu plano para continuar.');
          await supabase.auth.signOut();
          setIsLoading(false);
          return;
        }
      }

      localStorage.setItem('shopspy_auth', 'true');
      localStorage.setItem('shopspy_plan', userData.plan);
      onLogin();
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocorreu um erro ao entrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Verificar se email existe na tabela users_shopspy (foi liberado pelo webhook)
      const { data: userData, error: userError } = await supabase
        .from('users_shopspy')
        .select('id, email, is_active, plan')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();

      if (userError) throw userError;

      if (!userData) {
        console.warn('Registro: e-mail não encontrado na tabela users_shopspy:', email);
        setErrorMsg('E-mail não encontrado no sistema de vendas. Verifique se usou o mesmo e-mail da compra ou se o pagamento foi concluído.');
        setIsLoading(false);
        return;
      }

      if (!userData.is_active) {
        setErrorMsg('Sua conta está inativa. Entre em contato com o suporte.');
        setIsLoading(false);
        return;
      }

      // 2. Tentar criar a conta (Sign Up)
      // Se o usuário já foi criado pelo webhook no Auth, o signUp pode retornar erro de "User already registered"
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: {
            name: name,
            plan: userData.plan
          }
        }
      });

      // 2. Tentar criar a conta via Edge Function (para garantir confirmação instantânea)
      const { data: createData, error: createError } = await supabase.functions.invoke('create-user', {
        body: { 
          email: email.toLowerCase().trim(), 
          password, 
          name, 
          plan: userData.plan 
        }
      });

      if (createError || createData?.error) {
        throw new Error(createError?.message || createData?.error || 'Erro ao criar conta');
      }

      // 3. Fazer login
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password
      });

      if (loginError) {
        if (loginError.message.toLowerCase().includes('invalid login credentials')) {
          setErrorMsg('Erro ao autenticar. Verifique sua senha ou use a recuperação de senha.');
        } else {
          throw loginError;
        }
        setIsLoading(false);
        return;
      }

      // 4. Vincular o ID do Auth com o registro na tabela users_shopspy
      const authUserId = loginData.user?.id;
      if (authUserId) {
        await supabase
          .from('users_shopspy')
          .update({ id: authUserId })
          .eq('email', email.toLowerCase().trim());
      }

      // 5. Configurar sessão local
      localStorage.setItem('shopspy_auth', 'true');
      localStorage.setItem('shopspy_is_admin', 'false');
      localStorage.setItem('shopspy_user_email', email.toLowerCase().trim());
      localStorage.setItem('shopspy_plan', userData.plan);
      localStorage.setItem('shopspy_notifications_enabled', 'false');
      onLogin();

    } catch (err: any) {
      console.error('Erro no registro:', err);
      setErrorMsg(err.message || 'Erro ao processar sua conta. Tente novamente mais tarde.');
    }

    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'entrar') {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleForgotPassword = () => {
    alert('Caso tenha esquecido sua senha, por favor entre em contato com nosso suporte para redefinição segura.');
  };

  return (
    <div className="min-h-screen bg-[#fcfbfc] flex items-center justify-center relative overflow-hidden font-sans select-none text-gray-900">
      {/* Decorative Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#D0011B]/4 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#D0011B]/4 blur-[130px] pointer-events-none" />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(#d1d1d1 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="w-[430px] max-w-[calc(100%-32px)] z-10 py-8">
        
        {/* TITLES & LOGOS ABOVE THE CARD MATCHING SCREENSHOT EXACTLY */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="flex items-center justify-center mb-4 transition-transform hover:scale-105 duration-300">
            <img 
              src="https://i.postimg.cc/yxg1xsb5/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png" 
              alt="ShopSpy Logo" 
              className="h-9 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <h2 className="text-[26px] font-black tracking-tight text-gray-900 m-0">
            {activeTab === 'entrar' ? 'Welcome to ShopSpy' : 'Welcome to ShopSpy'}
          </h2>
          <p className="text-[13px] text-gray-500 font-medium mt-1 leading-normal max-w-[280px]">
            {activeTab === 'entrar' ? 'Entre para continuar criando' : 'Crie sua conta e comece a criar'}
          </p>
        </div>

        {/* CONTAINER CARD */}
        <motion.div 
          layout
          className="bg-white border border-gray-200/80 rounded-[24px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(208,1,27,0.04),0_10px_30px_rgba(0,0,0,0.02)] backdrop-blur-md relative overflow-hidden"
        >
          {/* BOTÃO VOLTAR */}
          {onBack && (
            <button 
              onClick={onBack}
              className="absolute top-6 left-6 text-gray-400 hover:text-gray-800 transition-colors flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-transparent border-none cursor-pointer"
            >
              <ArrowLeft size={12} />
              Voltar
            </button>
          )}

          {/* TAB BAR SELECTOR MATCHING MOCKUP */}
          <div style={{
            display: 'flex',
            background: 'rgba(50,50,50,0.06)',
            borderRadius: 10,
            padding: 4,
            marginBottom: 24
          }}>
            <button
              type="button"
              onClick={() => { setActiveTab('entrar'); setErrorMsg(''); setAlertInfo(null); }}
              style={{
                flex: 1, padding: '8px', borderRadius: 8,
                background: activeTab === 'entrar' ? '#D0011B' : 'transparent',
                color: activeTab === 'entrar' ? 'white' : '#666', 
                fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('criar'); setErrorMsg(''); setAlertInfo(null); }}
              style={{
                flex: 1, padding: '8px', borderRadius: 8,
                background: activeTab === 'criar' ? '#D0011B' : 'transparent',
                color: activeTab === 'criar' ? 'white' : '#666', 
                fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Criar conta
            </button>
          </div>

          {/* REGISTER ALERT BOX WITH SHIELD MATCHING MOCKUP */}
          <AnimatePresence mode="wait">
            {activeTab === 'criar' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#D0011B]/5 border border-[#D0011B]/10 rounded-xl p-3.5 flex items-start gap-3 mb-5 overflow-hidden"
              >
                <ShieldCheck size={18} className="text-[#D0011B] shrink-0 mt-0.5 animate-pulse" />
                <div className="text-[11px] leading-relaxed text-gray-600">
                  <strong className="text-gray-900 block font-black uppercase tracking-wider text-[9px] mb-0.5">Acesso Exclusivo Garantido</strong>
                  Acesso exclusivo para quem já adquiriu a plataforma. Use o <span className="text-[#D0011B] font-bold">mesmo e-mail</span> da compra no checkout para liberar sua conta imediatamente.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* NAME FIELD (REGISTER EXCLUSIVE) */}
            <AnimatePresence>
              {activeTab === 'criar' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <label className="text-[10px] text-gray-500 uppercase font-black tracking-wider block">Nome</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <User size={16} />
                    </span>
                    <input 
                      type="text" 
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-[12px] pl-11 pr-4 py-3.5 text-gray-900 text-[13px] placeholder-gray-400 focus:placeholder-gray-400 transition-all duration-200 outline-none focus:bg-white focus:border-[#D0011B] focus:ring-4 focus:ring-[#D0011B]/5"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* EMAIL FIELD */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-500 uppercase font-black tracking-wider block">E-mail da compra</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={16} />
                </span>
                <input 
                  type="email" 
                  placeholder="voce@email.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[12px] pl-11 pr-4 py-3.5 text-gray-900 text-[13px] placeholder-gray-400 focus:placeholder-gray-400 transition-all duration-200 outline-none focus:bg-white focus:border-[#D0011B] focus:ring-4 focus:ring-[#D0011B]/5"
                />
              </div>
            </div>

            {/* PASSWORD FIELD */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-gray-500 uppercase font-black tracking-wider">
                  {activeTab === 'entrar' ? 'Senha' : 'Criar senha'}
                </label>
                {activeTab === 'entrar' && (
                  <button 
                    type="button" 
                    onClick={handleForgotPassword}
                    className="text-[10px] text-gray-400 hover:text-[#D0011B] transition-colors border-none bg-transparent cursor-pointer font-bold uppercase tracking-wider font-sans"
                  >
                    Esqueci minha senha
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={16} />
                </span>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[12px] pl-11 pr-11 py-3.5 text-gray-900 text-[13px] placeholder-gray-400 focus:placeholder-gray-400 transition-all duration-200 outline-none focus:bg-white focus:border-[#D0011B] focus:ring-4 focus:ring-[#D0011B]/5"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-none cursor-pointer"
                  type="button"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD FIELD (REGISTER EXCLUSIVE) */}
            <AnimatePresence>
              {activeTab === 'criar' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <label className="text-[10px] text-gray-500 uppercase font-black tracking-wider block">Confirmar senha</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock size={16} />
                    </span>
                    <input 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-[12px] pl-11 pr-11 py-3.5 text-gray-900 text-[13px] placeholder-gray-400 focus:placeholder-gray-400 transition-all duration-200 outline-none focus:bg-white focus:border-[#D0011B] focus:ring-4 focus:ring-[#D0011B]/5"
                    />
                    <button 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-none cursor-pointer"
                      type="button"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ERROR ALERTS */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2.5 overflow-hidden text-red-600"
                >
                  <AlertCircle size={16} className="text-red-500 shrink-0" />
                  <span className="text-xs font-bold">{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* INFO ALERTS */}
            <AnimatePresence>
              {alertInfo && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 overflow-hidden text-emerald-600"
                >
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-xs font-bold">{alertInfo}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SUBMIT BUTTON COPIED EXACTLY FROM THE LANDING PAGE - SHINY, GLOSSY PREMIUM STYLE */}
            <button 
              type="submit"
              disabled={isLoading}
              className="btn-custom w-full relative overflow-hidden group py-3 rounded-xl cursor-pointer shadow-lg active:scale-[0.98] transition-all border-none outline-none select-none mt-2 flex items-center justify-center min-h-[48px] !text-xs !font-black uppercase tracking-wider"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  <span>{activeTab === 'entrar' ? 'Entrar' : 'Liberar minha conta'}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* LOWER SECTION */}
          <div className="mt-6 text-center">
            <p className="text-[12px] text-gray-500 font-medium m-0">
              {activeTab === 'entrar' ? (
                <>
                  Não tem conta?{' '}
                  <button 
                    onClick={() => { setActiveTab('criar'); setErrorMsg(''); }}
                    className="text-[#D0011B] font-bold hover:underline bg-transparent border-none cursor-pointer"
                  >
                    Criar conta
                  </button>
                </>
              ) : (
                <>
                  Já tem conta?{' '}
                  <button 
                    onClick={() => { setActiveTab('entrar'); setErrorMsg(''); }}
                    className="text-[#D0011B] font-bold hover:underline bg-transparent border-none cursor-pointer"
                  >
                    Entrar
                  </button>
                </>
              )}
            </p>
          </div>
        </motion.div>

        {/* FOOTER */}
        <p className="text-[10px] text-gray-400 text-center mt-6 leading-relaxed px-4">
          Ao continuar, você concorda com nossos{' '}
          <a href="#" className="hover:text-gray-700 underline text-gray-400 transition-colors">Termos</a>{' '}
          e{' '}
          <a href="#" className="hover:text-gray-700 underline text-gray-400 transition-colors">Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
}
