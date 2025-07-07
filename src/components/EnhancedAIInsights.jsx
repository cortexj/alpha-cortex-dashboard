import React, { useState } from 'react';
import { Sparkles, Brain, TrendingUp, Clock, Target, Lightbulb, Zap } from 'lucide-react';
import useMissionStore from '../store/useMissionStore';

const EnhancedAIInsights = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { aiInsights, setAiInsights } = useMissionStore();
  const steps = useMissionStore(state => state.steps) || [];
  const timer = useMissionStore(state => state.timer);
  
  // Calculate insights data
  const completed = steps.filter(s => s.status === 'completed').length;
  const inProgress = steps.filter(s => s.status === 'in-progress').length;
  const totalTimeSpent = steps.reduce((acc, step) => acc + step.timeSpent, 0);
  const averageEfficiency = completed > 0 ? steps
    .filter(s => s.status === 'completed')
    .reduce((acc, s) => acc + (s.timeEstimate / s.timeSpent), 0) / completed * 100 : 100;

  const generateInsights = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const insights = [
      {
        type: 'performance',
        icon: TrendingUp,
        color: 'text-success-600',
        title: 'Performance Analysis',
        content: `Excellent progress! You've completed ${completed} steps with ${averageEfficiency.toFixed(1)}% efficiency. Your current velocity suggests you'll finish Phase 0 ahead of schedule.`
      },
      {
        type: 'timing',
        icon: Clock,
        color: 'text-primary-600',
        title: 'Time Optimization',
        content: `Your session time of ${Math.floor(timer.sessionTime / 60)} minutes shows focused work. Consider 25-minute focused sprints with 5-minute breaks for optimal productivity.`
      },
      {
        type: 'strategy',
        icon: Target,
        color: 'text-accent-600',
        title: 'Strategic Recommendation',
        content: inProgress > 0 
          ? `Focus on completing the ${inProgress} in-progress tasks before starting new ones. This will maximize your momentum and reduce context switching.`
          : 'Perfect! No parallel tasks. Consider starting the next highest-priority step to maintain momentum.'
      },
      {
        type: 'insight',
        icon: Lightbulb,
        color: 'text-yellow-600',
        title: 'Smart Insight',
        content: `Based on your Google Cloud setup progress, prioritize API enablement steps first. These often have propagation delays that can impact dependent steps.`
      }
    ];
    
    setAiInsights(insights);
    setIsGenerating(false);
  };

  return (
    <div className="glass-effect rounded-2xl p-8 mb-8 relative overflow-hidden group">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-primary-500/5 to-success-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(217,70,239,0.05)_0%,_transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(14,165,233,0.05)_0%,_transparent_50%)]"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full opacity-20"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
              animation: 'float 6s ease-in-out infinite'
            }}
          ></div>
        ))}
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-accent-500 via-purple-500 to-primary-500 p-4 rounded-2xl">
                <Brain className="w-8 h-8 text-white" />
                <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-bounce" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-accent-600 to-primary-600 bg-clip-text text-transparent">
                AI Mission Intelligence
              </h3>
              <p className="text-gray-600 mt-1">Real-time optimization recommendations</p>
            </div>
          </div>
          
          <button
            onClick={generateInsights}
            disabled={isGenerating}
            className={`button-micro flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold shadow-2xl transition-all duration-500 transform hover:scale-105 focus-enhanced ${
              isGenerating
                ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-accent-500 via-purple-500 to-primary-500 hover:from-accent-600 hover:via-purple-600 hover:to-primary-600 text-white shadow-accent-500/40'
            }`}
          >
            <div className="relative">
              {isGenerating ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Zap className="w-6 h-6 group-hover:animate-bounce" />
              )}
            </div>
            <span className="text-lg">
              {isGenerating ? 'Analyzing...' : 'Generate Insights'}
            </span>
          </button>
        </div>
        
        {!aiInsights && !isGenerating && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-accent-100 to-primary-100 rounded-2xl flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-accent-600" />
            </div>
            <p className="text-gray-500 text-lg">Click "Generate Insights" to receive AI-powered recommendations for optimizing your mission progress.</p>
          </div>
        )}
        
        {isGenerating && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center mb-4 animate-pulse">
              <Brain className="w-8 h-8 text-white animate-bounce" />
            </div>
            <p className="text-gray-700 text-lg mb-2">AI analyzing your mission data...</p>
            <div className="flex justify-center">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-accent-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {aiInsights && Array.isArray(aiInsights) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
            {aiInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div
                  key={insight.type}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${
                      insight.color.includes('success') ? 'from-success-100 to-success-200' :
                      insight.color.includes('primary') ? 'from-primary-100 to-primary-200' :
                      insight.color.includes('accent') ? 'from-accent-100 to-accent-200' :
                      'from-yellow-100 to-yellow-200'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${insight.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">{insight.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{insight.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {aiInsights && typeof aiInsights === 'string' && (
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 animate-fade-in-up">
            <p className="text-gray-700 leading-relaxed text-lg">{aiInsights}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Floating animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(180deg); }
  }
`;
document.head.appendChild(style);

export default EnhancedAIInsights;