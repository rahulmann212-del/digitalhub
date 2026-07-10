/**
 * app/contact/page.tsx
 * Server Component wrapper — /contact page
 * Contact form is in a client component for interactivity
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren } from '@/components/motion/StaggerChildren'
import { ContactFormClient } from './ContactFormClient'

// ─── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Contact DigitalHub — Book a Free Discovery Call',
  description:
    'Ready to grow your business online? Book a free 30-minute discovery call with DigitalHub. No sales pitch — just an honest conversation about your goals and whether we\'re the right fit.',
  alternates: { canonical: 'https://digitalhub.agency/contact' },
  openGraph: {
    url: 'https://digitalhub.agency/contact',
    title: 'Contact DigitalHub — Free Discovery Call',
    description:
      'Book a free 30-minute discovery call. Get a fixed-price proposal within 48 hours. No obligation.',
  },
}

// ─── Contact info ─────────────────────────────────────────────────────────────

const contactDetails = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'hello@digitalhub.agency',
    href: 'mailto:hello@digitalhub.agency',
    subtext: 'We reply within 4 business hours',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+1 (555) 012-3456',
    href: 'tel:+15550123456',
    subtext: 'Mon–Fri, 9am–6pm EST',
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: 'New York, NY',
    href: null,
    subtext: 'Remote-first, globally available',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: '< 4 Hours',
    href: null,
    subtext: 'During business hours',
  },
]

const trustItems = [
  { icon: '✓', label: 'Free discovery call — no obligation' },
  { icon: '✓', label: 'Fixed-price proposal within 48h' },
  { icon: '✓', label: 'NDA available on request' },
  { icon: '✓', label: 'Senior team members on every call' },
  { icon: '✓', label: '98% client retention rate' },
  { icon: '✓', label: 'Full asset ownership guaranteed' },
]

const faqs = [
  {
    question: 'How quickly will you respond?',
    answer:
      'All enquiries are responded to within 4 business hours. For urgent projects, you can also call us directly.',
  },
  {
    question: 'What happens after I submit the form?',
    answer:
      'You\'ll receive a confirmation email immediately. One of our senior team members will reach out within 4 hours to schedule your free 30-minute discovery call.',
  },
  {
    question: 'Is the discovery call really free?',
    answer:
      'Yes, completely. The call is an honest conversation about your goals, your current situation, and whether we\'re the right partner. No hard sell, no pressure.',
  },
  {
    question: 'How long until I get a proposal?',
    answer:
      'After the discovery call, we typically deliver a detailed fixed-price proposal within 48 hours. For complex projects, we may request a second call before proposing.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-hero"
        className="relative overflow-hidden bg-white pb-16 pt-16 md:pb-20 md:pt-24"
        aria-label="Contact hero"
      >
        {/* Gradient blobs */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div
            className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 65%)' }}
          />
          <div
            className="absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)' }}
          />
        </div>
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23374151'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <div className="container-xl relative z-10 text-center">
          <FadeUp className="mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#4F46E5]/20 bg-[#EEF2FF] px-4 py-2 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">
              ✦ Start a Conversation
            </span>

            <h1
              className="mt-6 font-extrabold leading-[1.07] tracking-tight text-[#0B0F1A]"
              style={{ fontSize: 'clamp(40px, 6.5vw, 76px)' }}
            >
              Let&apos;s Build Something{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Great Together
              </span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-[#6B7280]">
              Tell us about your project and goals. We&apos;ll review your submission and schedule a free
              30-minute discovery call — no sales pitch, just an honest conversation.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN: FORM + SIDEBAR
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-main"
        className="pb-20 bg-[#F8F9FC] md:pb-28"
        aria-label="Contact form and details"
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:items-start">

            {/* ── Contact Form (Client Component) ────────────────────────── */}
            <FadeUp>
              <ContactFormClient />
            </FadeUp>

            {/* ── Sidebar ─────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-6">
              {/* Contact details */}
              <FadeUp delay={0.1}>
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm">
                  <h2 className="text-lg font-bold text-[#0B0F1A]">Get in Touch</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    Prefer to reach out directly? We&apos;re always available.
                  </p>

                  <div className="mt-6 flex flex-col gap-5">
                    {contactDetails.map(({ icon: Icon, label, value, href, subtext }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                          style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(124,58,237,0.1) 100%)' }}
                          aria-hidden="true"
                        >
                          <Icon size={17} className="text-[#4F46E5]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
                            {label}
                          </p>
                          {href ? (
                            <a
                              href={href}
                              id={`contact-sidebar-${label.toLowerCase().replace(' ', '-')}`}
                              className="mt-0.5 text-sm font-semibold text-[#0B0F1A] hover:text-[#4F46E5] transition-colors duration-200"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="mt-0.5 text-sm font-semibold text-[#0B0F1A]">{value}</p>
                          )}
                          <p className="mt-0.5 text-xs text-[#9CA3AF]">{subtext}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Trust badges */}
              <FadeUp delay={0.15}>
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm">
                  <h3 className="text-sm font-bold text-[#0B0F1A]">What You Can Expect</h3>
                  <div className="mt-4 flex flex-col gap-3">
                    {trustItems.map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                        <span className="text-sm text-[#374151]">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Social links */}
              <FadeUp delay={0.2}>
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm">
                  <h3 className="text-sm font-bold text-[#0B0F1A]">Follow Our Work</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {[
                      { label: 'LinkedIn', href: 'https://linkedin.com/company/digitalhub' },
                      { label: 'Twitter / X', href: 'https://twitter.com/digitalhub' },
                      { label: 'Instagram', href: 'https://instagram.com/digitalhub' },
                    ].map(({ label, href }) => (
                      <a
                        key={label}
                        href={href}
                        id={`contact-social-${label.toLowerCase().split('/')[0].trim().replace(' ', '-')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-[#F8F9FC] px-4 py-2 text-sm font-medium text-[#374151] transition-all duration-200 hover:border-[#4F46E5]/30 hover:text-[#4F46E5]"
                      >
                        {label}
                        <ArrowRight size={12} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-faq"
        className="section-padding bg-white"
        aria-label="Contact FAQ"
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-5 lg:gap-20">
            {/* Left */}
            <FadeUp className="lg:col-span-2 flex flex-col gap-4">
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">
                <span className="text-[#7C3AED]" aria-hidden="true">✦</span>
                Common Questions
              </p>
              <h2 className="text-3xl font-bold leading-tight text-[#0B0F1A] md:text-4xl">
                What to Expect{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  When You Reach Out
                </span>
              </h2>
              <p className="text-base leading-relaxed text-[#6B7280]">
                Everything you need to know about getting in touch and what happens next.
              </p>
            </FadeUp>

            {/* Right */}
            <FadeUp delay={0.1} className="lg:col-span-3">
              <div className="rounded-2xl border border-[#E5E7EB] bg-white px-8 py-4 shadow-sm">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group border-b border-[#E5E7EB] last:border-b-0"
                  >
                    <summary className="flex cursor-pointer select-none list-none items-center justify-between py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2">
                      <span className="text-base font-semibold text-[#0B0F1A] pr-4">
                        {faq.question}
                      </span>
                      <span
                        className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF2FF] text-[#4F46E5] transition-transform duration-200 group-open:rotate-45"
                        aria-hidden="true"
                      >
                        <ArrowRight size={14} strokeWidth={2.5} className="-rotate-45" />
                      </span>
                    </summary>
                    <p className="pb-5 text-sm leading-relaxed text-[#374151]">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-alternative-cta"
        className="section-padding bg-[#F8F9FC]"
        aria-label="Alternative contact options"
      >
        <div className="container-xl">
          <FadeUp>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                {
                  icon: '📋',
                  title: 'See Our Work',
                  desc: 'Explore 150+ projects across industries before reaching out.',
                  href: '/work',
                  cta: 'View Case Studies',
                  id: 'contact-alt-work',
                },
                {
                  icon: '⚙️',
                  title: 'Explore Services',
                  desc: 'Learn what we offer and how each service creates value.',
                  href: '/services',
                  cta: 'View Services',
                  id: 'contact-alt-services',
                },
                {
                  icon: '💡',
                  title: 'Read Our Insights',
                  desc: 'See how we think before you decide to work with us.',
                  href: '/insights',
                  cta: 'Browse Articles',
                  id: 'contact-alt-insights',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm"
                >
                  <span className="text-3xl leading-none">{item.icon}</span>
                  <h3 className="mt-4 text-base font-bold text-[#0B0F1A]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280] flex-1">{item.desc}</p>
                  <Link
                    href={item.href}
                    id={item.id}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] transition-all duration-200 hover:gap-3"
                  >
                    {item.cta}
                    <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
