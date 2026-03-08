import { Link, useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/formStore';
import { useCasesStore, type SavedCase } from '../store/casesStore';
import { internalSections } from '../data/internalFields';
import { exportInternalPDF } from '../pdf/generatePDF';
import SectionRenderer from '../components/layout/SectionRenderer';
import WizardNav from '../components/layout/WizardNav';
import { useExitBlocker, ExitBlockerDialog } from '../hooks/useExitBlocker';
import {
  AssessmentTable,
  MemoryBehaviorTable,
  FamilyHistoryTable,
  ArteryTable,
  QuestionCard,
} from '../components/form';

export default function InternalCase() {
  const {
    internal, setInternalField, settings, internalStep, setInternalStep,
    adlRows, setADLRow, iadlRows, setIADLRow,
    memoryRows, setMemoryRow, behavioralRows, setBehavioralRow,
    familyHistoryRows, setFamilyHistoryRow, arteryRows, setArteryRow,
  } = useFormStore();

  const sections = internalSections;
  const isLastStep = internalStep === sections.length - 1;
  const { blocked, confirmExit, cancelExit } = useExitBlocker();
  const navigate = useNavigate();
  const { saveCase, updateCase } = useCasesStore();

  const handleExport = () => {
    exportInternalPDF(internal, {
      adlRows, iadlRows, memoryRows, behavioralRows, familyHistoryRows, arteryRows,
    });
  };

  const handleSave = () => {
    exportInternalPDF(internal, {
      adlRows, iadlRows, memoryRows, behavioralRows, familyHistoryRows, arteryRows,
    });
    const editingId = sessionStorage.getItem('editing-case-id');
    const patientName = (internal.int_name as string) || '';
    const caseData: SavedCase = {
      id: editingId || crypto.randomUUID(),
      type: 'internal',
      patientName,
      savedAt: Date.now(),
      cardio: {},
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
    useFormStore.getState().clearInternal();
    navigate('/cases');
  };

  const exportButton = (
    <div className="px-4 py-6">
      <button
        onClick={handleExport}
        className="w-full py-4 rounded-2xl bg-green-600 text-white font-bold text-lg shadow-lg hover:bg-green-700 active:scale-[0.97] transition flex items-center justify-center gap-3"
      >
        <span className="text-2xl">📄</span>
        تحميل ملف PDF — الباطنة
      </button>
      <button
        onClick={handleSave}
        className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-lg shadow-lg hover:bg-emerald-700 active:scale-[0.97] transition flex items-center justify-center gap-3 mt-3"
      >
        <span className="text-2xl">✅</span>
        انتهى وحفظ
      </button>
      <Link to="/" className="block text-center text-sm text-green-600 mt-3 hover:underline">
        ← الرجوع للصفحة الرئيسية
      </Link>
    </div>
  );

  const renderSpecialFields = (sectionId: string) => {
    switch (sectionId) {
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

  const exitDialog = <ExitBlockerDialog blocked={blocked} onConfirm={confirmExit} onCancel={cancelExit} />;

  if (settings.viewMode === 'wizard') {
    const currentSection = sections[internalStep];
    return (
      <div className="flex flex-col min-h-full">
        {exitDialog}
        <div className="sticky top-0 z-10 bg-bg px-4 pt-3 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => navigate('/')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold active:scale-95 transition">
              <span>✕</span>
              <span>خروج</span>
            </button>
            <span className="text-xs font-bold text-green-600">🩺 الباطنة</span>
            <span className="flex-1" />
            <span className="text-xs text-text-light">
              {internalStep + 1} / {sections.length}
            </span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-primary">
              {currentSection.titleAr}
            </span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-300"
              style={{ width: `${((internalStep + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          <SectionRenderer
            section={currentSection}
            data={internal}
            onFieldChange={setInternalField}
          />
          {renderSpecialFields(currentSection.id)}
        </div>

        {isLastStep && exportButton}

        <WizardNav
          step={internalStep}
          totalSteps={sections.length}
          onPrev={() => setInternalStep(Math.max(0, internalStep - 1))}
          onNext={() => setInternalStep(Math.min(sections.length - 1, internalStep + 1))}
        />
      </div>
    );
  }

  return (
    <div className="pb-8">
      {exitDialog}
      <div className="sticky top-0 z-10 bg-bg px-4 py-3 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold active:scale-95 transition">
          <span>✕</span>
          <span>خروج</span>
        </button>
        <span className="text-sm font-bold text-green-600">🩺 حالة الباطنة</span>
      </div>
      <div className="px-4">
      {sections.map((section) => (
        <div key={section.id} id={`internal-${section.id}`}>
          <SectionRenderer
            section={section}
            data={internal}
            onFieldChange={setInternalField}
          />
          {renderSpecialFields(section.id)}
        </div>
      ))}
      {exportButton}
      </div>
    </div>
  );
}
