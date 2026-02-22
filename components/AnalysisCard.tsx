import React from 'react';
import { AnalysisSection, SectionType, Language } from '../types';

interface AnalysisCardProps {
  section: AnalysisSection;
  language: Language;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ section, language }) => {
  const t = {
    en: {
      intelNode: "Intelligence Node",
      indexClass: "Index Classification",
      stratMatrix: "Strategic Synthesis Matrix",
      tacticalDir: "TACTICAL DIRECTIVE",
      archive: "Archive Node",
      deploy: "Deploy Intel",
      live: "LIVE",
      directives: {
        accounting: 'Ensure all Scope 3 categories are mapped to primary supplier data to avoid carbon tax penalties in 2026.',
        compliance: 'Sync internal NEK tracking with IDX Carbon pricing to optimize bursa trading windows.',
        reduction: 'Prioritize solar transition for high-intensity process lines to maximize JETP funding eligibility.',
        wallet: 'Maintain a 15% buffer in carbon credit assets to hedge against projected NEK price volatility.',
        registry: 'Monitor industrial clusters with >15% intensity variance to identify infrastructure bottlenecks.',
        regulator_tools: 'Cross-reference MRV logs with satellite biomass data to eliminate double-counting of forest offsets.',
        policy_sim: 'Evaluate the €1.2B subsidy reallocation from fossil fuels to grid-scale storage for 2027 NDC targets.',
        price_prediction: 'Hedge against regional price spikes by increasing SPE-GRK liquidity in the domestic bursa.',
        default: 'Convert reporting outputs into direct bursa carbon listings via IDX synergy to maximize Nilai Ekonomi Karbon (NEK).'
      }
    },
    id: {
      intelNode: "Node Intelijen",
      indexClass: "Klasifikasi Indeks",
      stratMatrix: "Matriks Sintesis Strategis",
      tacticalDir: "ARAHAN TAKTIS",
      archive: "Arsipkan Node",
      deploy: "Sebarkan Intel",
      live: "LANGSUNG",
      directives: {
        accounting: 'Pastikan semua kategori Cakupan 3 dipetakan ke data pemasok utama untuk menghindari denda pajak karbon pada tahun 2026.',
        compliance: 'Sinkronkan pelacakan NEK internal dengan harga Karbon IDX untuk mengoptimalkan jendela perdagangan bursa.',
        reduction: 'Prioritaskan transisi surya untuk lini proses intensitas tinggi guna memaksimalkan kelayakan pendanaan JETP.',
        wallet: 'Pertahankan cadangan 15% dalam aset kredit karbon untuk lindung nilai terhadap proyeksi volatilitas harga NEK.',
        registry: 'Pantau klaster industri dengan varians intensitas >15% untuk mengidentifikasi hambatan infrastruktur.',
        regulator_tools: 'Referensi silang log MRV dengan data biomassa satelit untuk menghilangkan penghitungan ganda offset hutan.',
        policy_sim: 'Evaluasi realokasi subsidi €1,2 miliar dari bahan bakar fosil ke penyimpanan skala jaringan untuk target NDC 2027.',
        price_prediction: 'Lindungi nilai terhadap lonjakan harga regional dengan meningkatkan likuiditas SPE-GRK di bursa domestik.',
        default: 'Ubah output pelaporan menjadi pencatatan karbon bursa langsung melalui sinergi IDX untuk memaksimalkan Nilai Ekonomi Karbon (NEK).'
      }
    }
  }[language];

  const isCompanySection = [SectionType.ACCOUNTING, SectionType.COMPLIANCE, SectionType.REDUCTION, SectionType.WALLET].includes(section.id as SectionType);
  const accentColor = isCompanySection ? 'emerald' : 'indigo';
  const accentHex = isCompanySection ? '16,185,129' : '99,102,241';

  return (
    <div className="glass-card rounded-[48px] overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] relative">
      <div className={`absolute top-0 right-0 w-96 h-96 bg-${accentColor}-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none`}></div>
      
      <div className={`p-8 md:p-10 border-b border-${accentColor}-500/10 flex items-start justify-between bg-gradient-to-br from-white/[0.03] to-transparent relative z-10`}>
        <div className="flex items-center gap-8">
          <div className={`w-20 h-20 bg-black/40 rounded-[24px] flex items-center justify-center text-${accentColor}-400 border border-${accentColor}-500/20 shadow-2xl relative`}>
            <div className={`absolute inset-0 bg-${accentColor}-500/5 rounded-[24px] animate-pulse`}></div>
            <i className={`fas ${section.icon} text-3xl`}></i>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-[10px] font-black text-${accentColor}-500 tracking-[0.5em] uppercase`}>{t.intelNode}</span>
              <div className={`h-[1px] w-12 bg-${accentColor}-500/30`}></div>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-2">{section.title}</h2>
            <p className="text-lg text-slate-400 font-medium max-w-xl leading-snug">{section.summary}</p>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em]">{t.indexClass}</span>
          <p className={`text-technical text-lg font-black text-${accentColor}-500 mt-2 opacity-80`}>STG-VEIN-NODE</p>
        </div>
      </div>
      
      <div className="p-8 md:p-10 space-y-12 relative z-10">
        {/* Metric Ecosystem */}
        {section.metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {section.metrics.map((m, idx) => (
              <div key={idx} className={`bg-black/30 p-6 rounded-[24px] border border-white/5 hover:border-${accentColor}-500/30 transition-all group`}>
                <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-2 group-hover:text-slate-400 transition-colors">{m.label}</p>
                <div className="flex items-baseline gap-2">
                   <p className={`text-2xl font-black text-technical tracking-tighter ${m.color}`}>{m.value}</p>
                   {idx === 0 && <span className={`text-[9px] font-bold text-${accentColor}-500 animate-pulse`}>{t.live}</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Detailed Observations */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className={`w-8 h-[2px] bg-${accentColor}-500`}></div>
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">{t.stratMatrix}</h3>
            </div>
            <ul className="space-y-6">
              {section.details.map((detail, idx) => (
                <li key={idx} className="flex gap-6 group">
                  <div className={`mt-2 w-1.5 h-1.5 rounded-full bg-${accentColor}-500 shadow-[0_0_15px_rgba(${accentHex},1)] flex-shrink-0 transition-all group-hover:scale-150`}></div>
                  <p className="text-slate-400 text-base leading-relaxed font-light group-hover:text-slate-200 transition-colors italic">{detail}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Expert Tactical Hub */}
          <div className="space-y-8">
            <div className={`glass-card p-8 rounded-[32px] border-${accentColor}-500/20 bg-${accentColor}-500/[0.02] relative overflow-hidden group border-2`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${accentColor}-500/5 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-${accentColor}-500/10 transition-colors`}></div>
              <div className="flex gap-6 items-start relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-${accentColor}-500/10 flex items-center justify-center text-${accentColor}-400 border border-${accentColor}-500/20 shadow-xl`}>
                  <i className="fas fa-shield-virus text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-3">{t.tacticalDir}</h4>
                  <p className="text-base text-slate-400 leading-relaxed font-medium italic">
                    {section.id === SectionType.ACCOUNTING ? t.directives.accounting : 
                     section.id === SectionType.COMPLIANCE ? t.directives.compliance :
                     section.id === SectionType.REDUCTION ? t.directives.reduction :
                     section.id === SectionType.WALLET ? t.directives.wallet :
                     section.id === SectionType.REGISTRY ? t.directives.registry :
                     section.id === SectionType.REGULATOR_TOOLS ? t.directives.regulator_tools :
                     section.id === SectionType.POLICY_SIM ? t.directives.policy_sim :
                     section.id === SectionType.PRICE_PREDICTION ? t.directives.price_prediction :
                     t.directives.default}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <button className="flex items-center justify-center gap-3 py-5 glass-card rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] text-white hover:bg-white/[0.08] transition shadow-xl group">
                <i className={`fas fa-file-contract text-lg text-${accentColor}-500 group-hover:scale-110 transition-transform`}></i> {t.archive}
              </button>
              <button className={`flex items-center justify-center gap-3 py-5 bg-${accentColor}-600 rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] text-white hover:bg-${accentColor}-500 transition shadow-[0_0_40px_rgba(${accentHex},0.3)] hover:shadow-[0_0_60px_rgba(${accentHex},0.5)]`}>
                <i className="fas fa-satellite-dish text-lg"></i> {t.deploy}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
