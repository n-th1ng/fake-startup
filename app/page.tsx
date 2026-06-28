'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { StartupData } from '@/lib/types';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import TractionSection from '@/components/TractionSection';
import TeamSection from '@/components/TeamSection';
import TestimonialSection from '@/components/TestimonialSection';
import FundingSection from '@/components/FundingSection';
import GenerateButton from '@/components/GenerateButton';
import CategoryPicker from '@/components/CategoryPicker';

function PageContent() {
  const searchParams = useSearchParams();
  const [startup, setStartup] = useState<StartupData | null>(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>('random');
  const [error, setError] = useState<string | null>(null);

  // Check URL hash for shared startup
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(hash)));
        setStartup(decoded);
      } catch {
        // Invalid hash, ignore
      }
    }
  }, []);

  // Set accent color CSS variable
  useEffect(() => {
    if (startup?.accent_color) {
      document.documentElement.style.setProperty('--accent', startup.accent_color);
      // Parse hex to RGB
      const hex = startup.accent_color.replace('#', '');
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
    }
  }, [startup]);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      });
      if (!res.ok) throw new Error('Generation failed');
      const data: StartupData = await res.json();
      setStartup(data);
      // Encode in URL hash for sharing
      const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
      window.history.replaceState(null, '', `#${encoded}`);
    } catch (err) {
      setError('Generation failed. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).catch(() => {});
  }

  return (
    <div className="min-h-screen relative z-10">
      {/* Floating orbs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{
            background: `radial-gradient(circle, var(--accent), transparent)`,
            top: '-200px',
            right: '-200px',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-5 blur-[100px]"
          style={{
            background: `radial-gradient(circle, #ec4899, transparent)`,
            bottom: '-100px',
            left: '-100px',
          }}
        />
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!startup ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-screen px-6"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center max-w-2xl"
              >
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
                  <span className="gradient-text">Fake Startup</span>
                </h1>
                <p className="text-lg md:text-xl text-neutral-400 mb-8 font-light">
                  Generate an absurdly professional startup pitch in one click.<br />
                  The more real it looks, the funnier it is.
                </p>
                <CategoryPicker value={category} onChange={setCategory} />
                <GenerateButton onClick={handleGenerate} loading={loading} />
                {error && (
                  <p className="mt-4 text-red-400 text-sm">{error}</p>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="startup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Sticky nav bar */}
              <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
                <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                  <span className="font-bold text-sm tracking-wide" style={{ color: 'var(--accent)' }}>
                    {startup.name}
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={handleShare}
                      className="px-4 py-2 text-xs font-medium rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                    >
                      Share
                    </button>
                    <button
                      onClick={() => {
                        setStartup(null);
                        window.history.replaceState(null, '', window.location.pathname);
                      }}
                      className="px-4 py-2 text-xs font-medium rounded-full text-black transition-all"
                      style={{ background: 'var(--accent)' }}
                    >
                      Generate Another
                    </button>
                  </div>
                </div>
              </nav>

              <div className="pt-14">
                <HeroSection data={startup} />
                <ProblemSection problem={startup.problem} />
                <SolutionSection solution={startup.solution} />
                <TractionSection traction={startup.traction} funding={startup.funding} tam={startup.tam} sam={startup.sam} som={startup.som} />
                <TeamSection team={startup.team} />
                <TestimonialSection testimonial={startup.testimonial} />
                <FundingSection funding={startup.funding} />

                {/* Footer CTA */}
                <section className="py-24 text-center px-6">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Ready to <span className="gradient-text">disrupt</span>?
                  </h2>
                  <p className="text-neutral-400 mb-8">Join the waitlist. We have no product yet, but we have vibes.</p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        setStartup(null);
                        window.history.replaceState(null, '', window.location.pathname);
                      }}
                      className="px-8 py-3 text-sm font-semibold rounded-full text-black transition-all hover:scale-105"
                      style={{ background: 'var(--accent)' }}
                    >
                      Generate Another Startup
                    </button>
                  </div>
                </section>

                <footer className="text-center py-8 text-neutral-600 text-xs border-t border-white/5">
                  Fake Startup Generator — None of this is real. Probably.
                </footer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-500">Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
