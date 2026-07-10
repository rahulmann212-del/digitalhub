'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, MessageSquare, ShieldCheck } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  staggerContainer,
  fadeUp,
  slideInLeft,
  slideInRight,
} from '@/lib/animations';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const metrics = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Retention' },
  { value: '4.9/5', label: 'Client Rating' },
  { value: '12', label: 'Countries' },
] as const;

const features = [
  {
    id: 'strategy',
    Icon: Target,
    title: 'Strategy Before Execution',
    body: 'We never start building until we understand your business goals, audience, and competitive landscape. Strategy is not an add-on.',
  },
  {
    id: 'funnel',
    Icon: TrendingUp,
    title: 'Full-Funnel Thinking',
    body: 'Every deliverable is connected to a business outcome. We measure what matters: traffic, leads, and revenue — not just impressions.',
  },
  {
    id: 'communication',
    Icon: MessageSquare,
    title: 'Transparent Communication',
    body: 'Weekly progress reports, dedicated project workspace, and zero surprises. You are always fully informed on progress.',
  },
  {
    id: 'ownership',
    Icon: ShieldCheck,
    title: 'End-to-End Ownership',
    body: 'One agency, one team, full accountability. No outsourcing, no finger-pointing. Your results are our responsibility.',
  },
] as const;

// ---------------------------------------------------------------------------
// MetricCard
// ---------------------------------------------------------------------------

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col rounded-xl bg-[#F8F9FC] p-6"
    >
      <span
        className="text-4xl font-extrabold leading-none bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)] bg-clip-text text-transparent"
      >
        {value}
      </span>
      <span className="mt-2 text-sm font-medium text-[#6B7280]">{label}</span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// FeatureItem
// ---------------------------------------------------------------------------

function FeatureItem({
  Icon,
  title,
  body,
  index,
}: (typeof features)[number] & { index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="group flex gap-5 py-6 border-b border-[#E5E7EB] last:border-b-0"
    >
      {/* Icon */}
      <span className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)] shadow-[0_4px_16px_rgba(79,70,229,0.3)]">
        <Icon size={22} className="text-white" strokeWidth={2} />
      </span>

      {/* Text */}
      <div className="flex flex-col">
        <h3 className="text-base font-bold text-[#0B0F1A] leading-snug">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[#374151]">{body}</p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// WhyChooseUs
// ---------------------------------------------------------------------------

export default function WhyChooseUs() {
  return (
    <section className="bg-white section-padding">
      <div className="container-xl">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-5">
          {/* ── Left column (40%) ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-2 flex flex-col"
          >
            <SectionHeader
              eyebrow="Our Difference"
              title="Why 150+ Businesses Choose DigitalHub"
              align="left"
              maxWidth="max-w-none"
              className="!mx-0"
            />

            <motion.p
              variants={fadeUp}
              className="mt-6 text-base leading-relaxed text-[#6B7280]"
            >
              We operate as strategic partners, not task-execution vendors. Our
              obsession with your business outcomes is what separates us.
            </motion.p>

            {/* Metrics 2×2 */}
            <motion.div
              variants={staggerContainer}
              className="mt-10 grid grid-cols-2 gap-4"
            >
              {metrics.map((m) => (
                <MetricCard key={m.label} {...m} />
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right column (60%) ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-3 flex flex-col divide-y divide-[#E5E7EB]"
          >
            {features.map((feature, index) => (
              <FeatureItem key={feature.id} {...feature} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
