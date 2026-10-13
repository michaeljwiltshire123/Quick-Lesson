import React from 'react';
import { Activity, Zap } from 'lucide-react';
import { ImposterQuestion } from '../../types/imposterTypes';

interface Props {
  question: ImposterQuestion;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const ActionVerbInput: React.FC<Props> = ({
  question,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div id="action-verb-input" className="p-4 bg-white rounded-2xl border border-[#2D2A26]/15 space-y-3 shadow-2xs">
      <div className="flex items-center gap-2">
        <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
          <Activity className="w-4 h-4" />
        </span>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
            Action & Movement
          </span>
          <h4 className="text-xs font-bold text-[#2D2A26]">What happened or what action was taken?</h4>
        </div>
      </div>

      <p className="text-xs text-[#2D2A26]/85 font-medium leading-relaxed">
        {question.prompt}
      </p>

      <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 flex items-center gap-1.5">
        <Zap className="w-3.5 h-3.5 shrink-0 text-amber-600" />
        <span>Think about what happens: what is the main action?</span>
      </div>

      <div className="space-y-1">
        <input
          type="text"
          disabled={disabled}
          placeholder="e.g. Grows, Melts, Flows, Absorbs"
          value={value}
          maxLength={30}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 rounded-xl text-sm font-semibold border border-[#2D2A26]/20 bg-[#F8F6F0] focus:bg-white focus:border-amber-500 transition-all"
        />
        <p className="text-[10px] text-[#2D2A26]/60">
          Share the main action in one word or a short phrase.
        </p>
      </div>
    </div>
  );
};
