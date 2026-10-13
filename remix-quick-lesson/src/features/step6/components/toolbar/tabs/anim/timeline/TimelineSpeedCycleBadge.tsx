import React from 'react';
import { getDurationCycleInfo, cycleDuration } from './timelineCycleHelpers';
import { Clock } from 'lucide-react';

interface TimelineSpeedCycleBadgeProps {
  duration?: number;
  onCycleDuration: (nextDuration: number) => void;
  className?: string;
}

export const TimelineSpeedCycleBadge: React.FC<TimelineSpeedCycleBadgeProps> = ({
  duration,
  onCycleDuration,
  className = '',
}) => {
  const info = getDurationCycleInfo(duration);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = cycleDuration(duration);
    onCycleDuration(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-bold text-[9px] bg-black/20 hover:bg-black/35 text-white cursor-pointer transition-all active:scale-95 shadow-2xs border border-white/20 ${className}`}
      title={info.tooltip}
    >
      <Clock className="w-2.5 h-2.5 shrink-0 opacity-80" />
      <span className="font-mono leading-tight">{info.label}</span>
    </button>
  );
};
