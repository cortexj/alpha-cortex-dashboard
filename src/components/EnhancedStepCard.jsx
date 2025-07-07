import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, ChevronDown, CheckCircle2, Circle, Clock, 
  Play, Pause, RotateCcw, Zap, Target, AlertCircle 
} from 'lucide-react';
import useMissionStore from '../store/useMissionStore';

const EnhancedStepCard = ({ step }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  const { 
    ui: { expandedSteps }, 
    toggleStepExpansion, 
    updateStep 
  } = useMissionStore();
  
  const isExpanded = expandedSteps.has(step.id);
  
  // Enhanced status colors with better contrast
  const statusConfig = {
    completed: {
      gradient: 'from-success-50 via-success-100 to-emerald-50',
      border: 'border-success-300',
      shadow: 'shadow-success-500/20 hover:shadow-success-500/30',
      icon: <CheckCircle2 className="w-6 h-6 text-success-600" />,
      badge: 'bg-success-100 text-success-800 border-success-200'
    },
    'in-progress': {
      gradient: 'from-primary-50 via-blue-100 to-primary-50',
      border: 'border-primary-300',
      shadow: 'shadow-primary-500/20 hover:shadow-primary-500/30',
      icon: (
        <div className="relative">
          <div className="w-6 h-6 border-3 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-6 h-6 border-3 border-accent-400 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      ),
      badge: 'bg-primary-100 text-primary-800 border-primary-200'
    },
    pending: {
      gradient: 'from-gray-50 via-gray-100 to-slate-50',
      border: 'border-gray-300',
      shadow: 'shadow-gray-500/10 hover:shadow-gray-500/20',
      icon: <Circle className="w-6 h-6 text-gray-400" />,
      badge: 'bg-gray-100 text-gray-700 border-gray-200'
    },
    blocked: {
      gradient: 'from-red-50 via-red-100 to-rose-50',
      border: 'border-red-300',
      shadow: 'shadow-red-500/20 hover:shadow-red-500/30',
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      badge: 'bg-red-100 text-red-800 border-red-200'
    }
  };
  
  const config = statusConfig[step.status] || statusConfig.pending;
  
  const handleToggleExpansion = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleStepExpansion(step.id);
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  const handleStatusUpdate = (e, newStatus) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    
    const updatedStep = { ...step, status: newStatus };
    if (newStatus === 'completed' && step.timeSpent === 0) {
      updatedStep.timeSpent = step.timeEstimate;
    }
    
    updateStep(step.id, updatedStep);
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  const getNextStatus = () => {
    switch (step.status) {
      case 'pending': return 'in-progress';
      case 'in-progress': return 'completed';
      case 'blocked': return 'in-progress';
      default: return 'pending';
    }
  };
  
  const getStatusActionText = () => {
    switch (step.status) {
      case 'pending': return 'Start';
      case 'in-progress': return 'Complete';
      case 'blocked': return 'Resume';
      case 'completed': return 'Reset';
      default: return 'Update';
    }
  };
  
  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 100) return 'text-success-600';
    if (efficiency >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const efficiency = step.timeSpent > 0 ? ((step.timeEstimate / step.timeSpent) * 100) : 100;
  
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current?.classList.add('animate-fade-in-up');
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={`
        bg-gradient-to-br ${config.gradient} 
        border-2 ${config.border} 
        rounded-2xl p-6 mb-4 
        transition-all duration-500 ease-out
        group relative overflow-hidden
        ${config.shadow}
        hover:-translate-y-2 hover:scale-[1.02]
        ${isAnimating ? 'animate-pulse scale-105' : ''}
        opacity-0
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
      
      {/* Status indicator bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        step.status === 'completed' ? 'bg-gradient-to-r from-success-400 to-success-600' :
        step.status === 'in-progress' ? 'bg-gradient-to-r from-primary-400 to-primary-600' :
        step.status === 'blocked' ? 'bg-gradient-to-r from-red-400 to-red-600' :
        'bg-gradient-to-r from-gray-300 to-gray-400'
      }`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="flex items-center gap-4 flex-1 cursor-pointer group/expand"
            onClick={handleToggleExpansion}
          >
            <div className="relative">
              {config.icon}
              {step.status === 'in-progress' && (
                <div className="absolute -inset-2 border-2 border-primary-300 rounded-full animate-ping opacity-30"></div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-800 group-hover/expand:text-gray-900 transition-colors">
                  Step {step.id}: {step.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.badge}`}>
                  {step.subPhase}
                </span>
              </div>
              
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {step.timeSpent}/{step.timeEstimate}m
                </span>
                {step.status === 'completed' && (
                  <span className={`flex items-center gap-1 ${getEfficiencyColor(efficiency)}`}>
                    <Zap className="w-4 h-4" />
                    {efficiency.toFixed(0)}% efficiency
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  Phase {step.phase}
                </span>
              </div>
            </div>
            
            <div className="transition-transform duration-300 group-hover/expand:scale-110">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover/expand:translate-x-1 transition-transform duration-200" />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            {/* Progress ring for in-progress tasks */}
            {step.status === 'in-progress' && (
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-primary-500"
                    strokeWidth="3"
                    strokeDasharray={`${(step.timeSpent / step.timeEstimate) * 100}, 100`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary-600">
                    {Math.round((step.timeSpent / step.timeEstimate) * 100)}%
                  </span>
                </div>
              </div>
            )}
            
            {/* Action buttons */}
            <div className="flex gap-2">
              {step.status !== 'completed' && (
                <button
                  onClick={(e) => handleStatusUpdate(e, getNextStatus())}
                  className={`button-micro px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 focus-enhanced shadow-lg transform hover:scale-105 ${
                    step.status === 'pending'
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-primary-500/30'
                      : step.status === 'in-progress'
                      ? 'bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white shadow-success-500/30'
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-yellow-500/30'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {step.status === 'pending' && <Play className="w-4 h-4" />}
                    {step.status === 'in-progress' && <CheckCircle2 className="w-4 h-4" />}
                    {step.status === 'blocked' && <RotateCcw className="w-4 h-4" />}
                    {getStatusActionText()}
                  </span>
                </button>
              )}
              
              {step.status === 'completed' && (
                <button
                  onClick={(e) => handleStatusUpdate(e, 'pending')}
                  className="button-micro px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Expandable content with smooth animations */}
        <div className={`overflow-hidden transition-all duration-500 ease-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-4 border-t border-gray-200/50">
            <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <p className="text-gray-700 leading-relaxed mb-4">{step.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-effect px-4 py-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-1">Sub-phase</div>
                  <div className="text-lg font-semibold text-primary-600">{step.subPhase}</div>
                </div>
                
                <div className="glass-effect px-4 py-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-1">Time Estimate</div>
                  <div className="text-lg font-semibold text-accent-600">{step.timeEstimate} min</div>
                </div>
                
                {step.status === 'completed' && (
                  <div className="glass-effect px-4 py-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-1">Efficiency</div>
                    <div className={`text-lg font-semibold ${getEfficiencyColor(efficiency)}`}>
                      {efficiency.toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedStepCard;