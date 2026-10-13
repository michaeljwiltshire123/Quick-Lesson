import React, { useState } from 'react';
import { Film, HelpCircle, Zap, Search, Copy, Check, Clock, Play } from 'lucide-react';
import { PopCultureScene } from './presetData';

interface PopCultureSceneCardProps {
  scene: PopCultureScene;
  onApply: (scene: PopCultureScene) => void;
}

const TONES: Record<string, { label: string; cls: string }> = {
  funny: { label: '🎭 Spoof', cls: 'bg-pink-100 text-pink-900 border-pink-200' },
  serious: { label: '🎬 Drama', cls: 'bg-blue-100 text-blue-900 border-blue-200' },
  analytical: { label: '🔬 Test', cls: 'bg-emerald-100 text-emerald-950 border-emerald-200' },
};

export const PopCultureSceneCard: React.FC<PopCultureSceneCardProps> = ({ scene, onApply }) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const tone = (scene.tone && TONES[scene.tone]) ? TONES[scene.tone] : TONES.analytical;
  const query = scene.searchPhrase ? `${scene.searchPhrase} under 3 minutes` : `${scene.movieOrShow} ${scene.sceneTitle} clip under 3 minutes`;
  const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=EgIYAQ%3D%3D`;
  const thumbUrl = `https://img.youtube.com/vi/${scene.youtubeId || 'v_C9v4R7l1I'}/mqdefault.jpg`;

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-3 bg-white border border-[#2D2A26]/15 rounded-xl shadow-2xs flex flex-col justify-between space-y-2.5 hover:border-[#D97706]/40 transition-colors">
      <div className="space-y-2.5">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black border border-[#2D2A26]/10">
          {isPlaying && scene.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${scene.youtubeId}?autoplay=1`}
              title={scene.sceneTitle}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button type="button" onClick={() => setIsPlaying(true)} className="relative w-full h-full group cursor-pointer block text-left">
              <img src={thumbUrl} alt={scene.sceneTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
              </div>
            </button>
          )}
        </div>

        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Film className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
              <h4 className="text-sm font-bold text-[#2D2A26] leading-tight">{scene.sceneTitle}</h4>
              <span className="text-xs font-semibold text-[#D97706]">({scene.movieOrShow})</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${tone.cls}`}>{tone.label}</span>
              <span className="text-[11px] font-mono font-bold bg-[#F8F6F0] text-[#2D2A26]/80 px-2 py-0.5 rounded border border-[#2D2A26]/15 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#2D2A26]/50" />{scene.startTime || '00:00'} - {scene.endTime || '01:30'}
              </span>
            </div>
          </div>
          <button type="button" onClick={() => onApply(scene)} className="px-2.5 py-1.5 bg-[#F59E0B] hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer shrink-0 active:scale-98">
            <Zap className="w-3.5 h-3.5" /><span>Apply</span>
          </button>
        </div>

        <p className="text-xs text-[#2D2A26]/85 leading-relaxed">{scene.whyItWorks || scene.conceptConnection}</p>

        {scene.pauseCue && (
          <div className="bg-amber-50/80 text-amber-950 p-2 rounded-lg border border-amber-200 text-xs flex items-start gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
            <span className="font-medium leading-snug">{scene.pauseCue}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-1.5 border-t border-[#2D2A26]/10 text-xs">
        <a href={ytUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#D97706] hover:text-amber-800 flex items-center gap-1 truncate">
          <Search className="w-3 h-3 shrink-0" /> Find on YouTube
        </a>
        <button type="button" onClick={handleCopy} className="p-1 rounded text-[#2D2A26]/60 hover:text-[#2D2A26] flex items-center gap-1 text-xs font-medium cursor-pointer shrink-0">
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Query'}</span>
        </button>
      </div>
    </div>
  );
};
