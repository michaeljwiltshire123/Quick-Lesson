import React from 'react';
import { VideoCheckpoint } from '../../../../../types/videoFeatureTypes';
import { formatSecondsToTimestamp } from '../../../../../utils/videoLinkValidator';
import { Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface VideoAutoFlowExportPreviewProps {
  checkpoints: VideoCheckpoint[];
  autoSliceOnExport?: boolean;
  onToggleAutoSlice: (val: boolean) => void;
}

export const VideoAutoFlowExportPreview: React.FC<VideoAutoFlowExportPreviewProps> = ({
  checkpoints, autoSliceOnExport = true, onToggleAutoSlice,
}) => {
  if (checkpoints.length === 0) return null;

  const sorted = [...checkpoints].sort((a, b) => a.timeSec - b.timeSec);
  const slices: { part: number; start: string; end: string; question: string }[] = [];

  let lastSec = 0;
  sorted.forEach((cp, idx) => {
    slices.push({
      part: idx + 1,
      start: formatSecondsToTimestamp(lastSec),
      end: cp.timeStr,
      question: cp.question,
    });
    lastSec = cp.timeSec;
  });

  return (
    <div className="p-2 bg-emerald-50/70 border border-emerald-200/90 rounded-xl space-y-1.5 text-stone-800">
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] font-bold text-emerald-950 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-emerald-700" />
          <span>Auto-Flow Google Slides Export</span>
        </span>
        <button
          type="button"
          onClick={() => onToggleAutoSlice(!autoSliceOnExport)}
          className={`px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer transition-colors ${
            autoSliceOnExport ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
          }`}
        >
          {autoSliceOnExport ? 'Active' : 'Off'}
        </button>
      </div>

      <p className="text-[9.5px] text-emerald-800 leading-tight">
        Automatically duplicates slides & slices video timestamps so questions pause seamlessly in Google Slides.
      </p>

      <div className="space-y-1 pt-0.5">
        {slices.map((sl, i) => (
          <div key={i} className="text-[9.5px] bg-white/90 p-1 rounded border border-emerald-100 flex items-center justify-between">
            <span className="font-semibold text-stone-700">Slide: Video ({sl.start}–{sl.end})</span>
            <span className="text-emerald-700 font-bold truncate max-w-[50%]">→ Question Card</span>
          </div>
        ))}
        <div className="text-[9.5px] bg-white/90 p-1 rounded border border-emerald-100 flex items-center justify-between">
          <span className="font-semibold text-stone-700">Slide: Video ({formatSecondsToTimestamp(lastSec)}–End)</span>
          <span className="text-stone-400 font-medium">Finish line</span>
        </div>
      </div>
    </div>
  );
};
