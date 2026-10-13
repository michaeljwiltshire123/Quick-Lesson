import React, { useState } from 'react';
import { SlideElement } from '../../../types/slideTypes';
import { buildYouTubeEmbedUrl, extractYouTubeId } from '../../../utils/videoLinkValidator';
import { Play, HelpCircle, Check, Smartphone } from 'lucide-react';

interface CanvasInteractiveVideoPlayerProps {
  element: SlideElement;
}

export const CanvasInteractiveVideoPlayer: React.FC<CanvasInteractiveVideoPlayerProps> = ({ element }) => {
  const meta = element.meta || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const isShorts = meta.aspectRatio === '9:16';
  const isDirectVideo = /\.(mp4|webm|ogg)(?:$|[?#])/i.test(element.content) || element.content.startsWith('data:video/');
  const ytId = extractYouTubeId(element.content);
  const posterUrl = meta.customPosterUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);

  const embedUrl = buildYouTubeEmbedUrl(element.content, {
    autoplay: isPlaying,
    mute: Boolean(meta.isMuted),
    loop: Boolean(meta.isLoop || meta.isLoopSegment),
    start: meta.loopStartSec,
    end: meta.loopEndSec,
    captions: Boolean(meta.forceCaptions),
    clean: meta.isClassroomClean !== false,
  });

  return (
    <div className={`relative w-full h-full flex items-center justify-center bg-stone-950 select-none overflow-hidden ${isShorts ? 'max-w-[56.25%] mx-auto rounded-2xl border-4 border-stone-800 shadow-2xl' : 'rounded-[inherit]'}`}>
      {isPlaying ? (
        isDirectVideo ? <video src={element.content} controls autoPlay className="w-full h-full" /> : <iframe
          src={embedUrl}
          title={element.caption || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-none pointer-events-auto"
        />
      ) : (
        <div
          onClick={(e) => { e.stopPropagation(); setIsPlaying(true); }}
          className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer group bg-cover bg-center"
          style={posterUrl ? { backgroundImage: `url(${posterUrl})` } : undefined}
        >
          <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/20 transition-colors" />
          <div className="relative z-10 w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-xl text-white transform group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 ml-1" />
          </div>
          <span className="relative z-10 mt-2 text-[11px] font-bold text-white bg-stone-900/80 px-2.5 py-0.5 rounded-full backdrop-blur-xs max-w-[85%] truncate">
            {element.caption || 'Click to Play'}
          </span>
          {isShorts && (
            <div className="absolute top-2 left-2 z-10 bg-amber-500 text-stone-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-1 shadow">
              <Smartphone className="w-3 h-3" /> Shorts
            </div>
          )}
        </div>
      )}

      {activeQuestion && (
        <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-4 text-center animate-in fade-in">
          <HelpCircle className="w-8 h-8 text-amber-400 mb-2" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">Checking for Understanding</span>
          <p className="text-sm font-bold text-white my-2">{activeQuestion}</p>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setActiveQuestion(null); }}
            className="mt-2 py-1 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer shadow"
          >
            <Check className="w-3.5 h-3.5" /> Continue Video
          </button>
        </div>
      )}
    </div>
  );
};
