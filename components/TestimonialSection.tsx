'use client';

import { motion } from 'framer-motion';

interface TestimonialProps {
  testimonial: { name: string; role: string; quote: string };
}

export default function TestimonialSection({ testimonial }: TestimonialProps) {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="glass-card p-8 md:p-12">
          <div className="text-4xl mb-6" style={{ color: 'var(--accent)' }}>&ldquo;</div>
          <p className="text-lg md:text-xl text-neutral-200 leading-relaxed italic mb-8">
            {testimonial.quote}
          </p>
          <div>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-neutral-500">{testimonial.role}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
