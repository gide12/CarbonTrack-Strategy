import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Language } from '../types';

interface Recommendation {
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  timeframe: string;
  action: string;
}

interface ReductionToolProps {
  language: Language;
}

export const ReductionTool: React.FC<ReductionToolProps> = ({ language }) => {
  const t = {
    en: {
      title: "Carbon Reduction Planner (AI)",
      verticalSector: "Vertical Sector",
      compute: "Compute Reduction Pathways",
      awaiting: "Awaiting Simulation Data",
      intensity: "Intensity",
      industries: ["Manufacturing", "Logistics", "Mining", "Agribusiness", "Tech & Data Centers"]
    },
    id: {
      title: "Perencana Pengurangan Karbon (AI)",
      verticalSector: "Sektor Vertikal",
      compute: "Hitung Jalur Pengurangan",
      awaiting: "Menunggu Data Simulasi",
      intensity: "Intensitas",
      industries: ["Manufaktur", "Logistik", "Pertambangan", "Agribisnis", "Teknologi & Pusat Data"]
    }
  }[language];

  const [industry, setIndustry] = useState(t.industries[0]);
  const [scope1, setScope1] = useState(1200);
  const [scope2, setScope2] = useState(850);
  const [scope3, setScope3] = useState(4500);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);

  const generatePlan = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          Act as a Senior Decarbonization Strategy Consultant. 
          Generate a personalized carbon reduction plan for a company in the ${industry} sector.
          Current Emissions (tCO2e): Scope 1: ${scope1}, Scope 2: ${scope2}, Scope 3: ${scope3}.
          
          Provide exactly 4 actionable recommendations in a structured JSON array format.
          Each object must have: 
          - "title": string
          - "impact": "High" | "Medium" | "Low"
          - "timeframe": string
          - "action": string
          
          Focus on Southeast Asian context and industry best practices.
          Return ONLY the JSON array.
        `,
        config: {
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text || "[]");
      setRecommendations(data);
    } catch (error) {
      console.error("Failed to generate plan", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="glass-card p-10 rounded-[40px] border border-emerald-500/10">
        <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <i className="fas fa-brain"></i>
          </div>
          {t.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.verticalSector}</label>
            <select 
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all uppercase tracking-wider"
            >
              {t.industries.map(ind => (
                <option key={ind} value={ind} className="bg-[#020617]">{ind}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Scope 1 (tCO2e)</label>
            <input 
              type="number" 
              value={scope1} 
              onChange={(e) => setScope1(Number(e.target.value))}
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-black text-emerald-400 focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Scope 2 (tCO2e)</label>
            <input 
              type="number" 
              value={scope2} 
              onChange={(e) => setScope2(Number(e.target.value))}
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-black text-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Scope 3 (tCO2e)</label>
            <input 
              type="number" 
              value={scope3} 
              onChange={(e) => setScope3(Number(e.target.value))}
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-black text-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
            />
          </div>
        </div>
        <button 
          onClick={generatePlan}
          disabled={isLoading}
          className="mt-10 w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[24px] text-xs font-black uppercase tracking-[0.3em] transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] disabled:opacity-50"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-microchip mr-2"></i>}
          {t.compute}
        </button>
      </div>

      {recommendations && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((rec, i) => (
            <div key={i} className="glass-card p-8 rounded-[32px] border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] pointer-events-none"></div>
              <div className="flex justify-between items-start mb-6">
                <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                  rec.impact === 'High' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                  rec.impact === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {rec.impact} {t.intensity}
                </span>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{rec.timeframe}</span>
              </div>
              <h4 className="text-xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors">{rec.title}</h4>
              <p className="text-base text-slate-400 leading-relaxed font-medium italic">{rec.action}</p>
            </div>
          ))}
        </div>
      )}
      
      {!recommendations && !isLoading && (
        <div className="h-64 flex flex-col items-center justify-center glass-card rounded-[40px] border-dashed border-2 border-white/5 text-slate-600">
          <i className="fas fa-chart-network text-5xl mb-6 opacity-10"></i>
          <p className="text-[10px] font-black uppercase tracking-[0.4em]">{t.awaiting}</p>
        </div>
      )}
    </div>
  );
};