'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer, slideInRight } from '@/lib/animations'

// ─── Word-by-word headline animation variants ─────────────────────────────────
const wordContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.25,
    },
  },
}

const wordReveal = {
  hidden: { opacity: 0, y: 32, clipPath: 'inset(100% 0 0 0)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
}

// Headline split: last two words get gradient treatment
const HEADLINE_LINES = [
  'Transforming Ideas',
  'Into Digital',
  'Success Stories'
]
const GRADIENT_WORDS = new Set(['Real', 'Growth'])

// ─── Stat Chip ────────────────────────────────────────────────────────────────
interface StatChipProps {
  icon: string
  label: string
}

function StatChip({ icon, label }: StatChipProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
      <span className="text-base leading-none">{icon}</span>
      <span className="whitespace-nowrap text-sm font-semibold text-[#374151]">{label}</span>
    </div>
  )
}

// ─── Abstract SVG Illustration ────────────────────────────────────────────────
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="grad-soft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="grad-arc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="grad-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="glow-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <circle cx="260" cy="260" r="240" fill="url(#glow-center)" />

      {/* Large primary circle */}
      <circle cx="260" cy="260" r="180" fill="url(#grad-main)" opacity="0.92" />

      {/* Soft overlapping circles */}
      <circle cx="360" cy="160" r="110" fill="url(#grad-soft)" />
      <circle cx="140" cy="370" r="130" fill="url(#grad-soft)" />
      <circle cx="390" cy="350" r="80" fill="url(#grad-arc)" opacity="0.55" />

      {/* Outer ring */}
      <circle
        cx="260"
        cy="260"
        r="210"
        stroke="url(#grad-ring)"
        strokeWidth="1.5"
        strokeDasharray="8 6"
      />
      <circle
        cx="260"
        cy="260"
        r="240"
        stroke="url(#grad-ring)"
        strokeWidth="1"
        strokeDasharray="4 8"
        opacity="0.5"
      />

      {/* Arc curves */}
      <path
        d="M 60 260 Q 160 80 320 100"
        stroke="url(#grad-arc)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M 200 460 Q 380 440 440 280"
        stroke="url(#grad-arc)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />

      {/* Small accent circles */}
      <circle cx="80" cy="160" r="18" fill="#2563EB" opacity="0.35" />
      <circle cx="440" cy="420" r="14" fill="#7C3AED" opacity="0.4" />
      <circle cx="460" cy="160" r="10" fill="#4F46E5" opacity="0.5" />
      <circle cx="110" cy="400" r="8" fill="#7C3AED" opacity="0.3" />

      {/* Inner highlight circle */}
      <circle cx="220" cy="220" r="70" fill="white" opacity="0.06" />

      {/* Dot grid pattern */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => {
          const x = 30 + col * 64
          const y = 30 + row * 64
          const dist = Math.sqrt((x - 260) ** 2 + (y - 260) ** 2)
          if (dist < 160 || dist > 270) return null
          return (
            <circle
              key={`${row}-${col}`}
              cx={x}
              cy={y}
              r="2.5"
              fill="#94A3B8"
              opacity="0.22"
            />
          )
        })
      )}

      {/* White sparkle / star overlay */}
      <circle cx="260" cy="260" r="12" fill="white" opacity="0.18" />
      <circle cx="260" cy="260" r="5" fill="white" opacity="0.55" />
    </svg>
  )
}
// ─── SVG dot-grid background ──────────────────────────────────────────────────
const DOT_GRID_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23374151' opacity='0.35'/%3E%3C/svg%3E`

