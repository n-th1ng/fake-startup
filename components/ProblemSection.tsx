'use client';

import { motion } from 'framer-motion';

export default function ProblemSection({ problem }: { problem: string }) {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: 'var(--accent)' }}>
          The Problem
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
          A crisis nobody asked about
        </h2>
        <div className="glass-card p-8 md:p-12">
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light">
            {problem}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
