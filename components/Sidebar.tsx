
import React from 'react';
import { SectionType } from '../types';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: SectionType.FIT, label: 'Product & Climate Fit', icon: 'fa-leaf' },
    { id: SectionType.SCOPES, label: 'Advanced GHG Scopes', icon: 'fa-diagram-project' },
    { id: SectionType.TECHNICAL, label: 'Technical Review', icon: 'fa-microchip' },
    { id: SectionType.PCF, label: 'Product Footprint', icon: 'fa-box-open' },
    { id: SectionType.REDUCE, label: 'Reduction Optimizer', icon: 'fa-wand-magic-sparkles' },
    { id: SectionType.COMPETITIVE, label: 'Competitive Edge', icon: 'fa-trophy' },
    { id: SectionType.MONETIZATION, label: 'Monetization', icon: 'fa-sack-dollar' },
    { id: SectionType.INDONESIA, label: 'Indonesia Strategy', icon: 'fa-flag' },
    { id: SectionType.SCALABILITY, label: 'Scalability Plan', icon: 'fa-rocket' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800 hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
          <i className="fas fa-chart-pie text-xl"></i>
        </div>
        <span className="text-xl font-bold text-white tracking-tight">EcoTrack <span className="text-emerald-400">Pro</span></span>
      </div>
      
      <nav className="flex-1 px-4 mt-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeSection === item.id
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                : 'hover:bg-slate-800 hover:text-white border border-transparent'
            }`}
          >
            <i className={`fas ${item.icon} w-5 text-center`}></i>
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-6 mt-auto">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <p className="text-xs text-slate-500 mb-2 uppercase font-semibold tracking-wider">Investor Mode</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-white font-medium">Project Live Audit</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
