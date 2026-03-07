interface Row {
  activity: string;
  activityAr: string;
  value: string;
}

interface Props {
  rows: Row[];
  onRowChange: (index: number, value: string) => void;
  title: string;
}

const options = [
  { label: 'معتمد بالكامل', value: 'fully_dependent', color: 'bg-red-100 border-red-400 text-red-800' },
  { label: 'محتاج مساعدة', value: 'needs_assistance', color: 'bg-yellow-100 border-yellow-400 text-yellow-800' },
  { label: 'مستقل بالكامل', value: 'fully_independent', color: 'bg-green-100 border-green-400 text-green-800' },
];

export default function AssessmentTable({ rows, onRowChange, title }: Props) {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-sm text-text-light">{title}</h4>
      {rows.map((row, i) => (
        <div key={row.activity} className="bg-white rounded-lg border border-border p-3">
          <div className="font-medium text-sm mb-2">
            {row.activityAr}
            <span className="text-text-light mr-1">({row.activity})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onRowChange(i, opt.value)}
                className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-all
                  ${row.value === opt.value ? opt.color + ' shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
