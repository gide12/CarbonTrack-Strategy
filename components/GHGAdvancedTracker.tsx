import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

interface ScopeCategory {
  name: string;
  scope: '1' | '2' | '3';
  value: number;
  hotspot: boolean;
  standardMethod: string;
}

const COLORS = {
  scope1: '#f43f5e',
  scope2: '#6366f1',
  scope3: '#10b981',
};

export const GHGAdvancedTracker: React.FC = () => {
  const [sector, setSector] = useState('Oil & Gas');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ScopeCategory[] | null>(null);

  const analyzeInventory = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          Act as a GHG Protocol expert auditor. Generate an advanced emission inventory for a typical large company in the ${sector} sector.
          Provide categories for Scopes 1, 2, and 3. Return ONLY a JSON array.
        `,
        config: {
          responseMimeType: "application/json",
        }
      });

      const parsed = JSON.parse(response.text || "[]");
      setData(parsed);
    } catch (err) {
      console.error("GHG Inventory Failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const scopeData = data ? [
    { name: 'Scope 1', value: data.filter(d => d.scope === '1').reduce((a, b) => a + b.value, 0), color: COLORS.scope1 },
    { name: 'Scope 2', value: data.filter(d => d.scope === '2').reduce((a, b) => a + b.value, 0), color: COLORS.scope2 },
    { name: 'Scope 3', value: data.filter(d => d.scope === '3').reduce((a, b) => a + b.value, 0), color: COLORS.scope3 },
  ] : [];

  return (
    <div className="glass-panel rounded-3xl overflow-hidden p-8 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 border border-white/10 shadow-inner">
            <i className="fas fa-microscope text-xl"></i>
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">Advanced Inventory Ledger</h3>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Standardized GHG Reporting Frame</p>
          </div>
        </div>
        <div className="flex gap-3">
          <select 
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          >
            <option className="bg-slate-900">Oil & Gas</option>
            <option className="bg-slate-900">Automotive</option>
            <option className="bg-slate-900">FMCG Retail</option>
            <option className="bg-slate-900">Cement Industry</option>
          </select>
          <button 
            onClick={analyzeInventory}
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
          >
            {isLoading ? <i className="fas fa-sync fa-spin"></i> : 'Run Analysis'}
          </button>
        </div>
      </div>

      {data ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 flex flex-col items-center justify-center py-6 glass-panel rounded-3xl border-white/5">
            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scopeData}
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {scopeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '10px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Total</span>
                <span className="text-2xl font-black text-white text-technical">
                  {(scopeData.reduce((acc, s) => acc + s.value, 0) / 1000).toFixed(1)}k
                </span>
                <span className="text-[8px] font-bold text-slate-500 block">tCO2e</span>
              </div>
            </div>
            <div className="w-full px-8 mt-6 grid grid-cols-3 gap-2">
              {scopeData.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-full h-1 rounded-full mb-1" style={{ backgroundColor: s.color }}></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 overflow-hidden glass-panel rounded-3xl border-white/5">
            <div className="max-h-[350px] overflow-y-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="sticky top-0 bg-slate-900 border-b border-white/5 text-slate-500 uppercase text-[9px] font-black tracking-widest z-10">
                  <tr>
                    <th className="px-6 py-4">Category Vector</th>
                    <th className="px-6 py-4">Scope</th>
                    <th className="px-6 py-4 text-right">Value (tCO2e)</th>
                    <th className="px-6 py-4">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {item.hotspot && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>}
                          <span className="font-bold text-slate-200">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black tracking-tighter ${
                          item.scope === '1' ? 'bg-rose-500/10 text-rose-400' : 
                          item.scope === '2' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          S{item.scope}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-technical text-slate-400 group-hover:text-white transition-colors">
                        {item.value.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden min-w-[40px]">
                            <div className="h-full bg-emerald-500" style={{ width: '92%' }}></div>
                          </div>
                          <span className="text-[9px] font-bold text-slate-500">Tier 2</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-80 flex flex-col items-center justify-center glass-panel rounded-3xl border-white/5 border-dashed border-2 text-slate-500">
          <i className="fas fa-radar text-5xl mb-6 opacity-10 animate-pulse"></i>
          <p className="text-sm font-bold uppercase tracking-widest opacity-40">Ready for data ingestion</p>
        </div>
      )}
    </div>
  );
};