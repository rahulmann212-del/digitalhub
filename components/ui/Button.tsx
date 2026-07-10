'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { motion, HTMLMotionProps } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  /** Open link in new tab (only used when `href` is provided) */
  external?: boolean;
  /** HTML id attribute for the button/anchor element */
  id?: string;
}

type ButtonProps = ButtonOwnProps;

// ---------------------------------------------------------------------------
// Style helpers
// ---------------------------------------------------------------------------

const sizeMap: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

const variantMap: Record<ButtonVariant, string> = {
  primary: [
    'text-white font-semibold',
    'bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)]',
    'shadow-[0_4px_24px_0_rgba(79,70,229,0.35)]',
    'hover:shadow-[0_8px_32px_0_rgba(79,70,229,0.55)]',
    'hover:brightness-110',
    'active:brightness-95 active:scale-[0.98]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  ].join(' '),

  secondary: [
    'text-[#0B0F1A] font-semibold',
    'bg-[#F8F9FC] border border-[#E5E7EB]',
    'hover:shadow-[0_8px_24px_0_rgba(11,15,26,0.10)]',
    'hover:-translate-y-0.5',
    'active:translate-y-0 active:shadow-none',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  ].join(' '),

  ghost: [
    'text-[#4F46E5] font-semibold',
    'bg-transparent',
    'hover:underline underline-offset-4',
    'active:opacity-70',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
  ].join(' '),

  outline: [
    'border-2 border-[#4F46E5] font-semibold',
    // Gradient text
    'bg-clip-text text-transparent',
    'bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)]',
    'hover:bg-[#4F46E5]/5',
    'active:bg-[#4F46E5]/10',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  ].join(' '),
};

const baseClasses = [
  'inline-flex items-center justify-center',
  'rounded-full',
  'transition-all duration-200',
  'select-none outline-none',
  'focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2',
].join(' ');

// ---------------------------------------------------------------------------
// Loading Spinner
// ---------------------------------------------------------------------------

function Spinner({ size }: { size: ButtonSize }) {
  const dim = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin shrink-0"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Button component
// ---------------------------------------------------------------------------

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      href,
      className = '',
      children,
      loading = false,
      leftIcon,
      rightIcon,
      onClick,
      type = 'button',
      disabled = false,
      external = false,
      id,
    },
    _ref
  ) {
    const classes = [
      baseClasses,
      sizeMap[size],
      variantMap[variant],
      loading ? 'cursor-wait' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const isDisabled = disabled || loading;

    const innerContent = (
      <>
        {loading ? (
          <Spinner size={size} />
        ) : leftIcon ? (
          <span className="shrink-0 leading-none">{leftIcon}</span>
        ) : null}
        {children && <span>{children}</span>}
        {!loading && rightIcon ? (
          <span className="shrink-0 leading-none">{rightIcon}</span>
        ) : null}
      </>
    );

    // Render as Next.js <Link> / <a> when href is provided
    if (href) {
      const linkProps = external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {};

      return (
        <motion.a
          id={id}
          whileTap={!isDisabled ? { scale: 0.97 } : undefined}
          className={classes}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          aria-disabled={isDisabled}
          {...linkProps}
        >
          <Link href={href} className="contents" {...linkProps}>
            {innerContent}
          </Link>
        </motion.a>
      );
    }

    return (
      <motion.button
        id={id}
        whileTap={!isDisabled ? { scale: 0.97 } : undefined}
        type={type}
        disabled={isDisabled}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        aria-busy={loading}
      >
        {innerContent}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
