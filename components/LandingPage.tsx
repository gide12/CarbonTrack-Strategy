import React from 'react';
import { UserPersona, Language } from '../types';
import { motion } from 'motion/react';

interface LandingPageProps {
  onSelectPersona: (persona: UserPersona) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectPersona, language, setLanguage }) => {
  const t = {
    en: {
      selectDomain: "SELECT YOUR DOMAIN",
      tagline: "Initialize the strategic intelligence node for your specific operational requirements.",
      company: "COMPANY",
      companyDesc: "Corporate carbon accounting, supply chain transparency, and ESG compliance for industrial leaders.",
      gov: "GOVERNMENT",
      govDesc: "National registry monitoring, carbon tax verification, and regional sustainability benchmarks.",
      initNode: "Initialize Node",
      developedBy: "Developed by"
    },
    id: {
      selectDomain: "PILIH DOMAIN ANDA",
      tagline: "Inisialisasi node intelijen strategis untuk kebutuhan operasional spesifik Anda.",
      company: "PERUSAHAAN",
      companyDesc: "Akuntansi karbon korporat, transparansi rantai pasok, dan kepatuhan ESG untuk pemimpin industri.",
      gov: "PEMERINTAH",
      govDesc: "Pemantauan registri nasional, verifikasi pajak karbon, dan tolok ukur keberlanjutan regional.",
      initNode: "Inisialisasi Node",
      developedBy: "Dikembangkan oleh"
    }
  }[language];
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Language Switcher */}
      <div className="absolute top-8 right-8 z-20 flex bg-black/40 p-1 rounded-full border border-white/5">
        <button 
          onClick={() => setLanguage(Language.EN)}
          className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${language === Language.EN ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          ENGLISH
        </button>
        <button 
          onClick={() => setLanguage(Language.ID)}
          className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${language === Language.ID ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          INDONESIA
        </button>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-emerald-500/30"></div>
          <span className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">CarbonINA Pro Synthesis</span>
          <div className="h-px w-12 bg-emerald-500/30"></div>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-none">
          {t.selectDomain.split(' ').map((word, i) => (
            <span key={i} className={word === 'DOMAIN' || word === 'ANDA' ? 'text-emerald-500' : ''}>{word} </span>
          ))}
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto font-light leading-relaxed">
          {t.tagline}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full relative z-10">
        {/* Company Card */}
        <motion.button
          whileHover={{ scale: 1.02, translateY: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectPersona(UserPersona.COMPANY)}
          className="group relative p-1 rounded-[40px] bg-gradient-to-b from-emerald-500/20 to-transparent hover:from-emerald-500/40 transition-all duration-500"
        >
          <div className="bg-[#0f172a]/80 backdrop-blur-xl p-10 rounded-[39px] h-full flex flex-col items-center text-center border border-white/5">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]">
              <i className="fas fa-building text-3xl"></i>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight mb-4 group-hover:text-emerald-400 transition-colors">{t.company}</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              {t.companyDesc}
            </p>
            <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-emerald-500 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              {t.initNode} <i className="fas fa-arrow-right ml-1"></i>
            </div>
          </div>
        </motion.button>

        {/* Government Card */}
        <motion.button
          whileHover={{ scale: 1.02, translateY: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectPersona(UserPersona.GOVERNMENT)}
          className="group relative p-1 rounded-[40px] bg-gradient-to-b from-indigo-500/20 to-transparent hover:from-indigo-500/40 transition-all duration-500"
        >
          <div className="bg-[#0f172a]/80 backdrop-blur-xl p-10 rounded-[39px] h-full flex flex-col items-center text-center border border-white/5">
            <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-8 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(99,102,241,0.1)] group-hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]">
              <i className="fas fa-landmark text-3xl"></i>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight mb-4 group-hover:text-indigo-400 transition-colors">{t.gov}</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              {t.govDesc}
            </p>
            <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-indigo-500 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              {t.initNode} <i className="fas fa-arrow-right ml-1"></i>
            </div>
          </div>
        </motion.button>
      </div>

      <div className="mt-16 flex flex-col items-center gap-2 relative z-10">
        <div className="text-[10px] font-bold text-slate-600 tracking-[0.3em] uppercase">
          System Status: Operational // Latency: 12ms
        </div>
      </div>

      {/* Fixed Attribution Footer */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        <div className="text-[10px] font-black text-emerald-500/40 tracking-[0.3em] uppercase">
          {t.developedBy} PT. Nusantara Carbon Solution
        </div>
      </div>
    </div>
  );
};
