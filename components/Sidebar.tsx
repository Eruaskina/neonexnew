
import React from 'react';
import { ViewMode, Language } from '../types';
import { LayoutDashboard, Wallet, Star, Zap, Cpu, Settings } from 'lucide-react';
import { translations } from '../translations';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  lang: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, lang }) => {
  const t = translations[lang];

  const navItems = [
    { id: ViewMode.MARKET, icon: LayoutDashboard, label: t.marketNode },
    { id: ViewMode.PORTFOLIO, icon: Wallet, label: t.quantumVault },
    { id: ViewMode.WATCHLIST, icon: Star, label: t.neonTracker },
    { id: ViewMode.ANALYSIS, icon: Zap, label: t.aiPredictor },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 glass-panel border-r border-cyan-500/30 flex flex-col items-center py-8 z-50">
      <div className="mb-12 flex flex-col items-center">
        <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center neon-border mb-2 animate-pulse">
          <Cpu className="text-white w-8 h-8" />
        </div>
        <h1 className="hidden md:block font-orbitron text-xl font-black text-cyan-400 neon-text-cyan tracking-tighter">
          NEON-EX
        </h1>
      </div>

      <nav className="flex-1 w-full space-y-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center justify-center md:justify-start space-x-4 p-4 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-cyan-500/20 border-l-4 border-cyan-500 text-cyan-400' 
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : 'group-hover:text-cyan-300'}`} />
              <span className="hidden md:block font-orbitron text-[10px] font-bold tracking-widest">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-slate-800 w-full px-4 text-center">
        <button className="p-2 text-slate-500 hover:text-cyan-400 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <p className="mt-4 text-[10px] text-slate-600 hidden md:block">SYSTEM V.2.14.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
