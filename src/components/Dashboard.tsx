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

  // Live notification Listener for sales event
  useEffect(() => {
    const handleSale = (e: any) => {
      const { price, commissionRate, productId } = e.detail;
      const commission = price * (commissionRate / 100);

      if (userStorage) {
        const currentSales = Number(userStorage.get('TotalVendas') || 0);
        const currentRevenue = Number(userStorage.get('ReceitaTotal') || 0);
        const currentCommission = Number(userStorage.get('ComissaoEstimada') || 0);
        const currentItems = Number(userStorage.get('ItensSold') || 0);
        const currentClicks = Number(userStorage.get('Cliques') || 0);

        userStorage.set('TotalVendas', String(currentSales + 1));
        userStorage.set('ReceitaTotal', String(currentRevenue + price));
        userStorage.set('ComissaoEstimada', String(currentCommission + commission));
        userStorage.set('ItensSold', String(currentItems + 1));
        userStorage.set('Cliques', String(currentClicks + Math.floor(Math.random() * 5 + 1)));
      }

      setSalesTotal(prev => prev + price);
      setOrders(prev => prev + 1);
      setUnits(prev => prev + 1);
      setCommissionTotal(prev => prev + commission);
      
      const product = activeProducts.find(p => p.id === productId);
      if (product) {
        setRecentSales(prev => [{
          id: Date.now(),
          product,
          price,
          time: new Date().toLocaleTimeString('pt-BR'),
          timestamp: Date.now()
        }, ...prev].slice(0, 10));
      }
    };

    window.addEventListener('shopspy_sale', handleSale as EventListener);
    return () => window.removeEventListener('shopspy_sale', handleSale as EventListener);
  }, [activeProducts, userStorage]);

  // Top 5 Products selection
  const topProducts = useMemo(() => {
    const top5Ids = JSON.parse(localStorage.getItem('shopspy_top5_products') || '[11,12,13,14,15]');
    const filtered = activeProducts.filter(p => top5Ids.includes(p.id));
    if (filtered.length > 0) {
      return filtered.slice(0, 5);
    }
    return [...activeProducts].sort((a, b) => a.ranking - b.ranking).slice(0, 5);
  }, [activeProducts]);

  const periods = ["Ontem", "Hoje", "Semana", "Mês", "Ano", "Tudo"];

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
  }, []);

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

  const getRelativeLiveTime = useCallback((index: number, timestamp?: number) => {
    if (timestamp) {
      const diffSeconds = Math.floor((Date.now() - timestamp) / 1000);
      if (diffSeconds < 60) return 'há menos de um minuto';
      const diffMinutes = Math.floor(diffSeconds / 60);
      if (diffMinutes < 60) return `há ${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'}`;
      const diffHours = Math.floor(diffMinutes / 60);
      return `há ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    }
    if (index === 0) return 'há menos de um minuto';
    if (index === 1) return 'há 1 minuto';
    if (index === 2) return 'há 3 minutos';
    if (index === 3) return 'há 6 minutos';
    if (index === 4) return 'há 10 minutos';
    return `há ${index * 3} minutos`;
  }, []);

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

  return (
    <div id="dashboard_view" className={`flex-1 bg-transparent min-h-screen text-white p-6 md:p-8 font-['Space_Grotesk'] overflow-x-hidden transition-colors duration-300 relative`}>
      
      {/* Visual Sync Overlay */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md rounded-2xl"
          >
            <div className="flex flex-col items-center gap-4 glass-obsidian p-8 rounded-2xl shadow-2xl max-w-sm text-center">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                <motion.div 
                   className="absolute inset-0 rounded-full border-4 border-t-[#D0011B] border-r-[#D0011B] border-transparent"
                   animate={{ rotate: 360 }}
                   transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
                />
                <div className="absolute inset-[15px] bg-[#D0011B] rounded-full animate-pulse shadow-[0_0_12px_#D0011B]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Sincronizando Dados
                </h3>
                <p className="text-[12px] text-white/50">
                  Carregando as últimas métricas do banco de dados...
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER DA DASHBOARD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 id="db_main_title" className={`text-[28px] font-black uppercase tracking-tight gradient-title m-0`}>
            Dashboard
          </h1>
          <p className={`text-[14px] text-white/50 mt-1 m-0`}>
            Acompanhe suas vendas e métricas em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            className={`w-[36px] h-[36px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-300 ${isRefreshing ? 'animate-spin' : 'hover:scale-105 active:scale-95'}`}
            title="Sincronizar dados"
          >
            <RefreshCw size={16} />
          </button>
          <button 
            onClick={() => {
              const next = !showValues;
              setShowValues(next);
              localStorage.setItem('shopspy_show_values', String(next));
            }}
            className={`w-[36px] h-[36px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all`}
            title={showValues ? "Ocultar valores" : "Mostrar valores"}
          >
            {showValues ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <button 
            onClick={() => {
              const currencies: ('BRL' | 'USD' | 'EUR')[] = ['BRL', 'USD', 'EUR'];
              const currentIndex = currencies.indexOf(activeCurrency);
              const nextCurrency = currencies[(currentIndex + 1) % currencies.length];
              setActiveCurrency(nextCurrency);
              localStorage.setItem('shopspy_currency', nextCurrency);
            }}
            className={`w-[36px] h-[36px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all text-xs font-bold`}
            title={`Alterar moeda (Atual: ${activeCurrency})`}
          >
            {activeCurrency === 'BRL' && <span>R$</span>}
            {activeCurrency === 'USD' && <DollarSign size={16} />}
            {activeCurrency === 'EUR' && <Euro size={16} />}
          </button>
        </div>
      </div>

      {/* FILTRO DE PERÍODO */}
      <div className={`mt-6 flex flex-wrap items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md shadow-inner p-1.5 rounded-full max-w-fit transition-colors duration-300`}>
        {periods.map(period => (
          <button
            key={period}
            onClick={() => setActivePeriod(period)}
            className={`px-4 py-1.5 text-xs transition-all duration-300 border-none cursor-pointer rounded-full ${
              activePeriod === period 
                ? 'bg-gradient-to-r from-[#D0011B] to-[#ff4444] font-black text-white shadow-[0_4px_12px_rgba(208,1,27,0.3)] scale-105' 
                : `bg-transparent text-white/40 hover:text-white hover:bg-white/5`
            }`}
          >
            {period}
          </button>
        ))}
        <div className={`px-2 text-white/30 flex items-center`}>
          <Calendar size={14} />
        </div>
      </div>

      {/* GRID 4 CARDS COLORIDOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { label: 'Vendas Entregues', value: adminMetricsOverride.total_vendas || currentPeriodData.orders, change: adminMetricsOverride.var_total_vendas || currentPeriodData.changeOrders, color: 'bg-emerald-500', icon: ShoppingCart },
          { label: 'Receita no Período', value: adminMetricsOverride.receita_total ? (activeCurrency === 'BRL' ? `R$ ${adminMetricsOverride.receita_total}` : formatCurrency(parseSavedFloat('shopspy_admin_receita_total', 0))) : formatCurrency(currentPeriodData.sales), change: adminMetricsOverride.var_receita_total || currentPeriodData.changeSales, color: 'bg-green-600', icon: DollarSign },
          { label: 'Vendas Pendentes', value: adminMetricsOverride.vendas_pendentes || Math.round(currentPeriodData.orders * 0.08), change: adminMetricsOverride.var_vendas_pendentes || 'Aguardando pagamento', color: 'bg-amber-500', icon: Clock },
          { label: 'Vendas Canceladas', value: adminMetricsOverride.vendas_falhadas || Math.round(currentPeriodData.orders * 0.03), change: adminMetricsOverride.var_vendas_falhadas || 'Não aprovadas', color: 'bg-red-500', icon: AlertCircle },
        ].map((card, i) => (
          <div key={i} className={`${card.color} rounded-[16px] p-6 relative overflow-hidden h-[155px] flex flex-col justify-between shadow-lg shadow-${card.color.split('-')[1]}-500/10`}>
            <div className="absolute right-[-20px] bottom-[-20px] bg-white/10 rounded-full w-[120px] h-[120px] select-none pointer-events-none" />
            <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <card.icon size={24} className="text-white" />
            </div>
            <div>
              <span className="text-[14px] text-white/90 font-medium leading-tight">{card.label}</span>
              <h2 className="text-[28px] font-black text-white mt-1 leading-none truncate pr-8">
                {formatNumberHidden(card.value)}
              </h2>
            </div>
            <span className="text-[12px] text-white/70 relative z-10">
              {card.change} vs. anterior ({currentPeriodData.status})
            </span>
          </div>
        ))}
      </div>

      {/* GRID DE MÉTRICAS */}
      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, i) => (
            <div key={i} className={`glass-obsidian p-5 flex flex-col justify-between min-h-[110px] transition-all hover:border-[#D0011B]/30`}>
              <div className="flex justify-between items-start">
                <span className={`text-[12px] text-white/50 font-black uppercase tracking-widest`}>
                  {metric.label}
                </span>
                {getMetricIcon(metric.icon)}
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className={`text-2xl font-black text-white tracking-tighter`}>
                  {metric.value}
                </span>
                {metric.change && (
                  <span className="text-[11px] text-emerald-400 font-bold ml-1">
                    {metric.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEÇÃO INFERIOR */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-8">
        
        {/* Gráfico de Vendas */}
        <div className={`lg:col-span-6 glass-obsidian p-6 flex flex-col justify-between transition-all`}>
          <div>
            <div className="flex items-center gap-2">
              <BarChart2 className="text-[#D0011B]" size={18} />
              <h3 className={`font-black text-white uppercase tracking-widest text-sm m-0`}>Vendas</h3>
            </div>
            <p className={`text-xs text-white/40 mt-1 m-0`}>Receita no período selecionado</p>
            <h2 className={`text-[32px] font-black text-white mt-4 tracking-tight`}>
              {formatCurrency(currentPeriodData.sales)}
            </h2>
          </div>

          <div className="h-[220px] mt-6 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dynamicChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSalesRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D0011B" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#D0011B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#666' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#666' }} 
                />
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(Number(value)), 'Vendas']}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    backgroundColor: '#09090B',
                    color: '#ffffff'
                  }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#aaa', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#D0011B" 
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSalesRed)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vendas ao Vivo */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className={`glass-obsidian p-6 transition-all relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Radio className="text-[#10b981] animate-pulse" size={18} />
                <h3 className={`font-black text-white uppercase tracking-widest text-sm m-0`}>Vendas ao Vivo</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-[#10b981] bg-[#10b981]/10 px-2.5 py-1 rounded-full uppercase border border-[#10b981]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                AO VIVO
              </span>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[14px] p-4 flex items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 mb-1 block">Total Comissões</span>
                <h4 className="text-2xl font-black text-emerald-400 m-0 leading-none">{formatCurrency(commissionTotal)}</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-1 block">Vendas</span>
                <h4 className="text-2xl font-black text-white m-0 leading-none">{formatNumberHidden(orders)}</h4>
              </div>
            </div>

            <div className="min-h-[140px] max-h-[300px] overflow-y-auto glass-obsidian-scroll flex flex-col gap-3 pr-2">
              {recentSales.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 opacity-30">
                   <ShoppingCart size={32} className="mb-2" />
                   <p className="text-xs font-bold uppercase tracking-widest">Nenhuma venda recente</p>
                </div>
              ) : recentSales.map((sale, index) => (
                <div key={sale.id} className={`flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/5`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-black shrink-0">
                      $
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-white truncate leading-tight">
                        {sale.product.name}
                      </p>
                      <p className="text-[11px] text-white/40 font-medium">
                        {getRelativeLiveTime(index, sale.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[14px] font-black text-emerald-400">
                      {formatCurrency(sale.price * (sale.product.commission_rate / 100))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
