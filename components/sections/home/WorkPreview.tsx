'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { getFeaturedCaseStudies } from '@/lib/data/work'
import { fadeUp, staggerContainer } from '@/lib/animations'
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
      whileHover={{ y: -6, boxShadow: '0 24px 64px rgba(79,70,229,0.18)' }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-2xl overflow-hidden cursor-pointer bg-[#F8F9FC] border border-[#E5E7EB] flex flex-col h-full"
      style={{ transition: 'box-shadow 0.25s ease, transform 0.25s ease' }}
    >
      <Link href={`/work/${study.slug}`} className="flex flex-col h-full">
        {/* Card body */}
        <div className={`flex flex-col flex-1 p-6 ${isLarge ? 'md:p-8' : 'p-6'}`}>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {study.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full gradient-soft px-3 py-1 text-xs font-semibold text-[#4F46E5]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Client */}
          <p className="mt-4 text-sm font-medium text-[#6B7280]">{study.client}</p>

          {/* Title */}
          <h3
            className={`mt-1 font-bold text-[#0B0F1A] leading-tight tracking-tight ${
              isLarge ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}
          >
            {study.title}
          </h3>

          {/* Key result — gradient tagline */}
          <p
            className={`mt-3 font-extrabold bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)] bg-clip-text text-transparent leading-tight ${
              isLarge ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}
          >
            {study.tagline}
          </p>

          {/* Services */}
          <p className="mt-3 text-xs text-[#6B7280] font-medium">
            {study.services.join(' · ')}
          </p>

          {/* CTA link */}
          <div className="mt-auto pt-6 flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] group-hover:gap-2.5 transition-all duration-200">
            <span>View Case Study</span>
            <ArrowRight
              size={15}
              className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
            />
          </div>
        </div>

        {/* Visual area — metric display */}
        <div
          className={`gradient-soft border-t border-[#E5E7EB] flex flex-col items-center justify-center text-center relative overflow-hidden ${
            isLarge ? 'py-10 md:py-14' : 'py-8'
          }`}
        >
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(79,70,229,0.12) 0%, transparent 70%)',
            }}
          />

          {/* Metric value */}
          <span
            className={`relative font-extrabold bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)] bg-clip-text text-transparent leading-none tracking-tight ${
              isLarge ? 'text-5xl md:text-6xl' : 'text-4xl'
            }`}
          >
            {metric.value}
          </span>
          <span className="relative mt-2 text-xs font-semibold uppercase tracking-widest text-[#6B7280]">
            {metric.label}
          </span>
          <span className="relative mt-1 text-xs text-[#9CA3AF]">{metric.change}</span>

          {/* Subtle grid lines decoration */}
          <svg
            className="absolute inset-0 h-full w-full opacity-10"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id={`grid-${study.id}`}
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${study.id})`} />
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Work Preview Section ─────────────────────────────────────────────────────

export default function WorkPreview() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const studies = getFeaturedCaseStudies().slice(0, 4)

  // Split: first card large, rest small
  const [primary, ...secondary] = studies

  return (
    <section
      id="work-preview"
      ref={ref}
      className="section-padding bg-[#FFFFFF]"
      aria-label="Featured work"
    >
      <div className="container-xl">
        {/* Header */}
        <SectionHeader
          eyebrow="Our Work"
          title="Projects That **Drive** Results"
          subtitle="A selection of our most impactful recent engagements, each built around a specific business challenge."
        />

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3"
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

          {/* Fourth card — full width on sm, 3-col span on lg */}
          {studies[3] && (
            <div className="lg:col-span-3">
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -4, boxShadow: '0 24px 64px rgba(79,70,229,0.14)' }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl overflow-hidden cursor-pointer bg-[#F8F9FC] border border-[#E5E7EB]"
              >
                <Link
                  href={`/work/${studies[3].slug}`}
                  className="flex flex-col sm:flex-row h-full"
                >
                  {/* Left: content */}
                  <div className="flex flex-col flex-1 p-6 md:p-8">
                    <div className="flex flex-wrap gap-2">
                      {studies[3].tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full gradient-soft px-3 py-1 text-xs font-semibold text-[#4F46E5]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm font-medium text-[#6B7280]">
                      {studies[3].client}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-[#0B0F1A] leading-tight tracking-tight">
                      {studies[3].title}
                    </h3>
                    <p className="mt-3 text-xl font-extrabold bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)] bg-clip-text text-transparent leading-tight">
                      {studies[3].tagline}
                    </p>
                    <p className="mt-3 text-xs text-[#6B7280] font-medium">
                      {studies[3].services.join(' · ')}
                    </p>
                    <div className="mt-auto pt-6 flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] group-hover:gap-2.5 transition-all duration-200">
                      <span>View Case Study</span>
                      <ArrowRight
                        size={15}
                        className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </div>
                  </div>

                  {/* Right: metrics row */}
                  <div className="gradient-soft border-t sm:border-t-0 sm:border-l border-[#E5E7EB] sm:w-80 flex items-center justify-center relative overflow-hidden p-8">
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        background:
                          'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(79,70,229,0.12) 0%, transparent 70%)',
                      }}
                    />
                    <div className="relative text-center">
                      <span className="block text-5xl font-extrabold bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)] bg-clip-text text-transparent leading-none tracking-tight">
                        {studies[3].metrics[0].value}
                      </span>
                      <span className="mt-2 block text-xs font-semibold uppercase tracking-widest text-[#6B7280]">
                        {studies[3].metrics[0].label}
                      </span>
                      <span className="mt-1 block text-xs text-[#9CA3AF]">
                        {studies[3].metrics[0].change}
                      </span>
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
          className="mt-12 flex justify-center"
        >
          <Button
            href="/work"
            variant="secondary"
            size="lg"
            rightIcon={<ExternalLink size={18} />}
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
