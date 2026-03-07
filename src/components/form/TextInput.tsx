interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'date';
  unit?: string;
}

export default function TextInput({ value, onChange, placeholder, type = 'text', unit }: Props) {
  return (
    <div className="flex items-center gap-2">
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text text-base
                   focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light
                   transition-colors"
        dir="auto"
      />
      {unit && <span className="text-text-light text-sm whitespace-nowrap">{unit}</span>}
    </div>
  );
}
