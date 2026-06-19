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

  // Dynamic Styles based on Light/Dark Mode
  const sidebarStyles = {
    background: isDarkMode 
      ? '#030303' 
      : 'linear-gradient(180deg, #ffffff 0%, #f4f5f8 100%)',
    border: isDarkMode 
      ? '1px solid rgba(255, 255, 255, 0.03)' 
      : '1px solid rgba(0, 0, 0, 0.06)',
    boxShadow: isDarkMode 
      ? '0 30px 100px rgba(0, 0, 0, 0.95), 0 10px 40px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 0 1px 1px rgba(255, 255, 255, 0.05)'
      : '0 20px 50px rgba(0, 0, 0, 0.15), 0 4px 15px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.03)',
    toggleBg: isDarkMode ? '#111111' : '#f0f0f5',
    toggleBorder: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
    toggleColor: isDarkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.7)',
  };

  return (
    <>
      <aside
        className="font-['Space_Grotesk']"
        style={{
          position: 'fixed',
          left: isMobile ? (isExpanded ? '12px' : '-280px') : '12px',
          top: '12px',
          height: 'calc(100vh - 24px)',
          width: isExpanded ? '220px' : '64px',
          background: sidebarStyles.background,
          border: sidebarStyles.border,
          borderRadius: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 0',
          zIndex: isMobile ? 120 : 50,
          boxShadow: sidebarStyles.boxShadow,
          backdropFilter: isDarkMode ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isDarkMode ? 'blur(20px)' : 'none',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), left 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s, border 0.3s, box-shadow 0.3s',
        }}
      >
        {/* LOGO AREA */}
        <div 
          style={{ 
            width: '100%', 
            padding: isExpanded ? '0 16px' : '0', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: isExpanded ? 'flex-start' : 'center',
            marginBottom: '24px',
            position: 'relative'
          }}
        >
          {/* Logo container */}
          <div className={`flex items-center ${isExpanded ? 'justify-start pl-2' : 'justify-center'} w-full min-h-[44px] relative`}>
            <img 
              src="https://i.postimg.cc/yxg1xsb5/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png"
              alt="ShopSpy Logo"
              style={{ 
                height: '38px', 
                width: 'auto',
                transition: 'all 0.3s ease',
              }}
              referrerPolicy="no-referrer"
            />
            
            {/* Collapse Toggle button beside the logo */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                position: 'absolute',
                right: isExpanded ? '-10px' : '-8px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: sidebarStyles.toggleBg,
                border: `1px solid ${sidebarStyles.toggleBorder}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isExpanded ? '0 2px 8px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.08)',
                transition: 'all 0.2s ease',
                zIndex: 10,
              }}
              className="hover:scale-105 active:scale-95 transition-all"
              title={isExpanded ? 'Recolher menu' : 'Expandir menu'}
            >
              {isExpanded ? (
                <ChevronLeft size={12} style={{ color: sidebarStyles.toggleColor }} />
              ) : (
                <ChevronRight size={12} style={{ color: sidebarStyles.toggleColor }} />
              )}
            </button>
          </div>
        </div>

        {/* NAVIGATION ITEMS */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            width: '100%', 
            gap: '8px',
            padding: '0 10px',
            boxSizing: 'border-box'
          }}
        >
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

        {/* SEPARADOR VISUAL (flex-grow pushes the footer down) */}
        <div style={{ flex: 1 }} />

        {/* BOTTOM ITEMS (FOOTER) */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            width: '100%', 
            gap: '8px',
            padding: '0 10px',
            marginTop: 'auto',
            paddingTop: '16px',
            borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
            boxSizing: 'border-box'
          }}
        >
          {/* INDIQUE E GANHE (Custom capsule style) */}
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

          {/* BAIXAR APP (Custom capsule style) */}
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
            style={{
              width: '100%',
              height: '40px',
              borderRadius: isExpanded ? '9999px' : '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isExpanded ? 'flex-start' : 'center',
              gap: isExpanded ? '12px' : '0',
              padding: isExpanded ? '0 14px' : '0',
              cursor: 'pointer',
              background: 'transparent',
              color: isDarkMode ? 'rgba(255,255,255,0.55)' : '#6b7280',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative'
            }}
            className={isDarkMode ? 'hover:bg-white/[0.06] hover:text-[#D0011B] transition-all' : 'hover:bg-neutral-100 hover:text-[#D0011B] transition-all'}
          >
            <LogOut size={16} />
            {isExpanded && (
              <span className="text-[13px] font-semibold leading-none">
                Sair
              </span>
            )}
            
            {/* Tooltip quando colapsado */}
            {!isExpanded && isLogoutHovered && (
              <div style={{
                position: 'absolute',
                left: '60px',
                background: isDarkMode ? '#1a1829' : '#ffffff',
                color: isDarkMode ? 'white' : 'black',
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
                pointerEvents: 'none',
                zIndex: 100,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
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
  const isLandingPageStyle = ['dashboard', 'virais', 'find-group', 'templates-video', 'aulas'].includes(item.id);
  const isCustomGlossy = ['dashboard', 'virais', 'find-group', 'templates-video', 'aulas', 'configuracoes'].includes(item.id);

  // Item highlight styling matching the premium capsule theme
  const itemStyle = () => {
    if (isNovaEstrutura) {
      return {
        background: 'linear-gradient(135deg, #D0011B, #ff4444)',
        color: '#ffffff',
        boxShadow: '0 4px 15px rgba(208,1,27,0.3)',
        border: '1px solid transparent',
      };
    }

    if (isActive && isCustomGlossy) {
      return {
        background: isHovered 
          ? 'linear-gradient(180deg, #F52D46 0%, #E21B33 50%, #C40018 100%)' 
          : 'linear-gradient(180deg, #E21B33 0%, #D0011B 50%, #B00014 100%)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: isHovered 
          ? '0 6px 20px rgba(208, 1, 27, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.2)'
          : '0 4px 15px rgba(208, 1, 27, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.2)',
        transform: isHovered ? 'translateY(-2px)' : 'none',
      };
    }

    if (isCapsule) {
      if (isActive) {
        return {
          background: '#D0011B',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(208,1,27,0.25)',
          border: '1px solid transparent',
        };
      }
      return {
        background: isDarkMode ? 'rgba(255,255,255,0.04)' : '#f5f5f7',
        color: '#D0011B',
        border: isDarkMode ? '1px solid rgba(208,1,27,0.3)' : '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
      };
    }

    if (isActive) {
      return {
        background: '#D0011B',
        color: '#ffffff',
        border: '1px solid transparent',
        boxShadow: isLandingPageStyle ? '0 2px 4px rgba(208,1,27,0.15)' : '0 4px 12px rgba(208,1,27,0.3)',
      };
    }

    return {
      background: 'transparent',
      color: isDarkMode ? 'rgba(255,255,255,0.55)' : '#6b7280',
      border: '1px solid transparent',
    };
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        width: '100%',
        height: '40px',
        borderRadius: isExpanded ? '9999px' : '50%', // pill form like .btn-custom
        display: 'flex',
        alignItems: 'center',
        justifyContent: isExpanded ? 'flex-start' : 'center',
        gap: isExpanded ? '12px' : '0',
        padding: isExpanded ? '0 14px' : '0',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        boxSizing: 'border-box',
        ...itemStyle(),
      }}
      className={
        isNovaEstrutura
          ? 'hover:brightness-110 active:scale-98 transition-all'
          : isCapsule
            ? 'hover:brightness-105 active:scale-98 transition-all'
            : isActive
              ? 'active:scale-98 font-bold'
              : isDarkMode 
                ? 'hover:bg-white/[0.06] hover:text-white transition-all' 
                : 'hover:bg-neutral-100 hover:text-gray-900 transition-all'
      }
    >
      <Icon 
        size={16} 
        style={{
          transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateX(3px)' : 'none'
        }}
      />
      
      {isExpanded && (
        <span 
          className="truncate"
          style={{
            fontSize: isCapsule ? '11px' : '13px',
            fontWeight: isCapsule ? '800' : isActive ? '700' : '600',
            textTransform: isCapsule ? 'uppercase' : 'none',
            letterSpacing: isCapsule ? '0.05em' : 'normal',
            leading: 'none'
          }}
        >
          {item.label}
        </span>
      )}

      {/* Tooltip when collapsed */}
      {!isExpanded && isHovered && (
        <div style={{
          position: 'absolute',
          left: '52px',
          background: isDarkMode ? '#1a1829' : '#ffffff',
          color: isDarkMode ? 'white' : '#111111',
          padding: '6px 10px',
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
          pointerEvents: 'none',
          zIndex: 100,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          {item.label}
        </div>
      )}
    </div>
  );
}

