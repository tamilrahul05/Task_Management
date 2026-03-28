import React from 'react';
import { Trash2, ChevronRight, Calendar } from 'lucide-react';
import { format, isPast, isToday, parseISO } from 'date-fns';

export default function TaskCard({ task, onDelete, onStatusChange, onEdit }) {
  const isOverdue = (dateStr, status) => {
    if (status === 'COMPLETED') return false;
    if (!dateStr) return false;
    const date = parseISO(dateStr);
    return isPast(date) && !isToday(date);
  };

  const priorityColors = {
     HIGH: 'bg-rose-100 text-rose-700',
     MEDIUM: 'amber-100 text-amber-700',
     LOW: 'bg-emerald-100 text-emerald-700'
  };

  return (
    <div className={`p-5 rounded-xl border bg-white shadow-sm transition-all hover:shadow-md flex flex-col h-full ${isOverdue(task.dueDate, task.status) ? 'border-rose-200 bg-rose-50/10 shadow-rose-100' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${priorityColors[task.priority] || 'bg-slate-100 text-slate-600'}`}>
          {task.priority}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-primary text-[10px] font-bold uppercase rounded-lg shadow-sm transition-all active:scale-95">Update</button>
          <button onClick={() => onDelete(task.id)} className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-all active:scale-95"><Trash2 size={16} /></button>
        </div>
      </div>
      
      <h3 className={`font-bold text-slate-800 text-lg mb-1 leading-snug ${task.status === 'COMPLETED' ? 'line-through opacity-40' : ''}`}>
        {task.title}
      </h3>
      <p className="text-sm text-slate-500 line-clamp-2 mb-4">
        {task.description || "No description provided."}
      </p>

      <div className="pt-3 border-t flex items-center justify-between mt-auto">
        <div className={`flex items-center gap-1.5 text-xs font-medium ${isOverdue(task.dueDate, task.status) ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`}>
          <Calendar size={12}/>
          {task.dueDate ? format(parseISO(task.dueDate), 'MMM d, yyyy') : 'No date'}
        </div>
        
        <select 
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className={`text-[10px] font-bold rounded border-none px-2 py-1 outline-none ring-1 ring-slate-200 transition-all ${
            task.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 ring-emerald-300' : 
            task.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 ring-blue-300' : 
            'bg-slate-50 text-slate-600'
          }`}
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
    </div>
  );
}
