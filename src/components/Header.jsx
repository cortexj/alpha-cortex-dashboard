import React from 'react';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import { Shield, Play, Pause } from 'lucide-react';

const Header = ({ isTimerRunning, setIsTimerRunning, sessionTime }) => {
  const animatedMinutes = useAnimatedNumber(Math.floor(sessionTime / 60), 300);
  const animatedSeconds = useAnimatedNumber(sessionTime % 60, 300);

  return (
    <div className="glass-effect rounded-xl p-6 mb-6 relative overflow-hidden group">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-success-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              ALPHA_Cortex Mission Control
            </h1>
            <p className="text-gray-600 mt-1">Zero-Drift Protocol Execution Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              className={`button-micro flex items-center gap-2 px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 focus-enhanced ${
                isTimerRunning 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:shadow-red-500/30' 
                  : 'bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white hover:shadow-success-500/30'
              }`}
            >
              {isTimerRunning ? (
                <Pause className="w-5 h-5 animate-pulse" />
              ) : (
                <Play className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              )}
              {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isTimerRunning ? 'Pause' : 'Start'} Session
            </button>
            <div className="text-center glass-effect rounded-lg p-3 min-w-[120px]">
              <div className="text-sm text-gray-600 mb-1">Session Time</div>
              <div className="text-2xl font-mono font-bold gradient-text">
                {Math.floor(animatedMinutes).toString().padStart(2, '0')}:
                {Math.floor(animatedSeconds).toString().padStart(2, '0')}
              </div>
              <p className="text-gray-600 mt-1 animate-fade-in-up">Zero-Drift Protocol Execution Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;