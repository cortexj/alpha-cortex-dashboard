import React from 'react';
import { Sparkles } from 'lucide-react';

const AIInsightsPanel = ({ aiInsights, getAIInsights }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 mb-6 text-white">
      <div className="flex items-center justify-between">
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
        <p className="mt-4 text-white/90">{aiInsights}</p>
      )}
    </div>
  );
};

export default AIInsightsPanel;