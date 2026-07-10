'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Map, Layers, Rocket, BarChart } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { staggerContainer, fadeUp } from '@/lib/animations';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const steps = [
  {
    number: '01',
    title: 'Discovery & Audit',
    description:
      'We dive deep into your business, competitors, current performance, and goals. You get a comprehensive audit report before we begin.',
    duration: 'Wk 1–2',
    Icon: Search,
  },
  {
    number: '02',
    title: 'Strategy & Planning',
    description:
      'Data shapes the plan. We deliver a full project roadmap, content plan, and success metrics before writing a single line of code.',
    duration: 'Wk 2–3',
    Icon: Map,
  },
  {
    number: '03',
    title: 'Design & Development',
    description:
      'Our designers and engineers collaborate in sprints. You review progress every two weeks with live staging access throughout.',
    duration: 'Wk 3–8',
    Icon: Layers,
  },
  {
    number: '04',
    title: 'Testing & Launch',
    description:
      'QA, performance audits, cross-browser testing, and soft-launch to a test audience before full production deployment.',
    duration: 'Wk 8–10',
    Icon: Rocket,
  },
  {
    number: '05',
    title: 'Growth & Optimisation',
    description:
      'Launch is day one, not the finish line. Monthly strategy calls, A/B testing, and data-driven iterations keep you ahead.',
    duration: 'Ongoing',
    Icon: BarChart,
  },
] as const;

// ---------------------------------------------------------------------------
// StepCard
// ---------------------------------------------------------------------------

function StepCard({
  step,
  index,
  isActive,
  onClick,
}: {
  step: (typeof steps)[number];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const { number, title, description, duration, Icon } = step;

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onClick={onClick}
      className={[
        'relative flex flex-col rounded-2xl border p-8 shadow-sm transition-all duration-300 cursor-pointer select-none',
        isActive
          ? 'border-[#4F46E5] bg-white shadow-[0_8px_32px_rgba(79,70,229,0.18)]'
          : 'border-[#E5E7EB] bg-white hover:shadow-md hover:-translate-y-0.5',
      ].join(' ')}
    >
      {/* Step number */}
      <span
        className="text-5xl font-extrabold leading-none bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)] bg-clip-text text-transparent"
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Icon */}
      <span
        className={[
          'mt-4 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300',
          isActive ? 'bg-[#4F46E5]' : 'bg-[#EEF2FF]',
        ].join(' ')}
      >
        <Icon
          size={20}
          className={isActive ? 'text-white' : 'text-[#4F46E5]'}
          strokeWidth={2}
        />
      </span>

      {/* Text */}
      <h3 className="mt-4 text-base font-bold text-[#0B0F1A]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#374151]">{description}</p>

      {/* Duration chip */}
      <span className="mt-5 self-start rounded-full bg-[#F1F3F9] px-3 py-1 text-xs font-medium text-[#6B7280]">
        {duration}
      </span>

      {/* Active indicator bar */}
      {isActive && (
        <motion.span
          layoutId="step-active-bar"
          className="absolute bottom-0 left-6 right-6 h-[3px] rounded-t-full bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)]"
        />
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Connector — desktop only
// ---------------------------------------------------------------------------

function StepConnector() {
  return (
    <div className="hidden lg:flex items-center self-start mt-[3.25rem] shrink-0">
      <span className="block h-px w-6 bg-[#E5E7EB]" />
      <span className="block h-2 w-2 rounded-full bg-[#C7D2FE]" />
      <span className="block h-px w-6 bg-[#E5E7EB]" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// ProcessSection
// ---------------------------------------------------------------------------

export default function ProcessSection() {
  const [active, setActive] = useState<number>(0);

  return (
    <section className="bg-[#F8F9FC] section-padding">
      <div className="container-xl">
        {/* Header */}
        <SectionHeader
          eyebrow="How We Work"
          title="A Process Built for **Results**"
          subtitle="Every engagement follows a proven framework that ensures alignment, quality, and on-time delivery."
        />

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 flex flex-col gap-4 lg:flex-row lg:gap-0 lg:items-stretch"
        >
          {steps.map((step, i) => (
            <React.Fragment key={step.number}>
              <div className="lg:flex-1">
                <StepCard
                  step={step}
                  index={i}
                  isActive={active === i}
                  onClick={() => setActive(i)}
                />
              </div>
              {i < steps.length - 1 && <StepConnector />}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Mobile progress dots */}
        <div className="mt-6 flex justify-center gap-2 lg:hidden">
          {steps.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to step ${i + 1}`}
              onClick={() => setActive(i)}
              className={[
                'h-2 rounded-full transition-all duration-300',
                active === i
                  ? 'w-6 bg-[#4F46E5]'
                  : 'w-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
