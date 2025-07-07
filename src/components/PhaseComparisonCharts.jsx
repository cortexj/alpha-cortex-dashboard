import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Target, Cpu } from 'lucide-react';

const PhaseComparisonCharts = ({ calculateMetrics, phaseRadarData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Phase Progress Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { phase: 'Phase 0: Foundation', progress: calculateMetrics.phase0Progress, total: 60 },
            { phase: 'Phase 1: Implementation', progress: calculateMetrics.phase1Progress, total: 45 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="phase" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#3B82F6" name="Progress %" />
            <Bar dataKey="total" fill="#E5E7EB" name="Total Steps" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5" />
          Phase Complexity Analysis
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={phaseRadarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Phase 0" dataKey="phase0" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            <Radar name="Phase 1" dataKey="phase1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PhaseComparisonCharts;