import React from 'react';
import { Layers, Wand2, Zap, Clock, CheckSquare, Square } from 'lucide-react';
import { SlideElement } from '../../../../types/slideTypes';

interface ElementStudioBulkToolbarProps {
  elements: SlideElement[];
  selectedIds: string[];
  onToggleSelectAll: () => void;
  onApplyBulkStagger: () => void;
  onApplyBulkTrigger: (trigger: string) => void;
  onApplyBulkDuration: (duration: number) => void;
}

export const ElementStudioBulkToolbar: React.FC<ElementStudioBulkToolbarProps> = ({
  elements, selectedIds, onToggleSelectAll, onApplyBulkStagger, onApplyBulkTrigger, onApplyBulkDuration,
}) => {
  const allSelected = elements.length > 0 && selectedIds.length === elements.length;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-white border border-stone-200 rounded-xl text-xs">
      <div className="flex items-center gap-2">
        <button
          type="button" onClick={onToggleSelectAll}
          className="flex items-center gap-1.5 font-bold text-stone-800 hover:text-amber-900 cursor-pointer text-xs"
        >
          {allSelected ? <CheckSquare className="w-3.5 h-3.5 text-amber-800" /> : <Square className="w-3.5 h-3.5 text-stone-400" />}
          <span>{allSelected ? 'All Selected' : 'Select All'} ({selectedIds.length}/{elements.length})</span>
        </button>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          type="button" onClick={onApplyBulkStagger}
          className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 rounded-lg font-bold text-[10.5px] flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
          title="Auto-stagger selected elements with +0.2s delays"
        >
          <Wand2 className="w-3 h-3 text-amber-800" />
          <span>Cascade Stagger (+0.2s)</span>
        </button>

        <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
          <button
            type="button" onClick={() => onApplyBulkTrigger('onClick')}
            className="px-2 py-0.5 hover:bg-white rounded text-[10px] font-bold text-stone-700 cursor-pointer"
          >
            All On-Click
          </button>
          <button
            type="button" onClick={() => onApplyBulkTrigger('withPrevious')}
            className="px-2 py-0.5 hover:bg-white rounded text-[10px] font-bold text-stone-700 cursor-pointer"
          >
            All Together
          </button>
        </div>

        <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
          <button
            type="button" onClick={() => onApplyBulkDuration(0.5)}
            className="px-1.5 py-0.5 hover:bg-white rounded text-[10px] font-bold text-stone-700 cursor-pointer"
          >
            0.5s Fast
          </button>
          <button
            type="button" onClick={() => onApplyBulkDuration(1.0)}
            className="px-1.5 py-0.5 hover:bg-white rounded text-[10px] font-bold text-stone-700 cursor-pointer"
          >
            1.0s Smooth
          </button>
        </div>
      </div>
    </div>
  );
};
