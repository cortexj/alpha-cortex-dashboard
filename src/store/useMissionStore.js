import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// High-performance mission control store
const useMissionStore = create(
  subscribeWithSelector((set, get) => ({
    // Mission state
    mission: {
      id: 'alpha-cortex-prod',
      name: 'ALPHA_Cortex Production Deployment',
      description: 'Zero-Drift Protocol Execution',
      totalSteps: 105,
      createdAt: new Date('2025-01-07').toISOString(),
    },
    
    // Timer state with high precision
    timer: {
      isRunning: false,
      startTime: null,
      pausedTime: 0,
      sessionTime: 0,
      serverOffset: 0,
      lastSync: null,
      precision: 'centisecond', // 10ms precision
    },
    
    // UI state
    ui: {
      activePhase: 0,
      expandedSteps: new Set(),
      selectedFilters: [],
      isLoading: false,
      error: null,
    },
    
    // Credits and achievements
    credits: {
      used: 12.47,
      total: 500,
      bonus: 500,
    },
    
    achievements: [],
    aiInsights: '',
    
    // Actions
    startTimer: () => {
      const now = performance.now();
      set((state) => ({
        timer: {
          ...state.timer,
          isRunning: true,
          startTime: now,
          lastUpdate: now,
        }
      }));
    },
    
    pauseTimer: () => {
      const now = performance.now();
      set((state) => ({
        timer: {
          ...state.timer,
          isRunning: false,
          pausedTime: state.timer.pausedTime + (now - (state.timer.startTime || now)),
        }
      }));
    },
    
    updateSessionTime: (time) => {
      set((state) => ({
        timer: {
          ...state.timer,
          sessionTime: time,
        }
      }));
    },
    
    toggleStepExpansion: (stepId) => {
      set((state) => {
        const newExpanded = new Set(state.ui.expandedSteps);
        if (newExpanded.has(stepId)) {
          newExpanded.delete(stepId);
        } else {
          newExpanded.add(stepId);
        }
        return {
          ui: {
            ...state.ui,
            expandedSteps: newExpanded,
          }
        };
      });
    },
    
    setActivePhase: (phase) => {
      set((state) => ({
        ui: {
          ...state.ui,
          activePhase: phase,
        }
      }));
    },
    
    updateStep: (stepId, update) => {
      set((state) => {
        const newSteps = state.steps.map(step => 
          step.id === stepId ? { ...step, ...update } : step
        );
        return { steps: newSteps };
      });
    },
    
    setAiInsights: (insights) => {
      set({ aiInsights: insights });
    },
    
    addAchievement: (achievement) => {
      set((state) => ({
        achievements: [...state.achievements, achievement]
      }));
    },
    
    setError: (error) => {
      set((state) => ({
        ui: {
          ...state.ui,
          error,
        }
      }));
    },
    
    setLoading: (isLoading) => {
      set((state) => ({
        ui: {
          ...state.ui,
          isLoading,
        }
      }));
    },
  }))
);

export default useMissionStore;