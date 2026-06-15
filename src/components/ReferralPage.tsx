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
  Share2
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
          {/* Subtle Red radial gloss filter */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#d0011b]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-lg bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-500 hover:text-neutral-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>

          {/* Scrollable Container */}
          <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: CHOOSE INDICATION MODE */}
              {step === 'select' && (
                <motion.div
                  key="select-screen"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6 pt-2"
                >
                  {/* Badge & Typography header */}
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d0011b]/10 border border-[#d0011b]/20 text-[#d0011b] text-[10px] font-black uppercase tracking-wider">
                      <Share2 size={11} className="text-[#d0011b]" />
                      <span>Escolha como quer indicar</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight gradient-title leading-none">
                      Indique amigos
                    </h2>
                    <p className="text-[11px] text-neutral-500 dark:text-gray-400 font-bold max-w-sm mx-auto leading-relaxed uppercase tracking-wide">
                      e escolha o que faz mais sentido para você
                    </p>
                  </div>

                  {/* Body selection links */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-neutral-400 dark:text-gray-500 uppercase tracking-widest block font-sans">
                      COMO VOCÊ QUER INDICAR?
                    </p>

                    {/* Button 1: QUERO LUCRAR COM A INDICAÇÃO */}
                    <button
                      onClick={() => setStep('lucrar')}
                      className="w-full text-left bg-neutral-50 hover:bg-neutral-100/70 dark:bg-[#15161b] dark:hover:bg-[#1e1f26] border border-neutral-200 dark:border-white/[0.05] hover:border-[#d0011b]/30 dark:hover:border-[#d0011b]/30 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.005] cursor-pointer group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#d0011b]/10 border border-[#d0011b]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <TrendingUp className="text-[#d0011b]" size={18} />
                      </div>
                      <div className="space-y-0.5 pr-1">
                        <h3 className="text-xs font-black text-neutral-900 dark:text-white group-hover:text-[#d0011b] uppercase tracking-wide flex items-center gap-1.5 transition-colors">
                          Quero lucrar com a indicação
                          <Zap size={11} className="text-[#d0011b]" />
                        </h3>
                        <p className="text-[10.5px] text-neutral-600 dark:text-gray-400 font-semibold leading-normal">
                          Você recebe <b className="text-[#d0011b]">50% do valor</b> da compra e seu amigo ganha <b className="text-[#d0011b]">40% de desconto</b> na assinatura.
                        </p>
                      </div>
                    </button>

                    {/* Button 2: QUERO PRESENTEAR MEU AMIGO */}
                    <button
                      onClick={() => setStep('presentear')}
                      className="w-full text-left bg-neutral-50 hover:bg-neutral-100/70 dark:bg-[#15161b] dark:hover:bg-[#1e1f26] border border-neutral-200 dark:border-white/[0.05] hover:border-[#d0011b]/30 dark:hover:border-[#d0011b]/30 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.005] cursor-pointer group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#d0011b]/10 border border-[#d0011b]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Heart className="text-[#d0011b] fill-[#d0011b]/15" size={18} />
                      </div>
                      <div className="space-y-0.5 pr-1">
                        <h3 className="text-xs font-black text-neutral-900 dark:text-white group-hover:text-[#d0011b] uppercase tracking-wide flex items-center gap-1.5 transition-colors">
                          Quero presentear meu amigo
                          <Gift size={11} className="text-[#d0011b]" />
                        </h3>
                        <p className="text-[10.5px] text-neutral-600 dark:text-gray-400 font-semibold leading-normal">
                          Seu amigo recebe <b className="text-[#d0011b]">créditos infinitos</b> dentro da ferramenta + <b className="text-[#d0011b]">40% de desconto</b> exclusivo na compra. Você abre mão da recompensa em favor dele.
                        </p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: GIFT FLOW */}
              {step === 'presentear' && (
                <motion.div
                  key="presentear-screen"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-5 pt-1"
                >
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d0011b]/10 border border-[#d0011b]/20 text-[#d0011b] text-[10px] font-black uppercase tracking-wider">
                      <Gift size={11} className="text-[#d0011b]" />
                      <span>Presenteie com créditos infinitos</span>
                    </div>

                    <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white leading-none">
                      Indique amigos
                    </h2>
                    <p className="text-[11px] text-neutral-500 dark:text-gray-400 font-bold uppercase tracking-wide leading-none">
                      e libere a ferramenta inteira para eles
                    </p>

                    {/* Trocar modo back link */}
                    <div className="pt-2">
                      <button
                        onClick={handleBackToSelect}
                        className="inline-flex items-center gap-1.5 text-[9px] font-black text-neutral-500 hover:text-neutral-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer uppercase tracking-wider bg-neutral-100 dark:bg-white/5 py-1 px-2.5 rounded-lg border border-neutral-200 dark:border-white/5"
                      >
                        <ArrowLeft size={10} />
                        <span>Trocar modo</span>
                      </button>
                    </div>
                  </div>

                  {/* HOW IT WORKS CARD */}
                  <div className="bg-neutral-50 dark:bg-[#121319] border border-neutral-200 dark:border-white/[0.04] rounded-xl p-4 space-y-3">
                    <p className="text-[8.5px] font-black text-neutral-400 dark:text-gray-500 uppercase tracking-widest block text-left">
                      Como funciona
                    </p>

                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#d0011b]/10 border border-[#d0011b]/25 text-[#d0011b] flex items-center justify-center shrink-0 mt-0.5">
                          <Zap size={11} />
                        </div>
                        <p className="text-xs font-bold text-neutral-700 dark:text-gray-300 text-left">
                          Gere seu cupom de indicação personalizado
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#d0011b]/10 border border-[#d0011b]/25 text-[#d0011b] flex items-center justify-center shrink-0 mt-0.5">
                          <Crown size={11} />
                        </div>
                        <p className="text-xs font-bold text-neutral-700 dark:text-gray-300 text-left">
                          Seu amigo desbloqueia <span className="text-[#d0011b] font-black">créditos infinitos</span> na ferramenta + <span className="text-[#d0011b] font-black">40% de desconto</span> na compra
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#d0011b]/10 border border-[#d0011b]/25 text-[#d0011b] flex items-center justify-center shrink-0 mt-0.5">
                          <MessageSquare size={11} />
                        </div>
                        <p className="text-xs font-bold text-neutral-700 dark:text-gray-300 leading-normal text-left">
                          Você abre mão da recompensa — todos os benefícios vão para o novo usuário
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RANGE AND ACTION CARD */}
                  <div className="bg-neutral-50 dark:bg-[#121319] border border-neutral-200 dark:border-[#d0011b]/10 rounded-xl p-4.5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Users size={13} className="text-[#d0011b]" />
                        <span className="text-[9.5px] font-black uppercase text-neutral-400 dark:text-gray-400 tracking-wider">Vagas no cupom</span>
                      </div>
                      <span className="text-[9px] text-neutral-500 font-extrabold uppercase">Limite: 10</span>
                    </div>

                    <p className="text-[10px] font-bold text-neutral-500 dark:text-gray-400 leading-normal mt-1 text-left">
                      Escolha quantas pessoas poderão usar este cupom (1 a 10).
                    </p>

                    {/* Range container matching requested aesthetic */}
                    <div className="flex items-center gap-4 pt-1 pb-2">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={vagasPresente}
                        onChange={(e) => {
                          setVagasPresente(Number(e.target.value));
                          if (presenteCoupon) setPresenteCoupon(null);
                        }}
                        className="flex-grow h-1.5 rounded-lg appearance-auto bg-neutral-200 dark:bg-neutral-800 accent-[#d0011b] cursor-pointer outline-none"
                      />
                      <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-[#d0011b]/10 border border-[#d0011b]/20 text-[#d0011b] rounded-lg text-[13px] font-black">
                        {vagasPresente}
                      </div>
                    </div>

                    {/* Master Action Trigger (Styled Crimson Red like Landing Button) */}
                    <button
                      type="button"
                      onClick={handleStartPresenteGeneration}
                      disabled={isGeneratingPresente}
                      className="btn-custom w-full font-black text-sm tracking-wide relative overflow-hidden transition-all duration-200"
                    >
                      {isGeneratingPresente ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                          <span>Gerando Cupom...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} className="text-white shrink-0" />
                          <span>Gerar cupom presente</span>
                        </>
                      )}
                    </button>

                    {/* RESULT BLOCK IN REAL TIME */}
                    <AnimatePresence>
                      {presenteCoupon && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="pt-1.5"
                        >
                          <div className="bg-white dark:bg-black/35 rounded-xl border border-[#d0011b]/20 p-4 space-y-3 relative overflow-hidden shadow-sm dark:shadow-none">
                            <div className="flex items-center gap-1.5 relative">
                              <span className="text-[9px] font-black tracking-widest bg-[#d0011b] text-white px-2 py-0.5 rounded uppercase">
                                SEU CUPOM
                              </span>
                              <span className="text-[9px] font-black tracking-widest bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 px-2 py-0.5 rounded uppercase text-neutral-700 dark:text-gray-300">
                                {vagasPresente} {vagasPresente > 1 ? 'VAGAS' : 'VAGA'}
                              </span>
                              <span className="text-[9px] font-black tracking-widest text-[#EAB308] ml-auto uppercase flex items-center gap-0.5">
                                👑 CRÉDITOS INFINITOS
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 pt-0.5">
                              <p className="text-lg font-black tracking-wider text-neutral-900 dark:text-white select-all font-mono leading-none">
                                {presenteCoupon}
                              </p>
                              <button
                                type="button"
                                onClick={() => handleCopyText(presenteCoupon, "Cupom copiado com sucesso! 📋")}
                                className="inline-flex items-center gap-1.5 bg-[#d0011b]/10 hover:bg-[#d0011b]/20 border border-[#d0011b]/20 text-[#d0011b] dark:text-white font-bold text-[10px] py-1.5 px-3.5 rounded-lg cursor-pointer transition-all uppercase tracking-wider"
                              >
                                <Copy size={11} />
                                <span>Copiar</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Notice line */}
                  <div className="text-center pt-1">
                    <p className="text-[9.5px] text-gray-500 font-extrabold tracking-wide uppercase">
                      Limite de 10 indicações por conta · sujeito aos termos
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: LUCRAR RECURRING REVENUE FLOW */}
              {step === 'lucrar' && (
                <motion.div
                  key="lucrar-screen"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-5 pt-1"
                >
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d0011b]/10 border border-[#d0011b]/20 text-[#d0011b] text-[10px] font-black uppercase tracking-wider">
                      <Coins size={11} className="text-[#d0011b]" />
                      <span>Lucrar com indicações</span>
                    </div>

                    <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white leading-none">
                      Indique amigos
                    </h2>
                    <p className="text-[11px] text-neutral-500 dark:text-gray-400 font-bold uppercase tracking-wide leading-none">
                      e ganhe comissão recorrente em dinheiro
                    </p>

                    {/* Trocar modo back link */}
                    <div className="pt-2">
                      <button
                        onClick={handleBackToSelect}
                        className="inline-flex items-center gap-1.5 text-[9px] font-black text-neutral-500 hover:text-neutral-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer uppercase tracking-wider bg-neutral-100 dark:bg-white/5 py-1 px-2.5 rounded-lg border border-neutral-200 dark:border-white/5"
                      >
                        <ArrowLeft size={10} />
                        <span>Trocar modo</span>
                      </button>
                    </div>
                  </div>

                  {/* HOW IT WORKS CARD */}
                  <div className="bg-neutral-50 dark:bg-[#121319] border border-neutral-200 dark:border-white/[0.04] rounded-xl p-4 space-y-3">
                    <p className="text-[8.5px] font-black text-neutral-400 dark:text-gray-500 uppercase tracking-widest block text-left">
                      Como funciona
                    </p>

                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#d0011b]/10 border border-[#d0011b]/25 text-[#d0011b] flex items-center justify-center shrink-0 mt-0.5">
                          <Zap size={11} />
                        </div>
                        <p className="text-xs font-bold text-neutral-700 dark:text-gray-300 text-left">
                          Gere seu link ou cupom personalizado de afiliado
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#d0011b]/10 border border-[#d0011b]/25 text-[#d0011b] flex items-center justify-center shrink-0 mt-0.5">
                          <Percent size={11} />
                        </div>
                        <p className="text-xs font-bold text-neutral-700 dark:text-gray-300 leading-normal text-left">
                          Seu amigo ganha <span className="text-[#d0011b] font-black">40% de desconto</span> permanente na assinatura
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#d0011b]/10 border border-[#d0011b]/25 text-[#d0011b] flex items-center justify-center shrink-0 mt-0.5">
                          <TrendingUp size={11} />
                        </div>
                        <p className="text-xs font-bold text-neutral-700 dark:text-gray-300 leading-normal text-left">
                          Você recebe <span className="text-emerald-500 font-extrabold">50% do valor</span> de todas as mensalidades dele diretamente no seu saldo
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RANGE AND ACTION CARD */}
                  <div className="bg-neutral-50 dark:bg-[#121319] border border-neutral-200 dark:border-[#d0011b]/10 rounded-xl p-4.5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Users size={13} className="text-[#d0011b]" />
                        <span className="text-[9.5px] font-black uppercase text-neutral-400 dark:text-gray-400 tracking-wider">Vagas no cupom</span>
                      </div>
                      <span className="text-[9px] text-neutral-500 font-extrabold uppercase flex">Limite: 10</span>
                    </div>

                    <p className="text-[10px] font-bold text-neutral-500 dark:text-gray-400 leading-normal mt-1 text-left">
                      Escolha quantas pessoas poderão usar este cupom (1 a 10).
                    </p>

                    {/* Range container with custom slider */}
                    <div className="flex items-center gap-4 pt-1 pb-2">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={vagasLucro}
                        onChange={(e) => {
                          setVagasLucro(Number(e.target.value));
                          if (lucroCoupon) setLucroCoupon(null);
                        }}
                        className="flex-grow h-1.5 rounded-lg appearance-auto bg-neutral-200 dark:bg-neutral-800 accent-[#d0011b] cursor-pointer outline-none"
                      />
                      <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-[#d0011b]/10 border border-[#d0011b]/20 text-[#d0011b] rounded-lg text-[13px] font-black">
                        {vagasLucro}
                      </div>
                    </div>

                    {/* Trigger button */}
                    <button
                      type="button"
                      onClick={handleStartLucroGeneration}
                      disabled={isGeneratingLucro}
                      className="btn-custom w-full font-black text-sm tracking-wide relative overflow-hidden transition-all duration-200"
                    >
                      {isGeneratingLucro ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                          <span>Configurando canal...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} className="text-white shrink-0" />
                          <span>Gerar cupom de parceiro</span>
                        </>
                      )}
                    </button>

                    {/* COUPON RESULT REVEALING UPON REQUEST */}
                    <AnimatePresence>
                      {lucroCoupon && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="pt-1.5"
                        >
                          <div className="bg-white dark:bg-black/35 rounded-xl border border-[#d0011b]/20 p-4 space-y-3 relative overflow-hidden shadow-sm dark:shadow-none">
                            <div className="flex items-center gap-1.5 relative">
                              <span className="text-[9px] font-black tracking-widest bg-[#d0011b] text-white px-2 py-0.5 rounded uppercase">
                                SEU CUPOM DE PARCEIRO
                              </span>
                              <span className="text-[9px] font-black tracking-widest bg-[#10b981]/115 text-[#10b981] border border-[#10b981]/25 px-2 py-0.5 rounded uppercase ml-auto">
                                🔥 50% RECORRENTE
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 pt-0.5">
                              <p className="text-lg font-black tracking-wider text-neutral-900 dark:text-white select-all font-mono leading-none">
                                {lucroCoupon}
                              </p>
                              <button
                                type="button"
                                onClick={() => handleCopyText(lucroCoupon, "Cupom de parceiro copiado! 📋")}
                                className="inline-flex items-center gap-1.5 bg-[#d0011b]/10 hover:bg-[#d0011b]/20 border border-[#d0011b]/20 text-[#d0011b] dark:text-white font-bold text-[10px] py-1.5 px-3.5 rounded-lg cursor-pointer transition-all uppercase tracking-wider"
                              >
                                <Copy size={11} />
                                <span>Copiar</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Notice tag */}
                  <div className="text-center pt-1">
                    <p className="text-[9.5px] text-gray-500 font-extrabold tracking-wide uppercase">
                      Limite de 10 indicações por conta · sujeito aos termos
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
