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
  const items = COMPANIES

  return (
    // 'group' class added to pause animation on hover
    <div className="group relative flex overflow-hidden">
      <ul
        className={cn(
          'flex min-w-full shrink-0 items-center justify-around',
          reversed ? 'animate-marquee-reverse' : 'animate-marquee',
          'group-hover:[animation-play-state:paused]' // Pause on hover
        )}
        aria-hidden="true"
      >
        {items.map((name, idx) => (
          <li key={`${name}-${idx}`} className="flex shrink-0 items-center px-6 sm:px-10">
            {/* Text darkened and made semi-bold for better visibility */}
            <span className="cursor-default text-lg sm:text-xl font-semibold tracking-wide text-slate-700 transition-colors duration-300 hover:text-[#2563EB]">
              {name}
            </span>
            {/* Separator dot slightly darkened */}
            <span className="ml-6 sm:ml-10 h-2 w-2 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
          </li>
        ))}
      </ul>
      
      {/* Duplicate for perfectly seamless infinite loop */}
      <ul
        className={cn(
          'flex min-w-full shrink-0 items-center justify-around',
          reversed ? 'animate-marquee-reverse' : 'animate-marquee',
          'group-hover:[animation-play-state:paused]' // Pause on hover
        )}
        aria-hidden="true"
      >
        {items.map((name, idx) => (
          <li key={`dup-${name}-${idx}`} className="flex shrink-0 items-center px-6 sm:px-10">
            <span className="cursor-default text-lg sm:text-xl font-semibold tracking-wide text-slate-700 transition-colors duration-300 hover:text-[#2563EB]">
              {name}
            </span>
            <span className="ml-6 sm:ml-10 h-2 w-2 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
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
      // Background changed to a very subtle Slate/Blue tint (#F8FAFC) to alternate with pure white
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 border-y border-slate-200/50"
      aria-label="Trusted by companies worldwide"
    >
      {/* ── Title ── */}
      <div className="container mx-auto px-4">
        {/* Title darkened and spaced out for a premium look */}
        <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          Trusted by innovative companies worldwide
        </p>
      </div>

      {/* ── Wrapper with enhanced fade masks ── */}
      <div
        className="relative flex flex-col gap-8 sm:gap-10"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        {/* ── First marquee row (left→right) ── */}
        <MarqueeTrack reversed={false} />

        {/* ── Second marquee row (right→left) ── */}
        <MarqueeTrack reversed={true} />
      </div>
    </section>
  )
}