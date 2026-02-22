
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
import { CarbonCalculator } from './components/CarbonCalculator';
import { LandingPage } from './components/LandingPage';
import { SectionType, AnalysisSection, UserPersona, Language } from './types';
import { INITIAL_ANALYSIS_DATA } from './constants';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(SectionType.FIT);
  const [analysisData] = useState<AnalysisSection[]>(INITIAL_ANALYSIS_DATA);
  const [persona, setPersona] = useState<UserPersona>(UserPersona.NONE);
  const [language, setLanguage] = useState<Language>(Language.EN);

  const t = {
    en: {
      forestIntel: "Forest Intelligence",
      observer: "Observer",
      corporate: "Corporate",
      regulatory: "Regulatory",
      globalIndex: "Global Renewal Index",
      switchDomain: "Switch Domain",
      opInsight: "Operational Insight",
      verification: "Verification: Active",
      synthesis: "CarbonINA Synthesis Active.",
      developedBy: "Developed by",
      footerNote: "CarbonINA Strategic Node",
      tagline: "Quantifying industrial impact through the lens of deep sustainability intelligence."
    },
    id: {
      forestIntel: "Intelijen Hutan",
      observer: "Pengamat",
      corporate: "Perusahaan",
      regulatory: "Regulator",
      globalIndex: "Indeks Pembaruan Global",
      switchDomain: "Ganti Domain",
      opInsight: "Wawasan Operasional",
      verification: "Verifikasi: Aktif",
      synthesis: "Sintesis CarbonINA Aktif.",
      developedBy: "Dikembangkan oleh",
      footerNote: "Node Strategis CarbonINA",
      tagline: "Mengukur dampak industri melalui lensa intelijen keberlanjutan yang mendalam."
    }
  }[language];

  const currentSection = analysisData.find(s => s.id === activeSection) || analysisData[0];

  const handlePersonaSelect = (p: UserPersona) => {
    setPersona(p);
    if (p === UserPersona.COMPANY) {
      setActiveSection(SectionType.ACCOUNTING);
    } else if (p === UserPersona.GOVERNMENT) {
      setActiveSection(SectionType.REGISTRY);
    }
  };

  if (persona === UserPersona.NONE) {
    return (
      <AnimatePresence mode="wait">
        <LandingPage onSelectPersona={handlePersonaSelect} language={language} setLanguage={setLanguage} />
      </AnimatePresence>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-screen overflow-hidden bg-[#020617] text-slate-200"
    >
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        persona={persona}
        language={language}
      />

      <main className="flex-1 overflow-y-auto relative custom-scroll">
        {/* Top Forest Bar */}
        <div className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-xl px-10 py-5 flex items-center justify-between border-b border-emerald-500/10">
          <div className="flex items-center gap-5">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-emerald-500 tracking-[0.4em] uppercase mb-0.5">{t.forestIntel}</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">{t.observer}: {persona === UserPersona.COMPANY ? t.corporate : t.regulatory} Node ID-01</h2>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex bg-black/40 p-1 rounded-full border border-white/5">
              <button 
                onClick={() => setLanguage(Language.EN)}
                className={`px-3 py-1 rounded-full text-[9px] font-black transition-all ${language === Language.EN ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage(Language.ID)}
                className={`px-3 py-1 rounded-full text-[9px] font-black transition-all ${language === Language.ID ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                ID
              </button>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{t.globalIndex}</span>
              <span className="text-sm font-black text-emerald-400 font-mono">84.22</span>
            </div>
            <div className="h-8 w-[1px] bg-emerald-500/10"></div>
            <button 
              onClick={() => setPersona(UserPersona.NONE)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              {t.switchDomain}
            </button>
          </div>
        </div>

        <div className="p-10 lg:p-16 max-w-[1600px] mx-auto">
          {/* Section Header - The Obsidian Forest Style */}
          <header className="mb-16 relative">
            <div className="absolute -left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 to-transparent"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">{t.opInsight}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{t.verification}</span>
            </div>
            <h1 className="text-7xl font-black text-white tracking-tighter mb-6 leading-none">
              {currentSection.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? 'text-emerald-500' : ''}>{word} </span>
              ))}
            </h1>
            <p className="text-2xl text-slate-400 max-w-3xl leading-relaxed font-light">
              {t.tagline} 
              <span className="text-emerald-400 font-semibold italic ml-2">{t.synthesis}</span>
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Primary Strategic Stream */}
            <div className="lg:col-span-8 space-y-12">
              <AnalysisCard section={currentSection} language={language} />
              
              <div className="space-y-12 pb-24">
                {/* Company Persona Components */}
                {activeSection === SectionType.ACCOUNTING && (
                  <div className="space-y-12">
                    <GHGAdvancedTracker language={language} />
                    <ProductFootprintTool language={language} />
                  </div>
                )}
                {activeSection === SectionType.COMPLIANCE && <ESGComplianceManager />}
                {activeSection === SectionType.REDUCTION && <ReductionTool language={language} />}
                {activeSection === SectionType.WALLET && (
                  <div className="glass-card p-10 rounded-[40px] border-emerald-500/10">
                    <h3 className="text-3xl font-black text-white tracking-tighter mb-6">Asset Ledger</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Available Credits</span>
                        <div className="text-4xl font-black text-white mt-2">12,450 <span className="text-sm text-slate-500">tCO2e</span></div>
                      </div>
                      <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Market Value</span>
                        <div className="text-4xl font-black text-white mt-2">€186,750</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Legacy/Government Persona Components */}
                {activeSection === SectionType.REGISTRY && (
                  <div className="glass-card p-10 rounded-[40px] border-indigo-500/10">
                    <h3 className="text-3xl font-black text-white tracking-tighter mb-6">National Emission Heatmap</h3>
                    <div className="h-80 bg-black/40 rounded-3xl border border-white/5 flex items-center justify-center">
                      <div className="text-center">
                        <i className="fas fa-map-marked-alt text-5xl text-indigo-500/20 mb-4"></i>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Geographical Intensity Matrix Active</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeSection === SectionType.REGULATOR_TOOLS && (
                  <div className="space-y-8">
                    <div className="glass-card p-10 rounded-[40px] border-indigo-500/10">
                      <h3 className="text-3xl font-black text-white tracking-tighter mb-6">Verifier Approval Portal</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="bg-black/40 p-6 rounded-3xl border border-white/5">
                            <div className="flex justify-between items-start mb-4">
                              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                                <i className="fas fa-user-check"></i>
                              </div>
                              <span className="text-[8px] font-black bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">ACTIVE</span>
                            </div>
                            <p className="text-sm font-black text-white">Verifier Node 0{i}</p>
                            <p className="text-[10px] text-slate-500 mt-1">ISO 14065 Certified</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="glass-card p-10 rounded-[40px] border-rose-500/10 bg-rose-500/[0.02]">
                      <h3 className="text-3xl font-black text-white tracking-tighter mb-6">Fraud Detection MRV</h3>
                      <div className="flex items-center gap-6 p-6 bg-rose-500/10 rounded-3xl border border-rose-500/20">
                        <i className="fas fa-exclamation-triangle text-3xl text-rose-500 animate-pulse"></i>
                        <div>
                          <p className="text-white font-black">Anomaly Detected: Entity-882</p>
                          <p className="text-xs text-rose-400/70">Scope 2 reporting mismatch vs regional grid data.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeSection === SectionType.POLICY_SIM && (
                  <div className="glass-card p-10 rounded-[40px] border-indigo-500/10">
                    <h3 className="text-3xl font-black text-white tracking-tighter mb-6">AI Policy Simulator</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Carbon Tax Rate (IDR)</label>
                          <input type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                          <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                            <span>30k</span>
                            <span>150k</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">EV Subsidy Level</label>
                          <input type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                          <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                            <span>Min</span>
                            <span>Max</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-black/40 p-8 rounded-3xl border border-white/5 flex flex-col justify-center">
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-4">Projected NDC Impact</p>
                        <div className="text-5xl font-black text-white tracking-tighter">-12.4% <span className="text-sm text-emerald-500">Emissions</span></div>
                        <p className="text-xs text-slate-500 mt-4 italic">Simulation based on current industrial velocity models.</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeSection === SectionType.PRICE_PREDICTION && (
                  <div className="glass-card p-10 rounded-[40px] border-indigo-500/10">
                    <h3 className="text-3xl font-black text-white tracking-tighter mb-6">AI Market Intelligence</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-black/40 p-8 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Regional Price</p>
                        <div className="text-3xl font-black text-white">IDR 42,500</div>
                        <p className="text-[10px] text-emerald-500 mt-2">+4.2% Forecast</p>
                      </div>
                      <div className="bg-black/40 p-8 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Offset Demand</p>
                        <div className="text-3xl font-black text-white">High</div>
                        <p className="text-[10px] text-slate-500 mt-2">Corporate Sourcing Active</p>
                      </div>
                      <div className="bg-black/40 p-8 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">Market Balance</p>
                        <div className="text-3xl font-black text-white">Deficit</div>
                        <p className="text-[10px] text-rose-400 mt-2">Supply Shortage Projected</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeSection === SectionType.VELOCITY && <EnvironmentalVelocity />}
                {activeSection === SectionType.CALCULATOR && <CarbonCalculator language={language} />}
                {activeSection === SectionType.SCOPES && <GHGAdvancedTracker language={language} />}
                {activeSection === SectionType.ESG_COMPLIANCE && <ESGComplianceManager />}
                {activeSection === SectionType.PCF && <ProductFootprintTool language={language} />}
                {activeSection === SectionType.REDUCE && <ReductionTool language={language} />}
                
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
          
          {/* Global Footer */}
          <footer className="mt-20 pb-10 flex flex-col items-center gap-2 opacity-40">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-slate-500 to-transparent mb-4"></div>
            <p className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase">
              {t.footerNote} v1.0.4
            </p>
            <p className="text-[11px] font-black text-emerald-500 tracking-[0.2em] uppercase">
              {t.developedBy} PT. Nusantara Carbon Solution
            </p>
          </footer>
        </div>
      </main>

      {/* Global Fixed Attribution Footer */}
      <div className="fixed bottom-4 right-8 z-50 pointer-events-none">
        <p className="text-[9px] font-black text-emerald-500/30 tracking-[0.2em] uppercase">
          © 2026 PT. Nusantara Carbon Solution
        </p>
      </div>
    </motion.div>
  );
};

// Fix: Added default export for App component
export default App;
