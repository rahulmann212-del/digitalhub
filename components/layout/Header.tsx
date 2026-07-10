'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, TrendingUp, Search, Menu, X, ChevronDown, ArrowRight } from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    title: 'Web Development',
    description: 'Fast, scalable websites and web apps built for performance',
    href: '/services/web-development',
    icon: Code2,
    accent: '#2563EB',
  },
  {
    title: 'Digital Marketing',
    description: 'Data-driven campaigns that generate qualified leads at scale',
    href: '/services/digital-marketing',
    icon: TrendingUp,
    accent: '#4F46E5',
  },
  {
    title: 'Market Research',
    description: 'Strategic intelligence for confident, data-backed decisions',
    href: '/services/market-research',
    icon: Search,
    accent: '#7C3AED',
  },
]

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const megaMenuVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
}

const serviceCardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
}

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    x: '100%',
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as [number,number,number,number] },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, damping: 28, stiffness: 280 },
  },
}

const mobileItemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
}

// ─── Logo Component ───────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link
      href="/"
      aria-label="DigitalHub — Home"
      className="flex items-center gap-0.5 group"
    >
      <span
        style={{
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          fontWeight: 800,
          fontSize: '1.375rem',
          letterSpacing: '-0.02em',
          color: '#0B0F1A',
          lineHeight: 1,
          transition: 'color 200ms ease',
        }}
      >
        Digital
      </span>
      <span
        style={{
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          fontWeight: 800,
          fontSize: '1.375rem',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Hub
      </span>
    </Link>
  )
}

// ─── Animated Nav Link ────────────────────────────────────────────────────────

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string
  label: string
  isActive: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        fontSize: '0.9375rem',
        fontWeight: 500,
        color: isActive ? '#2563EB' : '#374151',
        textDecoration: 'none',
        padding: '4px 0',
        transition: 'color 200ms ease',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
      {/* Animated underline */}
      <motion.span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          borderRadius: '1px',
          background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
          transformOrigin: 'left center',
        }}
        initial={false}
        animate={{
          scaleX: isActive ? 1 : isHovered ? 1 : 0,
          opacity: isActive ? 1 : isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        aria-hidden="true"
        // dynamically match the width of the text
        className="w-full"
      />
    </Link>
  )
}

// ─── Mega Menu ────────────────────────────────────────────────────────────────

function MegaMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mega-menu"
          variants={megaMenuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          role="region"
          aria-label="Services menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 12px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '680px',
            background: '#FFFFFF',
            borderRadius: '20px',
            boxShadow:
              '0 4px 6px rgba(0,0,0,0.04), 0 24px 64px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05)',
            padding: '12px',
            zIndex: 200,
            overflow: 'hidden',
          }}
        >
          {/* Header row */}
          <div
            style={{
              padding: '12px 16px 16px',
              marginBottom: '4px',
            }}
          >
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#9CA3AF',
              }}
            >
              Our Services
            </p>
          </div>

          {/* Service cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}
          >
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.href}
                  custom={i}
                  variants={serviceCardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={service.href}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      padding: '20px 18px',
                      borderRadius: '14px',
                      textDecoration: 'none',
                      background: 'transparent',
                      transition: 'background 200ms ease, transform 200ms ease',
                      cursor: 'pointer',
                    }}
                    className="service-card-link group"
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.background = '#F8F9FC'
                      el.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.background = 'transparent'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    {/* Icon container */}
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${service.accent}14`,
                        flexShrink: 0,
                      }}
                    >
                      <Icon
                        size={20}
                        style={{ color: service.accent }}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Text */}
                    <div>
                      <p
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: '#0B0F1A',
                          marginBottom: '5px',
                          lineHeight: 1.3,
                        }}
                      >
                        {service.title}
                      </p>
                      <p
                        style={{
                          fontSize: '0.8125rem',
                          color: '#6B7280',
                          lineHeight: 1.55,
                        }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Footer CTA */}
          <div
            style={{
              margin: '8px 0 4px',
              padding: '14px 16px',
              borderTop: '1px solid #F1F3F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
              Not sure what you need?{' '}
              <Link
                href="/contact"
                style={{
                  color: '#4F46E5',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Let&apos;s talk
              </Link>
            </p>
            <Link
              href="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#4F46E5',
                textDecoration: 'none',
                transition: 'gap 200ms ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.gap = '10px'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.gap = '6px'
              }}
            >
              All services <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean
  onClose: () => void
  pathname: string
}) {
  const allLinks = [
    { label: 'Services', href: '/services' },
    ...navLinks,
  ]

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(11, 15, 26, 0.4)',
              zIndex: 98,
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.nav
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="navigation"
            aria-label="Mobile navigation"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(360px, 90vw)',
              background: '#FFFFFF',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Panel header */}
            <div
              style={{
                height: '72px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
                borderBottom: '1px solid #F1F3F9',
                flexShrink: 0,
              }}
            >
              <Logo />
              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#374151',
                  transition: 'background 200ms ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background =
                    '#F8F9FC'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background =
                    'transparent'
                }}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Navigation links */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              {allLinks.map((link, i) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontSize: '1.0625rem',
                        fontWeight: 600,
                        color: isActive ? '#2563EB' : '#0B0F1A',
                        background: isActive ? '#EEF2FF' : 'transparent',
                        transition: 'background 180ms ease, color 180ms ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive)
                          (e.currentTarget as HTMLAnchorElement).style.background =
                            '#F8F9FC'
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive)
                          (e.currentTarget as HTMLAnchorElement).style.background =
                            'transparent'
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                      <ArrowRight
                        size={16}
                        style={{ color: '#9CA3AF', flexShrink: 0 }}
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>
                )
              })}

              {/* Mobile service cards */}
              <div
                style={{
                  marginTop: '24px',
                  padding: '20px',
                  borderRadius: '16px',
                  background: '#F8F9FC',
                  border: '1px solid #E5E7EB',
                }}
              >
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#9CA3AF',
                    marginBottom: '16px',
                  }}
                >
                  Services
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {services.map((service, i) => {
                    const Icon = service.icon
                    return (
                      <motion.div
                        key={service.href}
                        custom={i + allLinks.length}
                        variants={mobileItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          href={service.href}
                          onClick={onClose}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            background: '#FFFFFF',
                            border: '1px solid #E5E7EB',
                            transition: 'border-color 200ms ease',
                          }}
                          onMouseEnter={(e) => {
                            ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                              service.accent
                          }}
                          onMouseLeave={(e) => {
                            ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                              '#E5E7EB'
                          }}
                        >
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '9px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: `${service.accent}14`,
                              flexShrink: 0,
                            }}
                          >
                            <Icon
                              size={16}
                              style={{ color: service.accent }}
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <p
                              style={{
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                color: '#0B0F1A',
                                lineHeight: 1.3,
                              }}
                            >
                              {service.title}
                            </p>
                            <p
                              style={{
                                fontSize: '0.75rem',
                                color: '#6B7280',
                                marginTop: '2px',
                                lineHeight: 1.4,
                              }}
                            >
                              {service.description}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Panel footer CTA */}
            <div
              style={{
                padding: '20px 24px',
                borderTop: '1px solid #F1F3F9',
                flexShrink: 0,
              }}
            >
              <Link
                href="/contact"
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  height: '50px',
                  borderRadius: '25px',
                  background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 32px rgba(79, 70, 229, 0.30)',
                  transition: 'opacity 200ms ease, transform 200ms ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.opacity = '0.9'
                  ;(e.currentTarget as HTMLAnchorElement).style.transform =
                    'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.opacity = '1'
                  ;(e.currentTarget as HTMLAnchorElement).style.transform =
                    'translateY(0)'
                }}
              >
                Get Free Audit
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Main Header Component ────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Click outside to close mega-menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleServicesEnter = useCallback(() => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
      servicesTimeoutRef.current = null
    }
    setServicesOpen(true)
  }, [])

  const handleServicesLeave = useCallback(() => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false)
    }, 150)
  }, [])

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev)
  }, [])

  const isServicesActive = pathname.startsWith('/services')

  return (
    <>
      <header
        id="site-header"
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '72px',
          zIndex: 50,
          transition: 'background 300ms ease, box-shadow 300ms ease, border-color 300ms ease',
          background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(229, 231, 235, 0.5)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 1px 20px rgba(0, 0, 0, 0.06)'
            : 'none',
        }}
      >
        <div
          className="container-xl"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav
            role="navigation"
            aria-label="Primary navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '36px',
            }}
            className="desktop-nav"
          >
            {/* Services dropdown trigger */}
            <div
              ref={servicesRef}
              style={{ position: 'relative' }}
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                id="services-menu-trigger"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                aria-controls="services-mega-menu"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: isServicesActive ? '#2563EB' : '#374151',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                  fontFamily: 'inherit',
                  transition: 'color 200ms ease',
                  position: 'relative',
                }}
              >
                Services
                <motion.span
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                  style={{ display: 'flex', lineHeight: 0 }}
                >
                  <ChevronDown size={15} aria-hidden="true" />
                </motion.span>
                {/* Underline for active state */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    borderRadius: '1px',
                    background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
                    transform: isServicesActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left center',
                    transition: 'transform 220ms ease',
                  }}
                  aria-hidden="true"
                />
              </button>

              {/* Mega Menu */}
              <div id="services-mega-menu" role="region" aria-label="Services">
                <MegaMenu isOpen={servicesOpen} />
              </div>
            </div>

            {/* Other nav links */}
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
              />
            ))}
          </nav>

          {/* Right side controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* CTA Button - desktop only */}
            <Link
              href="/contact"
              id="header-cta-button"
              aria-label="Get a free audit from DigitalHub"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                height: '42px',
                paddingLeft: '22px',
                paddingRight: '22px',
                borderRadius: '21px',
                background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(79, 70, 229, 0.28)',
                transition: 'opacity 200ms ease, transform 200ms ease, box-shadow 200ms ease',
              }}
              className="desktop-cta"
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.opacity = '0.9'
                el.style.transform = 'translateY(-1px)'
                el.style.boxShadow = '0 8px 32px rgba(79, 70, 229, 0.36)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.opacity = '1'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 4px 20px rgba(79, 70, 229, 0.28)'
              }}
            >
              Get Free Audit
            </Link>

            {/* Hamburger - mobile only */}
            <button
              id="mobile-menu-toggle"
              onClick={toggleMobile}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="mobile-hamburger"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '11px',
                border: '1px solid rgba(229, 231, 235, 0.8)',
                background: scrolled
                  ? 'rgba(248, 249, 252, 0.8)'
                  : 'rgba(255, 255, 255, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#0B0F1A',
                transition: 'background 200ms ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background = '#F1F3F9'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background = scrolled
                  ? 'rgba(248, 249, 252, 0.8)'
                  : 'rgba(255, 255, 255, 0.6)'
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: 'flex' }}
                  >
                    <X size={18} aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: 'flex' }}
                  >
                    <Menu size={18} aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div id="mobile-navigation">
        <MobileMenu
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          pathname={pathname}
        />
      </div>

      {/* Responsive CSS */}
      <style jsx>{`
        .desktop-nav {
          display: flex;
        }
        .desktop-cta {
          display: inline-flex;
        }
        .mobile-hamburger {
          display: none;
        }

        @media (max-width: 1023px) {
          .desktop-nav {
            display: none;
          }
          .desktop-cta {
            display: none;
          }
          .mobile-hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  )
}
