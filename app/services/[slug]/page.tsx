/**
 * app/services/[slug]/page.tsx
 * Server Component — /services/[slug] detail page
 * Covers: web-development · digital-marketing · market-research
 */

import type { Metadata } from 'next'
import type React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Code2,
  TrendingUp,
  Search,
  Check,
  ArrowRight,
  ChevronRight,
  Zap,
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren } from '@/components/motion/StaggerChildren'
import { services, getServiceBySlug } from '@/lib/data/services'
import { faqs } from '@/lib/data/faqs'
import {
  serviceTechnologies,
  serviceBenefits,
  serviceProcess,
  serviceFaqs,
  serviceIndustries,
} from '@/lib/data/services-extended'
import type { Service } from '@/types'

// ─── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return { title: 'Service Not Found' }

  return {
    title: `${service.title} Services — DigitalHub`,
    description: service.description,
    alternates: {
      canonical: `https://digitalhub.agency/services/${service.slug}`,
    },
    openGraph: {
      url: `https://digitalhub.agency/services/${service.slug}`,
      title: `${service.title} — DigitalHub`,
      description: service.description,
    },
  }
}

// ─── Icon + gradient maps ──────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.FC<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Code2,
  TrendingUp,
  Search,
}

const SERVICE_THEME: Record<
  string,
  { from: string; to: string; mid: string; bgLight: string; bgGradient: string }
> = {
  'web-development': {
    from: '#2563EB',
    to: '#4F46E5',
    mid: '#3B82F6',
    bgLight: '#EEF2FF',
    bgGradient: 'linear-gradient(135deg, #1E40AF 0%, #4F46E5 50%, #312E81 100%)',
  },
  'digital-marketing': {
    from: '#7C3AED',
    to: '#9333EA',
    mid: '#8B5CF6',
    bgLight: '#F3E8FF',
    bgGradient: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #6D28D9 100%)',
  },
  'market-research': {
    from: '#0EA5E9',
    to: '#2563EB',
    mid: '#38BDF8',
    bgLight: '#E0F2FE',
    bgGradient: 'linear-gradient(135deg, #0369A1 0%, #0EA5E9 50%, #2563EB 100%)',
  },
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-[0_8px_32px_rgba(79,70,229,0.12)] hover:-translate-y-0.5">
      <span className="text-3xl leading-none">{icon}</span>
      <h3 className="mt-4 text-base font-bold text-[#0B0F1A]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{description}</p>
    </div>
  )
}

function TechBadge({ name, category }: { name: string; category: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-center shadow-xs transition-all duration-200 hover:border-[#4F46E5]/30 hover:shadow-sm">
      <span className="text-xs font-medium text-[#9CA3AF]">{category}</span>
      <span className="text-sm font-bold text-[#0B0F1A]">{name}</span>
    </div>
  )
}

function ProcessStep({
  number,
  title,
  description,
  duration,
  isLast,
  accentFrom,
  accentTo,
}: {
  number: string
  title: string
  description: string
  duration: string
  isLast: boolean
  accentFrom: string
  accentTo: string
}) {
  return (
    <div className="relative flex gap-5">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-[19px] top-12 bottom-0 w-px bg-[#E5E7EB]" aria-hidden="true" />
      )}

      {/* Step number circle */}
      <div
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white shadow-md"
        style={{ background: `linear-gradient(135deg, ${accentFrom} 0%, ${accentTo} 100%)` }}
        aria-label={`Step ${number}`}
      >
        {number}
      </div>

      {/* Content */}
      <div className="pb-10">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-bold text-[#0B0F1A]">{title}</h3>
          <span className="rounded-full bg-[#F1F3F9] px-2.5 py-0.5 text-xs font-medium text-[#6B7280]">
            {duration}
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">{description}</p>
      </div>
    </div>
  )
}

function ServiceFaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-[#E5E7EB] last:border-b-0">
      <summary className="flex cursor-pointer select-none list-none items-center justify-between py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2">
        <span className="text-base font-semibold text-[#0B0F1A] pr-4">{question}</span>
        <span
          className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF2FF] text-[#4F46E5] transition-transform duration-200 group-open:rotate-45"
          aria-hidden="true"
        >
          <ArrowRight size={14} strokeWidth={2.5} className="-rotate-45" />
        </span>
      </summary>
      <p className="pb-5 text-sm leading-relaxed text-[#374151]">{answer}</p>
    </details>
  )
}

