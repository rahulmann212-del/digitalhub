'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowRight, Linkedin, Twitter, Instagram } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const footerServices = [
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'Digital Marketing', href: '/services/digital-marketing' },
  { label: 'Market Research', href: '/services/market-research' },
  { label: 'Brand Strategy', href: '/services/brand-strategy' },
  { label: 'E-Commerce', href: '/services/e-commerce' },
]

const footerCompany = [
  { label: 'About Us', href: '/about', badge: null },
  { label: 'Our Work', href: '/work', badge: null },
  { label: 'Careers', href: '/careers', badge: 'Hiring' },
  { label: 'Insights', href: '/insights', badge: null },
  { label: 'Partners', href: '/partners', badge: null },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap.xml' },
]

const trustBadges = [
  { label: 'Google Partner', icon: '✦', color: '#2563EB' },
  { label: 'Clutch 5-Star', icon: '★', color: '#F59E0B' },
  { label: 'ISO 27001 Certified', icon: '◈', color: '#059669' },
  { label: '150+ Projects', icon: '◉', color: '#7C3AED' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/digitalhub',
    Icon: Linkedin,
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/digitalhub',
    Icon: Twitter,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/digitalhub',
    Icon: Instagram,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function FooterLogo() {
  return (
    <Link
      href="/"
      aria-label="DigitalHub — Home"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0px' }}
    >
      <span
        style={{
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          fontWeight: 800,
          fontSize: '1.5rem',
          letterSpacing: '-0.02em',
          color: '#FFFFFF',
          lineHeight: 1,
        }}
      >
        Digital
      </span>
      <span
        style={{
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          fontWeight: 800,
          fontSize: '1.5rem',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
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

function FooterLinkItem({
  href,
  label,
  badge,
  external = false,
}: {
  href: string
  label: string
  badge?: string | null
  external?: boolean
}) {
  return (
    <li style={{ listStyle: 'none' }}>
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.9rem',
          color: 'rgba(249, 250, 251, 0.55)',
          textDecoration: 'none',
          lineHeight: 1.4,
          transition: 'color 200ms ease',
          paddingBottom: '2px',
        }}
        className="footer-link"
      >
        {label}
        {badge && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 8px',
              borderRadius: '99px',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              background: 'linear-gradient(135deg, #2563EB22 0%, #7C3AED22 100%)',
              color: '#A78BFA',
              border: '1px solid rgba(167, 139, 250, 0.25)',
              textTransform: 'uppercase',
            }}
          >
            {badge}
          </span>
        )}
      </Link>
    </li>
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(249, 250, 251, 0.35)',
        marginBottom: '20px',
      }}
    >
      {children}
    </p>
  )
}

// ─── Newsletter Form (client-side interaction handled inline) ──────────────────

function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      aria-label="Newsletter subscription"
      style={{ marginTop: '8px' }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'border-color 200ms ease',
          }}
        >
          <label htmlFor="newsletter-email" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            autoComplete="email"
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              padding: '13px 16px',
              fontSize: '0.875rem',
              color: '#F9FAFB',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <button
          type="submit"
          id="newsletter-submit"
          style={{
            width: '100%',
            height: '44px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            color: '#FFFFFF',
            fontSize: '0.875rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontFamily: 'inherit',
            transition: 'opacity 200ms ease',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.opacity = '0.88'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.opacity = '1'
          }}
        >
          Subscribe
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
      <p
        style={{
          marginTop: '10px',
          fontSize: '0.75rem',
          color: 'rgba(249, 250, 251, 0.30)',
          lineHeight: 1.5,
        }}
      >
        No spam, unsubscribe anytime. We respect your privacy.
      </p>
    </form>
  )
}

