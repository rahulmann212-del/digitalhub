import type { CaseStudy } from '@/types'

export const caseStudies: CaseStudy[] = [
  {
    id: 'finovest',
    slug: 'finovest-growth-platform',
    title: 'FinoVest Growth Platform',
    client: 'FinoVest',
    industry: 'Fintech',
    services: ['Web Development', 'Digital Marketing', 'SEO'],
    tagline: '+312% qualified lead generation in 4 months',
    challenge:
      'FinoVest, a Series A fintech startup offering retail investment management, had a legacy website that was slow, not mobile-optimised, and failing to convert visitors. Their cost-per-lead was $340 — nearly three times the industry benchmark — and organic search visibility was negligible.',
    solution:
      'We rebuilt their digital presence from the ground up: a new Next.js web application with sub-1.5s load times, a content-led SEO strategy targeting high-intent investment keywords, and a conversion-focused landing page architecture with A/B tested CTAs. We also launched LinkedIn and Google Ads campaigns with tightly segmented audience targeting.',
    results: [
      '+312% increase in qualified leads within 4 months of launch',
      'Cost-per-lead reduced from $340 to $98 (71% reduction)',
      'Organic search traffic grew 440% in 6 months',
      'Lighthouse performance score improved from 41 to 97',
      'Mobile conversion rate increased by 280%',
    ],
    metrics: [
      { label: 'Lead Growth', value: '+312%', change: 'In 4 months' },
      { label: 'Cost Per Lead', value: '$98', change: 'Down from $340' },
      { label: 'Organic Traffic', value: '+440%', change: 'In 6 months' },
      { label: 'Perf Score', value: '97/100', change: 'Up from 41' },
    ],
    tags: ['Fintech', 'Web App', 'SEO', 'PPC'],
    featured: true,
    year: 2024,
    duration: '4 months',
    testimonial: {
      quote:
        "DigitalHub didn't just build us a website — they built us a growth engine. Our lead volume tripled in the first quarter post-launch, and the quality of those leads has transformed our sales pipeline.",
      author: 'Sarah Mitchell',
      title: 'CEO, FinoVest',
    },
  },
  {
    id: 'medcore',
    slug: 'medcore-patient-portal',
    title: 'MedCore Patient Portal',
    client: 'MedCore Health',
    industry: 'Healthcare',
    services: ['Web Development', 'UX Design'],
    tagline: '+180% appointment bookings via redesigned digital experience',
    challenge:
      'MedCore Health, a network of 14 specialist clinics, was running on a 2016-era website with no online booking capability. Patients were calling reception for appointments, overwhelming staff. The digital experience was creating friction and costing the business new patients.',
    solution:
      'We designed and developed a HIPAA-aware patient portal with integrated online booking, secure messaging, and clinic-specific landing pages optimised for local SEO. The interface was built to prioritise clarity and trust — critical in healthcare contexts — with accessibility at WCAG AA standard.',
    results: [
      '+180% increase in online appointment bookings within 90 days',
      'Reception call volume reduced by 45%, freeing staff capacity',
      'Local search rankings improved for all 14 clinic locations',
      'Patient satisfaction score (NPS) rose from +22 to +61',
      '40% reduction in appointment no-shows via automated reminders',
    ],
    metrics: [
      { label: 'Bookings', value: '+180%', change: 'In 90 days' },
      { label: 'Call Volume', value: '-45%', change: 'Staff freed up' },
      { label: 'NPS Score', value: '+61', change: 'Up from +22' },
      { label: 'No-Shows', value: '-40%', change: 'Via automation' },
    ],
    tags: ['Healthcare', 'UX Design', 'Booking System', 'Local SEO'],
    featured: true,
    year: 2024,
    duration: '10 weeks',
    testimonial: {
      quote:
        "The team's understanding of healthcare compliance and patient trust was remarkable. They asked questions no other agency had thought to ask. The result is a digital experience our patients genuinely compliment.",
      author: 'James Okafor',
      title: 'Head of Marketing, MedCore Health',
    },
  },
  {
    id: 'apex-realty',
    slug: 'apex-realty-marketing',
    title: 'Apex Realty PPC Campaign',
    client: 'Apex Realty Group',
    industry: 'Real Estate',
    services: ['Digital Marketing', 'PPC', 'Landing Page Design'],
    tagline: '4.2× ROAS on Google Ads in the first 60 days',
    challenge:
      'Apex Realty, a premium real estate group operating across three cities, had been running Google Ads internally with inconsistent results and a return on ad spend (ROAS) of just 1.4×. Their landing pages were generic, ad copy was untested, and there was no retargeting strategy in place.',
    solution:
      'We audited and rebuilt their entire paid search infrastructure: restructured campaign architecture, wrote buyer-intent ad copy, created property-specific landing pages with video walkthroughs, and implemented full-funnel retargeting across Google Display, YouTube, and Meta. Attribution tracking was rebuilt from scratch.',
    results: [
      '4.2× ROAS achieved within the first 60 days',
      'Cost per property enquiry reduced by 64%',
      'Ad click-through rate improved from 1.8% to 6.4%',
      'Landing page conversion rate increased from 2.1% to 8.7%',
      'Total enquiry volume tripled while budget remained flat',
    ],
    metrics: [
      { label: 'ROAS', value: '4.2×', change: 'Up from 1.4×' },
      { label: 'Cost/Enquiry', value: '-64%', change: 'Reduced significantly' },
      { label: 'CTR', value: '6.4%', change: 'Up from 1.8%' },
      { label: 'Conv Rate', value: '8.7%', change: 'Up from 2.1%' },
    ],
    tags: ['Real Estate', 'PPC', 'Google Ads', 'CRO'],
    featured: true,
    year: 2023,
    duration: '3 months',
    testimonial: {
      quote:
        '4× return on our ad spend. Not just a metric — a transformation. Our sales team has never been busier, and the quality of enquiries has been exceptional.',
      author: 'Priya Nair',
      title: 'COO, Apex Realty Group',
    },
  },
  {
    id: 'ledgr',
    slug: 'ledgr-market-research',
    title: 'Ledgr TAM Expansion Study',
    client: 'Ledgr Platform',
    industry: 'B2B SaaS',
    services: ['Market Research', 'Competitive Analysis', 'Strategy'],
    tagline: 'Identified a $2.4M TAM expansion opportunity for B2B SaaS',
    challenge:
      'Ledgr, a B2B accounting automation platform, had plateaued at $1.8M ARR. Their founding team had deep product knowledge but limited market intelligence. They needed clarity on whether to expand vertically (deeper into accounting) or horizontally (adjacent workflow automation) before their Series A raise.',
    solution:
      'We conducted a 12-week comprehensive market research engagement: 47 customer interviews, competitive teardowns of 14 rival platforms, analysis of publicly available market sizing data, and a proprietary survey of 200 SMB finance decision-makers. We delivered a 68-page strategic intelligence report and a board-ready presentation.',
    results: [
      'Identified a $2.4M incremental TAM in adjacent HR compliance workflows',
      'Revealed 3 underserved customer segments with 70%+ upsell potential',
      'Competitive positioning map guided 4 product roadmap decisions',
      'Board presentation supported successful $4.2M Series A close',
      '2 enterprise deals won directly using competitive positioning insights',
    ],
    metrics: [
      { label: 'TAM Found', value: '$2.4M', change: 'New opportunity' },
      { label: 'Segments', value: '3', change: 'Underserved discovered' },
      { label: 'Series A', value: '$4.2M', change: 'Closed successfully' },
      { label: 'Enterprise Deals', value: '2', change: 'Won with insights' },
    ],
    tags: ['B2B SaaS', 'Market Research', 'Competitive Intelligence', 'Strategy'],
    featured: true,
    year: 2024,
    duration: '12 weeks',
    testimonial: {
      quote:
        'The market research report they delivered changed how we positioned our product entirely. It was the foundation of our Series A pitch and directly influenced two of our biggest enterprise wins.',
      author: 'Tom Bergmann',
      title: 'Founder, Ledgr Platform',
    },
  },
  {
    id: 'stylelux',
    slug: 'stylelux-ecommerce',
    title: 'StyleLux E-Commerce Replatform',
    client: 'StyleLux',
    industry: 'E-Commerce & Retail',
    services: ['Web Development', 'Digital Marketing'],
    tagline: '+224% online revenue in 6 months post-replatform',
    challenge:
      'StyleLux, a premium fashion brand with a loyal offline customer base, had a Shopify store that was underperforming severely. Mobile conversion was 0.8%, the checkout abandoned at 76%, and the brand feel was entirely inconsistent with their in-store experience.',
    solution:
      'We designed and built a custom Shopify 2.0 theme that matched the brand\'s premium positioning, rebuilt the checkout flow, added size recommendation AI, and launched an integrated email + SMS retention marketing programme. Post-launch, we ran targeted Meta and Google Shopping campaigns.',
    results: [
      '+224% online revenue within 6 months of relaunch',
      'Mobile conversion rate improved from 0.8% to 3.4%',
      'Checkout abandonment rate reduced from 76% to 47%',
      'Email marketing contributes 34% of total online revenue',
      'Average order value increased by 42%',
    ],
    metrics: [
      { label: 'Revenue', value: '+224%', change: 'In 6 months' },
      { label: 'Mobile Conv.', value: '3.4%', change: 'Up from 0.8%' },
      { label: 'Abandonment', value: '-47%', change: 'Checkout optimised' },
      { label: 'AOV', value: '+42%', change: 'Average order value' },
    ],
    tags: ['E-Commerce', 'Shopify', 'Fashion', 'Email Marketing'],
    featured: false,
    year: 2023,
    duration: '14 weeks',
  },
  {
    id: 'novatech',
    slug: 'novatech-demand-generation',
    title: 'NovaTech Demand Generation',
    client: 'NovaTech Systems',
    industry: 'B2B Technology',
    services: ['Digital Marketing', 'Content Strategy', 'SEO'],
    tagline: '3× pipeline growth through integrated content & SEO strategy',
    challenge:
      'NovaTech, a B2B cybersecurity SaaS, had a strong product but almost no inbound pipeline. 90% of their revenue came from outbound sales. The marketing team was running disconnected campaigns with no unified content strategy and virtually no search engine visibility.',
    solution:
      'We built a comprehensive inbound demand generation engine: 40+ SEO-optimised technical articles, a gated research report that became an industry reference, a nurture email sequence, and a distribution strategy spanning LinkedIn, newsletters, and podcast sponsorships.',
    results: [
      '3× growth in inbound sales pipeline within 9 months',
      'Organic search visibility increased by 680%',
      'Gated research report downloaded 4,200+ times',
      '22 qualified demos booked directly from content in Q4',
      'Sales cycle shortened by 3 weeks (content pre-qualifies leads)',
    ],
    metrics: [
      { label: 'Pipeline', value: '3×', change: 'In 9 months' },
      { label: 'Organic Traffic', value: '+680%', change: 'Search visibility' },
      { label: 'Downloads', value: '4,200+', change: 'Gated report' },
      { label: 'Demos', value: '22', change: 'From content in Q4' },
    ],
    tags: ['B2B Tech', 'Content Marketing', 'SEO', 'Demand Generation'],
    featured: false,
    year: 2024,
    duration: '9 months',
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => c.featured)
}
