/**
 * app/insights/page.tsx
 * Server Component — /insights listing page
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren } from '@/components/motion/StaggerChildren'
import { insights, getFeaturedInsights } from '@/lib/data/insights'
import type { InsightArticle } from '@/types'

// ─── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Insights — Digital Marketing, Web & Strategy Articles',
  description:
    'Practical, research-backed articles on web development performance, digital marketing strategy, and market research — written by the DigitalHub team.',
  alternates: { canonical: 'https://digitalhub.agency/insights' },
  openGraph: {
    url: 'https://digitalhub.agency/insights',
    title: 'Insights — DigitalHub Digital Agency Blog',
    description:
      'Expert articles on web performance, digital marketing, SEO, and market research from the DigitalHub team.',
  },
}

// ─── Category colour map ───────────────────────────────────────────────────────

const CATEGORY_COLOURS: Record<string, { bg: string; text: string }> = {
  'Web Development': { bg: '#EEF2FF', text: '#4338CA' },
  'Digital Marketing': { bg: '#F5F3FF', text: '#6D28D9' },
  'Market Research': { bg: '#E0F2FE', text: '#0369A1' },
  SEO: { bg: '#EFF6FF', text: '#1D4ED8' },
  Strategy: { bg: '#ECFDF5', text: '#065F46' },
}

function getCategoryStyle(category: string) {
  return CATEGORY_COLOURS[category] ?? { bg: '#F1F3F9', text: '#374151' }
}

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: InsightArticle }) {
  const catStyle = getCategoryStyle(article.category)
  const date = new Date(article.publishDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link
      href={`/insights/${article.slug}`}
      id={`insights-card-${article.slug}`}
      className="group flex flex-col rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(79,70,229,0.14)] hover:-translate-y-1 hover:border-[#4F46E5]/30"
      aria-label={`Read: ${article.title}`}
    >
      {/* Top accent */}
      <div
        className="h-0.5 w-full"
        style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
        aria-hidden="true"
      />

      <div className="flex flex-col flex-1 p-7">
        {/* Category & read time */}
        <div className="flex items-center justify-between">
          <span
            className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
            style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
          >
            {article.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
            <Clock size={12} aria-hidden="true" />
            <span>{article.readTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-lg font-bold leading-snug text-[#0B0F1A] group-hover:text-[#4F46E5] transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-3 text-sm leading-relaxed text-[#6B7280] line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        {/* Author + date */}
        <div className="mt-5 flex items-center justify-between border-t border-[#F1F3F9] pt-5">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
              aria-hidden="true"
            >
              {article.authorInitials}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0B0F1A]">{article.author}</p>
              <div className="flex items-center gap-1 text-[10px] text-[#9CA3AF]">
                <Calendar size={10} aria-hidden="true" />
                <span>{date}</span>
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4F46E5] transition-all duration-200 group-hover:gap-2">
            Read
            <ArrowRight size={12} strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Featured Article Card ────────────────────────────────────────────────────

function FeaturedArticleCard({ article }: { article: InsightArticle }) {
  const catStyle = getCategoryStyle(article.category)
  const date = new Date(article.publishDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link
      href={`/insights/${article.slug}`}
      id={`insights-featured-${article.slug}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#0B0F1A] p-8 md:p-10 min-h-[340px] shadow-[0_8px_40px_rgba(0,0,0,0.14)] transition-all duration-300 hover:shadow-[0_24px_64px_rgba(79,70,229,0.2)] hover:-translate-y-1"
      aria-label={`Featured article: ${article.title}`}
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, rgba(79,70,229,0.12) 0%, rgba(11,15,26,0.95) 60%)',
        }}
        aria-hidden="true"
      />
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
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

      <div className="relative z-10">
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
          style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
        >
          {article.category}
        </span>
        <h3 className="mt-3 text-xl font-extrabold leading-snug text-white group-hover:text-[#A5B4FC] transition-colors duration-200 md:text-2xl">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60 line-clamp-2">{article.excerpt}</p>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)' }}
              aria-hidden="true"
            >
              {article.authorInitials}
            </div>
            <div>
              <p className="text-xs font-semibold text-white/90">{article.author}</p>
              <p className="text-[10px] text-white/50">{date} · {article.readTime} min read</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#A5B4FC] transition-all duration-200 group-hover:gap-3">
            Read article
            <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InsightsPage() {
  const featured = getFeaturedInsights().slice(0, 2)
  const allInsights = insights
  const categories = [...new Set(insights.map((a) => a.category))]

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="insights-hero"
        className="relative overflow-hidden bg-white pb-20 pt-16 md:pb-28 md:pt-24"
        aria-label="Insights hero"
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
              ✦ Thought Leadership
            </span>

            <h1
              className="mt-6 font-extrabold leading-[1.07] tracking-tight text-[#0B0F1A]"
              style={{ fontSize: 'clamp(42px, 6.5vw, 80px)' }}
            >
              Expert{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Insights
              </span>{' '}
              That Drive Growth
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#6B7280]">
              Practical, research-backed articles from our team of specialists. No fluff — just the
              tactical knowledge we use with clients every day.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary" size="lg" id="insights-hero-cta-primary">
                Work With Our Team
              </Button>
              <Button href="/work" variant="secondary" size="lg" id="insights-hero-cta-secondary">
                See Our Case Studies
              </Button>
            </div>
          </FadeUp>

          {/* Category chips */}
          <FadeUp delay={0.2} className="mt-12">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const style = getCategoryStyle(cat)
                return (
                  <span
                    key={cat}
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
                    style={{ backgroundColor: style.bg, color: style.text }}
                  >
                    {cat}
                  </span>
                )
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURED ARTICLES
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="insights-featured"
        className="section-padding bg-[#F8F9FC]"
        aria-label="Featured insights"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="Editor&apos;s Picks"
              title="**Must-Read** Articles"
              subtitle="Our most impactful pieces — the ones clients reference before their first call and share with their teams."
            />
          </FadeUp>

          <StaggerChildren className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2" delayChildren={0.08}>
            {featured.map((article) => (
              <FeaturedArticleCard key={article.id} article={article} />
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ALL ARTICLES
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="insights-all"
        className="section-padding bg-white"
        aria-label="All insights"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="Full Library"
              title="All **Articles** & Guides"
              subtitle="Our complete collection of articles, guides, and frameworks across web development, marketing, and research."
            />
          </FadeUp>

          <StaggerChildren
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            delayChildren={0.04}
          >
            {allInsights.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          NEWSLETTER CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="insights-newsletter"
        className="section-padding bg-[#F8F9FC]"
        aria-label="Newsletter signup"
      >
        <div className="container-xl">
          <FadeUp>
            <div className="mx-auto max-w-2xl rounded-3xl border border-[#E5E7EB] bg-white p-10 text-center shadow-sm md:p-14">
              <span className="text-4xl leading-none">📬</span>
              <h2
                className="mt-5 font-bold leading-tight tracking-tight text-[#0B0F1A]"
                style={{ fontSize: 'clamp(24px, 3.5vw, 38px)' }}
              >
                Get New Insights{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Every Two Weeks
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#6B7280]">
                Join 2,400+ founders, marketers, and product leaders who read DigitalHub Insights. No
                fluff, no spam — just the knowledge that moves the needle.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-full border border-[#E5E7EB] bg-[#F8F9FC] px-6 py-4 text-sm text-[#0B0F1A] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 sm:max-w-xs"
                  aria-label="Email address for newsletter"
                  id="insights-newsletter-email"
                />
                <Button href="/contact" variant="primary" size="md" id="insights-newsletter-submit">
                  Subscribe →
                </Button>
              </div>
              <p className="mt-4 text-xs text-[#9CA3AF]">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="insights-final-cta"
        className="section-padding relative overflow-hidden"
        aria-label="Work with us"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #0B0F1A 50%, #1E1B4B 100%)' }}
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
              ✦ Ready to Apply This?
            </span>

            <h2
              className="mx-auto mt-6 max-w-3xl font-extrabold leading-tight tracking-tight text-white"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}
            >
              From Insight to{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Implementation
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#94A3B8]">
              Reading the articles is step one. The second step is working with the team that writes them.
              Book a free call to discuss how these strategies apply to your specific business.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg" id="insights-final-cta-primary">
                Book a Free Discovery Call
              </Button>
              <Link
                href="/services"
                id="insights-final-cta-services"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5"
              >
                Explore Our Services
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
