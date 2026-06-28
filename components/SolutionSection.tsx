'use client';

import { motion } from 'framer-motion';

export default function SolutionSection({ solution }: { solution: string }) {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: 'var(--accent)' }}>
            Our Solution
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            We fixed it. With <span className="gradient-text">AI</span>.
          </h2>
        </div>

        <div className="glass-card p-8 md:p-12">
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light">
            {solution}
          </p>
        </div>

        {/* Fake feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {['AI-Powered', 'Blockchain-Ready', 'Cloud-Native'].map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-2xl mb-2">
                {['🤖', '⛓️', '☁️'][i]}
              </div>
              <p className="font-semibold text-sm">{feature}</p>
              <p className="text-xs text-neutral-500 mt-1">buzzword-compliant</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
