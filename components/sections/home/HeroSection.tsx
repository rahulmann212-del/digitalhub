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
const GRADIENT_WORDS = new Set([
  'Digital',
  'Success',
  'Stories',
])

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
function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-[650px] xl:max-w-[700px]">

      {/* Main Card */}
      <div className="rounded-[36px] border border-white/80 bg-white/95 p-9 xl:p-10 shadow-[0_40px_120px_rgba(37,99,235,0.20)] backdrop-blur-2xl">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Growth Overview</p>
            <h3 className="mt-1 text-2xl font-bold text-[#0B0F1A]">
              Performance Dashboard
            </h3>
          </div>

          <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Live
          </div>
        </div>

        {/* Revenue */}
        <div className="mt-8 flex items-center justify-between">

  <div>
    <p className="text-sm text-gray-500">
      Annual Revenue
    </p>

    <h2 className="mt-2 text-5xl font-extrabold text-[#0B0F1A]">
      $1.84M
    </h2>

    <p className="mt-2 text-sm font-semibold text-green-600">
      ▲ 38.4% vs last year
    </p>
  </div>

  <div className="relative h-28 w-28">

    <svg
      viewBox="0 0 120 120"
      className="h-full w-full -rotate-90"
    >
      <circle
        cx="60"
        cy="60"
        r="48"
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="10"
      />

      <circle
        cx="60"
        cy="60"
        r="48"
        fill="none"
        stroke="#2563EB"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="302"
        strokeDashoffset="58"
      />
    </svg>

    <div className="absolute inset-0 flex items-center justify-center">

      <span className="text-xl font-bold">
        81%
      </span>

    </div>

  </div>

</div>

        {/* Chart */}
        <div className="mt-10 flex h-56 items-end gap-4">

          {[35,52,48,66,72,88,104,96,120,140].map((h,index)=>(
            <div
              key={index}
              className="flex-1 rounded-t-full bg-gradient-to-t from-[#2563EB] to-[#7C3AED]"
              style={{height:h}}
            />
          ))}

        </div>

        {/* Bottom Stats */}

        <div className="mt-8 grid grid-cols-3 gap-4">

          <div className="rounded-2xl bg-[#F8FAFC] p-4">
            <p className="text-xs text-gray-500">
              Leads
            </p>

            <h4 className="mt-2 text-2xl font-bold">
              4.8K
            </h4>
          </div>

          <div className="rounded-2xl bg-[#F8FAFC] p-4">
            <p className="text-xs text-gray-500">
              Conversion
            </p>

            <h4 className="mt-2 text-2xl font-bold">
              18%
            </h4>
          </div>

          <div className="rounded-2xl bg-[#F8FAFC] p-4">
            <p className="text-xs text-gray-500">
              SEO Score
            </p>

            <h4 className="mt-2 text-2xl font-bold">
              97
            </h4>
          </div>

        </div>

      </div>

      {/* Floating Card */}

      <div className="absolute -left-12 top-16 rounded-3xl bg-white p-5 shadow-xl">

        <p className="text-xs text-gray-500">
          Organic Traffic
        </p>

        <h3 className="mt-2 text-3xl font-bold text-green-600">
          +184%
        </h3>

      </div>

      {/* Floating Card */}

      <div className="absolute -right-10 bottom-10 rounded-3xl bg-white p-5 shadow-xl">

        <p className="text-xs text-gray-500">
          Active Users
        </p>

        <h3 className="mt-2 text-3xl font-bold text-[#2563EB]">
          24K
        </h3>

      </div>

    </div>
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
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#FFFFFF]"
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
      <div className="container-xl relative z-10 w-full py-20 md:py-24 lg:py-16">
        <div className="grid items-center gap-16 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[1.1fr_0.9fr]">

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
                ✦ Trusted By Businesses Worldwide
              </span>
            </motion.div>

            {/* ── Animated headline ── */}
            <motion.h1
              className="mb-8 overflow-hidden max-w-[760px]"
              variants={wordContainer}
              style={{
  fontSize: 'clamp(54px, 7vw, 82px)',
  fontWeight: 800,
  lineHeight: 1.08,
  letterSpacing: '-0.04em',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
}}
              aria-label="Transforming Ideas Into Digital Success Stories"
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
              className="mb-10 max-w-[620px] text-lg leading-8 text-[#6B7280]"
            >
              We help ambitious businesses launch faster, generate qualified leads, and scale confidently through premium web development, performance marketing, and market intelligence.
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
                  Start Your Project
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
                  View Our Work
                </Link>
              </motion.div>
            </motion.div>

            {/* ── Trust / Stats chips ── */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap items-center gap-3"
            >
              {[
  { icon: '🏆', label: '150+ Projects Delivered' },
  { icon: '⭐', label: '98% Client Retention' },
  { icon: '🌍', label: '12 Countries Served' },
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
            <div className="animate-float relative z-10 w-full max-w-[560px]">
              {/* Main SVG Illustration */}
              <HeroDashboard />
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
