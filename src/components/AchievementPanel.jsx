import React from 'react';
import { Trophy, Star, Target, Clock, Zap, Award } from 'lucide-react';
import useProductivityStore from '../store/useProductivityStore';

const AchievementPanel = () => {
  const { tasks, achievements, timer } = useProductivityStore();
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalHours = timer.totalTime / 3600;
  
  const achievementData = [
    {
      id: 'first-task',
      title: 'Getting Started',
      description: 'Complete your first task',
      icon: Target,
      requirement: 1,
      current: completedTasks,
      unlocked: completedTasks >= 1,
      color: 'from-success-400 to-success-600'
    },
    {
      id: 'task-master-5',
      title: 'Task Master',
      description: 'Complete 5 tasks',
      icon: Trophy,
      requirement: 5,
      current: completedTasks,
      unlocked: completedTasks >= 5,
      color: 'from-primary-400 to-primary-600'
    },
    {
      id: 'task-champion-10',
      title: 'Task Champion',
      description: 'Complete 10 tasks',
      icon: Award,
      requirement: 10,
      current: completedTasks,
      unlocked: completedTasks >= 10,
      color: 'from-accent-400 to-accent-600'
    },
    {
      id: 'focused-hour',
      title: 'Focused Hour',
      description: 'Track 1 hour of focus time',
      icon: Clock,
      requirement: 1,
      current: totalHours,
      unlocked: totalHours >= 1,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 'time-warrior',
      title: 'Time Warrior',
      description: 'Track 5 hours of focus time',
      icon: Zap,
      requirement: 5,
      current: totalHours,
      unlocked: totalHours >= 5,
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'productivity-legend',
      title: 'Productivity Legend',
      description: 'Complete 25 tasks',
      icon: Star,
      requirement: 25,
      current: completedTasks,
      unlocked: completedTasks >= 25,
      color: 'from-purple-400 to-purple-600'
    }
  ];
  
  const unlockedCount = achievementData.filter(a => a.unlocked).length;
  
  return (
    <div className="glass-effect rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Achievements</h2>
            <p className="text-sm text-gray-600">{unlockedCount}/{achievementData.length} unlocked</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {achievementData.map((achievement) => {
            const IconComponent = achievement.icon;
            const progress = Math.min((achievement.current / achievement.requirement) * 100, 100);
            
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  achievement.unlocked
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    achievement.unlocked
                      ? `bg-gradient-to-r ${achievement.color}`
                      : 'bg-gray-300'
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      achievement.unlocked ? 'text-white' : 'text-gray-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium ${
                        achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      {achievement.unlocked && (
                        <span className="text-yellow-500 animate-bounce">✨</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {achievement.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          achievement.unlocked
                            ? `bg-gradient-to-r ${achievement.color}`
                            : 'bg-gray-400'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>
                        {achievement.current.toFixed(achievement.id.includes('hour') ? 1 : 0)} / {achievement.requirement}
                      </span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AchievementPanel;