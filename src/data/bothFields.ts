import type { FieldDefinition } from './types';
import { cardioSections } from './cardioFields';
import { internalSections } from './internalFields';

// ─── Shared field pairs: [cardioId, internalId] ───
// When user fills one, both stores get the value.
export const sharedFieldPairs: [string, string][] = [
  ['patient_name', 'int_name'],
  ['age', 'int_age'],
  ['gender', 'int_gender'],
  ['marital_status', 'int_marital_status'],
  ['address', 'int_address'],
  ['occupation', 'int_occupation'],
  ['present_illness_text', 'int_present_history_text'],
  ['previous_illnesses', 'int_past_history_1'],
  ['smoking_details', 'int_smoking'],
  ['physical_activity', 'int_sport'],
  ['blood_pressure', 'int_bp_rt'],
  ['oxygen_saturation', 'int_spo2'],
  ['resting_heart_rate', 'int_pr'],
];

// Quick lookup: fieldId → its mirror in the other store
export const sharedFieldMirror: Record<string, { store: 'cardio' | 'internal'; fieldId: string }> = {};
for (const [cId, iId] of sharedFieldPairs) {
  sharedFieldMirror[cId] = { store: 'internal', fieldId: iId };
  sharedFieldMirror[iId] = { store: 'cardio', fieldId: cId };
}

// ─── Field reference in a merged section ───
export type FieldRef = {
  source: 'cardio' | 'internal';
  field: FieldDefinition;
};

export type MergedSection = {
  id: string;
  titleAr: string;
  titleEn: string;
  fields: FieldRef[];
  /** If set, BothCase renders the special table component instead of fields */
  specialType?: string;
};

// ─── Helper: build field lookup maps ───
const cardioFieldMap = new Map<string, FieldDefinition>();
for (const s of cardioSections) for (const f of s.fields) cardioFieldMap.set(f.id, f);

const internalFieldMap = new Map<string, FieldDefinition>();
for (const s of internalSections) for (const f of s.fields) internalFieldMap.set(f.id, f);

function cf(id: string): FieldRef { return { source: 'cardio', field: cardioFieldMap.get(id)! }; }
function intf(id: string): FieldRef { return { source: 'internal', field: internalFieldMap.get(id)! }; }

/** Get all fields from a cardio section */
function cardioSection(sectionId: string): FieldRef[] {
  const s = cardioSections.find(s => s.id === sectionId);
  return s ? s.fields.map(f => ({ source: 'cardio' as const, field: f })) : [];
}

/** Get all fields from an internal section, skipping table-type fields */
function internalSectionFields(sectionId: string): FieldRef[] {
  const s = internalSections.find(s => s.id === sectionId);
  return s ? s.fields
    .filter(f => !['assessment-table', 'family-table', 'artery-table'].includes(f.type))
    .map(f => ({ source: 'internal' as const, field: f })) : [];
}

