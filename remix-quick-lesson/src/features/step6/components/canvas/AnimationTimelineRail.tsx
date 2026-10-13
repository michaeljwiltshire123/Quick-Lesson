import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { extractSlideTimelineRules, SlideAnimationRule } from '../../types/animationTypes';
import { AnimationTimelineChip } from './AnimationTimelineChip';
import { useTimelineRailOperations } from './useTimelineRailOperations';
import { Film, Sparkles } from 'lucide-react';

interface AnimationTimelineRailProps {
  elements: SlideElement[];
  theme?: any;
  selectedElementIds?: Set<string>;
  onSelectElementIds?: (ids: Set<string>) => void;
  onUpdateElements: (elements: SlideElement[]) => void;
  onUpdateTheme?: (patch: any) => void;
  onSetActiveActionType?: (type: 'entrance' | 'animation' | 'exit' | null) => void;
}

export const AnimationTimelineRail: React.FC<AnimationTimelineRailProps> = ({
  elements, theme, selectedElementIds = new Set(), onSelectElementIds, onUpdateElements, onUpdateTheme, onSetActiveActionType,
}) => {
  const rules = extractSlideTimelineRules(elements, theme);
  const { handleShiftRule, handleRemoveRule } = useTimelineRailOperations(elements, rules, onUpdateElements, onUpdateTheme);

  const handleSelectRule = (rule: SlideAnimationRule, isMulti: boolean, isCtrl: boolean) => {
    if (!rule.elementId) return;
    const nextSelected = new Set(selectedElementIds);
    if (!isMulti && !isCtrl) {
      nextSelected.clear();
      nextSelected.add(rule.elementId);
    } else if (isCtrl) {
      if (nextSelected.has(rule.elementId)) nextSelected.delete(rule.elementId);
      else nextSelected.add(rule.elementId);
    } else if (isMulti) {
      nextSelected.add(rule.elementId);
    }
    onSelectElementIds?.(nextSelected);
    onSetActiveActionType?.(rule.ruleType === 'entrance' ? 'entrance' : rule.ruleType === 'exit' ? 'exit' : 'animation');
  };

  return (
    <div className="w-full bg-stone-50 text-stone-800 p-2 rounded-2xl border border-stone-200/90 shadow-2xs space-y-1.5 select-none">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-amber-900 font-extrabold text-[11px] tracking-wide">
          <Film className="w-3.5 h-3.5 text-amber-700" />
          <span>Slide Sequence Timeline</span>
        </div>
        <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
          {rules.length} {rules.length === 1 ? 'Step' : 'Steps'}
        </span>
      </div>

      {rules.length === 0 ? (
        <div className="p-2 text-center bg-white border border-dashed border-stone-300 rounded-xl text-stone-400 text-[10.5px] font-medium flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-stone-400" />
          <span>No animations on this slide. Click any element to add motion.</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin scrollbar-thumb-stone-300">
          {rules.map((rule, idx) => (
            <AnimationTimelineChip
              key={rule.id}
              rule={rule}
              index={idx}
              totalRules={rules.length}
              isSelected={rule.elementId ? selectedElementIds.has(rule.elementId) : false}
              onSelect={(isMulti, isCtrl) => handleSelectRule(rule, isMulti, isCtrl)}
              onSelectAction={() => onSetActiveActionType?.(rule.ruleType === 'entrance' ? 'entrance' : rule.ruleType === 'exit' ? 'exit' : 'animation')}
              onShiftRule={handleShiftRule}
              onRemoveRule={handleRemoveRule}
            />
          ))}
        </div>
      )}
    </div>
  );
};
