import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Video, 
  Zap, 
  Users, 
  BookOpen, 
  Gift, 
  BarChart2, 
  Copy, 
  Check, 
  AlertTriangle, 
  ChevronDown, 
  Menu, 
  X, 
  PlayCircle, 
  Lock, 
  ArrowRight,
  Plus,
  LayoutDashboard,
  Settings,
  Target,
  Sparkles,
  DollarSign,
  Heart
} from 'lucide-react';
import { Sparkles as SparklesParticles } from './Sparkles';
import { motion, AnimatePresence } from 'framer-motion';
import FeaturedSectionStats from './ui/featured-section-stats';
import { TestimonialsColumn, TestimonialItem } from './ui/testimonials-columns-1';

// Testimonials aligned with ShopSpy branding and Shopee Affiliate focus
const testimonialsData: TestimonialItem[] = [
  {
    text: "O ShopSpy mudou meu jogo na Shopee. Em 5 minutos acho produtos que realmente vendem e geram milhares de cliques!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Juliana Mendes",
    role: "Afiliada Shopee Elite",
  },
  {
    text: "As copies e roteiros gerados pela inteligência artificial são absurdos de bons. Lucro alto aplicando a nova estrutura viral!",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Lucas Albuquerque",
    role: "Empreendedor Digital",
  },
  {
    text: "Não perco mais tempo garimpando produto. O radar de produtos me diz exatamente o que está vendendo muito agora mesmo na Shopee.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Sabrina Gomes",
    role: "Criadora de Conteúdo & Afiliada",
  },
  {
    text: "Sensacional o gerador de vídeos com IA. Consigo criar prompts profissionais para bombar as postagens e vender todos os dias.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Rodrigo Santos",
    role: "Super Afiliado Shopee",
  },
  {
    text: "O suporte é de primeira e a facilidade de postar nos maiores grupos do Facebook é fantástica. Recomendo o ShopSpy de olhos fechados!",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Bia Vasconcellos",
    role: "Afiliada Parceira",
  },
  {
    text: "Em 2 semanas com o ShopSpy eu fiz mais comissões do que em meses tentando divulgar de forma amadora.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Camila Rocha",
    role: "Afiliadora Profissional",
  },
  {
    text: "Encontrei 3 produtos virais logo no primeiro dia com o Radar de Produtos. Score viral alto realmente funciona!",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Fernando Diniz",
    role: "Afiliado Autoridade",
  },
  {
    text: "Imbatível! O melhor investimento que fiz este ano para o meu negócio de afiliado na Shopee.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Patricia Lima",
    role: "Afiliada Iniciante",
  },
  {
    text: "Automatizar a seleção de produtos e copies de venda elevou minhas comissões de patamar. Já faturei muito com as copies prontas.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Mateus Ramos",
    role: "Afiliado de Elite",
  },
];

const firstColumn = testimonialsData.slice(0, 3);
const secondColumn = testimonialsData.slice(3, 6);
const thirdColumn = testimonialsData.slice(6, 9);

function InteractiveMacbookMockup() {
  return (
    <div className="w-full max-w-4xl mx-auto px-1 sm:px-4 md:px-0 select-none">
      {/* MacBook Screen Bezel Wrapper */}
      <div className="bg-[#1c1d22] border-4 border-[#33353f] rounded-[24px] p-2 md:p-3 shadow-[0_24px_70px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Bezel Top Bar (Web browser style) */}
        <div className="bg-[#eef1f6] h-10 px-4 rounded-t-xl flex items-center justify-between border-b border-gray-200">
          <div className="flex gap-1.5 items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] block shrink-0"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] block shrink-0"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] block shrink-0"></span>
          </div>
          <div className="bg-white border border-gray-300/60 text-[10px] md:text-[11px] text-gray-500 px-6 py-1 rounded-md max-w-[200px] sm:max-w-xs md:max-w-md w-full text-center font-mono truncate shadow-sm flex items-center justify-center gap-1.5">
            <span className="text-emerald-600">🔒</span>
            <span>app.shopspy.com.br/dashboard</span>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Viewport Content with custom images */}
        <div className="bg-[#F5F5F7] w-full text-gray-800 font-sans flex overflow-hidden rounded-b-xl relative border border-gray-200">
          {/* PC Image - visible on medium and larger screens */}
          <img 
            src="https://i.postimg.cc/zfRxj31p/Captura-de-tela-2026-06-15-152927.png"
            alt="ShopSpy PC Dashboard"
            className="hidden md:block w-full h-auto object-cover"
            id="pc-mockup-image"
            referrerPolicy="no-referrer"
          />
          {/* Mobile Image - visible on mobile screens */}
          <img 
            src="https://i.postimg.cc/wBswV3dW/Captura-de-tela-2026-06-15-152943.png"
            alt="ShopSpy Mobile Dashboard"
            className="block md:hidden w-full h-auto object-cover animate-in fade-in duration-300"
            id="mobile-mockup-image"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Decorative Macbook keyboard base plate */}
      <div className="bg-gradient-to-b from-[#282a35] to-[#15161c] h-3 sm:h-3.5 max-w-[88%] mx-auto rounded-b-[10px] shadow-2xl relative z-10 flex justify-center">
        <span className="w-12 sm:w-16 h-1 bg-[#444] rounded-full mx-auto block opacity-80 mt-0.5 animate-pulse"></span>
      </div>
    </div>
  );
}

/* Old mockup code deactivated */
function InteractiveMacbookMockupOldPlaceholder() {
  return null;
}

