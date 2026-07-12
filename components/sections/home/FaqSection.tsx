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
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between py-4 sm:py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        <span
          className={cn(
            'pr-4 text-sm sm:text-base font-bold transition-colors duration-200',
            isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'
          )}
        >
          {faq.question}
        </span>

        {/* Animated Plus to Cross Icon */}
        <span
          className={cn(
            ' flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300',
            isOpen
              ? 'rotate-45 bg-blue-600 text-white'
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
            <p className="pb-5 pr-10 text-sm leading-relaxed text-slate-600">
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
    <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* ── Left column: Sticky Header ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-4"
          >
            {/* position-sticky aur top-32 ki wajah se ye scroll hone par fixed rahega */}
            <div className="lg:sticky lg:top-32 flex flex-col items-start">
              <motion.span
                variants={fadeUp}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-600/15 bg-blue-600/5 px-3 py-1.5 text-xs font-semibold text-blue-600"
              >
                <span className="animate-pulse">✦</span> Got Questions
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter text-slate-900 md:text-4xl lg:text-5xl"
              >
                Frequently Asked{' '}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </motion.h2>

              <motion.p variants={fadeUp} className="mb-8 text-sm sm:text-base leading-relaxed text-slate-600">
                Everything you need to know before we start working together. Can&apos;t find what you&apos;re looking for? Reach out to us.
              </motion.p>

              <motion.div variants={fadeUp}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600 hover:text-blue-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  Contact Support <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right column: Compact Accordion ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-8"
          >
            <div className="rounded-[24px] bg-white p-6 sm:p-8 shadow-sm border border-slate-200/60">
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