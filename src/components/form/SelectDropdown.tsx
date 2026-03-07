import type { FieldOption } from '../../data/types';

const palette = [
  { bg: 'bg-blue-500',   hover: 'hover:bg-blue-50  hover:border-blue-400',  border: 'border-blue-500',  ring: 'ring-blue-300' },
  { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-50 hover:border-emerald-400', border: 'border-emerald-500', ring: 'ring-emerald-300' },
  { bg: 'bg-amber-500',  hover: 'hover:bg-amber-50 hover:border-amber-400', border: 'border-amber-500', ring: 'ring-amber-300' },
  { bg: 'bg-rose-500',   hover: 'hover:bg-rose-50  hover:border-rose-400',  border: 'border-rose-500',  ring: 'ring-rose-300' },
  { bg: 'bg-violet-500', hover: 'hover:bg-violet-50 hover:border-violet-400', border: 'border-violet-500', ring: 'ring-violet-300' },
  { bg: 'bg-cyan-500',   hover: 'hover:bg-cyan-50  hover:border-cyan-400',  border: 'border-cyan-500',  ring: 'ring-cyan-300' },
];

interface Props {
  options: FieldOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SelectDropdown({ options, value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt, i) => {
        const c = palette[i % palette.length];
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all
              ${
                selected
                  ? `${c.bg} text-white ${c.border} shadow-md ring-2 ${c.ring}`
                  : `bg-white text-text border-border ${c.hover}`
              }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
