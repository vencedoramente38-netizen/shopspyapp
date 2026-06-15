import React, { useState } from 'react';
import { 
  Users, 
  Search,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Dumbbell,
  Shirt,
  Home,
  Wrench,
  Grid,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Copy,
  Download
} from 'lucide-react';
import { motion } from 'motion/react';
import GroupLoader from './GroupLoader';
import { products } from '../data/products';
import { Product } from '../types';

interface FindGroupsProps {
  onNotification: (message: string) => void;
}

const communities = [
  {
    title: "GRUPOS SHOPEE",
    description: "Centenas de grupos focados em achadinhos e links úteis de afiliados da Shopee.",
    url: "https://www.facebook.com/search/groups/?q=grupo%20shoppe&sde=Abo6mQGTwumSH8ghiQqAvvjPX7NFviMO4wSBhxr6grIQwUayjg5k0ye5FNdIS2HCiLkkJOB-TfP5YV29lVJ9zt3H&locale=pt_BR",
    reach: "+5.4 Milhões",
    niche: "Achados, Shopee, Cupons",
    engagement: "9.8 / 10 • Excelente",
    category: "Geral",
    icon: Sparkles,
    color: "text-orange-500"
  },
  {
    title: "GRUPOS DE PROMOÇÕES",
    description: "Canais gerais de divulgação de cupons, ofertas relâmpago e promoções diárias.",
    url: "https://www.facebook.com/search/groups/?q=grupo%20promo%C3%A7%C3%B5es&sde=Abo6mQGTwumSH8ghiQqAvvjPX7NFviMO4wSBhxr6grIQwUayjg5k0ye5FNdIS2HCiLkkJOB-TfP5YV29lVJ9zt3H&locale=pt_BR",
    reach: "+8.2 Milhões",
    niche: "Multinicho, Ofertas, E-commerce",
    engagement: "9.5 / 10 • Excelente",
    category: "Geral",
    icon: Sparkles,
    color: "text-red-500"
  },
  {
    title: "GRUPOS ACADEMIA",
    description: "Comunidades engajadas em fitness, treinos, suplementos e vestuário esportivo.",
    url: "https://www.facebook.com/search/groups/?q=grupos%20promo%C3%A7%C3%B5es%20academia&sde=Abo6mQGTwumSH8ghiQqAvvjPX7NFviMO4wSBhxr6grIQwUayjg5k0ye5FNdIS2HCiLkkJOB-TfP5YV29lVJ9zt3H&locale=pt_BR",
    reach: "+1.8 Milhão",
    niche: "Suplementos, Roupas Fitness, Treino",
    engagement: "9.6 / 10 • Excelente",
    category: "Academia / Fitness",
    icon: Dumbbell,
    color: "text-emerald-500"
  },
  {
    title: "GRUPOS ROUPAS FEMININA",
    description: "Espaços ideais para moda feminina, tendências, calçados e maquiagens virais.",
    url: "https://www.facebook.com/search/groups?q=grupos%20promo%C3%A7%C3%B5es%20roupas%20feminina&sde=Abo6mQGTwumSH8ghiQqAvvjPX7NFviMO4wSBhxr6grIQwUayjg5k0ye5FNdIS2HCiLkkJOB-TfP5YV29lVJ9zt3H&locale=pt_BR",
    reach: "+3.6 Milhões",
    niche: "Moda Feminina, Vestuário, Estilo",
    engagement: "9.9 / 10 • Excelente",
    category: "Moda / Roupas",
    icon: Shirt,
    color: "text-fuchsia-500"
  },
  {
    title: "GRUPOS ROUPAS MASCULINAS",
    description: "Comunidades de vestuário masculino, calçados esportivos, dicas de estilo e acessórios.",
    url: "https://www.facebook.com/search/groups/?q=grupos%20promo%C3%A7%C3%B5es%20roupas%20MASCULINAS&sde=Abo6mQGTwumSH8ghiQqAvvjPX7NFviMO4wSBhxr6grIQwUayjg5k0ye5FNdIS2HCiLkkJOB-TfP5YV29lVJ9zt3H&locale=pt_BR",
    reach: "+2.1 Milhões",
    niche: "Moda Masculina, Tênis, Streetwear",
    engagement: "9.2 / 10 • Excelente",
    category: "Moda / Roupas",
    icon: Shirt,
    color: "text-blue-500"
  },
  {
    title: "GRUPOS DE ACESSORIOS PARA CASA",
    description: "Público altamente qualificado interessado em decoração, utilitários domésticos e organização de lares.",
    url: "https://www.facebook.com/search/groups/?q=GRUPOS%20DE%20ACESSORIOS%20PARA%20CASA&sde=Abo6mQGTwumSH8ghiQqAvvjPX7NFviMO4wSBhxr6grIQwUayjg5k0ye5FNdIS2HCiLkkJOB-TfP5YV29lVJ9zt3H&locale=pt_BR",
    reach: "+4.2 Milhões",
    niche: "Utilidades Domésticas, Decoração, Cozinha",
    engagement: "9.7 / 10 • Excelente",
    category: "Casa / Utilidades",
    icon: Home,
    color: "text-amber-500"
  },
  {
    title: "GRUPOS DE FERRAMENTA",
    description: "Comunidades de bricolagem, ferramentas automotivas, reformas, reparos e marcenaria.",
    url: "https://www.facebook.com/search/groups/?q=GRUPOS%20DE%20FERRAMENTA&sde=Abo6mQGTwumSH8ghiQqAvvjPX7NFviMO4wSBhxr6grIQwUayjg5k0ye5FNdIS2HCiLkkJOB-TfP5YV29lVJ9zt3H&locale=pt_BR",
    reach: "+1.5 Milhão",
    niche: "Ferramentas, DIY, Construção, Reparos",
    engagement: "9.0 / 10 • Altíssimo",
    category: "Ferramentas / Oficina",
    icon: Wrench,
    color: "text-slate-500"
  }
];

