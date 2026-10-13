import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface ElementStudioHeaderProps {
  onClose: () => void;
}

export const ElementStudioHeader: React.FC<ElementStudioHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 bg-white">
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-amber-100 border border-amber-300 rounded-2xl">
          <Sparkles className="w-5 h-5 text-amber-800" />
        </div>
        <div>
          <h2 className="text-base font-black text-stone-900">Element Animation Studio</h2>
          <p className="text-xs text-stone-500 font-medium">Fine-tune entrance timing, multi-repeat emphasis, triggers, and speed</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="p-2 bg-stone-100 hover:bg-stone-200 rounded-2xl text-stone-600 cursor-pointer transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
