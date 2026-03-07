interface Row {
  artery: string;
  arteryAr: string;
  rt: string;
  lt: string;
}

interface Props {
  rows: Row[];
  onCellChange: (index: number, field: string, value: string) => void;
}

const statusOptions = [
  { value: 'regular', label: 'منتظم', en: 'Regular' },
  { value: 'weak', label: 'ضعيف', en: 'Weak' },
  { value: 'absent', label: 'غائب', en: 'Absent' },
];

export default function ArteryTable({ rows, onCellChange }: Props) {
  return (
    <div className="space-y-3">
      {rows.map((row, i) => (
        <div key={row.artery} className="bg-white rounded-lg border border-border p-3">
          <div className="font-medium text-sm mb-3">
            {row.arteryAr}
            <span className="text-text-light mr-1 text-xs">({row.artery})</span>
          </div>

          {/* Right */}
          <div className="mb-2">
            <span className="text-xs font-medium text-text-light mb-1 block">يمين (Right)</span>
            <div className="flex gap-1.5">
              {statusOptions.map((opt) => (
                <button
                  key={`rt-${opt.value}`}
                  type="button"
                  onClick={() => onCellChange(i, 'rt', row.rt === opt.value ? '' : opt.value)}
                  className={`flex-1 px-2 py-1.5 rounded-md border text-[11px] font-medium transition-all
                    ${row.rt === opt.value
                      ? 'bg-primary text-white border-primary'
                      : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Left */}
          <div>
            <span className="text-xs font-medium text-text-light mb-1 block">شمال (Left)</span>
            <div className="flex gap-1.5">
              {statusOptions.map((opt) => (
                <button
                  key={`lt-${opt.value}`}
                  type="button"
                  onClick={() => onCellChange(i, 'lt', row.lt === opt.value ? '' : opt.value)}
                  className={`flex-1 px-2 py-1.5 rounded-md border text-[11px] font-medium transition-all
                    ${row.lt === opt.value
                      ? 'bg-primary text-white border-primary'
                      : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
