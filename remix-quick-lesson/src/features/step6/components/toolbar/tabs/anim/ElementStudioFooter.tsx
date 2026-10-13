import React from 'react';
import { Check, Wand2, Trash2 } from 'lucide-react';

interface ElementStudioFooterProps {
  animationType: string;
  trigger: string;
  duration: number;
  applied: boolean;
  onApply: () => void;
  onClear: () => void;
}

export const ElementStudioFooter: React.FC<ElementStudioFooterProps> = ({
  animationType, trigger, duration, applied, onApply, onClear,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-3.5 border-t border-stone-200 bg-white">
      <span className="text-xs font-semibold text-stone-600">
        Configured: <strong className="text-amber-900 capitalize">{animationType.replace(/_/g, ' ')}</strong> ({trigger}, {duration.toFixed(1)}s)
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button" onClick={onClear}
          className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-stone-300"
        >
          <Trash2 className="w-3.5 h-3.5 text-stone-500" />
          <span>Clear Animation</span>
        </button>

        <button
          type="button" onClick={onApply}
          className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all"
        >
          {applied ? <Check className="w-4 h-4 text-emerald-300" /> : <Wand2 className="w-4 h-4 text-amber-300" />}
          <span>{applied ? 'Applied to Element!' : 'Apply Animation'}</span>
        </button>
      </div>
    </div>
  );
};
