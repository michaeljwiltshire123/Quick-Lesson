import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { getExportFallbackLabel } from '../../../../services/animationExportMapper';
import { Sparkles, ArrowRightLeft, Zap } from 'lucide-react';

interface NoveltyFunEffectControlsProps {
  selectedElement?: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
}

const NOVELTY_EFFECTS = [
  { id: 'none', label: 'None' },
  { id: 'roll_in_out', label: 'Roll / Wheel Spin In & Out' },
  { id: 'disco_strobe', label: 'Disco Strobe Flash' },
  { id: 'lightning_strike', label: 'Lightning Strike Reveal & Vanish' },
  { id: 'smoke_bomb', label: 'Smoke Bomb Poof' },
  { id: 'spotlight_reveal', label: 'Spotlight & Curtain Exit' },
  { id: 'glitch_hologram', label: 'Sci-Fi Hologram Beam' },
  { id: 'chalkboard_wipe', label: 'Chalkboard Wipe & Eraser Dust' },
];

export const NoveltyFunEffectControls: React.FC<NoveltyFunEffectControlsProps> = ({
  selectedElement, onUpdateElementMeta,
}) => {
  const currentEffect = selectedElement?.meta?.noveltyEffect || 'none';
  const exportFallback = getExportFallbackLabel(currentEffect);

  return (
    <div className="space-y-2 p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700">
      <div className="font-bold text-stone-800 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-700" />
          <span>Special Classroom Effects</span>
        </span>
        {currentEffect !== 'none' && (
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" /> Live Special
          </span>
        )}
      </div>

      <select
        value={currentEffect}
        onChange={(e) => onUpdateElementMeta({ noveltyEffect: e.target.value })}
        className="w-full text-xs font-semibold bg-white border border-stone-300 rounded-lg p-1.5 focus:outline-none"
      >
        {NOVELTY_EFFECTS.map((opt) => (
          <option key={opt.id} value={opt.id}>{opt.label}</option>
        ))}
      </select>

      {currentEffect !== 'none' && (
        <div className="p-1 bg-amber-50/80 border border-amber-200 rounded-lg flex items-center justify-between text-[10px]">
          <span className="text-stone-600 flex items-center gap-1">
            <ArrowRightLeft className="w-3 h-3 text-amber-700" />
            <span>PowerPoint / Slides Export:</span>
          </span>
          <span className="font-bold text-amber-900 bg-white px-1.5 py-0.5 rounded border border-amber-300">
            Export: {exportFallback}
          </span>
        </div>
      )}
    </div>
  );
};
