'use client';

import { motion } from 'framer-motion';

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function GenerateButton({ onClick, loading }: GenerateButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={loading}
      className="relative px-10 py-4 rounded-full font-bold text-sm text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
      style={{
        background: 'var(--accent)',
        boxShadow: '0 8px 40px rgba(var(--accent-rgb), 0.4)',
      }}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Generating Startup...
        </span>
      ) : (
        'Generate Startup'
      )}
    </motion.button>
  );
}
