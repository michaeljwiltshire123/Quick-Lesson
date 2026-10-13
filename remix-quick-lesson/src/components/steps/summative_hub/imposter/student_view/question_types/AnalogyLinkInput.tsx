import React from 'react';
import { Sparkles, Link as LinkIcon } from 'lucide-react';
import { ImposterQuestion } from '../../types/imposterTypes';

interface Props {
  question: ImposterQuestion;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const AnalogyLinkInput: React.FC<Props> = ({
  question,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div id="analogy-link-input" className="p-4 bg-white rounded-2xl border border-[#2D2A26]/15 space-y-3 shadow-2xs">
      <div className="flex items-center gap-2">
        <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
          <LinkIcon className="w-4 h-4" />
        </span>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
            Everyday Comparison
          </span>
          <h4 className="text-xs font-bold text-[#2D2A26]">What is it like in everyday life?</h4>
        </div>
      </div>

      <p className="text-xs text-[#2D2A26]/85 font-medium leading-relaxed">
        {question.prompt}
      </p>

      <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200/60 text-[11px] text-purple-900 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 shrink-0 text-purple-600" />
        <span>Complete the thought: "This reminds me of a..."</span>
      </div>

      <div className="space-y-1">
        <input
          type="text"
          disabled={disabled}
          placeholder="e.g. A sponge, A solar panel, A recipe"
          value={value}
          maxLength={35}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 rounded-xl text-sm font-semibold border border-[#2D2A26]/20 bg-[#F8F6F0] focus:bg-white focus:border-purple-500 transition-all"
        />
        <p className="text-[10px] text-[#2D2A26]/60">
          Give a simple everyday comparison.
        </p>
      </div>
    </div>
  );
};
