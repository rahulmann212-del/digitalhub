'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { faqs } from '@/lib/data/faqs';
import type { FaqItem } from '@/types';
import { staggerContainer, fadeUp, slideInLeft, slideInRight } from '@/lib/animations';

// ---------------------------------------------------------------------------
// FaqAccordionItem
// ---------------------------------------------------------------------------

function FaqAccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E5E7EB] last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 rounded-sm"
      >
        <span
          className={[
            'text-base font-semibold transition-colors duration-200 pr-4',
            isOpen ? 'text-[#4F46E5]' : 'text-[#0B0F1A]',
          ].join(' ')}
        >
          {faq.question}
        </span>

        <span
          className={[
            'shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200',
            isOpen
              ? 'bg-[#4F46E5] text-white'
              : 'bg-[#EEF2FF] text-[#4F46E5]',
          ].join(' ')}
          aria-hidden="true"
        >
          {isOpen ? <X size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-[#374151]">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FaqSection
// ---------------------------------------------------------------------------

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-[#F8F9FC] section-padding">
      <div className="container-xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-5 lg:gap-20">
          {/* ── Left column (35%) ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]"
            >
              <span aria-hidden="true" className="text-[#7C3AED]">✦</span>
              Got Questions
            </motion.p>

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold leading-tight text-[#0B0F1A] md:text-4xl"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Frequently Asked{' '}
              <span className="bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)] bg-clip-text text-transparent">
                Questions
              </span>
            </motion.h2>

            {/* Body */}
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-[#6B7280]">
              Everything you need to know before we start working together.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#4F46E5] px-6 py-3 text-sm font-semibold text-[#4F46E5] transition-all duration-200 hover:bg-[#4F46E5]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
              >
                Can&apos;t find your answer? Contact us →
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Right column (65%) ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-3 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm px-8 py-4"
          >
            {faqs.map((faq) => (
              <motion.div key={faq.id} variants={fadeUp}>
                <FaqAccordionItem
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => toggle(faq.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
