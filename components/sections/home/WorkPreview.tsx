'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { getFeaturedCaseStudies } from '@/lib/data/work'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/utils'
import type { CaseStudy } from '@/types'

// ─── Case Study Card ──────────────────────────────────────────────────────────

interface CaseStudyCardProps {
  study: CaseStudy
  variant?: 'large' | 'small'
  index: number
}

function CaseStudyCard({ study, variant = 'small', index }: CaseStudyCardProps) {
  const metric = study.metrics[0]
  const isLarge = variant === 'large'

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        'group flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px]',
        'border border-slate-200/70 bg-white',
        'shadow-sm transition-all duration-300',
        'hover:border-blue-500/30 hover:shadow-[0_12px_30px_-10px_rgba(37,99,235,0.15)]'
      )}
    >
      <Link 
        href={`/work/${study.slug}`} 
        className={cn("flex h-full", isLarge ? "flex-col lg:flex-row" : "flex-col")}
      >
        {/* ── Card Body (Text Area) ── */}
        <div className={cn(
          "flex flex-col justify-start", 
          isLarge ? "flex-[1.5] p-8 lg:p-12" : "flex-1 p-6"
        )}>
          
          {/* Tags */}
          <div className="mb-5 flex flex-wrap gap-2">
            {study.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title & Client */}
          <p className="mb-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">
            {study.client}
          </p>
          <h3
            className={cn(
              'font-bold leading-tight tracking-tight text-slate-900',
              isLarge ? 'text-3xl lg:text-4xl mb-3' : 'text-xl mb-2'
            )}
          >
            {study.title}
          </h3>

          {/* Key result tagline */}
          <p className={cn(
            "font-medium text-blue-600", 
            isLarge ? "text-lg lg:text-xl" : "text-sm"
          )}>
            {study.tagline}
          </p>

          {/* Services List for Large Card */}
          {isLarge && (
            <p className="mt-4 text-sm font-medium text-slate-500">
              {study.services.join(' • ')}
            </p>
          )}

          {/* CTA link */}
          <div className="mt-auto pt-8">
            <div className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 transition-all duration-300 group-hover:gap-2.5 group-hover:text-blue-800">
              View Case Study
              <ArrowRight size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ── Metric Display Area ── */}
        <div
          className={cn(
            'relative flex flex-col items-center justify-center overflow-hidden bg-slate-50/50 text-center',
            isLarge 
              ? 'flex-1 border-t lg:border-t-0 lg:border-l border-slate-100 p-10 lg:p-12' 
              : 'border-t border-slate-100 p-6'
          )}
        >
          {/* Subtle Background Decoration for Large Card */}
          {isLarge && (
             <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, #E2E8F0 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
          )}

          {/* Metric value */}
          <span
            className={cn(
              'relative font-extrabold tracking-tight text-slate-900',
              isLarge ? 'text-6xl lg:text-7xl' : 'text-3xl'
            )}
          >
            {metric.value}
          </span>
          <span className="mt-3 relative text-xs font-bold uppercase tracking-widest text-slate-500">
            {metric.label}
          </span>
          {metric.change && (
            <span className="mt-1.5 relative text-sm font-medium text-slate-400">
              {metric.change}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Work Preview Section ─────────────────────────────────────────────────────

export default function WorkPreview() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  // Total 4 studies fetch kar rahe hain
  const studies = getFeaturedCaseStudies().slice(0, 4)

  const [primary, ...secondary] = studies

  return (
    <section
      id="work-preview"
      ref={ref}
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 border-t border-slate-200/50"
      aria-label="Featured work"
    >
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <SectionHeader
          eyebrow="Our Work"
          title="Projects That Drive Results"
          subtitle="A selection of our most impactful recent engagements, each built around a specific business challenge."
        />

        {/* ── Redesigned Grid Layout ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto mt-12 flex max-w-[1200px] flex-col gap-6 lg:gap-8"
        >
          {/* 1. Large Primary Card — Full Width Banner */}
          {primary && (
            <div className="w-full">
              <CaseStudyCard study={primary} variant="large" index={0} />
            </div>
          )}

          {/* 2. Smaller Cards — Neat 3-Column Grid */}
          {secondary.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {secondary.map((study, i) => (
                <CaseStudyCard key={study.id} study={study} variant="small" index={i + 1} />
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-14 flex justify-center"
        >
          <Button
            href="/work"
            variant="secondary"
            size="lg"
            rightIcon={<ExternalLink size={16} />}
            className="rounded-full px-8 py-3.5 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  )
}