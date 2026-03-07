import type { FieldDefinition } from '../../data/types';
import { useFormStore } from '../../store/formStore';
import QuestionCard from './QuestionCard';
import TextInput from './TextInput';
import TextArea from './TextArea';
import RadioGroup from './RadioGroup';
import CheckboxGroup from './CheckboxGroup';
import SelectDropdown from './SelectDropdown';
import VASSlider from './VASSlider';
import ImageDisplay from './ImageDisplay';

interface Props {
  field: FieldDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}

export default function FieldRenderer({ field, value, onChange }: Props) {
  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'date':
        return (
          <TextInput
            value={String(value ?? '')}
            onChange={onChange}
            placeholder={field.placeholder}
            type={field.type}
            unit={field.unit}
          />
        );
      case 'textarea':
        return (
          <TextArea
            value={String(value ?? '')}
            onChange={onChange}
            placeholder={field.placeholder}
          />
        );
      case 'radio':
        return (
          <RadioGroup
            options={field.options || []}
            value={String(value ?? '')}
            onChange={onChange}
          />
        );
      case 'checkbox':
        return (
          <CheckboxGroup
            options={field.options || []}
            value={(value as string[]) || []}
            onChange={onChange}
          />
        );
      case 'select':
        return (
          <SelectDropdown
            options={field.options || []}
            value={String(value ?? '')}
            onChange={onChange}
            placeholder={field.placeholder}
          />
        );
      case 'vas':
        return (
          <VASSlider
            value={Number(value ?? 0)}
            onChange={onChange}
          />
        );
      default:
        return (
          <TextInput
            value={String(value ?? '')}
            onChange={onChange}
            placeholder={field.placeholder}
          />
        );
    }
  };

  if (field.type === 'image' && field.imageUrl) {
    const hideImages = useFormStore((s) => s.settings.hideImages);
    return <ImageDisplay url={field.imageUrl} label={field.englishLabel} collapsed={hideImages} />;
  }

  return (
    <QuestionCard question={field.arabicQuestion} required={field.required}>
      {renderInput()}
    </QuestionCard>
  );
}
