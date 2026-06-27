import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Flame, 
  Settings, 
  LogOut,
  Gift,
  Plus,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  Video,
  Download,
  Film
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
  activeItem: string;
  onItemClick: (id: string) => void;
  onLogout: () => void;
  isDarkMode: boolean;
}

interface ItemType {
  id: string;
  label: string;
  icon: any;
  visible: boolean;
}

export default function Sidebar({ isExpanded, setIsExpanded, activeItem, onItemClick, onLogout, isDarkMode }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('shopspy_auth');
    localStorage.removeItem('shopspy_plan');
    onLogout();
  };

  const tabDashboard = localStorage.getItem('shopspy_tab_dashboard') !== 'false';
  const tabProducts = localStorage.getItem('shopspy_tab_products') !== 'false';
  const tabFindGroup = localStorage.getItem('shopspy_tab_findgroup') !== 'false';
  const tabReferral = localStorage.getItem('shopspy_tab_referral') !== 'false';

  // Core navigation items (upper portion of sidebar)
  const menuItems: ItemType[] = [
    { id: 'encontrar-grupos', label: 'Nova Estrutura', icon: Plus, visible: true },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, visible: tabDashboard },
    { id: 'virais', label: 'Produtos Virais', icon: Flame, visible: tabProducts },
    { id: 'find-group', label: 'Criar UGC', icon: Video, visible: tabFindGroup },
    { id: 'templates-video', label: 'Templates de Vídeo', icon: Film, visible: true },
  ].filter(item => item.visible);

  return (
    <>
      <aside
        className={`font-['Space_Grotesk'] fixed top-3 bottom-3 z-[120] md:z-50 flex flex-col items-center py-5 transition-all duration-300 ease-in-out ${
          isMobile 
            ? (isExpanded ? 'left-3' : '-left-[280px]') 
            : 'left-3'
        } ${
          isExpanded ? 'w-[220px]' : 'w-[68px]'
        } glass-obsidian-sidebar rounded-[32px]`}
      >
        {/* LOGO AREA */}
        <div className={`w-full mb-6 px-4 flex flex-col items-center relative`}>
          <div className={`flex items-center ${isExpanded ? 'justify-start pl-2' : 'justify-center'} w-full min-h-[44px] relative`}>
            <img 
              src="https://i.postimg.cc/yxg1xsb5/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png"
              alt="ShopSpy Logo"
              className="h-[38px] w-auto transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            
            {/* Collapse Toggle button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full glass-obsidian border-white/10 flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 active:scale-95 transition-all z-10"
              title={isExpanded ? 'Recolher menu' : 'Expandir menu'}
            >
              {isExpanded ? (
                <ChevronLeft size={12} className="text-white/80" />
              ) : (
                <ChevronRight size={12} className="text-white/80" />
              )}
            </button>
          </div>
        </div>

        {/* NAVIGATION ITEMS */}
        <div className="flex flex-col w-full gap-2 px-3 overflow-y-auto glass-obsidian-scroll">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              isExpanded={isExpanded}
              isDarkMode={isDarkMode}
              onClick={() => onItemClick(item.id)}
            />
          ))}
        </div>

        {/* BOTTOM ITEMS (FOOTER) */}
        <div className="flex flex-col w-full gap-2 px-3 mt-auto pt-4 border-t border-white/5">
          {/* INDIQUE E GANHE */}
          {tabReferral && (
            <SidebarItem
              item={{ id: 'indique-e-ganhe', label: 'Indique e Ganhe', icon: Gift }}
              isActive={activeItem === 'indique-e-ganhe'}
              isExpanded={isExpanded}
              isDarkMode={isDarkMode}
              isCapsule={true}
              onClick={() => onItemClick('indique-e-ganhe')}
            />
          )}

          {/* BAIXAR APP */}
          <SidebarItem
            item={{ id: 'baixar-app', label: 'Baixar App', icon: Download }}
            isActive={activeItem === 'baixar-app'}
            isExpanded={isExpanded}
            isDarkMode={isDarkMode}
            isCapsule={true}
            onClick={() => onItemClick('baixar-app')}
          />

          {/* CONFIGURAÇÕES */}
          <SidebarItem
            item={{ id: 'configuracoes', label: 'Configurações', icon: Settings }}
            isActive={activeItem === 'configuracoes'}
            isExpanded={isExpanded}
            isDarkMode={isDarkMode}
            onClick={() => onItemClick('configuracoes')}
          />

          {/* LOGOUT */}
          <div
            onMouseEnter={() => setIsLogoutHovered(true)}
            onMouseLeave={() => setIsLogoutHovered(false)}
            onClick={handleLogout}
            className={`w-full h-10 flex items-center transition-all duration-200 cursor-pointer relative ${
              isExpanded ? 'px-4 rounded-full justify-start' : 'justify-center rounded-full'
            } hover:bg-white/5 text-white/50 hover:text-[#D0011B]`}
          >
            <LogOut size={16} />
            {isExpanded && (
              <span className="text-[13px] font-semibold leading-none ml-3">
                Sair
              </span>
            )}
            
            {!isExpanded && isLogoutHovered && (
              <div className="absolute left-16 glass-obsidian-pill bg-black/80 border-white/10 text-white px-3 py-1.5 text-xs font-bold whitespace-nowrap pointer-events-none z-[100] shadow-xl">
                Sair
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ 
  item, 
  isActive, 
  isExpanded, 
  isDarkMode, 
  onClick, 
  isCapsule = false 
}: { 
  key?: React.Key; 
  item: any; 
  isActive: boolean; 
  isExpanded: boolean; 
  isDarkMode: boolean; 
  onClick: () => void;
  isCapsule?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;
  const isNovaEstrutura = item.id === 'encontrar-grupos';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative w-full h-10 flex items-center transition-all duration-200 ease-out cursor-pointer ${
        isExpanded ? 'px-4 rounded-full' : 'justify-center rounded-full'
      } ${
        isNovaEstrutura
          ? 'bg-gradient-to-r from-[#D0011B] to-[#ff4444] text-white shadow-[0_4px_12px_rgba(208,1,27,0.3)] hover:scale-[1.02] active:scale-[0.98]'
          : isActive
            ? 'glass-obsidian-nav-active'
            : isCapsule
              ? 'bg-white/[0.04] border border-white/5 text-[#D0011B] hover:bg-white/[0.08]'
              : 'text-white/50 hover:glass-obsidian-nav-hover'
      }`}
    >
      <Icon 
        size={16} 
        className={`transition-transform duration-200 ${isHovered && isExpanded ? 'translate-x-1' : ''} ${isActive ? 'text-white' : ''}`}
      />
      
      {isExpanded && (
        <span 
          className={`ml-3 truncate leading-none ${
            isCapsule ? 'text-[11px] font-black uppercase tracking-wider' : 'text-[13px] font-bold'
          }`}
        >
          {item.label}
        </span>
      )}

      {!isExpanded && isHovered && (
        <div className="absolute left-16 glass-obsidian-pill bg-black/80 border-white/10 text-white px-3 py-1.5 text-xs font-bold whitespace-nowrap pointer-events-none z-[100] shadow-xl">
          {item.label}
        </div>
      )}
    </div>
  );
}
