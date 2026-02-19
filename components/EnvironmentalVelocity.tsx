
import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { GoogleGenAI } from '@google/genai';

interface VelocityData {
  category: string;
  intensity: number;
  limit: number;
  trend: 'up' | 'down' | 'stable';
}

export const EnvironmentalVelocity: React.FC = () => {
  const [industry, setIndustry] = useState('Manufacturing');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<VelocityData[] | null>(null);

  const fetchVelocity = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          Generate environmental velocity (emission intensity) metrics for: ${industry}.
          Include: "Direct Control", "Purchased Asset", "External Chain", "Process Efficiency", "Logistics Drag", "Grid Decarbonization".
          
          For each, provide:
          - category: string
          - intensity: number (0-100 scale, where 100 is maximum intensity/worst)
          - limit: number (benchmark/threshold)
          - trend: "up" | "down" | "stable"
          
          Return as a JSON array.
        `,
        config: {
          responseMimeType: "application/json",
        }
      });

      const parsed = JSON.parse(response.text || "[]");
      setData(parsed);
    } catch (err) {
      console.error("Velocity fetch failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-[48px] overflow-hidden p-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-[28px] flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-2xl">
            <i className="fas fa-gauge-high text-2xl"></i>
          </div>
          <div>
            <h3 className="text-3xl font-black text-white tracking-tighter">Velocity Matrix</h3>
            <p className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.4em] mt-1">Intensity Vector Analysis</p>
          </div>
        </div>
        <div className="flex gap-4">
           <select 
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-2xl px-6 py-3 text-xs font-black text-white focus:ring-2 focus:ring-emerald-500 outline-none uppercase tracking-widest"
            >
              <option>Manufacturing</option>
              <option>Mining</option>
              <option>Data Centers</option>
              <option>Logistics</option>
            </select>
          <button 
            onClick={fetchVelocity}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl disabled:opacity-50"
          >
            {isLoading ? <i className="fas fa-sync fa-spin"></i> : 'Run Simulation'}
          </button>
        </div>
      </div>

      {data ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Gauge */}
          <div className="lg:col-span-5 h-[450px] relative">
            <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] rounded-full"></div>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="rgba(16, 185, 129, 0.1)" />
                <PolarAngleAxis 
                  dataKey="category" 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                />
                <Radar
                  name="Intensity"
                  dataKey="intensity"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="#10b981"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.map((item, i) => (
                <div key={i} className="bg-black/40 p-6 rounded-[32px] border border-white/5 hover:border-emerald-500/30 transition-all group">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.category}</span>
                    <div className={`w-2 h-2 rounded-full ${item.trend === 'up' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white text-technical tracking-tighter">{item.intensity}</span>
                    <span className="text-[10px] font-bold text-slate-600">/ 100 V-Units</span>
                  </div>
                  <div className="mt-4 w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${item.intensity > item.limit ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${item.intensity}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card p-8 rounded-[32px] border-l-4 border-l-emerald-500">
               <div className="flex items-center gap-4 mb-3">
                  <i className="fas fa-bolt text-emerald-400"></i>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest">Efficiency Synthesis</h4>
               </div>
               <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                  Critical intensity drag detected in <span className="text-white font-bold">External Chain</span> vectors. Mitigation requires 14% shift toward low-carbon logistics to maintain sector velocity benchmarks.
               </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-96 flex flex-col items-center justify-center glass-card rounded-[40px] border-dashed border-2 border-white/5 text-slate-600">
          <i className="fas fa-gauge-max text-5xl mb-6 opacity-10"></i>
          <p className="text-sm font-black uppercase tracking-[0.4em] opacity-40">Ready for Intensity Mapping</p>
        </div>
      )}
    </div>
  );
};
