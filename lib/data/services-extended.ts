/**
 * lib/data/services-extended.ts
 *
 * Rich per-service content for the /services/[slug] detail pages.
 * Imports the canonical Service type and re-uses slugs from services.ts.
 * Does NOT duplicate any data already in services.ts.
 */

// ─── Per-service technology stacks ────────────────────────────────────────────

export interface TechItem {
  name: string
  category: string
}

export const serviceTechnologies: Record<string, TechItem[]> = {
  'web-development': [
    { name: 'Next.js', category: 'Framework' },
    { name: 'React', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Runtime' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Framer Motion', category: 'Animation' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Prisma', category: 'ORM' },
    { name: 'Vercel', category: 'Hosting' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Shopify', category: 'E-Commerce' },
    { name: 'Contentful', category: 'CMS' },
  ],
  'digital-marketing': [
    { name: 'Google Ads', category: 'Paid Search' },
    { name: 'Meta Ads', category: 'Paid Social' },
    { name: 'LinkedIn Ads', category: 'Paid Social' },
    { name: 'Semrush', category: 'SEO' },
    { name: 'Ahrefs', category: 'SEO' },
    { name: 'HubSpot', category: 'CRM' },
    { name: 'Klaviyo', category: 'Email' },
    { name: 'GA4', category: 'Analytics' },
    { name: 'Hotjar', category: 'UX Analytics' },
    { name: 'Looker Studio', category: 'Reporting' },
    { name: 'Zapier', category: 'Automation' },
    { name: 'Mailchimp', category: 'Email' },
  ],
  'market-research': [
    { name: 'Typeform', category: 'Surveys' },
    { name: 'SurveyMonkey', category: 'Surveys' },
    { name: 'Hotjar', category: 'Behaviour' },
    { name: 'FullStory', category: 'Behaviour' },
    { name: 'Semrush', category: 'Competitive' },
    { name: 'Similarweb', category: 'Competitive' },
    { name: 'Tableau', category: 'Visualisation' },
    { name: 'SPSS', category: 'Statistics' },
    { name: 'UserTesting', category: 'UX Research' },
    { name: 'Dovetail', category: 'Insights' },
    { name: 'NPS System', category: 'Feedback' },
    { name: 'Miro', category: 'Collaboration' },
  ],
}

// ─── Per-service key benefits ──────────────────────────────────────────────────

export interface Benefit {
  icon: string // emoji used as icon
  title: string
  description: string
}

export const serviceBenefits: Record<string, Benefit[]> = {
  'web-development': [
    {
      icon: '⚡',
      title: 'Blazing-Fast Performance',
      description:
        'Every site we build achieves sub-2-second load times and Lighthouse scores above 95. Speed is a feature, not an afterthought.',
    },
    {
      icon: '📈',
      title: 'Built to Convert',
      description:
        'Architecture, copy, and UX are designed together around one goal: turning visitors into leads and customers at the lowest possible cost.',
    },
    {
      icon: '🔒',
      title: 'Secure by Design',
      description:
        'HTTPS everywhere, CSP headers, dependency auditing, and OWASP-aligned practices baked in from day one — not patched on at the end.',
    },
    {
      icon: '♿',
      title: 'WCAG 2.1 Accessible',
      description:
        'Every project is built to WCAG 2.1 AA standards, widening your audience and protecting you from legal liability.',
    },
    {
      icon: '📱',
      title: 'Mobile-First Responsive',
      description:
        'Over 60% of your visitors are on mobile. We design and test for every viewport from 320px up, without compromise.',
    },
    {
      icon: '🔧',
      title: 'Maintainable Codebase',
      description:
        'Clean, documented, well-tested code. You\'ll never inherit a black-box you can\'t update. Full handover included.',
    },
  ],
  'digital-marketing': [
    {
      icon: '🎯',
      title: 'Full-Funnel Strategy',
      description:
        'We connect every campaign to a business outcome — awareness to revenue — with clear attribution at every stage of the funnel.',
    },
    {
      icon: '📊',
      title: 'Transparent Reporting',
      description:
        'Monthly ROI dashboards in plain language. You\'ll always know exactly what your budget is delivering and where we\'re optimising next.',
    },
    {
      icon: '🤖',
      title: 'Automation-First',
      description:
        'Email sequences, lead nurturing, and retargeting that run 24/7, converting prospects while you focus on running your business.',
    },
    {
      icon: '🧪',
      title: 'Continuous Testing',
      description:
        'A/B testing, multivariate experiments, and data-backed iterations that compound improvements month after month.',
    },
    {
      icon: '🌐',
      title: 'Multi-Channel Mastery',
      description:
        'Google, Meta, LinkedIn, email, and organic SEO — orchestrated together for maximum reach and minimum wasted spend.',
    },
    {
      icon: '📉',
      title: 'CPL Reduction Focus',
      description:
        'We consistently reduce cost-per-lead by 40–70% through audience refinement, creative testing, and landing page optimisation.',
    },
  ],
  'market-research': [
    {
      icon: '🔍',
      title: 'Evidence-Based Decisions',
      description:
        'Replace assumptions with verified insights. Every strategic recommendation is backed by data you can audit and trust.',
    },
    {
      icon: '🏆',
      title: 'Competitive Advantage',
      description:
        'Understand exactly how you\'re positioned against competitors — their strengths, gaps, pricing, and messaging — then outmanoeuvre them.',
    },
    {
      icon: '👥',
      title: 'Real Customer Insight',
      description:
        'Qualitative and quantitative research reveals what your customers actually think, want, and need — not what you assume they do.',
    },
    {
      icon: '💰',
      title: 'Reduced Business Risk',
      description:
        'Validate ideas before you invest. Identify market opportunities before committing significant budget to a product or market.',
    },
    {
      icon: '📋',
      title: 'Actionable Deliverables',
      description:
        'Research reports designed for executives — clear findings, ranked recommendations, and prioritised action plans, not academic papers.',
    },
    {
      icon: '🔄',
      title: 'Continuous Intelligence',
      description:
        'Markets change. Our ongoing research retainers keep you updated on competitor moves, sentiment shifts, and emerging opportunities.',
    },
  ],
}

// ─── Per-service process steps ─────────────────────────────────────────────────

export interface ServiceProcessStep {
  number: string
  title: string
  description: string
  duration: string
}

export const serviceProcess: Record<string, ServiceProcessStep[]> = {
  'web-development': [
    {
      number: '01',
      title: 'Discovery & Architecture',
      description:
        'Business goals, technical requirements, and user journeys are mapped. We deliver a full project spec before any design begins.',
      duration: 'Wk 1–2',
    },
    {
      number: '02',
      title: 'Design & Prototype',
      description:
        'High-fidelity Figma designs with interactive prototypes reviewed by stakeholders before development begins.',
      duration: 'Wk 2–4',
    },
    {
      number: '03',
      title: 'Development Sprints',
      description:
        'Two-week agile sprints with live staging access. You review real progress throughout — no black boxes.',
      duration: 'Wk 4–10',
    },
    {
      number: '04',
      title: 'QA & Performance Audit',
      description:
        'Cross-browser, cross-device testing, Lighthouse audits, accessibility review, and security hardening.',
      duration: 'Wk 10–12',
    },
    {
      number: '05',
      title: 'Launch & Handover',
      description:
        'Zero-downtime deployment, DNS cutover, monitoring setup, team training, and complete documentation handover.',
      duration: 'Wk 12',
    },
  ],
  'digital-marketing': [
    {
      number: '01',
      title: 'Audit & Baseline',
      description:
        'We audit your existing channels, ad accounts, analytics, and competitors to establish accurate performance baselines.',
      duration: 'Wk 1',
    },
    {
      number: '02',
      title: 'Strategy & Planning',
      description:
        'Full-funnel strategy document covering channels, audiences, budget allocation, KPIs, and 90-day milestones.',
      duration: 'Wk 2',
    },
    {
      number: '03',
      title: 'Setup & Launch',
      description:
        'Campaign architecture, ad creative, landing pages, tracking, and attribution built and launched across all channels.',
      duration: 'Wk 3–4',
    },
    {
      number: '04',
      title: 'Optimise & Scale',
      description:
        'Weekly bid adjustments, creative testing, audience refinement, and conversion rate optimisation on landing pages.',
      duration: 'Ongoing',
    },
    {
      number: '05',
      title: 'Report & Iterate',
      description:
        'Monthly strategy calls, plain-language ROI dashboards, and revised 90-day plans based on performance data.',
      duration: 'Monthly',
    },
  ],
  'market-research': [
    {
      number: '01',
      title: 'Scope & Methodology',
      description:
        'Define research questions, success criteria, and the right methods — surveys, interviews, desk research, or behavioural data.',
      duration: 'Wk 1',
    },
    {
      number: '02',
      title: 'Data Collection',
      description:
        'Primary and secondary research executed: interviews, surveys, competitor analysis, market data, and customer behaviour.',
      duration: 'Wk 2–4',
    },
    {
      number: '03',
      title: 'Analysis & Synthesis',
      description:
        'Statistical analysis, thematic coding, and pattern identification across all data sources into unified insight clusters.',
      duration: 'Wk 4–5',
    },
    {
      number: '04',
      title: 'Insight Report',
      description:
        'Executive-ready report with ranked findings, strategic implications, and prioritised action recommendations.',
      duration: 'Wk 5–6',
    },
    {
      number: '05',
      title: 'Presentation & Action Planning',
      description:
        'Live walkthrough with your leadership team, Q&A, and facilitated action planning session to embed findings.',
      duration: 'Wk 6',
    },
  ],
}

// ─── Per-service FAQs ──────────────────────────────────────────────────────────

export interface ServiceFaq {
  question: string
  answer: string
}

export const serviceFaqs: Record<string, ServiceFaq[]> = {
  'web-development': [
    {
      question: 'Do you build with our existing CMS or recommend one?',
      answer:
        'Both. We can integrate with your existing CMS (WordPress, Contentful, Sanity, Webflow, etc.) or recommend the right one based on your team\'s technical comfort and content workflow. We never lock you into a platform we\'re not confident in.',
    },
    {
      question: 'Will the site be fast on mobile?',
      answer:
        'Guaranteed. We optimise for Core Web Vitals (LCP, FID, CLS) and test across all major devices. Every site we build achieves a Lighthouse mobile performance score above 90, typically above 95.',
    },
    {
      question: 'What happens if something breaks after launch?',
      answer:
        'All projects include a 60-day post-launch support window at no additional cost. After that, we offer affordable monthly maintenance retainers that include uptime monitoring, security patches, and priority support.',
    },
    {
      question: 'Can you redesign an existing site without breaking SEO?',
      answer:
        'Yes — we have a documented SEO migration process: 301 redirect mapping, canonical URL preservation, schema migration, and pre/post launch ranking monitoring. We\'ve executed dozens of site migrations with zero loss in organic traffic.',
    },
  ],
  'digital-marketing': [
    {
      question: 'How long before I see results?',
      answer:
        'Paid channels (Google/Meta Ads) typically show meaningful data within 2–4 weeks. SEO is a 3–6 month compounding strategy. We set realistic expectations upfront and share interim milestones so you see directional progress from the first month.',
    },
    {
      question: 'Do you guarantee specific results?',
      answer:
        'We never guarantee specific rankings or revenue figures — anyone who does is not being honest with you. We do guarantee: a rigorous, data-driven approach, transparent reporting, and a relentless focus on improving your cost-per-acquisition month over month.',
    },
    {
      question: 'What is the minimum retainer?',
      answer:
        'Digital marketing retainers start at $1,500/month for a single channel (e.g., SEO only). Full-funnel management across multiple channels typically starts at $3,500/month. We provide a fixed-price proposal after the discovery call.',
    },
    {
      question: 'Who owns the ad accounts and data?',
      answer:
        '100% you. We operate as admins inside your own Google Ads, Meta Business Manager, and analytics accounts. When we part ways, you keep everything — accounts, history, audiences, and all accumulated data.',
    },
  ],
  'market-research': [
    {
      question: 'How many people do you survey or interview?',
      answer:
        'Sample size depends on your market and the statistical confidence needed. For quantitative surveys we typically aim for 200–500 responses for SMB markets; 50–150 for B2B enterprise segments. Qualitative interviews are usually 15–30 participants selected for maximum representativeness.',
    },
    {
      question: 'How confidential is the research?',
      answer:
        'All research is conducted under a strict NDA. Raw data, participant identities, and findings are never shared with third parties. We can also provide blinded research where participants are unaware of your brand affiliation.',
    },
    {
      question: 'How long does a research project take?',
      answer:
        'A focused competitor analysis or persona project takes 4–6 weeks. A comprehensive market sizing and opportunity assessment typically runs 8–10 weeks. We provide a detailed timeline in the project proposal.',
    },
    {
      question: 'Do you recruit participants for user research?',
      answer:
        'Yes. We handle participant recruitment, screening, incentivisation, and scheduling. You can also provide your own customer list if you prefer — we\'ll work with either approach.',
    },
  ],
}

// ─── Per-service industries ────────────────────────────────────────────────────

export const serviceIndustries: Record<string, string[]> = {
  'web-development': [
    'Fintech & Financial Services',
    'Healthcare & Medtech',
    'E-Commerce & Retail',
    'SaaS & Technology',
    'Real Estate & PropTech',
    'Education & EdTech',
    'Professional Services',
    'Media & Publishing',
  ],
  'digital-marketing': [
    'E-Commerce & DTC Brands',
    'B2B SaaS Companies',
    'Professional Services',
    'Healthcare & Wellness',
    'Real Estate Agencies',
    'Hospitality & Travel',
    'Education Providers',
    'Fintech Startups',
  ],
  'market-research': [
    'Venture-Backed Startups',
    'Enterprise Corporations',
    'Consumer Goods Brands',
    'Healthcare Organisations',
    'Financial Services',
    'Government & NGOs',
    'Media & Entertainment',
    'Technology Companies',
  ],
}

// ─── Comparison table (services landing page only) ────────────────────────────

export interface ComparisonRow {
  feature: string
  digitalhub: boolean | string
  typicalAgency: boolean | string
  freelancer: boolean | string
}

export const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Strategy before execution',
    digitalhub: true,
    typicalAgency: false,
    freelancer: false,
  },
  {
    feature: 'Fixed-price proposals',
    digitalhub: true,
    typicalAgency: false,
    freelancer: 'Sometimes',
  },
  {
    feature: 'Dedicated project manager',
    digitalhub: true,
    typicalAgency: 'Sometimes',
    freelancer: false,
  },
  {
    feature: 'Full code & asset ownership',
    digitalhub: true,
    typicalAgency: false,
    freelancer: true,
  },
  {
    feature: 'Monthly ROI reporting',
    digitalhub: true,
    typicalAgency: false,
    freelancer: false,
  },
  {
    feature: 'Multi-discipline in-house team',
    digitalhub: true,
    typicalAgency: 'Sometimes',
    freelancer: false,
  },
  {
    feature: '60-day post-launch support',
    digitalhub: true,
    typicalAgency: false,
    freelancer: false,
  },
  {
    feature: 'NDA-protected engagements',
    digitalhub: true,
    typicalAgency: true,
    freelancer: 'Sometimes',
  },
]

// ─── Services landing page highlights ─────────────────────────────────────────

export interface ServiceHighlight {
  icon: string
  value: string
  label: string
}

export const serviceHighlights: ServiceHighlight[] = [
  { icon: '🚀', value: '150+', label: 'Projects delivered' },
  { icon: '⭐', value: '4.9/5', label: 'Average client rating' },
  { icon: '🌍', value: '12', label: 'Countries served' },
  { icon: '📈', value: '98%', label: 'Client retention rate' },
]
