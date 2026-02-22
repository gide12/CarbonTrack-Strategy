
import React from 'react';
import { SectionType, UserPersona, Language } from '../types';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
  persona: UserPersona;
  language: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, persona, language }) => {
  const t = {
    en: {
      accounting: "Accounting Engine",
      calculator: "GHG Calculator",
      compliance: "Compliance Manager",
      reduction: "Reduction Planner",
      wallet: "Asset Wallet",
      registry: "National Registry",
      regTools: "Regulator Tools",
      policySim: "Policy Simulation",
      pricePred: "Price Prediction",
      stratFit: "Strategic Fit",
      envVelocity: "Enviro Velocity",
      ghgLedger: "GHG Ledger",
      complianceId: "Compliance ID",
      sysArch: "System Architecture",
      productLca: "Product LCA",
      intervention: "Intervention Plan",
      marketMoat: "Market Moat",
      revenueVector: "Revenue Vector",
      natThesis: "National Thesis",
      exitRoadmap: "Exit Roadmap",
      assetIntel: "Asset Intelligence",
      regStatus: "Registry Status",
      developedBy: "Developed by",
      compVal: <>Strategic valuation delta: <span className="text-white font-bold">+€2.4M</span> vs previous quarter based on carbon credit yield models.</>,
      govVal: <>Regional compliance rate: <span className="text-white font-bold">82.4%</span>. Verified emissions data synced with SRN PPI database.</>
    },
    id: {
      accounting: "Mesin Akuntansi",
      calculator: "Kalkulator GRK",
      compliance: "Manajer Kepatuhan",
      reduction: "Perencana Pengurangan",
      wallet: "Dompet Aset",
      registry: "Registri Nasional",
      regTools: "Alat Regulator",
      policySim: "Simulasi Kebijakan",
      pricePred: "Prediksi Harga",
      stratFit: "Kesesuaian Strategis",
      envVelocity: "Kecepatan Lingkungan",
      ghgLedger: "Buku Besar GRK",
      complianceId: "ID Kepatuhan",
      sysArch: "Arsitektur Sistem",
      productLca: "LCA Produk",
      intervention: "Rencana Intervensi",
      marketMoat: "Parit Pasar",
      revenueVector: "Vektor Pendapatan",
      natThesis: "Tesis Nasional",
      exitRoadmap: "Peta Jalan Keluar",
      assetIntel: "Intelijen Aset",
      regStatus: "Status Registri",
      developedBy: "Dikembangkan oleh",
      compVal: <>Delta valuasi strategis: <span className="text-white font-bold">+€2.4M</span> vs kuartal sebelumnya berdasarkan model hasil kredit karbon.</>,
      govVal: <>Tingkat kepatuhan regional: <span className="text-white font-bold">82.4%</span>. Data emisi terverifikasi disinkronkan dengan database SRN PPI.</>
    }
  }[language];

  const companyItems = [
    { id: SectionType.ACCOUNTING, label: t.accounting, icon: 'fa-calculator' },
    { id: SectionType.CALCULATOR, label: t.calculator, icon: 'fa-calculator' },
    { id: SectionType.COMPLIANCE, label: t.compliance, icon: 'fa-file-shield' },
    { id: SectionType.REDUCTION, label: t.reduction, icon: 'fa-brain' },
    { id: SectionType.WALLET, label: t.wallet, icon: 'fa-wallet' },
  ];

  const governmentItems = [
    { id: SectionType.REGISTRY, label: t.registry, icon: 'fa-database' },
    { id: SectionType.REGULATOR_TOOLS, label: t.regTools, icon: 'fa-gavel' },
    { id: SectionType.POLICY_SIM, label: t.policySim, icon: 'fa-vial-circle-check' },
    { id: SectionType.PRICE_PREDICTION, label: t.pricePred, icon: 'fa-chart-line' },
    { id: SectionType.FIT, label: t.stratFit, icon: 'fa-leaf' },
    { id: SectionType.VELOCITY, label: t.envVelocity, icon: 'fa-gauge-high' },
    { id: SectionType.SCOPES, label: t.ghgLedger, icon: 'fa-diagram-project' },
    { id: SectionType.ESG_COMPLIANCE, label: t.complianceId, icon: 'fa-gavel' },
    { id: SectionType.TECHNICAL, label: t.sysArch, icon: 'fa-microchip' },
    { id: SectionType.PCF, label: t.productLca, icon: 'fa-box-open' },
    { id: SectionType.REDUCE, label: t.intervention, icon: 'fa-wand-magic-sparkles' },
    { id: SectionType.COMPETITIVE, label: t.marketMoat, icon: 'fa-trophy' },
    { id: SectionType.MONETIZATION, label: t.revenueVector, icon: 'fa-sack-dollar' },
    { id: SectionType.INDONESIA, label: t.natThesis, icon: 'fa-flag' },
    { id: SectionType.SCALABILITY, label: t.exitRoadmap, icon: 'fa-rocket' },
  ];

  const menuItems = persona === UserPersona.COMPANY ? companyItems : governmentItems;

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
          <div className={`w-14 h-14 ${persona === UserPersona.COMPANY ? 'bg-emerald-600 shadow-[0_0_30px_rgba(5,150,105,0.3)]' : 'bg-indigo-600 shadow-[0_0_30px_rgba(79,70,229,0.3)]'} rounded-[22px] flex items-center justify-center text-white relative group cursor-pointer transition-transform hover:scale-105 active:scale-95`}>
            <div className="absolute inset-0 bg-white/20 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {/* Professional Icon */}
            <i className={`fas ${persona === UserPersona.COMPANY ? 'fa-leaf' : 'fa-landmark'} text-2xl transform -rotate-12`}></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter leading-none">CarbonINA</h1>
            <span className={`text-[10px] font-black ${persona === UserPersona.COMPANY ? 'text-emerald-500' : 'text-indigo-500'} tracking-[0.4em] uppercase`}>
              {persona === UserPersona.COMPANY ? 'Pro Synthesis' : 'Regulatory Hub'}
            </span>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[20px] text-[11px] font-black uppercase tracking-widest transition-all group ${
                activeSection === item.id
                  ? persona === UserPersona.COMPANY 
                    ? 'bg-emerald-600/10 text-white border border-emerald-500/20 shadow-xl'
                    : 'bg-indigo-600/10 text-white border border-indigo-500/20 shadow-xl'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03] border border-transparent'
              }`}
            >
              <i className={`fas ${item.icon} w-6 text-center text-lg transition-all group-hover:scale-110 ${
                activeSection === item.id 
                  ? persona === UserPersona.COMPANY ? 'text-emerald-400' : 'text-indigo-400'
                  : 'text-slate-600'
              }`}></i>
              {item.label}
              {activeSection === item.id && (
                <div className={`ml-auto w-2 h-2 ${persona === UserPersona.COMPANY ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]' : 'bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.8)]'} rounded-full`}></div>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-10 relative z-10">
        <div className={`glass-card p-6 rounded-[28px] ${persona === UserPersona.COMPANY ? 'border-emerald-500/10 bg-gradient-to-br from-emerald-500/[0.05]' : 'border-indigo-500/10 bg-gradient-to-br from-indigo-500/[0.05]'} to-transparent`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-2 h-2 ${persona === UserPersona.COMPANY ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]'} rounded-full animate-pulse`}></div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{persona === UserPersona.COMPANY ? t.assetIntel : t.regStatus}</span>
          </div>
          <p className="text-[12px] text-slate-400 leading-relaxed font-medium">
            {persona === UserPersona.COMPANY ? t.compVal : t.govVal}
          </p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em]">
            {t.developedBy}
          </p>
          <p className={`text-[9px] font-black ${persona === UserPersona.COMPANY ? 'text-emerald-500/50' : 'text-indigo-500/50'} uppercase tracking-[0.1em] mt-1`}>
            PT. Nusantara Carbon Solution
          </p>
        </div>
      </div>
    </aside>
  );
};
