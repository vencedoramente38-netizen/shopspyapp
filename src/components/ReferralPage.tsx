import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Gift, 
  Heart, 
  Sparkles, 
  Zap, 
  Crown, 
  ArrowLeft, 
  Copy, 
  X,
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
        className="fixed inset-0 glass-obsidian-overlay z-[120] flex items-center justify-center p-4 font-['Space_Grotesk'] select-none overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full max-w-[580px] bg-[#09090B] border border-white/[0.08] rounded-[24px] shadow-2xl relative overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Section with Pink/Red Gradient */}
          <div className="relative pt-12 pb-8 px-6 text-center bg-gradient-to-br from-[#D0011B] to-[#960014] overflow-hidden">
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-white/5 pointer-events-none" />
            <div className="absolute -top-24 -left-20 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
            
            <AnimatePresence mode="wait">
              {step === 'select' ? (
                <motion.div
                  key="header-select"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative z-10"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-4">
                    <Sparkles size={12} />
                    <span>Escolha como quer indicar</span>
                  </div>
                  <h2 className="text-4xl font-black text-white tracking-tighter leading-none mb-3">
                    Indique amigos
                  </h2>
                  <p className="text-[12px] text-white/70 font-bold uppercase tracking-widest">
                    e escolha o que faz mais sentido para você
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="header-detail"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative z-10"
                >
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-4">
                    {step === 'presentear' ? <Gift size={12} /> : <TrendingUp size={12} />}
                    <span>{step === 'presentear' ? "Presentee com créditos infinitos" : "Lucrar com indicações"}</span>
                  </div>
                  <h2 className="text-4xl font-black text-white tracking-tighter leading-tight mb-2">
                    Indique amigos
                  </h2>
                  <p className="text-[12px] text-white/70 font-bold uppercase tracking-widest leading-none">
                    {step === 'presentear' ? "e libere créditos instantâneos para eles" : "e gere renda recorrente todos os meses"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-all cursor-pointer border border-white/10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content Area */}
          <div className="relative p-8 z-10">
            <AnimatePresence mode="wait">
              {step === 'select' ? (
                <motion.div
                  key="select-screen"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-6"
                >
                  <p className="text-[10px] font-black text-[#D0011B] uppercase tracking-widest text-left">Como você quer indicar?</p>
                  
                  <div className="space-y-4">
                    {/* Lucrar Card */}
                    <button
                      onClick={() => setStep('lucrar')}
                      className="w-full relative flex items-center gap-6 p-6 glass-obsidian border-white/[0.08] hover:border-[#D0011B]/40 rounded-[24px] group transition-all cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D0011B] group-hover:scale-110 transition-transform">
                        <TrendingUp size={24} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[16px] font-black text-white uppercase tracking-tight">Quero lucrar com a indicação</h3>
                          <Zap size={14} className="text-[#D0011B]" />
                        </div>
                        <p className="text-[12px] text-gray-400 font-medium leading-tight">
                          Você recebe <span className="text-white font-bold">50% do valor</span> da compra e seu amigo ganha <span className="text-white font-bold">50% de desconto</span> na assinatura.
                        </p>
                      </div>
                    </button>

                    {/* Presentear Card */}
                    <button
                      onClick={() => setStep('presentear')}
                      className="w-full relative flex items-center gap-6 p-6 glass-obsidian border-white/[0.08] hover:border-[#D0011B]/40 rounded-[24px] group transition-all cursor-pointer shadow-[0_0_40px_rgba(208,1,27,0.05)]"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D0011B] group-hover:scale-110 transition-transform">
                        <Gift size={24} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="mb-2">
                          <span className="inline-block bg-[#D0011B] text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider mb-2">
                             🏆 Benefício Ultra
                          </span>
                          <h3 className="text-[16px] font-black text-white uppercase tracking-tight leading-none text-[#D0011B]">
                            Presentee com créditos infinitos
                          </h3>
                        </div>
                        <p className="text-[12px] text-gray-400 font-medium leading-tight">
                          Seu amigo recebe <span className="text-white font-bold">créditos infinitos</span> dentro do gerador de UGC + <span className="text-white font-bold">50% de desconto</span>. Você abre mão da comissão em favor dele.
                        </p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="detail-screen"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex justify-center">
                    <button
                      onClick={handleBackToSelect}
                      className="glass-obsidian-pill bg-white/5 border-white/10 text-white/50 hover:text-white uppercase font-black text-[10px] tracking-widest gap-2"
                    >
                      <ArrowLeft size={14} />
                      <span>Trocar Modo</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-[#D0011B] uppercase tracking-widest text-left">Como funciona</p>
                      {[
                        { icon: Zap, text: "Gere seu cupom de indicação personalizado", color: "#D0011B" },
                        { icon: Crown, text: "Seu amigo desbloqueia créditos infinitos em todo o gerador + 50% de desconto na compra", color: "#D0011B" },
                        { icon: Gift, text: "Você abre mão da recompensa — todos os benefícios vão para o amigo convidado", color: "#D0011B" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 group">
                          <div className="w-10 h-10 rounded-xl glass-obsidian-pill border-white/5 bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#D0011B] transition-all shrink-0">
                            <item.icon size={18} />
                          </div>
                          <p className="text-[13px] text-gray-400 group-hover:text-gray-200 transition-colors text-left font-medium pt-2">
                             {item.text.includes('créditos infinitos') || item.text.includes('50% de desconto') ? (
                               <span>
                                 {item.text.split(/(créditos infinitos|50% de desconto)/).map((pt, j) => 
                                   (pt === 'créditos infinitos' || pt === '50% de desconto') 
                                   ? <span key={j} className="text-[#D0011B] font-bold">{pt}</span>
                                   : pt
                                 )}
                               </span>
                             ) : item.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="glass-obsidian border-white/[0.08] p-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Gift size={16} className="text-[#D0011B]" />
                           <span className="text-[11px] font-black text-white uppercase tracking-widest">Vagas no cupom</span>
                        </div>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Limite: 10</span>
                      </div>

                      <div className="space-y-6">
                        <p className="text-[12px] text-gray-400 font-medium text-left">Escolha quantas pessoas poderão usar este cupom (1 a 10).</p>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 px-4 py-3 bg-white/5 rounded-full border border-white/10 flex items-center">
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={step === 'presentear' ? vagasPresente : vagasLucro}
                              onChange={(e) => step === 'presentear' ? setVagasPresente(Number(e.target.value)) : setVagasLucro(Number(e.target.value))}
                              className="w-full h-1.5 rounded-lg appearance-none bg-[#D0011B]/20 accent-[#D0011B] cursor-pointer outline-none"
                            />
                          </div>
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-white text-lg">
                            {step === 'presentear' ? vagasPresente : vagasLucro}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={step === 'presentear' ? handleStartPresenteGeneration : handleStartLucroGeneration}
                        disabled={isGeneratingPresente || isGeneratingLucro}
                        className="btn-custom w-full shadow-[0_12px_24px_rgba(208,1,27,0.3)]"
                      >
                        {isGeneratingPresente || isGeneratingLucro ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Sparkles size={18} />
                            {step === 'presentear' ? "Gerar cupom presente" : "Gerar link de afiliado"}
                          </>
                        )}
                      </button>

                      <AnimatePresence>
                        {(presenteCoupon || lucroCoupon) && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-obsidian-input flex items-center justify-between border-[#D0011B]/30"
                          >
                            <span className="font-mono text-lg font-black text-white tracking-widest">
                              {presenteCoupon || lucroCoupon}
                            </span>
                            <button
                              onClick={() => handleCopyText(presenteCoupon || lucroCoupon || "", "Copiado com sucesso!")}
                              className="p-2 rounded-lg bg-white/10 hover:bg-[#D0011B] text-white transition-all border-none cursor-pointer"
                            >
                              <Copy size={16} />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">
                    Limite de 10 indicações por conta • Sujeito aos termos
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
