import React from 'react';

interface TimelinePlayheadProps {
  currentTime: number;
  maxSeconds: number;
}

export const TimelinePlayhead: React.FC<TimelinePlayheadProps> = ({ currentTime, maxSeconds }) => {
  const percent = Math.min(100, Math.max(0, (currentTime / maxSeconds) * 100));

  return (
    <div
      style={{ left: `${percent}%` }}
      className="absolute top-0 bottom-0 w-0.5 bg-amber-600 z-30 pointer-events-none transition-[left] duration-75"
    >
      <div className="w-3 h-3 bg-amber-600 rotate-45 -translate-x-[5px] -translate-y-1 shadow-sm rounded-2xs" />
    </div>
  );
};
