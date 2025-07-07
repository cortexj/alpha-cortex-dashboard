import React from 'react';
import { Timer, Users, Calendar } from 'lucide-react';

const Footer = ({ calculateMetrics }) => {
  return (
    <div className="mt-6 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white rounded-xl p-6 relative overflow-hidden group">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-accent-900/20 to-success-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm">
            <span className="flex items-center gap-2 glass-effect px-3 py-2 rounded-lg bg-white/10">
              <Timer className="w-4 h-4 text-primary-400" />
            Total Time Invested: {Math.floor(calculateMetrics.totalTimeSpent / 60)}h {calculateMetrics.totalTimeSpent % 60}m
          </span>
            <span className="flex items-center gap-2 glass-effect px-3 py-2 rounded-lg bg-white/10">
              <Users className="w-4 h-4 text-accent-400" />
            Team Size: Solo Developer
          </span>
            <span className="flex items-center gap-2 glass-effect px-3 py-2 rounded-lg bg-white/10">
              <Calendar className="w-4 h-4 text-success-400" />
            Started: July 7, 2025
          </span>
        </div>
          <div className="text-sm glass-effect px-4 py-2 rounded-lg bg-white/10">
            <span className="font-mono gradient-text font-bold">Mission Status: ACTIVE</span>
            <div className="w-2 h-2 bg-success-400 rounded-full inline-block ml-2 animate-pulse"></div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Footer;