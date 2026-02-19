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
      // Fixed: Strictly following GoogleGenAI initialization guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          Act as a Life Cycle Assessment (LCA) Expert specialized in ISO 14067.
          Quantify the Product Carbon Footprint (PCF) for: ${productName} (${unit}) in the ${category} sector.
          
          Provide a breakdown into exactly 5 life cycle stages aligned with ISO 14067:
          1. Raw Material Acquisition
          2. Production/Manufacturing
          3. Distribution/Logistics
          4. Use Phase
          5. End-of-Life (Disposal/Recycling)

          Return the data in a structured JSON array format.
          Each object must have:
          - "stage": string
          - "emissions": number (in kgCO2e per ${unit})
          - "percentage": number (percentage of total)
          - "description": string (one sentence on the main emission source in this stage)

          Ensure the percentages sum to 100.
          Focus on realistic estimates for the Southeast Asian manufacturing context.
          Return ONLY the JSON array.
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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <i className="fas fa-cube text-emerald-500"></i>
            ISO 14067 PCF Quantifier
          </h3>
          <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase tracking-widest">Unit Level LCA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Product Name</label>
            <input 
              type="text" 
              value={productName} 
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., Solar Inverter"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Functional Unit</label>
            <input 
              type="text" 
              value={unit} 
              onChange={(e) => setUnit(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., 1 unit, 1000m"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option>FMCG</option>
              <option>Electronics</option>
              <option>Building Materials</option>
              <option>Industrial Equipment</option>
              <option>Textiles</option>
            </select>
          </div>
        </div>

        <button 
          onClick={calculatePCF}
          disabled={isLoading}
          className="mt-6 w-full py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <i className="fas fa-microscope"></i>
          )}
          Run ISO 14067 Analysis
        </button>
      </div>

      {lcaResults && (
        <div className="space-y-4">
          <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-lg flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Total Product Carbon Footprint</p>
              <h2 className="text-4xl font-bold">{totalEmissions} <span className="text-xl font-normal opacity-80">kgCO2e / {unit}</span></h2>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <i className="fas fa-tag text-2xl"></i>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {lcaResults.map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-emerald-200 transition-all">
                <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <span className="text-lg font-bold">0{i+1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-slate-800">{item.stage}</h4>
                    <span className="text-xs font-bold text-slate-500">{item.emissions} kgCO2e</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">{item.description}</p>
                </div>
                <div className="text-right w-16">
                  <span className="text-sm font-bold text-slate-900">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!lcaResults && !isLoading && (
        <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-2xl h-48 flex flex-col items-center justify-center text-slate-400">
          <i className="fas fa-box-open text-3xl mb-2 opacity-50"></i>
          <p className="text-sm">Input product parameters to start life-cycle quantification.</p>
        </div>
      )}
    </div>
  );
};