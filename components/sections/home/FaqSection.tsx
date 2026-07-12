'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { faqs } from '@/lib/data/faqs'
import type { FaqItem } from '@/types'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// FaqAccordionItem
// ---------------------------------------------------------------------------

function FaqAccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FaqItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        <span
          className={cn(
            'pr-6 text-base sm:text-lg font-bold transition-colors duration-200',
            isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'
          )}
        >
          {faq.question}
        </span>

        {/* Minimal Animated Plus/Cross Icon */}
        <span
          className={cn(
            'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300',
            isOpen
              ? 'rotate-45 bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
          )}
          aria-hidden="true"
        >
          <Plus size={18} strokeWidth={2.5} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-sm sm:text-base leading-relaxed text-slate-600">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// FaqSection
// ---------------------------------------------------------------------------

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-32 border-t border-slate-200/50">
      {/* Background Soft Glows (Absolute positioning kept safe behind hidden overflow) */}
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-50 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-blue-50/50 blur-[100px]" aria-hidden="true" />

      {/* Main Container - Ensuring it never breaks out of the screen */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
        
        {/* Safe Flexbox Split Layout */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
          
          {/* ── LEFT SIDE (Heading & Sticky Details) ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex-shrink-0 lg:w-5/12 lg:sticky lg:top-32 self-start"
          >
            <motion.span
              variants={fadeUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-600/15 bg-blue-600/5 px-3 py-1.5 text-xs font-semibold text-blue-600"
            >
              <span className="animate-pulse">✦</span> FAQs
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mb-6 text-4xl font-extrabold leading-tight tracking-tighter text-slate-900 lg:text-5xl"
            >
              Got Questions? <br className="hidden sm:block lg:hidden" />
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                We have answers.
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} className="mb-8 text-base leading-relaxed text-slate-600">
              Everything you need to know about our process, pricing, and what to expect when we work together.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-blue-600 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Ask a Question <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT SIDE (Questions List) ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full lg:w-7/12"
          >
            {/* Clean border-top to start the list nicely */}
            <div className="border-t border-slate-200">
              {faqs.map((faq) => (
                <motion.div key={faq.id} variants={fadeUp}>
                  <FaqAccordionItem
                    faq={faq}
                    isOpen={openId === faq.id}
                    onToggle={() => toggle(faq.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}