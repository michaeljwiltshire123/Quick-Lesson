import React from 'react';
import { Wand2 } from 'lucide-react';

interface AutoSuggestButtonProps {
  onAutoSuggest: () => void;
  disabled: boolean;
}

export const AutoSuggestButton: React.FC<AutoSuggestButtonProps> = ({
  onAutoSuggest,
  disabled,
}) => {
  return (
    <button
      onClick={onAutoSuggest}
      disabled={disabled}
      title={disabled ? 'Generate discussion sparks for chunks first' : 'Automatically select and attach two optimal diagnostic sparks per chunk'}
      className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <Wand2 className="w-4 h-4 text-amber-200" />
      <span>Auto suggest and attach</span>
    </button>
  );
};
