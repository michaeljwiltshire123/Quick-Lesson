import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { Scissors, Play, Video, HelpCircle } from 'lucide-react';

interface VideoTrimControlsProps {
  selectedElement?: SlideElement;
  onUpdateElementMeta: (elementId: string, meta: Record<string, any>) => void;
}

export const VideoTrimControls: React.FC<VideoTrimControlsProps> = ({
  selectedElement,
  onUpdateElementMeta,
}) => {
  const isVideo = selectedElement?.type === 'video';
  const startTime = selectedElement?.meta?.startTime ?? 0;
  const endTime = selectedElement?.meta?.endTime ?? 60;
  const pauseCue = selectedElement?.meta?.pauseCue || '';

  const handleUpdate = (patch: Record<string, any>) => {
    if (!selectedElement) return;
    onUpdateElementMeta(selectedElement.id, {
      ...(selectedElement.meta || {}),
      ...patch,
    });
  };

  return (
    <div className="space-y-3 pt-3 border-t border-stone-100">
      <div className="flex items-center gap-2 pb-1 border-b border-stone-100">
        <Scissors className="w-4 h-4 text-amber-700" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">Video Timestamps & Discussion Cue</h3>
      </div>

      {!isVideo ? (
        <div className="p-3 bg-stone-50 rounded-xl border border-dashed border-stone-200 text-center space-y-1">
          <Video className="w-4 h-4 text-stone-400 mx-auto" />
          <p className="text-[11px] text-stone-500 font-medium">Select a video on the canvas to set playback timestamps.</p>
        </div>
      ) : (
        <div className="space-y-2.5 bg-amber-50/50 p-3 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between text-[11px] font-bold text-amber-950">
            <span>Playback Window</span>
            <span className="flex items-center gap-1 text-amber-800">
              <Play className="w-3 h-3" /> {Math.max(1, endTime - startTime)}s duration
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1 text-[10px] font-semibold text-stone-600">
              <span>Start (sec)</span>
              <input
                type="number" min={0} value={startTime}
                onChange={(e) => handleUpdate({ startTime: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full text-xs font-bold bg-white border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-amber-600"
              />
            </label>

            <label className="flex flex-col gap-1 text-[10px] font-semibold text-stone-600">
              <span>End (sec)</span>
              <input
                type="number" min={startTime + 1} value={endTime}
                onChange={(e) => handleUpdate({ endTime: Math.max(startTime + 1, parseInt(e.target.value) || startTime + 1) })}
                className="w-full text-xs font-bold bg-white border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-amber-600"
              />
            </label>
          </div>

          <div className="space-y-1 pt-1">
            <label className="flex items-center gap-1 text-[10px] font-bold text-amber-950">
              <HelpCircle className="w-3 h-3 text-amber-700" />
              <span>Pause-Point Discussion Cue</span>
            </label>
            <input
              type="text"
              value={pauseCue}
              onChange={(e) => handleUpdate({ pauseCue: e.target.value })}
              placeholder="e.g. Pause at 0:25 to ask: why did the reaction accelerate?"
              className="w-full text-[11px] bg-white border border-amber-300 rounded-lg p-2 text-amber-950 focus:outline-none focus:border-amber-700"
            />
          </div>
        </div>
      )}
    </div>
  );
};
