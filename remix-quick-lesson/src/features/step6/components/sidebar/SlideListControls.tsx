import React from 'react';
import { Plus, Copy, Trash2 } from 'lucide-react';

interface SlideListControlsProps {
  slidesCount: number;
  activeIndex: number;
  onAddBlank: () => void;
  onDuplicate: (index: number) => void;
  onDelete: (index: number) => void;
}

export const SlideListControls: React.FC<SlideListControlsProps> = ({
  slidesCount,
  activeIndex,
  onAddBlank,
  onDuplicate,
  onDelete,
}) => {
  return (
    <div className="pt-3 border-t border-stone-200/80 space-y-2">
      <button
        type="button"
        onClick={onAddBlank}
        className="w-full py-2.5 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Add Blank Slide</span>
      </button>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onDuplicate(activeIndex)}
          className="py-2 px-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 active:scale-[0.99] text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          title="Duplicate the currently selected slide"
        >
          <Copy className="w-3.5 h-3.5 text-stone-500" />
          <span>Duplicate</span>
        </button>

        <button
          type="button"
          disabled={slidesCount <= 1}
          onClick={() => onDelete(activeIndex)}
          className="py-2 px-2.5 rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-100 text-red-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
          title="Delete the currently selected slide"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-500" />
          <span>Delete</span>
        </button>
      </div>

      <p className="text-[11px] text-stone-400 text-center italic pt-0.5">
        Tip: Drag and drop a slide directly onto another to merge them.
      </p>
    </div>
  );
};
