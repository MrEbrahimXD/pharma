import { Link, useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/formStore';
import { useCasesStore, type SavedCase } from '../store/casesStore';
import { cardioSections } from '../data/cardioFields';
import {
  defaultADLRows,
  defaultIADLRows,
  defaultMemoryRows,
  defaultBehavioralRows,
  defaultFamilyHistoryRows,
  defaultArteryRows,
} from '../data/internalFields';
import { exportCardioPDF } from '../pdf/generatePDF';
import SectionRenderer from '../components/layout/SectionRenderer';
import WizardNav from '../components/layout/WizardNav';
import { useExitBlocker, ExitBlockerDialog } from '../hooks/useExitBlocker';

export default function CardioCase() {
  const { cardio, setCardioField, settings, cardioStep, setCardioStep, clearCardio } = useFormStore();
  const { saveCase, updateCase } = useCasesStore();
  const { blocked, confirmExit, cancelExit } = useExitBlocker();
  const navigate = useNavigate();
  const sections = cardioSections;
  const isLastStep = cardioStep === sections.length - 1;

  const handleExport = () => exportCardioPDF(cardio);

  const handleSave = () => {
    exportCardioPDF(cardio);
    const editingId = sessionStorage.getItem('editing-case-id');
    const patientName = (cardio.patient_name as string) || '';
    const caseData: SavedCase = {
      id: editingId || crypto.randomUUID(),
      type: 'cardio',
      patientName,
      savedAt: Date.now(),
      cardio: { ...cardio },
      internal: {},
      adlRows: structuredClone(defaultADLRows),
      iadlRows: structuredClone(defaultIADLRows),
      memoryRows: structuredClone(defaultMemoryRows),
      behavioralRows: structuredClone(defaultBehavioralRows),
      familyHistoryRows: structuredClone(defaultFamilyHistoryRows),
      arteryRows: structuredClone(defaultArteryRows),
    };
    if (editingId) {
      updateCase(caseData);
      sessionStorage.removeItem('editing-case-id');
    } else {
      saveCase(caseData);
    }
    clearCardio();
    navigate('/cases');
  };

  const exportButton = (
    <div className="px-4 py-6">
      <button
        onClick={handleExport}
        className="w-full py-4 rounded-2xl bg-blue-700 text-white font-bold text-lg shadow-lg hover:bg-blue-800 active:scale-[0.97] transition flex items-center justify-center gap-3"
      >
        <span className="text-2xl">📄</span>
        تحميل ملف PDF — القلب
      </button>
      <button
        onClick={handleSave}
        className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-lg shadow-lg hover:bg-emerald-700 active:scale-[0.97] transition flex items-center justify-center gap-3 mt-3"
      >
        <span className="text-2xl">✅</span>
        انتهى وحفظ
      </button>
      <Link to="/" className="block text-center text-sm text-blue-600 mt-3 hover:underline">
        ← الرجوع للصفحة الرئيسية
      </Link>
    </div>
  );

  const exitDialog = <ExitBlockerDialog blocked={blocked} onConfirm={confirmExit} onCancel={cancelExit} />;

  if (settings.viewMode === 'wizard') {
    const currentSection = sections[cardioStep];
    return (
      <div className="flex flex-col min-h-full">
        {exitDialog}
        {/* Header */}
        <div className="sticky top-0 z-10 bg-bg px-4 pt-3 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => navigate('/')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold active:scale-95 transition">
              <span>✕</span>
              <span>خروج</span>
            </button>
            <span className="text-xs font-bold text-red-600">❤️ القلب</span>
            <span className="flex-1" />
            <span className="text-xs text-text-light">
              {cardioStep + 1} / {sections.length}
            </span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-primary">
              {currentSection.titleAr}
            </span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((cardioStep + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Section content */}
        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          <SectionRenderer
            section={currentSection}
            data={cardio}
            onFieldChange={setCardioField}
          />
          {renderSpecialFields(currentSection.id)}
          {isLastStep && exportButton}
        </div>

        {/* Navigation */}
        <WizardNav
          step={cardioStep}
          totalSteps={sections.length}
          onPrev={() => setCardioStep(Math.max(0, cardioStep - 1))}
          onNext={() => setCardioStep(Math.min(sections.length - 1, cardioStep + 1))}
        />
      </div>
    );
  }

  // Scrollable mode
  return (
    <div className="pb-8">
      {exitDialog}
      <div className="sticky top-0 z-10 bg-bg px-4 py-3 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold active:scale-95 transition">
          <span>✕</span>
          <span>خروج</span>
        </button>
        <span className="text-sm font-bold text-red-600">❤️ حالة القلب</span>
      </div>
      <div className="px-4">
      {sections.map((section) => (
        <div key={section.id} id={`cardio-${section.id}`}>
          <SectionRenderer
            section={section}
            data={cardio}
            onFieldChange={setCardioField}
          />
        </div>
      ))}
      {exportButton}
      </div>
    </div>
  );
}

// No special table fields for cardio
function renderSpecialFields(_sectionId: string) {
  return null;
}
