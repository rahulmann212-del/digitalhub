import type { Metadata } from 'next'
import HeroSection from '@/components/sections/home/HeroSection'
import MarqueeSection from '@/components/sections/home/MarqueeSection'
import ServicesOverview from '@/components/sections/home/ServicesOverview'
import MetricsSection from '@/components/sections/home/MetricsSection'
import WorkPreview from '@/components/sections/home/WorkPreview'
import ProcessSection from '@/components/sections/home/ProcessSection'
import WhyChooseUs from '@/components/sections/home/WhyChooseUs'
import IndustriesSection from '@/components/sections/home/IndustriesSection'
import TestimonialsSection from '@/components/sections/home/TestimonialsSection'
import InsightsPreview from '@/components/sections/home/InsightsPreview'
import FaqSection from '@/components/sections/home/FaqSection'

// ─── Page Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'DigitalHub — Premium Digital Agency for Web, Marketing & Research',
  description:
    'We help ambitious businesses grow online with custom web development, data-driven digital marketing, and actionable market research. 150+ projects, 12 countries, 98% client retention.',
  alternates: {
    canonical: 'https://digitalhub.agency',
  },
  openGraph: {
    url: 'https://digitalhub.agency',
    title: 'DigitalHub — Premium Digital Agency',
    description:
      'Custom web development, digital marketing, and market research for ambitious businesses worldwide.',
  },
}

// ─── Structured Data ──────────────────────────────────────────────────────────

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DigitalHub',
  url: 'https://digitalhub.agency',
  logo: 'https://digitalhub.agency/favicon/apple-touch-icon.png',
  description:
    'Premium digital agency specialising in web development, digital marketing, and market research.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'hello@digitalhub.agency',
  },
  sameAs: [
    'https://linkedin.com/company/digitalhub',
    'https://twitter.com/digitalhub',
    'https://instagram.com/digitalhub',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DigitalHub',
  url: 'https://digitalhub.agency',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://digitalhub.agency/insights?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/*
       * Section order is deliberate:
       *  1. Hero          — first impression, CTAs, trust chips
       *  2. Marquee       — social proof via client logos / ticker
       *  3. Services      — what we offer (core value prop)
       *  4. Metrics       — credibility through numbers
       *  5. Work          — proof via featured case studies
       *  6. Process       — how we work (trust builder)
       *  7. WhyChooseUs   — differentiators
       *  8. Industries    — breadth of experience
       *  9. Testimonials  — peer validation
       * 10. Insights      — thought leadership / content
       * 11. FAQ           — objection handling + final CTA
       */}

      <HeroSection />
      <MarqueeSection />
      <ServicesOverview />
      <MetricsSection />
      <WorkPreview />
      <ProcessSection />
      <WhyChooseUs />
      <IndustriesSection />
      <TestimonialsSection />
      <InsightsPreview />
      <FaqSection />
    </>
  )
}
