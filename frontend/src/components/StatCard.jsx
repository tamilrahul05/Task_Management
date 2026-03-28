import React from 'react';

export default function StatCard({ title, value, color, alert }) {
  return (
    <div className={`p-4 rounded-xl border bg-white shadow-sm flex flex-col items-center justify-center transition-all ${alert ? 'border-rose-400 ring-2 ring-rose-50' : ''}`}>
      <div className={`w-8 h-8 rounded-full mb-1 flex items-center justify-center ${color}`}>{value}</div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</div>
    </div>
  );
}
