import React, { useState } from 'react';
import { VideoCheckpoint } from '../../../../../types/videoFeatureTypes';
import { parseTimestampToSeconds, formatSecondsToTimestamp } from '../../../../../utils/videoLinkValidator';
import { VideoAutoFlowExportPreview } from './VideoAutoFlowExportPreview';
import { HelpCircle, Plus, Trash2, Clock, PlayCircle } from 'lucide-react';

interface VideoCheckpointsControlsProps {
  checkpoints?: VideoCheckpoint[];
  meta?: Record<string, any>;
  onUpdateMeta: (patch: Record<string, any>) => void;
}

export const VideoCheckpointsControls: React.FC<VideoCheckpointsControlsProps> = ({
  checkpoints = [], meta = {}, onUpdateMeta,
}) => {
  const [timeInput, setTimeInput] = useState('00:45');
  const [questionInput, setQuestionInput] = useState('');

  const handleUseCurrentTime = () => {
    const playhead = meta.currentPlayheadSec ?? meta.startSec ?? 45;
    setTimeInput(formatSecondsToTimestamp(playhead));
  };

  const handleAdd = () => {
    if (!questionInput.trim()) return;
    const newCp: VideoCheckpoint = {
      id: `cp-${Date.now()}`,
      timeSec: parseTimestampToSeconds(timeInput),
      timeStr: timeInput.trim() || '00:45',
      question: questionInput.trim(),
    };
    onUpdateMeta({ checkpoints: [...checkpoints, newCp] });
    setQuestionInput('');
  };

  return (
    <div className="space-y-2 pt-1 text-xs text-stone-700">
      <div className="space-y-1.5 bg-amber-50/70 p-2 rounded-xl border border-amber-200">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-amber-950 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Add Question Checkpoint</span>
          </span>
          <button
            type="button"
            onClick={handleUseCurrentTime}
            className="text-[9.5px] font-bold text-amber-900 bg-amber-200/80 hover:bg-amber-300 px-1.5 py-0.5 rounded flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
            title="Set pause marker to the current video timestamp"
          >
            <Clock className="w-3 h-3 text-amber-800" />
            <span>Use Current Time</span>
          </button>
        </div>

        <div className="flex gap-1.5">
          <input
            type="text"
            value={timeInput}
            placeholder="00:45"
            onChange={(e) => setTimeInput(e.target.value)}
            className="w-18 text-[11px] p-1.5 bg-white border border-stone-300 rounded-lg text-center font-mono font-bold"
          />
          <input
            type="text"
            value={questionInput}
            placeholder="Prompt to discuss with class..."
            onChange={(e) => setQuestionInput(e.target.value)}
            className="flex-1 text-[11px] p-1.5 bg-white border border-stone-300 rounded-lg font-medium"
          />
        </div>

        <button
          type="button"
          disabled={!questionInput.trim()}
          onClick={handleAdd}
          className="w-full py-1.5 bg-amber-800 hover:bg-amber-900 disabled:opacity-40 text-white rounded-lg font-bold text-[10.5px] flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Checkpoint Marker</span>
        </button>
      </div>

      <div className="space-y-1">
        {checkpoints.map((cp) => (
          <div key={cp.id} className="p-1.5 bg-white border border-stone-200 rounded-lg flex items-center justify-between gap-1 shadow-2xs">
            <span className="font-mono font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded text-[10px] flex items-center gap-0.5 shrink-0">
              <Clock className="w-2.5 h-2.5 text-amber-700" /> {cp.timeStr}
            </span>
            <span className="truncate text-[11px] text-stone-800 font-medium flex-1">{cp.question}</span>
            <button type="button" onClick={() => onUpdateMeta({ checkpoints: checkpoints.filter((c) => c.id !== cp.id) })} className="p-1 text-stone-400 hover:text-rose-600 rounded cursor-pointer">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <VideoAutoFlowExportPreview
        checkpoints={checkpoints}
        autoSliceOnExport={meta.autoSliceOnExport !== false}
        onToggleAutoSlice={(val) => onUpdateMeta({ autoSliceOnExport: val })}
      />
    </div>
  );
};
