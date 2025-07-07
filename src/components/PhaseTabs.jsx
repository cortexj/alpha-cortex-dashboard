import React from 'react';

const PhaseTabs = ({ activePhase, setActivePhase, calculateMetrics }) => {
  return (
    <div className="flex gap-4 mb-6 border-b">
      <button
        onClick={() => setActivePhase(0)}
        className={`pb-2 px-4 font-medium transition-colors ${
          activePhase === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Phase 0: Foundation ({calculateMetrics.phase0Progress.toFixed(0)}%)
      </button>
      <button
        onClick={() => setActivePhase(1)}
        className={`pb-2 px-4 font-medium transition-colors ${
          activePhase === 1 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Phase 1: Implementation ({calculateMetrics.phase1Progress.toFixed(0)}%)
      </button>
    </div>
  );
};

export default PhaseTabs;