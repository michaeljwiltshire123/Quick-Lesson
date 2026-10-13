import React, { useState } from 'react';
import { buildYouTubeEmbedUrl, extractYouTubeId } from '../../../../../utils/videoLinkValidator';
import { VideoTrimTimeInputs } from './VideoTrimTimeInputs';
import { Play, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface VideoPlaybackMiniInspectorProps {
  content?: string;
  meta?: Record<string, any>;
  onUpdateMeta: (patch: Record<string, any>) => void;
}

export const VideoPlaybackMiniInspector: React.FC<VideoPlaybackMiniInspectorProps> = ({
  content = '', meta = {}, onUpdateMeta,
}) => {
  const [isAuditioning, setIsAuditioning] = useState(false);
  const startSec = meta.startSec ?? meta.loopStartSec ?? 0;
  const endSec = meta.endSec ?? meta.loopEndSec ?? 0;
  const playbackMode = meta.playbackMode || (meta.isAutoplay ? 'auto' : 'click');
  const isMuted = Boolean(meta.isMuted);

  const previewEmbedUrl = buildYouTubeEmbedUrl(content, {
    autoplay: isAuditioning,
    mute: isMuted,
    start: startSec > 0 ? startSec : undefined,
    end: endSec > 0 ? endSec : undefined,
    clean: true,
  });

  const ytId = extractYouTubeId(content);
  if (!content || (!ytId && !content.includes('drive.google.com'))) return null;

  return (
    <div className="space-y-2 p-2.5 rounded-2xl bg-white border border-stone-200 shadow-xs text-stone-800 animate-in fade-in">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-stone-900 border border-stone-300 shadow-inner">
        <iframe
          src={previewEmbedUrl}
          title="Video Playback Preview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          className="w-full h-full border-none pointer-events-auto"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-stone-600 block">Start Playback</label>
        <div className="grid grid-cols-3 gap-1 bg-stone-100 p-0.5 rounded-xl border border-stone-200">
          {[
            { id: 'click', label: 'On Click' },
            { id: 'auto', label: 'Automatically' },
            { id: 'manual', label: 'Manual' },
          ].map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => onUpdateMeta({ playbackMode: mode.id, isAutoplay: mode.id === 'auto' })}
              className={`py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${
                playbackMode === mode.id ? 'bg-amber-800 text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <VideoTrimTimeInputs
        startSec={startSec}
        endSec={endSec}
        onChangeStart={(s) => onUpdateMeta({ startSec: s, loopStartSec: s })}
        onChangeEnd={(e) => onUpdateMeta({ endSec: e, loopEndSec: e })}
      />

      <div className="flex items-center justify-between pt-0.5">
        <button
          type="button"
          onClick={() => onUpdateMeta({ isMuted: !isMuted })}
          className={`px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
            isMuted ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-stone-50 border-stone-200 text-stone-700'
          }`}
        >
          {isMuted ? <VolumeX className="w-3 h-3 text-amber-700" /> : <Volume2 className="w-3 h-3 text-stone-500" />}
          <span>{isMuted ? 'Muted' : 'Audio On'}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsAuditioning(!isAuditioning)}
          className="px-2.5 py-1 bg-amber-100/80 hover:bg-amber-200 border border-amber-300 text-amber-950 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
        >
          {isAuditioning ? <Sparkles className="w-3 h-3 text-amber-700 animate-spin" /> : <Play className="w-3 h-3 text-amber-800" />}
          <span>{isAuditioning ? 'Auditioning Cut...' : 'Test Audition Cut'}</span>
        </button>
      </div>
    </div>
  );
};
