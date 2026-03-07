import { useEffect, useCallback } from 'react';
import { useBlocker } from 'react-router-dom';

/**
 * Blocks navigation away from the current page with a confirmation dialog.
 * Also blocks browser tab close / refresh.
 */
export function useExitBlocker() {
  const blocker = useBlocker(true);

  // Block browser close / refresh
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  const confirmExit = useCallback(() => {
    blocker.proceed?.();
  }, [blocker]);

  const cancelExit = useCallback(() => {
    blocker.reset?.();
  }, [blocker]);

  return { blocked: blocker.state === 'blocked', confirmExit, cancelExit };
}

export function ExitBlockerDialog({
  blocked,
  onConfirm,
  onCancel,
}: {
  blocked: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!blocked) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-6 mx-4 max-w-sm w-full text-center">
        <p className="text-lg font-bold text-text mb-2">متأكد إنك عايز تخرج؟</p>
        <p className="text-sm text-text-light mb-5">
          الإجابات محفوظة، بس هتسيب الصفحة دي.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-text font-medium hover:bg-gray-200 transition"
          >
            لأ، كمّل
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
          >
            أيوه، اخرج
          </button>
        </div>
      </div>
    </div>
  );
}
