'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Local Testimonials Data (Updated with your provided names)
// ---------------------------------------------------------------------------
const localTestimonials = [
  {
    id: '1',
    author: 'Sanjay',
    title: 'Director',
    company: 'Swastik Group',
    rating: 5,
    initials: 'S',
    gradient: 'from-blue-500 to-cyan-500',
    quote: 'Their strategic approach to our online sales operations was incredible. They helped us optimize our margins and scale efficiently without losing focus on quality.'
  },
  {
    id: '2',
    author: 'Prajneesh',
    title: 'Manager',
    company: 'P&S Intelligence',
    rating: 5,
    initials: 'P',
    gradient: 'from-purple-500 to-indigo-500',
    quote: 'The data-driven insights they provided for our multi-vendor setup were game-changing. We saw a massive improvement in overall platform performance.'
  },
  {
    id: '3',
    author: 'Ankita',
    title: 'Director',
    company: 'Avanya Group',
    rating: 5,
    initials: 'A',
    gradient: 'from-rose-400 to-red-500',
    quote: 'They helped us scale our direct-to-consumer brand faster than we thought possible. Their execution is flawless and perfectly tailored to our market.'
  },
  {
    id: '4',
    author: 'Brijesh',
    title: 'Co-founder',
    company: 'Shivay Services',
    rating: 5,
    initials: 'B',
    gradient: 'from-emerald-400 to-teal-500',
    quote: 'Thanks to their digital strategies, our operational overheads and return-to-origin costs dropped dramatically, boosting our overall profitability.'
  },
  {
    id: '5',
    author: 'Harshit',
    title: 'Manager',
    company: 'NVA Restaurant',
    rating: 5,
    initials: 'H',
    gradient: 'from-amber-400 to-orange-500',
    quote: 'A truly professional team that understands how to drive targeted footfall and convert digital traffic into highly loyal, returning customers.'
  },
  {
    id: '6',
    author: 'Neha',
    title: 'Team Lead',
    company: 'Ralhi Travels',
    rating: 5,
    initials: 'N',
    gradient: 'from-pink-500 to-rose-400',
    quote: 'The visual campaigns and marketing scripts they designed completely elevated our corporate branding. The engagement we are seeing now is phenomenal.'
  }
]

// ---------------------------------------------------------------------------
// StarRating
// ---------------------------------------------------------------------------

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i < rating ? 'text-amber-400' : 'text-slate-200'}
          style={{ fontSize: '1.1rem', lineHeight: 1 }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

function Avatar({ initials, gradient }: { initials: string; gradient: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm ring-2 ring-white",
        `bg-gradient-to-br ${gradient}`
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

// ---------------------------------------------------------------------------
// TestimonialCard
// ---------------------------------------------------------------------------

function TestimonialCard({ testimonial }: { testimonial: typeof localTestimonials[0] }) {
  const { quote, author, title, company, rating, initials, gradient } = testimonial

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[24px]",
        "border border-slate-200/60 bg-white p-8",
        "shadow-sm transition-all duration-300",
        "hover:border-blue-500/30 hover:shadow-[0_16px_40px_-10px_rgba(37,99,235,0.15)]"
      )}
    >
      {/* ── Decorative Background Quote Icon ── */}
      <div className="absolute right-6 top-6 z-0 text-slate-100 transition-colors duration-300 group-hover:text-blue-50">
        <Quote size={80} className="rotate-180 opacity-50" strokeWidth={1} fill="currentColor" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {/* Stars */}
        <StarRating rating={rating} />

        {/* Quote */}
        <blockquote className="mt-6 flex-1">
          <p className="text-base italic leading-relaxed text-slate-600">
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>

        {/* Divider */}
        <div className="mt-6 h-px w-full bg-slate-100" aria-hidden="true" />

        {/* Author */}
        <footer className="mt-6 flex items-center gap-4">
          <Avatar initials={initials} gradient={gradient} />
          <div>
            <cite className="block not-italic text-sm font-bold text-slate-900">
              {author}
            </cite>
            <p className="mt-0.5 text-xs font-medium text-slate-500">
              {title}, <span className="text-blue-600">{company}</span>
            </p>
          </div>
        </footer>
      </div>
    </motion.article>
  )
}

// ---------------------------------------------------------------------------
// TestimonialsSection
// ---------------------------------------------------------------------------

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 border-t border-slate-200/50">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-100/40 blur-[120px]" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <SectionHeader
            eyebrow="Client Stories"
            title={
              <>
                Trusted by Leaders. <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Proven by Results.
                </span>
              </>
            }
            subtitle="Hear directly from the partners who have transformed their businesses with our digital solutions."
          />
        </div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {localTestimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}