import { useState, useEffect } from 'react';

/**
 * Custom hook to animate numbers with smooth counting effect
 * @param {number} targetValue - The target number to animate to
 * @param {number} duration - Animation duration in milliseconds (default: 800ms)
 * @param {number} startValue - Starting value (default: 0)
 * @returns {number} - The current animated value
 */
export const useAnimatedNumber = (targetValue, duration = 800, startValue = 0) => {
  const [currentValue, setCurrentValue] = useState(startValue);

  useEffect(() => {
    if (targetValue === startValue) {
      setCurrentValue(targetValue);
      return;
    }

    const startTime = Date.now();
    const difference = targetValue - startValue;

    const animateValue = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const nextValue = startValue + (difference * easeOutCubic);

      setCurrentValue(nextValue);

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      } else {
        setCurrentValue(targetValue);
      }
    };

    const animationFrame = requestAnimationFrame(animateValue);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [targetValue, duration, startValue]);

  return currentValue;
};