import { useState } from 'react';

interface Props {
  url: string;
  label: string;
  collapsed?: boolean;
}

export default function ImageDisplay({ url, label, collapsed }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  if (error) return null;

  if (collapsed && !open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="my-2 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium active:scale-95 transition w-full justify-center"
      >
        <span>🖼️</span>
        <span>عرض صورة: {label}</span>
      </button>
    );
  }

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-border bg-white">
      {collapsed && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="w-full text-center text-xs text-blue-600 py-1.5 bg-blue-50 hover:bg-blue-100 transition font-medium"
        >
          إخفاء الصورة ✕
        </button>
      )}
      {!loaded && (
        <div className="h-40 flex items-center justify-center text-sm text-text-light animate-pulse">
          جاري تحميل الصورة...
        </div>
      )}
      <img
        src={url}
        alt={label}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full object-contain max-h-[400px] ${loaded ? '' : 'hidden'}`}
      />
      {loaded && label && (
        <div className="text-center text-xs text-text-light py-1.5 bg-gray-50">{label}</div>
      )}
    </div>
  );
}
