
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { month: 'M0', arr: 0.1, label: 'Pre-seed' },
  { month: 'M3', arr: 0.25, label: 'Seed' },
  { month: 'M6', arr: 0.5, label: 'Market Entry' },
  { month: 'M9', arr: 0.85, label: 'Growth' },
  { month: 'M12', arr: 1.2, label: '€1M Target' },
  { month: 'M18', arr: 3.5, label: 'Series A' },
  { month: 'M24', arr: 7.2, label: 'Scaling' },
  { month: 'M36', arr: 10.5, label: '€10M Exit' },
];

export const Roadmap: React.FC = () => {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorArr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 12, fill: '#64748b'}}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 12, fill: '#64748b'}}
            tickFormatter={(value) => `€${value}M`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            formatter={(value) => [`€${value}M`, 'Annual Recurring Revenue']}
          />
          <Area 
            type="monotone" 
            dataKey="arr" 
            stroke="#10b981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorArr)" 
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex justify-between px-10 mt-2">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Phase 1: Validation</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Phase 2: Scale</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Phase 3: Exit Path</span>
      </div>
    </div>
  );
};
