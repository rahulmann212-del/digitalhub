/**
 * app/about/page.tsx
 * Server Component — /about page
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Users, Globe2, Award, Heart } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren } from '@/components/motion/StaggerChildren'

// ─── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'About DigitalHub — Our Story, Team & Values',
  description:
    'We\'re a team of strategists, designers, engineers, and marketers united by one goal: helping ambitious businesses grow online. Learn our story, values, and the people behind the work.',
  alternates: { canonical: 'https://digitalhub.agency/about' },
  openGraph: {
    url: 'https://digitalhub.agency/about',
    title: 'About DigitalHub — Premium Digital Agency',
    description:
      'Meet the team behind 150+ successful projects across 12 countries. Strategists, designers, engineers, and marketers who care deeply about your results.',
  },
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const team = [
  {
    name: 'Marcus Reid',
    title: 'Founder & CEO',
    bio: 'Former engineering lead at a Fortune 500 tech company. Marcus founded DigitalHub after seeing how much value businesses were leaving on the table through poor digital strategy.',
    initials: 'MR',
    gradient: 'from-blue-500 to-indigo-600',
    expertise: ['Product Strategy', 'Web Architecture', 'Business Growth'],
    linkedIn: '#',
  },
  {
    name: 'Priya Nair',
    title: 'Head of Digital Marketing',
    bio: 'Ex-Google performance marketing specialist with a decade of experience building full-funnel acquisition systems for B2B and B2C businesses across 8 verticals.',
    initials: 'PN',
    gradient: 'from-violet-500 to-purple-600',
    expertise: ['Paid Search', 'SEO', 'Marketing Analytics'],
    linkedIn: '#',
  },
  {
    name: 'Elena Vasquez',
    title: 'Head of Design',
    bio: 'Product designer who spent years at leading design studios in London and Berlin before joining DigitalHub. Elena believes great design is invisible — until it converts.',
    initials: 'EV',
    gradient: 'from-rose-500 to-pink-600',
    expertise: ['UX Design', 'Brand Identity', 'Design Systems'],
    linkedIn: '#',
  },
  {
    name: 'James Okafor',
    title: 'Head of Research',
    bio: 'Market research director with a background in strategy consulting. James has led 60+ research engagements and specialises in translating insight into competitive advantage.',
    initials: 'JO',
    gradient: 'from-emerald-500 to-teal-600',
    expertise: ['Market Research', 'Competitive Intelligence', 'Customer Strategy'],
    linkedIn: '#',
  },
  {
    name: 'Tom Bergmann',
    title: 'Lead Engineer',
    bio: 'Full-stack engineer and Next.js specialist. Tom has built web applications handling millions of monthly users and brings an obsessive focus on performance to every project.',
    initials: 'TB',
    gradient: 'from-amber-500 to-orange-600',
    expertise: ['Next.js', 'TypeScript', 'Performance Engineering'],
    linkedIn: '#',
  },
  {
    name: 'Aisha Khalid',
    title: 'Head of Client Success',
    bio: 'Ensures every client engagement runs on time, on brief, and exceeds expectations. Aisha is the reason our retention rate sits at 98% — she treats your goals as her own.',
    initials: 'AK',
    gradient: 'from-sky-500 to-blue-600',
    expertise: ['Project Management', 'Client Relations', 'Growth Strategy'],
    linkedIn: '#',
  },
]

const values = [
  {
    icon: '🎯',
    title: 'Outcomes Over Outputs',
    description:
      'We measure our success by your business metrics — not deliverables. A website launched is not a success. A website that doubles your leads is.',
  },
  {
    icon: '🔬',
    title: 'Strategy Before Execution',
    description:
      'Every engagement begins with understanding your goals, audience, and competitive landscape. We never build before we\'ve thought.',
  },
  {
    icon: '🤝',
    title: 'Radical Transparency',
    description:
      'No black boxes, no spin. We tell you what\'s working, what\'s not, and what we\'re going to do about it — in plain English, every time.',
  },
  {
    icon: '📐',
    title: 'Excellence in Craft',
    description:
      'We care deeply about the quality of our work. Every line of code, every campaign, every research report reflects that pride.',
  },
  {
    icon: '🌱',
    title: 'Long-Term Thinking',
    description:
      'We build for your long-term independence, not dependency on us. Full asset ownership, comprehensive documentation, and team training are standard.',
  },
  {
    icon: '🌍',
    title: 'Global by Design',
    description:
      'Our team spans multiple time zones and we\'ve worked with clients across 12 countries. We build with global audiences in mind by default.',
  },
]

const milestones = [
  { year: '2018', event: 'DigitalHub founded by Marcus Reid in London' },
  { year: '2019', event: 'First 10 clients across web development and SEO' },
  { year: '2020', event: 'Expanded into digital marketing and market research' },
  { year: '2021', event: 'Grew to 8 full-time team members; 50+ projects delivered' },
  { year: '2022', event: 'First international clients — expanded to 5 countries' },
  { year: '2023', event: '100th project milestone; launched dedicated research practice' },
  { year: '2024', event: '150+ projects, 12 countries, 98% client retention' },
]

const stats = [
  { value: '150+', label: 'Projects Delivered', icon: <Award size={24} aria-hidden="true" /> },
  { value: '12', label: 'Countries Served', icon: <Globe2 size={24} aria-hidden="true" /> },
  { value: '98%', label: 'Client Retention', icon: <Heart size={24} aria-hidden="true" /> },
  { value: '6', label: 'Core Team Members', icon: <Users size={24} aria-hidden="true" /> },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="about-hero"
        className="relative overflow-hidden bg-white pb-20 pt-16 md:pb-28 md:pt-24"
        aria-label="About hero"
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

        <div className="container-xl relative z-10">
          <FadeUp className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#4F46E5]/20 bg-[#EEF2FF] px-4 py-2 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">
              ✦ Our Story
            </span>

            <h1
              className="mt-6 font-extrabold leading-[1.07] tracking-tight text-[#0B0F1A]"
              style={{ fontSize: 'clamp(40px, 6.5vw, 78px)' }}
            >
              The Team Behind{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Your Growth
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#6B7280]">
              We&apos;re a team of strategists, designers, engineers, and marketers united by one goal: helping
              ambitious businesses grow online. We&apos;re not a vendor — we&apos;re a partner.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary" size="lg" id="about-hero-cta-primary">
                Work With Us
              </Button>
              <Button href="/work" variant="secondary" size="lg" id="about-hero-cta-secondary">
                See Our Work
              </Button>
            </div>
          </FadeUp>

          {/* Stats row */}
          <FadeUp delay={0.2} className="mt-14">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-5 text-center shadow-sm"
                >
                  <span className="text-[#4F46E5]">{s.icon}</span>
                  <span
                    className="text-3xl font-extrabold leading-none tracking-tight"
                    style={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs font-medium text-[#6B7280]">{s.label}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          OUR STORY
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="about-story"
        className="section-padding bg-[#F8F9FC]"
        aria-label="Our story"
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <FadeUp>
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-[#4F46E5]">
                <span aria-hidden="true">✦</span> Founded 2018
              </p>
              <h2
                className="mt-4 font-bold leading-tight tracking-tight text-[#0B0F1A]"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
              >
                Built on a{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Simple Belief
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#6B7280]">
                DigitalHub was founded in 2018 with a frustration: too many businesses were working with
                agencies that prioritised billable hours over business outcomes, deliverables over results,
                and client dependency over client independence.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#6B7280]">
                We built something different. An agency where every engagement starts with strategy, every
                deliverable is tied to a business goal, and success is defined by your metrics — not ours.
                Six years later, 150+ projects across 12 countries, and a 98% client retention rate say
                that model works.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {[
                  'Strategy before execution, every time',
                  'Full asset ownership on project completion',
                  'Transparent, fixed-price proposals',
                  'Measured by your outcomes, not our outputs',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF]">
                      <Check size={11} strokeWidth={2.5} className="text-[#4F46E5]" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-[#374151]">{item}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Timeline */}
            <FadeUp delay={0.1}>
              <div className="flex flex-col">
                {milestones.map((m, i) => (
                  <div key={m.year} className="relative flex gap-5">
                    {/* Connector line */}
                    {i < milestones.length - 1 && (
                      <div
                        className="absolute left-[19px] top-10 bottom-0 w-px bg-[#E5E7EB]"
                        aria-hidden="true"
                      />
                    )}
                    {/* Year circle */}
                    <div
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                      style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
                    >
                      {m.year.slice(2)}
                    </div>
                    {/* Content */}
                    <div className="pb-8">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#4F46E5]">
                        {m.year}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#374151]">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TEAM
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="about-team"
        className="section-padding bg-white"
        aria-label="Meet the team"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="Meet the Team"
              title="The People Behind **Every** Project"
              subtitle="Senior specialists who bring deep expertise — not junior account managers who relay messages. You work directly with the people doing the work."
            />
          </FadeUp>

          <StaggerChildren
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            delayChildren={0.06}
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="group relative flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-[0_12px_40px_rgba(79,70,229,0.12)] hover:-translate-y-0.5 hover:border-[#4F46E5]/30"
                role="article"
                aria-label={`Team member: ${member.name}`}
              >
                {/* Avatar */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-extrabold text-white ${member.gradient}`}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#0B0F1A]">{member.name}</h3>
                <p
                  className="mt-0.5 text-sm font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {member.title}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{member.bio}</p>

                {/* Expertise tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {member.expertise.map((e) => (
                    <span
                      key={e}
                      className="rounded-full bg-[#F1F3F9] px-3 py-1 text-xs font-medium text-[#374151]"
                    >
                      {e}
                    </span>
                  ))}
                </div>

                {/* LinkedIn */}
                <a
                  href={member.linkedIn}
                  id={`about-team-linkedin-${member.name.toLowerCase().replace(' ', '-')}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] transition-all duration-200 hover:gap-3"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  LinkedIn Profile
                  <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          VALUES
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="about-values"
        className="section-padding bg-[#0B0F1A]"
        aria-label="Our values"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="What We Stand For"
              title="The **Principles** That Guide Every Decision"
              subtitle="These aren't posters on a wall. They're the operating principles we return to when making every project decision."
            />
          </FadeUp>

          {/* Override colours for dark bg */}
          <style>{`
            #about-values h2 { color: #F9FAFB; }
            #about-values p  { color: #94A3B8; }
            #about-values .eyebrow-label { color: #818CF8; }
          `}</style>

          <StaggerChildren
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            delayChildren={0.06}
          >
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:border-white/10"
              >
                <span className="text-3xl leading-none">{v.icon}</span>
                <h3 className="mt-4 text-lg font-bold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{v.description}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          HOW WE WORK
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="about-how-we-work"
        className="section-padding bg-white"
        aria-label="How we work"
      >
        <div className="container-xl">
          <FadeUp>
            <SectionHeader
              eyebrow="Our Approach"
              title="Partner-First, Not **Vendor-First**"
              subtitle="We operate differently from the agency model you've likely experienced before."
            />
          </FadeUp>

          <StaggerChildren
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2"
            delayChildren={0.08}
          >
            {[
              {
                title: 'You Always Know What\'s Happening',
                desc: 'Fortnightly sprint reviews, live project dashboards, and a dedicated Slack channel. You\'re never chasing an update.',
                icon: '📊',
              },
              {
                title: 'Senior People Do the Work',
                desc: 'Your project is run by senior specialists — not passed to a junior after the pitch. The people you meet are the people who build.',
                icon: '👥',
              },
              {
                title: 'Fixed Prices, No Surprises',
                desc: 'We provide a fixed-price proposal before any engagement begins. The scope is clear, the investment is clear, and we hold ourselves to it.',
                icon: '💰',
              },
              {
                title: 'Everything You Pay for Belongs to You',
                desc: 'Code, designs, accounts, data — all of it is transferred to you in full at project completion. No lock-in, no dependency.',
                icon: '🔑',
              },
              {
                title: 'We Tell You What You Need to Hear',
                desc: 'If your strategy has a problem, we\'ll say so. If your budget won\'t achieve your goals, we\'ll tell you upfront. Always.',
                icon: '🎙️',
              },
              {
                title: 'Launch Is Day One, Not the Finish Line',
                desc: 'Most results compound over time. We offer ongoing retainers and track your metrics post-launch because that\'s where the real impact is built.',
                icon: '🚀',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-5 rounded-2xl border border-[#E5E7EB] bg-[#F8F9FC] p-7"
              >
                <span className="text-2xl leading-none shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-base font-bold text-[#0B0F1A]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{item.desc}</p>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="about-final-cta"
        className="section-padding relative overflow-hidden"
        aria-label="Work with us"
        style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #0B0F1A 50%, #1E1B4B 100%)' }}
      >
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div
            className="absolute left-1/4 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 65%)' }}
          />
          <div
            className="absolute right-1/4 bottom-0 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 65%)' }}
          />
        </div>

        <div className="container-xl relative z-10 text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#818CF8]/30 bg-[#4F46E5]/20 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-[#A5B4FC]">
              ✦ Ready to Work Together?
            </span>

            <h2
              className="mx-auto mt-6 max-w-3xl font-extrabold leading-tight tracking-tight text-white"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}
            >
              Let&apos;s Build Something{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Exceptional Together
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#94A3B8]">
              Book a free 30-minute discovery call. We&apos;ll learn about your goals, share relevant
              experience, and tell you honestly whether we&apos;re the right fit.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg" id="about-final-cta-primary">
                Book a Free Discovery Call
              </Button>
              <Link
                href="/work"
                id="about-final-cta-work"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5"
              >
                See Our Work
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {['✓ Free discovery call', '✓ No obligation', '✓ Senior team members', '✓ Fixed-price proposals'].map(
                (t) => (
                  <span key={t} className="text-sm font-medium text-[#64748B]">
                    {t}
                  </span>
                ),
              )}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
