import React, { useState } from 'react';
import { parseTimestampToSeconds, formatSecondsToTimestamp } from '../../../../../utils/videoLinkValidator';
import { VideoBookmark } from '../../../../../types/videoFeatureTypes';
import { Sparkles, Repeat, Bookmark } from 'lucide-react';

interface VideoStageAndLoopControlsProps {
  meta?: Record<string, any>;
  onUpdateMeta: (patch: Record<string, any>) => void;
}

export const VideoStageAndLoopControls: React.FC<VideoStageAndLoopControlsProps> = ({
  meta = {}, onUpdateMeta,
}) => {
  // Stage mode is ON by default
  const isStageMode = meta.isStageMode !== false;
  const isLoopSegment = Boolean(meta.isLoopSegment);
  const startSec = meta.loopStartSec ?? 0;
  const endSec = meta.loopEndSec ?? 10;
  const bookmarks: VideoBookmark[] = meta.bookmarks || [];

  const [bmTime, setBmTime] = useState('00:30');
  const [bmLabel, setBmLabel] = useState('');

  const handleAddBookmark = () => {
    if (!bmLabel.trim()) return;
    const newBm: VideoBookmark = {
      id: `bm-${Date.now()}`,
      timeSec: parseTimestampToSeconds(bmTime),
      label: bmLabel.trim(),
    };
    onUpdateMeta({ bookmarks: [...bookmarks, newBm] });
    setBmLabel('');
  };

  return (
    <div className="space-y-2.5 pt-1 text-xs text-stone-700">
      <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 text-stone-100">
        <div>
          <div className="font-bold text-[11px] flex items-center gap-1.5 text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Video Stage Mode (Screen Dimmer)</span>
          </div>
          <div className="text-[9.5px] text-stone-400">Dims slide background 80% while video plays</div>
        </div>
        <button
          type="button"
          onClick={() => onUpdateMeta({ isStageMode: !isStageMode })}
          className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
            isStageMode ? 'bg-amber-400 text-stone-950 shadow-xs' : 'bg-stone-800 text-stone-400 border border-stone-700'
          }`}
        >
          {isStageMode ? 'Active' : 'Off'}
        </button>
      </div>

      <div className="space-y-1.5 p-2 rounded-xl bg-stone-50 border border-stone-200">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[10.5px] text-stone-800 flex items-center gap-1">
            <Repeat className="w-3 h-3 text-amber-700" />
            <span>Micro-Loop Segment (A-B Looping)</span>
          </span>
          <input
            type="checkbox" checked={isLoopSegment}
            onChange={(e) => onUpdateMeta({ isLoopSegment: e.target.checked })}
            className="accent-amber-700 cursor-pointer"
          />
        </div>
        {isLoopSegment && (
          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1">
              <label className="text-[9px] text-stone-500 font-bold block">Start Sec</label>
              <input type="number" min={0} value={startSec} onChange={(e) => onUpdateMeta({ loopStartSec: Number(e.target.value) })} className="w-full p-1 bg-white border border-stone-300 rounded text-center text-xs font-mono font-bold" />
            </div>
            <span className="text-stone-400 pt-3">to</span>
            <div className="flex-1">
              <label className="text-[9px] text-stone-500 font-bold block">End Sec</label>
              <input type="number" min={startSec + 1} value={endSec} onChange={(e) => onUpdateMeta({ loopEndSec: Number(e.target.value) })} className="w-full p-1 bg-white border border-stone-300 rounded text-center text-xs font-mono font-bold" />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-1.5 pt-1 border-t border-stone-200">
        <label className="text-[10px] text-stone-600 font-semibold flex items-center gap-1">
          <Bookmark className="w-3 h-3 text-amber-700" />
          <span>Timestamp Jump Bookmarks</span>
        </label>
        <div className="flex gap-1">
          <input type="text" value={bmTime} placeholder="00:30" onChange={(e) => setBmTime(e.target.value)} className="w-16 p-1 bg-white border border-stone-300 rounded-lg text-xs font-mono text-center" />
          <input type="text" value={bmLabel} placeholder="e.g. Reaction phase" onChange={(e) => setBmLabel(e.target.value)} className="flex-1 p-1 bg-white border border-stone-300 rounded-lg text-xs" />
          <button type="button" onClick={handleAddBookmark} disabled={!bmLabel.trim()} className="px-2 bg-amber-800 hover:bg-amber-900 disabled:opacity-40 text-white rounded-lg font-bold text-xs cursor-pointer">+</button>
        </div>
        {bookmarks.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {bookmarks.map((bm) => (
              <span key={bm.id} className="bg-amber-50 border border-amber-300 text-amber-950 px-1.5 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
                <span className="font-mono font-bold">{formatSecondsToTimestamp(bm.timeSec)}</span>: {bm.label}
                <button type="button" onClick={() => onUpdateMeta({ bookmarks: bookmarks.filter((b) => b.id !== bm.id) })} className="hover:text-rose-600 cursor-pointer ml-0.5">&times;</button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
