import React from 'react';
import { Wand2, RotateCcw, Trash2, Layers } from 'lucide-react';
import { TimelineZoomControls } from './TimelineZoomControls';

interface TimelineSequenceHeaderProps {
  totalElements: number;
  selectedCount: number;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onResetSequence: () => void;
  onBulkClearSelected: () => void;
}

export const TimelineSequenceHeader: React.FC<TimelineSequenceHeaderProps> = ({
  totalElements, selectedCount, zoomLevel, onZoomIn, onZoomOut, onResetZoom,
  onResetSequence, onBulkClearSelected,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2 select-none">
      <div className="flex items-center gap-2">
        <span className="font-black text-stone-900 flex items-center gap-1.5 text-xs">
          <Wand2 className="w-4 h-4 text-amber-700" />
          <span>Slide Animation Sequence</span>
        </span>
        <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
          {totalElements} Elements
        </span>
        {selectedCount > 1 && (
          <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
            <Layers className="w-3 h-3 text-amber-800" />
            <span>{selectedCount} Selected</span>
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {selectedCount > 1 && (
          <button
            type="button"
            onClick={onBulkClearSelected}
            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded-xl font-bold text-[10.5px] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
            title="Remove all animations from currently selected elements"
          >
            <Trash2 className="w-3 h-3 text-rose-600" />
            <span>Clear Selected ({selectedCount})</span>
          </button>
        )}

        <button
          type="button"
          onClick={onResetSequence}
          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-xl font-bold text-[10.5px] flex items-center gap-1 cursor-pointer transition-colors"
          title="Reset sequence: removes all animation steps on this slide"
        >
          <RotateCcw className="w-3 h-3 text-stone-500" />
          <span>Reset Sequence</span>
        </button>

        <TimelineZoomControls
          zoomLevel={zoomLevel}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onResetZoom={onResetZoom}
        />
      </div>
    </div>
  );
};