// ─── Merged sections in display order ───
export const mergedSections: MergedSection[] = [
  // 1. Personal Information (merged)
  {
    id: 'both_personal',
    titleAr: 'البيانات الشخصية',
    titleEn: 'Personal Information',
    fields: [
      cf('patient_name'),        // shared → also sets int_name
      cf('age'),                 // shared → also sets int_age
      cf('gender'),              // shared → also sets int_gender
      cf('marital_status'),      // shared → also sets int_marital_status
      cf('address'),             // shared → also sets int_address
      cf('occupation'),          // shared → also sets int_occupation
      // Cardio-only
      cf('referred_by'),
      cf('admission_date'),
      // Internal-only extras
      intf('int_race'),
      intf('int_phone'),
      intf('int_source_of_info'),
      intf('int_primary_care'),
      intf('int_referral_from'),
      intf('int_referral'),
    ],
  },

  // 2. Clinical Experience (cardio-only)
  {
    id: 'both_clinical',
    titleAr: 'نوع التجربة السريرية',
    titleEn: 'Type of Clinical Experience',
    fields: cardioSection('clinical_type'),
  },

  // 3. Chief Complaint & Present Illness (merged)
  {
    id: 'both_complaint',
    titleAr: 'الشكوى والمرض الحالي',
    titleEn: 'Chief Complaint & Present Illness',
    fields: [
      intf('int_chief_complaint'),
      cf('present_illness_text'),       // shared → also sets int_present_history_text
    ],
  },

  // 4. Past History (merged)
  {
    id: 'both_past_history',
    titleAr: 'التاريخ المرضي السابق',
    titleEn: 'Past History (Medical / Surgical)',
    fields: [
      cf('previous_illnesses'),
    ],
  },

  // 5. Cardiovascular History (cardio-only)
  {
    id: 'both_cv',
    titleAr: 'تاريخ القلب والأوعية الدموية',
    titleEn: 'Cardiovascular History',
    fields: cardioSection('cv_history'),
  },

  // 6. Pulmonary History (cardio-only)
  {
    id: 'both_pulmonary',
    titleAr: 'تاريخ الجهاز التنفسي',
    titleEn: 'Pulmonary History',
    fields: cardioSection('pulmonary_history'),
  },

  // 7. Risk Factors & Habits (merged)
  {
    id: 'both_risk_habits',
    titleAr: 'عوامل الخطر والعادات',
    titleEn: 'Risk Factors & Special Habits',
    fields: [
      cf('smoking'),
      cf('smoking_details'),
      cf('physical_activity'),            // shared → also sets int_sport
      cf('diet'),
      cf('family_history_cv'),
      intf('int_alcoholic'),
      intf('int_social_activities'),
    ],
  },

  // 8. Allergies (internal-only)
  {
    id: 'both_allergies',
    titleAr: 'الحساسية والأعراض الجانبية',
    titleEn: 'Allergies / Adverse Events',
    fields: internalSectionFields('allergies'),
  },

  // 9. Medications (internal-only)
  {
    id: 'both_medications',
    titleAr: 'الأدوية',
    titleEn: 'Medications',
    fields: internalSectionFields('medications'),
  },

  // 10. Family History (internal table)
  {
    id: 'both_family_history',
    titleAr: 'تاريخ العائلة المرضي',
    titleEn: 'Family History',
    fields: [],
    specialType: 'family_history',
  },

  // 11. Assistive Devices (internal-only)
  {
    id: 'both_assistive',
    titleAr: 'الأجهزة المساعدة',
    titleEn: 'Assistive Devices',
    fields: internalSectionFields('assistive_devices'),
  },

  // 12. Vital Signs (merged)
  {
    id: 'both_vitals',
    titleAr: 'العلامات الحيوية',
    titleEn: 'Vital Signs',
    fields: [
      intf('int_temp'),
      cf('resting_heart_rate'),           // shared → also sets int_pr
      cf('rhythm'),
      intf('int_bp_rt'),
      intf('int_bp_lt'),
      cf('oxygen_saturation'),            // shared → also sets int_spo2
      intf('int_rr'),
      intf('int_rr_pattern'),
    ],
  },

  // 13–16. Cardio physical exam sections
  {
    id: 'both_inspection',
    titleAr: 'الفحص بالنظر',
    titleEn: 'Inspection',
    fields: cardioSection('inspection'),
  },
  {
    id: 'both_palpation',
    titleAr: 'الفحص باللمس',
    titleEn: 'Palpation',
    fields: cardioSection('palpation'),
  },
  {
    id: 'both_auscultation',
    titleAr: 'الفحص بالسماعة',
    titleEn: 'Auscultation',
    fields: cardioSection('auscultation'),
  },
  {
    id: 'both_pain',
    titleAr: 'تقييم الألم',
    titleEn: 'PAIN Assessment',
    fields: cardioSection('pain'),
  },
  {
    id: 'both_posture',
    titleAr: 'الوضعية والفحص',
    titleEn: 'Posture & Inspection',
    fields: cardioSection('posture_inspection'),
  },

  // 17–20. Internal assessment tables
  {
    id: 'both_adl',
    titleAr: 'تقييم الأنشطة اليومية',
    titleEn: 'ADL Assessment',
    fields: [],
    specialType: 'adl_assessment',
  },
  {
    id: 'both_iadl',
    titleAr: 'تقييم الأنشطة اليومية المتقدمة',
    titleEn: 'IADL Assessment',
    fields: [],
    specialType: 'iadl_assessment',
  },
  {
    id: 'both_memory',
    titleAr: 'تقييم الذاكرة',
    titleEn: 'Memory Assessment',
    fields: [],
    specialType: 'memory_assessment',
  },
  {
    id: 'both_behavioral',
    titleAr: 'تقييم السلوك',
    titleEn: 'Behavioral Assessment',
    fields: [],
    specialType: 'behavioral_assessment',
  },

  // 21. Lab Data (internal-only)
  {
    id: 'both_lab',
    titleAr: 'التحاليل والأشعة',
    titleEn: 'Laboratory Data & Investigations',
    fields: internalSectionFields('lab_data'),
  },

  // 22. Artery Assessment (internal table)
  {
    id: 'both_artery',
    titleAr: 'تقييم الشرايين / النبض',
    titleEn: 'Artery / PR Assessment',
    fields: [],
    specialType: 'artery_assessment',
  },

  // 23–28. Internal-only exam sections
  {
    id: 'both_sensory',
    titleAr: 'تقييم الحواس',
    titleEn: 'Sensory Assessment',
    fields: internalSectionFields('sensory_assessment'),
  },
  {
    id: 'both_extremity',
    titleAr: 'تقييم الأطراف',
    titleEn: 'Extremity Assessment',
    fields: internalSectionFields('extremity_assessment'),
  },
  {
    id: 'both_mmt',
    titleAr: 'اختبار قوة العضلات',
    titleEn: 'MMT Assessment',
    fields: internalSectionFields('mmt_assessment'),
  },
  {
    id: 'both_vascular',
    titleAr: 'تقييم الأوعية الدموية',
    titleEn: 'Vascular Assessment',
    fields: internalSectionFields('vascular_assessment'),
  },
  {
    id: 'both_edema',
    titleAr: 'تقييم التورم',
    titleEn: 'Edema Assessment',
    fields: internalSectionFields('edema_assessment'),
  },

  // 29. Functional Testing & Balance (merged)
  {
    id: 'both_functional',
    titleAr: 'اختبارات وظيفية وتمارين وتوازن',
    titleEn: 'Functional Testing & Balance',
    fields: [
      ...cardioSection('functional_testing'),
      ...internalSectionFields('functional_balance'),
    ],
  },

  // 30. Respiratory Measures (cardio-only)
  {
    id: 'both_respiratory',
    titleAr: 'قياسات الجهاز التنفسي',
    titleEn: 'Respiratory-Specific Measures',
    fields: cardioSection('respiratory_measures'),
  },

  // 31–35. Internal-only remaining sections
  {
    id: 'both_other_tests',
    titleAr: 'اختبارات خاصة أخرى',
    titleEn: 'Other Special Tests',
    fields: internalSectionFields('other_tests'),
  },
  {
    id: 'both_gait',
    titleAr: 'تقييم المشي',
    titleEn: 'Gait Assessment',
    fields: internalSectionFields('gait_assessment'),
  },
  {
    id: 'both_deformities',
    titleAr: 'التشوهات',
    titleEn: 'Deformities',
    fields: internalSectionFields('deformities'),
  },
  {
    id: 'both_nonmental',
    titleAr: 'التقييم غير العقلي',
    titleEn: 'Nonmental Assessment',
    fields: internalSectionFields('nonmental_assessment'),
  },
  {
    id: 'both_problem_list',
    titleAr: 'قائمة المشاكل والخطة',
    titleEn: 'Problem List',
    fields: internalSectionFields('problem_list'),
  },
  {
    id: 'both_precautions',
    titleAr: 'الاحتياطات',
    titleEn: 'Precautions',
    fields: internalSectionFields('precautions'),
  },

  // 36. Treatment & PT Management (merged)
  {
    id: 'both_treatment',
    titleAr: 'خطة العلاج',
    titleEn: 'Treatment Plan & PT Management',
    fields: [
      ...cardioSection('treatment_plan'),
      intf('int_pt_management'),
      intf('int_home_instructions'),
    ],
  },

  // 37. Prognoses (cardio-only)
  {
    id: 'both_prognoses',
    titleAr: 'التوقعات',
    titleEn: 'Prognoses',
    fields: cardioSection('prognoses'),
  },

  // 38. PT Signature (internal-only)
  {
    id: 'both_signature',
    titleAr: 'اسم المعالج والتوقيع',
    titleEn: 'PT & Signature',
    fields: internalSectionFields('pt_signature'),
  },
];
