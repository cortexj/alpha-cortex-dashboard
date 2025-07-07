import React from 'react';
import { Shield, Play, Pause } from 'lucide-react';

const Header = ({ isTimerRunning, setIsTimerRunning, sessionTime }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
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
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isTimerRunning ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isTimerRunning ? 'Pause' : 'Start'} Session
          </button>
          <div className="text-center">
            <div className="text-sm text-gray-600">Session Time</div>
            <div className="text-2xl font-mono font-bold">
              {Math.floor(sessionTime / 60).toString().padStart(2, '0')}:
              {(sessionTime % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;