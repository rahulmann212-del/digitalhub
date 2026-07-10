'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ─── Stats data ───────────────────────────────────────────────────────────────
interface Stat {
  id: string
  raw: number          // numeric target for counter
  suffix: string       // appended after raw ('+', '%', '/5', '')
  display: string      // displayed as-is when raw === 0 (e.g. '4.9/5')
  useDecimal: boolean  // whether to animate with one decimal place
  label: string
  description: string
}

const STATS: Stat[] = [
  {
    id: 'projects',
    raw: 150,
    suffix: '+',
    display: '',
    useDecimal: false,
    label: 'Projects Delivered',
    description: 'Shipped across 14 industries',
  },
  {
    id: 'retention',
    raw: 98,
    suffix: '%',
    display: '',
    useDecimal: false,
    label: 'Client Retention Rate',
    description: 'Partnerships that last for years',
  },
  {
    id: 'rating',
    raw: 4.9,
    suffix: '/5',
    display: '',
    useDecimal: true,
    label: 'Average Client Rating',
    description: 'Based on 200+ reviews',
  },
  {
    id: 'countries',
    raw: 12,
    suffix: '',
    display: '',
    useDecimal: false,
    label: 'Countries Served',
    description: 'Global reach, local expertise',
  },
]

// ─── useCountUp hook ──────────────────────────────────────────────────────────
function useCountUp(target: number, decimals: boolean, triggered: boolean, duration = 2000) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!triggered) return
    const startTime = performance.now()
    const startVal = 0

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startVal + (target - startVal) * eased
      setValue(decimals ? Math.round(current * 10) / 10 : Math.floor(current))
      if (progress < 1) requestAnimationFrame(tick)
      else setValue(target)
    }

    requestAnimationFrame(tick)
  }, [triggered, target, decimals, duration])

  return value
}

// ─── Stat item ────────────────────────────────────────────────────────────────
interface StatItemProps {
  stat: Stat
  triggered: boolean
  isLast: boolean
}

function StatItem({ stat, triggered, isLast }: StatItemProps) {
  const counted = useCountUp(stat.raw, stat.useDecimal, triggered)

  const displayValue = stat.useDecimal
    ? counted.toFixed(1) + stat.suffix
    : counted.toString() + stat.suffix

  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'relative flex flex-col items-center px-8 py-6 text-center',
        !isLast &&
          'after:absolute after:right-0 after:top-1/2 after:h-12 after:-translate-y-1/2 after:w-px after:bg-white/10 after:content-[""]'
      )}
    >
      {/* ── Big number ── */}
      <span
        className="block text-[56px] font-extrabold leading-none tracking-tight"
        style={{
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        aria-label={`${displayValue} ${stat.label}`}
      >
        {displayValue}
      </span>

      {/* ── Label ── */}
      <span className="mt-3 block text-base font-semibold text-[#94A3B8]">
        {stat.label}
      </span>

      {/* ── Description ── */}
      <span className="mt-1 block text-xs text-[#475569]">
        {stat.description}
      </span>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      id="metrics"
      className="section-padding relative overflow-hidden bg-[#0B0F1A]"
      aria-label="Agency metrics and statistics"
    >
      {/* ── Radial gradient orbs ── */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -right-24 -top-16 h-80 w-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Container ── */}
      <div className="container-xl relative z-10">

        {/* ── Headline block ── */}
        <motion.div
          className="mb-16 max-w-2xl"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]"
          >
            ✦ By The Numbers
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl"
          >
            Proven Track Record,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Measurable Results
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-lg leading-relaxed text-[#64748B]"
          >
            Every number here represents a real client, a real challenge, and a real outcome
            — delivered by our team.
          </motion.p>
        </motion.div>

        {/* ── Stats grid ── */}
        <motion.div
          className={cn(
            'grid grid-cols-2 gap-0 rounded-3xl border border-white/[0.06]',
            'bg-white/[0.03] backdrop-blur-sm md:grid-cols-4'
          )}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          role="list"
          aria-label="Agency statistics"
        >
          {STATS.map((stat, idx) => (
            <div key={stat.id} role="listitem">
              <StatItem
                stat={stat}
                triggered={inView}
                isLast={idx === STATS.length - 1}
              />
            </div>
          ))}
        </motion.div>

        {/* ── Bottom trust strip ── */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.55 }}
        >
          {[
            { icon: '🏅', text: 'ISO-Compliant Delivery' },
            { icon: '🔒', text: 'NDA-Protected Engagements' },
            { icon: '📊', text: 'Monthly ROI Reports' },
            { icon: '⚡', text: 'Agile Sprint Methodology' },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-sm text-[#475569]"
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
