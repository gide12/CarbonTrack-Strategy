
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Expert advisor ready. I can synthesize carbon accounting logic, Indonesian regulatory nuances, and growth multiples. How shall we proceed?" }
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
      // Fix: Create instance right before making the API call to ensure latest API key usage
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze CarbonINA Pro. Pricing: SME (€499), Corp (€2450). Scopes 1-3. POJK 51, CSRD. User: "${userMsg}"`,
        // Fix: Removed maxOutputTokens as it's not required and to avoid token budget issues with thinking models
        config: { temperature: 0.7 }
      });

      const aiText = response.text || "Consultation core timed out.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Strategic core offline." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-2xl text-xs leading-relaxed font-medium ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/10'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10 flex gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 pt-0">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="System query..."
            className="w-full bg-white/5 text-white text-xs rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition border border-white/10 group-hover:bg-white/10"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-1.5 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-500 transition disabled:opacity-50"
          >
            <i className="fas fa-terminal text-[10px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
