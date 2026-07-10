import type { Metadata } from 'next'
import NotFoundClient from '@/components/sections/NotFoundClient'

export const metadata: Metadata = {
  title: '404 — Page Not Found | DigitalHub',
  description: "The page you are looking for doesn't exist or has been moved.",
}

export default function NotFound() {
  return <NotFoundClient />
}
