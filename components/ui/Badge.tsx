'use client';

import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type BadgeVariant = 'default' | 'gradient' | 'success' | 'warning' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Optional leading icon */
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Style maps
// ---------------------------------------------------------------------------

const sizeMap: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-xs gap-1',
  md: 'px-3.5 py-1 text-sm gap-1.5',
};

const variantMap: Record<BadgeVariant, string> = {
  default: [
    'bg-[#F3F4F6] text-[#374151]',
    'border border-[#E5E7EB]',
  ].join(' '),

  gradient: [
    // Soft violet/indigo tint background
    'bg-[linear-gradient(135deg,rgba(37,99,235,0.08)_0%,rgba(124,58,237,0.12)_100%)]',
    // Gradient text
    'text-transparent bg-clip-text',
    'bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)]',
    // Gradient border via outline trick
    'border border-transparent',
    'outline outline-1 outline-[#7C3AED]/30',
    'shadow-[inset_0_0_0_1px_rgba(79,70,229,0.2)]',
  ].join(' '),

  success: [
    'bg-[#ECFDF5] text-[#065F46]',
    'border border-[#6EE7B7]',
  ].join(' '),

  warning: [
    'bg-[#FFFBEB] text-[#92400E]',
    'border border-[#FCD34D]',
  ].join(' '),

  info: [
    'bg-[#EFF6FF] text-[#1D4ED8]',
    'border border-[#BFDBFE]',
  ].join(' '),
};

// ---------------------------------------------------------------------------
// Badge component
// ---------------------------------------------------------------------------

function Badge({
  variant = 'default',
  size = 'md',
  icon,
  className = '',
  children,
}: BadgeProps) {
  const classes = [
    'inline-flex items-center justify-center',
    'rounded-full',
    'font-semibold leading-none',
    'whitespace-nowrap',
    sizeMap[size],
    variantMap[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {icon && (
        <span className="shrink-0 leading-none [&>svg]:w-[1em] [&>svg]:h-[1em]">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps, BadgeVariant, BadgeSize };
