import { Link, useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/formStore';
import { useCasesStore, type SavedCase } from '../store/casesStore';
import { mergedSections, sharedFieldMirror, type MergedSection, type FieldRef } from '../data/bothFields';
import { generateCombinedPDF } from '../pdf/generatePDF';
import WizardNav from '../components/layout/WizardNav';
import { useExitBlocker, ExitBlockerDialog } from '../hooks/useExitBlocker';
import {
  AssessmentTable,
  MemoryBehaviorTable,
  FamilyHistoryTable,
  ArteryTable,
  QuestionCard,
  FieldRenderer,
} from '../components/form';

export default function BothCase() {
  const {
    cardio, setCardioField, internal, setInternalField,
    settings, bothStep, setBothStep,
    adlRows, setADLRow, iadlRows, setIADLRow,
    memoryRows, setMemoryRow, behavioralRows, setBehavioralRow,
    familyHistoryRows, setFamilyHistoryRow, arteryRows, setArteryRow,
  } = useFormStore();

  const totalSteps = mergedSections.length;
  const isLastStep = bothStep === totalSteps - 1;
  const { blocked, confirmExit, cancelExit } = useExitBlocker();
  const navigate = useNavigate();
  const { saveCase, updateCase } = useCasesStore();

  const getValue = (ref: FieldRef) =>
    ref.source === 'cardio' ? cardio[ref.field.id] : internal[ref.field.id];

  const setValue = (ref: FieldRef, value: unknown) => {
    const setter = ref.source === 'cardio' ? setCardioField : setInternalField;
    setter(ref.field.id, value);
    const mirror = sharedFieldMirror[ref.field.id];
    if (mirror) {
      const mirrorSetter = mirror.store === 'cardio' ? setCardioField : setInternalField;
      mirrorSetter(mirror.fieldId, value);
    }
  };

  const handleExport = () => {
    generateCombinedPDF(cardio, internal, {
      adlRows, iadlRows, memoryRows, behavioralRows, familyHistoryRows, arteryRows,
    });
  };

  const handleSave = () => {
    generateCombinedPDF(cardio, internal, {
      adlRows, iadlRows, memoryRows, behavioralRows, familyHistoryRows, arteryRows,
    });
    const editingId = sessionStorage.getItem('editing-case-id');
    const patientName = (cardio.patient_name as string) || (internal.int_name as string) || '';
    const caseData: SavedCase = {
      id: editingId || crypto.randomUUID(),
      type: 'both',
      patientName,
      savedAt: Date.now(),
      cardio: { ...cardio },
      internal: { ...internal },
      adlRows: structuredClone(adlRows),
      iadlRows: structuredClone(iadlRows),
      memoryRows: structuredClone(memoryRows),
      behavioralRows: structuredClone(behavioralRows),
      familyHistoryRows: structuredClone(familyHistoryRows),
      arteryRows: structuredClone(arteryRows),
    };
    if (editingId) {
      updateCase(caseData);
      sessionStorage.removeItem('editing-case-id');
    } else {
      saveCase(caseData);
    }
    useFormStore.getState().clearCardio();
    useFormStore.getState().clearInternal();
    navigate('/cases');
  };

  const exportButton = (
    <div className="px-4 py-6">
      <button
        onClick={handleExport}
        className="w-full py-4 rounded-2xl bg-purple-600 text-white font-bold text-lg shadow-lg hover:bg-purple-700 active:scale-[0.97] transition flex items-center justify-center gap-3"
      >
        <span className="text-2xl">📄</span>
        تحميل ملف PDF — القلب والباطنة
      </button>
      <button
        onClick={handleSave}
        className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-lg shadow-lg hover:bg-emerald-700 active:scale-[0.97] transition flex items-center justify-center gap-3 mt-3"
      >
        <span className="text-2xl">✅</span>
        انتهى وحفظ
      </button>
      <Link to="/" className="block text-center text-sm text-purple-600 mt-3 hover:underline">
        ← الرجوع للصفحة الرئيسية
      </Link>
    </div>
  );

  const renderSpecial = (specialType: string) => {
    switch (specialType) {
      case 'adl_assessment':
        return (
          <QuestionCard question="هنسألك عن الأنشطة اليومية — بتعملها لوحدك ولا محتاج مساعدة؟">
            <AssessmentTable rows={adlRows} onRowChange={setADLRow} title="ADL" />
          </QuestionCard>
        );
      case 'iadl_assessment':
        return (
          <QuestionCard question="وبالنسبة للأنشطة دي — بتعملها لوحدك ولا محتاج مساعدة؟">
            <AssessmentTable rows={iadlRows} onRowChange={setIADLRow} title="IADL" />
          </QuestionCard>
        );
      case 'memory_assessment':
        return (
          <QuestionCard question="هنسألك شوية أسئلة عن الذاكرة">
            <MemoryBehaviorTable
              rows={memoryRows}
              onToggle={(i) => setMemoryRow(i, 'present', !memoryRows[i].present)}
              onComment={(i, v) => setMemoryRow(i, 'comments', v)}
              title="تقييم الذاكرة (Memory Assessment)"
            />
          </QuestionCard>
        );
      case 'behavioral_assessment':
        return (
          <QuestionCard question="هنسألك عن بعض السلوكيات">
            <MemoryBehaviorTable
              rows={behavioralRows}
              onToggle={(i) => setBehavioralRow(i, 'present', !behavioralRows[i].present)}
              onComment={(i, v) => setBehavioralRow(i, 'comments', v)}
              title="تقييم السلوك (Behavioral Assessment)"
            />
          </QuestionCard>
        );
      case 'family_history':
        return (
          <QuestionCard question="في حد في العائلة عنده أي أمراض من دول؟">
            <FamilyHistoryTable
              rows={familyHistoryRows}
              onMemberChange={(i, v) => setFamilyHistoryRow(i, 'familyMember', v)}
              onAgeChange={(i, v) => setFamilyHistoryRow(i, 'ageOfOnset', v)}
            />
          </QuestionCard>
        );
      case 'artery_assessment':
        return (
          <QuestionCard question="تقييم النبض في الشرايين المختلفة">
            <ArteryTable rows={arteryRows} onCellChange={setArteryRow} />
          </QuestionCard>
        );
      default:
        return null;
    }
  };

  const renderSectionContent = (section: MergedSection) => (
    <>
      {section.fields.map((ref) => (
        <FieldRenderer
          key={ref.field.id}
          field={ref.field}
          value={getValue(ref)}
          onChange={(val) => setValue(ref, val)}
        />
      ))}
      {section.specialType && renderSpecial(section.specialType)}
    </>
  );

  const exitDialog = <ExitBlockerDialog blocked={blocked} onConfirm={confirmExit} onCancel={cancelExit} />;

  if (settings.viewMode === 'wizard') {
    const current = mergedSections[bothStep];
    return (
      <div className="flex flex-col min-h-full">
        {exitDialog}
        <div className="sticky top-0 z-10 bg-bg px-4 pt-3 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => navigate('/')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 text-xs font-bold active:scale-95 transition">
              <span>✕</span>
              <span>خروج</span>
            </button>
            <span className="text-xs font-bold text-purple-600">📋 الاتنين</span>
            <span className="flex-1" />
            <span className="text-xs text-text-light">
              {bothStep + 1} / {totalSteps}
            </span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-primary">{current.titleAr}</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${((bothStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-purple-500 rounded-full" />
              <div>
                <h2 className="text-lg font-bold text-text">{current.titleAr}</h2>
                <p className="text-xs text-text-light">{current.titleEn}</p>
              </div>
            </div>
            {renderSectionContent(current)}
          </div>
          {isLastStep && exportButton}
        </div>

        <WizardNav
          step={bothStep}
          totalSteps={totalSteps}
          onPrev={() => setBothStep(Math.max(0, bothStep - 1))}
          onNext={() => setBothStep(Math.min(totalSteps - 1, bothStep + 1))}
        />
      </div>
    );
  }

  return (
    <div className="pb-8">
      {exitDialog}
      <div className="sticky top-0 z-10 bg-bg px-4 py-3 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 text-xs font-bold active:scale-95 transition">
          <span>✕</span>
          <span>خروج</span>
        </button>
        <span className="text-sm font-bold text-purple-600">📋 القلب والباطنة</span>
      </div>
      <div className="px-4">
        {mergedSections.map((section) => (
          <div key={section.id} className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-purple-500 rounded-full" />
              <div>
                <h2 className="text-lg font-bold text-text">{section.titleAr}</h2>
                <p className="text-xs text-text-light">{section.titleEn}</p>
              </div>
            </div>
            {renderSectionContent(section)}
          </div>
        ))}
        {exportButton}
      </div>
    </div>
  );
}
