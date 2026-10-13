import React, { useState } from 'react';
import { SlideElement } from '../../../../../types/slideTypes';
import { extractSlideTimelineRules } from '../../../../../types/animationTypes';
import { AnimationMotionCard } from './AnimationMotionCard';
import { addMotionRule, updateMotionRule, removeMotionRule } from './motionRuleHelpers';
import { Plus, Sparkles, Film } from 'lucide-react';

interface ObjectAnimationsSectionProps {
  elements: SlideElement[];
  selectedElementId?: string | null;
  selectedElement?: SlideElement;
  onSelectElementId?: (id: string | null) => void;
  onUpdateElements: (elements: SlideElement[]) => void;
}

export const ObjectAnimationsSection: React.FC<ObjectAnimationsSectionProps> = ({
  elements, selectedElementId, selectedElement, onSelectElementId, onUpdateElements,
}) => {
  const [fallbackElementId, setFallbackElementId] = useState<string>(elements[0]?.id || '');
  const targetId = selectedElementId || fallbackElementId || elements[0]?.id;
  const targetElement = elements.find((e) => e.id === targetId);

  const allRules = extractSlideTimelineRules(elements);
  const objectRules = allRules.filter((r) => r.ruleType !== 'page_entry' && r.ruleType !== 'page_exit');

  const handleAddAnimation = () => {
    if (!targetId) return;
    const updated = addMotionRule(elements, targetId, 'fade_in');
    onUpdateElements(updated);
  };

  const handleUpdate = (ruleId: string, patch: any) => {
    const updated = updateMotionRule(elements, ruleId, patch);
    onUpdateElements(updated);
  };

  const handleDelete = (ruleId: string) => {
    const updated = removeMotionRule(elements, ruleId);
    onUpdateElements(updated);
  };

  const selectedName = targetElement?.caption || (targetElement?.type === 'text' ? targetElement.content?.slice(0, 18) : targetElement?.type.toUpperCase());

  return (
    <div className="space-y-2.5 p-3 bg-stone-50 rounded-2xl border border-stone-200/90 shadow-2xs text-xs text-stone-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-black text-stone-900 tracking-tight">
          <Film className="w-3.5 h-3.5 text-amber-700" />
          <span>Object Animations</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-extrabold text-[10px]">
          {objectRules.length} {objectRules.length === 1 ? 'effect' : 'effects'}
        </span>
      </div>

      <div className="space-y-1.5">
        {!selectedElement && elements.length > 0 && (
          <div className="flex items-center gap-1">
            <select
              value={targetId}
              onChange={(e) => { setFallbackElementId(e.target.value); onSelectElementId?.(e.target.value); }}
              className="flex-1 bg-white border border-stone-300 rounded-xl px-2 py-1.5 text-[11px] font-bold text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500 cursor-pointer truncate shadow-2xs"
            >
              {elements.map((el, i) => (
                <option key={el.id} value={el.id}>{i + 1}. {el.caption || (el.type === 'text' ? el.content?.slice(0, 20) : el.type.toUpperCase())}</option>
              ))}
            </select>
          </div>
        )}

        <button
          type="button" disabled={elements.length === 0} onClick={handleAddAnimation}
          className="w-full py-2 px-3 bg-amber-800 hover:bg-amber-900 active:scale-[0.99] text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Add animation {selectedElement ? `to "${selectedName}"` : ''}</span>
        </button>
      </div>

      <div className="space-y-2 pt-1">
        {objectRules.length === 0 ? (
          <div className="p-3 text-center bg-white border border-dashed border-stone-300 rounded-xl text-stone-400 text-[11px] font-medium flex flex-col items-center gap-1">
            <Sparkles className="w-4 h-4 text-stone-300" />
            <span>No animations on this slide yet.</span>
            <span className="text-[10px] text-stone-400">Click &apos;Add animation&apos; above to animate elements.</span>
          </div>
        ) : (
          objectRules.map((rule, idx) => (
            <AnimationMotionCard
              key={rule.id || `rule-${idx}`} rule={rule} index={idx} total={objectRules.length}
              onUpdate={handleUpdate} onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};