// ─── Main component ───────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[780px] w-full items-center overflow-hidden bg-[#FFFFFF]"
      aria-label="Hero section"
      style={{
        backgroundImage: `url("${DOT_GRID_SVG}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '24px 24px',
      }}
    >
      {/* ── Subtle dot grid overlay at low opacity ── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true" />

      {/* ── Container ── */}
      <div className="container-xl relative z-10 w-full py-24 lg:py-0">
        <div className="grid min-h-[780px] grid-cols-1 items-center gap-12 lg:grid-cols-[55fr_45fr]">

          {/* ════ LEFT COLUMN ════ */}
          <motion.div
            className="flex flex-col items-start"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >

            {/* ── Eyebrow badge ── */}
            <motion.div variants={fadeUp} className="mb-6">
              <span
                className={cn(
                  'glass eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2',
                  'border border-[#4F46E5]/20 bg-white/70 backdrop-blur-sm',
                  'text-[#4F46E5]'
                )}
                style={{
                  background: 'linear-gradient(135deg, rgba(79,70,229,0.06) 0%, rgba(124,58,237,0.06) 100%)',
                }}
              >
                ✦ Strategy • Design • Technology
              </span>
            </motion.div>

            {/* ── Animated headline ── */}
            <motion.h1
              className="mb-6 overflow-hidden"
              variants={wordContainer}
              style={{
                fontSize: 'clamp(48px, 7vw, 88px)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              aria-label="We Build Digital Products That Drive Real Growth"
            >
              {HEADLINE_LINES.map((line, lineIdx) => (
                <span key={lineIdx} className="block">
                  {line.split(' ').map((word, wordIdx) => (
                    <motion.span
                      key={wordIdx}
                      variants={wordReveal}
                      className={cn(
                        'mr-[0.22em] inline-block',
                        GRADIENT_WORDS.has(word)
                          ? 'gradient-brand-text'
                          : 'text-[#0B0F1A]'
                      )}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            {/* ── Subheadline ── */}
            <motion.p
              variants={fadeUp}
              className="mb-10 max-w-[500px] text-[18px] leading-relaxed text-[#6B7280]"
            >
              We design exceptional digital experiences that help ambitious brands grow faster, attract the right customers, and build long term competitive advantage through strategy, technology, and measurable execution.
            </motion.p>

            {/* ── CTA buttons ── */}
            <motion.div
              variants={staggerContainer}
              className="mb-10 flex flex-wrap items-center gap-4"
            >
              <motion.div variants={fadeUp}>
                <Link
                  href="/contact"
                  id="hero-cta-primary"
                  className={cn(
                    'inline-flex items-center rounded-full px-8 py-4',
                    'text-base font-semibold text-white',
                    'shadow-[0_8px_32px_rgba(37,99,235,0.35)]',
                    'transition-all duration-300 hover:shadow-[0_12px_40px_rgba(37,99,235,0.50)] hover:scale-105',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2'
                  )}
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  }}
                >
                  Book Free Strategy Call
                </Link>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link
                  href="/work"
                  id="hero-cta-secondary"
                  className={cn(
                    'inline-flex items-center rounded-full border-2 border-[#0B0F1A] px-8 py-[14px]',
                    'text-base font-semibold text-[#0B0F1A]',
                    'transition-all duration-300 hover:bg-[#0B0F1A] hover:text-white hover:scale-105',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B0F1A] focus-visible:ring-offset-2'
                  )}
                >
                  Explore Case Studies
                </Link>
              </motion.div>
            </motion.div>

            {/* ── Trust / Stats chips ── */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap items-center gap-3"
            >
              {[
                { icon: '🚀', label: '250+ Successful Projects' },
                { icon: '🌎', label: 'Clients Across 20+ Countries' },
                { icon: '💙', label: 'Trusted by Fast Growing Brands' },
              ].map((chip) => (
                <motion.div key={chip.label} variants={fadeUp}>
                  <StatChip icon={chip.icon} label={chip.label} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ════ RIGHT COLUMN ════ */}
          <motion.div
            className="relative flex items-center justify-center"
            variants={slideInRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.35 }}
          >
            {/* ── Radial gradient blobs (CSS only) ── */}
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
              <div
                className="absolute -top-24 left-8 h-72 w-72 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
                }}
              />
              <div
                className="absolute bottom-0 right-0 h-80 w-80 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
                }}
              />
              <div
                className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 70%)',
                }}
              />
            </div>

            {/* ── Floating visual wrapper ── */}
            <div className="animate-float relative z-10 h-[420px] w-[420px] md:h-[500px] md:w-[500px]">
              {/* Main SVG Illustration */}
              <HeroIllustration />
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom fade gradient ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.85))',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