const categories = ["Todos", "Geral", "Academia / Fitness", "Moda / Roupas", "Casa / Utilidades", "Ferramentas / Oficina"];

export default function FindGroups({ onNotification }: FindGroupsProps) {
  // Main states
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [groupCopies, setGroupCopies] = useState<Record<string, { copy: string; product: Product }>>({});
  const [groupVariations, setGroupVariations] = useState<Record<string, number>>({});
  const [groupAffiliateLinks, setGroupAffiliateLinks] = useState<Record<string, string>>({});
  
  // Modal state for selecting products
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [modalSearchQuery, setModalSearchQuery] = useState("");
  
  // New States for step-by-step search configuration
  const [setupProductId, setSetupProductId] = useState<number>(() => {
    const saved = localStorage.getItem('shopspy_findgroups_product_id');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [setupAffiliateLink, setSetupAffiliateLink] = useState<string>(() => {
    return localStorage.getItem('shopspy_findgroups_affiliate_link') || "";
  });

  const [isSearchingDone, setIsSearchingDone] = useState<boolean>(() => {
    return localStorage.getItem('shopspy_findgroups_searching_done') === 'true';
  });

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [setupVariation, setSetupVariation] = useState<number>(0);

  const [favorites] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('shopspy_favorites') || '[]');
    } catch {
      return [];
    }
  });

  const downloadProductImage = async (product: Product) => {
    if (!product) return;
    try {
      setIsDownloadingImage(true);
      onNotification("Iniciando download da imagem...");
      const response = await fetch(product.imagem);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${product.nome.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.webp`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      onNotification("Imagem salva com sucesso! 📸");
    } catch (err) {
      console.warn("Direct blob download failed, falling back to page open:", err);
      onNotification("Download alternativo iniciado em nova aba...");
      window.open(product.imagem, '_blank');
    } finally {
      setIsDownloadingImage(false);
    }
  };

  // Keep state in sync with localStorage
  React.useEffect(() => {
    if (setupProductId !== 0) {
      localStorage.setItem('shopspy_findgroups_product_id', String(setupProductId));
    } else {
      localStorage.removeItem('shopspy_findgroups_product_id');
    }
  }, [setupProductId]);

  React.useEffect(() => {
    localStorage.setItem('shopspy_findgroups_affiliate_link', setupAffiliateLink);
  }, [setupAffiliateLink]);

  const handleStartSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (setupProductId === 0) {
      onNotification("⚠️ Selecione um produto para encontrar os grupos!");
      return;
    }
    
    setIsSearching(true);
    
    // Simulate real web scanning progress with the GroupLoader
    setTimeout(() => {
      setIsSearching(false);
      setIsSearchingDone(true);
      localStorage.setItem('shopspy_findgroups_searching_done', 'true');
      onNotification("🔥 Comunidades encontradas com sucesso!");
    }, 2800);
  };

  const handleResetSearch = () => {
    setIsSearchingDone(false);
    localStorage.removeItem('shopspy_findgroups_searching_done');
  };

  const generateVariation = (product: Product, affiliateLink: string, variation: number): string => {
    const variations = [
      `🔥 ${product.nome}\n\n💰 Apenas ${product.preco} | ${product.comissao} de comissão\n✅ ${product.vendas} já compraram!\n✅ Entrega rápida\n✅ Produto verificado\n\n👉 Compre agora: ${affiliateLink || product.link}\n\n⚡ Oferta por tempo limitado!`,
      `😱 Você precisa ver isso!\n\n${product.nome}\n\nPor apenas ${product.preco} com ${product.comissao} de comissão!\nMais de ${product.vendas} vendidos — qualidade garantida 🏆\n\n🔗 Link: ${affiliateLink || product.link}\n\n🕐 Não perca, estoque limitado!`,
      `💡 Dica de produto viral!\n\n📦 ${product.nome}\n📊 ${product.vendas} vendidos\n💸 ${product.preco} | Comissão: ${product.comissao}\n\nEste produto está bombando! Aproveite antes que suba o preço 🚀\n\n➡️ ${affiliateLink || product.link}`,
      `⚡ ACHEI UMA BOMBA!\n\n${product.nome}\n\nTá saindo por ${product.preco} 🔥\n${product.comissao} de comissão para afiliados!\nJá são ${product.vendas} compradores felizes!\n\nPega logo pelo link: ${affiliateLink || product.link}`,
      `🚨 ALERTA DE PRODUTO QUE ESTÁ ESGOTANDO COM PREÇO BAIXO!\n\n👉 ${product.nome}\n\n💰 Por apenas ${product.preco}\n⭐ Avaliado em ${product.avaliacao}/5.0\n📊 ${product.vendas} vendas!\n\nCompre direto no site oficial antes de esgotar o estoque: ${affiliateLink || product.link}`,
      `📦 Unboxing time! Alguém já comprou o ${product.nome}?\n\nJuro, chegou super rápido e a qualidade é boba de tão boa! 😍\nComissão ótima de ${product.comissao} e apenas ${product.preco}!\n\nDeixei o link pra quem quiser aproveitar o desconto: ${affiliateLink || product.link}`,
      `💸 Dica de economia: o melhor custo-benefício de ${product.categoria}!\n\nO famoso ${product.nome}\n💸 Preço: ${product.preco}\n⭐ Qualidade premium recomendada!\n\n🔗 Pegue seu cupom de frete grátis + link de afiliado oficial: ${affiliateLink || product.link}`,
      `🔍 Análise sincera: o ${product.nome} realmente do que promete?\n\n- Classificação média maravilhosa de ${product.avaliacao} estrelas\n- ${product.vendas} avaliações reais de clientes\n- Entrega Expressa e Segura\n\nCompre conosco direto do distribuidor oficial: ${affiliateLink || product.link}`,
      `⭐ O produto número #1 das redes sociais agora em promoção!\n\n✨ ${product.nome}\n💰 Super Preço: ${product.preco} (Até durarem os estoques)\n\nClique no link e economize agora mesmo: ${affiliateLink || product.link}`,
      `🎁 Promoção Imperdível de Hoje! 🎁\n\nNão compre ${product.categoria} sem ver o ${product.nome} antes!\nPor apenas ${product.preco} e com ${product.comissao} de comissão!\n\n⚡ Veja mais detalhes e adquira pelo link com desconto: ${affiliateLink || product.link}`,
      `🛠️ Solução perfeita para facilitar o seu dia a dia!\n\nChega de passar raiva! Conheça o ${product.nome}.\n📊 Recomendado por mais de ${product.vendas} clientes.\n\n🔗 Link direto do achado: ${affiliateLink || product.link}`,
      `🚀 O segredo do sucesso do ${product.nome} viral do TikTok!\n\nSuper prático, lindo e essencial na categoria ${product.categoria}!\n💰 Valor promocional: ${product.preco}\n\n👉 Adquira o seu no link oficial: ${affiliateLink || product.link}`
    ];
    return variations[variation % variations.length];
  };

  const handleNewVariation = (groupTitle: string) => {
    const currentVal = groupCopies[groupTitle];
    if (!currentVal) return;
    const nextVarIdx = (groupVariations[groupTitle] ?? 0) + 1;
    setGroupVariations(prev => ({ ...prev, [groupTitle]: nextVarIdx }));
    const affiliateLink = groupAffiliateLinks[groupTitle] || setupAffiliateLink || "";
    const newCopyText = generateVariation(currentVal.product, affiliateLink, nextVarIdx);
    setGroupCopies(prev => ({
      ...prev,
      [groupTitle]: { ...prev[groupTitle], copy: newCopyText }
    }));
    onNotification("Nova variação gerada! ⚡");
  };

  const handleInstantGenerateCopy = (groupTitle: string) => {
    const selectedProd = products.find(p => p.id === setupProductId);
    if (!selectedProd) {
      onNotification("⚠️ Selecione um produto primeiro!");
      return;
    }

    const initialCopy = generateVariation(selectedProd, setupAffiliateLink, 0);
    setGroupCopies(prev => ({
      ...prev,
      [groupTitle]: { copy: initialCopy, product: selectedProd }
    }));
    setGroupAffiliateLinks(prev => ({
      ...prev,
      [groupTitle]: setupAffiliateLink
    }));
    setGroupVariations(prev => ({
      ...prev,
      [groupTitle]: 0
    }));
    onNotification("Copy gerada com sucesso! ⚡");
  };

  const filteredCommunities = communities.filter(c => {
    const matchesCategory = selectedCategory === "Todos" || c.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === "" || 
                          c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.niche.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedProductObj = products.find(p => p.id === setupProductId);

  const modalFilteredProducts = products
    .filter(p => {
      const matchSearch = modalSearchQuery.trim() === "" || 
                          p.nome.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
                          p.categoria.toLowerCase().includes(modalSearchQuery.toLowerCase());
      return matchSearch;
    })
    .sort((a, b) => {
      const aFav = favorites.includes(a.id) ? 1 : 0;
      const bFav = favorites.includes(b.id) ? 1 : 0;
      return bFav - aFav; // Favorites first
    });

  return (
    <div className="flex-1 bg-gray-50 dark:bg-[#0a0a0a] p-6 custom-scrollbar overflow-y-auto font-sans min-h-screen text-gray-900 dark:text-white transition-colors duration-300 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Banner principal limpo */}
        <div className="text-center py-4 space-y-3">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 bg-[#D0011B]/10 dark:bg-[#D0011B]/20 text-[#D0011B] text-[11px] uppercase font-black px-3.5 py-1.5 rounded-full shadow-sm tracking-widest">
              💥 Inteligência de Divulgação
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black gradient-title leading-tight font-['Space_Grotesk']">
            Encontrar Comunidades de Vendas
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Acesse as maiores redes de tráfego orgânico no Facebook organizadas por nichos para postar seus vídeos e links de afiliado.
          </p>
        </div>

        {/* 1. SE APENAS ESTIVER BUSCANDO */}
        {isSearching ? (
          <div className="py-8">
            <GroupLoader />
          </div>
        ) : !isSearchingDone ? (
          /* 2. CONFIGURAÇÃO ANTES DE MOSTRAR AS COMUNIDADES */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 font-['Space_Grotesk']"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-black text-gray-900 dark:text-white">
                🔍 Configurar sua Divulgação
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
                Para sugerir as melhores comunidades e já gerar os materiais de vendas personalizados, escolha o produto que deseja divulgar.
              </p>
            </div>

            <form onSubmit={handleStartSearch} className="space-y-4">
              {/* Dropdown de Produto */}
              <div className="space-y-2">
                <label className="text-xs text-gray-700 dark:text-neutral-300 font-bold uppercase tracking-wider block">
                  1. Selecione o Produto Viral
                </label>
                
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(true)}
                  className="w-full text-left p-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-white/[0.08] hover:border-[#D0011B]/50 dark:hover:border-[#D0011B]/50 rounded-xl text-gray-900 dark:text-white text-xs font-bold outline-none transition-all flex items-center justify-between cursor-pointer space-x-3 shadow-inner hover:shadow-md"
                >
                  {selectedProductObj ? (
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img 
                        src={selectedProductObj.imagem} 
                        alt={selectedProductObj.nome}
                        className="w-10 h-10 object-cover rounded-lg border border-black/5 dark:border-white/10 shrink-0 bg-white"
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.currentTarget.src = "https://i.postimg.cc/yxg1xsb5/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png"; }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {favorites.includes(selectedProductObj.id) && (
                            <span className="text-[#D0011B] text-[10px] uppercase font-black tracking-widest shrink-0">❤️ Favorito</span>
                          )}
                          <span className="text-[9px] bg-[#D0011B]/10 text-[#D0011B] dark:bg-white/[0.04] dark:text-neutral-400 font-extrabold px-1.5 py-0.5 rounded tracking-wider shrink-0 uppercase">{selectedProductObj.categoria}</span>
                        </div>
                        <p className="font-bold text-xs truncate text-gray-900 dark:text-white leading-tight">
                          {selectedProductObj.nome}
                        </p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-0.5">
                          {selectedProductObj.preco} • {selectedProductObj.comissao} de comissão
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-400 dark:text-white/30">
                      <Sparkles size={14} className="text-[#D0011B]" />
                      <span>Clique para escolher um Produto Viral...</span>
                    </div>
                  )}
                  <ChevronDown size={16} className="text-gray-400 dark:text-white/40 shrink-0" />
                </button>

                {favorites.length > 0 && (
                  <p className="text-[10px] text-gray-400 dark:text-white/40 font-semibold leading-relaxed">
                    💡 Produtos marcados com ❤️ estão na sua lista de favoritos!
                  </p>
                )}
              </div>

              {/* Link de Afiliado */}
              <div className="space-y-2">
                <label className="text-xs text-gray-700 dark:text-neutral-300 font-bold uppercase tracking-wider block">
                  2. Cole seu Link de Afiliado (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Cole seu link oficial de afiliado da Shopee (ex: https://shope.ee/...)"
                  value={setupAffiliateLink}
                  onChange={(e) => setSetupAffiliateLink(e.target.value)}
                  className="w-full p-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-white/[0.08] focus:border-[#D0011B] dark:focus:border-[#D0011B] rounded-xl text-gray-900 dark:text-white text-xs font-bold outline-none transition-all focus:ring-1 focus:ring-[#D0011B]/40"
                />
                <p className="text-[10px] text-gray-400 dark:text-white/40 font-semibold">
                  Sua copy de vendas será automaticamente configurada com este link. Se deixar em branco, o link sugerido do produto será utilizado.
                </p>
              </div>

              {/* Botão de Encontrar Grupos */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-custom w-full font-black text-sm tracking-wide relative overflow-hidden group !py-[15px] !rounded-xl cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Search size={16} className="shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span>Encontrar grupos de divulgação</span>
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* 3. COM COMUNIDADES LIBERADAS */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Barra de Configurações Ativas Superior */}
            <div className="bg-[#D0011B]/5 border border-[#D0011B]/10 dark:bg-[#D0011B]/10 dark:border-[#D0011B]/15 px-4 py-3 sm:px-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-['Space_Grotesk']">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-[10px] font-black tracking-wider bg-[#D0011B]/10 text-[#D0011B] px-2 py-0.5 rounded uppercase self-start sm:self-auto">
                  Produto Ativo
                </span>
                <span className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                  {selectedProductObj ? selectedProductObj.nome : "Nenhum Produto Escolhido"}
                </span>
              </div>
              <button
                onClick={handleResetSearch}
                className="text-[11px] font-bold text-[#D0011B] hover:underline flex items-center gap-1.5 cursor-pointer shrink-0 transition-all"
              >
                🔄 Trocar Produto ou Link
              </button>
            </div>

            {/* MATERIAL DE DIVULGAÇÃO DO PRODUTO – INTEGRADO DA ABA DE EXTRAÇÃO */}
            {selectedProductObj && (
              <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] p-5 sm:p-6 rounded-2xl shadow-sm space-y-4 font-['Space_Grotesk']">
                <div className="flex items-center gap-2 pb-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                  <Sparkles size={16} className="text-[#D0011B]" />
                  <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
                    📋 Material de Divulgação do Produto
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Info Inicial do Produto com Imagem */}
                  <div className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-900/40 p-3 rounded-xl border border-black/5 dark:border-white/[0.04]">
                    <img 
                      src={selectedProductObj.imagem} 
                      alt={selectedProductObj.nome}
                      className="w-16 h-16 object-cover rounded-xl border border-black/10 dark:border-white/10 bg-white"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = "https://i.postimg.cc/yxg1xsb5/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png"; }}
                    />
                    <div className="min-w-0 flex-grow">
                      <span className="text-[9px] bg-[#D0011B]/15 text-[#D0011B] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {selectedProductObj.categoria}
                      </span>
                      <h4 className="text-xs font-black text-gray-900 dark:text-white truncate mt-1">
                        {selectedProductObj.nome}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold mt-0.5">
                        {selectedProductObj.preco} • Comissão: <b>{selectedProductObj.comissao}</b>
                      </p>
                    </div>
                  </div>

                  {/* Campo NOME */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 block font-sans">
                      NOME:
                    </span>
                    <div className="relative flex items-center justify-between bg-neutral-50 dark:bg-[#18181a] border border-neutral-100 dark:border-white/[0.04] p-3 rounded-xl">
                      <p className="text-xs font-bold leading-relaxed text-gray-800 dark:text-white/90 pr-10 line-clamp-1">
                        {selectedProductObj.nome}
                      </p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedProductObj.nome);
                          onNotification("Nome do produto copiado! 📋");
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-neutral-200/50 hover:bg-neutral-300 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white cursor-pointer transition-colors shrink-0"
                        title="Copiar Nome"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Campo LINK DO PRODUTO */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 block font-sans">
                      LINK DO PRODUTO:
                    </span>
                    <div className="relative flex items-center justify-between bg-neutral-50 dark:bg-[#18181a] border border-neutral-100 dark:border-white/[0.04] p-3 rounded-xl">
                      <p className="text-xs font-bold leading-relaxed text-gray-800 dark:text-white/90 pr-10 truncate">
                        {selectedProductObj.link}
                      </p>
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex gap-1.5">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedProductObj.link);
                            onNotification("Link do produto copiado! 📋");
                          }}
                          className="p-2 rounded-lg bg-neutral-200/50 hover:bg-neutral-300 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white cursor-pointer transition-colors"
                          title="Copiar Link"
                        >
                          <Copy size={13} />
                        </button>
                        <a
                          href={selectedProductObj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-[#D0011B] hover:bg-[#D0011B]/90 text-white cursor-pointer transition-colors flex items-center justify-center shadow-sm"
                          title="Acessar Link original"
                        >
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Campo LINK DE AFILIADO */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 block font-sans">
                      LINK DE AFILIADO:
                    </span>
                    <div className="relative flex items-center justify-between bg-neutral-50 dark:bg-[#18181a] border border-neutral-100 dark:border-white/[0.04] p-3 rounded-xl">
                      <p className={`text-xs font-bold leading-relaxed pr-10 truncate ${setupAffiliateLink ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-neutral-500 italic"}`}>
                        {setupAffiliateLink || "Nenhum link de afiliado cadastrado. Usando o link original do produto."}
                      </p>
                      <button
                        onClick={() => {
                          const valToCopy = setupAffiliateLink || selectedProductObj.link;
                          navigator.clipboard.writeText(valToCopy);
                          onNotification(setupAffiliateLink ? "Link de afiliado copiado! 📋" : "Link original do produto copiado! 📋");
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-neutral-200/50 hover:bg-neutral-300 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white cursor-pointer transition-colors shrink-0"
                        title="Copiar Link"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Campo COPY DE VENDA */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 block font-sans">
                        COPY DE VENDA:
                      </span>
                      <span className="text-[10px] font-black tracking-wider text-[#D0011B] uppercase bg-[#D0011B]/15 px-2.5 py-0.5 rounded-full">
                        Estilo #{setupVariation + 1} de 12
                      </span>
                    </div>
                    
                    <div className="relative flex flex-col bg-neutral-50 dark:bg-[#18181a] border border-neutral-100 dark:border-white/[0.04] p-3.5 rounded-xl">
                      <div className="text-xs font-bold leading-relaxed text-gray-800 dark:text-white/90 whitespace-pre-wrap pr-12 max-h-[140px] overflow-y-auto custom-scrollbar">
                        {generateVariation(selectedProductObj, setupAffiliateLink, setupVariation)}
                      </div>
                      
                      {/* Copy to Clipboard Trigger */}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(generateVariation(selectedProductObj, setupAffiliateLink, setupVariation));
                          onNotification(`Copy (Estilo #${setupVariation + 1}) copiada! 🚀`);
                        }}
                        className="absolute right-2.5 top-3 p-2 rounded-lg bg-neutral-200/50 hover:bg-neutral-300 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white cursor-pointer transition-colors shrink-0"
                        title="Copiar para área de transferência"
                      >
                        <Copy size={13} />
                      </button>

                      {/* Interactive Copy Variation Control panel */}
                      <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-white/[0.04] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSetupVariation(prev => (prev === 0 ? 11 : prev - 1));
                              onNotification("Estilo anterior carregado! 💡");
                            }}
                            className="p-1 px-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-all flex items-center justify-center cursor-pointer select-none border-none"
                            title="Voltar Estilo"
                          >
                            <ChevronLeft size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSetupVariation(prev => (prev === 11 ? 0 : prev + 1));
                              onNotification("Próximo estilo de copy! 💡");
                            }}
                            className="p-1 px-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-all flex items-center justify-center cursor-pointer select-none border-none"
                            title="Avançar Estilo"
                          >
                            <ChevronRight size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            let nextRandomVal = setupVariation;
                            while (nextRandomVal === setupVariation) {
                              nextRandomVal = Math.floor(Math.random() * 12);
                            }
                            setSetupVariation(nextRandomVal);
                            onNotification("Estilo de copy alternado aleatoriamente! ⚡");
                          }}
                          className="text-[10.5px] bg-[#D0011B]/10 hover:bg-[#D0011B]/20 text-[#D0011B] border border-none rounded-lg px-2.5 py-1 font-bold transition-all flex items-center gap-1 active:scale-95 cursor-pointer select-none"
                        >
                          <Sparkles size={10} />
                          <span>Nova variação</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Campo IMAGEM com Baixar Imagem */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 block font-sans">
                      IMAGEM:
                    </span>
                    <div className="relative flex items-center justify-between bg-neutral-50 dark:bg-[#18181a] border border-neutral-100 dark:border-white/[0.04] p-3 rounded-xl">
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 truncate pr-36 font-mono">
                        {selectedProductObj.nome.slice(0, 15).replace(/[^a-zA-Z0-9]/g, '_')}_Imagem_Full.webp
                      </p>
                      <button
                        onClick={() => downloadProductImage(selectedProductObj)}
                        disabled={isDownloadingImage}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-[#D0011B] hover:bg-[#D0011B]/95 disabled:opacity-50 text-white font-bold text-[11px] py-1.5 px-3.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        {isDownloadingImage ? (
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Download size={12} />
                        )}
                        <span>{isDownloadingImage ? "Processando..." : "Baixar imagem"}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Caixa de Pesquisa e Filtros */}
            <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] p-4 sm:p-6 rounded-2xl shadow-sm space-y-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar grupos por nome, nicho ou palavras-chave (ex: shopee, academia)..."
                  className="w-full bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-xs font-bold focus:outline-none focus:border-[#D0011B] focus:ring-1 focus:ring-[#D0011B]/50 text-gray-900 dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                />
              </div>

              {/* Barra de Categorias */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                <Grid size={15} className="text-gray-400 shrink-0 mr-1" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                      selectedCategory === cat 
                        ? "bg-[#D0011B] text-white" 
                        : "bg-white dark:bg-[#111111] text-gray-600 dark:text-gray-300 border border-black/5 dark:border-white/[0.08] hover:bg-gray-100 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.06] pb-2">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#D0011B]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-['Space_Grotesk']">
                  Resultados Encontrados ({filteredCommunities.length} nichos)
                </h3>
              </div>
            </div>

            {/* Grid de Comunidades Reais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
              {filteredCommunities.map((group, index) => {
                const IconComponent = group.icon;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={group.title}
                    className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] p-6 rounded-2xl flex flex-col justify-between shadow-md dark:shadow-xl hover:border-red-500/20 dark:hover:border-red-500/30 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      {/* Badge & Status */}
                      <div className="flex items-center justify-between">
                        <span className="bg-[#1877F2]/10 text-[#1877F2] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                          <IconComponent size={10} className={group.color} />
                          {group.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-emerald-500 text-[11px] font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Ativo e Verificado
                        </span>
                      </div>

                      {/* Header do info do grupo */}
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2 font-['Space_Grotesk']">
                          {group.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
                          {group.description}
                        </p>
                      </div>

                      {/* Estatísticas e Informações */}
                      <div className="bg-neutral-50 dark:bg-white/[0.02] border border-black/[0.03] dark:border-white/[0.04] rounded-xl p-4 space-y-2.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 dark:text-gray-400 font-medium">Membros Totais:</span>
                          <span className="font-bold text-gray-900 dark:text-white">{group.reach}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 dark:text-gray-400 font-medium">Nicho Ideal:</span>
                          <span className="font-bold text-gray-900 dark:text-white">{group.niche}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 dark:text-gray-400 font-medium">Engajamento:</span>
                          <span className="font-bold text-emerald-500">{group.engagement}</span>
                        </div>
                      </div>
                    </div>

                    {/* Botão de Ação */}
                    <div className="mt-6 pt-2">
                      <a 
                        href={group.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#1877F2] hover:brightness-110 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors active:scale-[0.98] shadow-md shadow-[#1877F2]/20 cursor-pointer"
                      >
                        <span>Acessar Grupo no Facebook</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>

                    {/* Botão Gerar Copy de Vendas Instantânea */}
                    <button
                      onClick={() => handleInstantGenerateCopy(group.title)}
                      style={{
                        width: '105%',
                        marginLeft: '-2.5%',
                        marginTop: 8,
                        padding: '8px 14px',
                        background: 'rgba(208,1,27,0.08)',
                        border: '1px solid rgba(208,1,27,0.2)',
                        borderRadius: 8,
                        color: '#D0011B',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6
                      }}
                      className="font-['Space_Grotesk'] transition-all hover:bg-[#D0011B]/10 active:scale-[0.98]"
                    >
                      <Sparkles size={13} /> Gerar Copy de Vendas
                    </button>

                    {/* Copy gerada abaixo do grupo correspondente */}
                    {groupCopies[group.title] && (
                      <div
                        className="font-['Space_Grotesk'] text-left flex flex-col gap-2 bg-[#D0011B]/5 dark:bg-[#D0011B]/10 border border-[#D0011B]/15 dark:border-[#D0011B]/20 rounded-xl p-3.5 mt-2"
                      >
                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: '11px', color: '#D0011B', fontWeight: 700 }}>
                            ✅ Copy gerada para este grupo:
                          </span>
                          <span className="text-[10px] font-bold text-gray-500 dark:text-white/50">
                            (Variação {((groupVariations[group.title] ?? 0) % 12) + 1}/12)
                          </span>
                        </div>
                        <div 
                          style={{
                            fontSize: '13px',
                            whiteSpace: 'pre-wrap',
                            maxHeight: '160px',
                            overflowY: 'auto'
                          }}
                          className="custom-scrollbar pr-1 bg-neutral-100 dark:bg-black/25 text-neutral-800 dark:text-neutral-200 p-2.5 rounded-lg border border-neutral-200 dark:border-white/[0.05]"
                        >
                          {groupCopies[group.title].copy}
                        </div>
                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(groupCopies[group.title].copy);
                              onNotification("Copiado com sucesso! 📋");
                            }}
                            className="bg-[#D0011B] hover:bg-[#D0011B]/90 text-white font-bold py-1.5 px-3 rounded-lg flex-1 text-center justify-center items-center flex gap-1.5 transition-all text-xs active:scale-95 cursor-pointer"
                          >
                            Copiar
                          </button>
                          <button
                            onClick={() => handleNewVariation(group.title)}
                            className="bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/15 text-neutral-800 dark:text-white border border-neutral-300 dark:border-white/10 font-bold py-1.5 px-3 rounded-lg flex-1 text-center justify-center items-center flex gap-1.5 transition-all text-xs active:scale-95 cursor-pointer"
                          >
                            🔄 Nova variação
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Dicas de Engajamento */}
            <div className="bg-gradient-to-r from-red-500/5 to-transparent dark:from-[#D0011B]/5 border border-black/5 dark:border-white/[0.06] rounded-2xl p-6 space-y-4">
              <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 font-['Space_Grotesk']">
                <CheckCircle2 className="text-[#D0011B] shrink-0" size={18} />
                💡 Dicas de Ouro para Postar nas Comunidades
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
                <li className="space-y-1">
                  <span className="text-gray-900 dark:text-white font-black block">1. Use nossa Descrição e Vídeo</span>
                  <p className="text-gray-500 dark:text-gray-400 font-[450] leading-relaxed">
                    Sempre copie a sua <strong>Descrição do Produto</strong> na aba de produtos e use os prompts de vídeo recomendados para criar anúncios UGC que geram cliques sem parecer propaganda chata.
                  </p>
                </li>
                <li className="space-y-1">
                  <span className="text-gray-900 dark:text-white font-black block">2. Chame Atenção nos Comentários</span>
                  <p className="text-gray-500 dark:text-gray-400 font-[450] leading-relaxed">
                    Poste o vídeo de impacto e envie o seu link oficial de afiliado no primeiro comentário, deixando uma breve chamada de ação. Isso aumenta as chances de o post ser aprovado!
                  </p>
                </li>
                <li className="space-y-1">
                  <span className="text-gray-900 dark:text-white font-black block">3. Interaja com Membros</span>
                  <p className="text-gray-500 dark:text-gray-400 font-[450] leading-relaxed">
                    Responda às dúvidas de potenciais clientes demonstrando paciência e autoridade sobre o produto. A confiança é o fator número #1 que decide a venda.
                  </p>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

      </div>

      {/* MODAL DE SELECIONAR PRODUTO VIRAL */}
      {isProductModalOpen && (
        <div 
          onClick={() => setIsProductModalOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-[4px] z-50 flex items-center justify-center p-4 font-['Space_Grotesk']"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-[#111111] border border-black/10 dark:border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-5 border-b border-black/10 dark:border-white/[0.08] flex items-center justify-between bg-neutral-50 dark:bg-neutral-950">
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={16} className="text-[#D0011B]" />
                  Selecione o Produto Viral
                </h3>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 font-semibold mt-0.5">
                  Seus favoritos aparecem com ❤️ no topo da lista
                </p>
              </div>
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Busca */}
            <div className="p-4 border-b border-black/5 dark:border-white/[0.04] bg-white dark:bg-[#111111]">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  placeholder="Pesquisar por nome ou categoria..."
                  className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#D0011B] focus:ring-1 focus:ring-[#D0011B]/50 text-gray-900 dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                />
              </div>
            </div>

            {/* Lista com scrollbar personalizado */}
            <div className="p-3 overflow-y-auto max-h-[50vh] space-y-2 custom-scrollbar flex-1 bg-neutral-50/50 dark:bg-black/15">
              {modalFilteredProducts.length > 0 ? (
                modalFilteredProducts.map((p) => {
                  const isFav = favorites.includes(p.id);
                  const isSelected = setupProductId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSetupProductId(p.id);
                        setIsProductModalOpen(false);
                        onNotification(`Produto definido: ${p.nome.slice(0, 25)}... 🚀`);
                      }}
                      className={`w-full text-left p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected 
                          ? "bg-[#D0011B]/10 border-[#D0011B] text-[#D0011B] dark:bg-[#D0011B]/15" 
                          : "bg-white dark:bg-[#151515] border-black/5 dark:border-white/[0.05] hover:border-[#D0011B]/30 hover:scale-[1.005]"
                      }`}
                    >
                      <img 
                        src={p.imagem} 
                        alt={p.nome}
                        className="w-12 h-12 object-cover rounded-lg border border-black/5 dark:border-white/10 shrink-0 bg-white"
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.currentTarget.src = "https://i.postimg.cc/yxg1xsb5/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png"; }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          {isFav ? (
                            <span className="text-[#D0011B] text-[9px] uppercase font-black tracking-widest shrink-0 flex items-center gap-0.5">
                              ❤️ Favorito
                            </span>
                          ) : (
                            <span className="text-[9px] bg-neutral-100 text-neutral-600 dark:bg-white/[0.04] dark:text-neutral-400 font-extrabold px-1.5 py-0.5 rounded tracking-wider shrink-0 uppercase">
                              {p.categoria}
                            </span>
                          )}
                          <span className="text-[9px] text-gray-400 dark:text-gray-500 font-medium ml-auto">
                            🔥 Rank {p.ranking}
                          </span>
                        </div>
                        <p className={`font-bold text-xs truncate leading-snug ${isSelected ? "text-[#D0011B]" : "text-gray-900 dark:text-white"}`}>
                          {p.nome}
                        </p>
                        <div className="flex items-center justify-between mt-1 text-[10px] text-gray-500 font-semibold">
                          <span className="text-emerald-500">{p.preco}</span>
                          <span>Comissão: <b className="text-gray-700 dark:text-gray-300">{p.comissao}</b></span>
                          <span>{p.vendas} vendidos</span>
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-gray-400 dark:text-white/20 text-xs font-bold space-y-1">
                  <p>Nenhum produto encontrado...</p>
                  <p className="text-[10px] font-medium text-gray-500">Tente buscar por termos mais genéricos.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
