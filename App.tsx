
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AnalysisCard } from './components/AnalysisCard';
import { ChatBot } from './components/ChatBot';
import { Roadmap } from './components/Roadmap';
import { ReductionTool } from './components/ReductionTool';
import { ProductFootprintTool } from './components/ProductFootprintTool';
import { GHGAdvancedTracker } from './components/GHGAdvancedTracker';
import { ESGComplianceManager } from './components/ESGComplianceManager';
import { EnvironmentalVelocity } from './components/EnvironmentalVelocity';
import { SectionType, AnalysisSection } from './types';
import { INITIAL_ANALYSIS_DATA } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(SectionType.FIT);
  const [analysisData] = useState<AnalysisSection[]>(INITIAL_ANALYSIS_DATA);

  const currentSection = analysisData.find(s => s.id === activeSection) || analysisData[0];

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-200">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      <main className="flex-1 overflow-y-auto relative custom-scroll">
        {/* Top Forest Bar */}
        <div className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-xl px-10 py-5 flex items-center justify-between border-b border-emerald-500/10">
          <div className="flex items-center gap-5">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-emerald-500 tracking-[0.4em] uppercase mb-0.5">Forest Intelligence</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">Observer: Strategic Node ID-01</h2>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Global Renewal Index</span>
              <span className="text-sm font-black text-emerald-400 font-mono">84.22</span>
            </div>
            <div className="h-8 w-[1px] bg-emerald-500/10"></div>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              Syndicate Portal
            </button>
          </div>
        </div>

        <div className="p-10 lg:p-16 max-w-[1600px] mx-auto">
          {/* Section Header - The Obsidian Forest Style */}
          <header className="mb-16 relative">
            <div className="absolute -left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 to-transparent"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Operational Insight</span>
              </div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Verification: Active</span>
            </div>
            <h1 className="text-7xl font-black text-white tracking-tighter mb-6 leading-none">
              {currentSection.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? 'text-emerald-500' : ''}>{word} </span>
              ))}
            </h1>
            <p className="text-2xl text-slate-400 max-w-3xl leading-relaxed font-light">
              Quantifying industrial impact through the lens of deep sustainability intelligence. 
              <span className="text-emerald-400 font-semibold italic ml-2">EcoTrack Synthesis Active.</span>
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Primary Strategic Stream */}
            <div className="lg:col-span-8 space-y-12">
              <AnalysisCard section={currentSection} />
              
              <div className="space-y-12 pb-24">
                {activeSection === SectionType.VELOCITY && <EnvironmentalVelocity />}
                {activeSection === SectionType.SCOPES && <GHGAdvancedTracker />}
                {activeSection === SectionType.ESG_COMPLIANCE && <ESGComplianceManager />}
                {activeSection === SectionType.PCF && <ProductFootprintTool />}
                {activeSection === SectionType.REDUCE && <ReductionTool />}
                
                {activeSection === SectionType.SCALABILITY && (
                  <div className="glass-card p-10 rounded-[40px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    <div className="flex items-center justify-between mb-10 relative z-10">
                      <div>
                        <h3 className="text-3xl font-black text-white tracking-tighter mb-2">Expansion Dynamics</h3>
                        <p className="text-slate-500 text-sm font-medium">Modeling the SaaS ecosystem velocity within Indonesian corridors.</p>
                      </div>
                      <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5">
                        <button className="px-6 py-2 bg-emerald-600 rounded-xl text-[10px] font-black text-white tracking-widest shadow-lg">MARKET SHARE</button>
                        <button className="px-6 py-2 rounded-xl text-[10px] font-black text-slate-500 tracking-widest">UNIT ECONOMICS</button>
                      </div>
                    </div>
                    <Roadmap />
                  </div>
                )}
              </div>
            </div>

            {/* Tactical Intelligence Sidecar */}
            <div className="lg:col-span-4 space-y-8 sticky top-32">
              {/* Human Action Card */}
              <div className="glass-card p-8 rounded-[32px] border-t-2 border-t-emerald-500 relative overflow-hidden group">
                 <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500">
                      <path d="M50 10c-20 0-35 15-35 35 0 20 35 45 35 45s35-25 35-45c0-20-15-35-35-35z" fill="currentColor"/>
                    </svg>
                 </div>
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                        <i className="fas fa-leaf-heart text-xl"></i>
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-widest">Sustainability Advisor</h4>
                        <span className="text-[10px] font-bold text-emerald-500/60 tracking-widest">VERIFIED AI NODE</span>
                      </div>
                    </div>
                    <ChatBot />
                 </div>
              </div>

              {/* Biomimicry Health Index */}
              <div className="glass-card p-8 rounded-[32px] bg-gradient-to-br from-white/[0.02] to-transparent">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Environmental Integrity</h4>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-slate-400">Inventory Fidelity</span>
                      <span className="text-technical text-sm font-black text-emerald-400 tracking-tighter">98.2%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" style={{ width: '98.2%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-slate-400">Carbon Asset Accuracy</span>
                      <span className="text-technical text-sm font-black text-indigo-400 tracking-tighter">94.5%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" style={{ width: '94.5%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5">
                   <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                      Current data aggregation exceeds ISO 14064 uncertainty thresholds by <span className="text-white font-bold">2.4%</span>. Audit readiness optimal.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Fix: Added default export for App component
export default App;
