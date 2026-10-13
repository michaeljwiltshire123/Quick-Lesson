import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { Sparkles, ArrowRight, PlayCircle, Zap, Clock } from 'lucide-react';
import { TimelineTriggerCycleBadge } from './timeline/TimelineTriggerCycleBadge';
import { TimelineSpeedCycleBadge } from './timeline/TimelineSpeedCycleBadge';

interface ElementAnimationLauncherCardProps {
  element: SlideElement;
  onOpenStudio: () => void;
  onUpdateElementMeta?: (meta: Record<string, any>) => void;
}

export const ElementAnimationLauncherCard: React.FC<ElementAnimationLauncherCardProps> = ({
  element, onOpenStudio, onUpdateElementMeta,
}) => {
  const meta = element?.meta || {};
  const entrance = meta.animationType && meta.animationType !== 'none'
    ? meta.animationType.replace(/_/g, ' ')
    : 'None (Static)';

  return (
    <div className="space-y-3 p-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs text-stone-700 shadow-2xs">
      <div className="flex items-center justify-between">
        <span className="font-extrabold text-stone-900 flex items-center gap-1.5 text-xs">
          <PlayCircle className="w-4 h-4 text-amber-700" />
          <span>Element Animation Studio</span>
        </span>
        <span className="text-[10px] font-semibold text-stone-500">
          Click badges to cycle
        </span>
      </div>

      <div className="p-2.5 bg-white border border-stone-200 rounded-xl space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-stone-500 font-semibold">Active Effect:</span>
          <span className="font-bold text-stone-800 capitalize truncate max-w-[140px]">{entrance}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-100">
          <span className="text-stone-500 font-semibold flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-700" /> Trigger:
          </span>
          <TimelineTriggerCycleBadge
            trigger={meta.animTrigger}
            onCycleTrigger={(val) => onUpdateElementMeta?.({ animTrigger: val })}
            className="bg-amber-100/90 text-amber-900 border-amber-300 hover:bg-amber-200"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-100">
          <span className="text-stone-500 font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-700" /> Speed:
          </span>
          <TimelineSpeedCycleBadge
            duration={meta.animDuration ?? 0.8}
            onCycleDuration={(val) => onUpdateElementMeta?.({ animDuration: val })}
            className="bg-amber-100/90 text-amber-900 border-amber-300 hover:bg-amber-200"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenStudio}
        className="w-full py-2.5 px-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md transition-all group"
      >
        <Sparkles className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
        <span>Open Element Animation Studio</span>
        <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
