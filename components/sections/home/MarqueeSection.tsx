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
  // Original array is enough, we duplicate the whole <ul> block below
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
            <span className="cursor-default text-lg font-bold tracking-wide text-gray-400/70 transition-colors duration-300 hover:text-gray-900">
              {name}
            </span>
            {/* Separator dot */}
            <span className="ml-6 sm:ml-10 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300/80" aria-hidden="true" />
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
            <span className="cursor-default text-lg font-bold tracking-wide text-gray-400/70 transition-colors duration-300 hover:text-gray-900">
              {name}
            </span>
            <span className="ml-6 sm:ml-10 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300/80" aria-hidden="true" />
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
      className="relative overflow-hidden bg-white py-16 sm:py-20"
      aria-label="Trusted by companies worldwide"
    >
      {/* ── Title ── */}
      <div className="container mx-auto px-4">
        <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          Trusted by innovative companies worldwide
        </p>
      </div>

      {/* ── Wrapper with enhanced fade masks ── */}
      <div
        className="relative flex flex-col gap-6 sm:gap-8"
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

      {/* ── Top & Bottom subtle borders (Clean Premium Look) ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-60"
        aria-hidden="true"
      />
    </section>
  )
}