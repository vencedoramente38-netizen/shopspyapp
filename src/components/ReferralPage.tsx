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

  const avatars = [
    "https://i.postimg.cc/Vv84Kdq0/Full-body-portrait-of-a-202606211544.jpg",
    "https://i.postimg.cc/j2bvMLHS/Full-body-portrait-of-a-202606211544-(1).jpg",
    "https://i.postimg.cc/L5pvxntm/Full-body-portrait-of-a-202606211544-(2).jpg",
    "https://i.postimg.cc/cHYX7QnK/Full-body-portrait-of-a-202606211544-(3).jpg",
    "https://i.postimg.cc/9MTJPG7W/Full-body-portrait-of-a-202606211544-(4).jpg",
    "https://i.postimg.cc/rmWQGSry/Full-body-portrait-of-a-202606211544-(5).jpg",
    "https://i.postimg.cc/WzV99YpM/Full-body-portrait-of-a-202606211544-(6).jpg",
    "https://i.postimg.cc/mD8zQW2Z/Full-body-portrait-of-a-202606211544-(7).jpg",
    "https://i.postimg.cc/6qZ5Gz8G/Full-body-portrait-of-a-202606211544-(8).jpg",
    "https://i.postimg.cc/4dkV7jHw/Full-body-portrait-of-a-202606211544-(9).jpg"
  ];

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
      setLucroCoupon("PARCEIRO10");
      setIsGeneratingLucro(false);
      triggerToast("Link de parceiro gerado com sucesso! 💰");
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
        className="fixed inset-0 bg-black/85 backdrop-blur-[12px] z-[120] flex items-center justify-center p-4 font-['Space_Grotesk'] select-none overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full max-w-[800px] bg-[#09090B] border border-white/[0.08] rounded-[32px] shadow-[0_32px_120px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#D0011B]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Header */}
          <div className="relative pt-12 pb-8 px-10 text-center z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Sparkles size={12} className="text-[#D0011B]" />
              <span>Indique e Ganhe</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-tight mb-3">
              Indique amigos
            </h2>
            <p className="text-[13px] text-gray-400 font-medium max-w-md mx-auto leading-relaxed">
              Ganhe créditos infinitos ou 50% de lucro em cima de cada mensalidade dos seus amigos indicados.
            </p>

            <button 
              onClick={onClose}
              className="absolute top-6 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all cursor-pointer border border-white/5"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content Area */}
          <div className="relative px-10 pb-12 z-10">
            <AnimatePresence mode="wait">
              {step === 'select' ? (
                <motion.div
                  key="select-screen"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex flex-col gap-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Lucrar Card */}
                    <button
                      onClick={() => setStep('lucrar')}
                      className="group relative flex flex-col items-center text-center p-8 bg-white/[0.03] border border-white/[0.08] hover:border-[#D0011B]/30 rounded-[28px] transition-all duration-500 hover:bg-white/[0.05] cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-[#D0011B]/15 flex items-center justify-center mb-6 border border-[#D0011B]/20 shadow-[0_0_30px_rgba(208,1,27,0.1)] group-hover:scale-110 transition-transform">
                        <TrendingUp className="text-[#D0011B]" size={28} />
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Lucrar</h3>
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase mb-4">
                        Ganhos Recorrentes
                      </div>
                      <p className="text-[12px] text-gray-400 font-medium leading-relaxed">
                        Você recebe <span className="text-white font-bold">50% de comissão</span> em todas as mensalidades e seu amigo paga com <span className="text-white font-bold">40% de desconto</span>.
                      </p>
                    </button>

                    {/* Presentear Card */}
                    <button
                      onClick={() => setStep('presentear')}
                      className="group relative flex flex-col items-center text-center p-8 bg-white/[0.03] border border-white/[0.08] hover:border-[#D0011B]/30 rounded-[28px] transition-all duration-500 hover:bg-white/[0.05] cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-[#D0011B]/15 flex items-center justify-center mb-6 border border-[#D0011B]/20 shadow-[0_0_30px_rgba(208,1,27,0.1)] group-hover:scale-110 transition-transform">
                        <Heart className="text-[#D0011B] fill-[#D0011B]/20" size={28} />
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Presentear</h3>
                      <div className="px-3 py-1 rounded-full bg-[#D0011B]/10 border border-[#D0011B]/20 text-[10px] font-black text-[#D0011B] uppercase mb-4">
                        Acesso Premium
                      </div>
                      <p className="text-[12px] text-gray-400 font-medium leading-relaxed">
                        Você doa sua comissão para gerar <span className="text-white font-bold">créditos infinitos</span> para seu amigo e ele ainda garante <span className="text-white font-bold">40% OFF</span>.
                      </p>
                    </button>
                  </div>
                  
                  <p className="text-[11px] text-gray-500 font-black uppercase tracking-[0.2em] text-center">
                    Selecione uma opção para gerar seu link
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="detail-screen"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <button
                    onClick={handleBackToSelect}
                    className="group inline-flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em] bg-transparent border-none cursor-pointer"
                  >
                    <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                    <span>Voltar para Modos</span>
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left side: Info */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-black text-white uppercase tracking-tighter text-left">Como funciona?</h4>
                      <div className="space-y-4">
                        {[
                          { icon: Gift, text: "O amigo gera o cupom e garante o benefício." },
                          { icon: Users, text: "Cada usuário pode presentear até 10 amigos." },
                          { icon: Zap, text: "Créditos liberados na mesma hora após o uso." }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#D0011B] group-hover:bg-[#D0011B]/10 group-hover:border-[#D0011B]/20 transition-all shadow-sm">
                              <item.icon size={18} />
                            </div>
                            <p className="text-[13px] text-gray-400 group-hover:text-gray-200 transition-colors text-left">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right side: Control */}
                    <div className="bg-white/[0.03] border border-white/[0.08] rounded-[24px] p-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest text-left">Vagas disponíveis</span>
                        <div className="flex -space-x-2">
                          {avatars.slice(0, 5).map((src, i) => (
                            <img key={i} src={src} className="w-8 h-8 rounded-full border-2 border-[#09090B] object-cover" alt="Avatar" />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 py-2">
                        <div className="flex justify-between items-end">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-tight text-left">Quantidade</span>
                          <span className="text-3xl font-black text-[#D0011B]">{step === 'presentear' ? vagasPresente : vagasLucro}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={step === 'presentear' ? vagasPresente : vagasLucro}
                          onChange={(e) => step === 'presentear' ? setVagasPresente(Number(e.target.value)) : setVagasLucro(Number(e.target.value))}
                          className="w-full h-2 rounded-lg appearance-none bg-white/5 accent-[#D0011B] cursor-pointer outline-none"
                        />
                      </div>

                      <button
                        onClick={step === 'presentear' ? handleStartPresenteGeneration : handleStartLucroGeneration}
                        disabled={isGeneratingPresente || isGeneratingLucro}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D0011B] to-[#ff001e] text-white font-black text-[14px] uppercase tracking-widest shadow-[0_12px_24px_rgba(208,1,27,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 border-none cursor-pointer"
                      >
                        {isGeneratingPresente || isGeneratingLucro ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            {step === 'presentear' ? <Gift size={18} /> : <TrendingUp size={18} />}
                            {step === 'presentear' ? "Gerar cupom presente" : "Gerar link de afiliado"}
                          </>
                        )}
                      </button>

                      {/* Coupon/Link result */}
                      <AnimatePresence>
                        {(presenteCoupon || lucroCoupon) && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between"
                          >
                            <span className="font-mono text-lg font-black text-white tracking-widest">
                              {presenteCoupon || lucroCoupon}
                            </span>
                            <button
                              onClick={() => handleCopyText(presenteCoupon || lucroCoupon || "", "Copiado com sucesso!")}
                              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all transition-colors border-none cursor-pointer"
                            >
                              <Copy size={16} />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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
