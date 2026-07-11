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
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
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
    <div className="flex items-center gap-2.5 rounded-full border border-white/60 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md transition-all hover:bg-white">
      <span className="text-lg leading-none">{icon}</span>
      <span className="whitespace-nowrap text-sm font-semibold text-[#0B0F1A]">{label}</span>
    </div>
  )
}

// ─── Abstract SVG Illustration ────────────────────────────────────────────────
function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-[650px]">
      {/* Main Card */}
      <div className="rounded-[32px] border border-white/80 bg-white/95 p-8 lg:p-10 shadow-[0_40px_120px_rgba(37,99,235,0.15)] backdrop-blur-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Growth Overview</p>
            <h3 className="mt-1 text-2xl font-bold text-[#0B0F1A]">
              Performance Dashboard
            </h3>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Live
          </div>
        </div>

        {/* Revenue */}
        <div className="mt-10">
          <p className="text-sm font-medium text-gray-500">Revenue Growth</p>
          <div className="mt-1 flex items-end gap-3">
            <h2 className="text-6xl lg:text-7xl font-extrabold tracking-tighter text-[#0B0F1A]">
              +247%
            </h2>
            <span className="mb-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
              This Year
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-10 flex h-48 lg:h-56 items-end gap-3 lg:gap-4">
          {[35, 52, 48, 66, 72, 88, 104, 96, 120, 140].map((h, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-full bg-gradient-to-t from-[#2563EB] to-[#7C3AED] transition-all duration-500 hover:opacity-80"
              style={{ height: `${h}%` }} // Changed to percentage for responsiveness
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 grid grid-cols-3 gap-3 lg:gap-4">
          {[
            { label: 'Leads', value: '4.8K' },
            { label: 'Conversion', value: '18%' },
            { label: 'SEO Score', value: '97' }
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl bg-[#F8FAFC] p-4 transition-colors hover:bg-[#F1F5F9]">
              <p className="text-xs font-medium text-gray-500">{stat.label}</p>
              <h4 className="mt-1 text-xl lg:text-2xl font-bold text-[#0B0F1A]">{stat.value}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Analytics Card */}
      <div className="absolute -left-6 lg:-left-16 top-10 w-48 lg:w-56 rounded-[24px] border border-white/70 bg-white/95 p-5 shadow-[0_25px_60px_rgba(37,99,235,0.15)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Organic Growth</p>
            <h3 className="mt-1 text-2xl lg:text-3xl font-bold text-[#16A34A]">+184%</h3>
          </div>
          <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl lg:rounded-2xl bg-green-100 text-lg lg:text-xl">
            📈
          </div>
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED]" style={{ width: '82%' }} />
        </div>
        <p className="mt-3 text-[10px] lg:text-xs font-medium text-gray-400 uppercase tracking-wide">Monthly performance</p>
      </div>

      {/* Floating Clients Card */}
      <div className="absolute -right-4 lg:-right-12 bottom-12 w-48 lg:w-56 rounded-[24px] border border-white/70 bg-white/95 p-5 shadow-[0_25px_60px_rgba(124,58,237,0.15)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Active Clients</p>
            <h3 className="mt-1 text-2xl lg:text-3xl font-bold text-[#2563EB]">240+</h3>
          </div>
          <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl lg:rounded-2xl bg-blue-100 text-lg lg:text-xl">
            🚀
          </div>
        </div>
        <div className="mt-4 flex gap-1">
          <span className="h-1.5 w-6 rounded-full bg-[#2563EB]" />
          <span className="h-1.5 w-4 rounded-full bg-[#60A5FA]" />
          <span className="h-1.5 w-10 rounded-full bg-[#7C3AED]" />
          <span className="h-1.5 flex-1 rounded-full bg-gray-100" />
        </div>
        <p className="mt-3 text-[10px] lg:text-xs font-medium text-gray-400 uppercase tracking-wide">Global portfolio</p>
      </div>
    </div>
  )
}

// ─── SVG dot-grid background ──────────────────────────────────────────────────
const DOT_GRID_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23374151' opacity='0.25'/%3E%3C/svg%3E`

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
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />

      {/* ── Container ── */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full py-24 md:py-32 lg:py-40">
        <div className="grid items-center gap-12 lg:gap-16 lg:min-h-[calc(100vh-100px)] lg:grid-cols-[1.1fr_0.9fr]">

          {/* ════ LEFT COLUMN ════ */}
          <motion.div
            className="flex flex-col items-start"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* ── Eyebrow badge ── */}
            <motion.div variants={fadeUp} className="mb-6 lg:mb-8">
              <span
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold',
                  'border border-[#4F46E5]/20 bg-white/70 backdrop-blur-md shadow-sm',
                  'text-[#4F46E5]'
                )}
                style={{
                  background: 'linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(124,58,237,0.08) 100%)',
                }}
              >
                <span className="animate-pulse">✦</span> Trusted By Businesses Worldwide
              </span>
            </motion.div>

            {/* ── Animated headline ── */}
            <motion.h1
              className="mb-6 max-w-[800px] font-extrabold tracking-tighter text-[#0B0F1A] leading-[1.05] text-5xl sm:text-6xl lg:text-[5rem]"
              variants={wordContainer}
              aria-label="Transforming Ideas Into Digital Success Stories"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {HEADLINE_LINES.map((line, lineIdx) => (
                <span key={lineIdx} className="block pb-1">
                  {line.split(' ').map((word, wordIdx) => (
                    <motion.span
                      key={wordIdx}
                      variants={wordReveal}
                      className={cn(
                        'mr-[0.25em] inline-block',
                        GRADIENT_WORDS.has(word)
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent'
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
              className="mb-10 max-w-[600px] text-lg lg:text-xl leading-relaxed text-gray-600"
            >
              We help ambitious businesses launch faster, generate qualified leads, and scale confidently through premium web development, performance marketing, and market intelligence.
            </motion.p>

            {/* ── CTA buttons ── */}
            <motion.div
              variants={staggerContainer}
              className="mb-12 flex flex-wrap items-center gap-4"
            >
              <motion.div variants={fadeUp}>
                <Link
                  href="/contact"
                  id="hero-cta-primary"
                  className={cn(
                    'group inline-flex items-center justify-center rounded-full px-8 py-4',
                    'text-base font-semibold text-white',
                    'transition-all duration-300 ease-in-out',
                    'shadow-[0_8px_24px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.4)] hover:-translate-y-1',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2'
                  )}
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  }}
                >
                  Start Your Project
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link
                  href="/work"
                  id="hero-cta-secondary"
                  className={cn(
                    'inline-flex items-center justify-center rounded-full border-2 border-[#0B0F1A] bg-transparent px-8 py-3.5',
                    'text-base font-semibold text-[#0B0F1A]',
                    'transition-all duration-300 ease-in-out',
                    'hover:bg-[#0B0F1A] hover:text-white hover:-translate-y-1 hover:shadow-lg',
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
              className="flex flex-wrap items-center gap-3 lg:gap-4"
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
            className="relative flex items-center justify-center w-full"
            variants={slideInRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.35 }}
          >
            {/* ── Radial gradient blobs (CSS only) ── */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center" aria-hidden="true">
              <div
                className="absolute -top-10 lg:-top-24 left-0 lg:left-8 h-64 w-64 lg:h-80 lg:w-80 rounded-full mix-blend-multiply blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
                }}
              />
              <div
                className="absolute bottom-0 right-0 h-64 w-64 lg:h-80 lg:w-80 rounded-full mix-blend-multiply blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
                }}
              />
            </div>

            {/* ── Floating visual wrapper ── */}
            <div className="animate-float relative z-10 w-full">
              <HeroDashboard />
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom fade gradient ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,1))',
        }}
        aria-hidden="true"
      />
    </section>
  )
}