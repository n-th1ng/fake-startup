'use client';

import { motion } from 'framer-motion';
import type { StartupData } from '@/lib/types';

export default function HeroSection({ data }: { data: StartupData }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Large gradient orb */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-15 blur-[160px]"
        style={{
          background: `radial-gradient(circle, var(--accent), transparent)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative text-center max-w-4xl"
      >
        <div
          className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
          style={{
            color: 'var(--accent)',
            borderColor: 'rgba(var(--accent-rgb), 0.3)',
            background: 'rgba(var(--accent-rgb), 0.1)',
          }}
        >
          Series A · Just Raised
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-[0.95]">
          {data.name}
        </h1>

        <p className="text-xl md:text-2xl text-neutral-300 font-light mb-4 max-w-2xl mx-auto">
          {data.tagline}
        </p>

        <p className="text-lg md:text-xl font-medium mb-8" style={{ color: 'var(--accent)' }}>
          {data.pitch_line}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-8 py-3.5 rounded-full font-semibold text-black text-sm transition-all hover:scale-105 hover:shadow-lg"
            style={{
              background: 'var(--accent)',
              boxShadow: '0 8px 32px rgba(var(--accent-rgb), 0.3)',
            }}
          >
            Join Waitlist
          </button>
          <button className="px-8 py-3.5 rounded-full font-medium text-sm border border-white/10 hover:border-white/20 transition-all bg-white/5">
            Watch Demo (Coming Soon)
          </button>
        </div>
      </motion.div>
    </section>
  );
}
