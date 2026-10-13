import React from 'react';
import { SlideAnimationRule } from '../../types/animationTypes';
import { ChevronLeft, ChevronRight, Trash2, Film, PlayCircle, Activity, LogOut, Box } from 'lucide-react';

interface AnimationTimelineChipProps {
  rule: SlideAnimationRule;
  index: number;
  totalRules: number;
  isSelected: boolean;
  onSelect: (isMulti: boolean, isCtrl: boolean) => void;
  onSelectAction?: () => void;
  onShiftRule: (rule: SlideAnimationRule, direction: 'left' | 'right') => void;
  onRemoveRule: (rule: SlideAnimationRule) => void;
}

export const AnimationTimelineChip: React.FC<AnimationTimelineChipProps> = ({
  rule, index, totalRules, isSelected, onSelect, onSelectAction, onShiftRule, onRemoveRule,
}) => {
  const isPageRule = rule.ruleType === 'page_entry' || rule.ruleType === 'page_exit';
  
  const RuleIcon = isPageRule
    ? Film
    : rule.ruleType === 'exit'
    ? LogOut
    : rule.ruleType === '3d'
    ? Box
    : rule.ruleType === 'emphasis'
    ? Activity
    : PlayCircle;

  return (
    <div
      onClick={(e) => onSelect(e.shiftKey, e.ctrlKey || e.metaKey)}
      className={`group relative shrink-0 w-14 h-14 rounded-xl border flex flex-col items-center justify-between p-1 cursor-pointer transition-all ${
        isSelected
          ? 'bg-amber-100 border-amber-600 shadow-sm ring-2 ring-amber-400 text-amber-950'
          : isPageRule
          ? 'bg-indigo-50/90 border-indigo-300 text-indigo-950 hover:bg-indigo-100 shadow-2xs'
          : 'bg-white border-stone-300 hover:border-amber-400 hover:bg-amber-50/40 text-stone-800 shadow-2xs'
      }`}
      title={`${rule.elementLabel || 'Element'}: ${rule.effectId}`}
    >
      <div className="w-full flex items-center justify-between text-[9px] font-black leading-none px-0.5">
        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-extrabold ${
          isPageRule ? 'bg-indigo-700 text-white' : 'bg-amber-800 text-white'
        }`}>
          {isPageRule ? (rule.ruleType === 'page_entry' ? 'P' : 'E') : index + 1}
        </span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemoveRule(rule); }}
          className="p-0.5 hover:bg-rose-100 hover:text-rose-700 rounded text-stone-400 transition-colors cursor-pointer opacity-70 group-hover:opacity-100"
        >
          <Trash2 className="w-2.5 h-2.5" />
        </button>
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onSelectAction?.(); }}
        className="cursor-pointer"
      >
        <RuleIcon className={`w-4 h-4 shrink-0 my-0.5 ${isPageRule ? 'text-indigo-800' : 'text-amber-800'}`} />
      </button>

      <span className={`text-[8.5px] font-bold truncate max-w-full text-center leading-none px-0.5 ${
        isPageRule ? 'text-indigo-950' : 'text-stone-700'
      }`}>
        {rule.elementLabel}
      </span>

      {!isPageRule && (
        <div className="absolute -bottom-1 hidden group-hover:flex items-center gap-1 bg-stone-900 text-white rounded-md px-1 py-0.5 shadow-md text-[8px]">
          <button
            type="button" disabled={index <= 0} onClick={(e) => { e.stopPropagation(); onShiftRule(rule, 'left'); }}
            className="disabled:opacity-30 hover:text-amber-300"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <button
            type="button" disabled={index >= totalRules - 1} onClick={(e) => { e.stopPropagation(); onShiftRule(rule, 'right'); }}
            className="disabled:opacity-30 hover:text-amber-300"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
