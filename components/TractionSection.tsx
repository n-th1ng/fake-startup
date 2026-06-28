'use client';

import { motion } from 'framer-motion';

interface TractionProps {
  traction: {
    metric1_label: string; metric1_value: string;
    metric2_label: string; metric2_value: string;
    metric3_label: string; metric3_value: string;
  };
  funding: string;
  tam?: string;
  sam?: string;
  som?: string;
}

export default function TractionSection({ traction, funding, tam, sam, som }: TractionProps) {
  const metrics = [
    { label: traction.metric1_label, value: traction.metric1_value },
    { label: traction.metric2_label, value: traction.metric2_value },
    { label: traction.metric3_label, value: traction.metric3_value },
  ];

  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: 'var(--accent)' }}>
            Traction
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            The numbers don&apos;t lie
          </h2>
          <p className="text-neutral-500 mt-2 text-sm">(they just don&apos;t mean anything)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass-card p-8 text-center"
            >
              <p className="text-3xl md:text-4xl font-black mb-2" style={{ color: 'var(--accent)' }}>
                {m.value}
              </p>
              <p className="text-sm text-neutral-400 font-medium">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* TAM/SAM/SOM */}
        <div className="glass-card p-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-6 text-neutral-500">Market Size</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <MarketBubble label="TAM" value={tam || '$∞'} />
            <div className="text-neutral-600 text-2xl">→</div>
            <MarketBubble label="SAM" value={sam || '$???'} />
            <div className="text-neutral-600 text-2xl">→</div>
            <MarketBubble label="SOM" value={som || '$LOL'} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function MarketBubble({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-24 h-24 rounded-full flex flex-col items-center justify-center mb-2 border"
        style={{
          borderColor: 'rgba(var(--accent-rgb), 0.2)',
          background: 'rgba(var(--accent-rgb), 0.05)',
        }}
      >
        <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{label}</span>
        <span className="text-[10px] text-neutral-400 mt-1">{value}</span>
      </div>
    </div>
  );
}
