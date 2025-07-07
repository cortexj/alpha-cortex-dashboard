import React, { useEffect } from 'react';
import AnimateOnScroll from './components/AnimateOnScroll';
import EnhancedHeader from './components/EnhancedHeader';
import EnhancedMetricsDashboard from './components/EnhancedMetricsDashboard';
import PhaseComparisonCharts from './components/PhaseComparisonCharts';
import EnhancedAIInsights from './components/EnhancedAIInsights';
import PhaseTabs from './components/PhaseTabs';
import StepList from './components/StepList';
import Footer from './components/Footer';
import useMissionStore from './store/useMissionStore';
import { generateInitialSteps } from './data/stepsData';

function App() {
  const {
    ui: { activePhase, expandedSteps, isLoading, error },
    steps,
    credits,
    achievements,
    timer,
    setActivePhase,
    toggleStepExpansion,
    updateStep,
    setAiInsights,
    addAchievement,
    setError,
  } = useMissionStore();

  // Initialize steps data
  useEffect(() => {
    const initialSteps = generateInitialSteps();
    useMissionStore.setState({ steps: initialSteps });
  }, []);

  // Load saved data on mount
  useEffect(() => {
    try {
      const savedSteps = localStorage.getItem('alphaCortexSteps');
      const savedSession = localStorage.getItem('alphaCortexSession');
      const savedAchievements = localStorage.getItem('alphaCortexAchievements');
      
      if (savedSteps) {
        const parsedSteps = JSON.parse(savedSteps);
        useMissionStore.setState({ steps: parsedSteps });
      }
      
      if (savedSession) {
        useMissionStore.setState(state => ({
          timer: {
            ...state.timer,
            sessionTime: parseInt(savedSession)
          }
        }));
      }
      
      if (savedAchievements) {
        useMissionStore.setState({ achievements: JSON.parse(savedAchievements) });
      }
    } catch (err) {
      console.error('Error loading saved data:', err);
      setError('Failed to load saved progress');
    }
  }, [setError]);

  // Save data when it changes
  useEffect(() => {
    if (steps && steps.length > 0) {
      localStorage.setItem('alphaCortexSteps', JSON.stringify(steps));
    }
  }, [steps]);

  useEffect(() => {
    localStorage.setItem('alphaCortexSession', timer.sessionTime.toString());
  }, [timer.sessionTime]);

  useEffect(() => {
    localStorage.setItem('alphaCortexAchievements', JSON.stringify(achievements));
  }, [achievements]);

  // Calculate progress metrics
  const calculateMetrics = () => {
    if (!steps || steps.length === 0) {
      return {
        completed: 0,
        inProgress: 0,
        pending: 0,
        phase0Progress: 0,
        phase1Progress: 0,
        overallProgress: 0,
        totalTimeEstimate: 0,
        totalTimeSpent: 0,
        efficiency: 100
      };
    }

    const completed = steps.filter(s => s.status === 'completed').length;
    const inProgress = steps.filter(s => s.status === 'in-progress').length;
    const phase0Steps = steps.filter(s => s.phase === 0);
    const phase1Steps = steps.filter(s => s.phase === 1);
    
    const phase0Progress = phase0Steps.length > 0 ? (phase0Steps.filter(s => s.status === 'completed').length / phase0Steps.length) * 100 : 0;
    const phase1Progress = phase1Steps.length > 0 ? (phase1Steps.filter(s => s.status === 'completed').length / phase1Steps.length) * 100 : 0;
    const overallProgress = (completed / steps.length) * 100;
    
    const totalTimeEstimate = steps.reduce((acc, step) => acc + step.timeEstimate, 0);
    const totalTimeSpent = steps.reduce((acc, step) => acc + step.timeSpent, 0);
    const efficiency = totalTimeSpent > 0 ? ((completed / steps.length) / (totalTimeSpent / totalTimeEstimate) * 100) : 100;
    
    return {
      completed,
      inProgress,
      pending: steps.length - completed - inProgress,
      phase0Progress,
      phase1Progress,
      overallProgress,
      totalTimeEstimate,
      totalTimeSpent,
      efficiency
    };
  };

  const metrics = calculateMetrics();

  // Check for new achievements
  const checkAchievements = (completedStep) => {
    const completedCount = steps.filter(s => s.status === 'completed').length;
    
    if (completedCount === 5 && !achievements.includes('starter')) {
      addAchievement('starter');
      showNotification('Achievement Unlocked: Starter! 🎯');
    }
    if (completedCount === 20 && !achievements.includes('momentum')) {
      addAchievement('momentum');
      showNotification('Achievement Unlocked: Building Momentum! 🚀');
    }
    if (completedStep.phase === 0 && steps.filter(s => s.phase === 0 && s.status === 'completed').length === 60) {
      addAchievement('phase0');
      showNotification('Achievement Unlocked: Foundation Master! 🏗️');
    }
  };

  // Show notification (simplified)
  const showNotification = (message) => {
    console.log(message);
    // In a real app, this would show a toast notification
  };

  // Phase data for radar chart
  const phaseRadarData = [
    { metric: 'Progress', phase0: metrics.phase0Progress, phase1: metrics.phase1Progress },
    { metric: 'Time Efficiency', phase0: 85, phase1: 65 },
    { metric: 'Complexity', phase0: 60, phase1: 90 },
    { metric: 'Dependencies', phase0: 40, phase1: 80 },
    { metric: 'Risk Level', phase0: 30, phase1: 70 },
  ];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">System Error</h1>
          <p className="text-red-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reload Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Enhanced background pattern overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(14,165,233,0.3)_1px,_transparent_0)] bg-[20px_20px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_rgba(217,70,239,0.1)_0%,_transparent_25%,_transparent_75%,_rgba(34,197,94,0.1)_100%)]"></div>
      </div>
      
      <AnimateOnScroll animation="animate-fade-in-down" delay={100}>
        <EnhancedHeader />
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="animate-fade-in-up" delay={200}>
        <EnhancedMetricsDashboard />
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="animate-slide-in-right" delay={300}>
        <PhaseComparisonCharts 
          calculateMetrics={metrics}
          phaseRadarData={phaseRadarData}
        />
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="animate-fade-in-up" delay={400}>
        <EnhancedAIInsights />
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="animate-fade-in-up" delay={500}>
        <div className="glass-effect rounded-2xl p-8 relative overflow-hidden group">
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-accent-500/5 to-success-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <PhaseTabs 
              activePhase={activePhase}
              setActivePhase={setActivePhase}
              calculateMetrics={metrics}
            />
            
            <StepList 
              activePhase={activePhase}
              steps={steps || []}
              expandedSteps={expandedSteps}
              toggleStepExpansion={toggleStepExpansion}
              updateStepStatus={updateStep}
              calculateMetrics={metrics}
            />
          </div>
        </div>
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="animate-fade-in-up" delay={600}>
        <Footer calculateMetrics={metrics} />
      </AnimateOnScroll>
    </div>
  );
}

export default App;