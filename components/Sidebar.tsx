
import React from 'react';
import { SectionType } from '../types';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: SectionType.FIT, label: 'Strategic Fit', icon: 'fa-leaf' },
    { id: SectionType.VELOCITY, label: 'Enviro Velocity', icon: 'fa-gauge-high' },
    { id: SectionType.SCOPES, label: 'GHG Ledger', icon: 'fa-diagram-project' },
    { id: SectionType.ESG_COMPLIANCE, label: 'Compliance ID', icon: 'fa-gavel' },
    { id: SectionType.TECHNICAL, label: 'System Architecture', icon: 'fa-microchip' },
    { id: SectionType.PCF, label: 'Product LCA', icon: 'fa-box-open' },
    { id: SectionType.REDUCE, label: 'Intervention Plan', icon: 'fa-wand-magic-sparkles' },
    { id: SectionType.COMPETITIVE, label: 'Market Moat', icon: 'fa-trophy' },
    { id: SectionType.MONETIZATION, label: 'Revenue Vector', icon: 'fa-sack-dollar' },
    { id: SectionType.INDONESIA, label: 'National Thesis', icon: 'fa-flag' },
    { id: SectionType.SCALABILITY, label: 'Exit Roadmap', icon: 'fa-rocket' },
  ];

  return (
    <aside className="w-80 bg-[#020617] flex flex-col h-full border-r border-emerald-500/5 hidden md:flex relative overflow-hidden">
      {/* Abstract Background Motif */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-500">
           <circle cx="100" cy="200" r="120" fill="currentColor"/>
        </svg>
      </div>

      <div className="p-10 relative z-10">
        <div className="flex items-center gap-5 mb-14">
          <div className="w-14 h-14 bg-emerald-600 rounded-[22px] flex items-center justify-center text-white shadow-[0_0_30px_rgba(5,150,105,0.3)] relative group cursor-pointer">
            <div className="absolute inset-0 bg-white/20 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <i className="fas fa-fingerprint text-3xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter leading-none">ECOTRACK</h1>
            <span className="text-[10px] font-black text-emerald-500 tracking-[0.4em] uppercase">Pro Synthesis</span>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[20px] text-[11px] font-black uppercase tracking-widest transition-all group ${
                activeSection === item.id
                  ? 'bg-emerald-600/10 text-white border border-emerald-500/20 shadow-xl'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03] border border-transparent'
              }`}
            >
              <i className={`fas ${item.icon} w-6 text-center text-lg transition-all group-hover:scale-110 ${
                activeSection === item.id ? 'text-emerald-400' : 'text-slate-600'
              }`}></i>
              {item.label}
              {activeSection === item.id && (
                <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.8)]"></div>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-10 relative z-10">
        <div className="glass-card p-6 rounded-[28px] border-emerald-500/10 bg-gradient-to-br from-emerald-500/[0.05] to-transparent">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Asset Intelligence</span>
          </div>
          <p className="text-[12px] text-slate-400 leading-relaxed font-medium">
            Strategic valuation delta: <span className="text-white font-bold">+€2.4M</span> vs previous quarter based on carbon credit yield models.
          </p>
        </div>
      </div>
    </aside>
  );
};
