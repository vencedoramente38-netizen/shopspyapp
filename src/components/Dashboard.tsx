import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Users, 
  Eye, 
  ShoppingCart, 
  Package,
  ChevronRight,
  Menu,
  Search,
  Sparkles,
  X,
  ShoppingBag,
  Sun,
  Calendar,
  TrendingUp,
  RefreshCw,
  DollarSign,
  Clock,
  AlertCircle,
  MousePointer,
  BarChart2,
  EyeOff,
  Euro,
  Radio
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { products as fallbackProducts } from '../data/products';
import { Product } from '../types';

interface DashboardProps {
  products?: Product[];
  isDarkMode?: boolean;
}

export default function Dashboard({ products: productsProp, isDarkMode = true }: DashboardProps) {
  const activeProducts = productsProp || fallbackProducts;
  
  // Storage helpers
  const getUserId = useCallback((): string => {
    try {
      const sbKey = Object.keys(localStorage).find(key => key.startsWith('sb-') && key.endsWith('-auth-token'));
      if (sbKey) {
        const sbData = JSON.parse(localStorage.getItem(sbKey) || '{}');
        if (sbData?.user?.id) return sbData.user.id;
        if (sbData?.user?.email) return sbData.user.email;
      }
    } catch (err) {}
    return 'anonymous';
  }, []);

  const userStorage = useMemo(() => ({
    get: (key: string): string | null => {
      const userId = getUserId();
      return localStorage.getItem(`shopspy_user_${userId}_${key}`);
    },
    set: (key: string, value: string): void => {
      const userId = getUserId();
      localStorage.setItem(`shopspy_user_${userId}_${key}`, value);
    }
  }), [getUserId]);

  // Helper to parse strings safely
  const parseSavedFloat = useCallback((key: string, def: number): number => {
    const saved = localStorage.getItem(key);
    if (!saved) return def;
    const clean = saved.replace(/\./g, '').replace(',', '.');
    const val = parseFloat(clean);
    return isNaN(val) ? def : val;
  }, []);

  const parseSavedInt = useCallback((key: string, def: number): number => {
    const saved = localStorage.getItem(key);
    if (!saved) return def;
    const clean = saved.replace(/\./g, '');
    const val = parseInt(clean, 10);
    return isNaN(val) ? def : val;
  }, []);

  // Dashboard Core States
  const [salesTotal, setSalesTotal] = useState<number>(() => parseSavedFloat('shopspy_dashboard_sales', 0));
  const [visitors, setVisitors] = useState<number>(() => parseSavedInt('shopspy_metric_visitors', 0));
  const [views, setViews] = useState<number>(() => parseSavedInt('shopspy_metric_views', 0));
  const [orders, setOrders] = useState<number>(() => parseSavedInt('shopspy_metric_orders', 0));
  const [units, setUnits] = useState<number>(() => parseSavedInt('shopspy_metric_units', 0));
  const [commissionTotal, setCommissionTotal] = useState<number>(() => parseSavedFloat('shopspy_dashboard_commission', 0));
  
  // Period pill state
  const [activePeriod, setActivePeriod] = useState('Semana');

  // List of Recent Sales State
  const [recentSales, setRecentSales] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('shopspy_recent_sales');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync recentSales state with local storage
  useEffect(() => {
    localStorage.setItem('shopspy_recent_sales', JSON.stringify(recentSales));
  }, [recentSales]);

  // Hide value states
  const [showValues, setShowValues] = useState<boolean>(() => localStorage.getItem('shopspy_show_values') !== 'false');

  // Active currency: 'BRL' | 'USD' | 'EUR'
  const [activeCurrency, setActiveCurrency] = useState<'BRL' | 'USD' | 'EUR'>(() => (localStorage.getItem('shopspy_currency') || 'BRL') as any);

  // Refresh spinner state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Helper to format currency
  const formatCurrency = useCallback((valueBRL: number) => {
    if (!showValues) return '••••';
    
    if (activeCurrency === 'USD') {
      const usdValue = valueBRL * 0.18; // approx rate BRL to USD
      return usdValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } else if (activeCurrency === 'EUR') {
      const eurValue = valueBRL * 0.16; // approx rate BRL to EUR
      return eurValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    } else {
      return valueBRL.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
  }, [showValues, activeCurrency]);

  // Helper to convert top products prices
  const formatProductPrice = useCallback((priceStr: string) => {
    if (!showValues) return '••••';
    const clean = priceStr.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
    const val = parseFloat(clean);
    if (isNaN(val)) return priceStr;
    return formatCurrency(val);
  }, [showValues, formatCurrency]);

  // Helper to hide general numbers
  const formatNumberHidden = useCallback((val: number | string) => {
    return showValues ? val : '••••';
  }, [showValues]);

  // Refresh sync simulation action
  const handleRefresh = useCallback(() => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    
    // Simulate real-time loading/sync of dashboard data from storage
    setTimeout(() => {
      setSalesTotal(parseSavedFloat('shopspy_dashboard_sales', 0));
      setVisitors(parseSavedInt('shopspy_metric_visitors', 0));
      setViews(parseSavedInt('shopspy_metric_views', 0));
      setOrders(parseSavedInt('shopspy_metric_orders', 0));
      setUnits(parseSavedInt('shopspy_metric_units', 0));
      setCommissionTotal(parseSavedFloat('shopspy_dashboard_commission', 0));
      
      try {
        const saved = localStorage.getItem('shopspy_recent_sales');
        if (saved) setRecentSales(JSON.parse(saved));
      } catch (e) {}

      setIsRefreshing(false);
    }, 800);
  }, [isRefreshing, parseSavedFloat, parseSavedInt]);

  // Sync settings when modified from the Admin Panel
  useEffect(() => {
    const handleSettingsUpdate = () => {
      setSalesTotal(parseSavedFloat('shopspy_dashboard_sales', 0));
      setVisitors(parseSavedInt('shopspy_metric_visitors', 0));
      setViews(parseSavedInt('shopspy_metric_views', 0));
      setOrders(parseSavedInt('shopspy_metric_orders', 0));
      setUnits(parseSavedInt('shopspy_metric_units', 0));
      setCommissionTotal(parseSavedFloat('shopspy_dashboard_commission', 0));
      
      // Trigger a re-render of useMemo by forcing a state update if needed
      // but usually the event itself is enough to trigger the components listening to it
      try {
        const saved = localStorage.getItem('shopspy_recent_sales');
        setRecentSales(saved ? JSON.parse(saved) : []);
      } catch (e) {
        setRecentSales([]);
      }
    };

    window.addEventListener('shopspy_settings_updated', handleSettingsUpdate);
    return () => window.removeEventListener('shopspy_settings_updated', handleSettingsUpdate);
  }, [parseSavedFloat, parseSavedInt]);

  // Persist metrics back to localStorage
  useEffect(() => {
    localStorage.setItem('shopspy_dashboard_sales', salesTotal.toFixed(2).replace('.', ','));
    localStorage.setItem('shopspy_metric_visitors', String(visitors));
    localStorage.setItem('shopspy_metric_views', String(views));
    localStorage.setItem('shopspy_metric_orders', String(orders));
    localStorage.setItem('shopspy_metric_units', String(units));
    localStorage.setItem('shopspy_dashboard_commission', commissionTotal.toFixed(2).replace('.', ','));
  }, [salesTotal, visitors, views, orders, units, commissionTotal]);

  // One-time run to clear legacy metrics and start fresh at 0 as requested
  useEffect(() => {
    const isCleared = localStorage.getItem('shopspy_db_reset_done_v5');
    if (!isCleared) {
      localStorage.setItem('shopspy_dashboard_sales', '0,00');
      localStorage.setItem('shopspy_metric_visitors', '0');
      localStorage.setItem('shopspy_metric_views', '0');
      localStorage.setItem('shopspy_metric_orders', '0');
      localStorage.setItem('shopspy_metric_units', '0');
      localStorage.setItem('shopspy_recent_sales', '[]');
      localStorage.setItem('shopspy_notifications_enabled', 'false');
      setSalesTotal(0);
      setVisitors(0);
      setViews(0);
      setOrders(0);
      setUnits(0);
      setCommissionTotal(0);
      setRecentSales([]);
      localStorage.setItem('shopspy_db_reset_done_v5', 'true');
      window.dispatchEvent(new CustomEvent('shopspy_settings_updated'));
    }
  }, []);

  // Live notification Listener for sales event
  useEffect(() => {
    const handleSale = (e: any) => {
      const { price, productId } = e.detail;
      const product = activeProducts.find(p => p.id === productId);
      if (!product) return;

      // Add to recent sales list
      setRecentSales(prev => [{
        id: Date.now(),
        product,
        price,
        time: new Date().toLocaleTimeString('pt-BR'),
        timestamp: Date.now()
      }, ...prev].slice(0, 10));

      const commRateStr = product.comissao ? String(product.comissao).replace('%', '').trim() : '10';
      const commRate = parseFloat(commRateStr) / 100;
      const commission = price * (isNaN(commRate) ? 0.1 : commRate);

      setSalesTotal(prev => prev + price);
      setCommissionTotal(prev => prev + commission);
      setOrders(prev => prev + 1);
      
      // Update auxiliary indicators 
      setVisitors(prev => prev + Math.floor(Math.random() * 8 + 3));
      setViews(prev => prev + Math.floor(Math.random() * 15 + 5));
      setUnits(prev => prev + 1);
    };

    window.addEventListener('shopspy_sale', handleSale as EventListener);
    return () => window.removeEventListener('shopspy_sale', handleSale as EventListener);
  }, [activeProducts]);

  // Top 5 Products selection selector 
  const topProducts = useMemo(() => {
    const top5Ids = JSON.parse(localStorage.getItem('shopspy_top5_products') || '[11,12,13,14,15]');
    const filtered = activeProducts.filter(p => top5Ids.includes(p.id));
    if (filtered.length > 0) {
      return filtered.slice(0, 5);
    }
    // Fallback sort by ranking
    return [...activeProducts].sort((a, b) => a.ranking - b.ranking).slice(0, 5);
  }, [activeProducts]);

  // Period lists
  const periods = ["Ontem", "Hoje", "Semana", "Mês", "Ano", "Tudo"];

  // Multiplier-based period calculator to dynamically compute realistic sub-period totals
  const currentPeriodData = useMemo(() => {
    const mults: Record<string, { sales: number; visitors: number; views: number; orders: number; units: number; changeSales: string; changeOrders: string; status: string }> = {
      'Hoje': { sales: 0.05, visitors: 0.06, views: 0.06, orders: 0.05, units: 0.05, changeSales: '↗ +4.2%', changeOrders: '↗ +3.5%', status: 'hoje' },
      'Ontem': { sales: 0.07, visitors: 0.08, views: 0.08, orders: 0.07, units: 0.07, changeSales: '↘ -1.2%', changeOrders: '↘ -1.8%', status: 'ontem' },
      'Semana': { sales: 0.28, visitors: 0.30, views: 0.30, orders: 0.28, units: 0.28, changeSales: '↗ +12.5%', changeOrders: '↗ +10.2%', status: 'última semana' },
      'Mês': { sales: 0.65, visitors: 0.68, views: 0.68, orders: 0.65, units: 0.65, changeSales: '↗ +24.8%', changeOrders: '↗ +22.1%', status: 'último mês' },
      'Ano': { sales: 0.94, visitors: 0.95, views: 0.95, orders: 0.94, units: 0.94, changeSales: '↗ +45.2%', changeOrders: '↗ +40.5%', status: 'último ano' },
      'Tudo': { sales: 1.0, visitors: 1.0, views: 1.0, orders: 1.0, units: 1.0, changeSales: '↗ +89.3%', changeOrders: '↗ +85.1%', status: 'geral acumulado' }
    };
    const m = mults[activePeriod] || mults['Semana'];
    
    const pSales = salesTotal * m.sales;
    const pVisitors = Math.round(visitors * m.visitors);
    const pViews = Math.round(views * m.views);
    
    let pOrders = Math.round(orders * m.orders);
    if (orders > 0 && pOrders === 0) pOrders = 1;
    
    let pUnits = Math.round(units * m.units);
    if (units > 0 && pUnits === 0) pUnits = 1;

    return {
      sales: pSales,
      visitors: pVisitors,
      views: pViews,
      orders: pOrders,
      units: pUnits,
      changeSales: m.changeSales,
      changeOrders: m.changeOrders,
      status: m.status
    };
  }, [activePeriod, salesTotal, visitors, views, orders, units]);

  // Admin Overrides for Metrics
  const adminMetricsOverride = useMemo(() => {
    const getVal = (key: string) => localStorage.getItem(`shopspy_admin_${key}`);
    const getVar = (key: string) => localStorage.getItem(`shopspy_admin_var_${key}`);

    return {
      total_vendas: getVal('total_vendas'),
      receita_total: getVal('receita_total'),
      vendas_pendentes: getVal('vendas_pendentes'),
      vendas_falhadas: getVal('vendas_falhadas'),
      cliques: getVal('cliques'),
      pedidos: getVal('pedidos'),
      comissao: getVal('comissao'),
      itens_vendidos: getVal('itens_vendidos'),
      valor_pedido: getVal('valor_pedido'),
      novos_compradores: getVal('novos_compradores'),
      var_total_vendas: getVar('total_vendas'),
      var_receita_total: getVar('receita_total'),
      var_vendas_pendentes: getVar('vendas_pendentes'),
      var_vendas_falhadas: getVar('vendas_falhadas'),
      var_cliques: getVar('cliques'),
      var_pedidos: getVar('pedidos'),
      var_comissao: getVar('comissao'),
      var_itens_vendidos: getVar('itens_vendidos'),
      var_valor_pedido: getVar('valor_pedido'),
      var_novos_compradores: getVar('novos_compradores'),
    };
  }, [salesTotal, visitors, views, orders, units]); // Listen to changes triggered by events

  // Recharts dynamic chart data based on active Period pill and computed sub-period sale total
  const dynamicChartData = useMemo(() => {
    let labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    let weights = [0.1, 0.15, 0.12, 0.18, 0.22, 0.13, 0.1];

    if (activePeriod === 'Hoje' || activePeriod === 'Ontem') {
      labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
      weights = [0.05, 0.08, 0.15, 0.25, 0.22, 0.18, 0.07];
    } else if (activePeriod === 'Mês') {
      labels = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
      weights = [0.2, 0.28, 0.35, 0.17];
    } else if (activePeriod === 'Ano') {
      labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      weights = [0.06, 0.07, 0.08, 0.09, 0.08, 0.11, 0.12, 0.1, 0.09, 0.07, 0.06, 0.07];
    } else if (activePeriod === 'Tudo') {
      labels = ['2023', '2024', '2025', '2026'];
      weights = [0.15, 0.25, 0.35, 0.25];
    }

    return labels.map((label, i) => {
      const weight = weights[i] || 0.1;
      return {
        name: label,
        value: Math.round(currentPeriodData.sales * weight * 100) / 100
      };
    });
  }, [currentPeriodData.sales, activePeriod]);

  // Relative live time formatter matching live indicator mockup screenshot
  const getRelativeLiveTime = useCallback((index: number, timestamp?: number) => {
    if (timestamp) {
      const diffSeconds = Math.floor((Date.now() - timestamp) / 1000);
      if (diffSeconds < 60) return 'há menos de um minuto';
      const diffMinutes = Math.floor(diffSeconds / 60);
      if (diffMinutes < 60) return `há ${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'}`;
      const diffHours = Math.floor(diffMinutes / 60);
      return `há ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    }
    // Fallback based on relative position matching screenshot layout organically
    if (index === 0) return 'há menos de um minuto';
    if (index === 1) return 'há 1 minuto';
    if (index === 2) return 'há 3 minutos';
    if (index === 3) return 'há 6 minutos';
    if (index === 4) return 'há 10 minutos';
    return `há ${index * 3} minutos`;
  }, []);

  // Metric grid spec items computed according to the selected period
  const metrics = [
    { 
      label: 'Cliques', 
      value: showValues ? (adminMetricsOverride.cliques || currentPeriodData.visitors) : '••••', 
      change: adminMetricsOverride.var_cliques || currentPeriodData.changeSales, 
      icon: 'MousePointer' 
    },
    { 
      label: 'Pedidos', 
      value: showValues ? (adminMetricsOverride.pedidos || currentPeriodData.orders) : '••••', 
      change: adminMetricsOverride.var_pedidos || currentPeriodData.changeOrders, 
      icon: 'ShoppingBag' 
    },
    { 
      label: `Comissão est. (${activeCurrency})`, 
      value: showValues ? (adminMetricsOverride.comissao ? (activeCurrency === 'BRL' ? `R$ ${adminMetricsOverride.comissao}` : formatCurrency(parseSavedFloat(`shopspy_admin_comissao`, 0))) : formatCurrency(commissionTotal)) : '••••', 
      change: adminMetricsOverride.var_comissao || currentPeriodData.changeSales, 
      icon: 'DollarSign' 
    },
    { 
      label: 'Itens vendidos', 
      value: showValues ? (adminMetricsOverride.itens_vendidos || currentPeriodData.units) : '••••', 
      change: adminMetricsOverride.var_itens_vendidos || currentPeriodData.changeOrders, 
      icon: 'Package' 
    },
    { 
      label: `Valor do pedido (${activeCurrency})`, 
      value: showValues ? (adminMetricsOverride.valor_pedido ? (activeCurrency === 'BRL' ? `R$ ${adminMetricsOverride.valor_pedido}` : formatCurrency(parseSavedFloat(`shopspy_admin_valor_pedido`, 0))) : (currentPeriodData.orders > 0 ? formatCurrency(currentPeriodData.sales / currentPeriodData.orders) : formatCurrency(0))) : '••••', 
      change: adminMetricsOverride.var_valor_pedido || '0%', 
      icon: 'TrendingUp' 
    },
    { 
      label: 'Novos compradores', 
      value: showValues ? (adminMetricsOverride.novos_compradores || Math.round(currentPeriodData.visitors * 0.12)) : '••••', 
      change: adminMetricsOverride.var_novos_compradores || '', 
      icon: 'Users' 
    },
  ];

  const getMetricIcon = (iconName: string) => {
    switch (iconName) {
      case 'MousePointer': return <MousePointer size={18} className="text-[#D0011B]" />;
      case 'ShoppingBag': return <ShoppingBag size={18} className="text-[#D0011B]" />;
      case 'DollarSign': return <DollarSign size={18} className="text-[#D0011B]" />;
      case 'Package': return <Package size={18} className="text-[#D0011B]" />;
      case 'TrendingUp': return <TrendingUp size={18} className="text-[#D0011B]" />;
      case 'Users': return <Users size={18} className="text-[#D0011B]" />;
      default: return <MousePointer size={18} className="text-[#D0011B]" />;
    }
  };

  // Theme support helpers
  const bgClass = isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f8f9fa]';
  const cardBgClass = isDarkMode ? 'bg-[#111111] border-white/5' : 'bg-white border-gray-200/60 shadow-sm';
  const headerIconBg = isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200/70 hover:bg-gray-300/80';
  const headerIconBorder = isDarkMode ? 'border-white/5' : 'border-gray-200/40';
  const headerIconColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textMuted = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const listHover = isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100/70';

  return (
    <div id="dashboard_view" className={`flex-1 ${bgClass} min-h-screen ${textPrimary} p-6 md:p-8 font-['Space_Grotesk'] overflow-x-hidden transition-colors duration-300 relative`}>
      
      {/* Visual Sync Overlay with Red Gradient Spinner & Glassmorphism Blur */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 dark:bg-[#0A0A0A]/85 backdrop-blur-md rounded-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="flex flex-col items-center gap-4 bg-white/90 dark:bg-[#111111]/90 border border-black/5 dark:border-white/[0.08] p-8 rounded-2xl shadow-2xl max-w-sm text-center"
            >
              <div className="relative w-14 h-14">
                {/* Underlay glow ring */}
                <div className="absolute inset-0 rounded-full border-4 border-neutral-200 dark:border-white/10" />
                {/* Rotating neon red gradient ring */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 border-t-[#D0011B] border-r-[#D0011B] border-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
                />
                {/* Center glowing dot */}
                <div className="absolute inset-[15px] bg-[#D0011B] rounded-full animate-pulse shadow-[0_0_12px_#D0011B]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
                  Sincronizando Dados
                </h3>
                <p className="text-[12px] text-gray-500 dark:text-gray-400">
                  Carregando as últimas métricas do banco de dados...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER DA DASHBOARD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 id="db_main_title" className={`text-[28px] font-black uppercase tracking-tight gradient-title m-0`}>
            Dashboard
          </h1>
          <p className={`text-[14px] ${textMuted} mt-1 m-0`}>
            Acompanhe suas vendas e métricas em tempo real.
          </p>
        </div>

        {/* Lado direito: 3 ícones circulares */}
        <div className="flex items-center gap-3">
          <button 
            id="header_icon_refresh"
            onClick={handleRefresh}
            className={`w-[36px] h-[36px] rounded-full ${headerIconBg} border ${headerIconBorder} flex items-center justify-center ${headerIconColor} transition-all duration-300 ${isRefreshing ? 'animate-spin' : 'hover:scale-105 active:scale-95'}`}
            title="Sincronizar dados"
          >
            <RefreshCw size={16} />
          </button>
          <button 
            id="header_icon_eye"
            onClick={() => {
              const next = !showValues;
              setShowValues(next);
              localStorage.setItem('shopspy_show_values', String(next));
            }}
            className={`w-[36px] h-[36px] rounded-full ${headerIconBg} border ${headerIconBorder} flex items-center justify-center ${headerIconColor} hover:scale-105 active:scale-95 transition-all`}
            title={showValues ? "Ocultar valores" : "Mostrar valores"}
          >
            {showValues ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <button 
            id="header_icon_dollar"
            onClick={() => {
              const currencies: ('BRL' | 'USD' | 'EUR')[] = ['BRL', 'USD', 'EUR'];
              const currentIndex = currencies.indexOf(activeCurrency);
              const nextCurrency = currencies[(currentIndex + 1) % currencies.length];
              setActiveCurrency(nextCurrency);
              localStorage.setItem('shopspy_currency', nextCurrency);
            }}
            className={`w-[36px] h-[36px] rounded-full ${headerIconBg} border ${headerIconBorder} flex items-center justify-center ${headerIconColor} hover:scale-105 active:scale-95 transition-all text-xs font-bold`}
            title={`Alterar moeda (Atual: ${activeCurrency})`}
          >
            {activeCurrency === 'BRL' && <span>R$</span>}
            {activeCurrency === 'USD' && <DollarSign size={16} />}
            {activeCurrency === 'EUR' && <Euro size={16} />}
          </button>
        </div>
      </div>

      {/* FILTRO DE PERÍODO */}
      <div className={`mt-6 flex flex-wrap items-center gap-2 ${isDarkMode ? 'bg-[#111111]/80 border-white/5' : 'bg-white border-gray-200 shadow-sm'} p-1.5 rounded-full border max-w-fit transition-colors duration-300`}>
        {periods.map(period => (
          <button
            key={period}
            onClick={() => setActivePeriod(period)}
            style={activePeriod === period ? {
              background: 'linear-gradient(180deg, #E21B33 0%, #D0011B 50%, #B00014 100%)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 4px 12px rgba(208, 1, 27, 0.3), inset 0 1.5px 3px rgba(255, 255, 255, 0.2), inset 0 -1.5px 3px rgba(0, 0, 0, 0.2)',
            } : {}}
            className={`px-4 py-1.5 text-xs transition-all duration-200 border-none cursor-pointer ${
              activePeriod === period 
                ? 'font-bold rounded-full text-white' 
                : `bg-transparent ${textMuted} hover:${textPrimary}`
            }`}
          >
            {period}
          </button>
        ))}
        {/* Ícone Calendário */}
        <div className={`px-2 ${textMuted} flex items-center`}>
          <Calendar size={14} />
        </div>
      </div>

      {/* GRID 4 CARDS COLORIDOS - RESPONSIVO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        
        {/* Card 1 — Total de Vendas */}
        <div className="bg-[#22c55e] rounded-[16px] p-6 relative overflow-hidden h-[155px] flex flex-col justify-between shadow-lg">
          {/* Círculo decorativo */}
          <div className="absolute right-[-20px] bottom-[-20px] bg-white/10 rounded-full select-none pointer-events-none" style={{ width: '120px', height: '120px' }}></div>
          {/* Ícone no canto superior direito */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <ShoppingCart size={24} className="text-white" />
          </div>
          <div>
            <span className="text-[14px] text-white/90 font-medium leading-tight">Vendas Entregues</span>
            <h2 className="text-[32px] font-black text-white mt-1 leading-none">
              {showValues ? (adminMetricsOverride.total_vendas || currentPeriodData.orders) : '••••'}
            </h2>
          </div>
          <span className="text-[12px] text-white/70 relative z-10">
            {adminMetricsOverride.var_total_vendas || currentPeriodData.changeOrders} vs. anterior ({currentPeriodData.status})
          </span>
        </div>

        {/* Card 2 — Receita Total */}
        <div className="bg-[#16a34a] rounded-[16px] p-6 relative overflow-hidden h-[155px] flex flex-col justify-between shadow-lg">
          <div className="absolute right-[-20px] bottom-[-20px] bg-white/10 rounded-full select-none pointer-events-none" style={{ width: '120px', height: '120px' }}></div>
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            {activeCurrency === 'BRL' && <span className="text-white font-black text-xl absolute">R$</span>}
            {activeCurrency === 'USD' && <DollarSign size={24} className="text-white" />}
            {activeCurrency === 'EUR' && <Euro size={24} className="text-white" />}
          </div>
          <div>
            <span className="text-[14px] text-white/90 font-medium leading-tight">Receita no Período</span>
            <h2 className="text-[28px] md:text-[32px] font-black text-white mt-1 leading-none truncate">
              {showValues ? (adminMetricsOverride.receita_total ? (activeCurrency === 'BRL' ? `R$ ${adminMetricsOverride.receita_total}` : formatCurrency(parseSavedFloat('shopspy_admin_receita_total', 0))) : formatCurrency(currentPeriodData.sales)) : '••••'}
            </h2>
          </div>
          <span className="text-[12px] text-white/70 relative z-10">
            {adminMetricsOverride.var_receita_total || currentPeriodData.changeSales} vs. anterior ({currentPeriodData.status})
          </span>
        </div>

        {/* Card 3 — Vendas Pendentes */}
        <div className="bg-[#f59e0b] rounded-[16px] p-6 relative overflow-hidden h-[155px] flex flex-col justify-between shadow-lg">
          <div className="absolute right-[-20px] bottom-[-20px] bg-white/10 rounded-full select-none pointer-events-none" style={{ width: '120px', height: '120px' }}></div>
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Clock size={24} className="text-white" />
          </div>
          <div>
            <span className="text-[14px] text-white/90 font-medium leading-tight">Vendas Pendentes</span>
            <h2 className="text-[32px] font-black text-white mt-1 leading-none">
              {showValues ? (adminMetricsOverride.vendas_pendentes || Math.round(currentPeriodData.orders * 0.08)) : '••••'}
            </h2>
          </div>
          <span className="text-[12px] text-white/70 relative z-10">
            {adminMetricsOverride.var_vendas_pendentes || 'Aguardando pagamento'} ({currentPeriodData.status})
          </span>
        </div>

        {/* Card 4 — Vendas Falhadas */}
        <div className="bg-[#ef4444] rounded-[16px] p-6 relative overflow-hidden h-[155px] flex flex-col justify-between shadow-lg">
          <div className="absolute right-[-20px] bottom-[-20px] bg-white/10 rounded-full select-none pointer-events-none" style={{ width: '120px', height: '120px' }}></div>
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <AlertCircle size={24} className="text-white" />
          </div>
          <div>
            <span className="text-[14px] text-white/90 font-medium leading-tight">Vendas Canceladas</span>
            <h2 className="text-[32px] font-black text-white mt-1 leading-none">
              {showValues ? (adminMetricsOverride.vendas_falhadas || Math.round(currentPeriodData.orders * 0.03)) : '••••'}
            </h2>
          </div>
          <span className="text-[12px] text-white/70 relative z-10">
            {adminMetricsOverride.var_vendas_falhadas || 'Não aprovadas'} ({currentPeriodData.status})
          </span>
        </div>

      </div>

      {/* GRID DE MÉTRICAS */}
      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, i) => (
            <div 
              key={i}
              className={`${cardBgClass} border rounded-xl p-4 flex flex-col justify-between min-h-[110px] transition-all`}
            >
              <div className="flex justify-between items-start">
                <span className={`text-[12px] ${textMuted} font-medium`}>
                  {metric.label}
                </span>
                {getMetricIcon(metric.icon)}
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className={`text-2xl font-bold ${textPrimary} tracking-tight`}>
                  {metric.value}
                </span>
                {metric.change && (
                  <span className="text-[11px] text-[#22c55e] font-medium ml-1">
                    {metric.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEÇÃO INFERIOR — 2 colunas lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-8">
        
        {/* Coluna esquerda (60%) — Gráfico de Vendas */}
        <div className={`lg:col-span-6 ${cardBgClass} border rounded-[14px] p-5 flex flex-col justify-between transition-all`}>
          <div>
            <div className="flex items-center gap-2">
              <BarChart2 className="text-[#D0011B]" size={18} />
              <h3 className={`font-bold ${textPrimary} text-base m-0`}>Vendas</h3>
            </div>
            <p className={`text-xs ${textMuted} mt-1 m-0`}>
              Receita no período selecionado
            </p>
            <h2 className={`text-[32px] font-black ${textPrimary} mt-4 tracking-tight`}>
              {formatCurrency(currentPeriodData.sales)}
            </h2>
          </div>

          <div className="h-[200px] mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dynamicChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSalesRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D0011B" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#D0011B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: isDarkMode ? '#666' : '#888' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: isDarkMode ? '#666' : '#888' }} 
                />
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(Number(value)), 'Vendas']}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: isDarkMode ? '1.5px solid rgba(255,255,255,0.08)' : '1.5px solid rgba(0,0,0,0.06)', 
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                    backgroundColor: isDarkMode ? '#111111' : '#ffffff',
                    color: isDarkMode ? '#ffffff' : '#111111'
                  }}
                  itemStyle={{ color: isDarkMode ? '#fff' : '#111' }}
                  labelStyle={{ color: isDarkMode ? '#aaa' : '#666' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#D0011B" 
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorSalesRed)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Coluna direita (40%) — Vendas Recentes + Top 5 */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Card "Vendas ao Vivo" */}
          <div className={`${cardBgClass} border rounded-[14px] p-5 transition-all relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio className="text-[#10b981] animate-pulse" size={18} />
                <h3 className={`font-bold ${textPrimary} text-base m-0`}>Vendas ao Vivo</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-[#10b981] bg-[#10b981]/15 px-2.5 py-0.5 rounded-full select-none uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                Ao Vivo
              </span>
            </div>

            {/* Total Commission and Count Panel styled exactly like the green box mockup */}
            <div className="bg-[#10b981]/10 dark:bg-[#10b981]/5 border border-[#10b981]/20 dark:border-[#10b981]/10 rounded-[12px] p-3 flex items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#10b981]/70 dark:text-[#10b981]/90 block leading-tight">
                  Total Comissões
                </span>
                <h4 className="text-[20px] font-black text-[#10b981] mt-1 m-0 leading-none">
                  {formatCurrency(commissionTotal)}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 block leading-tight">
                  Vendas
                </span>
                <h4 className="text-[20px] font-black text-gray-900 dark:text-white mt-1 m-0 leading-none">
                  {formatNumberHidden(orders)}
                </h4>
              </div>
            </div>

            <div className="min-h-[140px] max-h-[220px] overflow-y-auto custom-scrollbar flex flex-col gap-3">
              {recentSales.map((sale, index) => (
                <div 
                  key={sale.id}
                  className={`flex items-center justify-between gap-3 p-2 rounded-lg ${listHover} transition-colors animate-[fadeIn_0.3s_ease]`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#10b981]/10 dark:bg-[#10b981]/15 border border-[#10b981]/20 dark:border-[#10b981]/10 flex items-center justify-center text-[#10b981] text-xs font-black shrink-0 shadow-sm">
                      $
                    </div>
                    <div className="min-w-0">
                      <p className={`text-[13px] font-black ${textPrimary} truncate m-0 leading-tight`}>
                        {sale.product.nome}
                      </p>
                      <span className={`text-[11px] ${textMuted} block mt-0.5 leading-none`}>
                        {getRelativeLiveTime(index, sale.timestamp)}
                      </span>
                    </div>
                  </div>
                  <span className="text-[13px] font-black text-[#10b981] flex-shrink-0 tracking-tight">
                    + {formatCurrency(sale.price * 0.1)}
                  </span>
                </div>
              ))}

              {recentSales.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
                  <span className="relative flex h-3 w-3 mb-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10b981]"></span>
                  </span>
                  <p className="text-xs m-0 font-medium">Aguardando vendas ao vivo...</p>
                </div>
              )}
            </div>
          </div>

          {/* Card "Top 5 Produtos" */}
          <div className={`${cardBgClass} border rounded-[14px] p-5 transition-all`}>
            <h3 className={`font-bold ${textPrimary} text-base m-0`}>Top 5 Produtos</h3>
            
            <div className="mt-4 flex flex-col gap-3">
              {topProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="flex items-center gap-3"
                >
                  <span className="text-[14px] font-black text-[#D0011B] w-5">
                    #{index + 1}
                  </span>
                  <img 
                    src={product.imagem} 
                    alt={product.nome}
                    className="w-9 h-9 rounded-md object-cover flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] font-medium ${textPrimary} truncate m-0`}>
                      {product.nome}
                    </p>
                    <span className={`text-[11px] ${textMuted} block mt-0.5`}>
                      {product.vendas} vendidos
                    </span>
                  </div>
                  <span className={`text-[13px] font-bold ${textPrimary} flex-shrink-0`}>
                    {formatProductPrice(product.preco)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Animation classes helper */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
