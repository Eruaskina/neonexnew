
import React, { useState, useEffect } from 'react';
import { Currency, Language } from '../types';
import { getQuantumAnalysis } from '../services/geminiService';
import { BrainCircuit, Activity, ShieldAlert, Cpu, TrendingUp } from 'lucide-react';
import { translations } from '../translations';

interface AnalysisPanelProps {
  currency: Currency | null;
  lang: Language;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ currency, lang }) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    if (currency) {
      handleAnalysis();
    }
  }, [currency?.id, lang]); // Re-run if language changes while an asset is selected

  const handleAnalysis = async () => {
    if (!currency) return;
    setLoading(true);
    const result = await getQuantumAnalysis(currency, lang);
    setAnalysis(result);
    setLoading(false);
  };

  if (!currency) {
    return (
      <div className="h-full flex flex-col items-center justify-center glass-panel p-12 text-center rounded-3xl min-h-[400px]">
        <BrainCircuit className="w-16 h-16 text-slate-700 mb-6" />
        <h3 className="font-orbitron text-xl text-slate-500 uppercase tracking-widest">{t.initiateLink}</h3>
        <p className="text-slate-600 mt-2 max-w-xs">{t.selectAssetDesc}</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-8 rounded-3xl relative overflow-hidden min-h-[400px]">
      <div className="absolute top-0 right-0 p-4">
        <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/40 rounded-full text-[10px] text-cyan-400 font-bold animate-pulse">
          {t.liveStream}
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-cyan-950 rounded-2xl flex items-center justify-center border border-cyan-500/50">
          <BrainCircuit className="w-10 h-10 text-cyan-400" />
        </div>
        <div>
          <h2 className="font-orbitron text-xl font-black text-white">{currency.name} {t.analysis}</h2>
          <p className="text-slate-400 text-[10px] tracking-widest uppercase">{t.predictorEngine}</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="h-4 bg-slate-800 rounded animate-pulse w-3/4"></div>
          <div className="h-24 bg-slate-800 rounded animate-pulse"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-slate-800 rounded animate-pulse"></div>
            <div className="h-20 bg-slate-800 rounded animate-pulse"></div>
          </div>
        </div>
      ) : analysis ? (
        <div className="space-y-8">
          <div>
            <div className="flex items-center text-cyan-400 mb-2 font-orbitron text-[10px] tracking-widest font-bold uppercase">
              <Activity className="w-4 h-4 mr-2" />
              {t.sentiment}
            </div>
            <p className="text-2xl font-black text-white neon-text-cyan">{analysis.sentiment}</p>
          </div>

          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
            <div className="flex items-center text-slate-400 mb-2 font-orbitron text-[10px] tracking-widest font-bold uppercase">
              <Cpu className="w-3 h-3 mr-2" />
              {t.temporalPrediction}
            </div>
            <p className="text-slate-200 italic leading-relaxed text-sm">"{analysis.prediction}"</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
              <div className="flex items-center text-rose-400 mb-1 font-orbitron text-[10px] tracking-widest font-bold uppercase">
                <ShieldAlert className="w-3 h-3 mr-2" />
                {t.riskLevel}
              </div>
              <p className="text-xl font-black text-rose-500">{analysis.riskLevel}/10</p>
            </div>
             <div className="p-4 bg-lime-500/5 border border-lime-500/20 rounded-xl">
              <div className="flex items-center text-lime-400 mb-1 font-orbitron text-[10px] tracking-widest font-bold uppercase">
                <TrendingUp className="w-3 h-3 mr-2" />
                {t.marketPhase}
              </div>
              <p className="text-xl font-black text-lime-400">ACCUMULATION</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-orbitron text-[10px] text-slate-500 mb-2 tracking-widest uppercase">{t.technobabble}</h4>
            <p className="text-[10px] text-slate-500 font-mono">{analysis.technobabble}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
           <button 
            onClick={handleAnalysis}
            className="px-8 py-3 bg-cyan-500 text-white rounded-xl font-bold font-orbitron hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] text-xs uppercase tracking-widest"
          >
            {t.runAnalysis}
          </button>
        </div>
      )}
    </div>
  );
};

export default AnalysisPanel;
