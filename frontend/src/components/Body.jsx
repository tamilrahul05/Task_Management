import React from 'react';
import { Search, Plus } from 'lucide-react';
import StatCard from './StatCard';
import TaskCard from './TaskCard';

export default function Body({ 
  stats, search, setSearch, filterStatus, setFilterStatus, 
  filterPriority, setFilterPriority, loading, tasks, 
  handleDeleteTask, handleUpdateStatus, onEditTask 
}) {
  return (
    <main className="max-w-7xl mx-auto px-8 space-y-6 flex-1 w-full pb-10 pt-4">
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total" value={stats.total} color="bg-blue-50 text-blue-600" />
        <StatCard title="Done" value={stats.completed} color="bg-emerald-50 text-emerald-600" />
        <StatCard title="Pending" value={stats.pending} color="bg-amber-50 text-amber-600" />
        <StatCard title="Overdue" value={stats.overdue} color="bg-rose-50 text-rose-600" alert={stats.overdue > 0} />
      </div>

      <div className="bg-white p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by title or description..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="flex-1 bg-slate-50 border rounded-lg px-3 py-2 text-sm outline-none">
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="flex-1 bg-slate-50 border rounded-lg px-3 py-2 text-sm outline-none">
            <option value="ALL">All Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
             <div className="col-span-full py-20 text-center text-slate-400 animate-pulse">Loading data from backend...</div>
        ) : tasks.length === 0 ? (
             <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl bg-white text-slate-400">
               <p className="mb-4">No tasks found! Try adding one.</p>
               <button 
                 onClick={() => onEditTask(null)}
                 className="px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition shadow-lg"
               >
                 Task Create
               </button>
             </div>
        ) : (
             tasks.map(task => (
               <TaskCard 
                 key={task.id} 
                 task={task} 
                 onDelete={handleDeleteTask} 
                 onStatusChange={handleUpdateStatus}
                 onEdit={() => onEditTask(task)}
               />
             ))
        )}
      </div>
    </main>
  );
}
