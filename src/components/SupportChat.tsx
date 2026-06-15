import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';

interface SupportChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
}

export default function SupportChat({ isOpen, onClose }: SupportChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'bot', text: 'Olá! 👋 Sou o assistente do ShopSpy. Como posso te ajudar?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLightMode, setIsLightMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTheme = () => {
      const hasLightClass = !document.documentElement.classList.contains('dark') && !document.body.classList.contains('dark');
      const isLightStorage = localStorage.getItem('theme') === 'light' || localStorage.getItem('shopspy_theme') === 'light';
      setIsLightMode(hasLightClass || isLightStorage);
    };

    checkTheme();

    const observer = new MutationObserver(() => {
      checkTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [isOpen]);

  const getWeeklyEarnings = (): string => {
    const earnings = parseFloat(localStorage.getItem('shopspy_weekly_earnings') || '0');
    return earnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  const getTop5Products = (): string => {
    // Top 5 products can be read from 'shopspy_top5_products' or defaults
    const top5Ids = JSON.parse(localStorage.getItem('shopspy_top5_products') || '[]');
    if (top5Ids.length === 0) return 'Você ainda não tem produtos favoritos salvos.';
    return top5Ids.slice(0, 5).map((id: number, i: number) => {
      const product = products.find(p => p.id === id);
      return `${i + 1}. ${product?.nome?.slice(0, 40) || 'Produto'}...`;
    }).join('\n');
  };

  const quickQuestions = [
    "Como usar a aba Criar UGC?",
    "Como favoritar produtos?",
    "Como copiar a copy de venda?",
    "Como usar a aba Nova Estrutura?",
    "Como funciona o Score Viral?",
    "Como me afiliar a um produto?",
    "Quanto ganhei nos últimos 7 dias?",
    "Quais são meus top 5 produtos?",
  ];

  const botAnswers: Record<string, string> = {
    "Como usar a aba Criar UGC?": "Na aba 'Criar UGC' você pode selecionar um produto dos seus favoritos, escolher tipo/estilo do vídeo, voz do influenciador, ângulo de câmera e gerar um roteiro de alta conversão com IA (Google Flow) completo para suas redes sociais! 🚀",
    "Como favoritar produtos?": "Na aba 'Produtos Virais', clique no ícone de coração ❤️ no canto superior direito de qualquer produto. Ele ficará salvo nos seus favoritos e aparecerá na aba Criar UGC.",
    "Como copiar a copy de venda?": "Na aba 'Criar UGC' ou 'Nova Estrutura', após selecionar o produto e obter seu material de divulgação, clique no ícone de copiar ao lado do texto de copy! 📋",
    "Como usar a aba Nova Estrutura?": "Na aba 'Nova Estrutura' você encontra os maiores e mais engajados grupos do Facebook divididos por categorias e nichos, insere seu link de afiliado e copia a copy personalizada para postagem! 👥",
    "Como funciona o Score Viral?": "O Score Viral é uma pontuação de 0 a 100 que indica o potencial de viralização de cada produto. Quanto maior o score, mais chances o produto tem de gerar vendas rapidamente! 🔥",
    "Como me afiliar a um produto?": "Clique no botão 'Afiliar-se' no card do produto ou no modal de análise. Você será redirecionado para a página oficial da Shopee para se tornar afiliado! 🛒",
    "Quanto ganhei nos últimos 7 dias?": `Seus ganhos dos últimos 7 dias: R$ ${getWeeklyEarnings()}. Continue divulgando para aumentar suas comissões! 💰`,
    "Quais são meus top 5 produtos?": `Seus top 5 produtos mais acessados:\n${getTop5Products()}`,
  };

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsgId = Date.now();
    const newUserMsg: Message = { id: userMsgId, sender: 'user', text: textToSend };
    
    setMessages(prev => [...prev, newUserMsg]);

    // Simulate bot replying after a small delay
    setTimeout(() => {
      const qMatch = Object.keys(botAnswers).find(
        key => key.toLowerCase() === textToSend.trim().toLowerCase()
      );

      let botReplyText = '';
      if (qMatch) {
        botReplyText = botAnswers[qMatch];
      } else {
        botReplyText = "Não entendi sua dúvida. Tente uma das perguntas rápidas acima ou entre em contato pelo WhatsApp! 😊";
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: botReplyText }
      ]);
    }, 600);
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleSendMessage(inputText);
    setInputText('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed bottom-[24px] md:bottom-24 md:right-6 bottom-6 right-6 z-[95] w-[340px] max-h-[500px] flex flex-col rounded-[16px] overflow-hidden font-['Space_Grotesk',sans-serif] ${
            isLightMode 
              ? 'bg-white border border-[#e5e5e5] text-[#111111] shadow-[0_8px_32px_rgba(0,0,0,0.12)]' 
              : 'bg-[#111111] border border-white/[0.08] text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
          }`}
        >
          {/* Header */}
          <div className="bg-[#D0011B] py-3.5 px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-white">
              <MessageCircle size={20} className="fill-white/15" />
              <span className="font-bold text-[15px] tracking-wide">Suporte ShopSpy</span>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/10 p-1 rounded-full transition-colors"
                aria-label="Fechar"
            >
              <X size={16} />
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[280px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 text-[13px] leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#D0011B] text-white rounded-[12px_4px_12px_12px]'
                      : isLightMode
                        ? 'bg-[#f5f5f5] text-[#111111] border border-[#e5e5e5] rounded-[4px_12px_12px_12px]'
                        : 'bg-[#1a1a1a] text-white border border-white/[0.04] rounded-[4px_12px_12px_12px]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className={`px-4 pb-2 pt-1 border-t flex gap-1.5 overflow-x-auto scrollbar-hide py-2 shrink-0 ${
            isLightMode ? 'border-[#e5e5e5]' : 'border-white/[0.04]'
          }`}>
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(q)}
                className={
                  isLightMode
                    ? "bg-[rgba(208,1,27,0.06)] hover:bg-[rgba(208,1,27,0.12)] border border-[rgba(208,1,27,0.2)] text-[#D0011B] rounded-full text-[11px] font-bold px-2.5 py-1 whitespace-nowrap cursor-pointer transition-all shrink-0"
                    : "bg-[rgba(208,1,27,0.1)] hover:bg-[rgba(208,1,27,0.2)] border border-[rgba(208,1,27,0.3)] text-[#D0011B] rounded-full text-[11px] font-bold px-2.5 py-1 whitespace-nowrap cursor-pointer transition-all shrink-0"
                }
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={onFormSubmit}
            className={`p-3 border-t flex items-center gap-2 shrink-0 ${
              isLightMode ? 'border-[#e5e5e5] bg-white' : 'border-white/[0.05] bg-[#111111]'
            }`}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite sua dúvida..."
              className={`flex-1 rounded-lg px-3 py-2 text-[13px] placeholder-current/30 outline-none transition-all ${
                isLightMode 
                  ? 'bg-[#f5f5f5] text-[#111111] border border-[#e5e5e5] placeholder-black/40' 
                  : 'bg-[#1a1a1a] text-white border border-white/[0.08] placeholder-white/30'
              }`}
            />
            <button
              type="submit"
              className="p-2 bg-[rgba(208,1,27,0.1)] text-[#D0011B] hover:bg-[#D0011B] hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
              aria-label="Enviar"
            >
              <Send size={15} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
