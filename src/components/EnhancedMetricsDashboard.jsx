import React from 'react';
import { TrendingUp, Zap, DollarSign, Trophy, Target, Clock, Award, Cpu } from 'lucide-react';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import useMissionStore from '../store/useMissionStore';

const EnhancedMetricsDashboard = () => {
  const { credits, achievements, timer } = useMissionStore();
  
  // Calculate metrics from store
  const steps = useMissionStore(state => state.steps) || [];
  const completed = steps.filter(s => s.status === 'completed').length;
  const inProgress = steps.filter(s => s.status === 'in-progress').length;
  const overallProgress = steps.length > 0 ? (completed / steps.length) * 100 : 0;
  
  const totalTimeEstimate = steps.reduce((acc, step) => acc + step.timeEstimate, 0);
  const totalTimeSpent = steps.reduce((acc, step) => acc + step.timeSpent, 0);
  const efficiency = totalTimeSpent > 0 ? ((completed / steps.length) / (totalTimeSpent / totalTimeEstimate) * 100) : 100;
  
  const animatedProgress = useAnimatedNumber(overallProgress, 1000);
  const animatedEfficiency = useAnimatedNumber(Math.min(efficiency, 200), 1200);
  const animatedCredits = useAnimatedNumber(credits.used, 800);
  const animatedAchievements = useAnimatedNumber(achievements.length, 600);
  const animatedSessionTime = useAnimatedNumber(timer.sessionTime / 60, 500); // Convert to minutes
  
  const MetricCard = ({ icon: Icon, title, value, unit, color, gradient, trend, description, children }) => (
    <div className={`metric-card group cursor-pointer transform hover:scale-105 transition-all duration-500 relative overflow-hidden`}>
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
                  <TrendingUp className="w-3 h-3" />
                  {trend}
                </div>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <p className={`text-3xl font-bold bg-gradient-to-r ${color.replace('from-', 'from-').replace('to-', 'to-')} bg-clip-text text-transparent animate-count-up`}>
              {value}{unit}
            </p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        icon={Target}
        title="Mission Progress"
        value={animatedProgress.toFixed(1)}
        unit="%"
        color="from-primary-500 to-primary-600"
        gradient="from-primary-500/5 to-primary-600/10"
        trend="+12% this session"
        description={`${completed}/${steps.length} steps completed`}
      >
        <div className="progress-bar h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="progress-fill bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg h-full transition-all duration-1000 ease-out"
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Started</span>
          <span>Complete</span>
        </div>
      </MetricCard>

      <MetricCard
        icon={Zap}
        title="Time Efficiency"
        value={Math.min(animatedEfficiency, 999).toFixed(0)}
        unit="%"
        color="from-success-500 to-success-600"
        gradient="from-success-500/5 to-success-600/10"
        trend="Optimal pace"
        description={`${totalTimeSpent}m used / ${totalTimeEstimate}m estimated`}
      >
        <div className="flex items-center gap-2 mt-3">
          <Clock className="w-4 h-4 text-gray-500" />
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                efficiency >= 100 ? 'bg-gradient-to-r from-success-400 to-success-600' :
                efficiency >= 80 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                'bg-gradient-to-r from-red-400 to-red-600'
              }`}
              style={{ width: `${Math.min(animatedEfficiency, 100)}%` }}
            />
          </div>
        </div>
      </MetricCard>

      <MetricCard
        icon={DollarSign}
        title="Cloud Credits"
        value={animatedCredits.toFixed(2)}
        unit=""
        color="from-accent-500 to-accent-600"
        gradient="from-accent-500/5 to-accent-600/10"
        trend="$987.53 remaining"
        description={`$${credits.total + credits.bonus} total budget`}
      >
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Used</span>
            <span>Available</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-accent-400 to-accent-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(credits.used / (credits.total + credits.bonus)) * 100}%` }}
            />
          </div>
        </div>
      </MetricCard>

      <MetricCard
        icon={Trophy}
        title="Achievements"
        value={Math.floor(animatedAchievements)}
        unit=""
        color="from-yellow-500 to-orange-600"
        gradient="from-yellow-500/5 to-orange-600/10"
        trend="3 new unlocked"
        description="Mission milestones reached"
      >
        <div className="flex gap-2 mt-3 flex-wrap">
          {achievements.includes('starter') && (
            <span title="Starter Achievement" className="achievement-badge text-lg animate-bounce-gentle">🎯</span>
          )}
          {achievements.includes('momentum') && (
            <span title="Building Momentum" className="achievement-badge text-lg animate-bounce-gentle">🚀</span>
          )}
          {achievements.includes('phase0') && (
            <span title="Foundation Master" className="achievement-badge text-lg animate-bounce-gentle">🏗️</span>
          )}
          {achievements.length === 0 && (
            <span className="text-xs text-gray-500 italic">Complete steps to unlock achievements</span>
          )}
        </div>
      </MetricCard>

      {/* Additional metrics row */}
      <MetricCard
        icon={Clock}
        title="Session Time"
        value={animatedSessionTime.toFixed(1)}
        unit="m"
        color="from-indigo-500 to-indigo-600"
        gradient="from-indigo-500/5 to-indigo-600/10"
        trend={timer.isRunning ? "Active session" : "Paused"}
        description="Current work session"
      >
        <div className="flex items-center gap-2 mt-3">
          <div className={`w-2 h-2 rounded-full ${timer.isRunning ? 'bg-success-400 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-xs text-gray-600">
            {timer.isRunning ? 'Timer running' : 'Timer paused'}
          </span>
        </div>
      </MetricCard>

      <MetricCard
        icon={Cpu}
        title="Active Phase"
        value="0"
        unit=""
        color="from-purple-500 to-purple-600"
        gradient="from-purple-500/5 to-purple-600/10"
        trend="Foundation setup"
        description="Current mission phase"
      >
        <div className="mt-3 text-xs text-gray-600">
          <div className="flex justify-between items-center">
            <span>Phase 0: Foundation</span>
            <span className="font-semibold">60 steps</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span>Phase 1: Implementation</span>
            <span className="font-semibold">45 steps</span>
          </div>
        </div>
      </MetricCard>

      <MetricCard
        icon={Award}
        title="Mission Score"
        value={(overallProgress * efficiency / 100).toFixed(0)}
        unit=""
        color="from-emerald-500 to-emerald-600"
        gradient="from-emerald-500/5 to-emerald-600/10"
        trend="Elite performance"
        description="Overall mission rating"
      >
        <div className="mt-3">
          <div className="text-xs text-gray-600 mb-2">Performance Rating</div>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(star => (
              <div key={star} className={`w-4 h-4 rounded-sm ${
                star <= (overallProgress * efficiency / 100) / 20 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' 
                  : 'bg-gray-200'
              }`}></div>
            ))}
          </div>
        </div>
      </MetricCard>

      <MetricCard
        icon={TrendingUp}
        title="Velocity"
        value={(completed / Math.max(timer.sessionTime / 3600, 0.1)).toFixed(1)}
        unit="/h"
        color="from-teal-500 to-teal-600"
        gradient="from-teal-500/5 to-teal-600/10"
        trend="Accelerating"
        description="Steps completed per hour"
      >
        <div className="mt-3 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Current pace</span>
            <span className="font-semibold text-teal-600">Excellent</span>
          </div>
        </div>
      </MetricCard>
    </div>
  );
};

export default EnhancedMetricsDashboard;