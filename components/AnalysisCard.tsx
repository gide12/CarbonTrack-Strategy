
import React from 'react';
import { AnalysisSection } from '../types';

interface AnalysisCardProps {
  section: AnalysisSection;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ section }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 md:p-8 border-b border-slate-100 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-700 border border-slate-200">
            <i className={`fas ${section.icon} text-xl`}></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
            <p className="text-slate-500 mt-1">{section.summary}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8 space-y-8">
        {/* Metrics Grid */}
        {section.metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {section.metrics.map((m, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">{m.label}</p>
                <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Details List */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-list-check text-emerald-500"></i>
            Strategic Insights
          </h3>
          <ul className="space-y-4">
            {section.details.map((detail, idx) => (
              <li key={idx} className="flex gap-4 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                <p className="text-slate-600 leading-relaxed">{detail}</p>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Recommendation Tooltip */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-4">
          <div className="text-blue-500">
            <i className="fas fa-circle-info text-xl"></i>
          </div>
          <div>
            <p className="text-sm font-bold text-blue-900 mb-1">Expert Recommendation</p>
            <p className="text-sm text-blue-700">
              {section.id === 'fit' ? 'Prioritize CSRD compatibility early to win EU supply-chain contracts.' : 
               section.id === 'technical' ? 'Implement real-time API integrations with utility providers to reduce reporting friction.' :
               'Focus on localized compliance standards (OJK) to create a moat against global competitors.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
