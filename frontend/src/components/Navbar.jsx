import React from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';

export default function Navbar({ onNewTask }) {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b px-8 py-4 mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          
          <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase italic">
            TASK <span className="text-blue-600">MANAGEMENT</span>
          </h1>
        </div>
        <button 
          onClick={onNewTask}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
          <span>Task Create</span>
        </button>
      </div>
    </nav>
  );
}
