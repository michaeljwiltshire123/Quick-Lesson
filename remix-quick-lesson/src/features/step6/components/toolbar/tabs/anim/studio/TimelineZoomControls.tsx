import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface TimelineZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const TimelineZoomControls: React.FC<TimelineZoomControlsProps> = ({
  zoomLevel, onZoomIn, onZoomOut, onResetZoom,
}) => {
  return (
    <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
      <button
        type="button"
        onClick={onZoomOut}
        disabled={zoomLevel <= 0.75}
        className="p-1 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white disabled:opacity-40 cursor-pointer"
        title="Zoom out timeline"
      >
        <ZoomOut className="w-3 h-3" />
      </button>

      <span className="text-[10px] font-mono font-bold text-stone-700 px-1 min-w-[32px] text-center">
        {Math.round(zoomLevel * 100)}%
      </span>

      <button
        type="button"
        onClick={onZoomIn}
        disabled={zoomLevel >= 1.5}
        className="p-1 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-white disabled:opacity-40 cursor-pointer"
        title="Zoom in timeline"
      >
        <ZoomIn className="w-3 h-3" />
      </button>

      {zoomLevel !== 1 && (
        <button
          type="button"
          onClick={onResetZoom}
          className="p-1 rounded-lg text-amber-800 hover:bg-amber-100 cursor-pointer"
          title="Reset zoom to 100%"
        >
          <RotateCcw className="w-2.5 h-2.5" />
        </button>
      )}
    </div>
  );
};
