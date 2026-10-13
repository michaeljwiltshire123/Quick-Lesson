import React from 'react';
import { RotateCcw } from 'lucide-react';

interface ImageAdjustmentControlsProps {
  meta?: Record<string, any>;
  onUpdateMeta: (patch: Record<string, any>) => void;
}

const FILTER_PRESETS = [
  { id: 'natural', label: 'Original', b: 100, c: 100, s: 100 },
  { id: 'vibrant', label: 'Vibrant', b: 105, c: 115, s: 140 },
  { id: 'contrast', label: 'Hi-Contrast', b: 105, c: 140, s: 110 },
  { id: 'mono', label: 'Monochrome', b: 100, c: 120, s: 0 },
  { id: 'warm', label: 'Warm', b: 105, c: 105, s: 125 },
];

export const ImageAdjustmentControls: React.FC<ImageAdjustmentControlsProps> = ({ meta = {}, onUpdateMeta }) => {
  const b = meta.brightness ?? 100;
  const c = meta.contrast ?? 100;
  const s = meta.saturation ?? 100;

  const handleReset = () => {
    onUpdateMeta({ brightness: 100, contrast: 100, saturation: 100 });
  };

  return (
    <div className="space-y-2 pt-1 text-xs text-stone-700">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-stone-500 font-medium">Quick Presets</span>
        <button type="button" onClick={handleReset} className="text-[10px] text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-0.5 cursor-pointer">
          <RotateCcw className="w-2.5 h-2.5" />Reset
        </button>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {FILTER_PRESETS.map((p) => (
          <button
            key={p.id} type="button" onClick={() => onUpdateMeta({ brightness: p.b, contrast: p.c, saturation: p.s })}
            className={`py-1 px-1 rounded-lg border text-[9px] font-bold text-center transition-all cursor-pointer truncate ${
              b === p.b && c === p.c && s === p.s ? 'bg-amber-700 border-amber-800 text-white' : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-700'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="space-y-1.5 pt-1 border-t border-stone-200">
        <div className="flex items-center justify-between text-[10px] text-stone-600 font-medium">
          <span>Brightness ({b}%)</span>
          <input type="range" min={60} max={140} value={b} onChange={(e) => onUpdateMeta({ brightness: Number(e.target.value) })} className="w-28 accent-amber-700 cursor-pointer" />
        </div>
        <div className="flex items-center justify-between text-[10px] text-stone-600 font-medium">
          <span>Contrast ({c}%)</span>
          <input type="range" min={60} max={140} value={c} onChange={(e) => onUpdateMeta({ contrast: Number(e.target.value) })} className="w-28 accent-amber-700 cursor-pointer" />
        </div>
        <div className="flex items-center justify-between text-[10px] text-stone-600 font-medium">
          <span>Saturation ({s}%)</span>
          <input type="range" min={0} max={180} value={s} onChange={(e) => onUpdateMeta({ saturation: Number(e.target.value) })} className="w-28 accent-amber-700 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
