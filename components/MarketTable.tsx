
import React from 'react';
import { Currency, Language } from '../types';
import { Star, ShoppingBasket, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { translations } from '../translations';

interface MarketTableProps {
  currencies: Currency[];
  watchlist: string[];
  onToggleWatchlist: (id: string) => void;
  onAddToPortfolio: (id: string) => void;
  onSelectCurrency: (currency: Currency) => void;
  lang: Language;
}

const MarketTable: React.FC<MarketTableProps> = ({ 
  currencies, 
  watchlist, 
  onToggleWatchlist, 
  onAddToPortfolio,
  onSelectCurrency,
  lang
}) => {
  const t = translations[lang];

  return (
    <div className="w-full overflow-hidden">
      <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-cyan-500/20 text-[10px] font-bold text-slate-400 tracking-widest uppercase font-orbitron">
        <div className="col-span-1">{t.fav}</div>
        <div className="col-span-3">{t.asset}</div>
        <div className="col-span-2 text-right">{t.price}</div>
        <div className="col-span-2 text-right">{t.change24h}</div>
        <div className="col-span-2 hidden md:block">{t.trend}</div>
        <div className="col-span-2 text-right">{t.actions}</div>
      </div>

      <div className="divide-y divide-slate-800">
        {currencies.map((curr) => {
          const isFaved = watchlist.includes(curr.id);
          const isUp = curr.change24h >= 0;

          return (
            <div 
              key={curr.id} 
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-cyan-500/5 transition-colors group cursor-pointer"
              onClick={() => onSelectCurrency(curr)}
            >
              <div className="col-span-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleWatchlist(curr.id); }}
                  className={`transition-colors ${isFaved ? 'text-yellow-400' : 'text-slate-600 hover:text-yellow-200'}`}
                >
                  <Star className={`w-5 h-5 ${isFaved ? 'fill-yellow-400' : ''}`} />
                </button>
              </div>

              <div className="col-span-3 flex items-center space-x-3">
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-cyan-400 border border-slate-700">
                  {curr.symbol.substring(0, 2)}
                </div>
                <div>
                  <div className="font-bold text-slate-200 group-hover:text-cyan-300">{curr.name}</div>
                  <div className="text-[10px] text-slate-500">{curr.symbol}</div>
                </div>
              </div>

              <div className="col-span-2 text-right font-mono text-cyan-400">
                ${curr.price.toLocaleString(undefined, { minimumFractionDigits: curr.type === 'crypto' ? 2 : 4 })}
              </div>

              <div className={`col-span-2 text-right font-bold flex items-center justify-end space-x-1 ${isUp ? 'text-lime-400' : 'text-rose-400'}`}>
                {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{Math.abs(curr.change24h).toFixed(2)}%</span>
              </div>

              <div className="col-span-2 hidden md:block h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={curr.history}>
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke={isUp ? '#84cc16' : '#f43f5e'} 
                      strokeWidth={2} 
                      dot={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="col-span-2 text-right flex justify-end space-x-2">
                 <button 
                  onClick={(e) => { e.stopPropagation(); onAddToPortfolio(curr.id); }}
                  className="p-2 bg-cyan-600/20 hover:bg-cyan-500 text-cyan-400 hover:text-white rounded border border-cyan-500/30 transition-all flex items-center"
                >
                  <ShoppingBasket className="w-4 h-4 mr-1" />
                  <span className="text-[10px] font-bold uppercase">{t.vault}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketTable;
