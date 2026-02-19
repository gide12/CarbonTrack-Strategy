import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface LCAStage {
  stage: string;
  emissions: number;
  percentage: number;
  description: string;
}

export const ProductFootprintTool: React.FC = () => {
  const [productName, setProductName] = useState('Sustainable Packaging Box');
  const [unit, setUnit] = useState('1 unit');
  const [category, setCategory] = useState('FMCG');
  const [isLoading, setIsLoading] = useState(false);
  const [lcaResults, setLcaResults] = useState<LCAStage[] | null>(null);

  const calculatePCF = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          Act as a Life Cycle Assessment (LCA) Expert specialized in ISO 14067.
          Quantify PCF for: ${productName} (${unit}) in ${category}. 5 stages, ISO aligned.
          Return JSON array: [{"stage": string, "emissions": number, "percentage": number, "description": string}]
        `,
        config: {
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text || "[]");
      setLcaResults(data);
    } catch (error) {
      console.error("Failed to quantify PCF", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalEmissions = lcaResults ? lcaResults.reduce((acc, curr) => acc + curr.emissions, 0).toFixed(2) : 0;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="glass-card p-10 rounded-[40px] border border-emerald-500/10">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-black text-white tracking-tighter flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <i className="fas fa-box-open"></i>
            </div>
            ISO 14067 LCA Quantifier
          </h3>
          <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full uppercase tracking-widest border border-emerald-500/20">Unit Synthesis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Product Descriptor</label>
            <input 
              type="text" 
              value={productName} 
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g., Solar Inverter"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Functional Unit</label>
            <input 
              type="text" 
              value={unit} 
              onChange={(e) => setUnit(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g., 1 unit"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Economic Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold text-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase tracking-widest"
            >
              <option className="bg-[#020617]">FMCG</option>
              <option className="bg-[#020617]">Electronics</option>
              <option className="bg-[#020617]">Building Materials</option>
              <option className="bg-[#020617]">Industrial Equipment</option>
              <option className="bg-[#020617]">Textiles</option>
            </select>
          </div>
        </div>

        <button 
          onClick={calculatePCF}
          disabled={isLoading}
          className="mt-10 w-full py-5 bg-slate-900 hover:bg-black text-white rounded-[24px] text-xs font-black uppercase tracking-[0.3em] transition-all border border-white/5 shadow-2xl disabled:opacity-50"
        >
          {isLoading ? <i className="fas fa-sync fa-spin"></i> : <i className="fas fa-atom mr-2"></i>}
          Execute LCA Simulation
        </button>
      </div>

      {lcaResults && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-900 p-12 rounded-[48px] text-white shadow-[0_20px_60px_-15px_rgba(5,150,105,0.4)] flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="relative z-10">
              <p className="text-emerald-100 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Life Cycle Intensity Output</p>
              <h2 className="text-6xl font-black text-technical tracking-tighter">{totalEmissions} <span className="text-2xl font-light opacity-60">kgCO2e / {unit}</span></h2>
            </div>
            <div className="w-24 h-24 bg-white/20 rounded-[32px] flex items-center justify-center border border-white/10 backdrop-blur-lg relative z-10">
              <i className="fas fa-fingerprint text-4xl"></i>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {lcaResults.map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-[28px] border border-white/5 flex items-center gap-10 group hover:border-emerald-500/30 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-black/40 flex items-center justify-center text-slate-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all font-black text-xl border border-white/5">
                  0{i+1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-black text-white tracking-tight">{item.stage}</h4>
                    <span className="text-xs font-black text-emerald-500 font-mono tracking-tighter">{item.emissions} kgCO2e</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-3">
                    <div 
                      className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1500" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium italic">{item.description}</p>
                </div>
                <div className="text-right w-20">
                  <span className="text-2xl font-black text-white text-technical">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!lcaResults && !isLoading && (
        <div className="h-64 flex flex-col items-center justify-center glass-card rounded-[40px] border-dashed border-2 border-white/5 text-slate-600">
          <i className="fas fa-box-open text-5xl mb-6 opacity-10"></i>
          <p className="text-[10px] font-black uppercase tracking-[0.4em]">Awaiting Molecular Profile</p>
        </div>
      )}
    </div>
  );
};