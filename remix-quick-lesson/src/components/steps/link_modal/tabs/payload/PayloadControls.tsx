import React from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';
import { PayloadControlsProps, QuestionMixType } from './types';

const MIX_OPTIONS: { id: QuestionMixType; label: string }[] = [
  { id: 'mcq', label: 'All Multiple Choice' },
  { id: 'tf', label: 'All True/False' },
  { id: 'mix', label: 'Perfect Mix' },
];

export const PayloadControls: React.FC<PayloadControlsProps> = ({
  questionCount, onQuestionCountChange, questionMix, onQuestionMixChange,
  customFocus, onCustomFocusChange, onGenerate, isLoading,
}) => (
  <div className="p-4 rounded-xl border border-[#2D2A26]/10 bg-white space-y-3.5 shadow-2xs">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex-1 w-full space-y-1">
        <div className="flex items-center justify-between">
          <label htmlFor="question-count-slider" className="text-xs font-bold text-[#2D2A26]/80 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Questions: {questionCount}</span>
          </label>
          <span className="text-[11px] text-[#2D2A26]/50 font-medium">3 to 10 items</span>
        </div>
        <input
          id="question-count-slider" type="range" min={3} max={10} value={questionCount}
          onChange={(e) => onQuestionCountChange(Number(e.target.value))}
          className="w-full accent-[#D97706] cursor-pointer h-2 bg-[#E8E3D8]/60 rounded-lg"
        />
      </div>

      <div className="w-full sm:w-auto space-y-1">
        <span className="text-xs font-bold text-[#2D2A26]/80 block">Question Mix</span>
        <div className="flex p-1 bg-[#E8E3D8]/80 rounded-xl border border-[#2D2A26]/10 gap-1">
          {MIX_OPTIONS.map((opt) => (
            <button
              key={opt.id} type="button" onClick={() => onQuestionMixChange(opt.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                questionMix === opt.id ? 'bg-white text-[#2D2A26] shadow-2xs' : 'text-[#2D2A26]/70 hover:bg-white/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      <input
        type="text" value={customFocus} onChange={(e) => onCustomFocusChange(e.target.value)}
        placeholder="Custom Quiz Focus (e.g. key vocabulary, common misconceptions, exam questions)..."
        className="flex-1 px-3 py-2 text-xs bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-xl text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none focus:border-[#D97706]"
      />
      <button
        type="button" disabled={isLoading} onClick={onGenerate}
        className="px-4 py-2 bg-[#2D2A26] hover:bg-black text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shrink-0"
      >
        <Sparkles className={`w-3.5 h-3.5 text-[#F59E0B] ${isLoading ? 'animate-spin' : ''}`} />
        <span>{isLoading ? 'Synthesising…' : 'Synthesise Quiz Draft ✨'}</span>
      </button>
    </div>
  </div>
);
