import React, { useState } from 'react';
import { Clock, MessageSquareQuote } from 'lucide-react';
import { DurationPreset } from './typesSummativeQuiz';
import { QuizQuestionStyle } from './services/quizPromptBuilder';

interface Props {
  durationPreset: DurationPreset;
  questionCount: number;
  timeLimitMinutes: number;
  questionStyle?: QuizQuestionStyle;
  onChangePreset: (preset: DurationPreset, qCount: number, mins: number) => void;
  onChangeStyle?: (style: QuizQuestionStyle) => void;
}

export const QuizTimePresetPills: React.FC<Props> = ({
  durationPreset,
  questionCount,
  timeLimitMinutes,
  questionStyle = 'teen_engaging',
  onChangePreset,
  onChangeStyle,
}) => {
  const [customQs, setCustomQs] = useState(questionCount);
  const [customMins, setCustomMins] = useState(timeLimitMinutes);

  const presets: { key: DurationPreset; label: string; q: number; m: number }[] = [
    { key: '5m', label: '5 Mins', q: 3, m: 5 },
    { key: '10m', label: '10 Mins', q: 6, m: 10 },
    { key: '15m', label: '15 Mins', q: 9, m: 15 },
    { key: '20m', label: '20 Mins', q: 12, m: 20 },
  ];

  const styles: { key: QuizQuestionStyle; label: string }[] = [
    { key: 'teen_engaging', label: 'Real-World Scenarios' },
    { key: 'scenario_detective', label: 'Concept & Misconception Check' },
    { key: 'sharp_direct', label: 'Direct & Concise' },
    { key: 'gcse_formal', label: 'Exam Practice' },
  ];

  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-xs space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2D2A26]/10 pb-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2D2A26]">
          <Clock className="w-4 h-4 text-[#D97706]" />
          <span>Quiz Duration & Question Count</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {presets.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => onChangePreset(p.key, p.q, p.m)}
              className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                durationPreset === p.key
                  ? 'bg-[#2D2A26] text-white shadow-xs'
                  : 'bg-[#F8F6F0] text-[#2D2A26] hover:bg-black/5 border border-[#2D2A26]/15'
              }`}
            >
              {p.label} ({p.q} Qs)
            </button>
          ))}
          <button
            type="button"
            onClick={() => onChangePreset('custom', customQs, customMins)}
            className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              durationPreset === 'custom'
                ? 'bg-[#2D2A26] text-white shadow-xs'
                : 'bg-[#F8F6F0] text-[#2D2A26] hover:bg-black/5 border border-[#2D2A26]/15'
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      {durationPreset === 'custom' && (
        <div className="flex items-center gap-4 text-xs pb-2 border-b border-[#2D2A26]/10">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#2D2A26]">Questions:</span>
            <input
              type="number"
              min={3}
              max={25}
              value={customQs}
              onChange={(e) => {
                const q = Math.max(3, Number(e.target.value));
                setCustomQs(q);
                onChangePreset('custom', q, customMins);
              }}
              className="w-16 px-2.5 py-1 bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-lg text-center font-bold"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#2D2A26]">Minutes:</span>
            <input
              type="number"
              min={3}
              max={60}
              value={customMins}
              onChange={(e) => {
                const m = Math.max(3, Number(e.target.value));
                setCustomMins(m);
                onChangePreset('custom', customQs, m);
              }}
              className="w-16 px-2.5 py-1 bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-lg text-center font-bold"
            />
          </div>
        </div>
      )}

      {onChangeStyle && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2D2A26]">
            <MessageSquareQuote className="w-4 h-4 text-[#D97706]" />
            <span>Question Style & Tone</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {styles.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => onChangeStyle(s.key)}
                className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  questionStyle === s.key
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-[#F8F6F0] text-[#2D2A26] hover:bg-black/5 border border-[#2D2A26]/15'
                }`}
              >
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
