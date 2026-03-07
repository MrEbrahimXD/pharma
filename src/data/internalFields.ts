import type { SectionDefinition } from './types';

export const internalSections: SectionDefinition[] = [
  // ───────── Section 1: Personal History ─────────
  {
    id: 'personal_history',
    titleAr: 'البيانات الشخصية',
    titleEn: 'Personal History',
    fields: [
      {
        id: 'int_name',
        arabicQuestion: 'اسم حضرتك إيه؟',
        englishLabel: 'Name',
        type: 'text',
        section: 'personal_history',
        placeholder: 'الاسم',
        required: true,
      },
      {
        id: 'int_age',
        arabicQuestion: 'عندك كام سنة؟',
        englishLabel: 'Age',
        type: 'number',
        section: 'personal_history',
        placeholder: 'السن',
        required: true,
      },
      {
        id: 'int_gender',
        arabicQuestion: 'الجنس',
        englishLabel: 'Gender',
        type: 'radio',
        section: 'personal_history',
        options: [
          { label: 'ذكر', value: 'Male' },
          { label: 'أنثى', value: 'Female' },
        ],
      },
      {
        id: 'int_race',
        arabicQuestion: 'العِرق / الجنسية',
        englishLabel: 'Race',
        type: 'text',
        section: 'personal_history',
        placeholder: 'العرق',
      },
      {
        id: 'int_phone',
        arabicQuestion: 'رقم التليفون',
        englishLabel: 'Phone',
        type: 'text',
        section: 'personal_history',
        placeholder: 'رقم الهاتف',
      },
      {
        id: 'int_address',
        arabicQuestion: 'ساكن/ة فين؟',
        englishLabel: 'Address',
        type: 'text',
        section: 'personal_history',
        placeholder: 'العنوان',
      },
      {
        id: 'int_marital_status',
        arabicQuestion: 'الحالة الاجتماعية',
        englishLabel: 'M. status',
        type: 'select',
        section: 'personal_history',
        options: [
          { label: 'أعزب/عزباء', value: 'Single' },
          { label: 'متزوج/ة', value: 'Married' },
          { label: 'مطلق/ة', value: 'Divorced' },
          { label: 'أرمل/ة', value: 'Widowed' },
        ],
      },
      {
        id: 'int_occupation',
        arabicQuestion: 'شغلك إيه؟ (أو كنت بتشتغل إيه؟)',
        englishLabel: 'Occupation (Past?)',
        type: 'text',
        section: 'personal_history',
        placeholder: 'الوظيفة',
      },
      {
        id: 'int_source_of_info',
        arabicQuestion: 'مصدر المعلومات (المريض نفسه ولا مرافق)',
        englishLabel: 'Source of information',
        type: 'text',
        section: 'personal_history',
        placeholder: 'المريض / المرافق...',
      },
      {
        id: 'int_primary_care',
        arabicQuestion: 'مين الدكتور المتابع معاك؟',
        englishLabel: 'Primary care provider',
        type: 'text',
        section: 'personal_history',
        placeholder: 'اسم الطبيب المعالج',
      },
      {
        id: 'int_referral_from',
        arabicQuestion: 'محوّل من مين؟',
        englishLabel: 'Referral from',
        type: 'text',
        section: 'personal_history',
        placeholder: 'جهة التحويل',
      },
      {
        id: 'int_referral',
        arabicQuestion: 'سبب التحويل',
        englishLabel: 'Referral',
        type: 'text',
        section: 'personal_history',
        placeholder: 'سبب التحويل...',
      },
    ],
  },

  // ───────── Section 2: Chief Complaint ─────────
  {
    id: 'chief_complaint',
    titleAr: 'الشكوى الرئيسية',
    titleEn: 'Chief Complaint',
    fields: [
      {
        id: 'int_chief_complaint',
        arabicQuestion: 'بتشتكي من إيه؟ إيه أكتر حاجة مضايقاك؟',
        englishLabel: 'Chief Complaint',
        type: 'textarea',
        section: 'chief_complaint',
        placeholder: 'اكتب الشكوى الرئيسية...',
        required: true,
      },
    ],
  },

  // ───────── Section 3: Past History ─────────
  {
    id: 'past_history',
    titleAr: 'التاريخ المرضي السابق',
    titleEn: 'Past History (Medical/Surgical)',
    fields: [
      {
        id: 'int_past_history_1',
        arabicQuestion: 'عندك أي أمراض مزمنة أو عمليات قبل كده؟ (الأول)',
        englishLabel: 'Past History 1',
        type: 'text',
        section: 'past_history',
        placeholder: 'المرض أو العملية...',
      },
      {
        id: 'int_past_history_2',
        arabicQuestion: 'في أي حاجة تانية؟ (التاني)',
        englishLabel: 'Past History 2',
        type: 'text',
        section: 'past_history',
        placeholder: 'المرض أو العملية...',
      },
      {
        id: 'int_past_history_3',
        arabicQuestion: 'في أي حاجة تالتة؟ (التالت)',
        englishLabel: 'Past History 3',
        type: 'text',
        section: 'past_history',
        placeholder: 'المرض أو العملية...',
      },
    ],
  },

  // ───────── Section 4: Present History ─────────
  {
    id: 'int_present_history',
    titleAr: 'التاريخ المرضي الحالي',
    titleEn: 'Present History',
    fields: [
      {
        id: 'int_present_history_text',
        arabicQuestion: 'احكيلي بالتفصيل إيه اللي حصل — بدأ إمتى وإزاي؟',
        englishLabel: 'Present History',
        type: 'textarea',
        section: 'int_present_history',
        placeholder: 'التاريخ المرضي الحالي بالتفصيل...',
      },
    ],
  },

  // ───────── Section 5: Allergies ─────────
  {
    id: 'allergies',
    titleAr: 'الحساسية والأعراض الجانبية',
    titleEn: 'Allergies/Adverse Events',
    fields: [
      {
        id: 'int_allergies',
        arabicQuestion: 'عندك حساسية من أي أدوية أو أكل؟',
        englishLabel: 'Allergies/Adverse Events',
        type: 'textarea',
        section: 'allergies',
        placeholder: 'اكتب الحساسية إن وجدت...',
      },
    ],
  },

  // ───────── Section 6: Medications ─────────
  {
    id: 'medications',
    titleAr: 'الأدوية',
    titleEn: 'Medications',
    fields: [
      {
        id: 'int_current_med_1',
        arabicQuestion: 'بتاخد أي أدوية دلوقتي؟ (الدوا الأول)',
        englishLabel: 'Current Medication 1',
        type: 'text',
        section: 'medications',
        placeholder: 'اسم الدوا والجرعة...',
      },
      {
        id: 'int_current_med_2',
        arabicQuestion: 'الدوا التاني',
        englishLabel: 'Current Medication 2',
        type: 'text',
        section: 'medications',
        placeholder: 'اسم الدوا والجرعة...',
      },
      {
        id: 'int_current_med_3',
        arabicQuestion: 'الدوا التالت',
        englishLabel: 'Current Medication 3',
        type: 'text',
        section: 'medications',
        placeholder: 'اسم الدوا والجرعة...',
      },
      {
        id: 'int_current_med_4',
        arabicQuestion: 'الدوا الرابع',
        englishLabel: 'Current Medication 4',
        type: 'text',
        section: 'medications',
        placeholder: 'اسم الدوا والجرعة...',
      },
      {
        id: 'int_current_med_5',
        arabicQuestion: 'الدوا الخامس',
        englishLabel: 'Current Medication 5',
        type: 'text',
        section: 'medications',
        placeholder: 'اسم الدوا والجرعة...',
      },
      {
        id: 'int_past_med_1',
        arabicQuestion: 'كنت بتاخد أي أدوية قبل كده وبطّلتها؟ (الأول)',
        englishLabel: 'Pertinent Past Medication 1',
        type: 'text',
        section: 'medications',
        placeholder: 'اسم الدوا...',
      },
      {
        id: 'int_past_med_2',
        arabicQuestion: 'دوا قديم تاني',
        englishLabel: 'Pertinent Past Medication 2',
        type: 'text',
        section: 'medications',
        placeholder: 'اسم الدوا...',
      },
      {
        id: 'int_past_med_3',
        arabicQuestion: 'دوا قديم تالت',
        englishLabel: 'Pertinent Past Medication 3',
        type: 'text',
        section: 'medications',
        placeholder: 'اسم الدوا...',
      },
      {
        id: 'int_past_med_4',
        arabicQuestion: 'دوا قديم رابع',
        englishLabel: 'Pertinent Past Medication 4',
        type: 'text',
        section: 'medications',
        placeholder: 'اسم الدوا...',
      },
      {
        id: 'int_past_med_5',
        arabicQuestion: 'دوا قديم خامس',
        englishLabel: 'Pertinent Past Medication 5',
        type: 'text',
        section: 'medications',
        placeholder: 'اسم الدوا...',
      },
    ],
  },

  // ───────── Section 7: Family History ─────────
  {
    id: 'family_history',
    titleAr: 'تاريخ العائلة المرضي',
    titleEn: 'Family History',
    fields: [
      {
        id: 'int_family_history',
        arabicQuestion: 'في حد في العائلة عنده أي أمراض من دول؟',
        englishLabel: 'Family History',
        type: 'family-table',
        section: 'family_history',
      },
    ],
  },

  // ───────── Section 8: Special Habits ─────────
  {
    id: 'special_habits',
    titleAr: 'العادات والأنشطة',
    titleEn: 'Special Habits / Exercises / Activities',
    fields: [
      {
        id: 'int_smoking',
        arabicQuestion: 'بتدخن؟',
        englishLabel: 'Smoking',
        type: 'text',
        section: 'special_habits',
        placeholder: 'التدخين...',
      },
      {
        id: 'int_alcoholic',
        arabicQuestion: 'بتشرب كحوليات؟',
        englishLabel: 'Alcoholic',
        type: 'text',
        section: 'special_habits',
        placeholder: 'الكحول...',
      },
      {
        id: 'int_sport',
        arabicQuestion: 'بتعمل رياضة؟ إيه وكل قد إيه؟',
        englishLabel: 'Sport',
        type: 'text',
        section: 'special_habits',
        placeholder: 'الرياضة...',
      },
      {
        id: 'int_social_activities',
        arabicQuestion: 'عندك أنشطة اجتماعية؟ بتروح نادي أو مناسبات؟',
        englishLabel: 'Social Activities',
        type: 'text',
        section: 'special_habits',
        placeholder: 'الأنشطة الاجتماعية...',
      },
    ],
  },

  // ───────── Section 9: Assistive Devices ─────────
  {
    id: 'assistive_devices',
    titleAr: 'الأجهزة المساعدة',
    titleEn: 'Assistive Devices',
    fields: [
      {
        id: 'int_assistive_device',
        arabicQuestion: 'بتستخدم أي جهاز مساعد؟ (عكاز، كرسي متحرك، سماعة...)',
        englishLabel: 'Assistive devices',
        type: 'text',
        section: 'assistive_devices',
        placeholder: 'نوع الجهاز...',
      },
      {
        id: 'int_device_frequency',
        arabicQuestion: 'بتستخدمه قد إيه؟',
        englishLabel: 'Frequency',
        type: 'text',
        section: 'assistive_devices',
        placeholder: 'دايمًا / أحيانًا...',
      },
      {
        id: 'int_device_reason',
        arabicQuestion: 'ليه بتستخدمه؟',
        englishLabel: 'Reason',
        type: 'text',
        section: 'assistive_devices',
        placeholder: 'السبب...',
      },
      {
        id: 'int_device_date',
        arabicQuestion: 'بدأت تستخدمه إمتى؟',
        englishLabel: 'Date of initial Use',
        type: 'text',
        section: 'assistive_devices',
        placeholder: 'التاريخ...',
      },
    ],
  },

  // ───────── Section 10: ADL Assessment ─────────
  {
    id: 'adl_assessment',
    titleAr: 'تقييم الأنشطة اليومية (ADL)',
    titleEn: 'ADL Assessment',
    fields: [
      {
        id: 'int_adl',
        arabicQuestion: 'هنسألك عن الأنشطة اليومية — بتعملها لوحدك ولا محتاج مساعدة؟',
        englishLabel: 'ADL Assessment',
        type: 'assessment-table',
        section: 'adl_assessment',
      },
    ],
  },

  // ───────── Section 11: IADL Assessment ─────────
  {
    id: 'iadl_assessment',
    titleAr: 'تقييم الأنشطة اليومية المتقدمة (IADL)',
    titleEn: 'IADL Assessment',
    fields: [
      {
        id: 'int_iadl',
        arabicQuestion: 'وبالنسبة للأنشطة دي — بتعملها لوحدك ولا محتاج مساعدة؟',
        englishLabel: 'IADL Assessment',
        type: 'assessment-table',
        section: 'iadl_assessment',
      },
    ],
  },

  // ───────── Section 12: Memory Assessment ─────────
  {
    id: 'memory_assessment',
    titleAr: 'تقييم الذاكرة',
    titleEn: 'Memory Assessment',
    fields: [
      {
        id: 'int_memory',
        arabicQuestion: 'هنسألك شوية أسئلة عن الذاكرة',
        englishLabel: 'Memory Assessment',
        type: 'assessment-table',
        section: 'memory_assessment',
      },
    ],
  },

  // ───────── Section 13: Behavioral Assessment ─────────
  {
    id: 'behavioral_assessment',
    titleAr: 'تقييم السلوك',
    titleEn: 'Behavioral Assessment',
    fields: [
      {
        id: 'int_behavior',
        arabicQuestion: 'هنسألك عن بعض السلوكيات',
        englishLabel: 'Behavioral Assessment',
        type: 'assessment-table',
        section: 'behavioral_assessment',
      },
    ],
  },

  // ───────── Section 14: Lab & Investigations ─────────
  {
    id: 'lab_data',
    titleAr: 'التحاليل والأشعة',
    titleEn: 'Laboratory Data & Investigations',
    fields: [
      {
        id: 'int_lab_data',
        arabicQuestion: 'نتائج التحاليل',
        englishLabel: 'Laboratory Data',
        type: 'textarea',
        section: 'lab_data',
        placeholder: 'اكتب نتائج التحاليل...',
      },
      {
        id: 'int_investigations',
        arabicQuestion: 'نتائج الأشعة والفحوصات (MRI / CT / X-ray / أشعة تلفزيونية)',
        englishLabel: 'Other Investigations (MRI/CT/X-ray/Mammogram/US)',
        type: 'textarea',
        section: 'lab_data',
        placeholder: 'اكتب نتائج الفحوصات...',
      },
    ],
  },

  // ───────── Section 15: Vital Signs ─────────
  {
    id: 'int_vital_signs',
    titleAr: 'العلامات الحيوية',
    titleEn: 'Vital Signs',
    fields: [
      {
        id: 'int_temp',
        arabicQuestion: 'درجة الحرارة (Temperature)',
        englishLabel: 'Temp.',
        type: 'text',
        section: 'int_vital_signs',
        placeholder: '°C',
      },
      {
        id: 'int_bp_rt',
        arabicQuestion: 'ضغط الدم (يمين) (Rt. Blood Pressure)',
        englishLabel: 'Rt. BP',
        type: 'text',
        section: 'int_vital_signs',
        placeholder: 'mmHg',
      },
      {
        id: 'int_bp_lt',
        arabicQuestion: 'ضغط الدم (شمال) (Lt. Blood Pressure)',
        englishLabel: 'Lt. BP',
        type: 'text',
        section: 'int_vital_signs',
        placeholder: 'mmHg',
      },
      {
        id: 'int_spo2',
        arabicQuestion: 'نسبة الأكسجين (SpO2)',
        englishLabel: 'SPO2',
        type: 'text',
        section: 'int_vital_signs',
        placeholder: '%',
      },
      {
        id: 'int_rr',
        arabicQuestion: 'معدل التنفس (Respiratory Rate)',
        englishLabel: 'RR',
        type: 'text',
        section: 'int_vital_signs',
        placeholder: '/min',
      },
      {
        id: 'int_rr_pattern',
        arabicQuestion: 'نمط التنفس (Breathing Pattern)',
        englishLabel: 'Pattern',
        type: 'text',
        section: 'int_vital_signs',
        placeholder: 'النمط...',
      },
      {
        id: 'int_pr',
        arabicQuestion: 'معدل النبض (Pulse Rate)',
        englishLabel: 'PR',
        type: 'text',
        section: 'int_vital_signs',
        placeholder: 'bpm',
      },
    ],
  },

  // ───────── Section 16: Artery/PR Assessment ─────────
  {
    id: 'artery_assessment',
    titleAr: 'تقييم الشرايين / النبض',
    titleEn: 'Artery / PR Assessment',
    fields: [
      {
        id: 'int_artery',
        arabicQuestion: 'تقييم النبض في الشرايين المختلفة',
        englishLabel: 'Artery / PR',
        type: 'artery-table',
        section: 'artery_assessment',
      },
    ],
  },

  // ───────── Section 17: Sensory Assessment ─────────
  {
    id: 'sensory_assessment',
    titleAr: 'تقييم الحواس',
    titleEn: 'Sensory Assessment',
    fields: [
      {
        id: 'int_visual',
        arabicQuestion: 'نظرك كويس ولا في مشكلة؟ (Visual)',
        englishLabel: 'Visual',
        type: 'text',
        section: 'sensory_assessment',
        placeholder: 'حالة النظر...',
      },
      {
        id: 'int_auditory',
        arabicQuestion: 'سمعك كويس ولا محتاج سماعة؟ (Auditory)',
        englishLabel: 'Auditory',
        type: 'text',
        section: 'sensory_assessment',
        placeholder: 'حالة السمع...',
      },
      {
        id: 'int_vestibular',
        arabicQuestion: 'بتحس بدوخة أو عدم اتزان؟ (تقييم الجهاز الدهليزي) (Vestibular)',
        englishLabel: 'Vestibular',
        type: 'textarea',
        section: 'sensory_assessment',
        placeholder: 'التقييم...',
      },
      {
        id: 'int_proprioceptive',
        arabicQuestion: 'بتحس بمكان جسمك في الفراغ كويس؟ (الإحساس العميق) (Proprioceptive)',
        englishLabel: 'Proprioceptive',
        type: 'textarea',
        section: 'sensory_assessment',
        placeholder: 'التقييم...',
      },
    ],
  },

  // ───────── Section 18: Upper & Lower Extremity ─────────
  {
    id: 'extremity_assessment',
    titleAr: 'تقييم الأطراف العلوية والسفلية',
    titleEn: 'Extremity Assessment',
    fields: [
      {
        id: 'int_upper_ext_rt',
        arabicQuestion: 'الطرف العلوي - يمين (Upper Extremity Rt)',
        englishLabel: 'Upper Extremity Rt',
        type: 'text',
        section: 'extremity_assessment',
        placeholder: 'النتيجة...',
      },
      {
        id: 'int_upper_ext_lt',
        arabicQuestion: 'الطرف العلوي - شمال (Upper Extremity Lt)',
        englishLabel: 'Upper Extremity Lt',
        type: 'text',
        section: 'extremity_assessment',
        placeholder: 'النتيجة...',
      },
      {
        id: 'int_lower_ext_rt',
        arabicQuestion: 'الطرف السفلي - يمين (Lower Extremity Rt)',
        englishLabel: 'Lower Extremity Rt',
        type: 'text',
        section: 'extremity_assessment',
        placeholder: 'النتيجة...',
      },
      {
        id: 'int_lower_ext_lt',
        arabicQuestion: 'الطرف السفلي - شمال (Lower Extremity Lt)',
        englishLabel: 'Lower Extremity Lt',
        type: 'text',
        section: 'extremity_assessment',
        placeholder: 'النتيجة...',
      },
    ],
  },

  // ───────── Section 19: MMT Assessment ─────────
  {
    id: 'mmt_assessment',
    titleAr: 'اختبار قوة العضلات (MMT)',
    titleEn: 'MMT Assessment',
    fields: [
      {
        id: 'int_mmt_ref_img',
        arabicQuestion: '',
        englishLabel: 'MMT Grading System Reference',
        type: 'image',
        section: 'mmt_assessment',
        imageUrl: 'https://www.pod-nmd.org/wp-content/uploads/2023/11/strength-MMT-Grading-System-Table.png',
      },
      {
        id: 'int_mmt_upper_rt',
        arabicQuestion: 'قوة العضلات - الطرف العلوي يمين (MMT Upper Rt)',
        englishLabel: 'MMT Upper Extremity Rt',
        type: 'text',
        section: 'mmt_assessment',
        placeholder: 'الدرجة...',
      },
      {
        id: 'int_mmt_upper_lt',
        arabicQuestion: 'قوة العضلات - الطرف العلوي شمال (MMT Upper Lt)',
        englishLabel: 'MMT Upper Extremity Lt',
        type: 'text',
        section: 'mmt_assessment',
        placeholder: 'الدرجة...',
      },
      {
        id: 'int_mmt_lower_rt',
        arabicQuestion: 'قوة العضلات - الطرف السفلي يمين (MMT Lower Rt)',
        englishLabel: 'MMT Lower Extremity Rt',
        type: 'text',
        section: 'mmt_assessment',
        placeholder: 'الدرجة...',
      },
      {
        id: 'int_mmt_lower_lt',
        arabicQuestion: 'قوة العضلات - الطرف السفلي شمال (MMT Lower Lt)',
        englishLabel: 'MMT Lower Extremity Lt',
        type: 'text',
        section: 'mmt_assessment',
        placeholder: 'الدرجة...',
      },
    ],
  },

  // ───────── Section 20: Vascular Assessment ─────────
  {
    id: 'vascular_assessment',
    titleAr: 'تقييم الأوعية الدموية',
    titleEn: 'Vascular Assessment',
    fields: [
      {
        id: 'int_vascular_ref_img',
        arabicQuestion: '',
        englishLabel: 'Vascular Assessment Reference',
        type: 'image',
        section: 'vascular_assessment',
        imageUrl: 'https://osmose-it.s3.amazonaws.com/iiixJ87jSwOrQ7BC2UkuHKqSSS_YPxnW/_.png',
      },
      {
        id: 'int_varicose_ref_img',
        arabicQuestion: '',
        englishLabel: 'Varicose Veins Reference',
        type: 'image',
        section: 'vascular_assessment',
        imageUrl: 'https://my.clevelandclinic.org/-/scassets/images/org/health/articles/4722-varicose-veins-illustration',
      },
      {
        id: 'int_vascular_general',
        arabicQuestion: 'التقييم العام للأوعية الدموية (Vascular - General)',
        englishLabel: 'General',
        type: 'textarea',
        section: 'vascular_assessment',
        placeholder: 'التقييم العام...',
      },
      {
        id: 'int_vascular_local',
        arabicQuestion: 'التقييم الموضعي (Vascular - Local)',
        englishLabel: 'Local',
        type: 'textarea',
        section: 'vascular_assessment',
        placeholder: 'التقييم الموضعي...',
      },
      {
        id: 'int_vascular_special',
        arabicQuestion: 'اختبارات خاصة - شرياني / وريدي (Arterial/Venous Tests)',
        englishLabel: 'Special Tests (Arterial/Venous)',
        type: 'textarea',
        section: 'vascular_assessment',
        placeholder: 'الاختبارات...',
      },
    ],
  },

  // ───────── Section 21: Edema Assessment ─────────
  {
    id: 'edema_assessment',
    titleAr: 'تقييم التورم (الأوديما)',
    titleEn: 'Edema Assessment',
    fields: [
      {
        id: 'int_edema_ref_img',
        arabicQuestion: '',
        englishLabel: 'Pitting vs Non-Pitting Reference',
        type: 'image',
        section: 'edema_assessment',
        imageUrl: 'https://pbs.twimg.com/media/HChTEtCXQAA_TpG.jpg',
      },
      {
        id: 'int_edema_type',
        arabicQuestion: 'نوع التورم (Pitting / Non-Pitting)',
        englishLabel: 'Pitting / Non-Pitting',
        type: 'radio',
        section: 'edema_assessment',
        options: [
          { label: 'Pitting (بيعمل حفرة)', value: 'Pitting' },
          { label: 'Non-Pitting (مش بيعمل حفرة)', value: 'Non-Pitting' },
          { label: 'مفيش تورم', value: 'No edema' },
        ],
      },
      {
        id: 'int_circum_ref_img',
        arabicQuestion: '',
        englishLabel: 'Circumferential Measurements Reference',
        type: 'image',
        section: 'edema_assessment',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdh53rb6o1G-oc7tFSl2tz8m-qggxw9VKrJA&s',
      },
      {
        id: 'int_edema_measurements',
        arabicQuestion: 'القياسات الدائرية (Circumferential Measurements)',
        englishLabel: 'Round Measurements',
        type: 'text',
        section: 'edema_assessment',
        placeholder: 'القياسات...',
      },
    ],
  },

  // ───────── Section 22: Functional Balance ─────────
  {
    id: 'functional_balance',
    titleAr: 'تقييم التوازن الوظيفي',
    titleEn: 'Functional Balance Assessment',
    fields: [
      {
        id: 'int_frt_img',
        arabicQuestion: '',
        englishLabel: 'Functional Reach Test Reference',
        type: 'image',
        section: 'functional_balance',
        imageUrl: 'https://www.mdpi.com/electronics/electronics-09-01078/article_deploy/html/images/electronics-09-01078-g001.png',
      },
      {
        id: 'int_frt',
        arabicQuestion: 'اختبار الوصول الوظيفي (Functional Reach Test)',
        englishLabel: 'Functional Reach Test',
        type: 'text',
        section: 'functional_balance',
        placeholder: 'النتيجة...',
      },
      {
        id: 'int_tug_img',
        arabicQuestion: '',
        englishLabel: 'Timed Up & Go Reference',
        type: 'image',
        section: 'functional_balance',
        imageUrl: 'https://www.noraxon.com/wp-content/uploads/2025/04/462728024_1082093113925583_2368271954182941671_n.jpg',
      },
      {
        id: 'int_tug',
        arabicQuestion: 'اختبار القيام والمشي (Timed Up & Go)',
        englishLabel: 'Timed Up & Go Test',
        type: 'text',
        section: 'functional_balance',
        placeholder: 'الوقت...',
      },
      {
        id: 'int_berg_img',
        arabicQuestion: '',
        englishLabel: 'Berg Balance Scale Reference',
        type: 'image',
        section: 'functional_balance',
        imageUrl: 'https://orthofixar.com/wp-content/uploads/Berg-Balance-Scale.png',
      },
      {
        id: 'int_berg',
        arabicQuestion: 'مقياس بيرج للتوازن (Berg Balance Scale)',
        englishLabel: 'Berg Balance Scale',
        type: 'text',
        section: 'functional_balance',
        placeholder: 'الدرجة /56...',
      },
      {
        id: 'int_tinetti_img',
        arabicQuestion: '',
        englishLabel: 'Tinetti Balance Reference',
        type: 'image',
        section: 'functional_balance',
        imageUrl: 'https://img.yumpu.com/14666879/1/500x640/tinetti-balance-assessment-tool.jpg',
      },
      {
        id: 'int_tinetti',
        arabicQuestion: 'مقياس تينيتي للتوازن (Tinetti Balance)',
        englishLabel: 'Tinetti Balance Assessment',
        type: 'text',
        section: 'functional_balance',
        placeholder: 'الدرجة...',
      },
    ],
  },

  // ───────── Section 23: Other Special Tests ─────────
  {
    id: 'other_tests',
    titleAr: 'اختبارات خاصة أخرى',
    titleEn: 'Other Special Tests',
    fields: [
      {
        id: 'int_other_tests',
        arabicQuestion: 'أي اختبارات خاصة تانية',
        englishLabel: 'Other Special Tests',
        type: 'textarea',
        section: 'other_tests',
        placeholder: 'الاختبارات...',
      },
    ],
  },

  // ───────── Section 24: Gait Assessment ─────────
  {
    id: 'gait_assessment',
    titleAr: 'تقييم المشي',
    titleEn: 'Gait Assessment',
    fields: [
      {
        id: 'int_gait_ref_img',
        arabicQuestion: '',
        englishLabel: 'Gait Assessment Reference',
        type: 'image',
        section: 'gait_assessment',
        imageUrl: 'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41597-024-04327-4/MediaObjects/41597_2024_4327_Fig1_HTML.png',
      },
      {
        id: 'int_gait',
        arabicQuestion: 'المريض بيمشي إزاي؟ في أي مشاكل في المشي؟',
        englishLabel: 'Gait Assessment',
        type: 'textarea',
        section: 'gait_assessment',
        placeholder: 'وصف المشي...',
      },
    ],
  },

  // ───────── Section 25: Deformities ─────────
  {
    id: 'deformities',
    titleAr: 'التشوهات',
    titleEn: 'Deformities',
    fields: [
      {
        id: 'int_deformity_foot_img',
        arabicQuestion: '',
        englishLabel: 'Foot Deformities Reference',
        type: 'image',
        section: 'deformities',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0638/0204/8763/files/211-2_480x480.jpg?v=1670329926',
      },
      {
        id: 'int_deformity_hand_img',
        arabicQuestion: '',
        englishLabel: 'Hand Deformities Reference',
        type: 'image',
        section: 'deformities',
        imageUrl: 'https://www.advocatechildrenshospital.com/-/media/Project/Health-System-Enterprise/AdvocateChildrensHospitalCom/advocatechildrenshospital/images/services/orthopedics/conditions-we-treat/hand-deformities.webp?h=800&iar=0&w=1200&rev=09b507a85ed2446485b15bac458287b1&hash=19500C873B5387C45A3E4C0BBFFCAB3A',
      },
      {
        id: 'int_deformity_limb_img',
        arabicQuestion: '',
        englishLabel: 'Lower Limb Deformities Reference',
        type: 'image',
        section: 'deformities',
        imageUrl: 'https://ars.els-cdn.com/content/image/1-s2.0-S0895611109001359-gr1.jpg',
      },
      {
        id: 'int_deformities',
        arabicQuestion: 'في أي تشوهات في الجسم أو المفاصل؟',
        englishLabel: 'Deformities',
        type: 'textarea',
        section: 'deformities',
        placeholder: 'الوصف...',
      },
    ],
  },

  // ───────── Section 26: Nonmental Assessment ─────────
  {
    id: 'nonmental_assessment',
    titleAr: 'التقييم غير العقلي',
    titleEn: 'Nonmental Assessment',
    fields: [
      {
        id: 'int_nonmental',
        arabicQuestion: 'التقييم غير العقلي',
        englishLabel: 'Nonmental Assessment',
        type: 'textarea',
        section: 'nonmental_assessment',
        placeholder: 'التقييم...',
      },
    ],
  },

  // ───────── Section 27: Problem List ─────────
  {
    id: 'problem_list',
    titleAr: 'قائمة المشاكل والخطة المبدئية',
    titleEn: 'Problem List (with preliminary assessment and plan)',
    fields: [
      {
        id: 'int_problem_list',
        arabicQuestion: 'إيه المشاكل اللي لاقيناها والخطة المبدئية؟',
        englishLabel: 'Problem list (with preliminary assessment and plan)',
        type: 'textarea',
        section: 'problem_list',
        placeholder: 'اكتب المشاكل والخطة...',
      },
    ],
  },

  // ───────── Section 28: Precautions ─────────
  {
    id: 'precautions',
    titleAr: 'الاحتياطات',
    titleEn: 'Precautions',
    fields: [
      {
        id: 'int_precautions',
        arabicQuestion: 'في أي احتياطات لازم ناخد بالنا منها؟',
        englishLabel: 'Precautions',
        type: 'textarea',
        section: 'precautions',
        placeholder: 'الاحتياطات...',
      },
    ],
  },

  // ───────── Section 29: PT Management ─────────
  {
    id: 'pt_management',
    titleAr: 'خطة العلاج الطبيعي',
    titleEn: 'PT Management',
    fields: [
      {
        id: 'int_pt_management',
        arabicQuestion: 'خطة العلاج الطبيعي',
        englishLabel: 'PT management',
        type: 'textarea',
        section: 'pt_management',
        placeholder: 'اكتب الخطة العلاجية...',
      },
    ],
  },

  // ───────── Section 30: Home/Ward Instructions ─────────
  {
    id: 'home_instructions',
    titleAr: 'تعليمات المنزل / القسم',
    titleEn: 'Home/Ward Instructions',
    fields: [
      {
        id: 'int_home_instructions',
        arabicQuestion: 'تعليمات للمريض في البيت أو القسم',
        englishLabel: 'Home/ward instructions',
        type: 'textarea',
        section: 'home_instructions',
        placeholder: 'التعليمات...',
      },
    ],
  },

  // ───────── Section 31: PT Signature ─────────
  {
    id: 'pt_signature',
    titleAr: 'اسم المعالج والتوقيع',
    titleEn: 'PT & Signature',
    fields: [
      {
        id: 'int_pt_name',
        arabicQuestion: 'اسم أخصائي العلاج الطبيعي',
        englishLabel: 'PT',
        type: 'text',
        section: 'pt_signature',
        placeholder: 'اسم المعالج...',
      },
    ],
  },
];