// ─── Main Footer Component ────────────────────────────────────────────────────

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="site-footer"
      role="contentinfo"
      aria-label="Site footer"
      style={{
        background: '#0B0F1A',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      }}
    >
      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div
        className="container-xl"
        style={{
          paddingTop: '80px',
          paddingBottom: '64px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '48px 40px',
          }}
          className="footer-grid"
        >

          {/* ── Column 1: Brand ─────────────────────────────────────────── */}
          <div style={{ gridColumn: 'span 1' }} className="footer-col-brand">
            {/* Logo */}
            <FooterLogo />

            {/* Tagline */}
            <p
              style={{
                marginTop: '20px',
                fontSize: '0.9375rem',
                color: 'rgba(249, 250, 251, 0.55)',
                lineHeight: 1.7,
                maxWidth: '260px',
              }}
            >
              Building digital products that drive real growth.
            </p>

            {/* Social links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '28px',
              }}
            >
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow DigitalHub on ${label}`}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.10)',
                    background: 'rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(249, 250, 251, 0.55)',
                    textDecoration: 'none',
                    transition: 'border-color 200ms ease, background 200ms ease, color 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = 'rgba(255,255,255,0.22)'
                    el.style.background = 'rgba(255,255,255,0.08)'
                    el.style.color = '#FFFFFF'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = 'rgba(255,255,255,0.10)'
                    el.style.background = 'rgba(255,255,255,0.04)'
                    el.style.color = 'rgba(249, 250, 251, 0.55)'
                  }}
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Copyright - visible on desktop only */}
            <p
              style={{
                marginTop: '36px',
                fontSize: '0.8125rem',
                color: 'rgba(249, 250, 251, 0.28)',
                lineHeight: 1.5,
              }}
              className="desktop-copyright"
            >
              © {currentYear} DigitalHub Agency LLC.
              <br />
              All rights reserved.
            </p>
          </div>

          {/* ── Column 2: Services ──────────────────────────────────────── */}
          <div>
            <FooterHeading>Services</FooterHeading>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: 0, margin: 0 }}>
              {footerServices.map((s) => (
                <FooterLinkItem key={s.href} href={s.href} label={s.label} />
              ))}
            </ul>
          </div>

          {/* ── Column 3: Company ───────────────────────────────────────── */}
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: 0, margin: 0 }}>
              {footerCompany.map((c) => (
                <FooterLinkItem
                  key={c.href}
                  href={c.href}
                  label={c.label}
                  badge={c.badge}
                />
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact + Newsletter ──────────────────────────── */}
          <div>
            <FooterHeading>Get in Touch</FooterHeading>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {/* Email */}
              <a
                href="mailto:hello@digitalhub.agency"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  textDecoration: 'none',
                  color: 'rgba(249, 250, 251, 0.55)',
                  transition: 'color 200ms ease',
                  fontSize: '0.875rem',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#60A5FA'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(249, 250, 251, 0.55)'
                }}
                aria-label="Send us an email"
              >
                <Mail
                  size={15}
                  style={{ marginTop: '2px', flexShrink: 0, color: '#4F46E5' }}
                  aria-hidden="true"
                />
                <span>hello@digitalhub.agency</span>
              </a>

              {/* Phone */}
              <a
                href="tel:+15550123456"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  textDecoration: 'none',
                  color: 'rgba(249, 250, 251, 0.55)',
                  transition: 'color 200ms ease',
                  fontSize: '0.875rem',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#60A5FA'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(249, 250, 251, 0.55)'
                }}
                aria-label="Call us"
              >
                <Phone
                  size={15}
                  style={{ marginTop: '2px', flexShrink: 0, color: '#4F46E5' }}
                  aria-hidden="true"
                />
                <span>+1 (555) 012-3456</span>
              </a>

              {/* Address */}
              <address
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontSize: '0.875rem',
                  color: 'rgba(249, 250, 251, 0.55)',
                  fontStyle: 'normal',
                  lineHeight: 1.6,
                }}
              >
                <MapPin
                  size={15}
                  style={{ marginTop: '2px', flexShrink: 0, color: '#4F46E5' }}
                  aria-hidden="true"
                />
                <span>
                  123 Innovation Drive
                  <br />
                  San Francisco, CA 94105
                </span>
              </address>
            </div>

            {/* Small CTA */}
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '10px 20px',
                borderRadius: '10px',
                background: 'rgba(37, 99, 235, 0.15)',
                border: '1px solid rgba(37, 99, 235, 0.3)',
                color: '#60A5FA',
                textDecoration: 'none',
                fontSize: '0.8125rem',
                fontWeight: 700,
                marginBottom: '28px',
                transition: 'background 200ms ease, border-color 200ms ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(37, 99, 235, 0.25)'
                el.style.borderColor = 'rgba(96, 165, 250, 0.5)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(37, 99, 235, 0.15)'
                el.style.borderColor = 'rgba(37, 99, 235, 0.3)'
              }}
            >
              Start a project <ArrowRight size={13} aria-hidden="true" />
            </Link>

            {/* Newsletter */}
            <div>
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(249, 250, 251, 0.35)',
                  marginBottom: '12px',
                }}
              >
                Newsletter
              </p>
              <p
                style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(249, 250, 251, 0.42)',
                  marginBottom: '16px',
                  lineHeight: 1.55,
                }}
              >
                Get digital growth tips and agency insights monthly.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* ── Trust Badges Bar ───────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="container-xl"
          style={{
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '8px 32px',
            }}
            role="list"
            aria-label="Trust badges and certifications"
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                role="listitem"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    color: badge.color,
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {badge.icon}
                </span>
                <span
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'rgba(249, 250, 251, 0.50)',
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {badge.label}
                </span>
                {/* Separator dot (hidden for last item) */}
                <span
                  style={{
                    display: 'inline-block',
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    marginLeft: '24px',
                  }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────────────────────────────────── */}
      <div className="container-xl">
        <div
          style={{
            paddingTop: '24px',
            paddingBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
          className="footer-bottom-bar"
        >
          {/* Mobile copyright */}
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(249, 250, 251, 0.28)',
            }}
            className="mobile-copyright"
          >
            © {currentYear} DigitalHub Agency LLC.
          </p>

          {/* Legal links */}
          <nav aria-label="Legal navigation">
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {legalLinks.map((link, i) => (
                <li key={link.href} style={{ display: 'flex', alignItems: 'center' }}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '0.8125rem',
                      color: 'rgba(249, 250, 251, 0.35)',
                      textDecoration: 'none',
                      transition: 'color 200ms ease',
                      padding: '2px 0',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(249, 250, 251, 0.75)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(249, 250, 251, 0.35)'
                    }}
                  >
                    {link.label}
                  </Link>
                  {i < legalLinks.length - 1 && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: '1px',
                        height: '12px',
                        background: 'rgba(255,255,255,0.12)',
                        margin: '0 16px',
                      }}
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Crafted by line */}
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(249, 250, 251, 0.28)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Crafted with{' '}
            <span
              style={{ color: '#F87171', fontSize: '14px' }}
              aria-label="love"
            >
              ♥
            </span>{' '}
            in San Francisco
          </p>
        </div>
      </div>

      {/* ── Responsive CSS ────────────────────────────────────────────────── */}
      <style>{`
        /* Hover color for footer links */
        .footer-link:hover {
          color: rgba(249, 250, 251, 0.90) !important;
        }

        /* Footer grid responsiveness */
        @media (max-width: 1023px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .footer-col-brand {
            grid-column: span 2 !important;
          }
          .desktop-copyright {
            display: none !important;
          }
        }

        @media (max-width: 639px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-col-brand {
            grid-column: span 1 !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
          }
        }

        @media (min-width: 640px) {
          .mobile-copyright {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  )
}
