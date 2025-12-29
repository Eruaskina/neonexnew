
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import MarketTable from './components/MarketTable';
import AnalysisPanel from './components/AnalysisPanel';
import { Currency, ViewMode, PortfolioItem, AppState, Language } from './types';
import { INITIAL_CURRENCIES } from './constants';
import { translations } from './translations';
import { fetchLiveMarketData } from './services/marketService';
import { Search, Bell, User, Layers, RefreshCcw, TrendingUp, DollarSign, Wallet, Languages } from 'lucide-react';

const App: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>(INITIAL_CURRENCIES);
  const [view, setView] = useState<ViewMode>(ViewMode.MARKET);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState<Language>('EN');
  const [isSyncing, setIsSyncing] = useState(false);

  const t = translations[lang];

  // Live Data Fetching
  const refreshMarketData = async () => {
    setIsSyncing(true);
    const liveData = await fetchLiveMarketData();
    if (liveData.length > 0) {
      setCurrencies(liveData);
    }
    setIsSyncing(false);
  };

  useEffect(() => {
    refreshMarketData();
    // Poll for updates every 60 seconds (CoinGecko free tier limit consideration)
    const interval = setInterval(refreshMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Local Storage Persistence
  useEffect(() => {
    const savedState = localStorage.getItem('neon_ex_state');
    if (savedState) {
      try {
        const parsed: AppState = JSON.parse(savedState);
        setWatchlist(parsed.watchlist || []);
        setPortfolio(parsed.portfolio || []);
        if (parsed.language) setLang(parsed.language);
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
  }, []);

  useEffect(() => {
    const state: AppState = { watchlist, portfolio, theme: 'cyber', language: lang };
    localStorage.setItem('neon_ex_state', JSON.stringify(state));
  }, [watchlist, portfolio, lang]);

  const handleToggleWatchlist = (id: string) => {
    setWatchlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleAddToPortfolio = (id: string) => {
    setPortfolio(prev => {
      const existing = prev.find(p => p.id === id);
      if (existing) {
        return prev.map(p => p.id === id ? { ...p, amount: p.amount + 1 } : p);
      }
      return [...prev, { id, amount: 1, addedAt: Date.now() }];
    });
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'EN' ? 'TR' : 'EN');
  };

  const filteredCurrencies = useMemo(() => {
    let result = currencies.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (view === ViewMode.WATCHLIST) {
      result = result.filter(c => watchlist.includes(c.id));
    } else if (view === ViewMode.PORTFOLIO) {
      result = result.filter(c => portfolio.some(p => p.id === c.id));
    }

    return result;
  }, [currencies, searchQuery, view, watchlist, portfolio]);

  const portfolioValue = useMemo(() => {
    return portfolio.reduce((acc, item) => {
      const curr = currencies.find(c => c.id === item.id);
      return acc + (curr ? curr.price * item.amount : 0);
    }, 0);
  }, [portfolio, currencies]);

  const viewTitle = useMemo(() => {
    switch(view) {
      case ViewMode.MARKET: return t.marketNode;
      case ViewMode.PORTFOLIO: return t.quantumVault;
      case ViewMode.WATCHLIST: return t.neonTracker;
      case ViewMode.ANALYSIS: return t.aiPredictor;
      default: return t.marketNode;
    }
  }, [view, t]);

  return (
    <div className="flex min-h-screen">
      <Sidebar currentView={view} onViewChange={setView} lang={lang} />
      
      <main className="flex-1 pl-20 md:pl-64 pr-4 md:pr-8 py-8 transition-all">
        {/* Header Stats Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="glass-panel px-4 md:px-6 py-3 rounded-2xl flex items-center space-x-3 border-l-4 border-lime-500">
              <TrendingUp className="text-lime-500 w-5 h-5 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-500 font-orbitron font-bold uppercase">{t.marketCap}</p>
                <p className="text-sm md:text-lg font-black font-mono">$3.42T <span className="text-[10px] text-lime-400 font-normal">+2.4%</span></p>
              </div>
            </div>
            <div className="glass-panel px-4 md:px-6 py-3 rounded-2xl flex items-center space-x-3 border-l-4 border-cyan-500">
              <Wallet className="text-cyan-500 w-5 h-5 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-500 font-orbitron font-bold uppercase">{t.netEquity}</p>
                <p className="text-sm md:text-lg font-black font-mono">${portfolioValue.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-48 lg:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-12 pr-4 focus:border-cyan-500 outline-none font-mono text-[10px] text-slate-300"
              />
            </div>
            
            <button 
              onClick={toggleLanguage}
              className="glass-panel p-2 md:p-3 rounded-xl hover:text-cyan-400 transition-all flex items-center space-x-1 border border-slate-800 hover:border-cyan-500/50"
            >
              <Languages className="w-4 h-4" />
              <span className="font-bold text-[10px]">{lang}</span>
            </button>

            <button className="glass-panel p-2 md:p-3 rounded-xl hover:text-cyan-400 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
            </button>
            <div className="flex items-center space-x-2 bg-slate-900/80 p-1 pr-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0">
                <User className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="hidden lg:block">
                <p className="text-[10px] font-bold font-orbitron uppercase">{t.agent}</p>
                <p className="text-[9px] text-slate-500 uppercase tracking-tighter">{t.levelAccess}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Main List */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="glass-panel rounded-3xl overflow-hidden min-h-[600px]">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/20">
                <h2 className="font-orbitron text-sm md:text-lg font-black tracking-widest flex items-center uppercase">
                  <Layers className="mr-3 text-cyan-500 w-5 h-5" />
                  {viewTitle}
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-[9px] text-slate-500 font-mono">NODE_SYNC: {isSyncing ? 'SYNCING...' : 'OK'}</span>
                  <RefreshCcw className={`w-3 h-3 text-lime-500 ${isSyncing ? 'animate-spin' : ''}`} />
                </div>
              </div>
              <MarketTable 
                currencies={filteredCurrencies}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
                onAddToPortfolio={handleAddToPortfolio}
                onSelectCurrency={setSelectedCurrency}
                lang={lang}
              />
              {filteredCurrencies.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-600">
                  <Layers className="w-16 h-16 mb-4 opacity-20" />
                  <p className="font-orbitron tracking-widest text-xs">{t.noData}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Analysis */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <AnalysisPanel currency={selectedCurrency} lang={lang} />
            
            {/* Quick Stats / Mini Portfolio */}
            <div className="glass-panel p-6 rounded-3xl border-t-4 border-magenta-500">
              <h3 className="font-orbitron text-[10px] font-black mb-6 tracking-widest flex items-center uppercase">
                <DollarSign className="w-4 h-4 mr-2 text-magenta-500" />
                {t.vaultAllocation}
              </h3>
              <div className="space-y-4">
                {portfolio.slice(0, 5).map(p => {
                  const curr = currencies.find(c => c.id === p.id);
                  if (!curr) return null;
                  const value = curr.price * p.amount;
                  return (
                    <div key={p.id} className="flex justify-between items-center group">
                      <div className="flex items-center space-x-2">
                        <div className="w-1 h-8 bg-cyan-500/20 group-hover:bg-cyan-500 transition-all"></div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-300">{curr.symbol}</p>
                          <p className="text-[9px] text-slate-500">{p.amount.toFixed(2)} {t.units}</p>
                        </div>
                      </div>
                      <p className="text-[10px] font-mono font-bold text-cyan-400">
                        ${value.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  );
                })}
                {portfolio.length === 0 && (
                  <p className="text-[10px] text-slate-600 italic text-center py-4">{t.vaultEmpty}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Status Ticker */}
      <footer className="fixed bottom-0 left-0 w-full glass-panel h-8 border-t border-cyan-500/20 z-[60] px-4 flex items-center justify-between text-[10px] font-mono overflow-hidden">
        <div className="flex items-center space-x-6 animate-marquee whitespace-nowrap">
          {currencies.slice(0, 20).map(c => (
            <span key={c.id} className="flex items-center space-x-2">
              <span className="text-slate-400">{c.symbol}</span>
              <span className={c.change24h >= 0 ? 'text-lime-500' : 'text-rose-500'}>
                {c.price.toLocaleString(undefined, { minimumFractionDigits: c.price < 1 ? 4 : 2 })} ({c.change24h >= 0 ? '+' : ''}{c.change24h.toFixed(2)}%)
              </span>
              <span className="text-slate-800 mx-2">|</span>
            </span>
          ))}
        </div>
        <div className="bg-slate-900 h-full px-4 flex items-center border-l border-slate-800 shrink-0">
          <span className="text-cyan-500 mr-2">●</span>
          <span className="text-slate-500 uppercase">{t.latency}: 14MS</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
