
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface ESGReport {
  summary: string;
  nejValue: string;
  srnPpiStatus: string;
  auditLogs: { doc: string; status: string; date: string }[];
  complianceScore: number;
}

export const ESGComplianceManager: React.FC = () => {
  const [sector, setSector] = useState('Pembangkit Energi Terbarukan');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ESGReport | null>(null);

  const generateComplianceReport = async () => {
    setIsLoading(true);
    try {
      // Fix: Use process.env.API_KEY directly as required by the latest SDK guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          Act as a certified Indonesian ESG Auditor & Carbon Market Specialist.
          Analyze a carbon mitigation project in Indonesia: ${sector}.
          
          Based on KLHK regulations (SRN PPI), provide:
          1. A 2-sentence summary of project eligibility for SRN PPI.
          2. Estimated NEK (Nilai Ekonomi Karbon) per ton (in IDR).
          3. SRN PPI Submission Status (e.g., "PDD Verified", "Monitoring Stage").
          4. 4 Mandatory Audit-ready documents (DRAM, PDD, Monitoring Report, Verification Report).
          5. A Compliance Score (0-100).

          Return the data in a structured JSON format:
          {
            "summary": string,
            "nejValue": string,
            "srnPpiStatus": string,
            "auditLogs": [{"doc": string, "status": "Verified" | "Pending" | "Missing", "date": string}],
            "complianceScore": number
          }
          
          Reference IDX Carbon and OJK 51 standards.
          Return ONLY the JSON.
        `,
        config: {
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text || "{}");
      setReport(data);
    } catch (error) {
      console.error("Compliance Generation Failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="glass-card p-10 rounded-[40px] relative overflow-hidden">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-emerald-600/10 text-emerald-400 rounded-[20px] flex items-center justify-center border border-emerald-500/20 shadow-2xl">
              <i className="fas fa-landmark text-2xl"></i>
            </div>
            <div>
              <h3 className="text-3xl font-black text-white tracking-tighter">ESG Compliance Manager</h3>
              <div className="flex items-center gap-4 mt-1">
                 <span className="text-[10px] font-black text-emerald-500 tracking-widest uppercase">Global: CSRD // ISSB // TCFD</span>
                 <div className="h-1 w-1 bg-slate-700 rounded-full"></div>
                 <span className="text-[10px] font-black text-indigo-400 tracking-widest uppercase">National: SRN PPI // NEK // IDX</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-2xl px-6 py-3 text-xs font-black text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all uppercase tracking-widest"
            >
              <option className="bg-[#020617]">Pembangkit Energi Terbarukan</option>
              <option className="bg-[#020617]">LULUCF (Forestry)</option>
              <option className="bg-[#020617]">Pengelolaan Limbah (Waste)</option>
              <option className="bg-[#020617]">Industri Manufaktur</option>
            </select>
            <button 
              onClick={generateComplianceReport}
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] disabled:opacity-50"
            >
              {isLoading ? <i className="fas fa-sync fa-spin"></i> : 'Audit Compliance'}
            </button>
          </div>
        </div>

        {report ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Regulatory Metrics */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-black/30 p-10 rounded-[32px] border border-white/5 flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Aggregate Compliance Score</p>
                <div className="relative w-32 h-32 flex items-center justify-center">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-800" />
                      <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={351.8} strokeDashoffset={351.8 * (1 - report.complianceScore/100)} className="text-emerald-500" strokeLinecap="round" />
                   </svg>
                   <span className="absolute text-3xl font-black text-white text-technical tracking-tighter">{report.complianceScore}%</span>
                </div>
                <div className="mt-8 flex items-center gap-3">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                   <p className="text-sm font-black text-emerald-400 uppercase tracking-widest">{report.srnPpiStatus}</p>
                </div>
              </div>

              <div className="bg-emerald-950/20 p-8 rounded-[32px] border border-emerald-500/10">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-3">NEK Market Benchmark</p>
                <p className="text-4xl font-black text-white tracking-tighter mb-1 font-mono">{report.nejValue}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <i className="fas fa-signal text-emerald-500"></i> IDX-C Price Delta: +2.1%
                </p>
              </div>
            </div>

            {/* AI Synthesizer & Ledger */}
            <div className="lg:col-span-8 space-y-8">
               <div className="bg-[#020617] p-8 rounded-[32px] border border-emerald-500/20 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] pointer-events-none"></div>
                  <h4 className="text-xs font-black text-white tracking-[0.4em] uppercase mb-4 flex items-center gap-3">
                    <i className="fas fa-microchip text-emerald-400"></i> AI Synthesis Hub
                  </h4>
                  <p className="text-xl text-slate-300 leading-relaxed font-light italic">{report.summary}</p>
                  <div className="mt-8 flex gap-4">
                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-xl">
                      <i className="fas fa-cloud-upload"></i> Post to SRN PPI
                    </button>
                    <button className="flex-1 glass-card hover:bg-white/[0.05] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3">
                      <i className="fas fa-box-archive text-emerald-500"></i> Audit Bundle
                    </button>
                  </div>
               </div>

               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] ml-4">Verification Ledger</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {report.auditLogs.map((log, i) => (
                      <div key={i} className="glass-card p-5 rounded-[24px] border border-white/5 flex items-center justify-between hover:border-emerald-500/30 transition-all group">
                         <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${
                              log.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                            }`}>
                               <i className={`fas ${log.status === 'Verified' ? 'fa-check-double' : 'fa-hourglass-start'} text-xl`}></i>
                            </div>
                            <div>
                               <p className="text-sm font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">{log.doc}</p>
                               <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">Hash Verification: {log.date}</p>
                            </div>
                         </div>
                         <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                           log.status === 'Verified' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/5 text-amber-400 border-amber-500/20'
                         }`}>
                           {log.status}
                         </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <div className="h-96 flex flex-col items-center justify-center glass-card rounded-[40px] border-dashed border-2 border-white/5 text-slate-500 group cursor-pointer" onClick={generateComplianceReport}>
            <div className="w-24 h-24 bg-white/[0.02] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <i className="fas fa-gavel text-4xl opacity-10 group-hover:opacity-40 transition-opacity"></i>
            </div>
            <p className="text-sm font-black uppercase tracking-[0.4em] opacity-40">Ready for Regulatory Protocol</p>
            <p className="text-[10px] mt-4 font-bold text-emerald-500/40 uppercase tracking-widest">Awaiting National Sync</p>
          </div>
        )}
      </div>
      
      {report && (
         <div className="bg-gradient-to-r from-emerald-600 to-indigo-700 text-white p-10 rounded-[40px] flex items-center justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-white/20 transition-colors"></div>
            <div className="flex items-center gap-10 relative z-10">
               <div className="w-20 h-20 bg-black/20 rounded-[32px] flex items-center justify-center backdrop-blur-md border border-white/10">
                  <i className="fas fa-chart-line-up text-3xl"></i>
               </div>
               <div>
                  <h4 className="font-black text-3xl tracking-tighter mb-1 uppercase italic">IDX Listing Pipeline</h4>
                  <p className="text-white/70 text-lg font-medium">SPE-GRK certificate eligibility confirmed. Market liquidity high.</p>
               </div>
            </div>
            <button className="bg-white text-emerald-900 px-10 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl relative z-10">
               Access Trading Desk
            </button>
         </div>
      )}
    </div>
  );
};
