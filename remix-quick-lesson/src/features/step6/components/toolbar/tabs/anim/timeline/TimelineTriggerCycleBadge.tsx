import React from 'react';
import { getTriggerCycleInfo, cycleTrigger } from './timelineCycleHelpers';

interface TimelineTriggerCycleBadgeProps {
  trigger?: string;
  onCycleTrigger: (nextTrigger: string) => void;
  className?: string;
}

export const TimelineTriggerCycleBadge: React.FC<TimelineTriggerCycleBadgeProps> = ({
  trigger,
  onCycleTrigger,
  className = '',
}) => {
  const info = getTriggerCycleInfo(trigger);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = cycleTrigger(trigger);
    onCycleTrigger(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md font-bold text-[9px] bg-black/20 hover:bg-black/35 text-white cursor-pointer transition-all active:scale-95 shadow-2xs border border-white/20 ${className}`}
      title={info.tooltip}
    >
      <span className="text-[10px] leading-none">{info.symbol}</span>
      <span className="leading-tight">{info.label}</span>
    </button>
  );
};
