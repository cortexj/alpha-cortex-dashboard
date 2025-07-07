import React from 'react';
import { Sparkles } from 'lucide-react';

const AIInsightsPanel = ({ aiInsights, getAIInsights }) => {
  return (
            <Sparkles className="w-6 h-6 animate-pulse" />
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 via-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
            className="button-micro px-6 py-3 bg-white/90 backdrop-blur-sm text-accent-600 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 font-medium focus-enhanced"
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6" />
          <h3 className="text-xl font-semibold">AI Mission Insights</h3>
        </div>
        <button
          onClick={getAIInsights}
          className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          Get Fresh Insights
        </button>
      </div>
      {aiInsights && (
          <p className="mt-4 text-white/90 animate-fade-in-up leading-relaxed">{aiInsights}</p>
      )}
      </div>
    </div>
  );
};

export default AIInsightsPanel;