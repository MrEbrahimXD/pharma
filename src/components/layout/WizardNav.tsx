interface Props {
  step: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function WizardNav({ step, totalSteps, onPrev, onNext }: Props) {
  const handlePrev = () => { onPrev(); window.scrollTo({ top: 0 }); };
  const handleNext = () => { onNext(); window.scrollTo({ top: 0 }); };

  return (
    <div className="sticky bottom-0 bg-card border-t border-border px-4 py-3 flex items-center justify-between gap-3 z-10">
      <button
        type="button"
        onClick={handlePrev}
        disabled={step === 0}
        className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all
          ${step === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-text hover:bg-gray-300 active:scale-95'}`}
      >
        السابق →
      </button>
      <button
        type="button"
        onClick={handleNext}
        disabled={step === totalSteps - 1}
        className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all
          ${step === totalSteps - 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary-dark active:scale-95 shadow-md'}`}
      >
        ← التالي
      </button>
    </div>
  );
}
