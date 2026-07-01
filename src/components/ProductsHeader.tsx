import React from 'react';
import { Package, Flame, TrendingUp, ShieldCheck, Search } from 'lucide-react';
import { Product, Category } from '../types';

interface ProductsHeaderProps {
  products: Product[];
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ProductsHeader({ products, activeCategory, setActiveCategory, searchQuery, setSearchQuery }: ProductsHeaderProps) {
  const totalProducts = products.length;
  const hotProducts = products.filter(p => {
    if (!p.desconto) return false;
    const discountValue = parseInt(p.desconto.replace('-', '').replace('%', ''));
    return !isNaN(discountValue) && discountValue >= 40;
  }).length;
  const highHighScore = products.filter(p => p.scoreViral >= 80).length;
  const topRated = products.filter(p => p.avaliacao >= 4.7).length;

  const categories: Category[] = ["Todos", "Moda", "Casa", "Eletrônicos", "Beleza", "Ferramentas"];

  const stats = [
    { 
      icon: Package, 
      value: totalProducts, 
      label: "Produtos disponíveis", 
      color: "bg-red-500/10 text-[#D0011B] dark:text-red-400", 
      accent: "bg-[#D0011B] dark:bg-red-500" 
    },
    { 
      icon: Flame, 
      value: hotProducts, 
      label: "Produtos Hot", 
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400", 
      accent: "bg-amber-500" 
    },
    { 
      icon: TrendingUp, 
      value: highHighScore, 
      label: "Score alto (>80)", 
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", 
      accent: "bg-emerald-500" 
    },
    { 
      icon: ShieldCheck, 
      value: topRated, 
      label: "Alta avaliação", 
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400", 
      accent: "bg-blue-500" 
    },
  ];

  return (
    <div className="p-6 pb-4 bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-custom"></div>
          <h1 className="text-xl sm:text-2xl font-black gradient-title">Produtos Virais</h1>
          <span className="px-2.5 py-0.5 bg-primary/15 border border-primary/40 rounded-full text-[11px] font-bold text-primary">LIVE</span>
        </div>
        <p className="text-[13px] text-gray-500 dark:text-white/45"> Central de Mineração — Descubra produtos com alto potencial na Shopee </p>
      </div>


      <div className="mt-4 relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30" />
        <input
          type="text"
          placeholder="Buscar produto pelo nome..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-50 dark:bg-[#111111] border border-white/[0.08] rounded-lg py-3 pl-12 pr-4 text-gray-900 dark:text-white text-sm focus:outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-white/30"
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-4 py-1.5 rounded-full text-[13px] transition-all
              ${activeCategory === cat 
                ? 'bg-primary text-white font-bold shadow-sm shadow-primary/20' 
                : 'bg-transparent border border-gray-200 dark:border-white/15 text-gray-500 dark:text-white/60 hover:border-primary/40 hover:text-primary dark:hover:text-white'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
