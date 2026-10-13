import React from 'react';
import { Play, VolumeX, Repeat, QrCode, Link2 } from 'lucide-react';

interface VideoPlaybackControlsProps {
  content?: string;
  meta?: Record<string, any>;
  onUpdateContent?: (url: string) => void;
  onUpdateMeta: (patch: Record<string, any>) => void;
}

export const VideoPlaybackControls: React.FC<VideoPlaybackControlsProps> = ({
  content = '', meta = {}, onUpdateContent, onUpdateMeta,
}) => {
  const isMuted = Boolean(meta.isMuted);
  const isAutoplay = Boolean(meta.isAutoplay);
  const isLoop = Boolean(meta.isLoop);
  const hasQrCode = Boolean(meta.hasHandoutQrCode);

  return (
    <div className="space-y-2 pt-1 text-xs text-stone-700">
      <div className="space-y-1">
        <label className="text-[10px] text-stone-600 font-semibold flex items-center gap-1">
          <Link2 className="w-3 h-3 text-amber-700" />
          <span>Video Link (YouTube, Vimeo, Google Drive)</span>
        </label>
        <input
          type="text"
          value={content.startsWith('http') ? content : ''}
          placeholder="https://www.youtube.com/watch?v=..."
          onChange={(e) => onUpdateContent?.(e.target.value)}
          className="w-full text-[11px] p-1.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600 font-medium"
        />
      </div>

      <div className="space-y-1.5 pt-1 border-t border-stone-200">
        <span className="text-[10px] text-stone-500 font-semibold">Playback Controls</span>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => onUpdateMeta({ isMuted: !isMuted })}
            className={`p-1.5 rounded-lg border text-[10px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
              isMuted ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <VolumeX className="w-3 h-3 text-amber-700" />
            <span>{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateMeta({ isAutoplay: !isAutoplay })}
            className={`p-1.5 rounded-lg border text-[10px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
              isAutoplay ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Play className="w-3 h-3 text-amber-700" />
            <span>{isAutoplay ? 'Autoplay On' : 'Click to Play'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <button
            type="button"
            onClick={() => onUpdateMeta({ isLoop: !isLoop })}
            className={`flex-1 py-1 px-1.5 rounded-lg border text-[10px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
              isLoop ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Repeat className="w-3 h-3 text-amber-700" />
            <span>Loop Playback</span>
          </button>
        </div>

        <div className="pt-1 border-t border-stone-200/80">
          <button
            type="button"
            onClick={() => onUpdateMeta({ hasHandoutQrCode: !hasQrCode })}
            className={`w-full py-1.5 px-2 rounded-lg border text-[10px] font-semibold flex items-center justify-between cursor-pointer transition-colors ${
              hasQrCode ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-emerald-700" />
              <span>Handout QR Code on Print</span>
            </span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${hasQrCode ? 'bg-emerald-200 text-emerald-950' : 'bg-stone-200 text-stone-600'}`}>
              {hasQrCode ? 'Active' : 'Off'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
