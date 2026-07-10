'use client'

/**
 * app/contact/ContactFormClient.tsx
 * Client Component — interactive contact form with validation
 */

import React, { useState, useId } from 'react'
import { Check, Loader2, AlertCircle } from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────────

interface FormData {
  name: string
  email: string
  company: string
  service: string
  budget: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICES = [
  { value: '', label: 'Select a service...' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'market-research', label: 'Market Research' },
  { value: 'multiple', label: 'Multiple Services' },
  { value: 'not-sure', label: 'Not sure yet' },
]

const BUDGETS = [
  { value: '', label: 'Select a budget range...' },
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 – $15,000' },
  { value: '15k-30k', label: '$15,000 – $30,000' },
  { value: '30k-50k', label: '$30,000 – $50,000' },
  { value: 'over-50k', label: '$50,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
]

// ─── Field Component ─────────────────────────────────────────────────────────

function Field({
  label,
  id,
  required,
  error,
  children,
}: {
  label: string
  id: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[#374151]">
        {label}
        {required && (
          <span className="ml-1 text-[#DC2626]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-[#DC2626]" role="alert">
          <AlertCircle size={12} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

// ─── Input styles ─────────────────────────────────────────────────────────────

const inputClasses = (hasError?: boolean) =>
  [
    'w-full rounded-xl border px-4 py-3.5 text-sm text-[#0B0F1A]',
    'outline-none transition-all duration-200',
    'placeholder:text-[#9CA3AF]',
    'focus:ring-2 focus:ring-[#4F46E5]/20',
    hasError
      ? 'border-[#DC2626] focus:border-[#DC2626]'
      : 'border-[#E5E7EB] bg-white focus:border-[#4F46E5]',
  ].join(' ')

// ─── Component ────────────────────────────────────────────────────────────────

export function ContactFormClient() {
  const formId = useId()

  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!data.name.trim()) newErrors.name = 'Name is required'
    if (!data.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!data.message.trim()) newErrors.message = 'Message is required'
    if (data.message.trim().length < 20)
      newErrors.message = 'Please provide a bit more detail (min. 20 characters)'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')

    // Simulate async submission (replace with real API call)
    await new Promise((res) => setTimeout(res, 1400))

    // In production: POST to /api/contact or a form service
    setStatus('success')
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div
        className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white p-10 text-center shadow-sm"
        role="alert"
        aria-live="polite"
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}
          aria-hidden="true"
        >
          <Check size={28} strokeWidth={2.5} className="text-white" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-[#0B0F1A]">Message Sent!</h2>
        <p className="mt-3 max-w-sm text-base leading-relaxed text-[#6B7280]">
          Thank you for reaching out. One of our senior team members will contact you within 4
          business hours to schedule your free discovery call.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="/work"
            id="contact-success-work-link"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-[#F8F9FC] px-5 py-2.5 text-sm font-semibold text-[#374151] transition-all duration-200 hover:border-[#4F46E5]/30 hover:text-[#4F46E5]"
          >
            Explore Our Work
          </a>
          <a
            href="/insights"
            id="contact-success-insights-link"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-[#F8F9FC] px-5 py-2.5 text-sm font-semibold text-[#374151] transition-all duration-200 hover:border-[#4F46E5]/30 hover:text-[#4F46E5]"
          >
            Read Our Insights
          </a>
        </div>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm md:p-10"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0B0F1A]">Send Us a Message</h2>
        <p className="mt-1.5 text-sm text-[#6B7280]">
          Fill in your details and we&apos;ll get back to you within 4 business hours.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Name + Email */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="Full Name"
            id={`${formId}-name`}
            required
            error={errors.name}
          >
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Smith"
              value={data.name}
              onChange={handleChange}
              className={inputClasses(!!errors.name)}
              aria-describedby={errors.name ? `${formId}-name-error` : undefined}
              aria-invalid={!!errors.name}
            />
          </Field>

          <Field
            label="Email Address"
            id={`${formId}-email`}
            required
            error={errors.email}
          >
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jane@company.com"
              value={data.email}
              onChange={handleChange}
              className={inputClasses(!!errors.email)}
              aria-invalid={!!errors.email}
            />
          </Field>
        </div>

        {/* Company + Service */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Company / Organisation" id={`${formId}-company`}>
            <input
              id={`${formId}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Acme Inc."
              value={data.company}
              onChange={handleChange}
              className={inputClasses()}
            />
          </Field>

          <Field label="Service of Interest" id={`${formId}-service`}>
            <select
              id={`${formId}-service`}
              name="service"
              value={data.service}
              onChange={handleChange}
              className={[
                inputClasses(),
                'cursor-pointer appearance-none',
                !data.service ? 'text-[#9CA3AF]' : 'text-[#0B0F1A]',
              ].join(' ')}
            >
              {SERVICES.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* Budget */}
        <Field label="Project Budget" id={`${formId}-budget`}>
          <select
            id={`${formId}-budget`}
            name="budget"
            value={data.budget}
            onChange={handleChange}
            className={[
              inputClasses(),
              'cursor-pointer appearance-none',
              !data.budget ? 'text-[#9CA3AF]' : 'text-[#0B0F1A]',
            ].join(' ')}
          >
            {BUDGETS.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>

        {/* Message */}
        <Field
          label="Tell Us About Your Project"
          id={`${formId}-message`}
          required
          error={errors.message}
        >
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            placeholder="Describe your goals, challenges, and what success looks like for this project..."
            value={data.message}
            onChange={handleChange}
            className={[inputClasses(!!errors.message), 'resize-none'].join(' ')}
            aria-invalid={!!errors.message}
          />
        </Field>

        {/* Error state */}
        {status === 'error' && (
          <div
            className="flex items-start gap-3 rounded-xl border border-[#FEE2E2] bg-[#FEF2F2] p-4 text-sm text-[#DC2626]"
            role="alert"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>
              Something went wrong. Please try again or email us directly at{' '}
              <a href="mailto:hello@digitalhub.agency" className="font-semibold underline">
                hello@digitalhub.agency
              </a>
            </span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          id="contact-form-submit"
          disabled={status === 'submitting'}
          className={[
            'flex w-full items-center justify-center gap-2.5 rounded-full px-8 py-4',
            'text-base font-bold text-white',
            'transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2',
            status === 'submitting'
              ? 'cursor-wait opacity-75'
              : 'hover:brightness-110 hover:shadow-[0_8px_32px_rgba(79,70,229,0.35)]',
          ].join(' ')}
          style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            boxShadow: '0 4px 24px rgba(79,70,229,0.3)',
          }}
          aria-busy={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            'Send Message & Book a Call →'
          )}
        </button>

        <p className="text-center text-xs text-[#9CA3AF]">
          By submitting, you agree to our{' '}
          <a href="/privacy" className="underline hover:text-[#4F46E5]">
            Privacy Policy
          </a>
          . We&apos;ll never share your information.
        </p>
      </div>
    </form>
  )
}
