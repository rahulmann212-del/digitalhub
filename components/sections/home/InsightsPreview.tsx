'use client'

import type React from 'react'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Code2, TrendingUp, Search, ArrowRight, Clock } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { getFeaturedInsights } from '@/lib/data/insights'
import { fadeUp, staggerContainer } from '@/lib/animations'
import type { InsightArticle } from '@/types'

// ─── Category config ──────────────────────────────────────────────────────────

type CategoryKey = 'Web Development' | 'Digital Marketing' | 'Market Research'

interface CategoryConfig {
  gradient: string
  icon: React.ReactNode
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  'Web Development': {
    gradient: 'from-blue-500 to-indigo-600',
    icon: <Code2 size={40} strokeWidth={1.5} className="text-white" />,
  },
  'Digital Marketing': {
    gradient: 'from-violet-500 to-purple-600',
    icon: <TrendingUp size={40} strokeWidth={1.5} className="text-white" />,
  },
  'Market Research': {
    gradient: 'from-sky-500 to-blue-600',
    icon: <Search size={40} strokeWidth={1.5} className="text-white" />,
  },
}

// Fallback for any other category
const FALLBACK_CONFIG: CategoryConfig = {
  gradient: 'from-indigo-500 to-violet-600',
  icon: <Code2 size={40} strokeWidth={1.5} className="text-white" />,
}

function getCategoryConfig(category: string): CategoryConfig {
  return CATEGORY_CONFIG[category] ?? FALLBACK_CONFIG
}

// ─── Article Card ─────────────────────────────────────────────────────────────

interface ArticleCardProps {
  article: InsightArticle
  index: number
}

function ArticleCard({ article, index }: ArticleCardProps) {
  const config = getCategoryConfig(article.category)

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] h-full"
    >
      <Link href={`/insights/${article.slug}`} className="flex flex-col h-full">
        {/* Category color block */}
        <div
          className={`relative h-[200px] bg-gradient-to-br ${config.gradient} flex flex-col items-center justify-center gap-3 overflow-hidden`}
        >
          {/* Radial light overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(ellipse 60% 60% at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 70%)',
            }}
          />
          {/* Subtle grid pattern */}
          <svg className="absolute inset-0 h-full w-full opacity-10" aria-hidden="true">
            <defs>
              <pattern
                id={`insight-grid-${article.id}`}
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 24 0 L 0 0 0 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.6"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#insight-grid-${article.id})`} />
          </svg>

          <div className="relative z-10 flex flex-col items-center gap-2">
            {config.icon}
            <span className="text-sm font-semibold text-white/90 uppercase tracking-widest">
              {article.category}
            </span>
          </div>

          {/* Read time badge in top-right */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1">
            <Clock size={11} className="text-white" />
            <span className="text-xs font-medium text-white">{article.readTime} min</span>
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-6">
          {/* Category badge */}
          <span className="inline-flex self-start items-center rounded-full gradient-soft px-3 py-1 text-xs font-semibold text-[#4F46E5]">
            {article.category}
          </span>

          {/* Title */}
          <h3 className="mt-3 font-bold text-[#0B0F1A] text-lg leading-snug tracking-tight overflow-hidden line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-sm text-[#6B7280] leading-relaxed overflow-hidden line-clamp-3">
            {article.excerpt}
          </p>

          {/* Author + meta */}
          <div className="mt-auto pt-5 flex items-center gap-3">
            {/* Avatar */}
            <div
              className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              }}
              aria-label={`${article.author} avatar`}
            >
              {article.authorInitials}
            </div>

            {/* Author info */}
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-[#374151] truncate">
                {article.author}
              </span>
              <span className="text-xs text-[#9CA3AF]">
                {article.readTime} min read
              </span>
            </div>
          </div>

          {/* Read article link */}
          <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] group-hover:gap-2.5 transition-all duration-200">
            <span>Read Article</span>
            <ArrowRight
              size={14}
              className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

// ─── Insights Preview Section ─────────────────────────────────────────────────

export default function InsightsPreview() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const articles = getFeaturedInsights().slice(0, 3)

  return (
    <section
      id="insights-preview"
      ref={ref}
      className="section-padding bg-[#F8F9FC]"
      aria-label="Latest insights"
    >
      <div className="container-xl">
        {/* Header */}
        <SectionHeader
          eyebrow="Resources & Thinking"
          title="Insights From **Our** Experts"
          subtitle="Practical guides, industry analysis, and strategic thinking built to help you grow."
        />

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-12 flex justify-center"
        >
          <Button href="/insights" variant="secondary" size="lg" rightIcon={<ArrowRight size={18} />}>
            View All Articles
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
