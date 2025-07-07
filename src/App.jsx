import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import MetricsDashboard from './components/MetricsDashboard';
import PhaseComparisonCharts from './components/PhaseComparisonCharts';
import AIInsightsPanel from './components/AIInsightsPanel';
import PhaseTabs from './components/PhaseTabs';
import StepList from './components/StepList';
import Footer from './components/Footer';

function App() {
  // State management
  const [activePhase, setActivePhase] = useState(0);
  const [steps, setSteps] = useState(generateInitialSteps());
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [credits, setCredits] = useState({ used: 12.47, total: 500, bonus: 500 });
  const [achievements, setAchievements] = useState([]);
  const [aiInsights, setAiInsights] = useState('');
  const [expandedSteps, setExpandedSteps] = useState(new Set());

  // Load saved data on mount
  useEffect(() => {
    const savedSteps = localStorage.getItem('alphaCortexSteps');
    const savedSession = localStorage.getItem('alphaCortexSession');
    const savedAchievements = localStorage.getItem('alphaCortexAchievements');
    
    if (savedSteps) {
      setSteps(JSON.parse(savedSteps));
    }
    if (savedSession) {
      setSessionTime(parseInt(savedSession));
    }
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem('alphaCortexSteps', JSON.stringify(steps));
  }, [steps]);

  useEffect(() => {
    localStorage.setItem('alphaCortexSession', sessionTime.toString());
  }, [sessionTime]);

  useEffect(() => {
    localStorage.setItem('alphaCortexAchievements', JSON.stringify(achievements));
  }, [achievements]);

  // Generate initial 105 steps
  function generateInitialSteps() {
    const phase0Steps = [
      // Sub-Phase 0.1: Google Cloud Project & API Enablement (Steps 1-20)
      { id: 1, phase: 0, subPhase: '0.1', title: 'Create Google Cloud Project', status: 'completed', timeEstimate: 5, timeSpent: 4, description: 'Create project named alpha-cortex-prod' },
      { id: 2, phase: 0, subPhase: '0.1', title: 'Navigate to Google Cloud Console', status: 'completed', timeEstimate: 1, timeSpent: 1, description: 'Access console.cloud.google.com' },
      { id: 3, phase: 0, subPhase: '0.1', title: 'Log In to Google Account', status: 'completed', timeEstimate: 1, timeSpent: 1, description: 'Authenticate with Google credentials' },
      { id: 4, phase: 0, subPhase: '0.1', title: 'Access Project Creation', status: 'in-progress', timeEstimate: 2, timeSpent: 0, description: 'Navigate to project creation interface' },
      { id: 5, phase: 0, subPhase: '0.1', title: 'Name Project alpha-cortex-prod', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Set project identifier' },
      { id: 6, phase: 0, subPhase: '0.1', title: 'Create Billing Account', status: 'pending', timeEstimate: 10, timeSpent: 0, description: 'Set up billing for cloud services' },
      { id: 7, phase: 0, subPhase: '0.1', title: 'Link Project to Billing', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Connect billing to project' },
      { id: 8, phase: 0, subPhase: '0.1', title: 'Create Project', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Finalize project creation' },
      { id: 9, phase: 0, subPhase: '0.1', title: 'Select New Project as Active', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Set as current working project' },
      { id: 10, phase: 0, subPhase: '0.1', title: 'Navigate to API Library', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Access API management' },
      { id: 11, phase: 0, subPhase: '0.1', title: 'Enable Vertex AI API', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Activate AI services' },
      { id: 12, phase: 0, subPhase: '0.1', title: 'Enable Cloud Run Admin API', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Enable serverless compute' },
      { id: 13, phase: 0, subPhase: '0.1', title: 'Enable Cloud SQL Admin API', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Activate database services' },
      { id: 14, phase: 0, subPhase: '0.1', title: 'Enable Secret Manager API', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Enable secrets management' },
      { id: 15, phase: 0, subPhase: '0.1', title: 'Enable Service Usage API', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Activate service monitoring' },
      { id: 16, phase: 0, subPhase: '0.1', title: 'Enable Artifact Registry API', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Enable container registry' },
      { id: 17, phase: 0, subPhase: '0.1', title: 'Enable IAM Credentials API', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Activate identity management' },
      { id: 18, phase: 0, subPhase: '0.1', title: 'Enable Cloud Resource Manager API', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Enable resource management' },
      { id: 19, phase: 0, subPhase: '0.1', title: 'Navigate to Billing Budgets & Alerts', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Set up cost monitoring' },
      { id: 20, phase: 0, subPhase: '0.1', title: 'Create Budget Alert', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Configure spending alerts' },
      
      // Sub-Phase 0.2: Strategic Benefit Activation (Steps 21-35)
      { id: 21, phase: 0, subPhase: '0.2', title: 'Open Developer Program Benefits Page', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Access premium benefits portal' },
      { id: 22, phase: 0, subPhase: '0.2', title: 'Redeem $50 Gen AI Developer Credit', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Activate AI development credits' },
      { id: 23, phase: 0, subPhase: '0.2', title: 'Verify Credit Application in Billing', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Confirm credits applied' },
      { id: 24, phase: 0, subPhase: '0.2', title: 'Redeem 3 months of Google AI Pro', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Activate premium AI access' },
      { id: 25, phase: 0, subPhase: '0.2', title: 'Redeem Unlimited Google Cloud Skills Boost', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Enable learning platform' },
      { id: 26, phase: 0, subPhase: '0.2', title: 'Bookmark Learning Paths', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Save relevant courses' },
      { id: 27, phase: 0, subPhase: '0.2', title: 'Redeem Gemini Code Assist Standard', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Activate AI coding assistant' },
      { id: 28, phase: 0, subPhase: '0.2', title: 'Redeem 30 Firebase Studio workspaces', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Enable Firebase resources' },
      { id: 29, phase: 0, subPhase: '0.2', title: 'Secure Certification Voucher', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Save certification code' },
      { id: 30, phase: 0, subPhase: '0.2', title: 'Acknowledge Bonus Credit status', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Note $500 bonus potential' },
      { id: 31, phase: 0, subPhase: '0.2', title: 'Acknowledge Core Credit status', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Confirm $500 base credits' },
      { id: 32, phase: 0, subPhase: '0.2', title: 'Acknowledge Expert Consultation status', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Note consultation availability' },
      { id: 33, phase: 0, subPhase: '0.2', title: 'Open VS Code', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Launch development environment' },
      { id: 34, phase: 0, subPhase: '0.2', title: 'Install Gemini Extension', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Add AI coding extension' },
      { id: 35, phase: 0, subPhase: '0.2', title: 'Confirm Gemini Login', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Authenticate coding assistant' },
      
      // Sub-Phase 0.3: Local Environment Construction (Steps 36-60)
      { id: 36, phase: 0, subPhase: '0.3', title: 'Open PowerShell as Administrator', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Launch elevated terminal' },
      { id: 37, phase: 0, subPhase: '0.3', title: 'Generate & Store Secure Password for dev user', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Create secure credentials' },
      { id: 38, phase: 0, subPhase: '0.3', title: 'Create dev User', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Set up development account' },
      { id: 39, phase: 0, subPhase: '0.3', title: 'Grant Admin Privileges to dev user', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Configure permissions' },
      { id: 40, phase: 0, subPhase: '0.3', title: 'Enable dev User', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Activate account' },
      { id: 41, phase: 0, subPhase: '0.3', title: 'Log Out & Log In as dev user', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Switch to dev account' },
      { id: 42, phase: 0, subPhase: '0.3', title: 'Create Root Directory & Scripts Folder', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Set up project structure' },
      { id: 43, phase: 0, subPhase: '0.3', title: 'Create Folder Script', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Write directory creation script' },
      { id: 44, phase: 0, subPhase: '0.3', title: 'Execute Folder Script', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Run structure setup' },
      { id: 45, phase: 0, subPhase: '0.3', title: 'Verify Folder Structure', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Confirm directory tree' },
      { id: 46, phase: 0, subPhase: '0.3', title: 'Create Bootstrap Script', status: 'pending', timeEstimate: 10, timeSpent: 0, description: 'Write environment setup script' },
      { id: 47, phase: 0, subPhase: '0.3', title: 'Execute Bootstrap Script', status: 'pending', timeEstimate: 15, timeSpent: 0, description: 'Install development tools' },
      { id: 48, phase: 0, subPhase: '0.3', title: 'Restart PowerShell', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Reload environment' },
      { id: 49, phase: 0, subPhase: '0.3', title: 'Verify Installations', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Check all tools installed' },
      { id: 50, phase: 0, subPhase: '0.3', title: 'Configure Python environment', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Set up Python dev env' },
      { id: 51, phase: 0, subPhase: '0.3', title: 'Configure Node.js environment', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Set up Node.js env' },
      { id: 52, phase: 0, subPhase: '0.3', title: 'Configure Git global settings', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Set Git user config' },
      { id: 53, phase: 0, subPhase: '0.3', title: 'Install WSL2', status: 'pending', timeEstimate: 10, timeSpent: 0, description: 'Enable Linux subsystem' },
      { id: 54, phase: 0, subPhase: '0.3', title: 'Set WSL Default Version to 2', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Configure WSL version' },
      { id: 55, phase: 0, subPhase: '0.3', title: 'Launch Ubuntu & Create User', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Set up Ubuntu user' },
      { id: 56, phase: 0, subPhase: '0.3', title: 'Update Ubuntu packages', status: 'pending', timeEstimate: 10, timeSpent: 0, description: 'Update Linux packages' },
      { id: 57, phase: 0, subPhase: '0.3', title: 'Install Ollama in WSL', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Set up local LLM runner' },
      { id: 58, phase: 0, subPhase: '0.3', title: 'Pull Local Models (Llama3, Nomic-Embed)', status: 'pending', timeEstimate: 20, timeSpent: 0, description: 'Download AI models' },
      { id: 59, phase: 0, subPhase: '0.3', title: 'Start Ollama Server', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Launch model server' },
      { id: 60, phase: 0, subPhase: '0.3', title: 'Confirm Environment Readiness', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Final environment check' },
    ];

    const phase1Steps = [
      // Sub-Phase 1.1: Local Services & Version Control (Steps 61-75)
      { id: 61, phase: 1, subPhase: '1.1', title: 'Launch Docker Desktop', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Start container runtime' },
      { id: 62, phase: 1, subPhase: '1.1', title: 'Open Project in VS Code', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Load project workspace' },
      { id: 63, phase: 1, subPhase: '1.1', title: 'Create docker-compose.yml', status: 'pending', timeEstimate: 10, timeSpent: 0, description: 'Define service stack' },
      { id: 64, phase: 1, subPhase: '1.1', title: 'Launch all Docker containers', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Start service containers' },
      { id: 65, phase: 1, subPhase: '1.1', title: 'Verify Containers are running', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Check container health' },
      { id: 66, phase: 1, subPhase: '1.1', title: 'Test Database Connection', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Verify DB connectivity' },
      { id: 67, phase: 1, subPhase: '1.1', title: 'Initialize Git Repository', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Create git repo' },
      { id: 68, phase: 1, subPhase: '1.1', title: 'Create .gitignore file', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Configure ignored files' },
      { id: 69, phase: 1, subPhase: '1.1', title: 'Create README.md file', status: 'pending', timeEstimate: 10, timeSpent: 0, description: 'Write project documentation' },
      { id: 70, phase: 1, subPhase: '1.1', title: 'Make Initial Commit', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Commit initial files' },
      { id: 71, phase: 1, subPhase: '1.1', title: 'Create private GitHub Repository', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Set up remote repo' },
      { id: 72, phase: 1, subPhase: '1.1', title: 'Link local repo to remote', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Add remote origin' },
      { id: 73, phase: 1, subPhase: '1.1', title: 'Push to main branch', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Upload to GitHub' },
      { id: 74, phase: 1, subPhase: '1.1', title: 'Verify push on GitHub', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Check remote state' },
      { id: 75, phase: 1, subPhase: '1.1', title: 'Create and switch to develop branch', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Set up dev branch' },
      
      // Sub-Phase 1.2: Backend Application Scaffolding (Steps 76-105)
      { id: 76, phase: 1, subPhase: '1.2', title: 'Create Python Virtual Environment', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Set up Python venv' },
      { id: 77, phase: 1, subPhase: '1.2', title: 'Activate Python Virtual Environment', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Enter virtual env' },
      { id: 78, phase: 1, subPhase: '1.2', title: 'Create requirements.txt', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Define dependencies' },
      { id: 79, phase: 1, subPhase: '1.2', title: 'Populate requirements.txt', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'List all packages' },
      { id: 80, phase: 1, subPhase: '1.2', title: 'Install all Python dependencies', status: 'pending', timeEstimate: 10, timeSpent: 0, description: 'Install packages' },
      { id: 81, phase: 1, subPhase: '1.2', title: 'Create .env file', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Set up env vars' },
      { id: 82, phase: 1, subPhase: '1.2', title: 'Populate .env file', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Configure secrets' },
      { id: 83, phase: 1, subPhase: '1.2', title: 'Create backend/main.py', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Create main app file' },
      { id: 84, phase: 1, subPhase: '1.2', title: 'Scaffold FastAPI App in main.py', status: 'pending', timeEstimate: 15, timeSpent: 0, description: 'Build API structure' },
      { id: 85, phase: 1, subPhase: '1.2', title: 'Create backend/core/ directory', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Create core module' },
      { id: 86, phase: 1, subPhase: '1.2', title: 'Create backend/core/ai_gateway.py', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Create AI gateway file' },
      { id: 87, phase: 1, subPhase: '1.2', title: 'Implement AI Gateway class', status: 'pending', timeEstimate: 30, timeSpent: 0, description: 'Build AI integration' },
      { id: 88, phase: 1, subPhase: '1.2', title: 'Create backend/core/schemas.py', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Create schema file' },
      { id: 89, phase: 1, subPhase: '1.2', title: 'Define API Schemas in schemas.py', status: 'pending', timeEstimate: 15, timeSpent: 0, description: 'Define data models' },
      { id: 90, phase: 1, subPhase: '1.2', title: 'Integrate Gateway into main.py', status: 'pending', timeEstimate: 10, timeSpent: 0, description: 'Connect AI to API' },
      { id: 91, phase: 1, subPhase: '1.2', title: 'Run backend locally with uvicorn', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Start API server' },
      { id: 92, phase: 1, subPhase: '1.2', title: 'Test Health Endpoint', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Verify API health' },
      { id: 93, phase: 1, subPhase: '1.2', title: 'Test Docs Endpoint', status: 'pending', timeEstimate: 2, timeSpent: 0, description: 'Check API docs' },
      { id: 94, phase: 1, subPhase: '1.2', title: 'Test local chat endpoint (Ollama)', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Test local AI' },
      { id: 95, phase: 1, subPhase: '1.2', title: 'Test cloud chat endpoint (Gemini)', status: 'pending', timeEstimate: 5, timeSpent: 0, description: 'Test cloud AI' },
      { id: 96, phase: 1, subPhase: '1.2', title: 'Commit Backend API', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Save API progress' },
      { id: 97, phase: 1, subPhase: '1.2', title: 'Create backend/core/voice_pipeline.py', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Create voice module' },
      { id: 98, phase: 1, subPhase: '1.2', title: 'Scaffold Voice Pipeline class', status: 'pending', timeEstimate: 20, timeSpent: 0, description: 'Build voice system' },
      { id: 99, phase: 1, subPhase: '1.2', title: 'Create backend/core/db_models.py', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Create DB models file' },
      { id: 100, phase: 1, subPhase: '1.2', title: 'Scaffold DB Models with SQLAlchemy', status: 'pending', timeEstimate: 20, timeSpent: 0, description: 'Define database schema' },
      { id: 101, phase: 1, subPhase: '1.2', title: 'Create backend/agents/ directory', status: 'pending', timeEstimate: 1, timeSpent: 0, description: 'Create agents module' },
      { id: 102, phase: 1, subPhase: '1.2', title: 'Create backend/agents/master_agent.py', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Create master agent file' },
      { id: 103, phase: 1, subPhase: '1.2', title: 'Scaffold Master Agent with LangGraph', status: 'pending', timeEstimate: 30, timeSpent: 0, description: 'Build agent system' },
      { id: 104, phase: 1, subPhase: '1.2', title: 'Commit all Phase 1 scaffolding', status: 'pending', timeEstimate: 3, timeSpent: 0, description: 'Save all progress' },
      { id: 105, phase: 1, subPhase: '1.2', title: 'Take a break - Phase 1 Complete', status: 'pending', timeEstimate: 30, timeSpent: 0, description: 'Celebrate milestone!' },
    ];

    return [...phase0Steps, ...phase1Steps];
  }

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Calculate progress metrics
  const calculateMetrics = useMemo(() => {
    const completed = steps.filter(s => s.status === 'completed').length;
    const inProgress = steps.filter(s => s.status === 'in-progress').length;
    const phase0Steps = steps.filter(s => s.phase === 0);
    const phase1Steps = steps.filter(s => s.phase === 1);
    
    const phase0Progress = (phase0Steps.filter(s => s.status === 'completed').length / phase0Steps.length) * 100;
    const phase1Progress = (phase1Steps.filter(s => s.status === 'completed').length / phase1Steps.length) * 100;
    const overallProgress = (completed / steps.length) * 100;
    
    const totalTimeEstimate = steps.reduce((acc, step) => acc + step.timeEstimate, 0);
    const totalTimeSpent = steps.reduce((acc, step) => acc + step.timeSpent, 0);
    
    return {
      completed,
      inProgress,
      pending: steps.length - completed - inProgress,
      phase0Progress,
      phase1Progress,
      overallProgress,
      totalTimeEstimate,
      totalTimeSpent,
      efficiency: totalTimeSpent > 0 ? ((completed / steps.length) / (totalTimeSpent / totalTimeEstimate) * 100) : 100
    };
  }, [steps]);

  // Update step status
  const updateStepStatus = useCallback((stepId, newStatus) => {
    setSteps(prev => prev.map(step => {
      if (step.id === stepId) {
        const updatedStep = { ...step, status: newStatus };
        if (newStatus === 'completed' && step.timeSpent === 0) {
          updatedStep.timeSpent = step.timeEstimate;
        }
        // Check for achievements
        checkAchievements(updatedStep);
        return updatedStep;
      }
      return step;
    }));
  }, []);

  // Check for new achievements
  const checkAchievements = (completedStep) => {
    const completedCount = steps.filter(s => s.status === 'completed').length + 1;
    
    if (completedCount === 5 && !achievements.includes('starter')) {
      setAchievements(prev => [...prev, 'starter']);
      showNotification('Achievement Unlocked: Starter! 🎯');
    }
    if (completedCount === 20 && !achievements.includes('momentum')) {
      setAchievements(prev => [...prev, 'momentum']);
      showNotification('Achievement Unlocked: Building Momentum! 🚀');
    }
    if (completedStep.phase === 0 && steps.filter(s => s.phase === 0 && s.status === 'completed').length === 59) {
      setAchievements(prev => [...prev, 'phase0']);
      showNotification('Achievement Unlocked: Foundation Master! 🏗️');
    }
  };

  // Show notification (simplified)
  const showNotification = (message) => {
    // In a real app, this would show a toast notification
    console.log(message);
  };

  // Get AI insights
  const getAIInsights = async () => {
    setAiInsights("Focus on completing the current in-progress tasks. You're making good progress - keep the momentum going! Your efficiency rate shows you're working faster than estimated.");
  };

  // Toggle step expansion
  const toggleStepExpansion = (stepId) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  // Phase data for radar chart
  const phaseRadarData = [
    { metric: 'Progress', phase0: calculateMetrics.phase0Progress, phase1: calculateMetrics.phase1Progress },
    { metric: 'Time Efficiency', phase0: 85, phase1: 65 },
    { metric: 'Complexity', phase0: 60, phase1: 90 },
    { metric: 'Dependencies', phase0: 40, phase1: 80 },
    { metric: 'Risk Level', phase0: 30, phase1: 70 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Header 
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        sessionTime={sessionTime}
      />
      
      <MetricsDashboard 
        calculateMetrics={calculateMetrics}
        credits={credits}
        achievements={achievements}
      />
      
      <PhaseComparisonCharts 
        calculateMetrics={calculateMetrics}
        phaseRadarData={phaseRadarData}
      />
      
      <AIInsightsPanel 
        aiInsights={aiInsights}
        getAIInsights={getAIInsights}
      />
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <PhaseTabs 
          activePhase={activePhase}
          setActivePhase={setActivePhase}
          calculateMetrics={calculateMetrics}
        />
        
        <StepList 
          activePhase={activePhase}
          steps={steps}
          expandedSteps={expandedSteps}
          toggleStepExpansion={toggleStepExpansion}
          updateStepStatus={updateStepStatus}
          calculateMetrics={calculateMetrics}
        />
      </div>
      
      <Footer calculateMetrics={calculateMetrics} />
    </div>
  );
}

export default App;