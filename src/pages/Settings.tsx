import { Link } from 'react-router-dom';
import { useFormStore } from '../store/formStore';
import type { ViewMode } from '../store/formStore';
import { useState } from 'react';

export default function Settings() {
  const { settings, setViewMode, setHideImages, clearAll, clearCardio, clearInternal } = useFormStore();
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const handleClear = () => {
    if (showConfirm === 'all') clearAll();
    else if (showConfirm === 'cardio') clearCardio();
    else if (showConfirm === 'internal') clearInternal();
    setShowConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/" className="text-blue-700 text-lg font-bold">→</Link>
          <h1 className="text-lg font-bold text-gray-900">⚙️ الإعدادات</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* View Mode */}
        <section className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
          <h2 className="font-bold text-gray-900">طريقة العرض</h2>
          <p className="text-sm text-gray-500">Display Mode</p>
          <div className="flex gap-3">
            {(['wizard', 'scroll'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex-1 py-3 rounded-xl font-medium text-sm transition ${
                  settings.viewMode === mode
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {mode === 'wizard' ? '📋 سؤال سؤال' : '📜 الكل مرة واحدة'}
                <br />
                <span className="text-xs opacity-70">
                  {mode === 'wizard' ? 'Wizard' : 'Scrollable'}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Image Display */}
        <section className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
          <h2 className="font-bold text-gray-900">عرض الصور</h2>
          <p className="text-sm text-gray-500">Reference Images</p>
          <button
            onClick={() => setHideImages(!settings.hideImages)}
            className={`w-full flex items-center justify-between py-3 px-4 rounded-xl font-medium text-sm transition ${
              settings.hideImages
                ? 'bg-blue-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{settings.hideImages ? '🖼️ الصور مخفية (زرار للعرض)' : '🖼️ الصور ظاهرة تلقائيًا'}</span>
            <span className="text-xs opacity-70">{settings.hideImages ? 'Collapsed' : 'Auto-show'}</span>
          </button>
        </section>

        {/* Clear Data */}
        <section className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
          <h2 className="font-bold text-gray-900">مسح البيانات</h2>
          <p className="text-sm text-gray-500">Clear saved data</p>
          <div className="space-y-2">
            <button
              onClick={() => setShowConfirm('cardio')}
              className="w-full py-3 rounded-xl bg-red-50 text-red-700 font-medium text-sm hover:bg-red-100 transition"
            >
              🗑️ مسح بيانات القلب
            </button>
            <button
              onClick={() => setShowConfirm('internal')}
              className="w-full py-3 rounded-xl bg-red-50 text-red-700 font-medium text-sm hover:bg-red-100 transition"
            >
              🗑️ مسح بيانات الباطنة
            </button>
            <button
              onClick={() => setShowConfirm('all')}
              className="w-full py-3 rounded-xl bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition"
            >
              🗑️ مسح كل البيانات
            </button>
          </div>
        </section>
      </main>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 text-center">⚠️ تأكيد المسح</h3>
            <p className="text-sm text-gray-600 text-center">
              {showConfirm === 'all'
                ? 'هل متأكد إنك عايز تمسح كل البيانات؟'
                : showConfirm === 'cardio'
                  ? 'هل متأكد إنك عايز تمسح بيانات القلب؟'
                  : 'هل متأكد إنك عايز تمسح بيانات الباطنة؟'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
              >
                لا، رجّعني
              </button>
              <button
                onClick={handleClear}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
              >
                أيوا، امسح
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
