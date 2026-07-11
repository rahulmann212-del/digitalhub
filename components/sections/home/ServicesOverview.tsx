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

// ─── Shadow brand (hover) ─────────────────────────────────────────────────────
const SHADOW_BRAND = '0 16px 48px rgba(79, 70, 229, 0.22)'
const SHADOW_DEFAULT = '0 20px 60px rgba(15,23,42,.06)'

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
      whileHover={{
        scale: 1.02,
        boxShadow: SHADOW_BRAND,
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
      }}
      initial={{ boxShadow: SHADOW_DEFAULT }}
      className={cn(
  'group relative flex min-h-[620px] flex-col rounded-[32px]',
  'border border-[#ECEEF5] bg-white',
  'px-10 py-12',
  'transition-all duration-500',
  'hover:-translate-y-2',
  'hover:border-[#4F46E5]/20'
)}
      style={{ boxShadow: SHADOW_DEFAULT }}
      role="article"
      aria-label={`Service: ${service.title}`}
    >
      {/* ── Gradient border overlay on hover (top accent line) ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Icon container ── */}
      <div
        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl text-white"
        style={{ background: iconGradient }}
        aria-hidden="true"
      >
        <IconComponent size={34} strokeWidth={2} />
      </div>

      {/* ── Title ── */}
      <h3 className="mt-10 text-[32px] leading-tight font-bold leading-tight text-[#0B0F1A]">
        {service.title}
      </h3>

      {/* ── Tagline ── */}
      <p className="mt-4 text-base font-medium text-[#4F46E5]">{service.tagline}</p>

      {/* ── Description ── */}
      <p className="mt-10 gap-4 text-[18px] leading-9 text-[#6B7280]">
        {service.description}
      </p>

      {/* ── Divider ── */}
      <div className="mt-10 border-t border-[#F1F3F9]" aria-hidden="true" />

      {/* ── Capabilities list ── */}
      <ul className="mt-10 gap-4 flex flex-1 flex-col gap-2.5" aria-label={`${service.title} capabilities`}>
        {displayCapabilities.map((cap) => (
          <li key={cap} className="flex items-start gap-2.5">
            <Check
              size={15}
              strokeWidth={2.5}
              className="mt-0.5 shrink-0 text-[#4F46E5]"
              aria-hidden="true"
            />
            <span className="text-base text-[#374151]">{cap}</span>
          </li>
        ))}
      </ul>

      {/* ── CTA Link ── */}
      <div className="mt-auto pt-8">
        <Link
          href={`/services/${service.slug}`}
          id={`service-cta-${service.slug}`}
          className={cn(
            'inline-flex items-center gap-1.5 text-base font-semibold text-[#4F46E5]',
            'transition-all duration-200 hover:gap-3 hover:underline underline-offset-2'
          )}
          aria-label={`Explore ${service.title} service`}
        >
          View Service
          <ArrowRight size={14} strokeWidth={2.5} />
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
    <div className="mb-16 text-center">
      <span className="eyebrow mb-4 block text-base font-semibold uppercase tracking-widest text-[#4F46E5]">
        {eyebrow}
      </span>
      <h2 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-[#0B0F1A] md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto max-w-xl text-lg text-[#6B7280]">{subtitle}</p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      id="services-overview"
      className="section-padding bg-[#FFFFFF]"
      aria-label="Services overview"
    >
      <div className="container-xl">

        {/* ── Section Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUp}>
            <SectionHeader
              eyebrow="✦ What We Do"
              title={
                <>
                  End-to-End{' '}
                  <span
                    className="gradient-brand-text"
                    style={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
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
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3"
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
          className="mt-14 text-center"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.45 }}
        >
          <p className="mb-5 text-base text-[#6B7280]">
            Not sure which service is right for you?
          </p>
          <Link
            href="/contact"
            id="services-cta-consult"
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-8 py-4',
              'text-base font-semibold text-white',
              'shadow-[0_8px_32px_rgba(37,99,235,0.30)]',
              'transition-all duration-300 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)] hover:scale-105'
            )}
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            }}
          >
            Book a Free Consultation
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
