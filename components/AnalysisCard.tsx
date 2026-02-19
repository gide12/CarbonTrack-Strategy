import React from 'react';
import { AnalysisSection } from '../types';

interface AnalysisCardProps {
  section: AnalysisSection;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ section }) => {
  return (
    <div className="glass-card rounded-[48px] overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
      
      <div className="p-10 md:p-14 border-b border-emerald-500/10 flex items-start justify-between bg-gradient-to-br from-white/[0.03] to-transparent relative z-10">
        <div className="flex items-center gap-10">
          <div className="w-24 h-24 bg-black/40 rounded-[32px] flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-2xl relative">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-[32px] animate-pulse"></div>
            <i className={`fas ${section.icon} text-4xl`}></i>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Intelligence Node</span>
              <div className="h-[1px] w-12 bg-emerald-500/30"></div>
            </div>
            <h2 className="text-5xl font-black text-white tracking-tighter mb-2">{section.title}</h2>
            <p className="text-xl text-slate-400 font-medium max-w-xl leading-snug">{section.summary}</p>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em]">Index Classification</span>
          <p className="text-technical text-lg font-black text-emerald-500 mt-2 opacity-80">STG-VERIFIED-NODE</p>
        </div>
      </div>
      
      <div className="p-10 md:p-14 space-y-16 relative z-10">
        {/* Metric Ecosystem */}
        {section.metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {section.metrics.map((m, idx) => (
              <div key={idx} className="bg-black/30 p-8 rounded-[32px] border border-white/5 hover:border-emerald-500/30 transition-all group">
                <p className="text-[11px] text-slate-600 uppercase font-black tracking-widest mb-3 group-hover:text-slate-400 transition-colors">{m.label}</p>
                <div className="flex items-baseline gap-2">
                   <p className={`text-3xl font-black text-technical tracking-tighter ${m.color.replace('text-', 'text-')}`}>{m.value}</p>
                   {idx === 0 && <span className="text-[10px] font-bold text-emerald-500 animate-pulse">LIVE</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Detailed Observations */}
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-[2px] bg-emerald-500"></div>
              <h3 className="text-xs font-black text-white uppercase tracking-[0.4em]">Strategic Synthesis Matrix</h3>
            </div>
            <ul className="space-y-8">
              {section.details.map((detail, idx) => (
                <li key={idx} className="flex gap-8 group">
                  <div className="mt-2.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)] flex-shrink-0 transition-all group-hover:scale-150"></div>
                  <p className="text-slate-400 text-lg leading-relaxed font-light group-hover:text-slate-200 transition-colors italic">{detail}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Expert Tactical Hub */}
          <div className="space-y-10">
            <div className="glass-card p-10 rounded-[40px] border-emerald-500/20 bg-emerald-500/[0.02] relative overflow-hidden group border-2">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[60px] -mr-24 -mt-24 group-hover:bg-emerald-500/10 transition-colors"></div>
              <div className="flex gap-8 items-start relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-xl">
                  <i className="fas fa-shield-virus text-2xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-4">TACTICAL DIRECTIVE</h4>
                  <p className="text-lg text-slate-400 leading-relaxed font-medium italic">
                    {section.id === 'fit' ? 'Prioritize Indonesian conglomerate alignment to secure 2026 OJK-51 compliance premiums before market saturation.' : 
                     section.id === 'technical' ? 'Integrate blockchain-level immutability for Scope 1 data to command an audit-readiness premium in European carbon markets.' :
                     'Convert reporting outputs into direct bursa carbon listings via IDX synergy to maximize Nilai Ekonomi Karbon (NEK).'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <button className="flex items-center justify-center gap-3 py-5 glass-card rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] text-white hover:bg-white/[0.08] transition shadow-xl group">
                <i className="fas fa-file-contract text-lg text-emerald-500 group-hover:scale-110 transition-transform"></i> Archive Node
              </button>
              <button className="flex items-center justify-center gap-3 py-5 bg-emerald-600 rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] text-white hover:bg-emerald-500 transition shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)]">
                <i className="fas fa-satellite-dish text-lg"></i> Deploy Intel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};