function LegacyDeactivatedMockCode() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'virais' | 'encontrar-grupos'>('dashboard');
  const [productCategory, setProductCategory] = useState<string>('Todos');
  const [productSearch, setProductSearch] = useState<string>('');
  const [groupSearch, setGroupSearch] = useState<string>('');
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const mockProducts = [
    { id: 1, name: "Integralmedica Creatina 100% Pura", cat: "Beleza", price: "R$ 21,83", sales: "40mil+", comm: "15%", score: 96, image: "https://down-bs-br.img.susercontent.com/sg-11134201-7renj-m2ckuwis1x9y28.webp" },
    { id: 2, name: "Mini Projetor Portátil 1080p LED", cat: "Eletrônicos", price: "R$ 189,90", sales: "10mil+", comm: "20%", score: 92, image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&q=80&w=240" },
    { id: 3, name: "Jogo de Chave Catraca Reversível 40 Peças", cat: "Ferramentas", price: "R$ 28,97", sales: "20mil+", comm: "21%", score: 93, image: "https://down-bs-br.img.susercontent.com/sg-11134201-7rfi6-m96pnweedbdz0a.webp" },
    { id: 4, name: "Fones de Ouvido E6S Bluetooth TWS Digital", cat: "Eletrônicos", price: "R$ 14,28", sales: "90mil+", comm: "15%", score: 98, image: "https://down-bs-br.img.susercontent.com/sg-11134201-820mo-mnqvoqsuew3naf.webp" },
    { id: 5, name: "Copo Térmico 473ml C/ Abridor Integrado", cat: "Casa", price: "R$ 42,20", sales: "25mil+", comm: "20%", score: 88, image: "https://down-zl-br.img.susercontent.com/br-11134207-820lu-mmiv5l9yvbwne0.webp" },
    { id: 6, name: "Cropped Top Copa 2026 ESTHER BRAZIL", cat: "Moda", price: "R$ 29,44", sales: "1mil+", comm: "20%", score: 95, image: "https://down-zl-br.img.susercontent.com/br-11134207-7r98o-mallotfak3v317.webp" }
  ];

  const mockGroups = [
    { name: "GRUPOS DE PROMOÇÕES SHOPEE", category: "Promoções", url: '#' },
    { name: "ACHADINHOS DA SHOPEE BRASIL", category: "Achadinhos", url: '#' },
    { name: "CANAIS DE PROMOÇÕES FACEBOOK", category: "Promoções", url: '#' },
    { name: "CANAIS ACADEMIA MAROMBA", category: "Academia", url: '#' },
    { name: "CANAIS MAQUIAGEM E BELEZA", category: "Maquiagem", url: '#' },
    { name: "CANAIS MODA MASCULINA", category: "Moda", url: '#' },
    { name: "CANAIS UTILIDADES DOMÉSTICAS", category: "Casa", url: '#' }
  ];

  const filteredProducts = mockProducts.filter(p => {
    const matchesCat = productCategory === 'Todos' || p.cat === productCategory;
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-1 sm:px-4 md:px-0 select-none">
      {/* MacBook Screen Bezel Wrapper */}
      <div className="bg-[#1c1d22] border-4 border-[#33353f] rounded-[24px] p-2 md:p-3 shadow-[0_24px_70px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Bezel Top Bar (Web browser style) */}
        <div className="bg-[#eef1f6] h-10 px-4 rounded-t-xl flex items-center justify-between border-b border-gray-200">
          <div className="flex gap-1.5 items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 block shrink-0"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 block shrink-0"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 block shrink-0"></span>
          </div>
          <div className="bg-white border border-gray-300/60 text-[10px] md:text-[11px] text-gray-500 px-6 py-1 rounded-md max-w-[200px] sm:max-w-xs md:max-w-md w-full text-center font-mono truncate shadow-sm flex items-center justify-center gap-1.5">
            <span className="text-emerald-600">🔒</span>
            <span>app.shopspy.com.br/dashboard</span>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Viewport Content */}
        <div className="bg-[#F5F5F7] aspect-[16/10] sm:aspect-[16/9.5] w-full text-gray-800 font-sans flex overflow-hidden rounded-b-xl relative border border-gray-200">
          
          {/* SIDEBAR MOCK */}
          <aside className="w-[160px] md:w-[200px] bg-white border-r border-gray-200 shrink-0 p-3 sm:p-4 hidden sm:flex flex-col justify-between">
            <div className="space-y-5 flex flex-col items-start text-left w-full">
              <div className="flex items-center gap-2 font-bold text-xs tracking-wide">
                <span className="text-[15px] font-black tracking-tight text-[#111111]">
                  Shop<span className="text-[#D0011B]">Spy</span>
                </span>
              </div>

              <button 
                onClick={() => setActiveTab('virais')} 
                className="w-full bg-gradient-to-br from-[#D0011B] to-[#ff4444] text-white text-[10px] font-black py-2 px-2.5 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer hover:brightness-110 shadow-sm border-none"
              >
                <Plus size={11} className="text-white" />
                <span>+ Divulgar em Massa</span>
              </button>

              <nav className="space-y-1 w-full flex flex-col">
                <button 
                  onClick={() => { setActiveTab('dashboard'); setSelectedCardId(null); }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left border-none ${
                    activeTab === 'dashboard' 
                      ? 'bg-[#D0011B] text-white font-bold shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900 bg-transparent hover:bg-neutral-100'
                  }`}
                >
                  <LayoutDashboard size={13} className={activeTab === 'dashboard' ? 'text-white' : 'text-gray-500'} />
                  <span>Dashboard</span>
                </button>

                <button 
                  onClick={() => { setActiveTab('virais'); setSelectedCardId(null); }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left border-none ${
                    activeTab === 'virais' 
                      ? 'bg-[#D0011B] text-white font-bold shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900 bg-transparent hover:bg-neutral-100'
                  }`}
                >
                  <Flame size={13} className={activeTab === 'virais' ? 'text-white' : 'text-gray-500'} />
                  <span>Produtos Virais</span>
                </button>

                <button 
                  onClick={() => { setActiveTab('encontrar-grupos'); setSelectedCardId(null); }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left border-none ${
                    activeTab === 'encontrar-grupos' 
                      ? 'bg-[#D0011B] text-white font-bold shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900 bg-transparent hover:bg-neutral-100'
                  }`}
                >
                  <Users size={13} className={activeTab === 'encontrar-grupos' ? 'text-white' : 'text-gray-500'} />
                  <span>Encontrar Grupos</span>
                </button>

                <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-300 cursor-not-allowed text-left border-none bg-transparent">
                  <Settings size={13} className="text-gray-300" />
                  <span>Configurações</span>
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-200 mt-auto text-left">
              <span className="w-6.5 h-6.5 rounded-full bg-[#D0011B]/10 text-[#D0011B] flex items-center justify-center text-[9px] font-black border border-[#D0011B]/20 shrink-0">JD</span>
              <div className="truncate text-left font-sans">
                <p className="text-[9px] font-bold text-gray-800 truncate">Parceiro ShopSpy</p>
                <span className="text-[8px] text-emerald-600 font-bold block leading-none">Conectado</span>
              </div>
            </div>
          </aside>

          {/* MAIN PANEL CONTENT */}
          <main className="flex-1 bg-[#F5F5F7] overflow-y-auto custom-scrollbar flex flex-col justify-start relative">
            
            {/* MOBILE QUICK TAB HEADER */}
            <div className="flex sm:hidden items-center justify-between gap-1 border-b border-gray-200 p-3 pb-2 mb-1 bg-white">
              <span className="text-[11px] font-black tracking-wider text-[#D0011B]">ShopSpy App</span>
              <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                <button 
                  onClick={() => { setActiveTab('dashboard'); setSelectedCardId(null); }}
                  className={`px-2 py-0.5 text-[9px] rounded font-bold transition-all border-none cursor-pointer ${
                    activeTab === 'dashboard' ? 'bg-[#D0011B] text-white' : 'text-gray-500 bg-transparent'
                  }`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => { setActiveTab('virais'); setSelectedCardId(null); }}
                  className={`px-2 py-0.5 text-[9px] rounded font-bold transition-all border-none cursor-pointer ${
                    activeTab === 'virais' ? 'bg-[#D0011B] text-white' : 'text-gray-500 bg-transparent'
                  }`}
                >
                  Virais
                </button>
                <button 
                  onClick={() => { setActiveTab('encontrar-grupos'); setSelectedCardId(null); }}
                  className={`px-2 py-0.5 text-[9px] rounded font-bold transition-all border-none cursor-pointer ${
                    activeTab === 'encontrar-grupos' ? 'bg-[#D0011B] text-white' : 'text-gray-500 bg-transparent'
                  }`}
                >
                  Grupos
                </button>
              </div>
            </div>

            {/* CONDITIONAL CONTENT VIEWPORT STATE */}
            {activeTab === 'dashboard' && (
              <div className="animate-in fade-in duration-300 flex flex-col">
                <div className="relative bg-[#D0011B] pt-4 pb-10 px-4 overflow-hidden select-none text-left shrink-0">
                  <div className="absolute top-0 right-0 w-[120px] h-[120px] opacity-[0.16] pointer-events-none select-none text-[#ff5544] translate-x-2 -translate-y-2">
                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4.5" className="w-full h-full">
                      <path d="M22,35 L78,35 L83,83 A5,5 0 0,1 78,88 L22,88 A5,5 0 0,1 17,83 Z" strokeLinejoin="round" />
                      <path d="M37,35 C37,20 63,20 63,35" strokeLinecap="round" />
                      <path d="M42,56 C46,63 54,63 58,56" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-white tracking-tight uppercase leading-none">Comissões Shopee</h3>
                  <div className="inline-block bg-white/20 px-1.5 py-0.5 rounded text-[7.5px] font-bold text-white mt-1 leading-none uppercase">
                    Métricas de Faturamento do Mês
                  </div>
                </div>

                {/* OVERLAPPING SALDO BALANCE DISPLAY */}
                <div className="mx-4 -mt-5 bg-white border border-gray-200 p-3 sm:p-4 rounded-xl overflow-hidden flex flex-col items-center justify-center text-center shadow-md relative z-10">
                  <span className="text-[7.5px] sm:text-[8px] font-black tracking-widest text-[#D0011B] uppercase mb-0.5">
                    💸 FATURAMENTO DO DIA
                  </span>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[10px] sm:text-xs font-bold text-gray-400 self-start mt-0.5">R$</span>
                    <span className="text-xl sm:text-3xl font-black text-gray-900 tracking-tight leading-none font-['Space_Grotesk']">
                      2.984,90
                    </span>
                  </div>
                </div>

                {/* METRIC BOX GRAPH GRID */}
                <div className="grid grid-cols-2 gap-2 p-4 text-left">
                  <div className="bg-white p-2 sm:p-2.5 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-[7.5px] sm:text-[8px] font-bold text-gray-400 uppercase tracking-wider leading-none">Cliques Recebidos</p>
                    <span className="text-xs sm:text-sm font-black text-gray-800 mt-1 block">1.248</span>
                  </div>
                  <div className="bg-white p-2 sm:p-2.5 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-[7.5px] sm:text-[8px] font-bold text-gray-400 uppercase tracking-wider leading-none">Visitas nos Links</p>
                    <span className="text-xs sm:text-sm font-black text-gray-800 mt-1 block">4.892</span>
                  </div>
                  <div className="bg-white p-2 sm:p-2.5 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-[7.5px] sm:text-[8px] font-bold text-gray-400 uppercase tracking-wider leading-none">Conversões Shopee</p>
                    <span className="text-xs sm:text-sm font-black text-[#D0011B] mt-1 block">42</span>
                  </div>
                  <div className="bg-white p-2 sm:p-2.5 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-[7.5px] sm:text-[8px] font-bold text-gray-400 uppercase tracking-wider leading-none">Comissão Líquida</p>
                    <span className="text-xs sm:text-sm font-black text-gray-800 mt-1 block">R$ 548,20</span>
                  </div>
                </div>

                {/* DECORATIVE MINI GRAPHICS AREA */}
                <div className="mx-4 mb-4 bg-white border border-gray-200 p-3 rounded-lg flex flex-col gap-1 text-left shadow-sm">
                  <span className="text-[7.5px] font-black text-gray-400 uppercase tracking-widest block">Histórico de Performance</span>
                  <div className="h-10 sm:h-12 w-full mt-1">
                    <svg className="w-full h-full" viewBox="0 0 300 70" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradient-area-mock-realapp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#D0011B" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#D0011B" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 70 L 0 55 Q 35 30 70 50 T 140 35 T 210 20 T 280 45 T 300 20 L 300 70 Z" fill="url(#gradient-area-mock-realapp)" />
                      <path d="M 0 55 Q 35 30 70 50 T 140 35 T 210 20 T 280 45 T 300 20" fill="none" stroke="#D0011B" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* CONDITIONAL CONTROLLERS FOR VIRAL PRODUCTS PREVIEW */}
            {activeTab === 'virais' && (
              <div className="animate-in fade-in duration-300 flex flex-col flex-1">
                <div className="p-3 text-left border-b border-gray-200 shrink-0 font-sans select-none pb-2 bg-white">
                  <div className="flex items-center justify-between gap-2 overflow-x-auto">
                    <span className="text-[10px] font-black text-[#D0011B] uppercase tracking-widest flex items-center gap-1 shrink-0">
                      🔥 PRODUTOS FILTRADOS
                    </span>
                    <div className="flex bg-gray-100 p-0.5 rounded-md border border-gray-200 shrink-0">
                      {['Todos', 'Beleza', 'Eletrônicos', 'Moda', 'Casa'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setProductCategory(cat)}
                          className={`px-2 py-0.5 text-[8px] rounded transition-all font-bold border-none cursor-pointer ${
                            productCategory === cat ? 'bg-[#D0011B] text-white shadow-xs' : 'text-gray-500 hover:text-gray-950 bg-transparent'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 overflow-y-auto max-h-[190px] custom-scrollbar text-left font-sans">
                  {filteredProducts.map(p => (
                    <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-2 flex flex-col justify-between relative overflow-hidden shadow-xs hover:border-gray-300 transition-all">
                      <div className="relative">
                        <img src={p.image} alt={p.name} className="w-full h-12 object-cover rounded mb-1.5" referrerPolicy="no-referrer" />
                        <span className="absolute top-1 left-1 bg-black/75 text-white/90 text-[7px] font-sans font-bold px-1 rounded">Rank #{p.id}</span>
                      </div>
                      <p className="text-[7.5px] font-bold text-gray-800 line-clamp-1 leading-tight">{p.name}</p>
                      <div className="flex items-center justify-between mt-1 text-[7px] text-gray-400 leading-none font-medium">
                        <span>{p.price}</span>
                        <span className="text-emerald-600 font-bold">Comissão {p.comm}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-gray-100">
                        <span className="text-[6.5px] text-emerald-600 font-black uppercase font-['Space_Grotesk']">Score {p.score}%</span>
                        <button 
                          onClick={() => setSelectedCardId(p.id)}
                          className="bg-[#D0011B]/10 hover:bg-[#D0011B]/20 text-[#D0011B] border border-[#D0011B]/20 px-1.5 py-0.5 rounded text-[6px] font-black transition-all leading-none cursor-pointer"
                        >
                          Analisar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedCardId !== null && (
                  <div className="absolute inset-0 bg-white/98 z-20 p-4 shrink-0 flex flex-col justify-between text-left font-sans animate-in fade-in duration-200 border-t border-gray-100">
                    <div className="flex justify-between items-start gap-1 pb-1.5 border-b border-gray-200">
                      <div className="min-w-0">
                        <span className="text-[6.5px] uppercase font-black bg-[#D0011B]/10 text-[#D0011B] px-1 rounded leading-none">Material Shopee</span>
                        <h4 className="text-[8.5px] font-black text-gray-800 truncate mt-0.5 leading-none">{mockProducts.find(p => p.id === selectedCardId)?.name}</h4>
                      </div>
                      <button onClick={() => setSelectedCardId(null)} className="text-gray-400 hover:text-gray-900 pb-0.5 border-none bg-transparent cursor-pointer">✕</button>
                    </div>
                    
                    <div className="space-y-2 overflow-y-auto custom-scrollbar my-1 text-[7.5px] tracking-tight leading-relaxed">
                      <p className="text-gray-400"><strong className="text-gray-900">🚀 Gancho Shopee:</strong> "Eu não acreditava nesse produto da Shopee até testar em casa..."</p>
                      <p className="text-gray-400"><strong className="text-gray-900">📝 Roteiro Viral:</strong> "🚨 Alerta de achado útil da Shopee! Esse organizador salva vidas..."</p>
                      <p className="text-gray-500"><strong className="text-gray-800">🎯 Tags Shopee:</strong> #achadinhos #shopee #comprinhas #viral #ofertas</p>
                    </div>

                    <button 
                      onClick={() => {
                        const prod = mockProducts.find(p => p.id === selectedCardId);
                        navigator.clipboard.writeText(`🚨 Achadinho viral da Shopee! Garanta o seu com desconto exclusivo aqui: ${prod?.name}`);
                        setSelectedCardId(null);
                      }}
                      className="w-full bg-[#D0011B] text-white py-1.5 rounded text-[8px] font-black tracking-wide transition-all uppercase leading-none shadow-sm cursor-pointer text-center hover:brightness-110 border-none"
                    >
                      Copiar Estrutura Copy ✨
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* CONDITIONAL CONTENT VIEWPORT STATE FOR GRUPOS FINDER REPRESENTATION */}
            {activeTab === 'encontrar-grupos' && (
              <div className="animate-in fade-in duration-300 flex flex-col flex-1">
                <div className="p-3 text-left border-b border-gray-200 shrink-0 font-sans select-none pb-2 bg-white">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-black text-[#D0011B] uppercase tracking-widest flex items-center gap-1 shrink-0">
                      👥 GRUPOS DO FACEBOOK
                    </span>
                    <input
                      type="text"
                      placeholder="Filtrar por nicho... (Ex: Casa)"
                      value={groupSearch}
                      onChange={e => setGroupSearch(e.target.value)}
                      className="bg-gray-50 border border-gray-300 rounded px-1.5 py-0.5 text-[8px] text-gray-800 focus:outline-none focus:border-[#D0011B] max-w-[150px] w-full placeholder-gray-400 font-sans font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 p-3 overflow-y-auto max-h-[190px] custom-scrollbar text-left font-sans flex-1">
                  {mockGroups.filter(g => g.name.toLowerCase().includes(groupSearch.toLowerCase()) || g.category.toLowerCase().includes(groupSearch.toLowerCase())).map((grp, i) => (
                    <div key={i} className="bg-white border border-gray-200 p-2 rounded-lg flex items-center justify-between shadow-xs hover:border-gray-300 transition-all">
                      <div className="text-left font-sans">
                        <h4 className="text-[9px] font-black text-gray-800 leading-none">{grp.name}</h4>
                        <p className="text-[7.5px] text-gray-400 mt-1">Alta conversão · {grp.category}</p>
                      </div>
                      <span className="bg-[#D0011B]/10 border border-[#D0011B]/20 text-[#D0011B] px-2 py-0.5 rounded text-[7.5px] font-bold max-h-5">
                        Divulgar ↗
                      </span>
                    </div>
                  ))}
                  {mockGroups.filter(g => g.name.toLowerCase().includes(groupSearch.toLowerCase()) || g.category.toLowerCase().includes(groupSearch.toLowerCase())).length === 0 && (
                    <div className="text-center py-6 text-gray-400 text-[9px] font-sans">Nenhuma comunidade de vendas encontrada.</div>
                  )}
                </div>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Decorative Macbook keyboard base plate */}
      <div className="bg-gradient-to-b from-[#282a35] to-[#15161c] h-3 sm:h-3.5 max-w-[88%] mx-auto rounded-b-[10px] shadow-2xl relative z-10 flex justify-center">
        <span className="w-12 sm:w-16 h-1 bg-[#444] rounded-full mx-auto block opacity-80 mt-0.5 animate-pulse"></span>
      </div>
    </div>
  );
}

interface LandingPageProps {
  onEnterLogin: () => void;
}

export default function LandingPage({ onEnterLogin }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCoupon = () => {
    const uppercaseCoupon = coupon.trim().toUpperCase();
    if (uppercaseCoupon === 'ISAAC10' || uppercaseCoupon === 'SHOPSPY2026') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Cupom inválido. Tente novamente.');
      setCouponApplied(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen text-[#111111] selection:bg-[#D0011B]/15 relative select-none pb-0 overflow-x-hidden" id="landing-root">
      {/* Corner Ambient Cyber-Red Glow Effects */}
      <div className="fixed top-0 left-0 w-[350px] h-[350px] bg-[#D0011B]/4 blur-[120px] pointer-events-none -z-10 rounded-full animate-pulse" />
      <div className="fixed top-0 right-0 w-[350px] h-[350px] bg-[#D0011B]/3 blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#D0011B]/2.5 blur-[130px] pointer-events-none -z-10 rounded-full" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-[#D0011B]/4 blur-[130px] pointer-events-none -z-10 rounded-full animate-pulse" />
      
      {/* Space Grotesk Font and Shine CSS declarations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;650;700;900&display=swap');
        
        #landing-root, #landing-root * {
          font-family: 'Space Grotesk', sans-serif !important;
        }

        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2.2s infinite ease-in-out;
        }

        .animate-shine-effect {
          background-image: linear-gradient(
            120deg,
            rgba(255,255,255,0) 30%,
            rgba(255,255,255,0.4) 50%,
            rgba(255,255,255,0) 70%
          );
          background-size: 200% auto;
          animation: shine 4s infinite linear;
        }
      ` }} />

      {/* FIXED NAVBAR */}
      <motion.nav
        id="navbar"
        initial={false}
        animate={{
          y: scrolled ? 12 : 20,
          width: scrolled ? (isMobileView ? "90%" : "70%") : "95%",
          maxWidth: scrolled ? "620px" : "900px",
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.96)" : "rgba(255, 255, 255, 0.94)",
          borderColor: scrolled ? "rgba(208, 1, 27, 0.22)" : "rgba(0, 0, 0, 0.05)",
          boxShadow: scrolled
            ? "0 1px 40px rgba(208,1,27,0.06), 0 1px 0 rgba(0,0,0,0.06)"
            : "0 1px 40px rgba(208,1,27,0.06), 0 1px 0 rgba(0,0,0,0.06)",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
        className="fixed left-1/2 -translate-x-1/2 z-[100] backdrop-blur-[6px] rounded-full px-6 py-2.5 flex items-center justify-between border select-none w-[calc(100%-48px)] transition-all duration-300"
      >
        {/* Left hand logo */}
        <div className="flex items-center gap-3.5 cursor-pointer select-none" onClick={() => scrollToSection('inicio')}>
          <img 
            src="https://i.postimg.cc/yxg1xsb5/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png" 
            alt="ShopSpy Logo" 
            style={{ height: '28px' }} 
            className="w-auto shrink-0 select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Anchor links */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollToSection('inicio')} className="text-[14px] text-[#555555] hover:text-[#111111] font-semibold transition-colors cursor-pointer bg-transparent border-none">Início</button>
          <button onClick={() => scrollToSection('beneficios')} className="text-[14px] text-[#555555] hover:text-[#111111] font-semibold transition-colors cursor-pointer bg-transparent border-none">Benefícios</button>
          <button onClick={() => scrollToSection('planos')} className="text-[14px] text-[#555555] hover:text-[#111111] font-semibold transition-colors cursor-pointer bg-transparent border-none">Planos</button>
          <button onClick={() => scrollToSection('faq')} className="text-[14px] text-[#555555] hover:text-[#111111] font-semibold transition-colors cursor-pointer bg-transparent border-none">FAQ</button>
        </div>

        {/* Right side Entrar button */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onEnterLogin}
            className="hidden sm:inline-flex btn-custom !py-1.5 !px-4.5 !text-[12px] md:!text-[13px] select-none scale-95"
          >
            <span>Entrar</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          
          {/* Hamburger Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-1.5 text-[#555555] hover:text-[#111111] cursor-pointer bg-transparent border-none"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Anchor Drawer Menu For Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-6 right-6 z-[99] bg-white border border-neutral-200/55 rounded-2xl p-6 flex flex-col gap-4 shadow-xl md:hidden"
          >
            <button onClick={() => { scrollToSection('inicio'); setMobileMenuOpen(false); }} className="text-[16px] text-[#555555] hover:text-[#111111] text-left font-semibold cursor-pointer py-1 border-none bg-transparent font-sans">Início</button>
            <button onClick={() => { scrollToSection('beneficios'); setMobileMenuOpen(false); }} className="text-[16px] text-[#555555] hover:text-[#111111] text-left font-semibold cursor-pointer py-1 border-none bg-transparent font-sans">Benefícios</button>
            <button onClick={() => { scrollToSection('planos'); setMobileMenuOpen(false); }} className="text-[16px] text-[#555555] hover:text-[#111111] text-left font-semibold cursor-pointer py-1 border-none bg-transparent font-sans">Planos</button>
            <button onClick={() => { scrollToSection('faq'); setMobileMenuOpen(false); }} className="text-[16px] text-[#555555] hover:text-[#111111] text-left font-semibold cursor-pointer py-1 border-none bg-transparent font-sans">FAQ</button>
            
            <div className="h-[1px] bg-neutral-200/60 my-1" />
            
            <button 
              onClick={() => { onEnterLogin(); setMobileMenuOpen(false); }}
              className="btn-custom w-full select-none !py-3 !text-[15px] flex items-center justify-center gap-2"
            >
              <span>Entrar</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEÇÃO HERO */}
      <header id="inicio" className="relative pt-[80px] pb-0 w-full text-center bg-transparent overflow-hidden">
        {/* Soft background ambient radial gradient color */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 rounded-full select-none pointer-events-none" 
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(208,1,27,0.15) 0%, transparent 70%)' }}
        />

        {/* Particles overlay inside the hero section */}
        <div className="absolute inset-0 -z-5 pointer-events-none opacity-40">
          <SparklesParticles 
            className="w-full h-full" 
            color="#D0011B" 
            density={70} 
            speed={0.6} 
            size={1.8} 
          />
        </div>

        {/* Main Hero Banner Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-hidden shadow-[0_24px_80px_rgba(208,1,27,0.12)] border-b border-[#D0011B]/10"
        >
          <img 
            src="https://i.postimg.cc/B6NJvG7r/Cinematic-ultra-wide-hero-banner-image-202606262228.jpg" 
            alt="ShopSpy Hero Banner" 
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>


      </header>

      {/* SAAS EXPERIENCE DEMONSTRATIVE PREVIEW */}
      <section className="bg-transparent py-24 relative overflow-hidden">
        {/* Background glow for this section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto px-4 text-center"
        >
          <div className="max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-black uppercase text-[#D0011B] tracking-widest glass-obsidian px-3 py-1 rounded-full border-white/5">
              💻 Painel Demonstrativo
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white mt-4 font-['Space_Grotesk'] tracking-tighter leading-tight uppercase">
              Simule a Experiência Real do ShopSpy
            </h3>
            <p className="text-gray-400 font-medium text-sm sm:text-base mt-2">
              Interaja com o aplicativo abaixo em tempo real e descubra novas oportunidades.
            </p>
          </div>
          <InteractiveMacbookMockup />
        </motion.div>
      </section>

      {/* SEÇÃO BENEFÍCIOS */}
      <section id="beneficios" className="px-6 py-20 bg-transparent relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#05060f] to-transparent pointer-events-none -z-10" />
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[28px] sm:text-[36px] font-black text-[#111111] leading-tight tracking-tight mb-2"
          >
            Tudo que Você Precisa para Vender na Shopee
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15px] sm:text-[16px] text-[#555555] font-semibold max-w-[600px] mx-auto mb-12"
          >
            Ferramentas profissionais que os top afiliados usam para faturar todos os meses
          </motion.p>
 
          {/* Grid layout of benefits */}
          <motion.div 
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: <Flame size={24} />, title: "Radar de Produtos", desc: "Encontre os produtos mais vendidos e validados da Shopee antes da concorrência" },
              { icon: <Video size={24} />, title: "Gerador de Vídeos IA", desc: "Crie prompts profissionais para gerar vídeos dos seus produtos com Google Flow" },
              { icon: <Zap size={24} />, title: "Nova Estrutura Viral", desc: "Gere roteiros e copies otimizados para alcançar mais compradores" },
              { icon: <Users size={24} />, title: "Encontrar Grupos", desc: "Encontre os maiores grupos do Facebook para divulgar seus produtos" },
              { icon: <Gift size={24} />, title: "Indique e Ganhe", desc: "Convide amigos e ganhe recompensas exclusivas a cada indicação confirmada" },
              { icon: <BarChart2 size={24} />, title: "Score Viral", desc: "Cada produto tem pontuação de viralidade para você escolher os melhores" },
              { icon: <Copy size={24} />, title: "Copy Pronta", desc: "Copies de venda geradas automaticamente e personalizadas para cada produto" }
            ].map((benefit, idx) => (
              <motion.div 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="bg-white border border-neutral-200/80 rounded-[14px] p-6 text-left shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(208,1,27,0.08)] hover:-translate-y-2 hover:scale-[1.04] hover:border-[#D0011B]/20 transition-all duration-300 transform-gpu relative group overflow-hidden h-full flex flex-col"
              >
                <div className="w-11 h-11 bg-[#D0011B]/8 rounded-[12px] flex items-center justify-center text-[#D0011B] mb-4 border border-[#D0011B]/10">
                  {benefit.icon}
                </div>
                <h3 className="text-[15px] font-bold text-[#111111] mb-2 leading-none">
                  {benefit.title}
                </h3>
                <p className="text-[13px] text-[#555555] leading-relaxed font-semibold">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO STATS */}
      <section className="bg-white py-12">
        <FeaturedSectionStats onEnterLogin={onEnterLogin} />
      </section>

      {/* SEÇÃO COMO FUNCIONA (Stacked Display Cards) */}
      <section id="como-funciona" className="px-6 py-20 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="text-center mb-12">
            <span className="inline-block border border-[#D0011B]/20 rounded-full px-4 py-1 text-[11px] font-bold text-[#D0011B] mb-4 tracking-wide bg-[#D0011B]/5">
              Como funciona
            </span>
            <h2 className="text-[32px] sm:text-[42px] font-black text-[#111111] tracking-tight">
              Simples assim.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 max-w-5xl mx-auto border border-neutral-200/60 rounded-[32px] overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
            {[
              {
                step: "Etapa 1",
                icon: <Target size={24} className="text-[#D0011B]" />,
                title: "Você escolhe o produto.",
                desc: "Navegue pelos produtos virais da Shopee ranqueados por score e escolha o que quer promover."
              },
              {
                step: "Etapa 2",
                icon: <Sparkles size={24} className="text-[#D0011B]" />,
                title: "A ferramenta gera tudo.",
                desc: "Copy de venda, roteiros de vídeos, cálculo automático de comissão e links de divulgação prontos."
              },
              {
                step: "Etapa 3",
                icon: <DollarSign size={24} className="text-[#D0011B]" />,
                title: "Você divulga e lucra.",
                desc: "Crie seus criativos com IA, poste nos canais e grupos recomendados e comece a receber suas comissões Shopee."
              }
            ].map((item, idx) => {
              const isLast = idx === 2;
              return (
                <div
                  key={idx}
                  className={`flex flex-col py-12 relative group/feature overflow-hidden items-center text-center ${
                    !isLast ? 'border-b md:border-b-0 md:border-r border-neutral-100/80' : ''
                  }`}
                >
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-50/70 to-transparent pointer-events-none" />
                  
                  <div className="px-8 mb-4">
                    <span className="text-[10px] font-extrabold tracking-widest text-[#D0011B] bg-[#D0011B]/5 border border-[#D0011B]/10 rounded-full px-3 py-1 font-mono">
                      {item.step}
                    </span>
                  </div>

                  <div className="mb-4 relative z-10 px-8">
                    <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center border border-neutral-150 group-hover/feature:scale-110 group-hover/feature:bg-[#D0011B]/5 transition-all duration-300 shadow-sm">
                      {item.icon}
                    </div>
                  </div>

                  <div className="text-lg font-bold mb-2 relative z-10 px-8 text-[#111111] tracking-tight">
                    {item.title}
                  </div>

                  <p className="text-sm text-neutral-500 max-w-xs relative z-10 px-8 leading-relaxed font-semibold">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DEPOIMENTOS */}
      <section id="depoimentos" className="bg-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 z-10 relative">
          <div className="flex flex-col items-center justify-center max-w-[640px] mx-auto text-center mb-12">
            <span className="border border-[#D0011B]/20 py-1.5 px-4 rounded-full text-[11px] font-bold text-[#D0011B] bg-[#D0011B]/5 uppercase tracking-wide mb-4">
              DEPOIMENTOS DE PARCEIROS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111111]">
              O que dizem os afiliados do <span className="text-[#D0011B]">ShopSpy</span>
            </h2>
            <p className="text-center mt-3 text-[#555555] font-semibold">
              Descubra como criadores de conteúdo e afiliados de elite estão multiplicando suas comissões todos os dias.
            </p>
          </div>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[550px] overflow-hidden relative">
            <TestimonialsColumn testimonials={firstColumn} duration={26} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={32} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={28} />
          </div>
        </div>
      </section>

      {/* SEÇÃO PLANOS (INVESTIMENTO) */}
      <section id="planos" className="px-6 py-20 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="text-center mb-10">
            <span className="inline-block border border-[#D0011B]/20 rounded-full px-4 py-1 text-[11px] font-bold text-[#D0011B] mb-4 tracking-[0.2em] uppercase bg-[#D0011B]/5">
              INVESTIMENTO
            </span>
            <h2 className="text-[32px] sm:text-[36px] font-black text-[#111111] leading-tight font-sans">
              Escolha Seu Plano Ideal
            </h2>
            <p className="text-[#555555] text-sm sm:text-base mt-2 font-semibold">
              Invista no seu sucesso. Explore qual opção é a certa para você.
            </p>
          </div>

          {/* CAMPO CUPOM (acima dos cards) */}
          <div className="max-w-[480px] mx-auto mb-10 text-center font-sans">
            <div className="flex gap-2 p-1.5 bg-neutral-50 border border-[#D0011B]/20 rounded-xl shadow-xs">
              <input
                type="text"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                placeholder="Digite seu cupom aqui..."
                className="flex-1 px-4 py-3 border-none bg-transparent text-[14px] text-gray-800 outline-none font-semibold focus:ring-0"
              />
              <button 
                onClick={handleCoupon} 
                className="bg-[#D0011B] hover:bg-[#b00116] text-white rounded-lg px-6 py-3 font-bold text-[14px] border-none cursor-pointer leading-none flex items-center justify-center transition-colors shadow-xs"
              >
                Aplicar
              </button>
            </div>
            <AnimatePresence>
              {couponApplied && (
                <div className="flex flex-col gap-3 mt-6 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    id="coupon-toast-success"
                    className="flex items-center gap-3 bg-white border border-[#D0011B]/15 rounded-full py-2.5 px-5 shadow-lg w-full max-w-sm justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D0011B]/10 flex items-center justify-center text-[#D0011B]">
                        <Gift size={18} />
                      </div>
                      <div className="text-left font-sans">
                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Cupom Aplicado</p>
                        <p className="text-sm font-black text-gray-900">{coupon || 'SHOPSPY2026'}</p>
                      </div>
                    </div>
                    <button onClick={() => setCouponApplied(false)} className="text-gray-400 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer">
                      <X size={14} />
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 bg-white border border-[#D0011B]/15 rounded-full py-2.5 px-5 shadow-lg w-full max-w-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#D0011B]/10 flex items-center justify-center text-[#D0011B] shrink-0">
                      <Heart size={18} />
                    </div>
                    <p className="text-[11px] sm:text-[12px] font-semibold text-gray-600 text-left leading-tight">
                      O usuário que indicou <span className="font-black text-gray-900">abriu mão de qualquer recompensa</span> para destinar créditos infinitos à sua conta.
                    </p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
            {couponError && (
              <p className="text-[#D0011B] text-xs font-bold mt-3">
                {couponError}
              </p>
            )}
          </div>

          {/* Grid of 2 Plan Cards */}
          <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-12 font-sans text-left">
            
            {/* PLATINUM CARD PLANO MENSAL */}
            <div className={`rounded-[40px] px-8 py-12 flex flex-col justify-between h-full relative border transition-all duration-500 ${
              couponApplied
                ? 'border-[#D0011B] bg-neutral-900/5 shadow-[0_20px_50px_rgba(208,1,27,0.12)] scale-[1.01]'
                : 'border-neutral-200/80 bg-white shadow-[0_20px_45px_-12px_rgba(0,0,0,0.04)] hover:border-neutral-350'
            }`}>
              <div>
                <div className="mb-10">
                  <h2 className="text-3xl font-black text-neutral-900 mb-3 leading-none tracking-tight">Plano Mensal</h2>
                  <p className="text-neutral-500 text-sm leading-relaxed font-semibold">Ideal para testar a plataforma e começar a vender</p>
                </div>

                <div className="flex flex-col mb-12">
                  {couponApplied ? (
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-gray-400 line-through">De R$ 297</span>
                        <span className="text-lg font-bold text-[#D0011B] mr-1">R$</span>
                        <span className="text-6xl font-black tracking-tight text-[#D0011B] font-['Space_Grotesk']">97</span>
                        <span className="text-gray-400 text-sm ml-2 font-light font-sans">/mês</span>
                      </div>
                      <p className="text-[#D0011B] text-xs font-black mt-2 tracking-wider flex items-center gap-1.5 uppercase">
                        <span className="w-2 h-2 rounded-full bg-[#D0011B] animate-ping" />
                        Desconto especial ativo!
                      </p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 7, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="mt-3.5 overflow-hidden rounded-2xl border border-[#D0011B]/15 bg-white/70 dark:bg-black/20 backdrop-blur-md py-2 px-3 flex items-center gap-2 select-none shadow-[0_4px_24px_rgba(208,1,27,0.03)]"
                      >
                        <div className="p-1 rounded-full bg-[#D0011B]/10 border border-[#D0011B]/20 shrink-0 flex items-center justify-center relative">
                          <Gift className="text-[#D0011B] w-3.5 h-3.5" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 min-w-0 font-sans">
                          <p className="text-[11px] sm:text-[12px] font-semibold text-neutral-600 dark:text-neutral-300 tracking-tight leading-normal">
                            <span className="text-[#D0011B] font-extrabold tracking-tight">
                              Desconto de 60%
                            </span>{" "}
                            aplicado pela indicação
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline mb-2">
                        <span className="text-lg font-bold mr-1 text-neutral-400">R$</span>
                        <span className="text-6xl font-black tracking-tight text-neutral-900 font-['Space_Grotesk']">247</span>
                        <span className="text-gray-455 text-sm ml-2 font-medium font-sans">/mês</span>
                      </div>
                      <p className="text-neutral-400 text-xs font-bold tracking-wider">Cancele quando quiser, sem fidelidade</p>
                    </div>
                  )}
                </div>

                <div className="mb-12">
                  <button 
                    onClick={() => window.open(
                      couponApplied 
                        ? "https://ggcheckout.app/checkout/v3/wPmdkoLh4QAWSIoHjAVD" 
                        : "https://ggcheckout.app/checkout/v3/BAKaYWL6yFLystulxCis", 
                      "_blank"
                    )}
                    className="btn-custom w-full select-none"
                  >
                    <span>Assinar plano mensal</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="text-[10px] font-black tracking-[0.2em] text-neutral-400 leading-none">Recursos</p>
                  <p className="text-[#D0011B] font-black text-base leading-none">Recursos incluídos:</p>
                  
                  <ul className="space-y-4 text-left">
                    {[
                      "Radar de Produtos",
                      "Creator Lab (Criativos com IA)",
                      "Viral Boost (Scripts Virais)",
                      "Lab Studio (Editor de Vídeos)",
                      "Personalize IA",
                      "Lab Academy (Treinamento)",
                      "Indique e Ganhe",
                      "Lab Store"
                    ].map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center text-[14px] text-neutral-700 font-semibold leading-none font-sans">
                        <span className="mr-3 flex items-center justify-center w-5 h-5 rounded-full border border-[#D0011B]/30 text-[#D0011B] shrink-0">
                          <Check size={10} strokeWidth={3.5} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 font-bold tracking-wider text-center mt-8">
                Pix · Cartão · Boleto
              </p>
            </div>

            {/* VITALÍCIO CARD DESTAQUE */}
            <div className={`rounded-[40px] px-8 py-12 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-500 border ${
              couponApplied 
                ? 'border-[#D0011B] bg-white shadow-[0_25px_60px_rgba(208,1,27,0.16)] scale-[1.01]' 
                : 'border-neutral-200/80 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.06)] hover:border-[#D0011B]/40'
            }`}>
              {/* Shine effect animation div */}
              <div className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(120deg,rgba(255,255,255,0)30%,rgba(208,1,27,0.06)50%,rgba(255,255,255,0)70%)] animate-shine-effect z-[1]" />

              <div className="relative z-10 font-sans">
                {/* Popularity Badge */}
                <div className="absolute top-0 right-0">
                  <span className="bg-gradient-to-r from-[#D0011B] to-[#ff4b7d] text-white text-[10px] font-black px-3.5 py-1.5 rounded-full tracking-wide shadow-sm uppercase animate-pulse">
                    Popular
                  </span>
                </div>

                <div className="mb-10">
                  <h2 className="text-3xl font-black text-neutral-900 mb-3 leading-none tracking-tight pr-20">Plano Vitalício</h2>
                  <p className="text-neutral-500 text-sm leading-relaxed font-semibold">Pague uma vez, use para sempre com todas as atualizações</p>
                </div>

                <div className="flex flex-col mb-12">
                  {couponApplied ? (
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-gray-400 line-through">De R$ 997</span>
                        <span className="text-lg font-bold text-[#D0011B] mr-1">R$</span>
                        <span className="text-6xl font-black tracking-tight text-[#D0011B] font-['Space_Grotesk']">147</span>
                        <span className="text-gray-400 text-sm ml-2">/vitalício</span>
                      </div>
                      <p className="text-[#D0011B] text-xs font-black mt-2 tracking-wider uppercase flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#D0011B] animate-ping" />
                        Aproveite: ou em 12x de R$ 14,70
                      </p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 7, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="mt-3.5 overflow-hidden rounded-2xl border border-[#D0011B]/15 bg-white/70 dark:bg-black/20 backdrop-blur-md py-3 px-4 flex flex-col gap-2 select-none shadow-[0_4px_24px_rgba(208,1,27,0.03)]"
                      >
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-full bg-[#D0011B]/10 border border-[#D0011B]/20 shrink-0 flex items-center justify-center relative">
                            <Gift className="text-[#D0011B] w-3.5 h-3.5" strokeWidth={2.5} />
                          </div>
                          <div className="flex-1 min-w-0 font-sans">
                            <p className="text-[11px] sm:text-[12px] font-semibold text-neutral-600 dark:text-neutral-300 tracking-tight leading-normal">
                              <span className="text-[#D0011B] font-extrabold tracking-tight">
                                Desconto de 78%
                              </span>{" "}
                              aplicado pela indicação
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2.5 pt-2 border-t border-dashed border-[#D0011B]/20">
                          <div className="p-1 rounded-full bg-[#D0011B]/10 shrink-0 mt-0.5">
                            <Heart className="text-[#D0011B] w-3 h-3 fill-[#D0011B]/20" />
                          </div>
                          <p className="text-[10px] sm:text-[11px] font-bold text-neutral-500 dark:text-neutral-400 leading-tight">
                            O usuário que indicou <span className="text-[#D0011B]">abriu mão de qualquer recompensa</span> para destinar créditos infinitos à sua conta.
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-col">
                        <div className="flex items-baseline">
                          <span className="text-lg font-bold text-neutral-400 mr-1">R$</span>
                          <span className="text-6xl font-black tracking-tight text-neutral-900 font-['Space_Grotesk']">497</span>
                          <span className="text-gray-45b text-sm ml-2 font-medium">/vitalício</span>
                        </div>
                        <p className="text-[#D0011B] text-sm font-bold mt-2 font-sans">ou 12x de R$ 49,91</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-12">
                  <button 
                    onClick={() => window.open(
                      couponApplied 
                        ? "https://ggcheckout.app/checkout/v3/WQ583Zqro94TV375rMYX" 
                        : "https://ggcheckout.app/checkout/v3/FlMsckDK8sLlsPLeX8aa", 
                      "_blank"
                    )}
                    className="btn-custom w-full select-none"
                  >
                    <span>Comprar acesso vitalício</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="text-[10px] font-black tracking-[0.2em] text-[#D0011B] leading-none">Recursos</p>
                  <p className="text-[#D0011B] font-black text-base leading-none">Tudo do Mensal, mais:</p>
                  
                  <ul className="space-y-4 text-left">
                    {[
                      "Radar de Produtos",
                      "Creator Lab (Criativos com IA)",
                      "Viral Boost (Scripts Virais)",
                      "Lab Studio (Editor de Vídeos)",
                      "Comunidade Exclusiva",
                      "Mentoria em Grupo Mensal"
                    ].map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center text-[14px] text-neutral-700 font-bold leading-none font-sans">
                        <span className="mr-3 flex items-center justify-center w-5 h-5 rounded-full border border-[#D0011B]/30 text-[#D0011B] shrink-0">
                          <Check size={10} strokeWidth={3.5} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 font-bold tracking-wider text-center mt-8 font-sans">
                Pix · Cartão · Boleto
              </p>
            </div>

          </div>

          {/* URGENCY REGISTRATION BAR */}
          <div className="max-w-[700px] mx-auto bg-transparent border border-neutral-200/60 rounded-[18px] p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xs mt-10">
            <div className="w-12 h-12 bg-[#D0011B]/10 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle size={24} className="text-[#D0011B]" />
            </div>
            <div className="flex-1 text-center sm:text-left w-full">
              <span className="text-[#111111] text-base font-bold">Vagas limitadas</span>
              <div className="w-full h-2.5 bg-neutral-200/60 rounded-full overflow-hidden my-2.5">
                <div className="h-full bg-[#D0011B]" style={{ width: '85%' }} />
              </div>
              <div className="flex justify-between text-[11px] font-black">
                <span className="text-[#D0011B]">Restam apenas 15 acessos disponíveis com desconto.</span>
                <span className="text-gray-400 template-text uppercase tracking-wider">Apenas hoje</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 font-semibold text-center mt-6 uppercase tracking-wider">
            Ao efetuar a compra, você concorda com nossos Termos de Uso e Política de Privacidade.
          </p>

        </div>
      </section>

      {/* SEÇÃO FAQ */}
      <section id="faq" className="px-6 py-24 bg-transparent relative overflow-hidden">
        {/* Subtle decorative flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D0011B]/2 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-[840px] mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 border border-[#D0011B]/20 rounded-full px-4 py-1 text-[12px] font-semibold text-[#D0011B] mb-4 tracking-wide bg-[#D0011B]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D0011B] animate-pulse" />
              Dúvidas frequentes
            </span>
            <h2 className="text-[36px] sm:text-[44px] font-black text-neutral-900 leading-tight tracking-tight">
              Perguntas <span className="text-[#D0011B] italic font-serif font-normal font-sans">Frequentes</span>
            </h2>
            <p className="text-neutral-500 font-semibold text-sm sm:text-base mt-2">
              Tudo o que você precisa saber sobre a plataforma e o ShopSpy
            </p>
          </div>

          {/* Interactive Accordion questions container with elegant light style card */}
          <div className="glass-obsidian rounded-[32px] p-6 sm:p-10 flex flex-col h-full shadow-[0_12px_40px_rgba(0,0,0,0.03)] border-white/[0.05]">
            <div className="space-y-4 font-sans">
              {[
                {
                  q: "Quanto tempo leva para ver resultados?",
                  a: "Com dedicação, muitos usuários veem seus primeiros resultados em 3 a 7 dias. O ShopSpy facilita todo o processo, desde a mineração inteligente de produtos até a criação automatizada e atração de clientes."
                },
                {
                  q: "Preciso ter experiência anterior para usar?",
                  a: "Não! A plataforma foi desenvolvida para ser totalmente intuitiva para iniciantes. Além disso, disponibilizamos guias práticos do zero na Área de Membros para te guiar em todos os passos."
                },
                {
                  q: "O acesso vitalício realmente é taxa única?",
                  a: "Sim! No plano vitalício você realiza um único pagamento e tem acesso permanente à plataforma, incluindo todas as atualizações de recursos e novos produtos adicionados futuramente."
                },
                {
                  q: "Posso cancelar o plano a qualquer momento?",
                  a: "No plano mensal sim, você pode cancelar quando quiser através do suporte, sem taxas de fidelidade ou cancelamento compulsório."
                },
                {
                  q: "A ferramenta funciona para qualquer tipo de nicho?",
                  a: "Com certeza! Temos filtros inteligentes para Moda, Casa, Eletrônicos, Beleza, Ferramentas, Organização, Pet Shop e muito mais. Novos produtos populares são injetados na ferramenta semanalmente."
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-[18px] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#D0011B]/15 hover:bg-white/10"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <button className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors border-none bg-transparent cursor-pointer text-white">
                    <span className="font-semibold text-neutral-850 text-[15px] sm:text-[16px] pr-4">{item.q}</span>
                    <div className={`transition-transform duration-300 text-[#D0011B] shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 text-neutral-600 leading-relaxed text-[13px] sm:text-[14px] font-semibold border-t border-neutral-200/50 pt-4">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12 font-sans font-medium text-[14px] text-neutral-400">
            Ainda tem dúvidas?{' '}
            <a 
              href="https://wa.me/55" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#D0011B] underline hover:text-[#b00116] transition-colors font-bold ml-1"
            >
              Entre em contato conosco pelo WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION SECTOR */}
      <section className="px-6 py-20 bg-transparent relative overflow-hidden">
        {/* Soft radial backlight shading background decorative effects */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,rgba(208,1,27,0.06)_0%,transparent_75%)]" />
        
        <div className="max-w-[850px] mx-auto rounded-[32px] bg-white p-8 sm:p-14 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(208,1,27,0.08)] border border-[#D0011B]/15 bg-gradient-to-b from-white via-white to-neutral-50/50">
          {/* Glow Effect from the template */}
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[380px] h-[160px] bg-[#D0011B]/10 blur-[80px] rounded-full" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#FFDFE7]/35 border border-[#D0011B]/20 rounded-full py-1.5 px-4 mb-6 text-[10.5px] font-black text-[#D0011B] tracking-wider uppercase select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D0011B] animate-pulse" />
              Últimas vagas com desconto ativo
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 leading-tight sm:leading-[1.1] mb-6 tracking-tight font-sans">
              Não Fique de Fora da Maior <br />
              <span className="text-[#D0011B]">Oportunidade do Momento</span>
            </h2>
            
            <p className="text-neutral-600 text-sm sm:text-[15px] font-semibold mt-1 mb-10 leading-relaxed max-w-lg font-sans">
              Enquanto você pensa, outros já estão lucrando. A Shopee está explodindo — entre agora ou fique para trás.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto font-sans">
              <button 
                onClick={() => scrollToSection('planos')}
                className="btn-custom w-full sm:w-auto select-none"
              >
                <span>Quero garantir meu desconto</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              <button 
                onClick={onEnterLogin}
                className="w-full sm:w-auto bg-transparent border border-neutral-300 hover:bg-neutral-50 text-neutral-800 px-8 py-[15px] rounded-full text-[15.5px] font-extrabold transition-all hover:border-neutral-400 cursor-pointer font-sans select-none"
              >
                Acessar minha conta
              </button>
            </div>

            <p className="text-[11px] sm:text-[12px] text-neutral-500 font-bold tracking-wide mt-10 flex items-center justify-center gap-1.5 border-t border-neutral-100 pt-7 w-full select-none">
              🔒 Pagamento 100% seguro • Acesso imediato • Garantia de 7 dias
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#09090B] px-6 py-12 relative overflow-hidden font-sans border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-center md:text-left">
          
          <div className="max-w-xs flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://i.postimg.cc/yxg1xsb5/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png" 
                alt="ShopSpy Logo" 
                style={{ height: '24px' }} 
                className="w-auto shrink-0 select-none"
                referrerPolicy="no-referrer"
              />
              <span className="text-[18px] font-black tracking-tight text-white font-sans">
                Shop<span className="text-[#D0011B]">Spy</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
              A plataforma definitiva para dominar a Shopee como afiliado.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-550">
            <button onClick={() => scrollToSection('inicio')} className="text-gray-500 hover:text-white cursor-pointer bg-transparent border-none">Início</button>
            <button onClick={() => scrollToSection('beneficios')} className="text-gray-500 hover:text-white cursor-pointer bg-transparent border-none">Benefícios</button>
            <button onClick={() => scrollToSection('planos')} className="text-gray-500 hover:text-white cursor-pointer bg-transparent border-none">Planos</button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-500 hover:text-white cursor-pointer bg-transparent border-none">FAQ</button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-400 text-center relative z-10 w-full select-none">
          <div>
            ©2026 ShopSpy. Todos os direitos reservados. Sem afiliação oficial com a Shopee.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-650">Termos de Uso</a>
            <a href="#" className="hover:text-gray-650">Privacidade</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
