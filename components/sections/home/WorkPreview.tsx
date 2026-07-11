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
      <Link href={`/work/${study.slug}`} className="flex h-full flex-col">
        {/* ── Card Body ── */}
        <div className="flex flex-1 flex-col p-6 lg:p-8">
          
          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {study.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title & Client */}
          <p className="mb-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase">
            {study.client}
          </p>
          <h3
            className={cn(
              'font-bold leading-tight tracking-tight text-slate-900',
              isLarge ? 'text-2xl md:text-3xl' : 'text-xl'
            )}
          >
            {study.title}
          </h3>

          {/* Key result tagline */}
          <p className="mt-3 text-sm font-semibold text-blue-600 sm:text-base">
            {study.tagline}
          </p>

          {/* CTA link */}
          <div className="mt-auto pt-6">
            <div className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 transition-all duration-300 group-hover:gap-2.5 group-hover:text-blue-800">
              View Case Study
              <ArrowRight size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ── Metric Display Area ── */}
        <div
          className={cn(
            'relative flex flex-col items-center justify-center overflow-hidden border-t border-slate-100 bg-slate-50/50 text-center',
            isLarge ? 'p-8 md:p-10' : 'p-6'
          )}
        >
          {/* Metric value */}
          <span
            className={cn(
              'relative font-extrabold tracking-tight text-slate-900',
              isLarge ? 'text-4xl md:text-5xl' : 'text-3xl'
            )}
          >
            {metric.value}
          </span>
          <span className="mt-1 relative text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {metric.label}
          </span>
          {metric.change && (
            <span className="mt-0.5 relative text-xs font-medium text-slate-400">
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
  const studies = getFeaturedCaseStudies().slice(0, 4)

  // Split: first card large, rest small
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

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto mt-12 grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* Large primary card — spans 2 cols on lg */}
          {primary && (
            <div className="lg:col-span-2">
              <CaseStudyCard study={primary} variant="large" index={0} />
            </div>
          )}

          {/* Smaller cards stacked in right column */}
          {secondary.length > 0 && (
            <div className="flex flex-col gap-6">
              {secondary.slice(0, 2).map((study, i) => (
                <CaseStudyCard key={study.id} study={study} variant="small" index={i + 1} />
              ))}
            </div>
          )}

          {/* Fourth card — full width on sm, 3-col span on lg (Horizontal Layout) */}
          {studies[3] && (
            <div className="lg:col-span-3">
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group flex cursor-pointer flex-col sm:flex-row overflow-hidden rounded-[24px] border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_12px_30px_-10px_rgba(37,99,235,0.15)]"
              >
                <Link
                  href={`/work/${studies[3].slug}`}
                  className="flex w-full flex-col sm:flex-row"
                >
                  {/* Left: Content */}
                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {studies[3].tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mb-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase">
                      {studies[3].client}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-slate-900">
                      {studies[3].title}
                    </h3>
                    <p className="mt-3 text-sm font-semibold text-blue-600 sm:text-base">
                      {studies[3].tagline}
                    </p>
                    
                    <div className="mt-auto pt-6">
                      <div className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 transition-all duration-300 group-hover:gap-2.5 group-hover:text-blue-800">
                        View Case Study
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                  {/* Right: Metrics Row (Horizontal layout for desktop) */}
                  <div className="relative flex items-center justify-center border-t sm:border-l sm:border-t-0 border-slate-100 bg-slate-50/50 p-8 sm:w-[320px] overflow-hidden">
                    <div className="relative text-center">
                      <span className="block text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                        {studies[3].metrics[0].value}
                      </span>
                      <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {studies[3].metrics[0].label}
                      </span>
                      {studies[3].metrics[0].change && (
                        <span className="mt-0.5 block text-xs font-medium text-slate-400">
                          {studies[3].metrics[0].change}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
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