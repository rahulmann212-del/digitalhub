/**
 * app/work/[slug]/page.tsx
 * Server Component — /work/[slug] case study detail page
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Check,
  ArrowRight,
  ChevronRight,
  Quote,
  Calendar,
  Clock,
  Building2,
  TrendingUp,
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren } from '@/components/motion/StaggerChildren'
import { caseStudies, getCaseStudyBySlug } from '@/lib/data/work'
import type { CaseStudy } from '@/types'

// ─── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) return { title: 'Case Study Not Found' }

  return {
    title: `${cs.title} — DigitalHub Case Study`,
    description: `${cs.tagline} | ${cs.industry} | ${cs.client}. ${cs.challenge.slice(0, 130)}...`,
    alternates: {
      canonical: `https://digitalhub.agency/work/${cs.slug}`,
    },
    openGraph: {
      url: `https://digitalhub.agency/work/${cs.slug}`,
      title: `${cs.title} — DigitalHub`,
      description: cs.tagline,
    },
  }
}

// ─── Result Card ───────────────────────────────────────────────────────────────

function ResultMetric({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#4F46E5]/30">
      <span
        className="text-4xl font-extrabold leading-none tracking-tight"
        style={{
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {value}
      </span>
      <span className="mt-2 text-sm font-semibold text-[#0B0F1A]">{label}</span>
      <span className="mt-0.5 text-xs text-[#9CA3AF]">{change}</span>
    </div>
  )
}

// ─── Related Card ─────────────────────────────────────────────────────────────

function RelatedCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/work/${cs.slug}`}
      className="group flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-[0_8px_32px_rgba(79,70,229,0.12)] hover:-translate-y-0.5 hover:border-[#4F46E5]/30"
      aria-label={`View case study: ${cs.title}`}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
        style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
        aria-hidden="true"
      >
        <TrendingUp size={18} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[#0B0F1A] group-hover:text-[#4F46E5] transition-colors duration-200 truncate">
          {cs.title}
        </p>
        <p className="mt-0.5 text-xs font-semibold text-[#059669]">{cs.tagline}</p>
        <p className="mt-1 text-xs text-[#9CA3AF]">{cs.industry}</p>
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

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)

  if (!cs) notFound()

  const related = caseStudies.filter((c) => c.slug !== cs.slug).slice(0, 3)

  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.title,
    description: cs.tagline,
    author: { '@type': 'Organization', name: 'DigitalHub' },
    publisher: { '@type': 'Organization', name: 'DigitalHub', url: 'https://digitalhub.agency' },
    url: `https://digitalhub.agency/work/${cs.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`work-hero-${cs.slug}`}
        className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24"
        aria-label="Case study hero"
        style={{
          background: 'linear-gradient(135deg, #1E1B4B 0%, #0B0F1A 50%, #1a1040 100%)',
        }}
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
              'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(79,70,229,0.15) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="container-xl relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="hover:text-white/90 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li>
                <Link href="/work" className="hover:text-white/90 transition-colors">
                  Work
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li className="font-semibold text-white" aria-current="page">
                {cs.client}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-5">
            {/* Left — main content */}
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
                ✦ {cs.industry} Case Study
              </span>

              <h1
                className="mt-6 font-extrabold leading-[1.07] tracking-tight text-white"
                style={{ fontSize: 'clamp(34px, 5.5vw, 64px)' }}
              >
                {cs.title}
              </h1>

              <p className="mt-4 text-xl font-semibold text-[#6EE7B7]">{cs.tagline}</p>

              {/* Meta row */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Building2 size={14} className="shrink-0" aria-hidden="true" />
                  <span className="font-medium text-white/80">{cs.client}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Calendar size={14} className="shrink-0" aria-hidden="true" />
                  <span>{cs.year}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Clock size={14} className="shrink-0" aria-hidden="true" />
                  <span>{cs.duration}</span>
                </div>
              </div>

              {/* Services */}
              <div className="mt-5 flex flex-wrap gap-2">
                {cs.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  id={`work-hero-cta-${cs.slug}`}
                  className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-bold text-[#0B0F1A] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  Get a Similar Result
                </Link>
                <Link
                  href="/work"
                  id={`work-hero-back-${cs.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-[14px] text-base font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
                >
                  ← All Work
                </Link>
              </div>
            </div>

            {/* Right — metrics card */}
            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-white/8 p-8 backdrop-blur-md"
                role="presentation"
              >
                <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/50">
                  Key Results
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span
                        className="text-3xl font-extrabold leading-none"
                        style={{
                          background: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {m.value}
                      </span>
                      <span className="mt-1.5 text-xs font-semibold text-white/70">{m.label}</span>
                      <span className="text-[10px] text-white/40">{m.change}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative orb */}
                <div
                  className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-20"
                  style={{ background: 'radial-gradient(circle, rgba(129,140,248,1) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          RESULTS METRICS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`work-metrics-${cs.slug}`}
        className="section-padding bg-[#F8F9FC]"
        aria-label="Key results"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="The Numbers"
              title="What We **Achieved** Together"
              subtitle="Concrete, measurable outcomes — not vanity metrics. Every number below was tracked, verified, and reported to the client."
            />
          </FadeUp>

          <StaggerChildren
            className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
            delayChildren={0.06}
          >
            {cs.metrics.map((m) => (
              <ResultMetric key={m.label} label={m.label} value={m.value} change={m.change} />
            ))}
          </StaggerChildren>

          {/* Results list */}
          <FadeUp delay={0.2} className="mt-14">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
              <h3 className="text-lg font-bold text-[#0B0F1A]">Full Results Summary</h3>
              <ul className="mt-5 flex flex-col gap-3" aria-label="Full results list">
                {cs.results.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ECFDF5] mt-0.5">
                      <Check size={11} strokeWidth={2.5} className="text-[#059669]" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-[#374151]">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CHALLENGE & SOLUTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`work-story-${cs.slug}`}
        className="section-padding bg-white"
        aria-label="Challenge and solution"
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
            {/* Challenge */}
            <FadeUp>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-white text-sm font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #DC2626 0%, #9F1239 100%)' }}
                    aria-hidden="true"
                  >
                    01
                  </div>
                  <h2 className="text-xl font-bold text-[#0B0F1A]">The Challenge</h2>
                </div>
                <p className="text-base leading-relaxed text-[#6B7280]">{cs.challenge}</p>
              </div>
            </FadeUp>

            {/* Solution */}
            <FadeUp delay={0.1}>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-white text-sm font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                    aria-hidden="true"
                  >
                    02
                  </div>
                  <h2 className="text-xl font-bold text-[#0B0F1A]">Our Solution</h2>
                </div>
                <p className="text-base leading-relaxed text-[#6B7280]">{cs.solution}</p>
              </div>
            </FadeUp>
          </div>

          {/* Tags */}
          <FadeUp delay={0.2} className="mt-14">
            <div className="flex flex-wrap gap-2" aria-label="Project tags">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-[#E5E7EB] bg-[#F8F9FC] px-4 py-1.5 text-sm font-medium text-[#374151]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TESTIMONIAL
      ══════════════════════════════════════════════════════════════════════ */}
      {cs.testimonial && (
        <section
          id={`work-testimonial-${cs.slug}`}
          className="section-padding bg-[#F8F9FC]"
          aria-label="Client testimonial"
        >
          <div className="container-xl">
            <FadeUp>
              <div className="mx-auto max-w-3xl rounded-3xl border border-[#E5E7EB] bg-white p-10 shadow-sm md:p-14">
                <Quote
                  size={40}
                  className="text-[#4F46E5]/20"
                  aria-hidden="true"
                />
                <blockquote className="mt-4">
                  <p className="text-xl font-medium leading-relaxed text-[#0B0F1A] md:text-2xl">
                    &ldquo;{cs.testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-8 flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                      aria-hidden="true"
                    >
                      {cs.testimonial.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="text-base font-bold text-[#0B0F1A]">{cs.testimonial.author}</p>
                      <p className="text-sm text-[#6B7280]">{cs.testimonial.title}</p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          RELATED CASE STUDIES
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`work-related-${cs.slug}`}
        className="section-padding bg-white"
        aria-label="Related case studies"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="More Work"
              title="Other **Case Studies** You May Like"
              subtitle="Explore more of our client results across different industries and service mixes."
            />
          </FadeUp>

          <StaggerChildren className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3" delayChildren={0.06}>
            {related.map((r) => (
              <RelatedCard key={r.id} cs={r} />
            ))}
          </StaggerChildren>

          <FadeUp delay={0.3} className="mt-10 text-center">
            <Button href="/work" variant="secondary" size="md" id={`work-related-all-${cs.slug}`}>
              View All Case Studies →
            </Button>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`work-cta-${cs.slug}`}
        className="section-padding relative overflow-hidden"
        aria-label="Get similar results"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #0B0F1A 50%, #1a1040 100%)' }}
      >
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div
            className="absolute left-1/4 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 65%)' }}
          />
        </div>

        <div className="container-xl relative z-10 text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#818CF8]/30 bg-[#4F46E5]/20 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-[#A5B4FC]">
              ✦ Ready to Get Started?
            </span>

            <h2
              className="mx-auto mt-6 max-w-2xl font-extrabold leading-tight tracking-tight text-white"
              style={{ fontSize: 'clamp(30px, 5vw, 54px)' }}
            >
              Want Results Like{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {cs.client}&apos;s?
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#94A3B8]">
              Book a free 30-minute strategy call. We&apos;ll review your situation and outline how we&apos;d approach your project.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                id={`work-final-cta-${cs.slug}`}
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-bold text-[#0B0F1A] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-200 hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                Book a Free Call →
              </Link>
              <Link
                href="/work"
                id={`work-final-cta-back-${cs.slug}`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-[14px] text-base font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
              >
                ← Back to Work
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