// Default data for tables
export const defaultADLRows = [
  { activity: 'Bathing', activityAr: 'الاستحمام', value: '' as const },
  { activity: 'Dressing', activityAr: 'ارتداء الملابس', value: '' as const },
  { activity: 'Toileting', activityAr: 'استخدام الحمام', value: '' as const },
  { activity: 'Transferring', activityAr: 'الانتقال (من السرير للكرسي)', value: '' as const },
  { activity: 'Bowel', activityAr: 'التحكم في البراز', value: '' as const },
  { activity: 'Bladder', activityAr: 'التحكم في البول', value: '' as const },
  { activity: 'Feeding', activityAr: 'الأكل', value: '' as const },
];

export const defaultIADLRows = [
  { activity: 'Uses telephone', activityAr: 'استخدام التليفون', value: '' as const },
  { activity: 'Shopping', activityAr: 'التسوق', value: '' as const },
  { activity: 'Prepare meals', activityAr: 'تحضير الأكل', value: '' as const },
  { activity: 'Housework', activityAr: 'أعمال المنزل', value: '' as const },
  { activity: 'Laundry', activityAr: 'الغسيل', value: '' as const },
  { activity: 'Takes own medicine', activityAr: 'أخذ الأدوية بنفسه', value: '' as const },
  { activity: 'Personal finances', activityAr: 'إدارة الفلوس', value: '' as const },
];

