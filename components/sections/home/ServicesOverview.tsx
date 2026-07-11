'use client'

import type React from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, TrendingUp, Search, Check, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { services } from '@/lib/data/services'
import type { Service } from '@/types'

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  TrendingUp,
  Search,
}

// ─── Gradient map (icon bg) ───────────────────────────────────────────────────
const GRADIENT_MAP: Record<string, string> = {
  'web-development': 'linear-gradient(135deg, #3B82F6 0%, #4F46E5 100%)',
  'digital-marketing': 'linear-gradient(135deg, #8B5CF6 0%, #9333EA 100%)',
  'market-research': 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
}

// ─── Service Card ─────────────────────────────────────────────────────────────
interface ServiceCardProps {
  service: Service
  index: number
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const IconComponent = ICON_MAP[service.icon] ?? Code2
  const iconGradient = GRADIENT_MAP[service.slug] ?? GRADIENT_MAP['web-development']
  const displayCapabilities = service.capabilities.slice(0, 4)

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        'group relative flex h-full flex-col rounded-[24px]', // Thoda compact curve
        'border border-slate-200/70 bg-white',
        'p-6 lg:p-7', // Padding kam kar di gayi hai khali space hatane ke liye
        'shadow-sm transition-all duration-300',
        'hover:border-blue-500/30 hover:shadow-[0_12px_30px_-10px_rgba(37,99,235,0.15)]'
      )}
      role="article"
      aria-label={`Service: ${service.title}`}
    >
      {/* ── Top accent line on hover ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-[24px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Icon & Badge Row ── */}
      <div className="mb-5 flex items-center justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl shadow-inner"
          style={{ background: iconGradient }}
        >
          <IconComponent className="text-white" size={22} strokeWidth={2} />
        </div>
        <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
          {service.shortTitle}
        </span>
      </div>

      {/* ── Title ── */}
      <h3 className="mb-2.5 text-xl font-bold leading-snug tracking-tight text-slate-900">
        {service.title}
      </h3>

      {/* ── Description ── */}
      <p className="mb-5 text-sm leading-relaxed text-slate-600">
        {service.description}
      </p>

      {/* ── Divider ── */}
      <div className="mb-5 h-px w-full bg-slate-100" aria-hidden="true" />

      {/* ── Capabilities list (Tight spacing) ── */}
      <ul className="mb-6 flex flex-col gap-2.5" aria-label={`${service.title} capabilities`}>
        {displayCapabilities.map((cap) => (
          <li key={cap} className="flex items-start gap-2.5">
            <Check
              size={16}
              strokeWidth={3}
              className="mt-0.5 shrink-0 text-blue-600"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-slate-700">{cap}</span>
          </li>
        ))}
      </ul>

      {/* ── CTA Link ── */}
      {/* mt-auto yahan rakha hai taaki button hamesha bottom me rahe, aur upar ka text compact rahe */}
      <div className="mt-auto pt-2">
        <Link
          href={`/services/${service.slug}`}
          id={`service-cta-${service.slug}`}
          className={cn(
            'inline-flex items-center gap-1.5 text-sm font-bold text-blue-600',
            'transition-all duration-300 hover:gap-2.5 hover:text-blue-800'
          )}
          aria-label={`Explore ${service.title} service`}
        >
          View Service
          <ArrowRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────
interface SectionHeaderProps {
  eyebrow: string
  title: React.ReactNode
  subtitle: string
}

function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12 sm:mb-14 text-center">
      <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#4F46E5]/15 bg-[#4F46E5]/5 px-3 py-1.5 text-xs font-semibold text-[#4F46E5]">
        <span className="animate-pulse">✦</span> {eyebrow}
      </span>
      <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tighter text-slate-900">
        {title}
      </h2>
      <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600">
        {subtitle}
      </p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-50px' })

  return (
    <section
      ref={sectionRef}
      id="services-overview"
      className="relative overflow-hidden bg-white py-16 sm:py-20" // Section ka padding chhota kiya hai
      aria-label="Services overview"
    >
      <div className="container mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUp}>
            <SectionHeader
              eyebrow="What We Do"
              title={
                <>
                  End-to-End{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    Digital
                  </span>{' '}
                  Services
                </>
              }
              subtitle="We combine strategy, design, and technology to help your business grow in the digital world."
            />
          </motion.div>
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div
          className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>

        {/* ── Bottom CTA row ── */}
        <motion.div
          className="mt-12 sm:mt-16 text-center"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
        >
          <p className="mb-4 text-xs sm:text-sm font-medium text-slate-500">
            Not sure which service is right for you?
          </p>
          <Link
            href="/contact"
            id="services-cta-consult"
            className={cn(
              'group inline-flex items-center justify-center rounded-full px-7 py-3',
              'text-sm font-semibold text-white',
              'transition-all duration-300 ease-in-out',
              'shadow-[0_6px_16px_rgba(37,99,235,0.2)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(37,99,235,0.3)]'
            )}
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            }}
          >
            Book a Free Consultation
            <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={16} strokeWidth={2.5} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}