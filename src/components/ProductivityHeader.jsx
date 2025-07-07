import React from 'react';
import { Target, Calendar, TrendingUp } from 'lucide-react';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import useProductivityStore from '../store/useProductivityStore';

const ProductivityHeader = () => {
  const { tasks, timer } = useProductivityStore();
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const animatedCompletion = useAnimatedNumber(completionRate, 1000);
  const animatedHours = useAnimatedNumber(timer.totalTime / 3600, 800);
  
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="glass-effect rounded-2xl p-8 mb-8 relative overflow-hidden group">
      {/* Dynamic background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-success-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(14,165,233,0.05)_0%,_transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(217,70,239,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-xl">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-primary-600 to-accent-600 bg-clip-text text-transparent">
                Personal Productivity Hub
              </h1>
              <p className="text-gray-600 mt-1 text-lg">Your daily task and time management dashboard</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-lg font-medium">{getCurrentDate()}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center glass-effect rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-medium text-gray-600">Completion</span>
                </div>
                <div className="text-2xl font-bold text-primary-600">
                  {animatedCompletion.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">
                  {completedTasks}/{totalTasks} tasks
                </div>
              </div>
              
              <div className="text-center glass-effect rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-success-600" />
                  <span className="text-sm font-medium text-gray-600">Focus Time</span>
                </div>
                <div className="text-2xl font-bold text-success-600">
                  {animatedHours.toFixed(1)}h
                </div>
                <div className="text-xs text-gray-500">
                  today
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityHeader;