import React from 'react';

interface ImageBorderCornerControlsProps {
  meta?: Record<string, any>;
  onUpdateMeta: (patch: Record<string, any>) => void;
}

const RADIUS_OPTIONS = [
  { val: 0, label: 'Square' },
  { val: 8, label: 'Soft' },
  { val: 16, label: 'Rounded' },
  { val: 999, label: 'Circle' },
];

const BORDER_WIDTHS = [
  { val: 0, label: 'None' },
  { val: 1, label: '1px' },
  { val: 2, label: '2px' },
  { val: 4, label: '4px' },
];

const BORDER_COLOURS = [
  { id: '#1C1917', label: 'Dark', bg: 'bg-stone-900' },
  { id: '#D97706', label: 'Amber', bg: 'bg-amber-600' },
  { id: '#2563EB', label: 'Blue', bg: 'bg-blue-600' },
  { id: '#059669', label: 'Emerald', bg: 'bg-emerald-600' },
  { id: '#E5E7EB', label: 'Light', bg: 'bg-stone-200' },
];

export const ImageBorderCornerControls: React.FC<ImageBorderCornerControlsProps> = ({ meta = {}, onUpdateMeta }) => {
  const radius = meta.imageRadius ?? 0;
  const borderWidth = meta.imageBorderWidth ?? 0;
  const borderColor = meta.imageBorderColor || '#1C1917';

  return (
    <div className="space-y-2 pt-1 text-xs text-stone-700">
      <div className="space-y-1">
        <span className="text-[10px] text-stone-600 font-medium">Corner Rounding</span>
        <div className="grid grid-cols-4 gap-1">
          {RADIUS_OPTIONS.map((r) => (
            <button
              key={r.val} type="button" onClick={() => onUpdateMeta({ imageRadius: r.val })}
              className={`py-1 px-1 rounded-lg border text-[9px] font-bold text-center transition-all cursor-pointer ${
                radius === r.val ? 'bg-amber-700 border-amber-800 text-white' : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1 pt-1 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-stone-600 font-medium">Frame Border</span>
          <div className="flex items-center gap-1">
            {BORDER_COLOURS.map((c) => (
              <button
                key={c.id} type="button" onClick={() => onUpdateMeta({ imageBorderColor: c.id })}
                className={`w-3.5 h-3.5 rounded-full ${c.bg} border cursor-pointer transition-transform ${borderColor === c.id ? 'border-amber-600 scale-110' : 'border-stone-300'}`}
                title={c.label}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {BORDER_WIDTHS.map((w) => (
            <button
              key={w.val} type="button" onClick={() => onUpdateMeta({ imageBorderWidth: w.val })}
              className={`py-1 px-1 rounded-lg border text-[9px] font-bold text-center transition-all cursor-pointer ${
                borderWidth === w.val ? 'bg-amber-700 border-amber-800 text-white' : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-700'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
