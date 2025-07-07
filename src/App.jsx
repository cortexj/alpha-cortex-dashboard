import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus, Volume2, VolumeX } from 'lucide-react';

const FitnessTimer = () => {
  // Timer state
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [initialTime, setInitialTime] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  
  // Animation and visual state
  const [ripples, setRipples] = useState([]);
  const [particles, setParticles] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Refs
  const timerRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const audioContextRef = useRef(null);
  
  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, []);
  
  // Precise timer using requestAnimationFrame
  const updateTimer = useCallback(() => {
    if (isRunning && !isPaused && startTimeRef.current) {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const newTimeLeft = Math.max(0, initialTime - elapsed);
      
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft === 0) {
        setIsRunning(false);
        setIsCompleted(true);
        playCompletionSound();
        createParticleEffect();
        return;
      }
      
      animationRef.current = requestAnimationFrame(updateTimer);
    }
  }, [isRunning, isPaused, initialTime]);
  
  // Start timer
  const startTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
      setIsPaused(false);
      setIsCompleted(false);
      startTimeRef.current = Date.now() - (initialTime - timeLeft) * 1000;
      playBeepSound();
      animationRef.current = requestAnimationFrame(updateTimer);
    }
  };
  
  // Pause timer
  const pauseTimer = () => {
    setIsPaused(true);
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    playBeepSound();
  };
  
  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setIsCompleted(false);
    setTimeLeft(initialTime);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    playBeepSound();
  };
  
  // Adjust time
  const adjustTime = (minutes) => {
    if (!isRunning) {
      const newTime = Math.max(60, Math.min(3600, initialTime + minutes * 60));
      setInitialTime(newTime);
      setTimeLeft(newTime);
    }
  };
  
  // Audio feedback
  const playBeepSound = () => {
    if (!isSoundEnabled || !audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  };
  
  const playCompletionSound = () => {
    if (!isSoundEnabled || !audioContextRef.current) return;
    
    // Play a sequence of beeps
    [1000, 1200, 1000, 1200, 1000].forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContextRef.current.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3);
        
        oscillator.start();
        oscillator.stop(audioContextRef.current.currentTime + 0.3);
      }, index * 200);
    });
  };
  
  // Ripple effect
  const createRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };
  
  // Particle effect for completion
  const createParticleEffect = () => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 1,
    }));
    
    setParticles(newParticles);
    
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 0.02,
        })).filter(particle => particle.life > 0)
      );
      
      if (particles.length > 0) {
        requestAnimationFrame(animateParticles);
      }
    };
    
    requestAnimationFrame(animateParticles);
  };
  
  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const progress = ((initialTime - timeLeft) / initialTime) * 100;
  
  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animation: `float 8s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      
      {/* Completion particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.life,
            transform: `scale(${particle.life})`,
          }}
        />
      ))}
      
      {/* Main container */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="relative">
          {/* Main timer card */}
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 transform-gpu">
            {/* 3D shadow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl transform translate-x-2 translate-y-2 -z-10 blur-sm" />
            
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-3xl transition-all duration-1000 ${
              isRunning ? 'shadow-2xl shadow-cyan-500/50 animate-pulse' : 'shadow-xl shadow-purple-500/30'
            }`} />
            
            {/* Timer display container */}
            <div className="relative z-10 text-center">
              {/* Time adjustment controls */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <button
                  onClick={() => adjustTime(-1)}
                  onMouseDown={createRipple}
                  disabled={isRunning}
                  className="relative overflow-hidden w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 disabled:from-gray-600 disabled:to-gray-700 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-110 active:scale-95 disabled:cursor-not-allowed"
                >
                  <Minus className="w-6 h-6 text-white mx-auto" />
                  {ripples.map(ripple => (
                    <span
                      key={ripple.id}
                      className="absolute bg-white/30 rounded-full animate-ping"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                      }}
                    />
                  ))}
                </button>
                
                <div className="text-white/80 font-medium">
                  Adjust Minutes
                </div>
                
                <button
                  onClick={() => adjustTime(1)}
                  onMouseDown={createRipple}
                  disabled={isRunning}
                  className="relative overflow-hidden w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 disabled:from-gray-600 disabled:to-gray-700 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-110 active:scale-95 disabled:cursor-not-allowed"
                >
                  <Plus className="w-6 h-6 text-white mx-auto" />
                  {ripples.map(ripple => (
                    <span
                      key={ripple.id}
                      className="absolute bg-white/30 rounded-full animate-ping"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                      }}
                    />
                  ))}
                </button>
              </div>
              
              {/* Circular progress indicator */}
              <div className="relative w-80 h-80 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 320 320">
                  {/* Background circle */}
                  <circle
                    cx="160"
                    cy="160"
                    r="140"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="160"
                    cy="160"
                    r="140"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 140}`}
                    strokeDashoffset={`${2 * Math.PI * 140 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-out"
                    style={{
                      filter: isRunning ? 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))' : 'none'
                    }}
                  />
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Timer display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-7xl font-bold text-white transition-all duration-300 ${
                      isRunning ? 'animate-pulse drop-shadow-2xl' : 'drop-shadow-xl'
                    }`} style={{
                      fontFamily: 'monospace',
                      textShadow: '0 0 30px rgba(255,255,255,0.5)',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                    }}>
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-white/60 text-lg mt-2 font-medium">
                      {isCompleted ? '🎉 Complete!' : isRunning ? 'Running...' : isPaused ? 'Paused' : 'Ready'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Control buttons */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={resetTimer}
                  onMouseDown={createRipple}
                  className="relative overflow-hidden w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 rounded-2xl shadow-2xl transform transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                  }}
                >
                  <RotateCcw className="w-8 h-8 text-white mx-auto" />
                  {ripples.map(ripple => (
                    <span
                      key={ripple.id}
                      className="absolute bg-white/30 rounded-full animate-ping"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                      }}
                    />
                  ))}
                </button>
                
                <button
                  onClick={isRunning || isPaused ? pauseTimer : startTimer}
                  onMouseDown={createRipple}
                  disabled={timeLeft === 0 && !isCompleted}
                  className="relative overflow-hidden w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 rounded-2xl shadow-2xl transform transition-all duration-200 hover:scale-110 active:scale-95 disabled:cursor-not-allowed"
                  style={{
                    filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.4))',
                  }}
                >
                  {isRunning ? (
                    <Pause className="w-10 h-10 text-white mx-auto" />
                  ) : (
                    <Play className="w-10 h-10 text-white mx-auto ml-1" />
                  )}
                  {ripples.map(ripple => (
                    <span
                      key={ripple.id}
                      className="absolute bg-white/30 rounded-full animate-ping"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                      }}
                    />
                  ))}
                </button>
                
                <button
                  onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                  onMouseDown={createRipple}
                  className="relative overflow-hidden w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 rounded-2xl shadow-2xl transform transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                  }}
                >
                  {isSoundEnabled ? (
                    <Volume2 className="w-8 h-8 text-white mx-auto" />
                  ) : (
                    <VolumeX className="w-8 h-8 text-white mx-auto" />
                  )}
                  {ripples.map(ripple => (
                    <span
                      key={ripple.id}
                      className="absolute bg-white/30 rounded-full animate-ping"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                      }}
                    />
                  ))}
                </button>
              </div>
              
              {/* Progress information */}
              <div className="mt-8 text-white/70 text-center">
                <div className="text-2xl font-bold mb-2">
                  {Math.round(progress)}% Complete
                </div>
                <div className="text-sm">
                  {formatTime(initialTime - timeLeft)} / {formatTime(initialTime)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default FitnessTimer;