import React from 'react';
import { Timer, Users, Calendar } from 'lucide-react';

const Footer = ({ calculateMetrics }) => {
  return (
    <div className="mt-6 bg-gray-800 text-white rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm">
          <span className="flex items-center gap-2">
            <Timer className="w-4 h-4" />
            Total Time Invested: {Math.floor(calculateMetrics.totalTimeSpent / 60)}h {calculateMetrics.totalTimeSpent % 60}m
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Team Size: Solo Developer
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Started: July 7, 2025
          </span>
        </div>
        <div className="text-sm">
          <span className="font-mono">Mission Status: ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;