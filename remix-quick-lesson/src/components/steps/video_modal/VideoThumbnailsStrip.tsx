import React from 'react';
import { Video, Film, CheckCircle2 } from 'lucide-react';
import { ChunkAttachment } from '../../../types';

interface VideoThumbnailsStripProps {
  attachments?: ChunkAttachment[];
}

export const VideoThumbnailsStrip: React.FC<VideoThumbnailsStripProps> = ({ attachments = [] }) => {
  const videoAttachments = attachments.filter((a) => a.type === 'video' || a.type === 'link');

  if (videoAttachments.length === 0) return null;

  return (
    <div className="px-4 py-2.5 bg-amber-50/60 border-b border-amber-200/60 flex items-center gap-2 overflow-x-auto shrink-0">
      <span className="text-[10px] font-extrabold uppercase text-[#D97706] tracking-wider shrink-0 flex items-center gap-1">
        <CheckCircle2 className="w-3.5 h-3.5" /> Attached Videos ({videoAttachments.length}):
      </span>
      <div className="flex items-center gap-2">
        {videoAttachments.map((att) => (
          <div
            key={att.id}
            className="flex items-center gap-1.5 px-2 py-1 bg-white border border-amber-200 rounded-lg text-xs font-semibold text-[#2D2A26] shadow-2xs shrink-0 max-w-[190px]"
          >
            {att.microThumbnail ? (
              <img src={att.microThumbnail} alt={att.name} className="w-5 h-5 rounded object-cover border border-[#2D2A26]/10 shrink-0" />
            ) : (
              <Video className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
            )}
            <span className="truncate text-[11px]">{att.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
