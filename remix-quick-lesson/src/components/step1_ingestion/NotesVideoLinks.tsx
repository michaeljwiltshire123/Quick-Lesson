import React from 'react';
import { Youtube, Trash2 } from 'lucide-react';

export interface NotesVideoLinksProps {
  videoLinks: string[];
  onRemoveVideoLink: (index: number) => void;
}

export const NotesVideoLinks: React.FC<NotesVideoLinksProps> = ({ videoLinks, onRemoveVideoLink }) => {
  if (videoLinks.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {videoLinks.map((link, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-[#F59E0B]/30 rounded-lg text-[11px] text-[#2D2A26]"
        >
          <Youtube className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
          <span className="max-w-[200px] truncate">{link}</span>
          <button
            type="button"
            onClick={() => onRemoveVideoLink(idx)}
            className="text-[#2D2A26]/50 hover:text-red-600 cursor-pointer ml-0.5"
            aria-label="Remove video link"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  );
};
