import type { FieldOption } from '../../data/types';

interface Props {
  options: FieldOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function RadioGroup({ options, value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all
            ${
              value === opt.value
                ? 'bg-primary text-white border-primary shadow-md'
                : 'bg-white text-text border-border hover:border-primary-light hover:bg-blue-50'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
