import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { PlayCircle, Eye } from 'lucide-react';

interface ElementAnimationPickerProps {
  selectedElement?: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
}

const ANIMATION_TYPES = [
  { id: 'none', label: 'Static' },
  { id: 'appear_on_click', label: 'Appear on Click' },
  { id: 'fade_in', label: 'Fade In' },
  { id: 'slide_in_left', label: 'Slide In' },
  { id: 'zoom_in', label: 'Zoom In' },
];

export const ElementAnimationPicker: React.FC<ElementAnimationPickerProps> = ({
  selectedElement, onUpdateElementMeta,
}) => {
  if (!selectedElement) return null;
  const currentAnim = selectedElement.meta?.animationType || 'none';
  const currentStep = selectedElement.meta?.animationStep || 1;

  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="flex items-center gap-1 text-stone-600 font-semibold text-[11px]">
        <PlayCircle className="w-3.5 h-3.5 text-amber-700" />
        <span>Entrance:</span>
      </div>

      <select
        value={currentAnim}
        onChange={(e) => onUpdateElementMeta({ ...(selectedElement.meta || {}), animationType: e.target.value })}
        className="text-[11px] font-semibold bg-stone-100 border border-stone-300 rounded-lg px-2 py-1 text-stone-800 focus:outline-none focus:border-amber-600 cursor-pointer"
      >
        {ANIMATION_TYPES.map((a) => (
          <option key={a.id} value={a.id}>{a.label}</option>
        ))}
      </select>

      {currentAnim !== 'none' && (
        <label className="flex items-center gap-1 text-[11px] text-stone-600 font-semibold" title="Sequence order (1 = first to appear)">
          <span>Step:</span>
          <input
            type="number"
            min={1}
            max={10}
            value={currentStep}
            onChange={(e) => onUpdateElementMeta({ ...(selectedElement.meta || {}), animationStep: parseInt(e.target.value) || 1 })}
            className="w-10 text-[11px] p-1 bg-stone-100 border border-stone-300 rounded-lg text-center font-bold"
          />
        </label>
      )}
    </div>
  );
};
