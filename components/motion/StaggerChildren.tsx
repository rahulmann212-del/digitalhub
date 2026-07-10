'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StaggerChildrenProps {
  children: React.ReactNode;
  /**
   * Delay between each child animation in seconds (default: 0.08).
   */
  staggerDelay?: number;
  /**
   * Initial delay before the first child begins animating in seconds (default: 0.1).
   */
  delayChildren?: number;
  className?: string;
  /**
   * When true (default), animations only trigger once per page load.
   */
  once?: boolean;
}

// ---------------------------------------------------------------------------
// StaggerChildren component
// ---------------------------------------------------------------------------

function StaggerChildren({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.1,
  className,
  once = true,
}: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion();

  // Container variant: orchestrates child stagger timing
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        // Wait `delayChildren` seconds before starting child animations
        delayChildren,
        // Each subsequent child starts `staggerDelay` seconds after the previous
        staggerChildren: staggerDelay,
      },
    },
  };

  // Item variant consumed by direct children via Framer Motion's variant propagation
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  // If reduced motion is preferred, render children without orchestration
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount: 0.15,
      }}
      variants={containerVariants}
      className={className}
    >
      {/*
       * Wrap each child in a motion.div that inherits `itemVariants` from the
       * parent container so consumers don't need to add motion props to children.
       */}
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Also export the item variants so consumers can apply them manually if needed
const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export { StaggerChildren, staggerItemVariants };
export type { StaggerChildrenProps };
