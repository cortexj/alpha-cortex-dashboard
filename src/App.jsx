import React, { useEffect } from 'react';
import AnimateOnScroll from './components/AnimateOnScroll';
import ProductivityHeader from './components/ProductivityHeader';
import MetricsDashboard from './components/MetricsDashboard';
import TaskManager from './components/TaskManager';
import PomodoroTimer from './components/PomodoroTimer';
import AchievementPanel from './components/AchievementPanel';
import Footer from './components/Footer';
import useProductivityStore from './store/useProductivityStore';

function App() {
  const {
    tasks,
    achievements,
    timer,
    setError,
  } = useProductivityStore();

  // Load saved data on mount
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('productivityTasks');
      const savedSession = localStorage.getItem('productivitySession');
      const savedAchievements = localStorage.getItem('productivityAchievements');
      
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        useProductivityStore.setState({ tasks: parsedTasks });
      }
      
      if (savedSession) {
        useProductivityStore.setState(state => ({
          timer: {
            ...state.timer,
            totalTime: parseInt(savedSession)
          }
        }));
      }
      
      if (savedAchievements) {
        useProductivityStore.setState({ achievements: JSON.parse(savedAchievements) });
      }
    } catch (err) {
      console.error('Error loading saved data:', err);
      setError('Failed to load saved progress');
    }
  }, [setError]);

  // Save data when it changes
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      localStorage.setItem('productivityTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('productivitySession', timer.totalTime.toString());
  }, [timer.totalTime]);

  useEffect(() => {
    localStorage.setItem('productivityAchievements', JSON.stringify(achievements));
  }, [achievements]);

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Enhanced background pattern overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(14,165,233,0.3)_1px,_transparent_0)] bg-[20px_20px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_rgba(217,70,239,0.1)_0%,_transparent_25%,_transparent_75%,_rgba(34,197,94,0.1)_100%)]"></div>
      </div>
      
      <AnimateOnScroll animation="animate-fade-in-down" delay={100}>
        <ProductivityHeader />
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="animate-fade-in-up" delay={200}>
        <MetricsDashboard />
      </AnimateOnScroll>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <AnimateOnScroll animation="animate-slide-in-right" delay={300}>
            <TaskManager />
          </AnimateOnScroll>
        </div>
        
        <div className="space-y-6">
          <AnimateOnScroll animation="animate-fade-in-up" delay={400}>
            <PomodoroTimer />
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="animate-fade-in-up" delay={500}>
            <AchievementPanel />
          </AnimateOnScroll>
        </div>
      </div>
      
      <AnimateOnScroll animation="animate-fade-in-up" delay={600}>
        <Footer />
      </AnimateOnScroll>
    </div>
  );
}

export default App;