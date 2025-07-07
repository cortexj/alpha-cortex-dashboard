import React from 'react';
import { CheckCircle2, Circle, Cloud, Award, Cpu, Database } from 'lucide-react';
import EnhancedStepCard from './EnhancedStepCard';

const StepList = ({ activePhase, steps, expandedSteps, toggleStepExpansion, updateStepStatus, calculateMetrics }) => {
  const phaseSteps = steps.filter(s => s.phase === activePhase);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-primary-600 to-accent-600 bg-clip-text text-transparent">
          {activePhase === 0 ? 'Foundation & Environment Setup' : 'Core Backend Implementation & Validation'}
        </h3>
        <div className="flex items-center gap-6 text-sm">
          <span className="flex items-center gap-2 glass-effect px-4 py-2 rounded-xl bg-white/20">
            <CheckCircle2 className="w-4 h-4 text-success-600" />
            <span className="font-semibold text-success-700">
              {phaseSteps.filter(s => s.status === 'completed').length} Completed
            </span>
          </span>
          <span className="flex items-center gap-2 glass-effect px-4 py-2 rounded-xl bg-white/20">
            <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-semibold text-primary-700">
              {phaseSteps.filter(s => s.status === 'in-progress').length} In Progress
            </span>
          </span>
          <span className="flex items-center gap-2 glass-effect px-4 py-2 rounded-xl bg-white/20">
            <Circle className="w-4 h-4 text-gray-400" />
            <span className="font-semibold text-gray-600">
              {phaseSteps.filter(s => s.status === 'pending').length} Pending
            </span>
          </span>
        </div>
      </div>

      {/* Sub-phase groups */}
      {activePhase === 0 ? (
        <>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border border-primary-200">
              <div className="p-2 bg-primary-500 rounded-lg">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-primary-800 text-lg">Sub-Phase 0.1: Google Cloud Project & API Enablement</h4>
                <p className="text-primary-600 text-sm">Foundation infrastructure and service activation</p>
              </div>
            </div>
            <div className="space-y-4">
              {steps.filter(s => s.subPhase === '0.1').map(step => (
                <EnhancedStepCard 
                  key={step.id} 
                  step={step}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-accent-50 to-accent-100 rounded-xl border border-accent-200">
              <div className="p-2 bg-accent-500 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-accent-800 text-lg">Sub-Phase 0.2: Strategic Benefit Activation</h4>
                <p className="text-accent-600 text-sm">Developer program benefits and premium features</p>
              </div>
            </div>
            <div className="space-y-4">
              {steps.filter(s => s.subPhase === '0.2').map(step => (
                <EnhancedStepCard 
                  key={step.id} 
                  step={step}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-success-50 to-success-100 rounded-xl border border-success-200">
              <div className="p-2 bg-success-500 rounded-lg">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-success-800 text-lg">Sub-Phase 0.3: Local Environment Construction</h4>
                <p className="text-success-600 text-sm">Development environment and toolchain setup</p>
              </div>
            </div>
            <div className="space-y-4">
              {steps.filter(s => s.subPhase === '0.3').map(step => (
                <EnhancedStepCard 
                  key={step.id} 
                  step={step}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-indigo-800 text-lg">Sub-Phase 1.1: Local Services & Version Control</h4>
                <p className="text-indigo-600 text-sm">Container orchestration and repository setup</p>
              </div>
            </div>
            <div className="space-y-4">
              {steps.filter(s => s.subPhase === '1.1').map(step => (
                <EnhancedStepCard 
                  key={step.id} 
                  step={step}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-purple-800 text-lg">Sub-Phase 1.2: Backend Application Scaffolding</h4>
                <p className="text-purple-600 text-sm">API development and intelligent agent systems</p>
              </div>
            </div>
            <div className="space-y-4">
              {steps.filter(s => s.subPhase === '1.2').map(step => (
                <EnhancedStepCard 
                  key={step.id} 
                  step={step}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StepList;