import React from 'react';
import { Clock } from 'lucide-react';
import { SlideItem } from '../../types/slideTypes';

interface PaceTimelineBarProps {
  slides: SlideItem[];
  activeSlideIndex: number;
}

export const PaceTimelineBar: React.FC<PaceTimelineBarProps> = ({
  slides,
  activeSlideIndex,
}) => {
  const totalMinutes = slides.reduce((acc, s) => acc + (s.speakerNotes?.timingMinutes || 5), 0);
  const elapsedBefore = slides
    .slice(0, activeSlideIndex)
    .reduce((acc, s) => acc + (s.speakerNotes?.timingMinutes || 5), 0);
  const currentSlideMins = slides[activeSlideIndex]?.speakerNotes?.timingMinutes || 5;
  const startMin = elapsedBefore;
  const endMin = elapsedBefore + currentSlideMins;
  const progressPercent = totalMinutes > 0 ? ((endMin) / totalMinutes) * 100 : 0;

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <span className="font-semibold text-stone-700">
          Lesson Pacing: <strong className="text-amber-950 font-bold">Min {startMin}–{endMin}</strong> of {totalMinutes}m
        </span>
      </div>

      <div className="flex-1 max-w-xs bg-stone-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-amber-700 h-full rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(5, progressPercent))}%` }}
        />
      </div>

      <span className="text-[11px] text-stone-500 font-medium">
        Slide {activeSlideIndex + 1} of {slides.length}
      </span>
    </div>
  );
};
