import React from 'react';
import { Clock, HelpCircle } from 'lucide-react';

interface Props {
  questionCount: number;
  timeLimitMinutes: number;
  onChangeCount: (count: number) => void;
}

export const QuizTimeSliderBar: React.FC<Props> = ({
  questionCount, timeLimitMinutes, onChangeCount,
}) => {
  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2D2A26]">
          <Clock className="w-4 h-4 text-[#D97706]" />
          <span>Quiz Pace & Duration ({timeLimitMinutes} Mins Est.)</span>
        </div>
        <p className="text-[11px] text-[#2D2A26]/65">
          Calculated at ~1.5 minutes per question for balanced cognitive pacing.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-[#2D2A26]/80">3 Qs</span>
        <input
          type="range"
          min={3}
          max={12}
          step={1}
          value={questionCount}
          onChange={(e) => onChangeCount(Number(e.target.value))}
          className="w-36 accent-amber-600 cursor-pointer"
        />
        <span className="text-xs font-bold text-[#2D2A26]/80">12 Qs</span>
        <span className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
          {questionCount} Questions
        </span>
      </div>
    </div>
  );
};
