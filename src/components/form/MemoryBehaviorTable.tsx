interface Row {
  item: string;
  itemAr: string;
  present: boolean;
  comments: string;
}

interface Props {
  rows: Row[];
  onToggle: (index: number) => void;
  onComment: (index: number, value: string) => void;
  title: string;
}

export default function MemoryBehaviorTable({ rows, onToggle, onComment, title }: Props) {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-sm text-text-light">{title}</h4>
      {rows.map((row, i) => (
        <div key={row.item} className="bg-white rounded-lg border border-border p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-sm">
              {row.itemAr}
              <span className="text-text-light mr-1 text-xs">({row.item})</span>
            </div>
            <button
              type="button"
              onClick={() => onToggle(i)}
              className={`px-3 py-1 rounded-md border text-xs font-medium transition-all
                ${row.present
                  ? 'bg-red-100 border-red-400 text-red-800'
                  : 'bg-gray-50 border-gray-200 text-gray-500'}`}
            >
              {row.present ? 'موجود ✓' : 'مش موجود'}
            </button>
          </div>
          {row.present && (
            <input
              type="text"
              value={row.comments}
              onChange={(e) => onComment(i, e.target.value)}
              placeholder="تعليق..."
              className="w-full px-3 py-2 rounded-md border border-border bg-gray-50 text-sm
                         focus:outline-none focus:ring-1 focus:ring-primary-light"
              dir="auto"
            />
          )}
        </div>
      ))}
    </div>
  );
}
