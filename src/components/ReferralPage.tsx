import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  Percent, 
  TrendingUp, 
  Gift, 
  Heart, 
  Sparkles, 
  Zap, 
  Crown, 
  MessageSquare, 
  Users, 
  ArrowLeft, 
  Copy, 
  X,
  Share2,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReferralPageProps {
  isOpen: boolean;
  onClose: () => void;
  onNotification?: (msg: string) => void;
}

export default function ReferralPage({ isOpen, onClose, onNotification }: ReferralPageProps) {
  const [step, setStep] = useState<'select' | 'lucrar' | 'presentear'>('select');
  const [vagasPresente, setVagasPresente] = useState(10);
  const [vagasLucro, setVagasLucro] = useState(10);

  // States to track coupon generation
  const [isGeneratingPresente, setIsGeneratingPresente] = useState(false);
  const [presenteCoupon, setPresenteCoupon] = useState<string | null>(null);

  const [isGeneratingLucro, setIsGeneratingLucro] = useState(false);
  const [lucroCoupon, setLucroCoupon] = useState<string | null>(null);

  // Reset modal state when opened/closed
  useEffect(() => {
    if (isOpen) {
      setStep('select');
      setPresenteCoupon(null);
      setLucroCoupon(null);
    }
  }, [isOpen]);

  // Escape key handler to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const triggerToast = (msg: string) => {
    if (onNotification) {
      onNotification(msg);
    }
  };

  const handleCopyText = (text: string, successMsg: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(successMsg);
  };

  const handleStartPresenteGeneration = () => {
    setIsGeneratingPresente(true);
    setPresenteCoupon(null);
    setTimeout(() => {
      setPresenteCoupon("ISAAC10");
      setIsGeneratingPresente(false);
      triggerToast("Cupom presente criado com sucesso! 🎁");
    }, 1200);
  };

  const handleStartLucroGeneration = () => {
    setIsGeneratingLucro(true);
    setLucroCoupon(null);
    setTimeout(() => {
      setLucroCoupon("ISAAC10");
      setIsGeneratingLucro(false);
      triggerToast("Cupom de lucros configurado com sucesso! 💰");
    }, 1200);
  };

  const handleBackToSelect = () => {
    setStep('select');
    setPresenteCoupon(null);
    setLucroCoupon(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-[6px] z-[120] flex items-center justify-center p-4 font-['Space_Grotesk'] select-none"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full max-w-lg bg-white dark:bg-[#0e0f14] border border-neutral-200 dark:border-white/[0.08] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Redesigned Header with Gradient */}
          <div className="relative bg-gradient-to-br from-[#D0011B] to-[#9B0014] pt-8 pb-10 px-6 overflow-hidden">
            {/* Ambient effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-10 -mb-10" />
            
            <div className="relative z-10 text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest shadow-sm">
                <Sparkles size={11} className="text-white" />
                <span>Indique e Ganhe</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tighter leading-none mb-1">
                {step === 'select' ? 'Expanda sua Rede' : step === 'presentear' ? 'Presentear Amigo' : 'Modo Lucrativo'}
              </h2>
              <p className="text-[11px] text-white/80 font-bold uppercase tracking-[0.15em] leading-none">
                {step === 'select' ? 'Escolha sua estratégia de indicação' : 'Transforme conexões em resultados'}
              </p>
            </div>

            {/* Close button with better contrast */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer border border-white/10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Main content area with negative margin overlay */}
          <div className="relative -mt-5 bg-white dark:bg-[#0e0f14] rounded-t-[24px] p-6 pt-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: CHOOSE INDICATION MODE */}
              {step === 'select' && (
                <motion.div
                  key="select-screen"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4"
                >
                  <p className="text-[10px] font-black text-neutral-400 dark:text-gray-500 uppercase tracking-widest block font-sans ml-1 text-center mb-5">
                    Como você deseja proceder hoje?
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Option 1: Lucrar */}
                    <button
                      onClick={() => setStep('lucrar')}
                      className="group relative flex flex-col p-5 bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.05] hover:border-[#D0011B]/40 rounded-2xl transition-all duration-300 hover:shadow-[0_12px_32px_rgba(208,1,27,0.08)] cursor-pointer overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-[#D0011B]/10 flex items-center justify-center">
                          <Plus size={14} className="text-[#D0011B]" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D0011B]/10 to-[#D0011B]/5 border border-[#D0011B]/20 flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110">
                          <TrendingUp className="text-[#D0011B]" size={22} />
                        </div>
                        <div className="text-left">
                          <h3 className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-tight group-hover:text-[#D0011B] transition-colors">
                            Lucrar com Indicação
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] font-black text-emerald-500 uppercase">Ganhos de 50%</span>
                            <div className="w-1 h-1 rounded-full bg-neutral-300" />
                            <span className="text-[10px] font-bold text-neutral-400 uppercase">Recorrente</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-gray-400 font-medium leading-relaxed text-left pl-1">
                        Sua conexão assina com <span className="text-[#D0011B] font-bold">40% de desconto</span> e você recebe <span className="text-emerald-500 font-bold">50% de comissão</span> em todas as mensalidades.
                      </p>
                    </button>

                    {/* Option 2: Presentear */}
                    <button
                      onClick={() => setStep('presentear')}
                      className="group relative flex flex-col p-5 bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.05] hover:border-[#D0011B]/40 rounded-2xl transition-all duration-300 hover:shadow-[0_12px_32px_rgba(208,1,27,0.08)] cursor-pointer overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-[#D0011B]/10 flex items-center justify-center">
                          <Gift size={14} className="text-[#D0011B]" />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D0011B]/10 to-[#D0011B]/5 border border-[#D0011B]/20 flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110">
                          <Heart className="text-[#D0011B] fill-[#D0011B]/10" size={22} />
                        </div>
                        <div className="text-left">
                          <h3 className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-tight group-hover:text-[#D0011B] transition-colors">
                            Presentear Amigo
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] font-black text-[#D0011B] uppercase">Acesso Premium</span>
                            <div className="w-1 h-1 rounded-full bg-neutral-300" />
                            <span className="text-[10px] font-bold text-neutral-400 uppercase">Créditos Infinitos</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-gray-400 font-medium leading-relaxed text-left pl-1">
                        Seu amigo recebe <span className="text-[#D0011B] font-bold">créditos infinitos</span> + <span className="text-[#D0011B] font-bold">40% OFF</span>. Você doa sua comissão para potencializar o presente.
                      </p>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: GIFT FLOW */}
              {step === 'presentear' && (
                <motion.div
                  key="presentear-screen"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <button
                    onClick={handleBackToSelect}
                    className="group inline-flex items-center gap-2 text-[10px] font-black text-neutral-400 hover:text-[#D0011B] transition-colors uppercase tracking-widest pl-1"
                  >
                    <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                    <span>Voltar para Modos</span>
                  </button>

                  <div className="bg-neutral-50 dark:bg-white/[0.01] border border-neutral-200 dark:border-white/[0.05] rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-200/50 dark:border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-[#D0011B]/10 flex items-center justify-center text-[#D0011B]">
                        <Users size={16} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-tight">Configurar Vagas</h4>
                        <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Limite de 1 a 10 pessoas</p>
                      </div>
                      <div className="px-3 py-1 bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-lg text-sm font-black text-[#D0011B]">
                        {vagasPresente}
                      </div>
                    </div>

                    <div className="px-2 pt-2">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={vagasPresente}
                        onChange={(e) => {
                          setVagasPresente(Number(e.target.value));
                          if (presenteCoupon) setPresenteCoupon(null);
                        }}
                        className="w-full h-1.5 rounded-lg appearance-auto bg-neutral-200 dark:bg-neutral-800 accent-[#D0011B] cursor-pointer outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleStartPresenteGeneration}
                      disabled={isGeneratingPresente}
                      className="btn-custom w-full font-black text-sm tracking-wide py-4 relative overflow-hidden transition-all duration-300 transform active:scale-95 shadow-[0_8px_20px_rgba(208,1,27,0.15)]"
                    >
                      {isGeneratingPresente ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                          <span>Gerando Experiência...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} className="text-white shrink-0" />
                          <span>Gerar Cupom de Presente</span>
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {presenteCoupon && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-2"
                        >
                          <div className="bg-white dark:bg-black/40 rounded-2xl border-2 border-dashed border-[#D0011B]/30 p-5 space-y-4 shadow-inner">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black text-[#D0011B] uppercase tracking-widest bg-[#D0011B]/10 px-2 py-0.5 rounded">Código Gerado</span>
                              <div className="flex items-center gap-1">
                                <Crown size={12} className="text-amber-500" />
                                <span className="text-[9px] font-black text-amber-500 uppercase">Créditos Infinitos</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-2xl font-black tracking-[0.2em] text-neutral-900 dark:text-white font-mono">{presenteCoupon}</span>
                              <button
                                onClick={() => handleCopyText(presenteCoupon, "Cupom presente copiado! 🎁")}
                                className="p-2.5 rounded-xl bg-[#D0011B] text-white hover:bg-[#9B0014] transition-colors shadow-lg active:scale-90"
                              >
                                <Copy size={18} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: LUCRAR FLOW */}
              {step === 'lucrar' && (
                <motion.div
                  key="lucrar-screen"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <button
                    onClick={handleBackToSelect}
                    className="group inline-flex items-center gap-2 text-[10px] font-black text-neutral-400 hover:text-[#D0011B] transition-colors uppercase tracking-widest pl-1"
                  >
                    <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                    <span>Voltar para Modos</span>
                  </button>

                  <div className="bg-neutral-50 dark:bg-white/[0.01] border border-neutral-200 dark:border-white/[0.05] rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-200/50 dark:border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-[#D0011B]/10 flex items-center justify-center text-[#D0011B]">
                        <Zap size={16} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-tight">Ativar Canal</h4>
                        <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Configure até 10 slots</p>
                      </div>
                      <div className="px-3 py-1 bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-lg text-sm font-black text-[#D0011B]">
                        {vagasLucro}
                      </div>
                    </div>

                    <div className="px-2 pt-2">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={vagasLucro}
                        onChange={(e) => {
                          setVagasLucro(Number(e.target.value));
                          if (lucroCoupon) setLucroCoupon(null);
                        }}
                        className="w-full h-1.5 rounded-lg appearance-auto bg-neutral-200 dark:bg-neutral-800 accent-[#D0011B] cursor-pointer outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleStartLucroGeneration}
                      disabled={isGeneratingLucro}
                      className="btn-custom w-full font-black text-sm tracking-wide py-4 relative overflow-hidden transition-all duration-300 transform active:scale-95 shadow-[0_8px_20px_rgba(208,1,27,0.15)]"
                    >
                      {isGeneratingLucro ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                          <span>Configurando Ganhos...</span>
                        </>
                      ) : (
                        <>
                          <Coins size={16} className="text-white shrink-0" />
                          <span>Ativar Cupom de Parceiro</span>
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {lucroCoupon && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-2"
                        >
                          <div className="bg-white dark:bg-black/40 rounded-2xl border-2 border-dashed border-emerald-500/30 p-5 space-y-4 shadow-inner">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">Ativado com Sucesso</span>
                              <div className="flex items-center gap-1">
                                <TrendingUp size={12} className="text-emerald-500" />
                                <span className="text-[9px] font-black text-emerald-500 uppercase">50% Recorrente</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-2xl font-black tracking-[0.2em] text-neutral-900 dark:text-white font-mono">{lucroCoupon}</span>
                              <button
                                onClick={() => handleCopyText(lucroCoupon, "Cupom de parceiro copiado! 💰")}
                                className="p-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg active:scale-90"
                              >
                                <Copy size={18} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
            
            <p className="text-[9px] text-neutral-400 font-extrabold uppercase tracking-widest text-center pt-4">
              Cada indicação fortalece a comunidade ShopSpy
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
