'use client'

import { cn } from '@/lib/utils'

// ─── Company list ─────────────────────────────────────────────────────────────
const COMPANIES = [
  'FinoVest',
  'MedCore Health',
  'Apex Realty',
  'NovaTech Systems',
  'StyleLux',
  'Ledgr Platform',
  'TerraForm AG',
  'Solaris Capital',
  'BrightPath Education',
  'Nexus Analytics',
  'Meridian Group',
  'ClearView Health',
  'Vantage Properties',
  'Orbit Commerce',
]

// ─── Single marquee track ─────────────────────────────────────────────────────
interface MarqueeTrackProps {
  reversed?: boolean
}

function MarqueeTrack({ reversed = false }: MarqueeTrackProps) {
  // Duplicate for seamless loop
  const items = [...COMPANIES, ...COMPANIES]

  return (
    <div className="relative flex overflow-hidden">
      <ul
        className={cn(
          'flex shrink-0 items-center',
          reversed ? 'animate-marquee-reverse' : 'animate-marquee'
        )}
        aria-hidden="true"
      >
        {items.map((name, idx) => (
          <li key={`${name}-${idx}`} className="flex shrink-0 items-center">
            <span className="px-12 text-base font-semibold text-[#9CA3AF] transition-colors duration-200 hover:text-[#6B7280]">
              {name}
            </span>
            {/* Separator dot */}
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D1D5DB]" aria-hidden="true" />
          </li>
        ))}
      </ul>
      {/* Duplicate for perfectly seamless infinite loop */}
      <ul
        className={cn(
          'flex shrink-0 items-center',
          reversed ? 'animate-marquee-reverse' : 'animate-marquee'
        )}
        aria-hidden="true"
      >
        {items.map((name, idx) => (
          <li key={`dup-${name}-${idx}`} className="flex shrink-0 items-center">
            <span className="px-12 text-base font-semibold text-[#9CA3AF] transition-colors duration-200 hover:text-[#6B7280]">
              {name}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D1D5DB]" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MarqueeSection() {
  return (
    <section
      id="trusted-by"
      className="relative overflow-hidden bg-[#F8F9FC] py-14"
      aria-label="Trusted by companies worldwide"
    >
      {/* ── Title ── */}
      <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-[#9CA3AF]">
        Trusted by innovative companies worldwide
      </p>

      {/* ── Wrapper with fade masks ── */}
      <div
        className="relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        {/* ── First marquee row (left→right) ── */}
        <div className="mb-4">
          <MarqueeTrack reversed={false} />
        </div>

        {/* ── Second marquee row (right→left) ── */}
        <MarqueeTrack reversed={true} />
      </div>

      {/* ── Top & Bottom fade lines ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(203,213,225,0.8) 30%, rgba(203,213,225,0.8) 70%, transparent)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(203,213,225,0.8) 30%, rgba(203,213,225,0.8) 70%, transparent)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
