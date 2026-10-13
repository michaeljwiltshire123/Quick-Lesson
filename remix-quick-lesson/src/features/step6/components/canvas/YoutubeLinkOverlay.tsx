import React from 'react';
import { Youtube, ExternalLink } from 'lucide-react';

interface YoutubeLinkOverlayProps {
  url?: string;
  caption?: string;
}

export const YoutubeLinkOverlay: React.FC<YoutubeLinkOverlayProps> = ({
  url, caption,
}) => {
  const directUrl = url || 'https://www.youtube.com';

  return (
    <a
      href={directUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-2 left-2 z-30 px-2 py-1 bg-black/80 hover:bg-red-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-colors"
      title={`Open original source video: ${directUrl}`}
    >
      <Youtube className="w-3.5 h-3.5 text-red-500 group-hover:text-white" />
      <span className="truncate max-w-[120px]">{caption || 'YouTube Source'}</span>
      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
    </a>
  );
};
