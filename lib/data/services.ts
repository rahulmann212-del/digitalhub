import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Custom Web Development',
    shortTitle: 'Web',
    tagline: 'Fast, scalable digital experiences built for business growth.',
    description:
      'Modern websites and web applications designed for speed, scalability, and measurable business growth.',
    icon: 'Code2',
    capabilities: [
'Custom Websites',
'Web Applications',
'Ecommerce',
'SEO Optimized'
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
      'Performance driven marketing campaigns that increase visibility, generate qualified leads, and improve ROI.',
    icon: 'TrendingUp',
    capabilities: [
'SEO',
'Google Ads',
'Social Media',
'Email Marketing'
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
      'Research and competitive intelligence that help businesses identify opportunities and make confident decisions.',
    icon: 'Search',
    capabilities: [
'Competitor Analysis',
'Market Trends',
'Customer Research',
'Market Sizing'
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
