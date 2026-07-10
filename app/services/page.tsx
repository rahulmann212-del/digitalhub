/**
 * app/services/page.tsx
 * Server Component — /services landing page
 */

import type { Metadata } from 'next'
import type React from 'react'
import Link from 'next/link'
import { Code2, TrendingUp, Search, Check, X, ArrowRight, Minus } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren } from '@/components/motion/StaggerChildren'
import { services } from '@/lib/data/services'
import { faqs } from '@/lib/data/faqs'
import {
  comparisonRows,
  serviceHighlights,
  serviceBenefits,
} from '@/lib/data/services-extended'
import type { Service } from '@/types'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Services — Web Development, Digital Marketing & Market Research',
  description:
    'End-to-end digital services: custom web development, data-driven digital marketing, and strategic market research. Fixed-price proposals, full ownership, transparent reporting.',
  alternates: { canonical: 'https://digitalhub.agency/services' },
  openGraph: {
    url: 'https://digitalhub.agency/services',
    title: 'Services — DigitalHub Digital Agency',
    description:
      'Web development, digital marketing, and market research services for ambitious businesses worldwide.',
  },
}

// ─── Icon map ──────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.FC<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Code2,
  TrendingUp,
  Search,
}

// ─── Gradient map ──────────────────────────────────────────────────────────────

const GRAD: Record<string, { from: string; to: string; bg: string }> = {
  'web-development':   { from: '#2563EB', to: '#4F46E5', bg: 'rgba(37,99,235,0.07)' },
  'digital-marketing': { from: '#7C3AED', to: '#9333EA', bg: 'rgba(124,58,237,0.07)' },
  'market-research':   { from: '#0EA5E9', to: '#2563EB', bg: 'rgba(14,165,233,0.07)' },
}

