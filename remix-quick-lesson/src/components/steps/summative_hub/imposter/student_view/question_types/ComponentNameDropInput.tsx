import React from 'react';
import { Layers, AlertCircle } from 'lucide-react';
import { ImposterQuestion } from '../../types/imposterTypes';

interface Props {
  question: ImposterQuestion;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const ComponentNameDropInput: React.FC<Props> = ({
  question,
  value,
  onChange,
  disabled = false,
}) => {
  const forbidden = question.forbiddenTerm?.toLowerCase();
  const isViolatingForbidden = Boolean(
    forbidden && value.trim().toLowerCase().includes(forbidden)
  );

  return (
    <div id="component-name-drop-input" className="p-4 bg-white rounded-2xl border border-[#2D2A26]/15 space-y-3 shadow-2xs">
      <div className="flex items-center gap-2">
        <span className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
          <Layers className="w-4 h-4" />
        </span>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
            Key Detail
          </span>
          <h4 className="text-xs font-bold text-[#2D2A26]">Name an important part or idea</h4>
        </div>
      </div>

      <p className="text-xs text-[#2D2A26]/85 font-medium leading-relaxed">
        {question.prompt}
      </p>

      {question.forbiddenTerm && (
        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-700" />
          <span>Challenge: Try not to type the word <strong>"{question.forbiddenTerm}"</strong></span>
        </div>
      )}

      <div className="space-y-1">
        <input
          type="text"
          disabled={disabled}
          placeholder="Type your answer here..."
          value={value}
          maxLength={35}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full p-3 rounded-xl text-sm font-semibold border transition-all ${
            isViolatingForbidden
              ? 'border-rose-400 bg-rose-50 text-rose-900'
              : 'border-[#2D2A26]/20 bg-[#F8F6F0] focus:bg-white focus:border-sky-500'
          }`}
        />
        {isViolatingForbidden && (
          <p className="text-[10px] font-bold text-rose-600">
            Remember: Try to describe it without the word "{question.forbiddenTerm}".
          </p>
        )}
      </div>
    </div>
  );
};
