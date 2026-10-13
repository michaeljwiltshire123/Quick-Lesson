import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { getExportFallbackLabel } from '../../../../services/animationExportMapper';
import { getGoogleSlidesExportLabel } from '../../../../services/googleSlidesExportMapper';
import { Sparkles, Trash2, ArrowRightLeft, Layers } from 'lucide-react';

interface ActiveElementRulesListProps {
  element: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
}

export const ActiveElementRulesList: React.FC<ActiveElementRulesListProps> = ({
  element, onUpdateElementMeta,
}) => {
  const meta = element.meta || {};
  const label = element.caption || (element.type === 'text' ? element.content?.slice(0, 18) : `${element.type.toUpperCase()}`);

  const activeRules = [
    meta.animationType && meta.animationType !== 'none' ? { key: 'animationType', label: `Entry: ${meta.animationType}` } : null,
    meta.emphasisEffect && meta.emphasisEffect !== 'none' ? { key: 'emphasisEffect', label: `Motion: ${meta.emphasisEffect}` } : null,
    meta.isPulseEmphasis ? { key: 'isPulseEmphasis', label: 'Motion: Pulse' } : null,
    meta.isSpinEmphasis ? { key: 'isSpinEmphasis', label: 'Motion: Spin' } : null,
    meta.isGrowShrink ? { key: 'isGrowShrink', label: 'Motion: Grow/Shrink' } : null,
    meta.isPhysicsBounce ? { key: 'isPhysicsBounce', label: 'Motion: Elastic Bounce' } : null,
    meta.exitAnimationType && meta.exitAnimationType !== 'none' ? { key: 'exitAnimationType', label: `Exit: ${meta.exitAnimationType}` } : null,
    meta.is3DZoom ? { key: 'is3DZoom', label: '3D Focus Zoom' } : null,
    meta.is3DCardFlip ? { key: 'is3DCardFlip', label: '3D Card Flip' } : null,
  ].filter(Boolean) as { key: string; label: string }[];

  const handleRemoveRule = (ruleKey: string) => {
    const patch: Record<string, any> = {};
    if (ruleKey.startsWith('is')) patch[ruleKey] = false;
    else patch[ruleKey] = 'none';
    onUpdateElementMeta(patch);
  };

  const primaryEffect = meta.animationType || meta.emphasisEffect || (meta.is3DZoom ? '3d_zoom' : 'none');
  const pptLabel = getExportFallbackLabel(primaryEffect);
  const gsLabel = getGoogleSlidesExportLabel(primaryEffect);

  return (
    <div className="p-2.5 bg-amber-50/90 border border-amber-200/90 rounded-2xl space-y-2 text-stone-800 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-extrabold text-amber-950 text-xs min-w-0">
          <Layers className="w-3.5 h-3.5 text-amber-800 shrink-0" />
          <span className="truncate">{label}</span>
        </div>
        <span className="text-[10px] font-extrabold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full border border-amber-300">
          {activeRules.length} {activeRules.length === 1 ? 'Rule' : 'Rules'}
        </span>
      </div>

      {activeRules.length === 0 ? (
        <p className="text-[10.5px] text-stone-500 italic p-1.5 bg-white/80 rounded-xl border border-stone-200 text-center">
          No animations on this item yet. Choose an action below or open the Studio.
        </p>
      ) : (
        <div className="space-y-1.5">
          <div className="flex flex-wrap gap-1">
            {activeRules.map((rule) => (
              <span key={rule.key} className="bg-white border border-amber-300 text-amber-950 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-2.5 h-2.5 text-amber-700" />
                <span>{rule.label}</span>
                <button
                  type="button" onClick={() => handleRemoveRule(rule.key)}
                  className="hover:text-rose-600 cursor-pointer ml-1 p-0.5 text-stone-400 hover:bg-rose-50 rounded"
                  title="Delete Rule"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="p-1 bg-white/90 border border-amber-200 rounded-lg flex items-center justify-between text-[9px] gap-1">
            <span className="text-stone-600 font-semibold flex items-center gap-0.5">
              <ArrowRightLeft className="w-2.5 h-2.5 text-amber-700" />
              <span>Export:</span>
            </span>
            <span className="font-bold text-amber-950 bg-amber-100/90 px-1 py-0.5 rounded border border-amber-300">
              GS: {gsLabel}
            </span>
            <span className="font-bold text-stone-800 bg-stone-100 px-1 py-0.5 rounded border border-stone-300">
              PPT: {pptLabel}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
