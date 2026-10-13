import React, { useState, useEffect } from 'react';

interface DateCountdownFaceProps {
  targetDateTime?: string;
  label?: string;
}

export const DateCountdownFace: React.FC<DateCountdownFaceProps> = ({
  targetDateTime, label = 'Target Milestone',
}) => {
  const [diffMs, setDiffMs] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      if (!targetDateTime) return;
      const target = new Date(targetDateTime).getTime();
      const now = Date.now();
      setDiffMs(Math.max(0, target - now));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDateTime]);

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  const isPassed = diffMs === 0;

  return (
    <div className="flex flex-col items-center justify-center p-1 space-y-1.5 text-stone-900">
      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-full">
        {label}
      </span>

      {isPassed ? (
        <span className="font-extrabold text-sm text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl animate-bounce">
          🎉 Milestone Reached!
        </span>
      ) : (
        <div className="grid grid-cols-4 gap-1 text-center">
          <div className="bg-stone-900 text-white rounded-lg p-1 min-w-[36px]">
            <div className="font-mono font-black text-base">{days}</div>
            <div className="text-[7.5px] uppercase font-bold text-stone-400">Days</div>
          </div>
          <div className="bg-stone-900 text-white rounded-lg p-1 min-w-[36px]">
            <div className="font-mono font-black text-base">{hours}</div>
            <div className="text-[7.5px] uppercase font-bold text-stone-400">Hours</div>
          </div>
          <div className="bg-stone-900 text-white rounded-lg p-1 min-w-[36px]">
            <div className="font-mono font-black text-base">{minutes}</div>
            <div className="text-[7.5px] uppercase font-bold text-stone-400">Mins</div>
          </div>
          <div className="bg-stone-900 text-amber-400 rounded-lg p-1 min-w-[36px]">
            <div className="font-mono font-black text-base">{seconds}</div>
            <div className="text-[7.5px] uppercase font-bold text-amber-300">Secs</div>
          </div>
        </div>
      )}
    </div>
  );
};
