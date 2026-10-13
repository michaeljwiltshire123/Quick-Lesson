import React from 'react';
import { formatSecondsToTimestamp, parseTimestampToSeconds } from '../../../../../utils/videoLinkValidator';
import { Scissors, Clock } from 'lucide-react';

interface VideoTrimTimeInputsProps {
  startSec: number;
  endSec: number;
  currentPlayhead?: number;
  onChangeStart: (sec: number) => void;
  onChangeEnd: (sec: number) => void;
}

export const VideoTrimTimeInputs: React.FC<VideoTrimTimeInputsProps> = ({
  startSec, endSec, currentPlayhead = 0, onChangeStart, onChangeEnd,
}) => {
  const duration = Math.max(0, endSec - startSec);
  const durM = Math.floor(duration / 60);
  const durS = duration % 60;

  return (
    <div className="space-y-1.5 p-2 bg-stone-100/70 rounded-xl border border-stone-200">
      <div className="flex items-center justify-between text-[10px] font-bold text-stone-700">
        <span className="flex items-center gap-1">
          <Scissors className="w-3 h-3 text-amber-700" />
          <span>Trim Video Segment</span>
        </span>
        {duration > 0 && (
          <span className="text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded text-[9.5px]">
            {durM > 0 ? `${durM}m ` : ''}{durS}s clip
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="flex items-center justify-between mb-0.5">
            <label className="text-[9px] text-stone-500 font-bold">Start Time</label>
            <button
              type="button"
              onClick={() => onChangeStart(currentPlayhead)}
              className="text-[8.5px] font-bold text-amber-900 bg-amber-200/70 hover:bg-amber-300 px-1 rounded cursor-pointer"
            >
              Use Current
            </button>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-stone-400 shrink-0" />
            <input
              type="text"
              value={formatSecondsToTimestamp(startSec)}
              onChange={(e) => onChangeStart(parseTimestampToSeconds(e.target.value))}
              placeholder="00:00"
              className="w-full text-center text-xs font-mono font-bold p-1 bg-white border border-stone-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-0.5">
            <label className="text-[9px] text-stone-500 font-bold">End Time</label>
            <button
              type="button"
              onClick={() => onChangeEnd(currentPlayhead > startSec ? currentPlayhead : startSec + 30)}
              className="text-[8.5px] font-bold text-amber-900 bg-amber-200/70 hover:bg-amber-300 px-1 rounded cursor-pointer"
            >
              Use Current
            </button>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-stone-400 shrink-0" />
            <input
              type="text"
              value={endSec > 0 ? formatSecondsToTimestamp(endSec) : ''}
              onChange={(e) => onChangeEnd(parseTimestampToSeconds(e.target.value))}
              placeholder="End of clip"
              className="w-full text-center text-xs font-mono font-bold p-1 bg-white border border-stone-300 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
