import { useEffect, useRef, useCallback } from 'react';
import useMissionStore from '../store/useMissionStore';

/**
 * High-precision timer hook with Web Worker support and drift correction
 */
export const useHighPrecisionTimer = () => {
  const workerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastUpdateRef = useRef(0);
  
  const {
    timer,
    startTimer,
    pauseTimer,
    updateSessionTime,
  } = useMissionStore();
  
  // Initialize Web Worker for background timing
  const initializeWorker = useCallback(() => {
    if (!workerRef.current) {
      // Create inline worker to avoid external file dependency
      const workerScript = `
        let intervalId;
        let startTime;
        let isRunning = false;
        
        self.onmessage = function(e) {
          const { action, timestamp } = e.data;
          
          switch (action) {
            case 'start':
              if (!isRunning) {
                startTime = timestamp || performance.now();
                isRunning = true;
                intervalId = setInterval(() => {
                  if (isRunning) {
                    const elapsed = performance.now() - startTime;
                    self.postMessage({ 
                      type: 'tick', 
                      elapsed: Math.floor(elapsed),
                      timestamp: performance.now()
                    });
                  }
                }, 100); // 100ms precision
              }
              break;
              
            case 'pause':
              isRunning = false;
              if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
              }
              break;
              
            case 'reset':
              isRunning = false;
              if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
              }
              startTime = null;
              break;
          }
        };
      `;
      
      const blob = new Blob([workerScript], { type: 'application/javascript' });
      workerRef.current = new Worker(URL.createObjectURL(blob));
      
      workerRef.current.onmessage = (e) => {
        const { type, elapsed } = e.data;
        if (type === 'tick' && timer.isRunning) {
          const currentTime = Math.floor(elapsed / 1000); // Convert to seconds
          updateSessionTime(currentTime + Math.floor(timer.pausedTime / 1000));
        }
      };
    }
  }, [timer.isRunning, timer.pausedTime, updateSessionTime]);
  
  // High-precision animation frame timer for UI updates
  const updateTimer = useCallback(() => {
    if (timer.isRunning && timer.startTime) {
      const now = performance.now();
      const elapsed = now - timer.startTime;
      const currentTime = Math.floor(elapsed / 1000) + Math.floor(timer.pausedTime / 1000);
      
      // Only update if time has actually changed (avoid unnecessary renders)
      if (currentTime !== lastUpdateRef.current) {
        updateSessionTime(currentTime);
        lastUpdateRef.current = currentTime;
      }
      
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }
  }, [timer.isRunning, timer.startTime, updateSessionTime]);
  
  // Start timer function
  const handleStartTimer = useCallback(() => {
    const now = performance.now();
    startTimer();
    initializeWorker();
    
    if (workerRef.current) {
      workerRef.current.postMessage({
        action: 'start',
        timestamp: now - timer.pausedTime
      });
    }
    
    // Start animation frame updates for smooth UI
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  }, [startTimer, initializeWorker, timer.pausedTime, updateTimer]);
  
  // Pause timer function
  const handlePauseTimer = useCallback(() => {
    pauseTimer();
    
    if (workerRef.current) {
      workerRef.current.postMessage({ action: 'pause' });
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [pauseTimer]);
  
  // Toggle timer function
  const toggleTimer = useCallback(() => {
    if (timer.isRunning) {
      handlePauseTimer();
    } else {
      handleStartTimer();
    }
  }, [timer.isRunning, handleStartTimer, handlePauseTimer]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.postMessage({ action: 'reset' });
        workerRef.current.terminate();
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  return {
    isRunning: timer.isRunning,
    sessionTime: timer.sessionTime,
    toggleTimer,
    startTimer: handleStartTimer,
    pauseTimer: handlePauseTimer,
  };
};