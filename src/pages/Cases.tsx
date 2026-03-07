import { Link, useNavigate } from 'react-router-dom';
import { useCasesStore, type CaseType } from '../store/casesStore';
import { useFormStore } from '../store/formStore';
import { useState } from 'react';

const typeLabel: Record<CaseType, { ar: string; icon: string; color: string }> = {
  cardio: { ar: 'القلب', icon: '❤️', color: 'red' },
  internal: { ar: 'الباطنة', icon: '🩺', color: 'green' },
  both: { ar: 'القلب والباطنة', icon: '📋', color: 'purple' },
};

export default function Cases() {
  const { cases, deleteCase } = useCasesStore();
  const store = useFormStore();
  const navigate = useNavigate();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const loadCase = (c: typeof cases[0]) => {
    // Load case data into the form store
    store.clearAll();

    // Set cardio fields
    Object.entries(c.cardio).forEach(([k, v]) => store.setCardioField(k, v));
    // Set internal fields
    Object.entries(c.internal).forEach(([k, v]) => store.setInternalField(k, v));
    // Set table rows
    c.adlRows.forEach((r, i) => store.setADLRow(i, r.value));
    c.iadlRows.forEach((r, i) => store.setIADLRow(i, r.value));
    c.memoryRows.forEach((r, i) => {
      store.setMemoryRow(i, 'present', r.present);
      store.setMemoryRow(i, 'comments', r.comments);
    });
    c.behavioralRows.forEach((r, i) => {
      store.setBehavioralRow(i, 'present', r.present);
      store.setBehavioralRow(i, 'comments', r.comments);
    });
    c.familyHistoryRows.forEach((r, i) => {
      store.setFamilyHistoryRow(i, 'familyMember', r.familyMember);
      store.setFamilyHistoryRow(i, 'ageOfOnset', r.ageOfOnset);
    });
    c.arteryRows.forEach((r, i) => {
      store.setArteryRow(i, 'rt', r.rt);
      store.setArteryRow(i, 'lt', r.lt);
    });

    // Store the editing case id
    sessionStorage.setItem('editing-case-id', c.id);

    // Navigate to the appropriate case page
    const route = c.type === 'cardio' ? '/cardio' : c.type === 'internal' ? '/internal' : '/both';
    navigate(route);
  };

  const handleDelete = (id: string) => {
    deleteCase(id);
    setConfirmId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-lg mx-auto px-4 py-5 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-800">📂 الحالات المحفوظة</h1>
          <Link
            to="/"
            className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold"
          >
            🏠 الرئيسية
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {cases.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-lg font-medium">مفيش حالات محفوظة لسه</p>
            <p className="text-sm mt-1">لما تخلّص حالة هتلاقيها هنا</p>
          </div>
        ) : (
          cases.map((c) => {
            const info = typeLabel[c.type];
            const date = new Date(c.savedAt);
            const dateStr = date.toLocaleDateString('ar-EG', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={c.id}
                className={`bg-white rounded-2xl shadow-md border border-${info.color}-100 p-4`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-${info.color}-50 flex items-center justify-center text-2xl flex-shrink-0`}
                  >
                    {info.icon}
                  </div>
                  <div className="flex-1 text-right min-w-0">
                    <h3 className="text-base font-bold text-gray-900 truncate">
                      {c.patientName || 'بدون اسم'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {info.ar} • {dateStr}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => loadCase(c)}
                    className={`flex-1 py-2 rounded-xl bg-${info.color}-500 text-white text-sm font-bold active:scale-95 transition`}
                  >
                    ✏️ تعديل
                  </button>
                  {confirmId === c.id ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="px-3 py-2 rounded-xl bg-red-600 text-white text-sm font-bold active:scale-95 transition"
                      >
                        أكيد
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="px-3 py-2 rounded-xl bg-gray-200 text-gray-700 text-sm font-bold active:scale-95 transition"
                      >
                        لأ
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(c.id)}
                      className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold active:scale-95 transition"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}
