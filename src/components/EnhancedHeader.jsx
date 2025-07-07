import React from 'react';
import { Shield, Play, Pause, Timer, Zap } from 'lucide-react';
import { useHighPrecisionTimer } from '../hooks/useHighPrecisionTimer';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';

const EnhancedHeader = () => {
  const { isRunning, sessionTime, toggleTimer } = useHighPrecisionTimer();
  
  const minutes = Math.floor(sessionTime / 60);
  const seconds = sessionTime % 60;
  
  const animatedMinutes = useAnimatedNumber(minutes, 300);
  const animatedSeconds = useAnimatedNumber(seconds, 300);
  
  return (
    <div className="glass-effect rounded-2xl p-8 mb-8 relative overflow-hidden group">
      {/* Dynamic background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-success-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(14,165,233,0.05)_0%,_transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(217,70,239,0.05)_0%,_transparent_50%)]"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-1 h-1 bg-primary-400 rounded-full opacity-20 animate-bounce" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
        <div className="absolute w-1 h-1 bg-accent-400 rounded-full opacity-20 animate-bounce" style={{ top: '60%', left: '80%', animationDelay: '1s' }}></div>
        <div className="absolute w-1 h-1 bg-success-400 rounded-full opacity-20 animate-bounce" style={{ top: '40%', left: '60%', animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-primary-600 to-accent-600 bg-clip-text text-transparent">
                ALPHA_Cortex Mission Control
              </h1>
              <p className="text-gray-600 mt-1 text-lg">Zero-Drift Protocol Execution Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Enhanced Timer Controls */}
            <button
              onClick={toggleTimer}
              className={`button-micro flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold shadow-2xl transition-all duration-500 transform hover:scale-105 focus-enhanced group ${
                isRunning 
                  ? 'bg-gradient-to-r from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:via-red-700 hover:to-pink-700 text-white shadow-red-500/40' 
                  : 'bg-gradient-to-r from-success-500 via-success-600 to-emerald-600 hover:from-success-600 hover:via-success-700 hover:to-emerald-700 text-white shadow-success-500/40'
              }`}
            >
              <div className="relative">
                {isRunning ? (
                  <Pause className="w-6 h-6 animate-pulse" />
                ) : (
                  <Play className="w-6 h-6 group-hover:animate-bounce" />
                )}
              </div>
              <span className="text-lg">
                {isRunning ? 'Pause Session' : 'Start Session'}
              </span>
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            {/* Enhanced Timer Display */}
            <div className="text-center glass-effect rounded-2xl p-6 min-w-[180px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Timer className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium text-gray-600">Session Time</span>
                  {isRunning && <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />}
                </div>
                
                <div className="text-4xl font-mono font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-success-600 bg-clip-text text-transparent">
                  {Math.floor(animatedMinutes).toString().padStart(2, '0')}:
                  {Math.floor(animatedSeconds).toString().padStart(2, '0')}
                </div>
                
                <div className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                  isRunning ? 'text-success-600' : 'text-gray-500'
                }`}>
                  {isRunning ? 'Active Mission' : 'Mission Paused'}
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    isRunning 
                      ? 'bg-gradient-to-r from-success-400 to-primary-500 animate-pulse' 
                      : 'bg-gray-300'
                  }`}
                  style={{ width: isRunning ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHeader;