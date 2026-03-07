interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function VASSlider({ value, onChange }: Props) {
  const val = value ?? 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-text-light">
        <span>لا ألم (0)</span>
        <span className="font-bold text-lg text-text">{val}</span>
        <span>ألم شديد (10)</span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        step={1}
        value={val}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        dir="ltr"
      />
      <div className="flex justify-between text-xs text-text-light" dir="ltr">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  );
}