export const defaultMemoryRows = [
  { item: 'Forgetfulness (in general)', itemAr: 'النسيان بشكل عام', present: false, comments: '' },
  { item: 'Remembering names', itemAr: 'تذكّر الأسماء', present: false, comments: '' },
  { item: 'Remembering messages', itemAr: 'تذكّر الرسائل', present: false, comments: '' },
  { item: 'Remembering the date', itemAr: 'تذكّر التاريخ', present: false, comments: '' },
  { item: 'Job performance', itemAr: 'أداء العمل', present: false, comments: '' },
  { item: 'Driving', itemAr: 'القيادة', present: false, comments: '' },
  { item: 'Speech', itemAr: 'الكلام', present: false, comments: '' },
  { item: 'Home safety', itemAr: 'السلامة في البيت', present: false, comments: '' },
  { item: 'Social withdrawal', itemAr: 'الانطواء الاجتماعي', present: false, comments: '' },
  { item: 'Getting lost', itemAr: 'التوهان', present: false, comments: '' },
  { item: 'Personality changes', itemAr: 'تغييرات في الشخصية', present: false, comments: '' },
];

export const defaultBehavioralRows = [
  { item: 'Behavior problems (in general)', itemAr: 'مشاكل سلوكية بشكل عام', present: false, comments: '' },
  { item: 'Psychomotor', itemAr: 'نفسي حركي', present: false, comments: '' },
  { item: 'Anxious', itemAr: 'قلق', present: false, comments: '' },
  { item: 'Agitated', itemAr: 'هياج', present: false, comments: '' },
  { item: 'Irritable', itemAr: 'عصبية / انفعال', present: false, comments: '' },
  { item: 'Aggressive', itemAr: 'عدوانية', present: false, comments: '' },
  { item: 'Stereotyped vocalization/screaming', itemAr: 'أصوات متكررة / صراخ', present: false, comments: '' },
  { item: 'Tearful', itemAr: 'بكاء', present: false, comments: '' },
  { item: 'Impulsive', itemAr: 'اندفاعي', present: false, comments: '' },
  { item: 'Restless', itemAr: 'عدم الراحة', present: false, comments: '' },
  { item: 'Suspicious', itemAr: 'شكاك', present: false, comments: '' },
  { item: 'Resistance to care', itemAr: 'رفض الرعاية', present: false, comments: '' },
  { item: 'Wandering', itemAr: 'التجول', present: false, comments: '' },
  { item: 'Hallucinations', itemAr: 'هلاوس', present: false, comments: '' },
];

