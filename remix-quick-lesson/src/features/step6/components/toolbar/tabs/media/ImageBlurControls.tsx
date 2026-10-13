import React from 'react';
import { ImageBlurType } from '../../../canvas/imageBlurUtils';
import { RotateCcw } from 'lucide-react';

interface ImageBlurControlsProps {
  meta?: Record<string, any>;
  onUpdateMeta: (patch: Record<string, any>) => void;
}

const BLUR_PRESETS: { id: ImageBlurType; label: string; desc: string }[] = [
  { id: 'none', label: 'Crisp (Off)', desc: 'Standard sharp focus' },
  { id: 'vignette', label: 'Blurred Vignette', desc: 'Soft outer border fade' },
  { id: 'feather', label: 'Feathered Edge', desc: 'Fade-to-transparent edges' },
  { id: 'tiltshift', label: 'Tilt-Shift', desc: 'Top & bottom blurred bands' },
  { id: 'radial', label: 'Radial Focus', desc: 'Center crisp, ring blurred' },
  { id: 'aspectFill', label: 'Aspect Ratio Fill', desc: 'Blurred borders fill frame' },
  { id: 'surface', label: 'Smart Surface', desc: 'Texture & skin smoothing' },
  { id: 'lens', label: 'Camera Lens', desc: 'Optical depth-of-field' },
  { id: 'motion', label: 'Motion Blur', desc: 'Speed & movement streaks' },
];

export const ImageBlurControls: React.FC<ImageBlurControlsProps> = ({ meta = {}, onUpdateMeta }) => {
  const currentType = (meta.blurType as ImageBlurType) || 'none';
  const blurAmount = meta.blurAmount ?? 8;

  const handleSelect = (type: ImageBlurType) => {
    onUpdateMeta({
      blurType: type,
      blurAmount: type === 'none' ? 0 : blurAmount === 0 ? 8 : blurAmount,
    });
  };

  return (
    <div className="space-y-2 pt-1 text-xs text-stone-700">
      <div className="grid grid-cols-3 gap-1">
        {BLUR_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleSelect(p.id)}
            className={`p-1.5 rounded-lg border text-[10px] font-semibold text-center cursor-pointer transition-all ${
              currentType === p.id
                ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
            title={p.desc}
          >
            <div className="truncate">{p.label}</div>
          </button>
        ))}
      </div>

      {currentType !== 'none' && (
        <div className="space-y-1 pt-1.5 border-t border-stone-200 animate-in fade-in">
          <div className="flex items-center justify-between text-[10px] text-stone-600 font-medium">
            <span>Blur Strength</span>
            <span className="font-extrabold text-amber-800">{blurAmount}px</span>
          </div>
          <input
            type="range" min={1} max={30} value={blurAmount}
            onChange={(e) => onUpdateMeta({ blurAmount: Number(e.target.value) })}
            className="w-full accent-amber-700 cursor-pointer"
          />
        </div>
      )}

      <button
        type="button"
        disabled={currentType === 'none'}
        onClick={() => onUpdateMeta({ blurType: 'none', blurAmount: 0 })}
        className="w-full py-1 px-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 disabled:opacity-40 text-stone-600 font-semibold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
      >
        <RotateCcw className="w-3 h-3 text-stone-500" />
        <span>Reset to Crisp Focus</span>
      </button>
    </div>
  );
};
