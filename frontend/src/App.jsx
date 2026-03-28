import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { isPast, isToday, parseISO } from 'date-fns';
import { Plus } from 'lucide-react';

// Import split components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Body from './components/Body';
import TaskForm from './components/TaskForm';

const api = axios.create({
  baseURL: '/api/tasks',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('', {
        params: { status: filterStatus, priority: filterPriority, query: search },
      });
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Backend error: Check if Spring Boot is running!');
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterPriority, search]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
    pending: tasks.filter(t => t.status === 'PENDING' || t.status === 'IN_PROGRESS').length,
    overdue: tasks.filter(t => t.status !== 'COMPLETED' && t.dueDate && isPast(parseISO(t.dueDate)) && !isToday(parseISO(t.dueDate))).length,
  };

  const handleAddTask = async (taskData) => {
    try {
      await api.post('', taskData);
      fetchTasks();
      setIsFormOpen(false);
    } catch (err) { alert('Error adding task'); }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      await api.put(`/${id}`, taskData);
      fetchTasks();
      setEditingTask(null);
      setIsFormOpen(false);
    } catch (err) { alert('Error updating task'); }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/${id}/status`, status, { headers: { 'Content-Type': 'text/plain' } });
      fetchTasks();
    } catch (err) { alert('Error updating status'); }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await api.delete(`/${id}`);
        fetchTasks();
      } catch (err) { alert('Error deleting task'); }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar onNewTask={() => { setEditingTask(null); setIsFormOpen(true); }} />
      
      <Body 
        stats={stats} 
        search={search} 
        setSearch={setSearch} 
        filterStatus={filterStatus} 
        setFilterStatus={setFilterStatus} 
        filterPriority={filterPriority} 
        setFilterPriority={setFilterPriority} 
        loading={loading} 
        tasks={tasks} 
        handleDeleteTask={handleDeleteTask} 
        handleUpdateStatus={handleUpdateStatus} 
        onEditTask={(task) => { setEditingTask(task); setIsFormOpen(true); }}
      />

      <Footer />
      
      {/* Floating Action Button for easy access */}
      <button 
        onClick={() => { setEditingTask(null); setIsFormOpen(true); }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-primary-700 hover:scale-110 active:scale-95 transition-all z-[60] focus:ring-4 focus:ring-primary-500/30"
        title="Add New Task"
      >
        <Plus size={28} strokeWidth={2.5} />
      </button>

      <AnimatePresence>
        {isFormOpen && (
           <TaskForm 
             onClose={() => setIsFormOpen(false)} 
             onSubmit={editingTask ? (data) => handleUpdateTask(editingTask.id, data) : handleAddTask}
             initialData={editingTask}
           />
        )}
      </AnimatePresence>

      {error && (
        <div className="fixed bottom-4 right-4 bg-rose-600 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce">
          {error}
        </div>
      )}
    </div>
  );
}
