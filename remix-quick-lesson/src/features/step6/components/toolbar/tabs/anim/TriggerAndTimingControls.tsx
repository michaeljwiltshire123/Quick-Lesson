import React, { useState } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { CardConfigPopover } from './studio/CardConfigPopover';
import { Sliders } from 'lucide-react';
import { normalizeDuration } from './timing/DurationInputGuard';

interface TriggerAndTimingControlsProps {
  selectedElement?: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
}

export const TriggerAndTimingControls: React.FC<TriggerAndTimingControlsProps> = ({
  selectedElement, onUpdateElementMeta,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const meta = selectedElement?.meta || {};
  const currentTrigger = meta.animTrigger || 'onClick';
  const duration = normalizeDuration(meta.animDuration);
  const triggerLabel = currentTrigger === 'withPrevious' ? 'Together' : currentTrigger === 'afterPrevious' ? 'In Succession' : 'On Click';

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full py-2 px-3 bg-white hover:bg-amber-50 border border-stone-200 hover:border-amber-400 rounded-xl text-xs font-bold text-stone-700 flex items-center justify-between cursor-pointer transition-colors shadow-2xs"
      >
        <span className="flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-amber-700" />
          <span>Customise Pacing & Trigger</span>
        </span>
        <span className="text-[10px] text-amber-800 font-mono bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
          {triggerLabel} • {duration.toFixed(1)}s
        </span>
      </button>

      <CardConfigPopover
        isOpen={isOpen}
        effectName={meta.animationType || 'Animation'}
        category={meta.emphasisEffect ? 'emphasis' : meta.exitAnimationType ? 'exit' : 'entrance'}
        trigger={currentTrigger}
        duration={duration}
        repeatTimes={meta.repeatTimes ?? 1}
        onTriggerChange={(val) => onUpdateElementMeta({ animTrigger: val })}
        onDurationChange={(val) => onUpdateElementMeta({ animDuration: val })}
        onRepeatChange={(val) => onUpdateElementMeta({ repeatTimes: val })}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
