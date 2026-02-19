
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { AnalysisCard } from './components/AnalysisCard';
import { ChatBot } from './components/ChatBot';
import { Roadmap } from './components/Roadmap';
import { ReductionTool } from './components/ReductionTool';
import { ProductFootprintTool } from './components/ProductFootprintTool';
import { GHGAdvancedTracker } from './components/GHGAdvancedTracker';
import { SectionType, AnalysisSection } from './types';
import { INITIAL_ANALYSIS_DATA } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(SectionType.FIT);
  const [analysisData, setAnalysisData] = useState<AnalysisSection[]>(INITIAL_ANALYSIS_DATA);

  const currentSection = analysisData.find(s => s.id === activeSection) || analysisData[0];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Strategic Audit: Ecotrack Pro</h1>
            <p className="text-slate-500 mt-1">Deep-dive evaluation by Climate VC & SaaS Strategists</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-sm">
              <i className="fas fa-file-pdf"></i>
              <span>Export Report</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition shadow-sm">
              <i className="fas fa-share-nodes"></i>
              <span>Share</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis Area */}
          <div className="lg:col-span-2 space-y-8">
            <AnalysisCard section={currentSection} />
            
            {activeSection === SectionType.SCOPES && (
              <GHGAdvancedTracker />
            )}

            {activeSection === SectionType.PCF && (
              <ProductFootprintTool />
            )}

            {activeSection === SectionType.REDUCE && (
              <ReductionTool />
            )}
            
            {activeSection === SectionType.SCALABILITY && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <i className="fas fa-chart-line text-emerald-500"></i>
                  Growth Projections & Roadmap
                </h3>
                <Roadmap />
              </div>
            )}
          </div>

          {/* AI Assistant Sidebar */}
          <div className="lg:col-span-1">
            <ChatBot />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
