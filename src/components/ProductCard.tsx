import React, { useState, useEffect } from 'react';
import { Star, Heart, TrendingUp, Search, ExternalLink, Users } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onAnalyze: (product: Product) => void;
  onAffiliate: () => void;
  onNotification: (message: string) => void;
  setSelectedProductForExtraction?: (product: Product) => void;
  setActiveTab?: (tab: string) => void;
}

export default function ProductCard({ 
  product, 
  onAnalyze, 
  onAffiliate, 
  onNotification,
  setSelectedProductForExtraction,
  setActiveTab
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('shopspy_favorites') || '[]');
    setIsFavorite(favorites.includes(product.id));
  }, [product.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('shopspy_favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((id: number) => id !== product.id);
      onNotification('Removido dos favoritos');
    } else {
      newFavorites = [...favorites, product.id];
      onNotification('❤️ Adicionado aos favoritos');
    }
    
    localStorage.setItem('shopspy_favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      onClick={() => onAnalyze(product)}
      className="group relative w-full bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] rounded-[12px] overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:border-black/10 dark:hover:border-white/10"
    >
      {/* Image Section - aspect-[3/4] */}
      <div className="relative aspect-[3/4] overflow-hidden bg-black">
        <img
          src={product.imagem}
          alt={product.nome}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badge TOP #N */}
        <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/80 text-white text-[11px] font-bold rounded-[6px] z-10 shadow-sm font-['Space_Grotesk'] border border-white/5">
          TOP #{product.ranking}
        </div>

        {/* Badge CATEGORIA */}
        <div className="absolute top-2 right-2 px-2.5 py-1 bg-black/80 text-white text-[10px] font-semibold rounded-[6px] z-10 shadow-sm font-['Space_Grotesk'] border border-white/5">
          {product.categoria}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-9 right-2 w-[32px] h-[32px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 z-[2] bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 shadow-sm text-white"
        >
          <Heart 
            size={16} 
            className={`transition-colors duration-200 ${isFavorite ? 'text-[#D0011B] fill-[#D0011B]' : 'text-white'}`} 
          />
        </button>
        
        {/* Badge Alta Demanda ou HOT */}
        {product.desconto ? (
          <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-[#D0011B] text-white text-[10px] font-bold rounded-[20px] flex items-center gap-1 shadow-[0_4px_12px_rgba(208,1,27,0.5)] font-['Space_Grotesk'] border border-white/10">
            <span>🔥</span>
            HOT {product.desconto} OFF
          </div>
        ) : (
          <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-[#D0011B] text-white text-[10px] font-bold rounded-[20px] flex items-center gap-1 shadow-md font-['Space_Grotesk']">
            <TrendingUp size={10} />
            Alta Demanda
          </div>
        )}

        {/* Overlay ao Hover */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="px-6 py-2.5 bg-[#D0011B] text-white rounded-full text-[13px] font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg font-['Space_Grotesk']">
            Analisar Produto
          </div>
        </div>
      </div>

      {/* Corpo do Card */}
      <div className="p-3 bg-white dark:bg-[#111111] text-gray-900 dark:text-white transition-colors duration-300">
        
        {/* Nome produto */}
        <h3 className="text-[13px] font-semibold text-gray-950 dark:text-white line-clamp-2 leading-[1.4] mb-1.5 h-[36px] font-['Space_Grotesk']">
          {product.nome}
        </h3>

        {/* Preço */}
        <div className="mb-1 flex items-baseline gap-2 font-['Space_Grotesk']">
          <span className="text-[18px] font-extrabold text-[#D0011B] dark:text-white">
            {product.preco}
          </span>
          {product.precoOriginal && (
            <span className="text-[11px] text-gray-400 dark:text-white/40 line-through">
              {product.precoOriginal}
            </span>
          )}
        </div>

        {/* Linha de stats: ★ ${avaliacao} amarelo + | ${vendas} vendidos */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-white/50 mb-2 font-['Space_Grotesk']">
          <div className="flex items-center gap-0.5 text-yellow-500 dark:text-yellow-400">
            <Star size={11} fill="currentColor" />
            <span className="font-bold">{product.avaliacao}</span>
          </div>
          <span className="text-gray-300 dark:text-white/20">|</span>
          <span>{product.vendas} vendidos</span>
        </div>

        {/* Barra Score Viral */}
        <div className="mb-3">
          <div className="text-[10px] text-gray-400 dark:text-white/40 uppercase font-bold mb-1 font-['Space_Grotesk']">Score Viral</div>
          <div className="w-full h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#D0011B] rounded-full" 
              style={{ width: `${product.scoreViral}%` }}
            ></div>
          </div>
        </div>

        {/* Botões Analisar & Afiliar-se */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (setSelectedProductForExtraction) {
                setSelectedProductForExtraction(product);
              }
              if (setActiveTab) {
                setActiveTab('encontrar-grupo');
              }
            }}
            className="btn-custom w-full !py-2 !px-2.5 !text-[11px] font-bold tracking-wide !rounded-lg flex items-center justify-center gap-1.5 select-none"
          >
            <Users size={12} />
            <span>Vender</span>
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAffiliate();
              const affiliateLink = product.link || `https://shopee.com.br/search?keyword=${encodeURIComponent(product.nome)}`;
              window.open(affiliateLink, '_blank');
            }}
            className="btn-custom w-full !py-2 !px-2.5 !text-[11px] font-bold tracking-wide !rounded-lg flex items-center justify-center gap-1.5 select-none"
          >
            <ExternalLink size={12} />
            <span>Afiliar-se</span>
          </button>
        </div>
      </div>
    </div>
  );
}
