import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Custom Web Development',
    shortTitle: 'Web',
    tagline: 'Fast, scalable digital experiences built for business growth.',
    description:
      'We design and develop high performance websites, eCommerce platforms, and custom web applications that combine outstanding user experience with measurable business growth. Every solution is built for speed, security, scalability, and long term success.',
    icon: 'Code2',
    capabilities: [
      'Custom Website Design & Development',
      'Web Application Development',
      'E-Commerce Solutions (Shopify, WooCommerce)',
      'Performance Optimization & Core Web Vitals',
      'CMS Integration (WordPress, Contentful, Sanity)',
      'Progressive Web Apps (PWA)',
      'API Development & Third-Party Integrations',
      'Ongoing Maintenance & Support',
    ],
    outcomes: [
      'Sub-2-second page load times',
      'Lighthouse scores above 95',
      'Measurable increase in conversion rate',
      'Scalable architecture that grows with you',
    ],
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortTitle: 'Marketing',
    tagline: 'Marketing strategies focused on measurable growth and ROI.',
    description:
      'From SEO and paid advertising to content strategy and marketing automation, we create integrated campaigns that generate qualified leads, increase visibility, and maximize return on investment.',
    icon: 'TrendingUp',
    capabilities: [
      'Search Engine Optimization (SEO)',
      'Pay-Per-Click Advertising (Google, Meta, LinkedIn)',
      'Social Media Strategy & Management',
      'Email Marketing Automation',
      'Conversion Rate Optimization (CRO)',
      'Content Marketing & Strategy',
      'Marketing Analytics & Attribution',
      'Remarketing & Audience Segmentation',
    ],
    outcomes: [
      'Consistent month-over-month traffic growth',
      'Qualified lead generation at target CPL',
      'Transparent ROI reporting and attribution',
      'Full-funnel visibility from awareness to close',
    ],
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'market-research',
    slug: 'market-research',
    title: 'Strategic Market Research',
    shortTitle: 'Research',
    tagline: 'Business intelligence that supports confident decisions.',
    description:
      'Decisions backed by data, not assumptions. We provide the competitive intelligence and market insight your business needs to outmanoeuvre competition, find new opportunities, and position your brand for sustainable growth.',
    icon: 'Search',
    capabilities: [
      'Competitor Analysis & Benchmarking',
      'Customer Persona Development',
      'Industry & Market Trend Analysis',
      'User Behaviour & UX Research',
      'Brand Perception Audits',
      'Market Sizing & Opportunity Assessment',
      'Customer Journey Mapping',
      'Qualitative & Quantitative Research',
    ],
    outcomes: [
      'Validated product-market fit insights',
      'Identified untapped market opportunities',
      'Evidence-based positioning strategy',
      'Reduced business risk through data',
    ],
    gradient: 'from-sky-500 to-blue-600',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
