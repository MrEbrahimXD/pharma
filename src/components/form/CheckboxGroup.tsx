import type { FieldOption } from '../../data/types';

interface Props {
  options: FieldOption[];
  value: string[];
  onChange: (value: string[]) => void;
}

export default function CheckboxGroup({ options, value, onChange }: Props) {
  const selected = value || [];

  const toggle = (optValue: string) => {
    if (selected.includes(optValue)) {
      onChange(selected.filter((v) => v !== optValue));
    } else {
      onChange([...selected, optValue]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isChecked = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all flex items-center gap-2
              ${
                isChecked
                  ? 'bg-secondary text-white border-secondary shadow-md'
                  : 'bg-white text-text border-border hover:border-secondary-light hover:bg-emerald-50'
              }`}
          >
            <span className="text-base">{isChecked ? '✓' : '○'}</span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
