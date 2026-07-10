'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart2,
  Heart,
  ShoppingBag,
  Home,
  BookOpen,
  Plane,
  Layers,
  Factory,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { staggerContainer, fadeUp } from '@/lib/animations';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const industries = [
  {
    id: 'finance',
    name: 'Finance & Fintech',
    tagline: 'Compliance-aware digital presence',
    Icon: BarChart2,
    iconBg: 'linear-gradient(135deg,#DBEAFE 0%,#C7D2FE 100%)',
    iconColor: '#2563EB',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    tagline: 'Trust-building patient journeys',
    Icon: Heart,
    iconBg: 'linear-gradient(135deg,#D1FAE5 0%,#A7F3D0 100%)',
    iconColor: '#059669',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & Retail',
    tagline: 'Conversion-focused shopping experiences',
    Icon: ShoppingBag,
    iconBg: 'linear-gradient(135deg,#FEF3C7 0%,#FDE68A 100%)',
    iconColor: '#D97706',
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    tagline: 'Lead-generating property platforms',
    Icon: Home,
    iconBg: 'linear-gradient(135deg,#FCE7F3 0%,#FBCFE8 100%)',
    iconColor: '#DB2777',
  },
  {
    id: 'education',
    name: 'Education & EdTech',
    tagline: 'Engaging learning environments',
    Icon: BookOpen,
    iconBg: 'linear-gradient(135deg,#EDE9FE 0%,#DDD6FE 100%)',
    iconColor: '#7C3AED',
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Tourism',
    tagline: 'Booking-optimized brand experiences',
    Icon: Plane,
    iconBg: 'linear-gradient(135deg,#CFFAFE 0%,#A5F3FC 100%)',
    iconColor: '#0891B2',
  },
  {
    id: 'saas',
    name: 'B2B & SaaS',
    tagline: 'Pipeline-building growth systems',
    Icon: Layers,
    iconBg: 'linear-gradient(135deg,#E0E7FF 0%,#C7D2FE 100%)',
    iconColor: '#4F46E5',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    tagline: 'Modern digital transformation',
    Icon: Factory,
    iconBg: 'linear-gradient(135deg,#F3F4F6 0%,#E5E7EB 100%)',
    iconColor: '#374151',
  },
] as const;

// ---------------------------------------------------------------------------
// IndustryTile
// ---------------------------------------------------------------------------

function IndustryTile({
  name,
  tagline,
  Icon,
  iconBg,
  iconColor,
}: (typeof industries)[number]) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.02 }}
      className="group relative flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md cursor-default"
      style={{ '--card-hover-bg': 'linear-gradient(135deg,#F0F4FF,#F5F0FF)' } as React.CSSProperties}
    >
      {/* Hover gradient overlay */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'linear-gradient(135deg,#F0F4FF 0%,#F5F0FF 100%)' }}
      />

      {/* Icon container */}
      <span
        className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-xl"
        style={{ background: iconBg }}
      >
        <Icon size={30} style={{ color: iconColor }} strokeWidth={1.75} />
      </span>

      {/* Text */}
      <p className="relative z-10 mt-4 text-base font-semibold text-[#0B0F1A]">{name}</p>
      <p className="relative z-10 mt-1 text-sm text-[#6B7280]">{tagline}</p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// IndustriesSection
// ---------------------------------------------------------------------------

export default function IndustriesSection() {
  return (
    <section className="bg-[#F8F9FC] section-padding">
      <div className="container-xl">
        {/* Header */}
        <SectionHeader
          eyebrow="Industry Expertise"
          title="Built for **Your** Industry"
          subtitle="We have partnered with businesses across sectors, understanding the unique challenges each industry faces."
        />

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {industries.map((industry) => (
            <IndustryTile key={industry.id} {...industry} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
