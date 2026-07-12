'use client';
import React from 'react';

import { motion } from 'framer-motion';

import { SectionHeader } from '@/components/ui/SectionHeader';

import { testimonials } from '@/lib/data/testimonials';

import type { Testimonial } from '@/types';

import { staggerContainer, fadeUp } from '@/lib/animations';



// ---------------------------------------------------------------------------

// StarRating

// ---------------------------------------------------------------------------



function StarRating({ rating }: { rating: number }) {

  return (

    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>

      {Array.from({ length: 5 }).map((_, i) => (

        <span

          key={i}

          aria-hidden="true"

          className={i < rating ? 'text-amber-400' : 'text-gray-300'}

          style={{ fontSize: '1.1rem', lineHeight: 1 }}

        >

          ★

        </span>

      ))}

    </div>

  );

}



// ---------------------------------------------------------------------------

// Avatar

// ---------------------------------------------------------------------------



function Avatar({ initials, gradient }: { initials: string; gradient: string }) {

  return (

    <span

      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-sm font-bold text-white shadow-md`}

      aria-hidden="true"

    >

      {initials}

    </span>

  );

}



// ---------------------------------------------------------------------------

// TestimonialCard

// ---------------------------------------------------------------------------



function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {

  const { quote, author, title, company, rating, initials, gradient } = testimonial;



  return (

    <motion.article

      variants={fadeUp}

      whileHover={{ y: -6 }}

      transition={{ duration: 0.25 }}

      className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-white/80 p-8 shadow-md backdrop-blur-sm"

    >

      {/* Stars */}

      <StarRating rating={rating} />



      {/* Quote */}

      <blockquote className="mt-5 flex-1">

        <p className="text-[1.0625rem] italic leading-relaxed text-[#374151]">

          &ldquo;{quote}&rdquo;

        </p>

      </blockquote>



      {/* Author */}

      <footer className="mt-7 flex items-center gap-4">

        <Avatar initials={initials} gradient={gradient} />

        <div>

          <cite className="not-italic text-sm font-semibold text-[#0B0F1A]">

            {author}

          </cite>

          <p className="text-xs text-[#6B7280]">

            {title}, {company}

          </p>

        </div>

      </footer>

    </motion.article>

  );

}



// ---------------------------------------------------------------------------

// TestimonialsSection

// ---------------------------------------------------------------------------



export default function TestimonialsSection() {

  return (

    <section className="bg-white section-padding">

      <div className="container-xl">

        {/* Header */}

        <SectionHeader

          eyebrow="Client Stories"

          title="Trusted by Leaders. **Proven** by Results."

        />



        {/* Grid */}

        <motion.div

          variants={staggerContainer}

          initial="hidden"

          whileInView="visible"

          viewport={{ once: true, amount: 0.1 }}

          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"

        >

          {testimonials.map((t) => (

            <TestimonialCard key={t.id} testimonial={t} />

          ))}

        </motion.div>

      </div>

    </section>

  );

}