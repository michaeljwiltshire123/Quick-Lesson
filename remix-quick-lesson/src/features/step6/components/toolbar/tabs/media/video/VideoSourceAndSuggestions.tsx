import React from 'react';
import { extractYouTubeId, isYouTubeShortUrl } from '../../../../../utils/videoLinkValidator';
import { Link2, CheckCircle2, AlertCircle, Clapperboard } from 'lucide-react';

interface VideoSourceAndSuggestionsProps {
  content?: string;
  chunkId?: string;
  slideTitle?: string;
  onOpenVideoModal?: () => void;
  onUpdateContent?: (url: string) => void;
  onUpdateMeta: (patch: Record<string, any>) => void;
}

export const VideoSourceAndSuggestions: React.FC<VideoSourceAndSuggestionsProps> = ({
  content = '', onOpenVideoModal, onUpdateContent, onUpdateMeta,
}) => {
  const ytId = extractYouTubeId(content);
  const isValid = Boolean(ytId || (content.startsWith('http') && (content.includes('vimeo') || content.includes('drive'))));

  return (
    <div className="space-y-3 pt-1 text-xs text-stone-700">
      {onOpenVideoModal && (
        <button
          type="button"
          onClick={onOpenVideoModal}
          className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
        >
          <Clapperboard className="w-4 h-4 text-amber-200" />
          <span>Browse Video Library & Scene Ideas</span>
        </button>
      )}

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-[10px] text-stone-600 font-semibold flex items-center gap-1">
            <Link2 className="w-3 h-3 text-amber-700" />
            <span>Active Video Source Link</span>
          </label>
          {isValid ? (
            <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <CheckCircle2 className="w-2.5 h-2.5" /> Ready
            </span>
          ) : content ? (
            <span className="text-[9px] font-bold text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <AlertCircle className="w-2.5 h-2.5" /> Check Link
            </span>
          ) : null}
        </div>
        <input
          type="url"
          value={content}
          placeholder="Paste YouTube, Shorts, or Google Drive URL..."
          onChange={(e) => {
            onUpdateContent?.(e.target.value);
            if (isYouTubeShortUrl(e.target.value)) onUpdateMeta({ aspectRatio: '9:16' });
          }}
          className="w-full text-[11px] p-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600 font-medium"
        />
      </div>
    </div>
  );
};
