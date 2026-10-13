import React from 'react';

interface TimelineRulerProps {
  maxSeconds: number;
  onScrubTime: (sec: number) => void;
}

export const TimelineRuler: React.FC<TimelineRulerProps> = ({ maxSeconds, onScrubTime }) => {
  const ticks = Array.from({ length: maxSeconds + 1 }, (_, i) => i);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onScrubTime(parseFloat((ratio * maxSeconds).toFixed(1)));
  };

  return (
    <div
      onClick={handleClick}
      className="relative h-7 bg-stone-200/90 border-b border-stone-300 rounded-t-xl cursor-pointer select-none overflow-hidden"
    >
      <div className="absolute inset-0 flex justify-between px-2 items-center text-[10px] font-mono font-bold text-stone-600">
        {ticks.map((t) => (
          <div key={t} className="flex flex-col items-center">
            <span>{t}s</span>
            <div className="w-px h-1.5 bg-stone-400 mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
};
