import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'M0', arr: 0.1 },
  { month: 'M3', arr: 0.25 },
  { month: 'M6', arr: 0.5 },
  { month: 'M9', arr: 0.85 },
  { month: 'M12', arr: 1.2 },
  { month: 'M18', arr: 3.5 },
  { month: 'M24', arr: 7.2 },
  { month: 'M36', arr: 10.5 },
];

export const Roadmap: React.FC = () => {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 10, fill: '#64748b', fontWeight: 800}}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 10, fill: '#64748b', fontWeight: 800}}
            tickFormatter={(value) => `€${value}M`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '10px' }}
            itemStyle={{ color: '#10b981', fontWeight: 900 }}
          />
          <Area 
            type="monotone" 
            dataKey="arr" 
            stroke="#10b981" 
            strokeWidth={4}
            fillOpacity={1} 
            fill="url(#growthGrad)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex justify-between px-10 mt-6 border-t border-white/5 pt-6">
        <div className="text-center">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Validation</p>
          <p className="text-technical text-sm font-bold text-white">PHASE 1</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Expansion</p>
          <p className="text-technical text-sm font-bold text-white">PHASE 2</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Exit Strategy</p>
          <p className="text-technical text-sm font-bold text-white">PHASE 3</p>
        </div>
      </div>
    </div>
  );
};