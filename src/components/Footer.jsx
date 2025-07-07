import React from 'react';
import { Timer, Calendar, Target } from 'lucide-react';
import useProductivityStore from '../store/useProductivityStore';

const Footer = () => {
  const { tasks, timer } = useProductivityStore();
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalHours = timer.totalTime / 3600;
  const todayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="glass-effect rounded-xl p-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/5 via-primary-900/5 to-accent-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20">
              <Timer className="w-4 h-4 text-primary-600" />
              Total Focus Time: {totalHours.toFixed(1)} hours
            </span>
            <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20">
              <Target className="w-4 h-4 text-success-600" />
              Tasks Completed: {completedTasks}
            </span>
            <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20">
              <Calendar className="w-4 h-4 text-accent-600" />
              {todayDate}
            </span>
          </div>
          
          <div className="px-4 py-2 rounded-lg bg-white/20">
            <span className="font-medium text-gray-700">Stay Productive! 🚀</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;