import React from 'react';
import { TrendingUp, Zap, DollarSign, Trophy } from 'lucide-react';

const MetricsDashboard = ({ calculateMetrics, credits, achievements }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Overall Progress</p>
            <p className="text-3xl font-bold text-blue-600">{calculateMetrics.overallProgress.toFixed(1)}%</p>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-500" />
        </div>
        <div className="mt-3 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${calculateMetrics.overallProgress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Time Efficiency</p>
            <p className="text-3xl font-bold text-green-600">{calculateMetrics.efficiency.toFixed(0)}%</p>
          </div>
          <Zap className="w-8 h-8 text-green-500" />
        </div>
        <div className="mt-3 text-xs text-gray-600">
          {calculateMetrics.totalTimeSpent}m used / {calculateMetrics.totalTimeEstimate}m estimated
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Google Cloud Credits</p>
            <p className="text-3xl font-bold text-purple-600">${credits.used}</p>
          </div>
          <DollarSign className="w-8 h-8 text-purple-500" />
        </div>
        <div className="mt-3 text-xs text-gray-600">
          ${credits.total + credits.bonus - credits.used} remaining of ${credits.total + credits.bonus}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Achievements</p>
            <p className="text-3xl font-bold text-yellow-600">{achievements.length}</p>
          </div>
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
        <div className="mt-3 flex gap-2">
          {achievements.includes('starter') && <span title="Starter">🎯</span>}
          {achievements.includes('momentum') && <span title="Building Momentum">🚀</span>}
          {achievements.includes('phase0') && <span title="Foundation Master">🏗️</span>}
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;