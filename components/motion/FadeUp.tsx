'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FadeUpProps {
  children: React.ReactNode;
  /** Delay before the animation starts (seconds, default: 0) */
  delay?: number;
  /** Animation duration in seconds (default: 0.6) */
  duration?: number;
  className?: string;
  /**
   * When true (default), the animation only plays once.
   * When false, it replays every time the element re-enters the viewport.
   */
  once?: boolean;
}

// ---------------------------------------------------------------------------
// FadeUp component
// ---------------------------------------------------------------------------

function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: FadeUpProps) {
  const prefersReducedMotion = useReducedMotion();

  // If the user prefers reduced motion, render children without any animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        // Custom spring-like cubic bezier for a crisp, premium feel
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        // Start animation when 20% of the element is in the viewport
        amount: 0.2,
      }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { FadeUp };
export type { FadeUpProps };
