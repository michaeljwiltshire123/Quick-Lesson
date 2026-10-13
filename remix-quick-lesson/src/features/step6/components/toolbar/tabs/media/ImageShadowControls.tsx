import React from 'react';

interface ImageShadowControlsProps {
  meta?: Record<string, any>;
  onUpdateMeta: (patch: Record<string, any>) => void;
}

const SHADOW_PRESETS = [
  { id: 'none', label: 'None', dist: 0, blur: 0, op: 0, col: '#1C1917' },
  { id: 'soft', label: 'Soft Lift', dist: 6, blur: 12, op: 30, col: '#1C1917' },
  { id: 'floating', label: 'Floating', dist: 14, blur: 24, op: 40, col: '#1C1917' },
  { id: 'sharp', label: 'Hard Edge', dist: 6, blur: 0, op: 50, col: '#1C1917' },
  { id: 'reflection', label: 'Floor Cast', dist: 16, blur: 20, op: 45, col: '#1C1917' },
  { id: 'glow', label: 'Amber Glow', dist: 0, blur: 18, op: 70, col: '#D97706' },
];

const SHADOW_COLOURS = [
  { id: '#1C1917', label: 'Charcoal', bg: 'bg-stone-900' },
  { id: '#334155', label: 'Slate', bg: 'bg-slate-700' },
  { id: '#D97706', label: 'Amber', bg: 'bg-amber-600' },
  { id: '#1E3A8A', label: 'Navy', bg: 'bg-blue-900' },
  { id: '#991B1B', label: 'Ruby', bg: 'bg-rose-800' },
];

export const ImageShadowControls: React.FC<ImageShadowControlsProps> = ({ meta = {}, onUpdateMeta }) => {
  const currentStyle = meta.shadowStyle || 'none';
  const dist = meta.shadowDistance ?? (currentStyle === 'sharp' ? 6 : currentStyle === 'floating' ? 14 : 6);
  const blur = meta.shadowBlur ?? (currentStyle === 'sharp' ? 0 : currentStyle === 'glow' ? 18 : 12);
  const opacity = meta.shadowOpacity ?? (currentStyle === 'glow' ? 70 : 35);
  const col = meta.shadowColor || (currentStyle === 'glow' ? '#D97706' : '#1C1917');

  const applyPreset = (p: typeof SHADOW_PRESETS[0]) => {
    onUpdateMeta({
      shadowStyle: p.id, shadowDistance: p.dist, shadowBlur: p.blur, shadowOpacity: p.op, shadowColor: p.col,
    });
  };

  return (
    <div className="space-y-2 pt-1 text-xs text-stone-700">
      <div className="grid grid-cols-3 gap-1">
        {SHADOW_PRESETS.map((p) => (
          <button
            key={p.id} type="button" onClick={() => applyPreset(p)}
            className={`py-1 px-1.5 rounded-lg border text-[10px] font-semibold transition-all cursor-pointer truncate ${
              currentStyle === p.id ? 'bg-amber-700 border-amber-800 text-white shadow-xs' : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-700'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {currentStyle !== 'none' && (
        <div className="space-y-1.5 pt-1 border-t border-stone-200">
          <div className="flex items-center justify-between text-[10px] text-stone-600 font-medium">
            <span>Distance ({dist}px)</span>
            <input type="range" min={0} max={28} value={dist} onChange={(e) => onUpdateMeta({ shadowDistance: Number(e.target.value) })} className="w-28 accent-amber-700 cursor-pointer" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-stone-600 font-medium">
            <span>Blur Softness ({blur}px)</span>
            <input type="range" min={0} max={36} value={blur} onChange={(e) => onUpdateMeta({ shadowBlur: Number(e.target.value) })} className="w-28 accent-amber-700 cursor-pointer" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-stone-600 font-medium">
            <span>Opacity ({opacity}%)</span>
            <input type="range" min={10} max={100} value={opacity} onChange={(e) => onUpdateMeta({ shadowOpacity: Number(e.target.value) })} className="w-28 accent-amber-700 cursor-pointer" />
          </div>
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-[10px] text-stone-500 font-medium">Tint:</span>
            {SHADOW_COLOURS.map((c) => (
              <button
                key={c.id} type="button" onClick={() => onUpdateMeta({ shadowColor: c.id })}
                className={`w-4 h-4 rounded-full ${c.bg} border-2 cursor-pointer transition-transform ${col === c.id ? 'border-amber-500 scale-110' : 'border-white hover:scale-105'}`}
                title={c.label}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