// ─── Service Card ──────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
  const Icon = ICON_MAP[service.icon] ?? Code2
  const g = GRAD[service.slug] ?? GRAD['web-development']

  return (
    <div
      className="group relative flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(79,70,229,0.14)] hover:-translate-y-1 hover:border-[#4F46E5]/30"
      role="article"
      aria-label={`${service.title} service`}
    >
      {/* Top accent line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)` }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white shadow-md"
        style={{ background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)` }}
        aria-hidden="true"
      >
        <Icon size={24} strokeWidth={2} />
      </div>

      {/* Heading */}
      <h3 className="mt-6 text-2xl font-bold leading-tight text-[#0B0F1A]">{service.title}</h3>
      <p className="mt-1 text-sm font-semibold text-[#4F46E5]">{service.tagline}</p>
      <p className="mt-3 text-base leading-relaxed text-[#374151]">{service.description}</p>

      {/* Divider */}
      <div className="mt-6 border-t border-[#F1F3F9]" aria-hidden="true" />

      {/* Capabilities */}
      <ul className="mt-6 flex flex-1 flex-col gap-2.5" aria-label={`${service.title} capabilities`}>
        {service.capabilities.slice(0, 5).map((cap) => (
          <li key={cap} className="flex items-start gap-2.5">
            <Check size={14} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[#4F46E5]" aria-hidden="true" />
            <span className="text-sm text-[#374151]">{cap}</span>
          </li>
        ))}
        {service.capabilities.length > 5 && (
          <li className="text-xs font-semibold text-[#9CA3AF]">
            +{service.capabilities.length - 5} more capabilities
          </li>
        )}
      </ul>

      {/* CTA */}
      <div className="mt-8">
        <Link
          href={`/services/${service.slug}`}
          id={`services-card-cta-${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] transition-all duration-200 hover:gap-3 underline-offset-2 hover:underline"
          aria-label={`Learn more about ${service.title}`}
        >
          Explore {service.title}
          <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

// ─── Comparison Cell ──────────────────────────────────────────────────────────

function ComparisonCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ECFDF5]">
          <Check size={13} strokeWidth={2.5} className="text-[#059669]" aria-label="Yes" />
        </span>
      </div>
    )
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FEF2F2]">
          <X size={13} strokeWidth={2.5} className="text-[#DC2626]" aria-label="No" />
        </span>
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF9C3] px-2 py-0.5 text-[10px] font-semibold text-[#92400E]">
        <Minus size={10} aria-hidden="true" />
        {value}
      </span>
    </div>
  )
}

// ─── Simple FAQ item (no client interactivity) ────────────────────────────────

function StaticFaqItem({ question, answer }: { question: string; answer: string }) {
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const previewFaqs = faqs.slice(0, 5)

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="services-hero"
        className="relative overflow-hidden bg-[#FFFFFF] pb-20 pt-16 md:pb-28 md:pt-24"
        aria-label="Services hero"
      >
        {/* Gradient blobs */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div
            className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 65%)' }}
          />
          <div
            className="absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)' }}
          />
        </div>

        {/* Dot-grid background */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23374151'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <div className="container-xl relative z-10">
          <FadeUp className="max-w-3xl">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[#4F46E5]/20 bg-[#EEF2FF] px-4 py-2 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">
              ✦ What We Offer
            </span>

            {/* Headline */}
            <h1
              className="mt-6 font-extrabold leading-[1.07] tracking-tight text-[#0B0F1A]"
              style={{ fontSize: 'clamp(42px, 6.5vw, 80px)' }}
            >
              End-to-End{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Digital Services
              </span>{' '}
              That Deliver Results
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#6B7280]">
              Strategy, design, development, and marketing — all under one roof, all connected to your
              business outcomes. We don&apos;t just execute tasks; we partner for growth.
            </p>

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary" size="lg" id="services-hero-cta-primary">
                Get a Free Proposal
              </Button>
              <Button href="/work" variant="secondary" size="lg" id="services-hero-cta-secondary">
                View Our Work
              </Button>
            </div>
          </FadeUp>

          {/* Stats row */}
          <FadeUp delay={0.2} className="mt-14">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {serviceHighlights.map((h) => (
                <div
                  key={h.label}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-5 text-center shadow-sm"
                >
                  <span className="text-2xl leading-none">{h.icon}</span>
                  <span
                    className="mt-1 text-3xl font-extrabold leading-none tracking-tight"
                    style={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {h.value}
                  </span>
                  <span className="text-xs font-medium text-[#6B7280]">{h.label}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SERVICE CARDS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="services-cards"
        className="section-padding bg-[#F8F9FC]"
        aria-label="Our services"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="Our Services"
              title="Three Disciplines. **One** Integrated Team."
              subtitle="Each service is designed to work standalone or in combination — because the best results come from a connected strategy."
            />
          </FadeUp>

          <StaggerChildren className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3" delayChildren={0.1}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          COMPARISON TABLE
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="services-comparison"
        className="section-padding bg-[#FFFFFF]"
        aria-label="Why choose DigitalHub"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="The DigitalHub Difference"
              title="How We Compare to the **Alternatives**"
              subtitle="Not all agencies are equal. Here's how we stack up against the typical choices — in black and white."
            />
          </FadeUp>

          <FadeUp delay={0.15} className="mt-14 overflow-x-auto">
            <table
              className="w-full min-w-[600px] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm"
              aria-label="Service comparison table"
            >
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th
                    scope="col"
                    className="py-5 pl-6 pr-4 text-left text-sm font-semibold text-[#6B7280]"
                  >
                    Feature
                  </th>
                  <th scope="col" className="px-4 py-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className="text-sm font-bold"
                        style={{
                          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        DigitalHub
                      </span>
                      <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[10px] font-semibold text-[#4F46E5]">
                        Us
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-5 text-center text-sm font-semibold text-[#6B7280]">
                    Typical Agency
                  </th>
                  <th scope="col" className="px-4 py-5 pr-6 text-center text-sm font-semibold text-[#6B7280]">
                    Freelancer
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}
                  >
                    <td className="py-4 pl-6 pr-4 text-sm font-medium text-[#374151]">
                      {row.feature}
                    </td>
                    <td className="px-4 py-4">
                      <ComparisonCell value={row.digitalhub} />
                    </td>
                    <td className="px-4 py-4">
                      <ComparisonCell value={row.typicalAgency} />
                    </td>
                    <td className="px-4 py-4 pr-6">
                      <ComparisonCell value={row.freelancer} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          WHY CHOOSE US — key benefits grid
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="services-why-us"
        className="section-padding bg-[#0B0F1A]"
        aria-label="Why choose DigitalHub"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="Our Philosophy"
              title="Strategy Before **Execution**. Always."
              subtitle="Every engagement starts with a deep understanding of your business — before a single pixel is designed or a campaign activated."
            />
          </FadeUp>

          {/* Override subtitle colour for dark bg */}
          <style>{`
            #services-why-us h2 { color: #F9FAFB; }
            #services-why-us p  { color: #94A3B8; }
            #services-why-us .eyebrow-label { color: #818CF8; }
          `}</style>

          <StaggerChildren
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            delayChildren={0.1}
          >
            {serviceBenefits['web-development'].map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:border-white/10"
              >
                <span className="text-3xl leading-none">{b.icon}</span>
                <h3 className="mt-4 text-lg font-bold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{b.description}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PROCESS PREVIEW
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="services-process"
        className="section-padding bg-[#F8F9FC]"
        aria-label="Our process"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="How We Work"
              title="A Proven Framework for **Every** Engagement"
              subtitle="From first conversation to post-launch growth — here's what working with DigitalHub looks like."
            />
          </FadeUp>

          <StaggerChildren className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5" delayChildren={0.05}>
            {[
              { n: '01', title: 'Discovery',    desc: 'Business goals, audience, and competitive landscape.' },
              { n: '02', title: 'Strategy',     desc: 'Data-backed roadmap and success metrics.' },
              { n: '03', title: 'Execution',    desc: 'Sprints with live progress visibility.' },
              { n: '04', title: 'Launch',       desc: 'QA, testing, and zero-downtime deployment.' },
              { n: '05', title: 'Growth',       desc: 'Ongoing optimisation and monthly reporting.' },
            ].map(({ n, title, desc }) => (
              <div
                key={n}
                className="relative rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm"
              >
                <span
                  className="block text-5xl font-extrabold leading-none tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {n}
                </span>
                <h3 className="mt-3 text-base font-bold text-[#0B0F1A]">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">{desc}</p>
              </div>
            ))}
          </StaggerChildren>

          <FadeUp delay={0.3} className="mt-10 text-center">
            <Button href="/contact" variant="primary" size="md" id="services-process-cta">
              Start Your Project →
            </Button>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FAQ PREVIEW
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="services-faq"
        className="section-padding bg-[#FFFFFF]"
        aria-label="Frequently asked questions"
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-5 lg:gap-20">
            {/* Left */}
            <FadeUp className="lg:col-span-2 flex flex-col gap-5">
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">
                <span className="text-[#7C3AED]" aria-hidden="true">✦</span>
                Common Questions
              </p>
              <h2 className="text-3xl font-bold leading-tight text-[#0B0F1A] md:text-4xl">
                Answers Before{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  You Ask
                </span>
              </h2>
              <p className="text-base leading-relaxed text-[#6B7280]">
                The questions every client asks before their first call. If you have something else in
                mind, we&apos;re always happy to talk.
              </p>
              <Button
                href="/contact"
                variant="outline"
                size="md"
                id="services-faq-cta"
              >
                Can&apos;t find your answer? Contact us →
              </Button>
            </FadeUp>

            {/* Right */}
            <FadeUp delay={0.1} className="lg:col-span-3">
              <div className="rounded-2xl border border-[#E5E7EB] bg-white px-8 py-4 shadow-sm">
                {previewFaqs.map((faq) => (
                  <StaticFaqItem key={faq.id} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="services-final-cta"
        className="section-padding relative overflow-hidden"
        aria-label="Get started"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #0B0F1A 50%, #1E1B4B 100%)' }}
      >
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div
            className="absolute left-1/4 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 65%)' }}
          />
          <div
            className="absolute right-1/4 bottom-0 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 65%)' }}
          />
        </div>

        <div className="container-xl relative z-10 text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#818CF8]/30 bg-[#4F46E5]/20 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-[#A5B4FC]">
              ✦ Ready to Grow?
            </span>

            <h2
              className="mx-auto mt-6 max-w-3xl font-extrabold leading-tight tracking-tight text-white"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}
            >
              Let&apos;s Build Something{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Exceptional Together
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#94A3B8]">
              Book a free 30-minute discovery call. No sales pitch — just an honest conversation about
              your goals, your challenges, and whether we&apos;re the right fit.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg" id="services-final-cta-primary">
                Book a Free Discovery Call
              </Button>
              <Link
                href="/work"
                id="services-final-cta-secondary"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5"
              >
                See Our Work
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {[
                '✓ Fixed-price proposals',
                '✓ Full asset ownership',
                '✓ 60-day post-launch support',
                '✓ NDA on request',
              ].map((t) => (
                <span key={t} className="text-sm font-medium text-[#64748B]">
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
