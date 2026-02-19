import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface Recommendation {
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  timeframe: string;
  action: string;
}

export const ReductionTool: React.FC = () => {
  const [industry, setIndustry] = useState('Manufacturing');
  const [scope1, setScope1] = useState(1200);
  const [scope2, setScope2] = useState(850);
  const [scope3, setScope3] = useState(4500);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);

  const generatePlan = async () => {
    setIsLoading(true);
    try {
      // Fixed: Strictly following GoogleGenAI initialization guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          Act as a Senior Decarbonization Strategy Consultant. 
          Generate a personalized carbon reduction plan for a company in the ${industry} sector.
          Current Emissions (tCO2e): Scope 1: ${scope1}, Scope 2: ${scope2}, Scope 3: ${scope3}.
          
          Provide exactly 4 actionable recommendations in a structured JSON array format.
          Each object must have: 
          - "title": string (A concise headline)
          - "impact": "High" | "Medium" | "Low"
          - "timeframe": string (e.g. "6-12 months")
          - "action": string (A detailed 2-sentence description of the strategy and expected benefit)
          
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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <i className="fas fa-sliders text-emerald-500"></i>
          Company Profile Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Sector</label>
            <select 
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option>Manufacturing</option>
              <option>Logistics</option>
              <option>Mining</option>
              <option>Agribusiness</option>
              <option>Tech & Data Centers</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Scope 1 (tCO2e)</label>
            <input 
              type="number" 
              value={scope1} 
              onChange={(e) => setScope1(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Scope 2 (tCO2e)</label>
            <input 
              type="number" 
              value={scope2} 
              onChange={(e) => setScope2(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Scope 3 (tCO2e)</label>
            <input 
              type="number" 
              value={scope3} 
              onChange={(e) => setScope3(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        <button 
          onClick={generatePlan}
          disabled={isLoading}
          className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <i className="fas fa-sparkles"></i>
          )}
          Generate Actionable Recommendations
        </button>
      </div>

      {recommendations && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  rec.impact === 'High' ? 'bg-red-50 text-red-600' : 
                  rec.impact === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {rec.impact} Impact
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{rec.timeframe}</span>
              </div>
              <h4 className="text-md font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{rec.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{rec.action}</p>
            </div>
          ))}
        </div>
      )}
      
      {!recommendations && !isLoading && (
        <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-2xl h-48 flex flex-col items-center justify-center text-slate-400">
          <i className="fas fa-chart-line text-3xl mb-2 opacity-50"></i>
          <p className="text-sm">Configure profile and click generate to see AI insights.</p>
        </div>
      )}
    </div>
  );
};