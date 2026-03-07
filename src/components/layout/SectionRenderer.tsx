import type { SectionDefinition } from '../../data/types';
import { FieldRenderer } from '../form';

interface Props {
  section: SectionDefinition;
  data: Record<string, unknown>;
  onFieldChange: (fieldId: string, value: unknown) => void;
}

export default function SectionRenderer({ section, data, onFieldChange }: Props) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-8 bg-primary rounded-full" />
        <div>
          <h2 className="text-lg font-bold text-text">{section.titleAr}</h2>
          <p className="text-xs text-text-light">{section.titleEn}</p>
        </div>
      </div>
      {section.fields.map((field) => {
        // Skip table types — they're rendered separately
        if (['assessment-table', 'family-table', 'artery-table'].includes(field.type)) {
          return null;
        }
        return (
          <FieldRenderer
            key={field.id}
            field={field}
            value={data[field.id]}
            onChange={(val) => onFieldChange(field.id, val)}
          />
        );
      })}
    </div>
  );
}
