/**
 * app/insights/[slug]/page.tsx
 * Server Component — /insights/[slug] article detail page
 */

import type { Metadata } from 'next'
import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, Calendar, ArrowRight, ChevronRight, Tag } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren } from '@/components/motion/StaggerChildren'
import { insights, getInsightBySlug } from '@/lib/data/insights'
import type { InsightArticle } from '@/types'


// ─── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }))
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getInsightBySlug(slug)
  if (!article) return { title: 'Article Not Found' }

  return {
    title: `${article.title} — DigitalHub Insights`,
    description: article.excerpt,
    alternates: {
      canonical: `https://digitalhub.agency/insights/${article.slug}`,
    },
    openGraph: {
      url: `https://digitalhub.agency/insights/${article.slug}`,
      title: article.title,
      description: article.excerpt,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  }
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

// ─── Simple markdown renderer ─────────────────────────────────────────────────
// Converts the plain-text markdown in content to basic HTML elements.
// For production, use a full markdown library (next-mdx-remote, remark, etc.)

function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split('\n')
  const nodes: React.ReactNode[] = []
  let listBuffer: string[] = []
  let tableBuffer: string[] = []
  let inTable = false

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return
    nodes.push(
      <ul key={`ul-${key}`} className="my-4 flex flex-col gap-2 pl-0">
        {listBuffer.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4F46E5]" aria-hidden="true" />
            <span className="text-[#374151]" dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />
          </li>
        ))}
      </ul>,
    )
    listBuffer = []
  }

  const flushTable = (key: string) => {
    if (tableBuffer.length < 2) { tableBuffer = []; return }
    const headerRow = tableBuffer[0].split('|').map((c) => c.trim()).filter(Boolean)
    const bodyRows = tableBuffer.slice(2).map((row) =>
      row.split('|').map((c) => c.trim()).filter(Boolean),
    )
    nodes.push(
      <div key={`table-${key}`} className="my-6 overflow-x-auto">
        <table className="w-full overflow-hidden rounded-xl border border-[#E5E7EB] text-sm">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F8F9FC]">
              {headerRow.map((h, i) => (
                <th key={i} className="px-4 py-3 text-left font-semibold text-[#0B0F1A]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 text-[#6B7280]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    )
    tableBuffer = []
    inTable = false
  }

  lines.forEach((line, i) => {
    const key = `${i}`

    // Table rows
    if (line.startsWith('|')) {
      inTable = true
      tableBuffer.push(line)
      return
    }
    if (inTable) {
      flushTable(key)
    }

    // Bullet list
    if (line.match(/^- /)) {
      listBuffer.push(line.replace(/^- /, ''))
      return
    }
    if (listBuffer.length > 0) {
      flushList(key)
    }

    // Empty line
    if (line.trim() === '') {
      nodes.push(<div key={key} className="my-2" />)
      return
    }

    // H2
    if (line.startsWith('## ')) {
      nodes.push(
        <h2
          key={key}
          className="mt-10 mb-4 text-2xl font-bold text-[#0B0F1A]"
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(line.replace(/^## /, '')) }}
        />,
      )
      return
    }

    // H3
    if (line.startsWith('### ')) {
      nodes.push(
        <h3
          key={key}
          className="mt-7 mb-3 text-xl font-bold text-[#0B0F1A]"
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(line.replace(/^### /, '')) }}
        />,
      )
      return
    }

    // Numbered list
    if (line.match(/^\d+\. /)) {
      const text = line.replace(/^\d+\. /, '')
      nodes.push(
        <p key={key} className="mb-2 ml-4 text-[#374151]">
          <span className="font-bold text-[#4F46E5]">{line.match(/^\d+/)![0]}.</span>{' '}
          <span dangerouslySetInnerHTML={{ __html: inlineMarkdown(text) }} />
        </p>,
      )
      return
    }

    // Default paragraph
    nodes.push(
      <p
        key={key}
        className="my-3 text-base leading-relaxed text-[#374151]"
        dangerouslySetInnerHTML={{ __html: inlineMarkdown(line) }}
      />,
    )
  })

  if (listBuffer.length > 0) flushList('end')
  if (inTable) flushTable('end')

  return nodes
}

// Inline markdown: **bold**, `code`, _italic_
function inlineMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-[#0B0F1A]">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="rounded bg-[#F1F3F9] px-1.5 py-0.5 font-mono text-sm text-[#4F46E5]">$1</code>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#4F46E5] underline underline-offset-2 hover:text-[#7C3AED]">$1</a>')
}

// ─── Related Article Card ─────────────────────────────────────────────────────

function RelatedCard({ article }: { article: InsightArticle }) {
  const catStyle = getCategoryStyle(article.category)
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-[0_8px_32px_rgba(79,70,229,0.12)] hover:-translate-y-0.5 hover:border-[#4F46E5]/30"
      aria-label={`Read: ${article.title}`}
    >
      <div className="flex-1 min-w-0">
        <span
          className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
        >
          {article.category}
        </span>
        <p className="mt-1.5 text-sm font-bold text-[#0B0F1A] group-hover:text-[#4F46E5] transition-colors duration-200 line-clamp-2">
          {article.title}
        </p>
        <p className="mt-1 text-xs text-[#9CA3AF]">{article.readTime} min read</p>
      </div>
      <ChevronRight
        size={16}
        className="mt-1 shrink-0 text-[#D1D5DB] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#4F46E5]"
        aria-hidden="true"
      />
    </Link>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getInsightBySlug(slug)

  if (!article) notFound()

  const related = insights
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3)

  const moreArticles = related.length < 3
    ? [
        ...related,
        ...insights
          .filter((a) => a.slug !== article.slug && !related.find((r) => r.slug === a.slug))
          .slice(0, 3 - related.length),
      ]
    : related

  const catStyle = getCategoryStyle(article.category)

  const date = new Date(article.publishDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: article.authorTitle,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DigitalHub',
      url: 'https://digitalhub.agency',
    },
    datePublished: article.publishDate,
    url: `https://digitalhub.agency/insights/${article.slug}`,
    keywords: article.tags.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`insight-hero-${article.slug}`}
        className="relative overflow-hidden bg-white pb-12 pt-16 md:pt-20"
        aria-label="Article header"
      >
        {/* Subtle gradient */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23374151'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <div className="container-xl relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <li>
                <Link href="/" className="hover:text-[#4F46E5] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li>
                <Link href="/insights" className="hover:text-[#4F46E5] transition-colors">
                  Insights
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li className="font-medium text-[#374151] truncate max-w-[200px]" aria-current="page">
                {article.title}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {/* Category */}
            <span
              className="inline-block rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wide"
              style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
            >
              {article.category}
            </span>

            {/* Title */}
            <h1
              className="mt-5 font-extrabold leading-[1.1] tracking-tight text-[#0B0F1A]"
              style={{ fontSize: 'clamp(30px, 5vw, 54px)' }}
            >
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="mt-5 text-lg leading-relaxed text-[#6B7280]">{article.excerpt}</p>

            {/* Meta row */}
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[#F1F3F9] pt-6">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                  aria-hidden="true"
                >
                  {article.authorInitials}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0B0F1A]">{article.author}</p>
                  <p className="text-xs text-[#9CA3AF]">{article.authorTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-[#9CA3AF]">
                <Calendar size={14} aria-hidden="true" />
                <span>{date}</span>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-[#9CA3AF]">
                <Clock size={14} aria-hidden="true" />
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ARTICLE CONTENT + SIDEBAR
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`insight-content-${article.slug}`}
        className="py-12 bg-[#F8F9FC] md:py-16"
        aria-label="Article content"
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] lg:items-start">
            {/* Main article */}
            <article
              id="article-body"
              className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm md:p-12"
              aria-label="Article body"
            >
              <div className="prose-custom text-base leading-relaxed">
                {renderMarkdown(article.content)}
              </div>

              {/* Tags */}
              <div className="mt-10 flex flex-wrap gap-2 border-t border-[#F1F3F9] pt-8">
                <Tag size={14} className="mt-0.5 shrink-0 text-[#9CA3AF]" aria-hidden="true" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#E5E7EB] bg-[#F8F9FC] px-3 py-1 text-xs font-medium text-[#6B7280]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside aria-label="Article sidebar" className="flex flex-col gap-6 lg:sticky lg:top-24">
              {/* Author card */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">Written by</p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                    aria-hidden="true"
                  >
                    {article.authorInitials}
                  </div>
                  <div>
                    <p className="font-bold text-[#0B0F1A]">{article.author}</p>
                    <p className="text-sm text-[#6B7280]">{article.authorTitle}</p>
                  </div>
                </div>
              </div>

              {/* CTA card */}
              <div
                className="rounded-2xl p-6 text-center"
                style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)' }}
              >
                <span className="text-3xl leading-none">🚀</span>
                <h3 className="mt-3 text-base font-bold text-white">
                  Ready to Apply This?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Book a free call and let&apos;s discuss your specific situation.
                </p>
                <Link
                  href="/contact"
                  id={`insight-sidebar-cta-${article.slug}`}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0B0F1A] transition-all duration-200 hover:bg-white/90"
                >
                  Book a Free Call
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Related articles */}
              {moreArticles.length > 0 && (
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
                    Related Articles
                  </p>
                  <div className="mt-4 flex flex-col gap-4">
                    {moreArticles.slice(0, 3).map((a) => {
                      const s = getCategoryStyle(a.category)
                      return (
                        <Link
                          key={a.id}
                          href={`/insights/${a.slug}`}
                          className="group block"
                          aria-label={`Read: ${a.title}`}
                        >
                          <span
                            className="inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                            style={{ backgroundColor: s.bg, color: s.text }}
                          >
                            {a.category}
                          </span>
                          <p className="mt-1 text-sm font-semibold text-[#0B0F1A] line-clamp-2 group-hover:text-[#4F46E5] transition-colors duration-200">
                            {a.title}
                          </p>
                          <p className="mt-0.5 text-xs text-[#9CA3AF]">{a.readTime} min</p>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MORE ARTICLES
      ══════════════════════════════════════════════════════════════════════ */}
      {moreArticles.length > 0 && (
        <section
          id={`insight-related-${article.slug}`}
          className="section-padding bg-white"
          aria-label="More articles"
        >
          <div className="container-xl">
            <FadeUp>
              <SectionHeader
                eyebrow="Keep Reading"
                title="More **Insights** Like This"
                subtitle="Continue building your knowledge with these related articles from the DigitalHub team."
              />
            </FadeUp>

            <StaggerChildren
              className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3"
              delayChildren={0.06}
            >
              {moreArticles.slice(0, 3).map((a) => (
                <RelatedCard key={a.id} article={a} />
              ))}
            </StaggerChildren>

            <FadeUp delay={0.3} className="mt-10 text-center">
              <Button href="/insights" variant="secondary" size="md" id={`insight-all-cta-${article.slug}`}>
                View All Insights →
              </Button>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id={`insight-cta-${article.slug}`}
        className="section-padding relative overflow-hidden"
        aria-label="Work with us"
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
              ✦ Put This Into Practice
            </span>

            <h2
              className="mx-auto mt-6 max-w-2xl font-extrabold leading-tight tracking-tight text-white"
              style={{ fontSize: 'clamp(30px, 5vw, 54px)' }}
            >
              Turn Insight Into{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Results
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#94A3B8]">
              The team that wrote this article is available for a free 30-minute call. Let&apos;s talk
              about how to apply these principles to your specific situation.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                id={`insight-final-cta-${article.slug}`}
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-bold text-[#0B0F1A] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-200 hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                Book a Free Call →
              </Link>
              <Link
                href="/insights"
                id={`insight-final-back-${article.slug}`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-[14px] text-base font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
              >
                ← All Insights
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
