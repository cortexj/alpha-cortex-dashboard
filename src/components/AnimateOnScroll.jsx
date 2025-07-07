import React, { useRef, useEffect, useState } from 'react';

/**
 * AnimateOnScroll component that triggers animations when elements enter the viewport
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements to animate
 * @param {string} props.animation - Animation class to apply (default: 'animate-fade-in-up')
 * @param {number} props.threshold - Intersection threshold (default: 0.1)
 * @param {number} props.delay - Animation delay in ms (default: 0)
 * @param {string} props.className - Additional CSS classes
 */
const AnimateOnScroll = ({ 
  children, 
  animation = 'animate-fade-in-up', 
  threshold = 0.1, 
  delay = 0,
  className = '',
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          // Apply delay if specified
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully visible
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, delay, isVisible]);

  const animationClass = isVisible ? animation : 'opacity-0 translate-y-4';
  const combinedClassName = `transition-all duration-500 ease-out ${animationClass} ${className}`;

  return (
    <div ref={elementRef} className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

export default AnimateOnScroll;