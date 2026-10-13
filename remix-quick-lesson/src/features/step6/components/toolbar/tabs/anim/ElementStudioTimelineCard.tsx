import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { getGoogleSlidesExportLabel } from '../../../../services/googleSlidesExportMapper';
import { getExportFallbackLabel } from '../../../../services/animationExportMapper';
import { ChevronUp, ChevronDown, CheckSquare, Square } from 'lucide-react';
import { TimelineTriggerCycleBadge } from './timeline/TimelineTriggerCycleBadge';
import { TimelineSpeedCycleBadge } from './timeline/TimelineSpeedCycleBadge';

interface ElementStudioTimelineCardProps {
  element: SlideElement;
  index: number;
  total: number;
  isSelected: boolean;
  isChecked: boolean;
  onSelect: () => void;
  onToggleCheck: (e: React.MouseEvent) => void;
  onShift: (direction: 'up' | 'down') => void;
  onUpdateMeta?: (patch: Record<string, any>) => void;
}

export const ElementStudioTimelineCard: React.FC<ElementStudioTimelineCardProps> = ({
  element, index, total, isSelected, isChecked, onSelect, onToggleCheck, onShift, onUpdateMeta,
}) => {
  const meta = element.meta || {};
  const effect = meta.animationType || meta.emphasisEffect || 'none';
  const label = element.caption || (element.type === 'text' ? element.content?.slice(0, 16) : element.type.toUpperCase());

  return (
    <div
      onClick={onSelect}
      className={`p-2.5 rounded-xl border min-w-[210px] shrink-0 cursor-pointer transition-all space-y-1.5 ${
        isSelected ? 'bg-amber-100/90 border-amber-600 ring-1 ring-amber-500 font-bold text-amber-950' : 'bg-white border-stone-300 text-stone-800'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 truncate">
          <button type="button" onClick={onToggleCheck} className="cursor-pointer">
            {isChecked ? <CheckSquare className="w-3.5 h-3.5 text-amber-800" /> : <Square className="w-3.5 h-3.5 text-stone-400" />}
          </button>
          <span className="w-4 h-4 rounded-full bg-amber-800 text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
            {meta.animationStep || index + 1}
          </span>
          <span className="truncate text-xs font-extrabold">{label}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <button type="button" disabled={index === 0} onClick={(e) => { e.stopPropagation(); onShift('up'); }} className="p-0.5 hover:bg-stone-200 rounded disabled:opacity-20 cursor-pointer"><ChevronUp className="w-3 h-3" /></button>
          <button type="button" disabled={index === total - 1} onClick={(e) => { e.stopPropagation(); onShift('down'); }} className="p-0.5 hover:bg-stone-200 rounded disabled:opacity-20 cursor-pointer"><ChevronDown className="w-3 h-3" /></button>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-stone-600 font-medium">
        <TimelineTriggerCycleBadge
          trigger={meta.animTrigger}
          onCycleTrigger={(t) => onUpdateMeta?.({ animTrigger: t })}
          className="bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300"
        />
        <TimelineSpeedCycleBadge
          duration={meta.animDuration ?? 0.8}
          onCycleDuration={(d) => onUpdateMeta?.({ animDuration: d })}
          className="bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300"
        />
      </div>

      <div className="pt-1 border-t border-stone-200/80 flex items-center justify-between text-[9px] text-stone-500 font-semibold">
        <span className="bg-amber-50 px-1 py-0.5 rounded border border-amber-200 text-amber-900 truncate">GS: {getGoogleSlidesExportLabel(effect)}</span>
        <span className="bg-stone-50 px-1 py-0.5 rounded border border-stone-200 text-stone-700 truncate">PPT: {getExportFallbackLabel(effect)}</span>
      </div>
    </div>
  );
};
