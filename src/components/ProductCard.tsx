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
      className="group relative w-full glass-obs-product rounded-[20px] overflow-hidden cursor-pointer transition-all duration-400 hover:scale-[1.03] hover:border-[#D0011B]/30 glass-obsidian-product"
    >
      {/* Image Section - aspect-[3/4] */}
      <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
        <img
          src={product.imagem}
          alt={product.nome}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badge TOP #N */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-black rounded-lg z-10 shadow-lg border border-white/10 uppercase tracking-wider">
          TOP #{product.ranking}
        </div>

        {/* Badge CATEGORIA */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-black rounded-lg z-10 shadow-lg border border-white/10 uppercase tracking-widest">
          {product.categoria}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-11 right-3 w-[36px] h-[36px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-[2] bg-black/40 backdrop-blur-md border border-white/10 hover:bg-[#D0011B]/20 shadow-lg text-white group/fav"
        >
          <Heart 
            size={18} 
            className={`transition-all duration-300 ${isFavorite ? 'text-[#D0011B] fill-[#D0011B] scale-110' : 'text-white'}`} 
          />
        </button>
        
        {/* Badge Alta Demanda ou HOT */}
        {product.desconto ? (
          <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-[#D0011B] text-white text-[10px] font-black rounded-full flex items-center gap-1.5 shadow-[0_12px_24px_rgba(208,1,27,0.4)] border border-white/20 uppercase tracking-widest">
            <span>🔥</span>
            HOT {product.desconto} OFF
          </div>
        ) : (
          <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-[#D0011B] text-white text-[10px] font-black rounded-full flex items-center gap-1.5 shadow-[0_12px_24px_rgba(208,1,27,0.4)] border border-white/20 uppercase tracking-widest">
            <TrendingUp size={12} />
            ALTÍSSIMA DEMANDA
          </div>
        )}

        {/* Overlay ao Hover */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
          <div className="px-6 py-3 bg-[#D0011B] text-white rounded-full text-[13px] font-black uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400 shadow-[0_12px_32px_rgba(208,1,27,0.4)]">
            Analisar Produto
          </div>
        </div>
      </div>

      {/* Corpo do Card */}
      <div className="p-4 flex flex-col gap-2">
        
        {/* Nome produto */}
        <h3 className="text-[13px] font-bold text-white/90 line-clamp-2 leading-[1.4] mb-1 min-h-[36px] tracking-tight group-hover:text-white transition-colors">
          {product.nome}
        </h3>

        {/* Preço */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xl font-black text-[#D0011B]">
            {product.preco}
          </span>
          {product.precoOriginal && (
            <span className="text-[11px] text-white/30 line-through font-medium">
              {product.precoOriginal}
            </span>
          )}
        </div>

        {/* Linha de stats */}
        <div className="flex items-center gap-4 text-[11px] text-white/40 mb-1 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={12} fill="currentColor" />
            <span>{product.avaliacao}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <span>{product.vendas} vendidos</span>
        </div>

        {/* Score Viral */}
        <div className="mt-1 space-y-1.5">
          <div className="flex justify-between items-center text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">
            <span>Score Viral</span>
            <span className="text-[#D0011B]">{product.scoreViral}%</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-[#D0011B] to-[#ff4444] rounded-full shadow-[0_0_8px_rgba(208,1,27,0.4)]" 
              style={{ width: `${product.scoreViral}%` }}
            />
          </div>
        </div>

        {/* Botão Afiliar-se */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAffiliate();
            const affiliateLink = product.link || `https://shopee.com.br/search?keyword=${encodeURIComponent(product.nome)}`;
            window.open(affiliateLink, '_blank');
          }}
          className="btn-custom w-full !py-2.5 !px-3 !text-[11px] !rounded-xl flex items-center justify-center gap-2 mt-2 opacity-95 hover:opacity-100"
        >
          <ExternalLink size={14} />
          <span className="font-black uppercase tracking-widest">Link de Afiliado</span>
        </button>
      </div>
    </div>
  );
}
