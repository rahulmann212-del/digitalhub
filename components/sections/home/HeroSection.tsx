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

// ─── Abstract SVG Illustration ──────────────────────────────────
function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[480px]">
      {/* Main Card */}
      <div className="relative z-10 rounded-[24px] border border-white/80 bg-white/90 p-5 sm:p-6 lg:p-8 shadow-[0_20px_80px_rgba(37,99,235,0.12)] backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-gray-500">Growth Overview</p>
            <h3 className="mt-1 text-lg sm:text-xl font-bold text-[#0B0F1A]">Performance</h3>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-green-100/80 px-2 sm:px-2.5 py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-wide text-green-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            Live
          </div>
        </div>

        {/* Revenue */}
        <div className="mt-5 sm:mt-6">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500">Revenue Growth</p>
          <div className="mt-1 flex items-end gap-3">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[#0B0F1A]">
              +247%
            </h2>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6 sm:mt-8 flex h-28 sm:h-36 lg:h-44 items-end gap-1.5 sm:gap-2 lg:gap-3">
          {[35, 52, 48, 66, 72, 88, 104, 96, 120, 140].map((h, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-sm sm:rounded-t-md lg:rounded-t-full bg-gradient-to-t from-[#2563EB] to-[#7C3AED] transition-all duration-500 hover:opacity-80"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-5 sm:mt-6 grid grid-cols-3 gap-2 lg:gap-3">
          {[
            { label: 'Leads', value: '4.8K' },
            { label: 'Conv.', value: '18%' },
            { label: 'SEO', value: '97' }
          ].map((stat, i) => (
            <div key={i} className="rounded-lg sm:rounded-xl bg-[#F8FAFC]/80 p-2 sm:p-3 transition-colors hover:bg-white">
              <p className="text-[8px] sm:text-[10px] font-medium uppercase text-gray-500">{stat.label}</p>
              <h4 className="mt-0.5 text-sm sm:text-lg font-bold text-[#0B0F1A]">{stat.value}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Analytics Card */}
      <div className="absolute -left-2 top-4 sm:-left-4 lg:-left-10 lg:top-8 z-20 w-36 sm:w-40 lg:w-48 rounded-[16px] sm:rounded-[20px] border border-white/70 bg-white/95 p-3 sm:p-4 shadow-[0_15px_40px_rgba(37,99,235,0.12)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] sm:text-[10px] font-medium text-gray-500">Organic Growth</p>
            <h3 className="mt-0.5 text-lg sm:text-xl lg:text-2xl font-bold text-[#16A34A]">+184%</h3>
          </div>
          <div className="flex h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-green-100/80 text-xs sm:text-sm lg:text-base">
            📈
          </div>
        </div>
        <div className="mt-2 sm:mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED]" style={{ width: '82%' }} />
        </div>
      </div>

      {/* Floating Clients Card */}
      <div className="absolute -right-2 bottom-4 sm:-right-4 lg:-right-8 lg:bottom-8 z-20 w-36 sm:w-40 lg:w-48 rounded-[16px] sm:rounded-[20px] border border-white/70 bg-white/95 p-3 sm:p-4 shadow-[0_15px_40px_rgba(124,58,237,0.12)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] sm:text-[10px] font-medium text-gray-500">Active Clients</p>
            <h3 className="mt-0.5 text-lg sm:text-xl lg:text-2xl font-bold text-[#2563EB]">240+</h3>
          </div>
          <div className="flex h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-blue-100/80 text-xs sm:text-sm lg:text-base">
            🚀
          </div>
        </div>
        <div className="mt-2 sm:mt-3 flex gap-1">
          <span className="h-1 w-4 sm:w-5 rounded-full bg-[#2563EB]" />
          <span className="h-1 w-2 sm:w-3 rounded-full bg-[#60A5FA]" />
          <span className="h-1 w-6 sm:w-8 rounded-full bg-[#7C3AED]" />
          <span className="h-1 flex-1 rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-50px' })

  return (
    <section
      ref={sectionRef}
      id="hero"
      // Sirf overflow-hidden rakha hai taki background ke orbs section se bahar na nikle
      className="relative flex min-h-[80vh] w-full items-center overflow-hidden bg-[#FAFAFA]"
      aria-label="Hero section"
    >
      {/* ── BACKGROUND DESIGNS ── */}
      
      {/* 1. Modern Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 70%, transparent 100%)'
        }}
        aria-hidden="true"
      />

      {/* 2. Ambient Glowing Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-blue-400/20 mix-blend-multiply blur-[80px] lg:blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-purple-400/20 mix-blend-multiply blur-[80px] lg:blur-[120px]" aria-hidden="true" />

      {/* ── Container ── */}
      <div className="container relative z-10 mx-auto w-full px-4 py-16 sm:px-6 md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr]">

          {/* ════ LEFT COLUMN ════ */}
          <motion.div
            className="flex flex-col items-start"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* ── Eyebrow badge ── */}
            <motion.div variants={fadeUp} className="mb-4 sm:mb-5 lg:mb-6">
              <span
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold',
                  'border border-[#4F46E5]/15 bg-white/80 shadow-sm backdrop-blur-md',
                  'text-[#4F46E5]'
                )}
              >
                <span className="animate-pulse">✦</span> Trusted By Businesses Worldwide
              </span>
            </motion.div>

            {/* ── Animated headline ── */}
            <motion.h1
              className="mb-4 sm:mb-5 max-w-[700px] text-4xl sm:text-5xl lg:text-[4.2rem] font-extrabold leading-[1.1] tracking-tighter text-[#0B0F1A]"
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
              className="mb-6 sm:mb-8 max-w-[540px] text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600"
            >
              We help ambitious businesses launch faster, generate qualified leads, and scale confidently through premium web development, performance marketing, and market intelligence.
            </motion.p>

            {/* ── CTA buttons ── */}
            <motion.div
              variants={staggerContainer}
              className="mb-8 sm:mb-10 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <motion.div variants={fadeUp}>
                <Link
                  href="/contact"
                  className={cn(
                    'group inline-flex items-center justify-center rounded-full px-6 sm:px-7 py-3 sm:py-3.5',
                    'text-xs sm:text-sm font-semibold text-white',
                    'transition-all duration-300 ease-in-out',
                    'shadow-[0_8px_20px_rgba(37,99,235,0.2)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)]',
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
                    'inline-flex items-center justify-center rounded-full border border-gray-300 bg-white/50 px-6 sm:px-7 py-3 sm:py-3.5',
                    'text-xs sm:text-sm font-semibold text-[#0B0F1A] backdrop-blur-sm',
                    'transition-all duration-300 ease-in-out',
                    'hover:-translate-y-0.5 hover:border-[#0B0F1A] hover:bg-[#0B0F1A] hover:text-white hover:shadow-md',
                  )}
                >
                  View Our Work
                </Link>
              </motion.div>
            </motion.div>

            {/* ── Trust / Stats chips ── */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:gap-3"
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
            className="relative mt-8 flex w-full items-center justify-center lg:mt-0"
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
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-16 sm:h-24"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(250,250,250,1))',
        }}
        aria-hidden="true"
      />
    </section>
  )
}