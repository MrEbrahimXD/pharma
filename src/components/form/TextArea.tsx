interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TextArea({ value, onChange, placeholder }: Props) {
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text text-base
                 resize-y min-h-[80px]
                 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light
                 transition-colors"
      dir="auto"
    />
  );
}
