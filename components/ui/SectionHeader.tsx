'use client';

import React, { Fragment } from 'react';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SectionHeaderProps {
  /** Small label shown above the title, e.g. "Our Services" */
  eyebrow?: string;
  /**
   * Main heading text. Wrap a word in **double asterisks** to apply the
   * brand gradient treatment, e.g. "Building **Digital** Futures"
   */
  title: string;
  /** Supporting text shown below the title */
  subtitle?: string;
  /** Text alignment (default: 'center') */
  align?: 'left' | 'center' | 'right';
  /** Tailwind max-width class applied to the wrapper (default: 'max-w-3xl') */
  maxWidth?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const alignMap: Record<NonNullable<SectionHeaderProps['align']>, string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
};

/**
 * Parses a string and replaces **word** segments with a gradient-styled <span>.
 * Returns an array of React nodes.
 */
function parseGradientTitle(title: string): React.ReactNode[] {
  // Split on **…** boundaries, keeping the captured groups
  const parts = title.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const word = part.slice(2, -2);
      return (
        <span
          key={index}
          className="bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)] bg-clip-text text-transparent"
        >
          {word}
        </span>
      );
    }
    // Plain text segment
    return <Fragment key={index}>{part}</Fragment>;
  });
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  }),
};

// ---------------------------------------------------------------------------
// SectionHeader component
// ---------------------------------------------------------------------------

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  maxWidth = 'max-w-3xl',
  className = '',
}: SectionHeaderProps) {
  const alignClass = alignMap[align];

  return (
    <div
      className={[
        'flex flex-col w-full mx-auto',
        maxWidth,
        alignClass,
        'gap-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0}
          variants={fadeUpVariant}
          className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]"
        >
          {/* Decorative sparkle prefix */}
          <span aria-hidden="true" className="text-[#7C3AED]">
            ✦
          </span>
          {eyebrow}
        </motion.p>
      )}

      {/* Title */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={eyebrow ? 0.1 : 0}
        variants={fadeUpVariant}
        className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight text-[#0B0F1A]"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {parseGradientTitle(title)}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={eyebrow ? 0.2 : 0.1}
          variants={fadeUpVariant}
          className="text-lg leading-relaxed text-[#6B7280] max-w-2xl"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export { SectionHeader };
export type { SectionHeaderProps };
