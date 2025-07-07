import React from 'react';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import { TrendingUp, Zap, DollarSign, Trophy } from 'lucide-react';

const MetricsDashboard = ({ calculateMetrics, credits, achievements }) => {
  const animatedProgress = useAnimatedNumber(calculateMetrics.overallProgress, 1000);
  const animatedEfficiency = useAnimatedNumber(calculateMetrics.efficiency, 1200);
  const animatedCredits = useAnimatedNumber(credits.used, 800);
  const animatedAchievements = useAnimatedNumber(achievements.length, 600);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="metric-card group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Overall Progress</p>
              <p className="text-3xl font-bold text-primary-600 animate-count-up">
                {animatedProgress.toFixed(1)}%
              </p>
          </div>
            <TrendingUp className="w-8 h-8 text-primary-500 transition-all duration-300 group-hover:scale-110 group-hover:text-primary-600" />
        </div>
          <div className="mt-3 progress-bar h-3">
          <div 
              className="progress-fill bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg"
              style={{ 
                width: `${animatedProgress}%`,
                '--progress-width': `${animatedProgress}%`
              }}
          />
        </div>
        </div>
      </div>

      <div className="metric-card group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-success-500/5 to-success-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Time Efficiency</p>
              <p className="text-3xl font-bold text-success-600 animate-count-up">
                {animatedEfficiency.toFixed(0)}%
              </p>
          </div>
            <Zap className="w-8 h-8 text-success-500 transition-all duration-300 group-hover:scale-110 group-hover:animate-bounce-gentle" />
        </div>
        <div className="mt-3 text-xs text-gray-600">
          {calculateMetrics.totalTimeSpent}m used / {calculateMetrics.totalTimeEstimate}m estimated
        </div>
        </div>
      </div>

      <div className="metric-card group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-accent-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Google Cloud Credits</p>
              <p className="text-3xl font-bold text-accent-600 animate-count-up">
                ${animatedCredits.toFixed(2)}
              </p>
          </div>
            <DollarSign className="w-8 h-8 text-accent-500 transition-all duration-300 group-hover:scale-110 group-hover:text-accent-600" />
        </div>
        <div className="mt-3 text-xs text-gray-600">
          ${credits.total + credits.bonus - credits.used} remaining of ${credits.total + credits.bonus}
        </div>
        </div>
      </div>

      <div className="metric-card group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Achievements</p>
              <p className="text-3xl font-bold text-yellow-600 animate-count-up">
                {Math.floor(animatedAchievements)}
              </p>
          </div>
            <Trophy className="w-8 h-8 text-yellow-500 transition-all duration-300 group-hover:scale-110 group-hover:animate-bounce-gentle" />
        </div>
          <div className="mt-3 flex gap-2">
            {achievements.includes('starter') && (
              <span title="Starter" className="achievement-badge text-lg">🎯</span>
            )}
            {achievements.includes('momentum') && (
              <span title="Building Momentum" className="achievement-badge text-lg">🚀</span>
            )}
            {achievements.includes('phase0') && (
              <span title="Foundation Master" className="achievement-badge text-lg">🏗️</span>
            )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;