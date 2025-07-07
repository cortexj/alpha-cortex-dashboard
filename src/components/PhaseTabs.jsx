import React from 'react';

const PhaseTabs = ({ activePhase, setActivePhase, calculateMetrics }) => {
  return (
    <div className="flex gap-4 mb-6 border-b border-gray-200/50 relative">
      {/* Animated tab indicator */}
      <div 
        className={`absolute bottom-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 ease-out ${
          activePhase === 0 ? 'left-0 w-1/2' : 'left-1/2 w-1/2'
        }`}
      />
      
      <button
        onClick={() => setActivePhase(0)}
        className={`pb-4 px-6 font-medium transition-all duration-300 relative group flex-1 text-center ${
          activePhase === 0 
            ? 'text-primary-600' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        <span className="relative z-10">
        Phase 0: Foundation ({calculateMetrics.phase0Progress.toFixed(0)}%)
        </span>
        {activePhase !== 0 && (
          <div className="absolute inset-0 bg-gray-100/50 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        )}
      </button>
      <button
        onClick={() => setActivePhase(1)}
        className={`pb-4 px-6 font-medium transition-all duration-300 relative group flex-1 text-center ${
          activePhase === 1 
            ? 'text-primary-600' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        <span className="relative z-10">
        Phase 1: Implementation ({calculateMetrics.phase1Progress.toFixed(0)}%)
        </span>
        {activePhase !== 1 && (
          <div className="absolute inset-0 bg-gray-100/50 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        )}
      </button>
    </div>
  );
};

export default PhaseTabs;