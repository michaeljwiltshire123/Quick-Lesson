import React from 'react';
import { Briefcase, Compass } from 'lucide-react';
import { ImposterQuestion } from '../../types/imposterTypes';

interface Props {
  question: ImposterQuestion;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const RealWorldAppInput: React.FC<Props> = ({
  question,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div id="real-world-app-input" className="p-4 bg-white rounded-2xl border border-[#2D2A26]/15 space-y-3 shadow-2xs">
      <div className="flex items-center gap-2">
        <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
          <Briefcase className="w-4 h-4" />
        </span>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Real-World Example
          </span>
          <h4 className="text-xs font-bold text-[#2D2A26]">Where do we see this in everyday life?</h4>
        </div>
      </div>

      <p className="text-xs text-[#2D2A26]/85 font-medium leading-relaxed">
        {question.prompt}
      </p>

      {question.contextHint && (
        <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-[11px] text-emerald-800 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
          <span>Topic Hint: {question.contextHint}</span>
        </div>
      )}

      <div className="space-y-1">
        <input
          type="text"
          disabled={disabled}
          placeholder="e.g. In the garden, In weather forecasts, In cooking"
          value={value}
          maxLength={40}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 rounded-xl text-sm font-semibold border border-[#2D2A26]/20 bg-[#F8F6F0] focus:bg-white focus:border-emerald-500 transition-all"
        />
        <p className="text-[10px] text-[#2D2A26]/60">
          Share where you would spot this in the real world.
        </p>
      </div>
    </div>
  );
};
