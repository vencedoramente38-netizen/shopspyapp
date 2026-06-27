import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Settings, 
  X, 
  Bell, 
  LayoutDashboard, 
  Sparkles, 
  Check,
  ChevronDown,
  Upload,
  Music,
  Database,
  Plus,
  Trash2,
  Edit,
  EyeOff,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';
import { supabase } from '../lib/supabase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [theme, setTheme] = useState(() => localStorage.getItem('shopspy_theme') || 'dark');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'notificacoes' | 'dashboard'>('notificacoes');

  // Supabase Database Products states
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loadingDbProducts, setLoadingDbProducts] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Form states
  const [formRanking, setFormRanking] = useState(1);
  const [formCategoria, setFormCategoria] = useState('Casa');
  const [formNome, setFormNome] = useState('');
  const [formPreco, setFormPreco] = useState('');
  const [formVendas, setFormVendas] = useState('0');
  const [formComissao, setFormComissao] = useState('20%');
  const [formImagem, setFormImagem] = useState('');
  const [formLink, setFormLink] = useState('');
  const [formScoreViral, setFormScoreViral] = useState(90);
  const [formVideo, setFormVideo] = useState('https://embed-ssl.wistia.com/deliveries/1efb99e3fb9ae05dc1a768bab9c875aa5843800e.mp4');
  const [formCopyVenda, setFormCopyVenda] = useState('');

  // Sync theme when panel opens
  useEffect(() => {
    if (isOpen) {
      setTheme(localStorage.getItem('shopspy_theme') || 'dark');
      setShowPasswordModal(true);
    } else {
      setShowPasswordModal(false);
    }
  }, [isOpen]);

  const colors = {
    panel: 'bg-[#09090B]',
    card: 'glass-obsidian',
    input: 'bg-white/5',
    text: 'text-white',
    textFull: 'rgba(255,255,255,1)',
    muted: 'text-white/40',
    border: 'border-white/[0.08]',
    borderSubtle: 'border-white/[0.06]',
    shadow: 'shadow-[-8px_0_32px_rgba(0,0,0,0.6)]',
    toggleTrack: 'bg-white/10',
    closeBtn: 'bg-white/[0.06]',
  };

  // Config states
  const [notifEnabled, setNotifEnabled] = useState(() => localStorage.getItem('shopspy_notifications_enabled') === 'true');
  const [notifInterval, setNotifInterval] = useState(() => parseInt(localStorage.getItem('shopspy_notification_interval') || '15'));
  const [notifSound, setNotifSound] = useState(() => localStorage.getItem('shopspy_notification_sound') || 'Caixa registradora');
  const [notifProducts, setNotifProducts] = useState<number[]>(() => JSON.parse(localStorage.getItem('shopspy_notification_products') || '[]'));
  const [notifAllProducts, setNotifAllProducts] = useState(() => localStorage.getItem('shopspy_notification_products_all') !== 'false');

  // Dashboard states
  const [dashSales, setDashSales] = useState(() => localStorage.getItem('shopspy_dashboard_sales') || '0,00');
  const [metricVisitors, setMetricVisitors] = useState(() => localStorage.getItem('shopspy_metric_visitors') || '0');
  const [metricViews, setMetricViews] = useState(() => localStorage.getItem('shopspy_metric_views') || '0');
  const [metricOrders, setMetricOrders] = useState(() => localStorage.getItem('shopspy_metric_orders') || '0');
  const [metricUnits, setMetricUnits] = useState(() => localStorage.getItem('shopspy_metric_units') || '0');
  const [top5Products, setTop5Products] = useState<number[]>(() => JSON.parse(localStorage.getItem('shopspy_top5_products') || '[11,12,13,14,15]'));
  const [showChart, setShowChart] = useState(() => localStorage.getItem('shopspy_show_chart') !== 'false');
  const [chartPeriod, setChartPeriod] = useState(() => localStorage.getItem('shopspy_chart_period') || 'Hoje');
  const [welcomeMessage, setWelcomeMessage] = useState(() => localStorage.getItem('shopspy_welcome_message') || '');

  // Dashboard Control States (10 fields)
  const [dashValues, setDashValues] = useState(() => ({
    total_vendas: localStorage.getItem('shopspy_admin_total_vendas') || '0',
    receita_total: localStorage.getItem('shopspy_admin_receita_total') || '0,00',
    vendas_pendentes: localStorage.getItem('shopspy_admin_vendas_pendentes') || '0',
    vendas_falhadas: localStorage.getItem('shopspy_admin_vendas_falhadas') || '0',
    cliques: localStorage.getItem('shopspy_admin_cliques') || '0',
    pedidos: localStorage.getItem('shopspy_admin_pedidos') || '0',
    comissao: localStorage.getItem('shopspy_admin_comissao') || '0,00',
    itens_vendidos: localStorage.getItem('shopspy_admin_itens_vendidos') || '0',
    valor_pedido: localStorage.getItem('shopspy_admin_valor_pedido') || '0,00',
    novos_compradores: localStorage.getItem('shopspy_admin_novos_compradores') || '0',
  }));

  const [dashVariations, setDashVariations] = useState(() => ({
    total_vendas: localStorage.getItem('shopspy_admin_var_total_vendas') || '+0.0%',
    receita_total: localStorage.getItem('shopspy_admin_var_receita_total') || '+0.0%',
    vendas_pendentes: localStorage.getItem('shopspy_admin_var_vendas_pendentes') || '+0.0%',
    vendas_falhadas: localStorage.getItem('shopspy_admin_var_vendas_falhadas') || '+0.0%',
    cliques: localStorage.getItem('shopspy_admin_var_cliques') || '+0.0%',
    pedidos: localStorage.getItem('shopspy_admin_var_pedidos') || '+0.0%',
    comissao: localStorage.getItem('shopspy_admin_var_comissao') || '+0.0%',
    itens_vendidos: localStorage.getItem('shopspy_admin_var_itens_vendidos') || '+0.0%',
    valor_pedido: localStorage.getItem('shopspy_admin_var_valor_pedido') || '+0.0%',
    novos_compradores: localStorage.getItem('shopspy_admin_var_novos_compradores') || '+0.0%',
  }));

  const [showAddSale, setShowAddSale] = useState(false);
  const [manualSaleProduct, setManualSaleProduct] = useState('');
  const [manualSaleValue, setManualSaleValue] = useState('');

  // Sidebar visibility states
  const [tabDashboard, setTabDashboard] = useState(() => localStorage.getItem('shopspy_tab_dashboard') !== 'false');
  const [tabProducts, setTabProducts] = useState(() => localStorage.getItem('shopspy_tab_products') !== 'false');
  const [tabFindGroup, setTabFindGroup] = useState(() => localStorage.getItem('shopspy_tab_findgroup') !== 'false');
  const [tabReferral, setTabReferral] = useState(() => localStorage.getItem('shopspy_tab_referral') !== 'false');
  const [tabSettings, setTabSettings] = useState(() => localStorage.getItem('shopspy_tab_settings') !== 'false');

  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: '', show: false }), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowPasswordModal(false);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handlePasswordSubmit = () => {
    if (password === 'shopspyadmin123') {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  // Supabase Data Actions
  const fetchDbProducts = async () => {
    try {
      setLoadingDbProducts(true);
      const { data, error } = await supabase
        .from('products_shopspy')
        .select('*')
        .order('ranking', { ascending: true });
      if (error) throw error;
      setDbProducts(data || []);
    } catch (err: any) {
      console.error(err);
      showToast('Erro ao carregar produtos do banco');
    } finally {
      setLoadingDbProducts(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDbProducts();
    }
  }, [isAuthenticated]);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNome || !formPreco || !formLink) {
      showToast('⚠️ Preencha os campos obrigatórios!');
      return;
    }

    try {
      const payload = {
        ranking: Number(formRanking),
        categoria: formCategoria,
        nome: formNome,
        preco: formPreco,
        vendas: formVendas,
        comissao: formComissao,
        imagem: formImagem || 'https://down-zl-br.img.susercontent.com/br-11134207-820lu-mmiv5l9yvbwne0.webp',
        link: formLink,
        score_viral: Number(formScoreViral),
        video: formVideo || 'https://embed-ssl.wistia.com/deliveries/1efb99e3fb9ae05dc1a768bab9c875aa5843800e.mp4',
        copy_venda: formCopyVenda,
        ativo: true
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products_shopspy')
          .update(payload)
          .eq('id', editingProduct.id);
        if (error) throw error;
        showToast('✅ Produto atualizado!');
      } else {
        const { error } = await supabase
          .from('products_shopspy')
          .insert([payload]);
        if (error) throw error;
        showToast('✅ Produto adicionado!');
      }

      setEditingProduct(null);
      setShowAddForm(false);
      resetForm();
      fetchDbProducts();
    } catch (err: any) {
      console.error(err);
      showToast('Erro ao gravar no banco!');
    }
  };

  const handleDeactivateProduct = async (id: any, activeVal: boolean) => {
    try {
      const { error } = await supabase
        .from('products_shopspy')
        .update({ ativo: activeVal })
        .eq('id', id);
      if (error) throw error;
      showToast(`✅ Produto ${activeVal ? 'ativado' : 'desativado'}!`);
      fetchDbProducts();
    } catch (err) {
      console.error(err);
      showToast('Erro ao alterar status!');
    }
  };

  const resetForm = () => {
    setFormRanking(1);
    setFormCategoria('Casa');
    setFormNome('');
    setFormPreco('');
    setFormVendas('0');
    setFormComissao('20%');
    setFormImagem('');
    setFormLink('');
    setFormScoreViral(90);
    setFormVideo('https://embed-ssl.wistia.com/deliveries/1efb99e3fb9ae05dc1a768bab9c875aa5843800e.mp4');
    setFormCopyVenda('');
  };

  const startEditProduct = (p: any) => {
    setEditingProduct(p);
    setFormRanking(p.ranking);
    setFormCategoria(p.categoria);
    setFormNome(p.nome);
    setFormPreco(p.preco);
    setFormVendas(p.vendas);
    setFormComissao(p.comissao);
    setFormImagem(p.imagem);
    setFormLink(p.link);
    setFormScoreViral(p.score_viral || p.scoreViral || 90);
    setFormVideo(p.video || 'https://embed-ssl.wistia.com/deliveries/1efb99e3fb9ae05dc1a768bab9c875aa5843800e.mp4');
    setFormCopyVenda(p.copy_venda || p.copyVenda || '');
    setShowAddForm(true);
  };

  const allProductsList = dbProducts.length > 0 ? dbProducts : products;

  const handleSave = () => {
    // Save all to localStorage
    localStorage.setItem('shopspy_notifications_enabled', String(notifEnabled));
    localStorage.setItem('shopspy_notification_interval', String(notifInterval));
    localStorage.setItem('shopspy_notification_sound', notifSound);
    localStorage.setItem('shopspy_notification_products', JSON.stringify(notifProducts));
    localStorage.setItem('shopspy_notification_products_all', String(notifAllProducts));
    
    localStorage.setItem('shopspy_dashboard_sales', dashSales);
    localStorage.setItem('shopspy_metric_visitors', metricVisitors);
    localStorage.setItem('shopspy_metric_views', metricViews);
    localStorage.setItem('shopspy_metric_orders', metricOrders);
    localStorage.setItem('shopspy_metric_units', metricUnits);
    localStorage.setItem('shopspy_top5_products', JSON.stringify(top5Products));
    localStorage.setItem('shopspy_show_chart', String(showChart));
    localStorage.setItem('shopspy_chart_period', chartPeriod);
    localStorage.setItem('shopspy_welcome_message', welcomeMessage);

    localStorage.setItem('shopspy_tab_dashboard', String(tabDashboard));
    localStorage.setItem('shopspy_tab_products', String(tabProducts));
    localStorage.setItem('shopspy_tab_findgroup', String(tabFindGroup));
    localStorage.setItem('shopspy_tab_referral', String(tabReferral));
    localStorage.setItem('shopspy_tab_settings', String(tabSettings));

    // Save dashboard values and variations
    Object.entries(dashValues).forEach(([key, value]) => {
      localStorage.setItem(`shopspy_admin_${key}`, String(value));
    });
    Object.entries(dashVariations).forEach(([key, value]) => {
      localStorage.setItem(`shopspy_admin_var_${key}`, String(value));
    });

    // Notify other components (Dashboard, App loop) to reload their state instantly
    window.dispatchEvent(new CustomEvent('shopspy_settings_updated'));

    showToast('Configurações salvas!');
    setTimeout(() => {
      onClose();
      setIsAuthenticated(false);
    }, 1000);
  };

  const handleManualSale = () => {
    if (!manualSaleProduct || !manualSaleValue) {
      showToast('⚠️ Preencha o produto e valor!');
      return;
    }

    const price = parseFloat(manualSaleValue.replace(/\./g, '').replace(',', '.').trim());
    if (isNaN(price)) {
      showToast('⚠️ Valor inválido!');
      return;
    }

    window.dispatchEvent(new CustomEvent('shopspy_sale', {
      detail: {
        productId: parseInt(manualSaleProduct),
        price: price
      }
    }));
    
    showToast('✅ Venda manual adicionada!');
    setShowAddSale(false);
    setManualSaleValue('');
  };

  const playSoundPreview = (name: string) => {
    if (name === 'Personalizado') {
      const base64 = localStorage.getItem('shopspy_custom_sound');
      if (base64) {
        const audio = new Audio(base64);
        audio.volume = 0.5;
        audio.play().catch(console.error);
      }
      return;
    }

    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    switch (name) {
      case 'Caixa registradora': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(); osc.stop(ctx.currentTime + 0.3);
        break;
      }
      case 'Moedas caindo': {
        const playCoin = (delay: number, freq: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
          osc.frequency.exponentialRampToValueAtTime(freq / 2, ctx.currentTime + delay + 0.05);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + delay);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.1);
          osc.start(ctx.currentTime + delay); osc.stop(ctx.currentTime + delay + 0.1);
        };
        playCoin(0, 800);
        playCoin(0.05, 900);
        playCoin(0.1, 750);
        break;
      }
      case 'Ding simples': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start(); osc.stop(ctx.currentTime + 0.2);
        break;
      }
      case 'Beep curto': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start(); osc.stop(ctx.currentTime + 0.1);
        break;
      }
      case 'Pop suave': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.start(); osc.stop(ctx.currentTime + 0.05);
        break;
      }
    }
  };

  const handleSoundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamanho máximo 2MB
    if (file.size > 2 * 1024 * 1024) {
      showToast('Arquivo muito grande. Máximo 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      // Salvar base64 no localStorage
      localStorage.setItem('shopspy_custom_sound', base64);
      localStorage.setItem('shopspy_custom_sound_name', file.name);
      // Selecionar automaticamente o som personalizado
      setNotifSound('Personalizado');
      localStorage.setItem('shopspy_notification_sound', 'Personalizado');
      showToast('✅ Som personalizado carregado!');
    };
    reader.readAsDataURL(file);
  };

  const removeCustomSound = () => {
    localStorage.removeItem('shopspy_custom_sound');
    localStorage.removeItem('shopspy_custom_sound_name');
    setNotifSound('Caixa registradora');
    localStorage.setItem('shopspy_notification_sound', 'Caixa registradora');
    showToast('Som personalizado removido.');
  };

  const toggleProduct = (id: number) => {
    setNotifProducts(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleTop5 = (id: number) => {
    if (top5Products.includes(id)) {
      setTop5Products(prev => prev.filter(i => i !== id));
    } else {
      if (top5Products.length >= 5) {
        showToast('Máximo 5 produtos no Top 5');
        return;
      }
      setTop5Products(prev => [...prev, id]);
    }
  };

  const handleSidebarToggle = (tab: string, value: boolean) => {
    if (!value) {
      const activeCount = [tabDashboard, tabProducts, tabFindGroup, tabReferral, tabSettings].filter(Boolean).length;
      if (activeCount <= 1) {
        showToast('Pelo menos uma aba principal deve estar ativa');
        return;
      }
      if (tab === 'dashboard' && !tabProducts) {
        showToast('Pelo menos uma aba principal deve estar ativa');
        return;
      }
      if (tab === 'products' && !tabDashboard) {
        showToast('Pelo menos uma aba principal deve estar ativa');
        return;
      }
    }

    switch (tab) {
      case 'dashboard': setTabDashboard(value); break;
      case 'products': setTabProducts(value); break;
      case 'findgroup': setTabFindGroup(value); break;
      case 'referral': setTabReferral(value); break;
      case 'settings': setTabSettings(value); break;
    }
  };

  return (
    <div className="font-['Space Grotesk']">
      {/* PASSWORD MODAL */}
      <AnimatePresence>
        {showPasswordModal && !isAuthenticated && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-[200] flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${colors.card} border ${colors.border} rounded-[24px] p-8 w-full max-w-[360px] shadow-2xl transition-colors duration-300 relative`}
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setShowPasswordModal(false);
                  onClose();
                }}
                className={`absolute top-4 right-4 w-8 h-8 rounded-full ${colors.closeBtn} flex items-center justify-center ${colors.muted} hover:text-[#D0011B] transition-colors`}
              >
                <X size={16} />
              </button>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#D0011B]/10 rounded-full flex items-center justify-center mb-6">
                  <Shield size={32} className="text-[#D0011B]" />
                </div>
                <h2 className={`text-xl font-bold ${colors.text} mb-2 transition-colors`}>Acesso Restrito</h2>
                <p className={`text-[13px] ${colors.muted} text-center mb-8 transition-colors`}>Digite a senha de administrador</p>
                
                <div className="w-full space-y-4">
                  <input 
                    autoFocus
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                    placeholder="••••••••••••"
                    className={`w-full ${colors.input} border ${passwordError ? 'border-[#D0011B]' : colors.border} rounded-[12px] px-4 py-3.5 ${colors.text} outline-none focus:border-[#D0011B]/80 focus:ring-4 focus:ring-[#D0011B]/15 transition-all text-center tracking-widest`}
                  />
                  {passwordError && (
                    <p className="text-[12px] text-[#D0011B] font-bold text-center">Senha incorreta</p>
                  )}
                  <button 
                    onClick={handlePasswordSubmit}
                    className="w-full bg-[#D0011B] text-white py-4 rounded-[12px] font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#D0011B]/20"
                  >
                    Entrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN PANEL SIDEBAR */}
      <AnimatePresence>
        {isAuthenticated && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-screen w-full sm:w-[380px] ${colors.panel} border-l ${colors.border} z-[150] ${colors.shadow} flex flex-col transition-colors duration-300`}
          >
            {/* HEADER */}
            <div className={`px-6 py-5 border-b ${colors.borderSubtle} flex items-center justify-between ${colors.panel} z-10 transition-colors`}>
              <div className="flex items-center gap-3">
                <Settings size={20} className="text-[#D0011B]" />
                <span className={`text-[16px] font-bold ${colors.text}`}>Painel Admin</span>
              </div>
              <button 
                onClick={() => {
                  setIsAuthenticated(false);
                  onClose();
                }}
                className={`w-8 h-8 rounded-full ${colors.closeBtn} flex items-center justify-center ${colors.muted} hover:text-[#D0011B] transition-colors`}
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6 pb-24">
              
              {/* SEÇÃO 1: NOTIFICAÇÕES */}
              <div className={`${colors.card} border ${colors.borderSubtle} rounded-[16px] p-5 shadow-sm transition-colors`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Bell size={18} className="text-[#D0011B]" />
                    <span className={`text-sm font-bold ${colors.text}`}>Notificações de Venda</span>
                  </div>
                  <Toggle active={notifEnabled} onClick={() => setNotifEnabled(!notifEnabled)} theme={theme} />
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <label className={`text-[13px] font-bold ${colors.text}`}>Intervalo entre notificações</label>
                        <p className={`text-[11px] ${colors.muted}`}>Tempo em segundos entre cada notificação</p>
                      </div>
                      <span className="text-[14px] font-bold text-[#D0011B]">{notifInterval}s</span>
                    </div>
                    <input 
                      type="range"
                      min="5"
                      max="60"
                      step="5"
                      value={notifInterval}
                      onChange={(e) => setNotifInterval(parseInt(e.target.value))}
                      className="w-full accent-[#D0011B] h-1.5 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className={`text-[13px] font-bold ${colors.text}`}>Escolha o som da notificação</label>
                    
                    <div className="pt-1">
                      <input
                        type="file"
                        accept="audio/mp3,audio/mpeg,audio/wav"
                        id="sound-upload"
                        className="hidden"
                        onChange={handleSoundUpload}
                      />
                      <label htmlFor="sound-upload" className={`flex items-center gap-3 p-3.5 ${colors.card} border-2 border-dashed ${colors.border} rounded-xl cursor-pointer hover:border-[#D0011B]/50 transition-all mb-3`}>
                        <div className="w-8 h-8 rounded-full bg-[#D0011B]/10 flex items-center justify-center shrink-0">
                          <Upload size={16} className="text-[#D0011B]" />
                        </div>
                        <span className={`text-[13px] ${colors.text} font-medium`}>Fazer upload do meu som (.mp3 / .wav)</span>
                      </label>

                      {localStorage.getItem('shopspy_custom_sound') && (
                        <div className="flex items-center justify-between p-3 bg-[#D0011B]/5 border border-[#D0011B]/20 rounded-xl mb-4">
                          <div className="flex items-center gap-2 min-w-0">
                            <Music size={14} className="text-[#D0011B] shrink-0" />
                            <span className="text-[12px] text-white font-medium truncate uppercase tracking-widest opacity-80">
                              {localStorage.getItem('shopspy_custom_sound_name')}
                            </span>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button 
                              onClick={() => playSoundPreview('Personalizado')}
                              className={`px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold ${colors.text} hover:bg-white/10 transition-all`}
                            >
                              ▶ Ouvir
                            </button>
                            <button 
                              onClick={removeCustomSound}
                              className="px-3 py-1 bg-[#D0011B]/10 border border-[#D0011B]/20 rounded-lg text-[11px] font-bold text-[#D0011B] hover:bg-[#D0011B]/20 transition-all"
                            >
                              ✕ Remover
                            </button>
                          </div>
                        </div>
                      )}

                      <div className={`border-t ${colors.borderSubtle} pt-1`}>
                        {[
                          ...(localStorage.getItem('shopspy_custom_sound') ? ['Personalizado'] : []),
                          'Caixa registradora', 
                          'Moedas caindo', 
                          'Ding simples', 
                          'Beep curto', 
                          'Pop suave', 
                          'Silencioso'
                        ].map((sound) => (
                          <div 
                            key={sound}
                            onClick={() => {
                              setNotifSound(sound);
                              playSoundPreview(sound);
                            }}
                            className={`flex items-center justify-between py-3.5 border-b ${colors.borderSubtle} last:border-0 cursor-pointer group`}
                          >
                            <span className={`text-[14px] ${colors.muted} group-hover:text-[#D0011B] transition-colors`}>{sound}</span>
                            <div className={`w-[22px] h-[22px] rounded-full border-2 transition-all flex items-center justify-center ${notifSound === sound ? 'border-[#D0011B]' : 'border-black/20 dark:border-white/20'}`}>
                              {notifSound === sound && <div className="w-[10px] h-[10px] rounded-full bg-[#D0011B]" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className={`text-[13px] font-bold ${colors.text}`}>Produtos nas notificações</label>
                      <p className={`text-[11px] ${colors.muted}`}>Escolha quais produtos aparecem</p>
                    </div>
                    
                    <div className={`flex items-center justify-between p-3 ${colors.input} rounded-xl`}>
                      <span className={`text-[13px] ${colors.text} font-medium`}>Todos os produtos</span>
                      <Toggle active={notifAllProducts} onClick={() => setNotifAllProducts(!notifAllProducts)} theme={theme} />
                    </div>

                    {!notifAllProducts && (
                      <div className="max-h-[200px] overflow-y-auto custom-scrollbar space-y-2 pr-2">
                        {allProductsList.map(p => (
                          <div 
                            key={p.id}
                            onClick={() => toggleProduct(p.id)}
                            className={`flex items-center gap-3 p-2 border ${colors.borderSubtle} rounded-lg cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02]`}
                          >
                            <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${notifProducts.includes(p.id) ? 'bg-[#D0011B] border-transparent' : 'border-black/10 dark:border-white/20'}`}>
                              {notifProducts.includes(p.id) && <Check size={14} className="text-white" />}
                            </div>
                            <img src={p.imagem} className="w-7 h-7 rounded object-cover" />
                            <span className={`text-[12px] ${colors.muted} truncate`}>{p.nome}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SEÇÃO 2: CONTROLE DO DASHBOARD */}
              <div className={`${colors.card} border ${colors.borderSubtle} rounded-[16px] p-5 shadow-sm transition-colors`}>
                <div className="flex items-center gap-3 mb-4">
                  <LayoutDashboard size={18} className="text-[#D0011B]" />
                  <span className={`text-sm font-bold ${colors.text}`}>Controle da Dashboard</span>
                </div>
                <div className={`h-px ${colors.borderSubtle} mb-6`} />

                <div className="space-y-6">
                  {/* GRID DE MÉTRICAS */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    {[
                      { key: 'total_vendas', label: 'Total de Vendas', placeholder: '0' },
                      { key: 'receita_total', label: 'Receita Total (R$)', placeholder: '0,00' },
                      { key: 'vendas_pendentes', label: 'Vendas Pendentes', placeholder: '0' },
                      { key: 'vendas_falhadas', label: 'Vendas Falhadas', placeholder: '0' },
                      { key: 'cliques', label: 'Cliques', placeholder: '0' },
                      { key: 'pedidos', label: 'Pedidos', placeholder: '0' },
                      { key: 'comissao', label: 'Comissão Est. (R$)', placeholder: '0,00' },
                      { key: 'itens_vendidos', label: 'Itens Vendidos', placeholder: '0' },
                      { key: 'valor_pedido', label: 'Valor do Pedido (R$)', placeholder: '0,00' },
                      { key: 'novos_compradores', label: 'Novos Compradores', placeholder: '0' },
                    ].map((field) => (
                      <div key={field.key} className="space-y-3">
                        <div className="space-y-1">
                          <label className={`text-[11px] ${colors.muted} uppercase font-black tracking-widest block`}>{field.label}</label>
                          <input 
                            type="text"
                            value={(dashValues as any)[field.key]}
                            onChange={(e) => setDashValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                            placeholder={field.placeholder}
                            className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2.5 ${colors.text} text-[13px] outline-none focus:border-[#D0011B] transition-colors`}
                          />
                        </div>
                        <div className="space-y-1">
                          <span className={`text-[10px] ${colors.muted} ml-1`}>Variação (%)</span>
                          <input 
                            type="text"
                            value={(dashVariations as any)[field.key]}
                            onChange={(e) => setDashVariations(prev => ({ ...prev, [field.key]: e.target.value }))}
                            placeholder="+0.0%"
                            className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-[12px] outline-none focus:border-[#D0011B] transition-colors`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* VENDAS RECENTES — ADICIONAR MANUAL */}
                  <div className={`mt-8 pt-6 border-t ${colors.borderSubtle}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[13px] font-bold ${colors.text}`}>Vendas Recentes</span>
                      <button 
                        onClick={() => setShowAddSale(!showAddSale)}
                        className="text-[11px] font-bold text-[#D0011B] hover:underline"
                      >
                        {showAddSale ? 'Cancelar' : '+ Adicionar Venda Manual'}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showAddSale && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-3 mb-6 overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className={`text-[10px] ${colors.muted} uppercase font-black`}>Produto</label>
                              <select 
                                value={manualSaleProduct}
                                onChange={(e) => setManualSaleProduct(e.target.value)}
                                className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-[12px] outline-none focus:border-[#D0011B] appearance-none`}
                              >
                                <option value="">Selecionar...</option>
                                {allProductsList.map(p => (
                                  <option key={p.id} value={p.id}>{p.nome}</option>
                                ))}
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className={`text-[10px] ${colors.muted} uppercase font-black`}>Valor (R$)</label>
                              <input 
                                type="text"
                                value={manualSaleValue}
                                onChange={(e) => setManualSaleValue(e.target.value)}
                                placeholder="49,90"
                                className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-[12px] outline-none focus:border-[#D0011B]`}
                              />
                            </div>
                          </div>
                          <button 
                            onClick={handleManualSale}
                            className="w-full bg-[#D0011B] text-white py-2.5 rounded-lg font-bold text-[13px] hover:brightness-110 transition-all shadow-lg shadow-[#D0011B]/10"
                          >
                            Adicionar Venda
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* TOP 5 PRODUTOS */}
                  <div className="space-y-3 pt-4 border-t border-white/[0.05]">
                    <div className="space-y-1">
                      <label className={`text-[11px] ${colors.muted} uppercase font-black tracking-widest block`}>Top 5 Produtos — Controle</label>
                      <p className={`text-[11px] ${colors.muted}`}>Escolha no máximo 5 produtos para destacar</p>
                    </div>
                    <div className="max-h-[200px] overflow-y-auto custom-scrollbar space-y-2 pr-2">
                      {allProductsList.map(p => (
                        <div 
                          key={p.id}
                          onClick={() => toggleTop5(p.id)}
                          className={`flex items-center gap-3 p-2 border ${colors.borderSubtle} rounded-lg cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors ${top5Products.includes(p.id) ? (theme === 'dark' ? 'bg-white/[0.04] border-white/[0.1]' : 'bg-black/[0.02] border-black/[0.1]') : ''}`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${top5Products.includes(p.id) ? 'bg-[#D0011B] border-transparent' : 'border-black/20 dark:border-white/20'}`}>
                            {top5Products.includes(p.id) && <Check size={12} className="text-white" />}
                          </div>
                          <img src={p.imagem} className="w-7 h-7 rounded object-cover" />
                          <span className={`text-[12px] ${colors.muted} truncate flex-1`}>{p.nome}</span>
                        </div>
                      ))}
                    </div>
                  </div>


                  {/* GRÁFICO */}
                  <div className="space-y-4">
                    <label className={`text-[11px] ${colors.muted} uppercase font-black tracking-widest`}>Controle do Gráfico</label>
                    <div className={`flex items-center justify-between p-3 ${colors.input} rounded-xl`}>
                      <span className={`text-[13px] ${colors.text} font-medium`}>Mostrar gráfico</span>
                      <Toggle active={showChart} onClick={() => setShowChart(!showChart)} theme={theme} />
                    </div>
                    <div className="space-y-1.5">
                      <span className={`text-[11px] ${colors.muted} ml-1`}>Período padrão</span>
                      <div className="relative">
                        <select 
                          value={chartPeriod}
                          onChange={(e) => setChartPeriod(e.target.value)}
                          className={`w-full ${colors.input} border ${colors.border} rounded-[10px] px-4 py-3 ${colors.text} text-[14px] outline-none focus:border-[#D0011B] appearance-none transition-colors`}
                        >
                          <option value="Hoje">Hoje</option>
                          <option value="7 Dias">7 Dias</option>
                          <option value="30 Dias">30 Dias</option>
                        </select>
                        <ChevronDown size={18} className={`absolute right-4 top-1/2 -translate-y-1/2 ${colors.muted} pointer-events-none opacity-50`} />
                      </div>
                    </div>
                  </div>

                  {/* ABAS SIDEBAR */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className={`text-[11px] ${colors.muted} uppercase font-black tracking-widest`}>Abas da Sidebar</label>
                      <p className={`text-[11px] ${colors.muted}`}>Controle a visibilidade</p>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: 'Dashboard', key: 'dashboard', state: tabDashboard },
                        { label: 'Produtos Virais', key: 'products', state: tabProducts },
                        { label: 'Encontrar Grupo', key: 'findgroup', state: tabFindGroup },
                        { label: 'Indique e Ganhe', key: 'referral', state: tabReferral },
                        { label: 'Configurações', key: 'settings', state: tabSettings },
                      ].map((tab) => (
                        <div key={tab.key} className={`flex items-center justify-between p-3 ${colors.input} rounded-xl transition-colors`}>
                          <span className={`text-[13px] ${colors.text} font-medium opacity-80`}>{tab.label}</span>
                          <Toggle active={tab.state} onClick={() => handleSidebarToggle(tab.key, !tab.state)} theme={theme} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* MENSAGEM BOAS VINDAS */}
                  <div className="space-y-2">
                    <label className={`text-[11px] ${colors.muted} uppercase font-black tracking-widest`}>Mensagem de Boas Vindas</label>
                    <textarea 
                      value={welcomeMessage}
                      onChange={(e) => setWelcomeMessage(e.target.value)}
                      placeholder="Bem-vindo ao ShopSpy! Encontre produtos virais e lucre na Shopee."
                      className={`w-full ${colors.input} border ${colors.border} rounded-[10px] px-4 py-3 ${colors.text} text-[13px] outline-none focus:border-[#D0011B] h-24 resize-none leading-relaxed transition-colors`}
                    />
                  </div>
                </div>
              </div>

              {/* SEÇÃO 3: GERENCIAR PRODUTOS (SUPABASE) */}
              <div className={`${colors.card} border ${colors.borderSubtle} rounded-[16px] p-5 shadow-sm transition-colors`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Database size={18} className="text-[#D0011B]" />
                    <span className={`text-sm font-bold ${colors.text}`}>Gerenciar Produtos</span>
                  </div>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      resetForm();
                      setShowAddForm(!showAddForm);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D0011B] text-white text-xs font-bold rounded-lg hover:brightness-110 transition-all flex-shrink-0"
                  >
                    <Plus size={14} />
                    <span>Adicionar</span>
                  </button>
                </div>
                <div className={`h-px ${colors.borderSubtle} mb-4`} />

                {showAddForm && (
                  <form onSubmit={handleSaveProduct} className="space-y-4 mb-6 p-4 bg-black/10 dark:bg-white/[0.02] border border-white/5 rounded-xl animate-fade-in text-left">
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
                      {editingProduct ? 'Editar Produto' : 'Cadastrar Novo Produto'}
                    </h4>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className={`text-[10px] ${colors.muted} font-medium`}>Ranking (ex: 1)</label>
                        <input
                          type="number"
                          value={formRanking}
                          onChange={(e) => setFormRanking(Number(e.target.value))}
                          className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-xs outline-none focus:border-[#D0011B]`}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={`text-[10px] ${colors.muted} font-medium`}>Categoria</label>
                        <select
                          value={formCategoria}
                          onChange={(e) => setFormCategoria(e.target.value)}
                          className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-xs outline-none focus:border-[#D0011B]`}
                        >
                          <option value="Casa">Casa</option>
                          <option value="Beleza">Beleza</option>
                          <option value="Moda">Moda</option>
                          <option value="Tecnologia">Tecnologia</option>
                          <option value="Copa">Copa</option>
                          <option value="Cozinha">Cozinha</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className={`text-[10px] ${colors.muted} font-medium`}>Nome do Produto *</label>
                      <input
                        type="text"
                        value={formNome}
                        onChange={(e) => setFormNome(e.target.value)}
                        placeholder="Copo Térmico 473ml..."
                        className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-xs outline-none focus:border-[#D0011B]`}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className={`text-[10px] ${colors.muted} font-medium`}>Preço * (ex: R$ 42,20)</label>
                        <input
                          type="text"
                          value={formPreco}
                          onChange={(e) => setFormPreco(e.target.value)}
                          placeholder="R$ 42,20"
                          className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-xs outline-none focus:border-[#D0011B]`}
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={`text-[10px] ${colors.muted} font-medium`}>Comissão (ex: 20%)</label>
                        <input
                          type="text"
                          value={formComissao}
                          onChange={(e) => setFormComissao(e.target.value)}
                          placeholder="20%"
                          className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-xs outline-none focus:border-[#D0011B]`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className={`text-[10px] ${colors.muted} font-medium`}>Vendas (ex: 255)</label>
                        <input
                          type="text"
                          value={formVendas}
                          onChange={(e) => setFormVendas(e.target.value)}
                          placeholder="255"
                          className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-xs outline-none focus:border-[#D0011B]`}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={`text-[10px] ${colors.muted} font-medium`}>Score Viral (0 - 100)</label>
                        <input
                          type="number"
                          value={formScoreViral}
                          onChange={(e) => setFormScoreViral(Number(e.target.value))}
                          className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-xs outline-none focus:border-[#D0011B]`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={`text-[11px] ${colors.muted} font-bold uppercase tracking-wider`}>Imagem do Produto</label>
                      
                      {/* Upload Box with Drag & Drop & Click */}
                      <div className="space-y-2">
                        <div
                          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                            formImagem.startsWith('data:') 
                              ? 'border-[#D0011B]/40 bg-[#D0011B]/5' 
                              : `${colors.border} hover:border-[#D0011B]/60 bg-black/5 dark:bg-white/[0.02]`
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files?.[0];
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) {
                                showToast('Arquivo muito grande (Máximo 5MB).');
                                return;
                              }
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setFormImagem(event.target?.result as string);
                                showToast('📸 Imagem do produto carregada!');
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          onClick={() => document.getElementById('product-image-upload-input')?.click()}
                        >
                          <input
                            type="file"
                            id="product-image-upload-input"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 5 * 1024 * 1024) {
                                  showToast('Arquivo muito grande (Máximo 5MB).');
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  setFormImagem(event.target?.result as string);
                                  showToast('📸 Imagem do produto carregada!');
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          
                          {formImagem ? (
                            <div className="flex flex-col items-center gap-2">
                              <img
                                src={formImagem}
                                alt="Preview"
                                className="w-16 h-16 rounded-lg object-cover border border-[#D0011B]/30 shadow-md mx-auto"
                              />
                              <span className="text-[11px] text-[#D0011B] font-bold">Alterar foto do produto</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center gap-1.5 py-2">
                              <Upload size={20} className="text-[#D0011B] mx-auto opacity-70" />
                              <span className={`text-[12px] ${colors.text} font-bold block`}>Solte ou clique para enviar foto</span>
                              <span className={`text-[10px] ${colors.muted} block`}>Aceita PNG, JPG, WEBP (Max 5MB)</span>
                            </div>
                          )}
                        </div>

                        {/* Fallback Input URL */}
                        <div className="space-y-1">
                          <span className={`text-[10px] ${colors.muted} block`}>Ou insira o link direto da imagem se preferir:</span>
                          <input
                            type="text"
                            value={formImagem}
                            onChange={(e) => setFormImagem(e.target.value)}
                            placeholder="https://exemplo.com/imagem.png"
                            className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-xs outline-none focus:border-[#D0011B]`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className={`text-[10px] ${colors.muted} font-medium`}>URL Vídeo MP4 (link para arquivo .mp4)</label>
                      <input
                        type="text"
                        value={formVideo}
                        onChange={(e) => setFormVideo(e.target.value)}
                        placeholder="https://embed-ssl.wistia.com/deliveries/..."
                        className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-xs outline-none focus:border-[#D0011B]`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={`text-[10px] ${colors.muted} font-medium`}>URL do Produto * (Shopee)</label>
                      <input
                        type="text"
                        value={formLink}
                        onChange={(e) => setFormLink(e.target.value)}
                        placeholder="https://shopee.com.br/product/..."
                        className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-xs outline-none focus:border-[#D0011B]`}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={`text-[10px] ${colors.muted} font-medium`}>Copy de Venda (Opcional)</label>
                      <textarea
                        value={formCopyVenda}
                        onChange={(e) => setFormCopyVenda(e.target.value)}
                        placeholder="Esse produto..."
                        className={`w-full ${colors.input} border ${colors.border} rounded-lg px-3 py-2 ${colors.text} text-xs outline-none focus:border-[#D0011B] h-16 resize-none`}
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(null);
                          setShowAddForm(false);
                          resetForm();
                        }}
                        className={`px-3 py-2 bg-transparent text-xs font-semibold rounded-lg hover:bg-black/10 dark:hover:bg-white/5 ${colors.text}`}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#D0011B] text-white text-xs font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all"
                      >
                        {editingProduct ? 'Salvar Edição' : 'Cadastrar'}
                      </button>
                    </div>
                  </form>
                )}

                {/* LIST OF PRODUCTS FROM SUPABASE */}
                {loadingDbProducts ? (
                  <div className="py-8 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-[#D0011B] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
                    {dbProducts.map((p) => (
                      <div
                        key={p.id}
                        className={`p-3 bg-black/5 dark:bg-white/[0.02] border ${colors.borderSubtle} rounded-xl flex items-center justify-between gap-3 text-left`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={p.imagem || 'https://down-zl-br.img.susercontent.com/br-11134207-820lu-mmiv5l9yvbwne0.webp'}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            alt="Img"
                          />
                          <div className="min-w-0">
                            <p className={`text-xs font-bold ${colors.text} truncate`}>{p.nome}</p>
                            <p className={`text-[10px] ${colors.muted}`}>{p.categoria} • {p.preco}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => startEditProduct(p)}
                            className="p-1.5 bg-black/5 dark:bg-white/5 rounded-lg hover:text-[#D0011B] transition-colors"
                            title="Editar"
                          >
                            <Edit size={12} className={colors.text} />
                          </button>
                          
                          {/* Botão Desativar/Ativar */}
                          <button
                            onClick={() => handleDeactivateProduct(p.id, !p.ativo)}
                            className={`p-1.5 rounded-lg hover:brightness-110 transition-all ${
                              p.ativo 
                                ? 'bg-red-500/10 text-red-500' 
                                : 'bg-green-500/10 text-green-500'
                            }`}
                            title={p.ativo ? 'Desativar' : 'Ativar'}
                          >
                            {p.ativo ? <EyeOff size={11} /> : <Eye size={11} />}
                          </button>
                        </div>
                      </div>
                    ))}

                    {dbProducts.length === 0 && (
                      <div className={`p-6 text-center text-xs ${colors.muted}`}>
                        Nenhum produto cadastrado no banco do Supabase.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER BUTTON */}
            <div className={`p-4 border-t ${colors.borderSubtle} ${colors.panel} sticky bottom-0 transition-colors`}>
              <button 
                onClick={handleSave}
                className="w-full bg-[#D0011B] text-white py-4 rounded-[12px] font-bold shadow-lg shadow-[#D0011B]/15 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Salvar Configurações
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST PANEL */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed bottom-6 left-6 z-[300] ${theme === 'dark' ? 'bg-[#111111] border-white/[0.08]' : 'bg-white border-gray-200'} border px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3`}
          >
            <div className="w-2 h-2 rounded-full bg-[#D0011B] animate-pulse" />
            <span className={`text-sm font-bold ${colors.text}`}>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Toggle({ active, onClick, theme }: { active: boolean; onClick: () => void; theme: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-[44px] h-[24px] rounded-full relative transition-colors duration-300 ${active ? 'bg-[#D0011B]' : (theme === 'dark' ? 'bg-[#333]' : 'bg-[#e5e5e5]')}`}
    >
      <div className={`absolute top-1 w-[18px] h-[18px] bg-white rounded-full transition-all duration-300 shadow-sm ${active ? 'left-[22px]' : 'left-1'}`} />
    </button>
  );
}
