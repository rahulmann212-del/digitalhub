// Service types
export interface Service {
  id: string
  slug: string
  title: string
  shortTitle: string
  tagline: string
  description: string
  icon: string
  capabilities: string[]
  outcomes: string[]
  gradient: string
}

// Work / Case Study types
export interface CaseStudy {
  id: string
  slug: string
  title: string
  client: string
  industry: string
  services: string[]
  tagline: string
  challenge: string
  solution: string
  results: string[]
  metrics: { label: string; value: string; change: string }[]
  tags: string[]
  featured: boolean
  year: number
  duration: string
  testimonial?: {
    quote: string
    author: string
    title: string
  }
}

// Team types
export interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  linkedIn: string
  twitter?: string
  expertise: string[]
  initials: string
  gradient: string
}

// Testimonial types
export interface Testimonial {
  id: string
  quote: string
  author: string
  title: string
  company: string
  rating: number
  service: string
  initials: string
  gradient: string
}

// Insight / Blog types
export interface InsightArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  authorTitle: string
  authorInitials: string
  readTime: number
  publishDate: string
  featured: boolean
}

// FAQ types
export interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
}

// Industry types
export interface Industry {
  id: string
  name: string
  tagline: string
  icon: string
  gradient: string
}

// Process step types
export interface ProcessStep {
  number: string
  title: string
  description: string
  duration: string
  icon: string
  details: string[]
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  description?: string
  children?: NavItem[]
}

// Contact form types
export interface ContactFormData {
  name: string
  email: string
  company: string
  service: string
  budget: string
  message: string
}
