import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { getExportFallbackLabel } from '../../../../services/animationExportMapper';
import { LogOut, ArrowRightLeft, Sparkles } from 'lucide-react';

interface ExitAnimationControlsProps {
  selectedElement?: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
}

const EXIT_OPTIONS = [
  { id: 'none', label: 'None (Remain on Screen)' },
  { id: 'fade_out', label: 'Smooth Fade Out' },
  { id: 'fly_out_right', label: 'Fly Out to Right' },
  { id: 'shrink_disappear', label: 'Shrink & Disappear' },
  { id: 'drop_fall_out', label: 'Drop & Fall Out' },
];

export const ExitAnimationControls: React.FC<ExitAnimationControlsProps> = ({
  selectedElement, onUpdateElementMeta,
}) => {
  const currentExit = selectedElement?.meta?.exitAnimationType || 'none';
  const exportFallback = getExportFallbackLabel(currentExit);

  return (
    <div className="space-y-2 p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700">
      <div className="font-bold text-stone-800 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <LogOut className="w-3.5 h-3.5 text-amber-700" />
          <span>Element Exit Animation</span>
        </span>
        {currentExit !== 'none' && (
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" /> Active
          </span>
        )}
      </div>

      <select
        value={currentExit}
        onChange={(e) => onUpdateElementMeta({ exitAnimationType: e.target.value })}
        className="w-full text-xs font-semibold bg-white border border-stone-300 rounded-lg p-1.5 focus:outline-none"
      >
        {EXIT_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>{opt.label}</option>
        ))}
      </select>

      {currentExit !== 'none' && (
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
