import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your Strategy Advisor. Ask me about Scope 1-3 methodologies, ISO 14064 compliance, or our tiered pricing model." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Fixed: Strictly following GoogleGenAI initialization guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          You are a world-class Climate Tech VC, Carbon Accounting Specialist (GHG Protocol/ISO 14064 expert), and SaaS Strategist. 
          You are analyzing "Ecotrack Pro".
          
          Specific Strategy Knowledge:
          - Pricing: SME (€499), Corporate (€2,450), Enterprise (Custom).
          - Scopes: Scope 1 (Direct), Scope 2 (Electricity), Scope 3 (Supply Chain via Network Effect).
          - Compliance: OJK 51 (ID), CSRD (EU), ISO 14064-1.
          
          Guidelines for response:
          1. Be strategic and VC-minded (focus on ARR, LTV, Moats).
          2. Be technically accurate about carbon accounting (referencing GHG Protocol).
          3. Keep it brief (max 100 words per response).
          4. If asked about pricing, defend the hybrid subscription + usage model.

          The user is asking: "${userMsg}"
        `,
        config: {
          temperature: 0.7,
          maxOutputTokens: 300,
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't process that strategy query.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "There was an error connecting to the strategy core." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col h-[600px] shadow-xl overflow-hidden">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
            <i className="fas fa-robot text-sm"></i>
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">Climate Strategy AI</p>
            <p className="text-[10px] text-emerald-400 leading-tight">Online & Ready</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 flex gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about compliance, ROI, or tech..."
            className="w-full bg-slate-800 text-white text-sm rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition border border-slate-700"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-1.5 w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center hover:bg-emerald-600 transition disabled:opacity-50"
          >
            <i className="fas fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};