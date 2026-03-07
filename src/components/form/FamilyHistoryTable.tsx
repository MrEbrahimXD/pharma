interface Row {
  disease: string;
  diseaseAr: string;
  familyMember: string;
  ageOfOnset: string;
}

interface Props {
  rows: Row[];
  onMemberChange: (index: number, value: string) => void;
  onAgeChange: (index: number, value: string) => void;
}

export default function FamilyHistoryTable({ rows, onMemberChange, onAgeChange }: Props) {
  return (
    <div className="space-y-3">
      {rows.map((row, i) => (
        <div key={row.disease} className="bg-white rounded-lg border border-border p-3">
          <div className="font-medium text-sm mb-2">
            {row.diseaseAr}
            <span className="text-text-light mr-1 text-xs">({row.disease})</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={row.familyMember}
              onChange={(e) => onMemberChange(i, e.target.value)}
              placeholder="فرد العائلة (أب، أم...)"
              className="px-3 py-2 rounded-md border border-border bg-gray-50 text-sm
                         focus:outline-none focus:ring-1 focus:ring-primary-light"
              dir="auto"
            />
            <input
              type="text"
              value={row.ageOfOnset}
              onChange={(e) => onAgeChange(i, e.target.value)}
              placeholder="سن بداية المرض"
              className="px-3 py-2 rounded-md border border-border bg-gray-50 text-sm
                         focus:outline-none focus:ring-1 focus:ring-primary-light"
              dir="auto"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
