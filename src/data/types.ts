export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'date'
  | 'radio'
  | 'checkbox'
  | 'select'
  | 'vas'
  | 'table'
  | 'assessment-table'
  | 'artery-table'
  | 'family-table'
  | 'image';

export interface FieldOption {
  label: string;       // Arabic label shown in UI
  value: string;       // English value stored & exported to PDF
}

export interface FieldDefinition {
  id: string;
  arabicQuestion: string;   // Egyptian Arabic conversational question
  englishLabel: string;     // English label for PDF
  type: FieldType;
  options?: FieldOption[];
  placeholder?: string;
  section: string;
  required?: boolean;
  unit?: string;
  imageUrl?: string;
}

export interface SectionDefinition {
  id: string;
  titleAr: string;      // Arabic section title
  titleEn: string;      // English section title for PDF
  fields: FieldDefinition[];
}

// ADL / IADL table types
export interface AssessmentRow {
  activity: string;
  activityAr: string;
  value: 'fully_dependent' | 'needs_assistance' | 'fully_independent' | '';
}

// Family history table types
export interface FamilyHistoryRow {
  disease: string;
  diseaseAr: string;
  familyMember: string;
  ageOfOnset: string;
}

// Memory / Behavioral assessment
export interface AssessmentCheckRow {
  item: string;
  itemAr: string;
  present: boolean;
  comments: string;
}

// Artery/PR table
export interface ArteryRow {
  artery: string;
  arteryAr: string;
  rt: string;
  lt: string;
}

// Extremity assessment (Rt/Lt)
export interface ExtremityRow {
  area: string;
  areaAr: string;
  rt: string;
  lt: string;
}

export interface CardioFormData {
  [key: string]: string | string[] | number | undefined;
}

export interface InternalFormData {
  [key: string]: string | string[] | number | AssessmentRow[] | FamilyHistoryRow[] | AssessmentCheckRow[] | ArteryRow[] | ExtremityRow[] | undefined;
}
