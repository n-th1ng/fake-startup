'use client';

import { motion } from 'framer-motion';

export default function FundingSection({ funding }: { funding: string }) {
  return (
    <section className="py-16 px-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="glass-card p-8">
          <span className="text-xs font-semibold tracking-widest uppercase mb-3 block text-neutral-500">
            Funding
          </span>
          <p className="text-lg md:text-xl font-medium" style={{ color: 'var(--accent)' }}>
            {funding}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
