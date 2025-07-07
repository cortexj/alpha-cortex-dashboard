import React from 'react';
import { useState } from 'react';
import { ChevronRight, ChevronDown, CheckCircle2, Circle, Clock } from 'lucide-react';

const StepCard = ({ step, expandedSteps, toggleStepExpansion, updateStepStatus }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const isExpanded = expandedSteps.has(step.id);
  
  const statusColors = {
    completed: 'bg-gradient-to-r from-success-50 to-success-100 border-success-300 shadow-success-500/20',
    'in-progress': 'bg-gradient-to-r from-primary-50 to-primary-100 border-primary-300 shadow-primary-500/20',
    pending: 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 shadow-gray-500/10'
  };
  
  const statusIcons = {
    completed: <CheckCircle2 className="w-5 h-5 text-success-600 animate-bounce-gentle" />,
    'in-progress': (
      <div className="relative">
        <div className="w-5 h-5 border-2 border-primary-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-5 h-5 border-t-2 border-accent-400 rounded-full animate-spin animation-delay-150"></div>
      </div>
    ),
    pending: <Circle className="w-5 h-5 text-gray-400" />
  };

  const handleToggleExpansion = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleStepExpansion(step.id);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleStatusUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    updateStepStatus(step.id, step.status === 'pending' ? 'in-progress' : 'completed');
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className={`border-2 rounded-xl p-4 mb-3 transition-all duration-300 group relative overflow-hidden ${statusColors[step.status]} hover:shadow-xl hover:-translate-y-1 ${isAnimating ? 'animate-pulse' : ''}`}>
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={handleToggleExpansion}>
            {statusIcons[step.status]}
            <span className="font-medium text-gray-800 group-hover:text-gray-900">Step {step.id}: {step.title}</span>
            <div className="transition-transform duration-200 ml-2">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500 rotate-0 transition-transform duration-200" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform duration-200" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 flex items-center gap-1 glass-effect px-2 py-1 rounded-md">
              <Clock className="w-4 h-4 group-hover:animate-pulse" />
              {step.timeSpent}/{step.timeEstimate}m
            </span>
            {step.status !== 'completed' && (
              <button
                onClick={handleStatusUpdate}
                className={`button-micro px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 focus-enhanced shadow-lg ${
                  step.status === 'pending'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white hover:shadow-primary-500/30'
                    : 'bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white hover:shadow-success-500/30'
                }`}
              >
                {step.status === 'pending' ? 'Start' : 'Complete'}
              </button>
            )}
          </div>
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}>
          <div className="pl-8 text-sm text-gray-700 animate-fade-in-up">
            <p className="mb-2">{step.description}</p>
            <div className="mt-3 flex gap-4 items-center">
              <span className="text-xs text-gray-500 glass-effect px-2 py-1 rounded-md">
                Sub-phase: {step.subPhase}
              </span>
              {step.status === 'completed' && (
                <span className="text-xs text-success-600 font-medium glass-effect px-2 py-1 rounded-md bg-success-50/50">
                  Efficiency: {((step.timeEstimate / step.timeSpent) * 100).toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCard;