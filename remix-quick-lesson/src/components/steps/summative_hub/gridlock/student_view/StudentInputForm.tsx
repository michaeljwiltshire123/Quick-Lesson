import React from 'react';
import { Send } from 'lucide-react';

interface Props {
  typedText: string;
  letter: string;
  timeLeft: number;
  disabled?: boolean;
  onTypedTextChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const StudentInputForm: React.FC<Props> = ({
  typedText,
  letter,
  timeLeft,
  disabled,
  onTypedTextChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
          Your Written Answer (Typo-Tolerant)
        </label>
        <input
          type="text"
          value={typedText}
          disabled={disabled || timeLeft === 0}
          onChange={(e) => onTypedTextChange(e.target.value)}
          placeholder={`Type word starting with ${letter}...`}
          className="w-full px-4 py-3 bg-white border border-[#2D2A26]/20 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2D2A26] focus:outline-hidden"
          autoFocus
        />
      </div>

      <button
        type="submit"
        disabled={!typedText.trim() || disabled || timeLeft === 0}
        className="w-full py-3 bg-[#2D2A26] text-white font-bold text-sm rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>Lock In Answer ({timeLeft}s)</span>
      </button>
    </form>
  );
};
