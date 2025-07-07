import React from 'react';
import { CheckCircle2, Clock, Target, Trophy, Calendar, Zap } from 'lucide-react';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import useProductivityStore from '../store/useProductivityStore';

const MetricsDashboard = () => {
  const { tasks, achievements, timer } = useProductivityStore();
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const todayTasks = tasks.filter(t => {
    const today = new Date().toDateString();
    return new Date(t.createdAt).toDateString() === today;
  }).length;
  
  const completedToday = tasks.filter(t => {
    const today = new Date().toDateString();
    return t.completed && new Date(t.completedAt || t.createdAt).toDateString() === today;
  }).length;
  
  const totalTime = timer.totalTime / 3600; // Convert to hours
  const efficiency = completedTasks > 0 ? (completedTasks / (totalTime || 1)) * 10 : 0; // Tasks per hour * 10
  
  const animatedCompleted = useAnimatedNumber(completedTasks, 800);
  const animatedToday = useAnimatedNumber(completedToday, 600);
  const animatedTime = useAnimatedNumber(totalTime, 1000);
  const animatedEfficiency = useAnimatedNumber(efficiency, 1200);
  
  const MetricCard = ({ icon: Icon, title, value, unit, color, gradient, description, trend }) => (
    <div className="metric-card group cursor-pointer transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${color} shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              {trend && (
                <div className="flex items-center gap-1 text-xs text-success-600">
                  <span>{trend}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <p className={`text-3xl font-bold bg-gradient-to-r ${color.replace('from-', 'from-').replace('to-', 'to-')} bg-clip-text text-transparent`}>
              {value}{unit}
            </p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        icon={CheckCircle2}
        title="Total Completed"
        value={Math.floor(animatedCompleted)}
        unit=""
        color="from-success-500 to-success-600"
        gradient="from-success-500/5 to-success-600/10"
        description="All time tasks"
        trend="Great progress!"
      />
      
      <MetricCard
        icon={Calendar}
        title="Completed Today"
        value={Math.floor(animatedToday)}
        unit=""
        color="from-primary-500 to-primary-600"
        gradient="from-primary-500/5 to-primary-600/10"
        description={`${todayTasks} tasks created today`}
        trend="Keep it up!"
      />
      
      <MetricCard
        icon={Clock}
        title="Focus Time"
        value={animatedTime.toFixed(1)}
        unit="h"
        color="from-accent-500 to-accent-600"
        gradient="from-accent-500/5 to-accent-600/10"
        description="Total hours tracked"
        trend="Time well spent"
      />
      
      <MetricCard
        icon={Trophy}
        title="Achievements"
        value={achievements.length}
        unit=""
        color="from-yellow-500 to-orange-600"
        gradient="from-yellow-500/5 to-orange-600/10"
        description="Milestones unlocked"
        trend={`${achievements.length}/10 unlocked`}
      />
    </div>
  );
};

export default MetricsDashboard;