import React from 'react';
import { CheckCircle2, Circle, Cloud, Award, Cpu, Database } from 'lucide-react';
import StepCard from './StepCard';

const StepList = ({ activePhase, steps, expandedSteps, toggleStepExpansion, updateStepStatus, calculateMetrics }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {activePhase === 0 ? 'Prerequisite Setup & Financial Foundation' : 'Core Backend Implementation & Validation'}
        </h3>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            {steps.filter(s => s.phase === activePhase && s.status === 'completed').length} Completed
          </span>
          <span className="flex items-center gap-1">
            <Circle className="w-4 h-4 text-blue-600" />
            {steps.filter(s => s.phase === activePhase && s.status === 'in-progress').length} In Progress
          </span>
          <span className="flex items-center gap-1">
            <Circle className="w-4 h-4 text-gray-400" />
            {steps.filter(s => s.phase === activePhase && s.status === 'pending').length} Pending
          </span>
        </div>
      </div>

      {/* Sub-phase groups */}
      {activePhase === 0 ? (
        <>
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              Sub-Phase 0.1: Google Cloud Project & API Enablement
            </h4>
            {steps.filter(s => s.subPhase === '0.1').map(step => (
              <StepCard 
                key={step.id} 
                step={step} 
                expandedSteps={expandedSteps}
                toggleStepExpansion={toggleStepExpansion}
                updateStepStatus={updateStepStatus}
              />
            ))}
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Sub-Phase 0.2: Strategic Benefit Activation
            </h4>
            {steps.filter(s => s.subPhase === '0.2').map(step => (
              <StepCard 
                key={step.id} 
                step={step} 
                expandedSteps={expandedSteps}
                toggleStepExpansion={toggleStepExpansion}
                updateStepStatus={updateStepStatus}
              />
            ))}
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              Sub-Phase 0.3: Local Environment Construction
            </h4>
            {steps.filter(s => s.subPhase === '0.3').map(step => (
              <StepCard 
                key={step.id} 
                step={step} 
                expandedSteps={expandedSteps}
                toggleStepExpansion={toggleStepExpansion}
                updateStepStatus={updateStepStatus}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Sub-Phase 1.1: Local Services & Version Control
            </h4>
            {steps.filter(s => s.subPhase === '1.1').map(step => (
              <StepCard 
                key={step.id} 
                step={step} 
                expandedSteps={expandedSteps}
                toggleStepExpansion={toggleStepExpansion}
                updateStepStatus={updateStepStatus}
              />
            ))}
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              Sub-Phase 1.2: Backend Application Scaffolding
            </h4>
            {steps.filter(s => s.subPhase === '1.2').map(step => (
              <StepCard 
                key={step.id} 
                step={step} 
                expandedSteps={expandedSteps}
                toggleStepExpansion={toggleStepExpansion}
                updateStepStatus={updateStepStatus}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StepList;