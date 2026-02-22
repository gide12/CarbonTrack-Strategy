
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface CalculationResult {
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
}

interface CarbonCalculatorProps {
  language: Language;
}

export const CarbonCalculator: React.FC<CarbonCalculatorProps> = ({ language }) => {
  const t = {
    en: {
      title: "GHG Protocol Calculator",
      subtitle: "Quantify operational impact using international carbon accounting standards.",
      compliant: "ISO 14064-1 Compliant",
      s1Title: "Scope 1: Direct Emissions",
      diesel: "Diesel (Liters)",
      gasoline: "Gasoline (Liters)",
      naturalGas: "Natural Gas (m³)",
      s2Title: "Scope 2: Indirect Energy",
      electricity: "Electricity Consumption (kWh)",
      gridFactor: "PLN Grid Factor",
      s3Title: "Scope 3: Value Chain",
      travel: "Business Travel (km)",
      waste: "Operational Waste (kg)",
      totalFootprint: "Total Footprint",
      export: "Export Audit Evidence (PDF)",
      info: "Calculations use GWP-100 values from the IPCC Sixth Assessment Report (AR6). Regional factors for Indonesia are updated quarterly."
    },
    id: {
      title: "Kalkulator Protokol GRK",
      subtitle: "Ukur dampak operasional menggunakan standar akuntansi karbon internasional.",
      compliant: "Patuh ISO 14064-1",
      s1Title: "Cakupan 1: Emisi Langsung",
      diesel: "Solar (Liter)",
      gasoline: "Bensin (Liter)",
      naturalGas: "Gas Alam (m³)",
      s2Title: "Cakupan 2: Energi Tidak Langsung",
      electricity: "Konsumsi Listrik (kWh)",
      gridFactor: "Faktor Jaringan PLN",
      s3Title: "Cakupan 3: Rantai Nilai",
      travel: "Perjalanan Bisnis (km)",
      waste: "Limbah Operasional (kg)",
      totalFootprint: "Total Jejak Karbon",
      export: "Ekspor Bukti Audit (PDF)",
      info: "Perhitungan menggunakan nilai GWP-100 dari Laporan Penilaian Keenam IPCC (AR6). Faktor regional untuk Indonesia diperbarui setiap kuartal."
    }
  }[language];
  // Scope 1: Direct Emissions
  const [diesel, setDiesel] = useState<number>(0); // Liters
  const [gasoline, setGasoline] = useState<number>(0); // Liters
  const [naturalGas, setNaturalGas] = useState<number>(0); // m3

  // Scope 2: Indirect Emissions
  const [electricity, setElectricity] = useState<number>(0); // kWh

  // Scope 3: Value Chain (Simplified)
  const [flights, setFlights] = useState<number>(0); // km
  const [waste, setWaste] = useState<number>(0); // kg

  const [results, setResults] = useState<CalculationResult>({
    scope1: 0,
    scope2: 0,
    scope3: 0,
    total: 0
  });

  useEffect(() => {
    // Emission Factors (kg CO2e per unit)
    const factors = {
      diesel: 2.68,
      gasoline: 2.31,
      naturalGas: 1.9,
      electricity: 0.87, // Indonesia Grid Average
      flights: 0.15, // Average per passenger km
      waste: 0.5 // Average per kg landfill
    };

    const s1 = (diesel * factors.diesel) + (gasoline * factors.gasoline) + (naturalGas * factors.naturalGas);
    const s2 = electricity * factors.electricity;
    const s3 = (flights * factors.flights) + (waste * factors.waste);

    setResults({
      scope1: s1 / 1000, // Convert to tCO2e
      scope2: s2 / 1000,
      scope3: s3 / 1000,
      total: (s1 + s2 + s3) / 1000
    });
  }, [diesel, gasoline, naturalGas, electricity, flights, waste]);

  return (
    <div className="glass-card p-10 rounded-[40px] border-emerald-500/10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-3xl font-black text-white tracking-tighter mb-2 uppercase italic">{t.title}</h3>
          <p className="text-slate-500 text-sm font-medium">{t.subtitle}</p>
        </div>
        <div className="bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
          <span className="text-[10px] font-black text-emerald-500 tracking-widest uppercase">{t.compliant}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-8">
          {/* Scope 1 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-black">S1</div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider">{t.s1Title}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.diesel}</label>
                <input 
                  type="number" 
                  value={diesel || ''} 
                  onChange={(e) => setDiesel(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.gasoline}</label>
                <input 
                  type="number" 
                  value={gasoline || ''} 
                  onChange={(e) => setGasoline(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.naturalGas}</label>
                <input 
                  type="number" 
                  value={naturalGas || ''} 
                  onChange={(e) => setNaturalGas(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
          </section>

          {/* Scope 2 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-black">S2</div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider">{t.s2Title}</h4>
            </div>
            <div className="space-y-2 max-w-md">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.electricity}</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={electricity || ''} 
                  onChange={(e) => setElectricity(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="0"
                />
                <span className="absolute right-4 top-3 text-[10px] font-black text-slate-600 uppercase">{t.gridFactor}</span>
              </div>
            </div>
          </section>

          {/* Scope 3 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-black">S3</div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider">{t.s3Title}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.travel}</label>
                <input 
                  type="number" 
                  value={flights || ''} 
                  onChange={(e) => setFlights(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.waste}</label>
                <input 
                  type="number" 
                  value={waste || ''} 
                  onChange={(e) => setWaste(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Results Sidebar */}
        <div className="space-y-6">
          <div className="bg-black/40 p-8 rounded-[32px] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-6">{t.totalFootprint}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-white tracking-tighter">{results.total.toFixed(2)}</span>
              <span className="text-sm font-bold text-slate-500 uppercase">tCO2e</span>
            </div>
            
            <div className="mt-10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Scope 1</span>
                <span className="text-xs font-black text-white">{results.scope1.toFixed(2)} t</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(results.scope1 / (results.total || 1)) * 100}%` }}
                  className="h-full bg-emerald-500"
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Scope 2</span>
                <span className="text-xs font-black text-white">{results.scope2.toFixed(2)} t</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(results.scope2 / (results.total || 1)) * 100}%` }}
                  className="h-full bg-blue-500"
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Scope 3</span>
                <span className="text-xs font-black text-white">{results.scope3.toFixed(2)} t</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(results.scope3 / (results.total || 1)) * 100}%` }}
                  className="h-full bg-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
            <div className="flex gap-4">
              <i className="fas fa-info-circle text-emerald-500 mt-1"></i>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                {t.info}
              </p>
            </div>
          </div>
          
          <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
            {t.export}
          </button>
        </div>
      </div>
    </div>
  );
};
