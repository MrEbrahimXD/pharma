import { Link } from 'react-router-dom';
import { useFormStore } from '../store/formStore';
import { useCasesStore } from '../store/casesStore';

export default function Home() {
  const store = useFormStore();

  const cardioFilled = Object.keys(store.cardio).length;
  const internalFilled = Object.keys(store.internal).length;
  const savedCasesCount = useCasesStore((s) => s.cases.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-lg mx-auto px-4 py-5 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-800">🏥 Hospital Cases</h1>
          <Link
            to="/settings"
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            aria-label="Settings"
          >
            ⚙️
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Case Cards */}
        <Link
          to="/cardio"
          className="block bg-white rounded-2xl shadow-md border border-blue-100 p-5 hover:shadow-lg transition active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center text-3xl">
              ❤️
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-lg font-bold text-gray-900">حالة القلب</h2>
              <p className="text-sm text-gray-500">Cardiovascular Case</p>
              {cardioFilled > 0 && (
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                  {cardioFilled} إجابة محفوظة
                </span>
              )}
            </div>
          </div>
        </Link>

        <Link
          to="/internal"
          className="block bg-white rounded-2xl shadow-md border border-green-100 p-5 hover:shadow-lg transition active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center text-3xl">
              🩺
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-lg font-bold text-gray-900">حالة الباطنة</h2>
              <p className="text-sm text-gray-500">Internal Medicine & Geriatric</p>
              {internalFilled > 0 && (
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  {internalFilled} إجابة محفوظة
                </span>
              )}
            </div>
          </div>
        </Link>

        <Link
          to="/both"
          className="block bg-white rounded-2xl shadow-md border border-purple-100 p-5 hover:shadow-lg transition active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center text-3xl">
              📋
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-lg font-bold text-gray-900">الاتنين مع بعض</h2>
              <p className="text-sm text-gray-500">Cardio + Internal (Same Patient)</p>
              {(cardioFilled > 0 || internalFilled > 0) && (
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                  {cardioFilled + internalFilled} إجابة محفوظة
                </span>
              )}
            </div>
          </div>
        </Link>

        {/* Saved Cases */}
        <Link
          to="/cases"
          className="block bg-white rounded-2xl shadow-md border border-amber-100 p-5 hover:shadow-lg transition active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center text-3xl">
              📂
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-lg font-bold text-gray-900">الحالات المحفوظة</h2>
              <p className="text-sm text-gray-500">Saved Cases</p>
              {savedCasesCount > 0 && (
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                  {savedCasesCount} حالة
                </span>
              )}
            </div>
          </div>
        </Link>
      </main>

      {/* Footer */}
      <footer className="max-w-lg mx-auto px-4 py-6 text-center">
        <p className="text-xs text-gray-400 leading-relaxed">
          Made by <span className="font-medium text-gray-500">Dr. Legion</span>
          <br />
          This app is not affiliated with SGU University.
        </p>
      </footer>
    </div>
  );
}
