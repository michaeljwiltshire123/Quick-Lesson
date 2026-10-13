import React from 'react';
import { Plus } from 'lucide-react';

interface OverlayAddButtonProps {
  onAdd: () => void;
  label?: string;
}

export const OverlayAddButton: React.FC<OverlayAddButtonProps> = ({
  onAdd,
  label = 'Add to Timeline',
}) => {
  return (
    <div className="pt-1 border-t border-stone-200/80">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAdd();
        }}
        className="w-full flex items-center justify-center gap-1.5 py-1 px-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-[11px] rounded-lg shadow-sm cursor-pointer transition-colors"
      >
        <Plus className="w-3.5 h-3.5 stroke-[3]" />
        <span>{label}</span>
      </button>
    </div>
  );
};
