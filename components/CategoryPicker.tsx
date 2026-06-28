'use client';

interface CategoryPickerProps {
  value: string;
  onChange: (val: string) => void;
}

const categories = [
  { id: 'random', label: '🎲 Random' },
  { id: 'AI', label: '🤖 AI' },
  { id: 'food', label: '🍕 Food' },
  { id: 'fitness', label: '💪 Fitness' },
  { id: 'fintech', label: '💳 Fintech' },
  { id: 'Web3', label: '⛓️ Web3' },
  { id: 'sustainability', label: '🌱 Sustainability' },
  { id: 'absurd', label: '🤪 Absurd' },
];

export default function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
            value === cat.id
              ? 'text-black scale-105'
              : 'bg-white/5 border border-white/10 text-neutral-400 hover:border-white/20 hover:text-neutral-200'
          }`}
          style={value === cat.id ? { background: 'var(--accent)' } : {}}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
