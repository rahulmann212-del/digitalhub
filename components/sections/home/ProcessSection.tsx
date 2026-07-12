'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Map, Layers, Rocket, BarChart } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const steps = [
  {
    number: '01',
    title: 'Discovery & Audit',
    description:
      'We dive deep into your business, competitors, current performance, and goals. You get a comprehensive audit report before we begin.',
    duration: 'Wk 1–2',
    Icon: Search,
  },
  {
    number: '02',
    title: 'Strategy & Planning',
    description:
      'Data shapes the plan. We deliver a full project roadmap, content plan, and success metrics before writing a single line of code.',
    duration: 'Wk 2–3',
    Icon: Map,
  },
  {
    number: '03',
    title: 'Design & Development',
    description:
      'Our designers and engineers collaborate in sprints. You review progress every two weeks with live staging access throughout.',
    duration: 'Wk 3–8',
    Icon: Layers,
  },
  {
    number: '04',
    title: 'Testing & Launch',
    description:
      'QA, performance audits, cross-browser testing, and soft-launch to a test audience before full production deployment.',
    duration: 'Wk 8–10',
    Icon: Rocket,
  },
  {
    number: '05',
    title: 'Growth & Optimisation',
    description:
      'Launch is day one, not the finish line. Monthly strategy calls, A/B testing, and data-driven iterations keep you ahead.',
    duration: 'Ongoing',
    Icon: BarChart,
  },
] as const

// ---------------------------------------------------------------------------
// StepCard
// ---------------------------------------------------------------------------

function StepCard({
  step,
  index,
  isActive,
  onClick,
}: {
  step: (typeof steps)[number]
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const { number, title, description, duration, Icon } = step

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onClick={onClick}
      className={cn(
        'group relative flex h-full cursor-pointer select-none flex-col rounded-[24px] p-6 lg:p-8',
        'border transition-all duration-300',
        isActive
          ? 'z-10 scale-[1.02] border-blue-500/40 bg-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)]'
          : 'border-slate-200/70 bg-slate-100 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md'
      )}
    >
      {/* ── Number & Icon Row ── */}
      <div className="mb-6 flex items-start justify-between">
        {/* Number - Ab visible aur dark hoga */}
        <span
          className={cn(
            "text-5xl font-extrabold tracking-tighter transition-colors",
            isActive 
              ? "bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent" 
              : "text-slate-300 group-hover:text-slate-400"
          )}
        >
          {number}
        </span>

        {/* Icon Container */}
        <span
          className={cn(
            'inline-flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 shadow-sm',
            isActive 
              ? 'bg-gradient-to-br from-blue-600 to-violet-600 scale-110' 
              : 'bg-white border border-slate-200 group-hover:bg-blue-50'
          )}
        >
          <Icon
            size={22}
            className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'}
            strokeWidth={2}
          />
        </span>
      </div>

      {/* ── Title ── */}
      <h3 className={cn(
        "mb-3 text-xl font-bold leading-tight tracking-tight transition-colors",
        isActive ? "text-blue-700" : "text-slate-900"
      )}>
        {title}
      </h3>

      {/* ── Description ── */}
      <p className="mb-6 text-sm leading-relaxed text-slate-600 flex-1">
        {description}
      </p>

      {/* ── Duration ── */}
      <div className="mt-auto pt-4 border-t border-slate-200/60">
        <span className={cn(
          "inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors",
          isActive 
            ? "bg-blue-100 text-blue-700" 
            : "bg-slate-200 text-slate-600"
        )}>
          {duration}
        </span>
      </div>

      {/* ── Active Bottom Border ── */}
      {isActive && (
        <motion.div
          layoutId="active-step-indicator"
          className="absolute bottom-0 left-1/2 h-1.5 w-1/2 -translate-x-1/2 rounded-t-full bg-gradient-to-r from-blue-600 to-violet-600"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// ProcessSection
// ---------------------------------------------------------------------------

export default function ProcessSection() {
  const [active, setActive] = useState<number>(0)

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-t border-slate-200/50">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <SectionHeader
            eyebrow="How We Work"
            title="A Process Built for Results"
            subtitle="Every engagement follows a proven framework that ensures alignment, quality, and on-time delivery."
          />
        </div>

        {/* ── Responsive Grid Layout ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-6"
        >
          {/* Top Row: 3 Cards */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.slice(0, 3).map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                index={i}
                isActive={active === i}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          {/* Bottom Row: 2 Cards (Centered) */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:w-2/3">
            {steps.slice(3, 5).map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                index={i + 3} 
                isActive={active === i + 3}
                onClick={() => setActive(i + 3)}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Mobile Progress Indicators ── */}
        <div className="mt-10 flex justify-center gap-2.5 lg:hidden">
          {steps.map((_, i) => (
            <button
              key={i}
              aria-label={`View step ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                active === i
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}