export const defaultFamilyHistoryRows = [
  { disease: 'Dementia', diseaseAr: 'الخرف (الزهايمر)', familyMember: '', ageOfOnset: '' },
  { disease: 'CAD', diseaseAr: 'أمراض الشرايين التاجية', familyMember: '', ageOfOnset: '' },
  { disease: 'HTN', diseaseAr: 'الضغط العالي', familyMember: '', ageOfOnset: '' },
  { disease: 'CVA', diseaseAr: 'جلطة المخ', familyMember: '', ageOfOnset: '' },
  { disease: 'DM', diseaseAr: 'السكر', familyMember: '', ageOfOnset: '' },
  { disease: 'Osteoporosis', diseaseAr: 'هشاشة العظام', familyMember: '', ageOfOnset: '' },
  { disease: 'Cancer', diseaseAr: 'السرطان', familyMember: '', ageOfOnset: '' },
  { disease: 'Depression', diseaseAr: 'الاكتئاب', familyMember: '', ageOfOnset: '' },
  { disease: 'Psychiatric illness', diseaseAr: 'أمراض نفسية', familyMember: '', ageOfOnset: '' },
  { disease: 'Others (of note)', diseaseAr: 'أخرى', familyMember: '', ageOfOnset: '' },
];

export const defaultArteryRows = [
  { artery: 'Carotid', arteryAr: 'الشريان السباتي', rt: '', lt: '' },
  { artery: 'Radial', arteryAr: 'الشريان الكعبري', rt: '', lt: '' },
  { artery: 'Dorsalis pedis', arteryAr: 'شريان ظهر القدم', rt: '', lt: '' },
];
