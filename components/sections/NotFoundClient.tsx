'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Home, Search } from 'lucide-react'

// ─── Quick-links shown beneath the 404 message ────────────────────────────────

const quickLinks = [
  { label: 'Homepage', href: '/', icon: Home },
  { label: 'Our Services', href: '/services', icon: Search },
  { label: 'Our Work', href: '/work', icon: ArrowRight },
  { label: 'Contact Us', href: '/contact', icon: ArrowRight },
]

// ─── NotFoundClient ────────────────────────────────────────────────────────────

export default function NotFoundClient() {
  return (
    <section
      className="relative flex min-h-[80vh] w-full items-center overflow-hidden bg-white"
      aria-label="Page not found"
    >
      {/* Subtle dot-grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23374151'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Gradient blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="container-xl relative z-10 py-24 text-center">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="block text-[120px] font-extrabold leading-none tracking-tighter md:text-[160px]"
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            aria-hidden="true"
          >
            404
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="mt-2 text-3xl font-bold text-[#0B0F1A] md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Page Not Found
        </motion.h1>

        {/* Body */}
        <motion.p
          className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#6B7280]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you
          back on track.
        </motion.p>

        {/* Quick links */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          {quickLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-semibold text-[#374151] shadow-sm transition-all duration-200 hover:border-[#4F46E5]/30 hover:shadow-md hover:text-[#4F46E5]"
            >
              <Icon size={14} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Link
            href="/"
            id="not-found-home-cta"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-[0_8px_32px_rgba(37,99,235,0.30)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
          >
            <Home size={16} aria-hidden="true" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
