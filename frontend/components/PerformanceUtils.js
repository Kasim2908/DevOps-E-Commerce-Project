"use client";

import { useState, useEffect, useRef } from 'react';

// Lazy Loading Hook
export const useLazyLoading = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

// Optimized Image Component
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'blur',
  width,
  height,
  priority = false 
}) => {
  const [ref, isVisible] = useLazyLoading();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 animate-pulse" />
      )}
      
      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
          <span className="text-gray-400 text-4xl">🖼️</span>
        </div>
      )}
      
      {/* Actual Image */}
      {(isVisible || priority) && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
};

// Performance Monitor Component
export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    // Measure page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    
    // Measure render time
    const renderTime = performance.now();
    
    // Get memory usage (if available)
    const memoryUsage = performance.memory ? performance.memory.usedJSHeapSize / 1024 / 1024 : 0;
    
    setMetrics({
      loadTime: Math.round(loadTime),
      renderTime: Math.round(renderTime),
      memoryUsage: Math.round(memoryUsage * 100) / 100
    });
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div>Load: {metrics.loadTime}ms</div>
      <div>Render: {metrics.renderTime}ms</div>
      <div>Memory: {metrics.memoryUsage}MB</div>
    </div>
  );
};

// Debounce Hook for Search
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Local Storage Hook
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};