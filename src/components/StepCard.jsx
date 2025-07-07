import React from 'react';
import { ChevronRight, ChevronDown, CheckCircle2, Circle, Clock } from 'lucide-react';

const StepCard = ({ step, expandedSteps, toggleStepExpansion, updateStepStatus }) => {
  const isExpanded = expandedSteps.has(step.id);
  const statusColors = {
    completed: 'bg-green-100 border-green-500',
    'in-progress': 'bg-blue-100 border-blue-500',
    pending: 'bg-gray-100 border-gray-300'
  };
  
  const statusIcons = {
    completed: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    'in-progress': <div className="w-5 h-5 border-2 border-blue-600 rounded-full animate-spin" />,
    pending: <Circle className="w-5 h-5 text-gray-400" />
  };

  return (
    <div className={`border-2 rounded-lg p-4 mb-3 transition-all cursor-pointer ${statusColors[step.status]} hover:shadow-md`}>
      <div onClick={() => toggleStepExpansion(step.id)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {statusIcons[step.status]}
            <span className="font-medium">Step {step.id}: {step.title}</span>
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {step.timeSpent}/{step.timeEstimate}m
            </span>
            {step.status !== 'completed' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateStepStatus(step.id, step.status === 'pending' ? 'in-progress' : 'completed');
                }}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {step.status === 'pending' ? 'Start' : 'Complete'}
              </button>
            )}
          </div>
        </div>
        {isExpanded && (
          <div className="mt-3 pl-8 text-sm text-gray-700">
            <p>{step.description}</p>
            <div className="mt-2 flex gap-4">
              <span className="text-xs text-gray-500">Sub-phase: {step.subPhase}</span>
              {step.status === 'completed' && (
                <span className="text-xs text-green-600">
                  Efficiency: {((step.timeEstimate / step.timeSpent) * 100).toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepCard;