import React, { useState } from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function TaskForm({ onClose, onSubmit, initialData }) {
  // Local state for the form inputs
  const [data, setData] = useState(initialData || {
    title: '',
    description: '',
    status: 'PENDING',
    priority: 'MEDIUM',
    category: 'Personal',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark background overlay */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* The Form Content */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: 50, opacity: 0 }}
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">
            {initialData ? 'EDIT TASK' : 'TASK CREATE'}
          </h2>
          <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500"><X size={16} /></button>
        </div>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(data); }}>
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Title</label>
            <input required autoFocus autoComplete="off" type="text" className="w-full px-3 py-2 bg-slate-50 border rounded-lg outline-none focus:border-primary-500" value={data.title} onChange={e => setData({ ...data, title: e.target.value })} />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Details</label>
            <textarea className="w-full h-24 px-3 py-2 bg-slate-50 border rounded-lg resize-none outline-none focus:border-primary-500" value={data.description} onChange={e => setData({ ...data, description: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
               <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Priority</label>
               <select className="w-full px-3 py-2 bg-slate-50 border rounded-lg focus:border-primary-500 text-sm outline-none" value={data.priority} onChange={e => setData({ ...data, priority: e.target.value })}>
                 <option value="LOW">Low</option>
                 <option value="MEDIUM">Medium</option>
                 <option value="HIGH">High</option>
               </select>
            </div>
            <div className="space-y-1">
               <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Category</label>
               <select className="w-full px-3 py-2 bg-slate-50 border rounded-lg focus:border-primary-500 text-sm outline-none" value={data.category} onChange={e => setData({ ...data, category: e.target.value })}>
                 <option value="Personal">Personal</option>
                 <option value="Work">Work</option>
                 <option value="Health">Health</option>
                 <option value="Shopping">Shopping</option>
                 <option value="Other">Other</option>
               </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
               <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Date</label>
               <input type="date" className="w-full px-3 py-2 bg-slate-50 border rounded-lg focus:border-primary-500 text-sm outline-none" value={data.dueDate} onChange={e => setData({ ...data, dueDate: e.target.value })} />
            </div>
            <div className="space-y-1">
               <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Status</label>
               <select className="w-full px-3 py-2 bg-slate-50 border rounded-lg focus:border-primary-500 text-sm outline-none" value={data.status} onChange={e => setData({ ...data, status: e.target.value })}>
                 <option value="PENDING">Pending</option>
                 <option value="IN_PROGRESS">In Progress</option>
                 <option value="COMPLETED">Completed</option>
               </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all mt-6">
             {initialData ? 'Update Task' : 'Task Create'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
