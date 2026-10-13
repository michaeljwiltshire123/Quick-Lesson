import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { getExportFallbackLabel } from '../../../../services/animationExportMapper';
import { Wand2, Layers, ArrowRightLeft, Check } from 'lucide-react';

interface MagicMorphAndStaggerControlsProps {
  selectedElement?: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
}

export const MagicMorphAndStaggerControls: React.FC<MagicMorphAndStaggerControlsProps> = ({
  selectedElement, onUpdateElementMeta,
}) => {
  const meta = selectedElement?.meta || {};
  const isMagicMorph = Boolean(meta.isMagicMorph);
  const isStaggeredGroup = Boolean(meta.isStaggeredGroup);
  const staggerDelayMs = meta.staggerDelayMs || 200;

  const morphFallback = getExportFallbackLabel('magic_morph');
  const staggerFallback = getExportFallbackLabel('staggered_group');

  return (
    <div className="space-y-2 p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700">
      <div className="font-bold text-stone-800 flex items-center gap-1.5">
        <Wand2 className="w-3.5 h-3.5 text-amber-700" />
        <span>Magic Morph & Group Stagger</span>
      </div>

      <div className="space-y-1.5 pt-0.5">
        <button
          type="button"
          onClick={() => onUpdateElementMeta({ isMagicMorph: !isMagicMorph })}
          className={`w-full py-1.5 px-2.5 rounded-lg border text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
            isMagicMorph
              ? 'bg-amber-800 text-white border-amber-900 shadow-2xs'
              : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Magic Morph Shape Transition</span>
          </span>
          {isMagicMorph && <Check className="w-3.5 h-3.5 text-amber-200" />}
        </button>

        {isMagicMorph && (
          <div className="p-1 bg-amber-50/80 border border-amber-200 rounded-lg flex items-center justify-between text-[10px]">
            <span className="text-stone-600 flex items-center gap-1">
              <ArrowRightLeft className="w-3 h-3 text-amber-700" />
              <span>Export Fallback:</span>
            </span>
            <span className="font-bold text-amber-900 bg-white px-1.5 py-0.5 rounded border border-amber-300">
              {morphFallback}
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => onUpdateElementMeta({ isStaggeredGroup: !isStaggeredGroup })}
          className={`w-full py-1.5 px-2.5 rounded-lg border text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
            isStaggeredGroup
              ? 'bg-amber-800 text-white border-amber-900 shadow-2xs'
              : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-300" />
            <span>Staggered Waterfall Group Delay</span>
          </span>
          {isStaggeredGroup && <Check className="w-3.5 h-3.5 text-amber-200" />}
        </button>

        {isStaggeredGroup && (
          <div className="space-y-1.5 p-1.5 bg-amber-50/80 border border-amber-200 rounded-lg">
            <div className="flex justify-between items-center text-[10.5px] font-bold">
              <span className="text-stone-700">Waterfall Gap</span>
              <span className="text-amber-900 font-mono">{staggerDelayMs}ms</span>
            </div>
            <input
              type="range" min={100} max={800} step={50} value={staggerDelayMs}
              onChange={(e) => onUpdateElementMeta({ staggerDelayMs: parseInt(e.target.value) })}
              className="w-full accent-amber-700 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-stone-600">Export Fallback:</span>
              <span className="font-bold text-amber-900 bg-white px-1.5 py-0.5 rounded border border-amber-300">
                {staggerFallback}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
