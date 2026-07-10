'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCountUpOptions {
  /** The target number to count up to */
  end: number;
  /** Animation duration in milliseconds (default: 2000) */
  duration?: number;
  /** Starting number (default: 0) */
  start?: number;
  /** Number of decimal places to display (default: 0) */
  decimals?: number;
}

interface UseCountUpReturn {
  /** Current animated count value, formatted to the requested decimal places */
  count: string;
  /** Attach this ref to the element that should trigger the count-up on visibility */
  ref: React.RefObject<HTMLElement | null>;
}

/**
 * Cubic ease-out easing function.
 * t: normalised time [0, 1]
 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Starts counting from `start` to `end` over `duration` ms when the target
 * element enters the viewport. Uses IntersectionObserver + requestAnimationFrame
 * for smooth, GPU-friendly animation.
 */
export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
}: UseCountUpOptions): UseCountUpReturn {
  const [count, setCount] = useState<string>(start.toFixed(decimals));
  const ref = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef<boolean>(false);
  const rafId = useRef<number | null>(null);

  const animate = useCallback(() => {
    let startTime: number | null = null;
    const range = end - start;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = start + range * easedProgress;

      setCount(current.toFixed(decimals));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(step);
      } else {
        // Guarantee we land on the exact end value
        setCount(end.toFixed(decimals));
      }
    };

    rafId.current = requestAnimationFrame(step);
  }, [end, start, duration, decimals]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
          // Once triggered, disconnect so re-scrolling doesn't restart the animation
          observer.disconnect();
        }
      },
      {
        // Start counting when at least 20% of the element is visible
        threshold: 0.2,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [animate]);

  return { count, ref };
}
