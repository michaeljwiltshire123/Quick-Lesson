import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { getExportFallbackLabel } from '../../../../services/animationExportMapper';
import { Activity, Sparkles, ArrowRightLeft, Check } from 'lucide-react';

interface MotionAndEmphasisControlsProps {
  selectedElement?: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
}

const EMPHASIS_ACTIONS = [
  { id: 'isPulseEmphasis', label: 'Pulse Emphasis', effectId: 'pulse' },
  { id: 'isSpinEmphasis', label: 'Spin Emphasis', effectId: 'spin' },
  { id: 'isGrowShrink', label: 'Grow / Shrink', effectId: 'grow_shrink' },
  { id: 'isPhysicsBounce', label: 'Elastic Bounce', effectId: 'physics_bounce' },
];

export const MotionAndEmphasisControls: React.FC<MotionAndEmphasisControlsProps> = ({
  selectedElement, onUpdateElementMeta,
}) => {
  const meta = selectedElement?.meta || {};

  const activeEffects = EMPHASIS_ACTIONS.filter((act) => Boolean(meta[act.id] || meta.emphasisEffect === act.effectId));

  const toggleAction = (actKey: string, effectId: string) => {
    const isCurrentlyActive = Boolean(meta[actKey] || meta.emphasisEffect === effectId);
    onUpdateElementMeta({ [actKey]: !isCurrentlyActive });
  };

  return (
    <div className="space-y-2 p-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs text-stone-700">
      <div className="font-bold text-stone-800 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-amber-700" />
          <span>In-Place Motion & Emphasis</span>
        </span>
        {activeEffects.length > 0 && (
          <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5 text-amber-700" /> {activeEffects.length} Active
          </span>
        )}
      </div>

      <p className="text-[10.5px] text-stone-500 font-medium">Select one or more in-place emphasis actions for this element:</p>

      <div className="grid grid-cols-2 gap-1.5 pt-0.5">
        {EMPHASIS_ACTIONS.map((act) => {
          const isActive = Boolean(meta[act.id] || meta.emphasisEffect === act.effectId);
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => toggleAction(act.id, act.effectId)}
              className={`py-1.5 px-2 rounded-xl border text-[11px] font-bold flex items-center justify-between cursor-pointer transition-all ${
                isActive
                  ? 'bg-amber-800 text-white border-amber-900 shadow-2xs'
                  : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
              }`}
            >
              <span>{act.label}</span>
              {isActive && <Check className="w-3 h-3 text-amber-200" />}
            </button>
          );
        })}
      </div>

      {activeEffects.length > 0 && (
        <div className="p-1.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between text-[10px] mt-1">
          <span className="text-stone-600 flex items-center gap-1">
            <ArrowRightLeft className="w-3 h-3 text-amber-700" />
            <span>PowerPoint Export:</span>
          </span>
          <span className="font-bold text-amber-900 bg-white px-1.5 py-0.5 rounded border border-amber-300">
            {getExportFallbackLabel(activeEffects[0].effectId)}
          </span>
        </div>
      )}
    </div>
  );
};
