import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const useProductivityStore = create(
  subscribeWithSelector((set, get) => ({
    // Core state
    tasks: [
      {
        id: 1,
        title: 'Review project requirements',
        completed: true,
        priority: 'high',
        category: 'work',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Set up development environment',
        completed: false,
        priority: 'medium',
        category: 'development',
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: 'Plan daily workout routine',
        completed: false,
        priority: 'medium',
        category: 'health',
        createdAt: new Date().toISOString(),
      }
    ],
    
    timer: {
      totalTime: 3672, // Total seconds tracked
      isRunning: false,
    },
    
    achievements: ['first-task'],
    
    // Actions
    addTask: (taskData) => {
      const newTask = {
        id: Date.now(),
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      
      set((state) => ({
        tasks: [...state.tasks, newTask]
      }));
    },
    
    toggleTask: (taskId) => {
      set((state) => {
        const updatedTasks = state.tasks.map(task => {
          if (task.id === taskId) {
            const updated = {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : null
            };
            
            // Check for achievements
            if (!task.completed && updated.completed) {
              const completedCount = state.tasks.filter(t => t.completed).length + 1;
              let newAchievements = [...state.achievements];
              
              if (completedCount === 1 && !newAchievements.includes('first-task')) {
                newAchievements.push('first-task');
              }
              if (completedCount === 5 && !newAchievements.includes('task-master-5')) {
                newAchievements.push('task-master-5');
              }
              if (completedCount === 10 && !newAchievements.includes('task-champion-10')) {
                newAchievements.push('task-champion-10');
              }
              if (completedCount === 25 && !newAchievements.includes('productivity-legend')) {
                newAchievements.push('productivity-legend');
              }
              
              state.achievements = newAchievements;
            }
            
            return updated;
          }
          return task;
        });
        
        return { tasks: updatedTasks };
      });
    },
    
    deleteTask: (taskId) => {
      set((state) => ({
        tasks: state.tasks.filter(task => task.id !== taskId)
      }));
    },
    
    updateTask: (taskId, updates) => {
      set((state) => ({
        tasks: state.tasks.map(task =>
          task.id === taskId ? { ...task, ...updates } : task
        )
      }));
    },
    
    addFocusTime: (seconds) => {
      set((state) => {
        const newTotalTime = state.timer.totalTime + seconds;
        const totalHours = newTotalTime / 3600;
        
        let newAchievements = [...state.achievements];
        
        if (totalHours >= 1 && !newAchievements.includes('focused-hour')) {
          newAchievements.push('focused-hour');
        }
        if (totalHours >= 5 && !newAchievements.includes('time-warrior')) {
          newAchievements.push('time-warrior');
        }
        
        return {
          timer: {
            ...state.timer,
            totalTime: newTotalTime
          },
          achievements: newAchievements
        };
      });
    },
    
    setError: (error) => {
      set({ error });
    },
  }))
);

export default useProductivityStore;