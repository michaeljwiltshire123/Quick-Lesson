import React from 'react';
import { Link as LinkIcon, Sparkles } from 'lucide-react';

interface VideoUrlAndTitleInputsProps {
  title: string;
  url: string;
  isFetchingMeta: boolean;
  onTitleChange: (v: string) => void;
  onUrlChange: (v: string) => void;
  onUrlBlur: () => void;
}

export const VideoUrlAndTitleInputs: React.FC<VideoUrlAndTitleInputsProps> = ({
  title, url, isFetchingMeta, onTitleChange, onUrlChange, onUrlBlur,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Video Resource Title (e.g. Apollo 13 Launch)"
        className="w-full bg-white border border-[#2D2A26]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D97706]"
      />
      <div className="flex items-center gap-1.5 bg-white border border-[#2D2A26]/15 rounded-lg px-2.5 py-2">
        <LinkIcon className="w-4 h-4 text-[#2D2A26]/40 shrink-0" />
        <input
          type="url"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          onBlur={onUrlBlur}
          placeholder="Video URL (YouTube, Vimeo, Google Drive)"
          className="w-full bg-transparent text-sm focus:outline-none"
        />
        {isFetchingMeta && <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] animate-spin shrink-0" />}
      </div>
    </div>
  );
};
