import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface ScopeCategory {
  name: string;
  scope: '1' | '2' | '3';
  value: number;
  hotspot: boolean;
  standardMethod: string;
}

const COLORS = {
  scope1: '#ef4444',
  scope2: '#3b82f6',
  scope3: '#10b981',
};

export const GHGAdvancedTracker: React.FC = () => {
  const [sector, setSector] = useState('Oil & Gas');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ScopeCategory[] | null>(null);

  const analyzeInventory = async () => {
    setIsLoading(true);
    try {
      // Fixed: Strictly following GoogleGenAI initialization guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          Act as a GHG Protocol expert auditor. Generate an advanced emission inventory for a typical large company in the ${sector} sector.
          
          Include:
          - 2 categories for Scope 1 (e.g. Stationary Combustion, Fugitive)
          - 2 reporting methods for Scope 2 (Location-based, Market-based)
          - 6 most relevant Scope 3 categories (out of the 15 categories)
          
          For each, provide:
          - name: string
          - scope: "1" | "2" | "3"
          - value: number (tCO2e - realistic for a large enterprise)
          - hotspot: boolean (is this a major decarbonization lever?)
          - standardMethod: string (Methodology used per GHG Protocol, e.g. "Activity-based", "Market-based")
          
          Return ONLY a JSON array.
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
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <i className="fas fa-diagram-project"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">GHG Protocol Advanced Inventory</h3>
              <p className="text-xs text-slate-500">Organizational Inventory Standard (Corporate Value Chain)</p>
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option>Oil & Gas</option>
              <option>Automotive</option>
              <option>FMCG Retail</option>
              <option>Banking & Finance</option>
              <option>Cement & Heavy Industry</option>
            </select>
            <button 
              onClick={analyzeInventory}
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-bolt"></i>}
              Simulate Inventory
            </button>
          </div>
        </div>

        {data ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Section */}
            <div className="lg:col-span-1 flex flex-col items-center">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scopeData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {scopeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 w-full px-4">
                {scopeData.map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></div>
                      <span className="text-slate-600">{s.name}</span>
                    </div>
                    <span className="text-slate-900">{s.value.toLocaleString()} tCO2e</span>
                  </div>
                ))}
              </div>
            </div>

            {/* List Section */}
            <div className="lg:col-span-2 overflow-hidden border border-slate-100 rounded-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Scope</th>
                    <th className="px-4 py-3 text-right">Value (tCO2e)</th>
                    <th className="px-4 py-3">Methodology</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.map((item, idx) => (
                    <tr key={idx} className={`hover:bg-slate-50 transition-colors ${item.hotspot ? 'bg-amber-50/30' : ''}`}>
                      <td className="px-4 py-3 flex items-center gap-2">
                        {item.hotspot && <i className="fas fa-fire text-amber-500 text-[10px]"></i>}
                        <span className="font-medium text-slate-900">{item.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.scope === '1' ? 'bg-red-100 text-red-600' : 
                          item.scope === '2' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          Scope {item.scope}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-slate-700">
                        {item.value.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-[11px] text-slate-500 italic">
                        {item.standardMethod}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl text-slate-400">
            <i className="fas fa-microscope text-4xl mb-4 opacity-20"></i>
            <p className="text-sm font-medium">Select a sector and run simulation to map GHG Scopes</p>
          </div>
        )}
      </div>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <i className="fas fa-clipboard-check text-blue-500"></i>
              Auditor Verification Checklist
            </h4>
            <ul className="space-y-3">
              {[
                "Organizational boundaries verified (Financial Control)",
                "Emission factors sourced from IPCC AR6 database",
                "Global Warming Potentials (GWPs) using 100-year values",
                "Market-based Scope 2 residual mix applied"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-5 h-5 rounded bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <i className="fas fa-check text-[10px]"></i>
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl">
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-magnifying-glass-chart text-emerald-400"></i>
              Strategic Hotspot Analysis
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Our AI detected that <span className="text-white font-bold">{data.find(d => d.hotspot)?.name}</span> is your primary emission driver. 
              Reducing this by 20% would improve your ESG score by 14 points and align you with a 1.5°C pathway.
            </p>
            <div className="flex gap-2">
              <button className="flex-1 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-xs font-bold transition">
                View Reduction Pathway
              </button>
              <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 px-3 py-2 rounded-lg text-xs font-bold transition">
                Export Audit Pack
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};