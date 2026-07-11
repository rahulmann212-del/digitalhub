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
      delayChildren: 0.15,
    },
  },
}

const wordReveal = {
  hidden: { opacity: 0, y: 20, clipPath: 'inset(100% 0 0 0)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const HEADLINE_LINES = [
  'Transforming Ideas',
  'Into Digital',
  'Success Stories'
]
const GRADIENT_WORDS = new Set(['Digital', 'Success', 'Stories'])

// ─── Stat Chip ────────────────────────────────────────────────────────────────
interface StatChipProps {
  icon: string
  label: string
}

function StatChip({ icon, label }: StatChipProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/60 px-3.5 py-1.5 shadow-sm backdrop-blur-md transition-all hover:bg-white/90">
      <span className="text-base leading-none">{icon}</span>
      <span className="whitespace-nowrap text-xs font-semibold text-[#0B0F1A]">{label}</span>
    </div>
  )
}

// ─── Abstract SVG Illustration (Scaled Down) ──────────────────────────────────
function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-[380px] lg:max-w-[500px]">
      {/* Main Card */}
      <div className="rounded-[24px] border border-white/80 bg-white/90 p-6 lg:p-8 shadow-[0_20px_80px_rgba(37,99,235,0.12)] backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Growth Overview</p>
            <h3 className="mt-1 text-xl font-bold text-[#0B0F1A]">Performance</h3>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-green-100/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </div>
        </div>

        {/* Revenue */}
        <div className="mt-6">
          <p className="text-xs font-medium text-gray-500">Revenue Growth</p>
          <div className="mt-1 flex items-end gap-3">
            <h2 className="text-5xl lg:text-6xl font-extrabold tracking-tighter text-[#0B0F1A]">
              +247%
            </h2>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-8 flex h-36 lg:h-44 items-end gap-2 lg:gap-3">
          {[35, 52, 48, 66, 72, 88, 104, 96, 120, 140].map((h, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-md lg:rounded-t-full bg-gradient-to-t from-[#2563EB] to-[#7C3AED] transition-all duration-500 hover:opacity-80"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-6 grid grid-cols-3 gap-2 lg:gap-3">
          {[
            { label: 'Leads', value: '4.8K' },
            { label: 'Conversion', value: '18%' },
            { label: 'SEO', value: '97' }
          ].map((stat, i) => (
            <div key={i} className="rounded-xl bg-[#F8FAFC]/80 p-3 transition-colors hover:bg-white">
              <p className="text-[10px] font-medium text-gray-500 uppercase">{stat.label}</p>
              <h4 className="mt-0.5 text-lg font-bold text-[#0B0F1A]">{stat.value}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Analytics Card */}
      <div className="absolute -left-4 lg:-left-12 top-8 w-40 lg:w-48 rounded-[20px] border border-white/70 bg-white/95 p-4 shadow-[0_15px_40px_rgba(37,99,235,0.12)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium text-gray-500">Organic Growth</p>
            <h3 className="mt-0.5 text-xl lg:text-2xl font-bold text-[#16A34A]">+184%</h3>
          </div>
          <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-xl bg-green-100/80 text-sm lg:text-base">
            📈
          </div>
        </div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED]" style={{ width: '82%' }} />
        </div>
      </div>

      {/* Floating Clients Card */}
      <div className="absolute -right-2 lg:-right-8 bottom-8 w-40 lg:w-48 rounded-[20px] border border-white/70 bg-white/95 p-4 shadow-[0_15px_40px_rgba(124,58,237,0.12)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium text-gray-500">Active Clients</p>
            <h3 className="mt-0.5 text-xl lg:text-2xl font-bold text-[#2563EB]">240+</h3>
          </div>
          <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-xl bg-blue-100/80 text-sm lg:text-base">
            🚀
          </div>
        </div>
        <div className="mt-3 flex gap-1">
          <span className="h-1 w-5 rounded-full bg-[#2563EB]" />
          <span className="h-1 w-3 rounded-full bg-[#60A5FA]" />
          <span className="h-1 w-8 rounded-full bg-[#7C3AED]" />
          <span className="h-1 flex-1 rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
  )
}

// ─── SVG dot-grid background (Made more subtle) ───────────────────────────────
const DOT_GRID_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='2' cy='2' r='1' fill='%2394A3B8' opacity='0.20'/%3E%3C/svg%3E`

// ─── Main component ───────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-50px' })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[80vh] w-full items-center overflow-hidden bg-[#FAFAFA]"
      aria-label="Hero section"
    >
      {/* ── Modern Corporate Background Gradients ── */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(239,246,255,0.7),_transparent_50%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(243,232,255,0.6),_transparent_50%)]" />
      
      {/* ── Subtle dot grid overlay ── */}
      <div 
        className="pointer-events-none absolute inset-0 z-0" 
        style={{
          backgroundImage: `url("${DOT_GRID_SVG}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '32px 32px',
        }} 
        aria-hidden="true" 
      />

      {/* ── Container ── */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full py-16 md:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr]">

          {/* ════ LEFT COLUMN ════ */}
          <motion.div
            className="flex flex-col items-start"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* ── Eyebrow badge ── */}
            <motion.div variants={fadeUp} className="mb-5 lg:mb-6">
              <span
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold',
                  'border border-[#4F46E5]/15 bg-white/80 backdrop-blur-md shadow-sm',
                  'text-[#4F46E5]'
                )}
              >
                <span className="animate-pulse">✦</span> Trusted By Businesses Worldwide
              </span>
            </motion.div>

            {/* ── Animated headline ── */}
            <motion.h1
              className="mb-5 max-w-[700px] font-extrabold tracking-tighter text-[#0B0F1A] leading-[1.1] text-4xl sm:text-5xl lg:text-[4.2rem]"
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
              className="mb-8 max-w-[540px] text-base lg:text-lg leading-relaxed text-gray-600"
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
                  className={cn(
                    'group inline-flex items-center justify-center rounded-full px-7 py-3.5',
                    'text-sm font-semibold text-white',
                    'transition-all duration-300 ease-in-out',
                    'shadow-[0_8px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] hover:-translate-y-0.5',
                  )}
                  style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                >
                  Start Your Project
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link
                  href="/work"
                  className={cn(
                    'inline-flex items-center justify-center rounded-full border border-gray-300 bg-white/50 px-7 py-3.5',
                    'text-sm font-semibold text-[#0B0F1A] backdrop-blur-sm',
                    'transition-all duration-300 ease-in-out',
                    'hover:border-[#0B0F1A] hover:bg-[#0B0F1A] hover:text-white hover:-translate-y-0.5 hover:shadow-md',
                  )}
                >
                  View Our Work
                </Link>
              </motion.div>
            </motion.div>

            {/* ── Trust / Stats chips ── */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap items-center gap-2.5 lg:gap-3"
            >
              {[
                { icon: '🏆', label: '150+ Projects' },
                { icon: '⭐', label: '98% Retention' },
                { icon: '🌍', label: '12 Countries' },
              ].map((chip) => (
                <motion.div key={chip.label} variants={fadeUp}>
                  <StatChip icon={chip.icon} label={chip.label} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ════ RIGHT COLUMN ════ */}
          <motion.div
            className="relative flex items-center justify-center w-full mt-8 lg:mt-0"
            variants={slideInRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            {/* ── Floating visual wrapper ── */}
            <div className="animate-float relative z-10 w-full">
              <HeroDashboard />
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom fade gradient ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(250,250,250,1))',
        }}
        aria-hidden="true"
      />
    </section>
  )
}