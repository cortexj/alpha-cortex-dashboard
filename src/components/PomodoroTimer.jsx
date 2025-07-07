import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Target } from 'lucide-react';
import useProductivityStore from '../store/useProductivityStore';

const PomodoroTimer = () => {
  const { addFocusTime } = useProductivityStore();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // work, shortBreak, longBreak
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  
  const modes = {
    work: { duration: 25 * 60, label: 'Focus Time', icon: Target, color: 'from-primary-500 to-primary-600' },
    shortBreak: { duration: 5 * 60, label: 'Short Break', icon: Coffee, color: 'from-success-500 to-success-600' },
    longBreak: { duration: 15 * 60, label: 'Long Break', icon: Coffee, color: 'from-accent-500 to-accent-600' }
  };
  
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        
        // Track focus time if in work mode
        if (mode === 'work') {
          addFocusTime(1); // Add 1 second
        }
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer completed
      setIsRunning(false);
      
      if (mode === 'work') {
        setSessionsCompleted(prev => prev + 1);
        // Auto-switch to break
        if ((sessionsCompleted + 1) % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(modes.longBreak.duration);
        } else {
          setMode('shortBreak');
          setTimeLeft(modes.shortBreak.duration);
        }
      } else {
        // Break completed, switch back to work
        setMode('work');
        setTimeLeft(modes.work.duration);
      }
      
      // Show notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`${modes[mode].label} completed!`, {
          body: mode === 'work' ? 'Time for a break!' : 'Ready to focus?',
          icon: '/favicon.ico'
        });
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, sessionsCompleted, addFocusTime]);
  
  const toggleTimer = () => {
    setIsRunning(!isRunning);
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modes[mode].duration);
  };
  
  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
    setIsRunning(false);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progress = ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100;
  const IconComponent = modes[mode].icon;
  
  return (
    <div className="glass-effect rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-success-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <IconComponent className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-800">{modes[mode].label}</h2>
          </div>
          
          {/* Mode Selector */}
          <div className="flex gap-2 justify-center mb-4">
            {Object.entries(modes).map(([key, value]) => (
              <button
                key={key}
                onClick={() => switchMode(key)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                  mode === key
                    ? `bg-gradient-to-r ${value.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {value.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Timer Display */}
        <div className="relative mb-6">
          {/* Circular Progress */}
          <div className="relative w-48 h-48 mx-auto">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#e5e7eb"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#timerGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.827} 282.7`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-gray-800 mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-500">
                  Session {sessionsCompleted + 1}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:scale-105 ${
              isRunning
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                : `bg-gradient-to-r ${modes[mode].color} hover:shadow-xl`
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          
          <button
            onClick={resetTimer}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
        
        {/* Session Progress */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-600 mb-2">Sessions Today</div>
          <div className="flex justify-center gap-2">
            {[...Array(Math.max(4, sessionsCompleted + 1))].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i < sessionsCompleted
                    ? 'bg-gradient-to-r from-success-400 to-success-600'
                    : i === sessionsCompleted && isRunning && mode === 'work'
                    ? 'bg-gradient-to-r from-primary-400 to-primary-600 animate-pulse'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;