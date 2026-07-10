import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://digitalhub.agency'),
  title: {
    default: 'DigitalHub — Premium Digital Agency for Web, Marketing & Research',
    template: '%s | DigitalHub',
  },
  description:
    'We help ambitious businesses grow online with custom web development, data-driven digital marketing, and actionable market research. 150+ projects, 12 countries, 98% retention.',
  keywords: [
    'digital agency',
    'web development agency',
    'digital marketing agency',
    'market research services',
    'SEO agency',
    'custom website design',
    'brand strategy',
    'growth marketing',
  ],
  authors: [{ name: 'DigitalHub Agency' }],
  creator: 'DigitalHub Agency',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://digitalhub.agency',
    siteName: 'DigitalHub',
    title: 'DigitalHub — Premium Digital Agency',
    description:
      'Custom web development, digital marketing, and market research for ambitious businesses worldwide.',
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: 'DigitalHub — Premium Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DigitalHub — Premium Digital Agency',
    description:
      'Custom web development, digital marketing, and market research for ambitious businesses worldwide.',
    creator: '@digitalhub',
    images: ['/og/default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-white text-[#374151]">
        <Header />
        <main id="main-content" style={{ paddingTop: '72px' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