function RelatedServiceCard({ service }: { service: Service }) {
  const Icon = ICON_MAP[service.icon] ?? Code2
  const theme = SERVICE_THEME[service.slug] ?? SERVICE_THEME['web-development']
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-[0_8px_32px_rgba(79,70,229,0.12)] hover:-translate-y-0.5 hover:border-[#4F46E5]/30"
      aria-label={`View ${service.title}`}
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
        style={{ background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)` }}
        aria-hidden="true"
      >
        <Icon size={20} strokeWidth={2} />
      </div>
      <div className="flex-1">
        <p className="font-bold text-[#0B0F1A] group-hover:text-[#4F46E5] transition-colors duration-200">
          {service.title}
        </p>
        <p className="mt-0.5 text-sm text-[#6B7280] line-clamp-2">{service.tagline}</p>
      </div>
      <ChevronRight
        size={16}
        className="mt-0.5 shrink-0 text-[#D1D5DB] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#4F46E5]"
        aria-hidden="true"
      />
    </Link>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) notFound()

  const theme = SERVICE_THEME[service.slug] ?? SERVICE_THEME['web-development']
  const Icon = ICON_MAP[service.icon] ?? Code2
  const benefits = serviceBenefits[service.slug] ?? []
  const technologies = serviceTechnologies[service.slug] ?? []
  const steps = serviceProcess[service.slug] ?? []
  const sfaqs = serviceFaqs[service.slug] ?? []
  const industries = serviceIndustries[service.slug] ?? []
  const relatedServices = services.filter((s) => s.slug !== service.slug)

  // Group technologies by category
  const techCategories = technologies.reduce<Record<string, string[]>>((acc, t) => {
    acc[t.category] = acc[t.category] ?? []
    acc[t.category].push(t.name)
    return acc
  }, {})

  // Supplement FAQ with 2 general FAQs
  const generalFaqs = faqs.filter((f) => f.category === 'General').slice(0, 2)

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`service-hero-${service.slug}`}
        className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24"
        aria-label={`${service.title} hero`}
        style={{ background: theme.bgGradient }}
      >
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="container-xl relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-white/90 transition-colors">Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li><Link href="/services" className="hover:text-white/90 transition-colors">Services</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li className="font-semibold text-white" aria-current="page">{service.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              {/* Eyebrow */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
                <Zap size={12} aria-hidden="true" />
                {service.shortTitle} Services
              </span>

              <h1
                className="mt-6 font-extrabold leading-[1.07] tracking-tight text-white"
                style={{ fontSize: 'clamp(38px, 6vw, 72px)' }}
              >
                {service.title}
              </h1>

              <p className="mt-4 text-lg leading-relaxed text-white/75 max-w-xl">
                {service.description}
              </p>

              {/* Outcomes */}
              <ul className="mt-8 flex flex-col gap-2.5" aria-label="Key outcomes">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-center gap-2.5">
                    <Check size={15} strokeWidth={2.5} className="shrink-0 text-white/80" aria-hidden="true" />
                    <span className="text-sm font-medium text-white/80">{outcome}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  id={`service-hero-cta-primary-${service.slug}`}
                  className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-bold text-[#0B0F1A] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  Get a Free Proposal
                </Link>
                <Link
                  href="/work"
                  id={`service-hero-cta-secondary-${service.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-[14px] text-base font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
                >
                  See Case Studies <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right — visual card */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md"
                role="presentation"
              >
                {/* Large icon */}
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
                  aria-hidden="true"
                >
                  <Icon size={38} strokeWidth={1.75} className="text-white" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-white">{service.title}</h2>
                <p className="mt-1 text-sm text-white/70">{service.tagline}</p>

                {/* Capability chips */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.capabilities.slice(0, 4).map((cap) => (
                    <span
                      key={cap}
                      className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
                    >
                      {cap}
                    </span>
                  ))}
                  {service.capabilities.length > 4 && (
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/60">
                      +{service.capabilities.length - 4} more
                    </span>
                  )}
                </div>

                {/* Decorative background circles */}
                <div
                  className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-20"
                  style={{ background: `radial-gradient(circle, white 0%, transparent 70%)` }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          OVERVIEW
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`service-overview-${service.slug}`}
        className="section-padding bg-[#FFFFFF]"
        aria-label="Service overview"
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Text */}
            <FadeUp>
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">
                <span aria-hidden="true" style={{ color: theme.from }}>✦</span> Service Overview
              </p>
              <h2
                className="mt-4 font-bold leading-tight tracking-tight text-[#0B0F1A]"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
              >
                What Our{' '}
                <span
                  style={{
                    background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {service.shortTitle}
                </span>{' '}
                Service Includes
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#6B7280]">
                {service.description} Every engagement is scoped to your specific goals — not a generic
                template — and measured against business outcomes, not just deliverables.
              </p>
            </FadeUp>

            {/* Capabilities list */}
            <FadeUp delay={0.1}>
              <ul
                className="flex flex-col divide-y divide-[#F1F3F9]"
                aria-label="Full capabilities list"
              >
                {service.capabilities.map((cap, i) => (
                  <li key={cap} className="flex items-center gap-4 py-3.5">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)` }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium text-[#374151]">{cap}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          KEY BENEFITS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`service-benefits-${service.slug}`}
        className="section-padding bg-[#F8F9FC]"
        aria-label="Key benefits"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="Why It Works"
              title={`What You **Gain** With Our ${service.shortTitle} Service`}
              subtitle="These are the outcomes our clients consistently report — backed by data, not promises."
            />
          </FadeUp>

          <StaggerChildren className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" delayChildren={0.05}>
            {benefits.map((b) => (
              <BenefitCard key={b.title} icon={b.icon} title={b.title} description={b.description} />
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TECHNOLOGIES / TOOLS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`service-tech-${service.slug}`}
        className="section-padding bg-[#FFFFFF]"
        aria-label="Tools and technologies"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="Tools & Stack"
              title="The **Technologies** Powering Your Results"
              subtitle="We use best-in-class tools — chosen for reliability, performance, and your long-term independence."
            />
          </FadeUp>

          <FadeUp delay={0.1} className="mt-14">
            <div className="space-y-8">
              {Object.entries(techCategories).map(([category, names]) => (
                <div key={category}>
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {names.map((name) => (
                      <TechBadge key={name} name={name} category={category} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          OUR PROCESS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`service-process-${service.slug}`}
        className="section-padding bg-[#F8F9FC]"
        aria-label="Our process"
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
            {/* Left — header + CTA */}
            <FadeUp className="flex flex-col justify-center">
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">
                <span aria-hidden="true" style={{ color: theme.from }}>✦</span> Our Process
              </p>
              <h2
                className="mt-4 font-bold leading-tight tracking-tight text-[#0B0F1A]"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
              >
                How We Deliver Your{' '}
                <span
                  style={{
                    background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {service.shortTitle}
                </span>{' '}
                Project
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#6B7280]">
                A clear, structured process means fewer surprises, better results, and a predictable
                experience from the first meeting to post-launch growth.
              </p>

              <div className="mt-8">
                <Button href="/contact" variant="primary" size="md" id={`service-process-cta-${service.slug}`}>
                  Start the Process →
                </Button>
              </div>
            </FadeUp>

            {/* Right — steps */}
            <FadeUp delay={0.1}>
              <div className="flex flex-col">
                {steps.map((step, i) => (
                  <ProcessStep
                    key={step.number}
                    number={step.number}
                    title={step.title}
                    description={step.description}
                    duration={step.duration}
                    isLast={i === steps.length - 1}
                    accentFrom={theme.from}
                    accentTo={theme.to}
                  />
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          INDUSTRIES SERVED
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`service-industries-${service.slug}`}
        className="section-padding bg-[#FFFFFF]"
        aria-label="Industries served"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="Industry Experience"
              title={`Built for **Your** Industry`}
              subtitle={`We deliver ${service.title.toLowerCase()} services across a wide range of sectors, each with its own unique challenges and opportunities.`}
            />
          </FadeUp>

          <StaggerChildren
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
            delayChildren={0.05}
          >
            {industries.map((industry) => (
              <div
                key={industry}
                className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F8F9FC] px-5 py-4 shadow-xs transition-all duration-200 hover:border-[#4F46E5]/30 hover:bg-white"
              >
                <div
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)` }}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-[#374151]">{industry}</span>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SERVICE FAQ
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`service-faq-${service.slug}`}
        className="section-padding bg-[#F8F9FC]"
        aria-label={`${service.title} FAQ`}
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-5 lg:gap-20">
            {/* Left */}
            <FadeUp className="lg:col-span-2 flex flex-col gap-5">
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">
                <span className="text-[#7C3AED]" aria-hidden="true">✦</span>
                {service.shortTitle} FAQ
              </p>
              <h2 className="text-3xl font-bold leading-tight text-[#0B0F1A] md:text-4xl">
                Common Questions About Our{' '}
                <span
                  style={{
                    background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {service.shortTitle} Service
                </span>
              </h2>
              <p className="text-base leading-relaxed text-[#6B7280]">
                Specific questions about how we approach {service.title.toLowerCase()} — and the
                answers you need before your first call.
              </p>
              <Button
                href="/contact"
                variant="outline"
                size="md"
                id={`service-faq-cta-${service.slug}`}
              >
                Have another question? Ask us →
              </Button>
            </FadeUp>

            {/* Right */}
            <FadeUp delay={0.1} className="lg:col-span-3">
              <div className="rounded-2xl border border-[#E5E7EB] bg-white px-8 py-4 shadow-sm">
                {sfaqs.map((faq, i) => (
                  <ServiceFaqItem key={i} question={faq.question} answer={faq.answer} />
                ))}
                {generalFaqs.map((faq) => (
                  <ServiceFaqItem key={faq.id} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          RELATED SERVICES
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`service-related-${service.slug}`}
        className="section-padding bg-[#FFFFFF]"
        aria-label="Related services"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="Explore More"
              title="Our Other **Services**"
              subtitle="The most impactful results come from combining services. Explore what else we offer."
            />
          </FadeUp>

          <StaggerChildren className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2" delayChildren={0.08}>
            {relatedServices.map((s) => (
              <RelatedServiceCard key={s.id} service={s} />
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CONTACT CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`service-cta-${service.slug}`}
        className="section-padding relative overflow-hidden"
        aria-label={`Get started with ${service.title}`}
        style={{ background: theme.bgGradient }}
      >
        {/* Decorative */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="container-xl relative z-10 text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
              ✦ Ready to Get Started?
            </span>

            <h2
              className="mx-auto mt-6 max-w-2xl font-extrabold leading-tight tracking-tight text-white"
              style={{ fontSize: 'clamp(30px, 5vw, 54px)' }}
            >
              Let&apos;s Discuss Your{' '}
              <span className="text-white/80">{service.title}</span> Project
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/70">
              Book a free 30-minute strategy call. We&apos;ll review your current situation, define
              your goals, and outline what a partnership would look like.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                id={`service-final-cta-primary-${service.slug}`}
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-bold text-[#0B0F1A] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-200 hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                Book a Free Call →
              </Link>
              <Link
                href="/services"
                id={`service-final-cta-back-${service.slug}`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-[14px] text-base font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
              >
                ← All Services
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {[
                '✓ Free discovery call',
                '✓ Fixed-price proposal',
                '✓ No lock-in contracts',
                '✓ Full asset ownership',
              ].map((t) => (
                <span key={t} className="text-sm font-medium text-white/50">
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
