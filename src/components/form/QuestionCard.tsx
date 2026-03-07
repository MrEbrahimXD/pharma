interface Props {
  question: string;
  children: React.ReactNode;
  required?: boolean;
}

export default function QuestionCard({ question, children, required }: Props) {
  // Split trailing (English hint) from the Arabic question text
  const match = question.match(/^(.*?)(\s*\([A-Za-z\s/&.\-']+\))$/);
  const mainText = match ? match[1] : question;
  const hint = match ? match[2] : null;

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 mb-4">
      <label className="block text-base font-semibold text-text mb-3 leading-relaxed">
        {mainText}
        {required && <span className="text-danger mr-1">*</span>}
        {hint && (
          <span className="text-xs font-normal text-gray-400 mr-1">{hint}</span>
        )}
      </label>
      {children}
    </div>
  );
}
