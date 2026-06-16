import React, { useState } from 'react';
import { Settings as SettingsIcon, Palette, Sun, Moon, CheckCircle, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SettingsProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, toggleTheme }) => {
  const [feedback, setFeedback] = useState<string | null>(null);

  const ADMIN_PANEL_PASSWORD = 'SHOPSPY4692';
  const [adminPassword, setAdminPassword] = useState('');
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminError, setAdminError] = useState('');

  const handleAdminUnlock = () => {
    if (adminPassword === ADMIN_PANEL_PASSWORD) {
      setAdminUnlocked(true);
      setAdminError('');
    } else {
      setAdminError('Senha incorreta. Tente novamente.');
      setAdminPassword('');
    }
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-[#0a0a0a] p-6 min-h-screen font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon size={24} className="text-[#D0011B]" />
          <h1 className="text-[20px] font-black tracking-tight text-gray-900 dark:text-white uppercase font-sans">
            Configurações
          </h1>
        </div>

        {/* Feedback Alert Overlay */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl flex items-center gap-3 text-sm font-black tracking-wide"
            >
              <CheckCircle size={18} />
              <span>{feedback}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card 1: Aparência */}
        <section className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/[0.08] rounded-[14px] p-5 shadow-sm transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <Palette size={20} className="text-[#D0011B]" />
            <h2 className="text-[15px] font-bold text-gray-900 dark:text-white font-sans">Aparência</h2>
          </div>
          
          <div className="h-[1px] bg-gray-100 dark:bg-white/[0.06] w-full mb-3" />

          {/* Item Toggle Modo Claro/Escuro */}
          <div 
            onClick={toggleTheme}
            className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-[#1a1a1a] rounded-[10px] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#D0011B]/10 flex items-center justify-center text-[#D0011B] group-hover:scale-110 transition-transform">
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <div>
                <p className="text-[14px] font-medium text-gray-900 dark:text-white font-sans">Modo Escuro</p>
                <p className="text-[12px] text-gray-500 dark:text-white/40 font-sans">Alterna entre tema claro e escuro</p>
              </div>
            </div>

            {/* Custom Toggle Switch */}
            <div 
              className={`
                relative w-11 h-6 rounded-full transition-colors duration-200
                ${isDarkMode ? 'bg-[#D0011B]' : 'bg-[#333333]'}
              `}
            >
              <motion.div 
                animate={{ x: isDarkMode ? 22 : 2 }}
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-[18px] h-[18px] bg-white rounded-full shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* ÁREA ADMINISTRATIVA */}
        {localStorage.getItem('shopspy_is_admin') === 'true' && (
          <div style={{
            marginTop: 32,
            background: '#111111',
            border: '1px solid rgba(208,1,27,0.2)',
            borderRadius: 14,
            padding: 20
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Shield size={18} color="#D0011B" />
              <span style={{ color: 'white', fontWeights: 700, fontSize: 15 }}>Área Administrativa</span>
            </div>

            {!adminUnlocked ? (
              <>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 12 }}>
                  Digite a senha para acessar o painel de administração.
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="password"
                    placeholder="Senha do painel admin..."
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdminUnlock()}
                    style={{ 
                      flex: 1,
                      background: '#1a1a1a',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 10,
                      padding: '12px 14px',
                      color: 'white',
                      fontSize: 14,
                      outline: 'none'
                    }}
                  />
                  <button onClick={handleAdminUnlock} style={{
                    background: '#D0011B', color: 'white',
                    borderRadius: 10, padding: '12px 20px',
                    fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer'
                  }}>
                    Entrar
                  </button>
                </div>
                {adminError && (
                  <p style={{ color: '#ef4444', fontSize: 12, marginTop: 8 }}>{adminError}</p>
                )}
              </>
            ) : (
              <button
                onClick={() => {
                  // This dispatches an event that App.tsx can listen to if needed, 
                  // but here we just need to set the state in App.tsx.
                  // Since Settings is a child of App, we might need a prop to open it.
                  // Looking at App.tsx, it uses isAdminPanelOpen state.
                  // Re-reading App.tsx, SettingsView doesn't have a prop to open AdminPanel.
                  // I should probably use a CustomEvent to open it from here.
                  window.dispatchEvent(new CustomEvent('shopspy_open_admin'));
                }}
                style={{
                  width: '100%', background: 'linear-gradient(135deg, #D0011B, #ff4444)',
                  color: 'white', borderRadius: 10, padding: '14px',
                  fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(208,1,27,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                }}
              >
                <SettingsIcon size={18} /> Abrir Painel de Administração
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Settings;
