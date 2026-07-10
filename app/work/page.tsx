/**
 * app/work/page.tsx
 * Server Component — /work listing page
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ChevronRight, TrendingUp } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren } from '@/components/motion/StaggerChildren'
import { caseStudies, getFeaturedCaseStudies } from '@/lib/data/work'
import type { CaseStudy } from '@/types'

// ─── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Our Work — Case Studies & Client Results',
  description:
    'Real results for real businesses. Explore DigitalHub\'s case studies across web development, digital marketing, and market research — with measurable outcomes for every project.',
  alternates: { canonical: 'https://digitalhub.agency/work' },
  openGraph: {
    url: 'https://digitalhub.agency/work',
    title: 'Our Work — DigitalHub Case Studies',
    description:
      'Explore how we\'ve helped 150+ businesses grow with custom web development, data-driven marketing, and strategic market research.',
  },
}

// ─── Structured Data ───────────────────────────────────────────────────────────

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'DigitalHub — Client Work & Case Studies',
  description: 'Portfolio of web development, digital marketing, and market research projects.',
  url: 'https://digitalhub.agency/work',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: caseStudies.map((cs, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: cs.title,
      url: `https://digitalhub.agency/work/${cs.slug}`,
    })),
  },
}

// ─── Tag colours ───────────────────────────────────────────────────────────────

const TAG_COLOURS: Record<string, string> = {
  Fintech: '#EEF2FF',
  Healthcare: '#ECFDF5',
  'Real Estate': '#FFF7ED',
  'B2B SaaS': '#F0F9FF',
  'E-Commerce': '#FDF4FF',
  'B2B Technology': '#F0FDF4',
  'Web App': '#EEF2FF',
  SEO: '#EFF6FF',
  PPC: '#FFF7ED',
  'Google Ads': '#FFF7ED',
  CRO: '#FDF4FF',
  'Market Research': '#F0F9FF',
  Strategy: '#ECFDF5',
}

const TAG_TEXT: Record<string, string> = {
  Fintech: '#4338CA',
  Healthcare: '#065F46',
  'Real Estate': '#92400E',
  'B2B SaaS': '#0369A1',
  'E-Commerce': '#7E22CE',
  'B2B Technology': '#166534',
  'Web App': '#4338CA',
  SEO: '#1D4ED8',
  PPC: '#92400E',
  'Google Ads': '#92400E',
  CRO: '#7E22CE',
  'Market Research': '#0369A1',
  Strategy: '#065F46',
}

// ─── Metric Card ──────────────────────────────────────────────────────────────

function MetricPill({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-center shadow-xs">
      <span
        className="text-xl font-extrabold leading-none tracking-tight"
        style={{
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {value}
      </span>
      <span className="text-[10px] font-semibold text-[#6B7280] leading-tight">{change}</span>
    </div>
  )
}

// ─── Case Study Card (grid) ────────────────────────────────────────────────────

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/work/${cs.slug}`}
      id={`work-card-${cs.slug}`}
      className="group flex flex-col rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(79,70,229,0.14)] hover:-translate-y-1 hover:border-[#4F46E5]/30"
      aria-label={`View case study: ${cs.title}`}
    >
      {/* Coloured top bar */}
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
        aria-hidden="true"
      />

      <div className="flex flex-col flex-1 p-8">
        {/* Industry + year */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4F46E5]">
            {cs.industry}
          </span>
          <span className="text-xs text-[#9CA3AF]">{cs.year}</span>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-xl font-bold leading-snug text-[#0B0F1A] group-hover:text-[#4F46E5] transition-colors duration-200">
          {cs.title}
        </h3>

        {/* Tagline */}
        <p className="mt-2 text-sm font-semibold text-[#059669]">{cs.tagline}</p>

        {/* Services */}
        <div className="mt-4 flex flex-wrap gap-2">
          {cs.services.map((svc) => (
            <span
              key={svc}
              className="inline-flex items-center rounded-full bg-[#F1F3F9] px-3 py-1 text-xs font-medium text-[#374151]"
            >
              {svc}
            </span>
          ))}
        </div>

        {/* Metrics */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          {cs.metrics.slice(0, 2).map((m) => (
            <MetricPill key={m.label} label={m.label} value={m.value} change={m.change} />
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-6 flex items-center justify-between border-t border-[#F1F3F9] pt-5">
          <span className="text-xs font-medium text-[#9CA3AF]">{cs.client}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] transition-all duration-200 group-hover:gap-3">
            View case study
            <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Featured Card ────────────────────────────────────────────────────────────

function FeaturedCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/work/${cs.slug}`}
      id={`work-featured-${cs.slug}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#0B0F1A] p-10 min-h-[420px] shadow-[0_8px_40px_rgba(0,0,0,0.14)] transition-all duration-300 hover:shadow-[0_24px_64px_rgba(79,70,229,0.22)] hover:-translate-y-1"
      aria-label={`Featured case study: ${cs.title}`}
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, rgba(79,70,229,0.15) 0%, rgba(11,15,26,0.95) 60%)',
        }}
        aria-hidden="true"
      />
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Featured badge */}
      <div className="absolute top-8 left-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm">
          ✦ Featured
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[#A5B4FC]">{cs.industry}</p>
        <h3 className="mt-2 text-2xl font-extrabold leading-snug text-white group-hover:text-[#A5B4FC] transition-colors duration-200">
          {cs.title}
        </h3>
        <p className="mt-2 text-base font-semibold text-[#6EE7B7]">{cs.tagline}</p>

        {/* Metrics row */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cs.metrics.map((m) => (
            <div key={m.label} className="flex flex-col">
              <span
                className="text-2xl font-extrabold leading-none"
                style={{
                  background: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {m.value}
              </span>
              <span className="mt-1 text-xs font-medium text-white/50">{m.change}</span>
            </div>
          ))}
        </div>

        {/* Services & CTA */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {cs.services.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-white/70"
              >
                {s}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-all duration-200 group-hover:gap-3 group-hover:text-white">
            View full case study
            <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkPage() {
  const featured = getFeaturedCaseStudies()
  const allCaseStudies = caseStudies

  const stats = [
    { value: '150+', label: 'Projects Delivered' },
    { value: '12', label: 'Countries Served' },
    { value: '98%', label: 'Client Retention' },
    { value: '4.9★', label: 'Average Rating' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="work-hero"
        className="relative overflow-hidden bg-white pb-20 pt-16 md:pb-28 md:pt-24"
        aria-label="Work hero"
      >
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div
            className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 65%)' }}
          />
          <div
            className="absolute -bottom-24 right-0 h-[400px] w-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)' }}
          />
        </div>
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23374151'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <div className="container-xl relative z-10">
          <FadeUp className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#4F46E5]/20 bg-[#EEF2FF] px-4 py-2 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">
              ✦ Client Results
            </span>

            <h1
              className="mt-6 font-extrabold leading-[1.07] tracking-tight text-[#0B0F1A]"
              style={{ fontSize: 'clamp(42px, 6.5vw, 80px)' }}
            >
              Proof in{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Numbers
              </span>
              , Not Promises
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#6B7280]">
              Every project starts with your goals. Every case study ends with measurable results.
              Here&apos;s what working with DigitalHub looks like in practice.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary" size="lg" id="work-hero-cta-primary">
                Start Your Project
              </Button>
              <Button href="/services" variant="secondary" size="lg" id="work-hero-cta-secondary">
                Explore Services
              </Button>
            </div>
          </FadeUp>

          {/* Stats row */}
          <FadeUp delay={0.2} className="mt-14">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-5 text-center shadow-sm"
                >
                  <span
                    className="text-3xl font-extrabold leading-none tracking-tight"
                    style={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs font-medium text-[#6B7280]">{s.label}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURED CASE STUDIES
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="work-featured"
        className="section-padding bg-[#F8F9FC]"
        aria-label="Featured case studies"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="Featured Work"
              title="Our **Highest-Impact** Engagements"
              subtitle="These four projects represent the breadth of our capabilities — and the depth of results we're able to deliver."
            />
          </FadeUp>

          <StaggerChildren className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2" delayChildren={0.08}>
            {featured.map((cs) => (
              <FeaturedCard key={cs.id} cs={cs} />
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ALL CASE STUDIES
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="work-all"
        className="section-padding bg-white"
        aria-label="All case studies"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="Full Portfolio"
              title="Every Project. Every **Result**."
              subtitle="Across industries, budgets, and service mixes — consistency in outcomes is what defines us."
            />
          </FadeUp>

          <StaggerChildren className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" delayChildren={0.05}>
            {allCaseStudies.map((cs) => (
              <CaseStudyCard key={cs.id} cs={cs} />
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          INDUSTRIES OVERVIEW
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="work-industries"
        className="section-padding bg-[#F8F9FC]"
        aria-label="Industries we serve"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="Industry Experience"
              title="Experience Across **Every** Vertical"
              subtitle="From regulated industries like healthcare and fintech to fast-moving sectors like e-commerce and B2B SaaS."
            />
          </FadeUp>

          <StaggerChildren
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
            delayChildren={0.05}
          >
            {[
              { name: 'Fintech', icon: '💳' },
              { name: 'Healthcare', icon: '🏥' },
              { name: 'Real Estate', icon: '🏢' },
              { name: 'B2B SaaS', icon: '⚙️' },
              { name: 'E-Commerce', icon: '🛍️' },
              { name: 'B2B Technology', icon: '🔒' },
            ].map((industry) => (
              <div
                key={industry.name}
                className="flex flex-col items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-6 text-center shadow-sm transition-all duration-200 hover:border-[#4F46E5]/30 hover:shadow-md"
              >
                <span className="text-2xl leading-none">{industry.icon}</span>
                <span className="text-sm font-semibold text-[#374151]">{industry.name}</span>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PROCESS TEASER
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="work-process"
        className="section-padding bg-white"
        aria-label="How we work"
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
            <FadeUp>
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">
                <span aria-hidden="true">✦</span> How We Do It
              </p>
              <h2
                className="mt-4 font-bold leading-tight tracking-tight text-[#0B0F1A]"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
              >
                Results Don&apos;t Happen by{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Accident
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#6B7280]">
                Every client result in our portfolio follows the same disciplined framework: strategy before
                execution, measurement built in from day one, and relentless iteration toward the goal that
                matters most — your business growth.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/services" variant="primary" size="md" id="work-process-services-cta">
                  Explore Our Services
                </Button>
                <Button href="/contact" variant="secondary" size="md" id="work-process-contact-cta">
                  Discuss Your Project
                </Button>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="flex flex-col gap-4">
                {[
                  {
                    step: '01',
                    title: 'Deep Discovery',
                    desc: 'We learn your business, audience, competitors, and the specific outcomes you need before we plan anything.',
                  },
                  {
                    step: '02',
                    title: 'Data-Led Strategy',
                    desc: 'Every project roadmap is backed by research and benchmarks — not creative guesswork.',
                  },
                  {
                    step: '03',
                    title: 'Execution with Visibility',
                    desc: 'Fortnightly sprints with live project tracking. You always know what we\'re building and why.',
                  },
                  {
                    step: '04',
                    title: 'Measure. Optimise. Grow.',
                    desc: 'Post-launch is where most agencies disappear. We stay and push every metric toward your target.',
                  },
                ].map(({ step, title, desc }) => (
                  <div
                    key={step}
                    className="flex items-start gap-5 rounded-2xl border border-[#E5E7EB] bg-[#F8F9FC] p-6"
                  >
                    <span
                      className="text-2xl font-extrabold leading-none shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {step}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#0B0F1A]">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">{desc}</p>
                    </div>
                  </div>
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
        id="work-final-cta"
        className="section-padding relative overflow-hidden"
        aria-label="Start your project"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #0B0F1A 50%, #1E1B4B 100%)' }}
      >
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
              ✦ Ready to Join Them?
            </span>

            <h2
              className="mx-auto mt-6 max-w-3xl font-extrabold leading-tight tracking-tight text-white"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}
            >
              Your Case Study{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Starts Here
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#94A3B8]">
              Every project in this portfolio started with a conversation. Book a free discovery call and
              let&apos;s talk about adding your results to this page.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg" id="work-final-cta-primary">
                Book a Free Discovery Call
              </Button>
              <Link
                href="/services"
                id="work-final-cta-secondary"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5"
              >
                View Our Services
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {['✓ Free discovery call', '✓ No obligation', '✓ Fixed-price proposals', '✓ Full ownership'].map(
                (t) => (
                  <span key={t} className="text-sm font-medium text-[#64748B]">
                    {t}
                  </span>
                ),
              )}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
