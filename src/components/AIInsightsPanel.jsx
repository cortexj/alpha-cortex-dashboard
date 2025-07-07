import React from 'react';
import { Sparkles, Brain } from 'lucide-react';

const AIInsightsPanel = ({ aiInsights, getAIInsights }) => {
  return (
    <div className="glass-effect rounded-xl p-6 mb-6 relative overflow-hidden group">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 via-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="w-6 h-6 text-accent-600" />
              <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">AI Mission Insights</h3>
          </div>
          <button
            onClick={getAIInsights}
            className="button-micro px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium focus-enhanced"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Get Fresh Insights
            </span>
          </button>
        </div>
        {aiInsights && (
          <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-gray-700 animate-fade-in-up leading-relaxed">{aiInsights}</p>
          </div>
        )}
        {!aiInsights && (
          <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <p className="text-gray-500 italic">Click "Get Fresh Insights" to receive AI-powered recommendations for your mission progress.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsightsPanel;