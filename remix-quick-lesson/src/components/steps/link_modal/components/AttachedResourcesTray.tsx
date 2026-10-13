import React from 'react';
import { Link as LinkIcon, X, FileSpreadsheet, Video, Presentation, Layout, QrCode } from 'lucide-react';
import { ChunkAttachment } from '../../../../types';

interface AttachedResourcesTrayProps {
  attachments: ChunkAttachment[];
  onRemoveAttachment?: (id: string) => void;
}

const getPlatformIcon = (att: ChunkAttachment) => {
  if (att.qrDesign) return <QrCode className="w-3.5 h-3.5 text-[#D97706] shrink-0" />;
  const url = (att.url || '').toLowerCase();
  if (url.includes('docs.google.com') || url.includes('sheets')) return <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
  if (url.includes('slides.google.com') || url.includes('presentation')) return <Presentation className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
  if (url.includes('canva.com')) return <Layout className="w-3.5 h-3.5 text-purple-600 shrink-0" />;
  if (url.includes('youtube.com') || url.includes('youtu.be')) return <Video className="w-3.5 h-3.5 text-red-600 shrink-0" />;
  return <LinkIcon className="w-3.5 h-3.5 text-[#D97706] shrink-0" />;
};

export const AttachedResourcesTray: React.FC<AttachedResourcesTrayProps> = ({
  attachments, onRemoveAttachment,
}) => {
  const quizAtts = attachments.filter((a) => a.type === 'quiz' || a.type === 'link');
  if (quizAtts.length === 0) return null;

  return (
    <div className="px-4 py-2.5 bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-amber-50/90 border-b border-[#2D2A26]/10 flex items-center gap-2.5 overflow-x-auto shrink-0 scrollbar-thin">
      <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#D97706] shrink-0">
        <span>Attached ({quizAtts.length}):</span>
      </div>
      <div className="flex items-center gap-2">
        {quizAtts.map((att) => (
          <div
            key={att.id}
            className="group flex items-center gap-1.5 bg-white pl-2.5 pr-1.5 py-1 rounded-lg border border-[#2D2A26]/15 shadow-2xs hover:border-[#D97706]/40 transition-all text-xs font-semibold text-[#2D2A26] shrink-0"
          >
            {getPlatformIcon(att)}
            <span className="max-w-[150px] truncate text-[11px]" title={att.name || att.url}>
              {att.name || 'Untitled Resource'}
            </span>
            {att.sharingMode && att.sharingMode !== 'standard' && (
              <span className="text-[9px] font-bold uppercase px-1 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                {att.sharingMode}
              </span>
            )}
            {onRemoveAttachment && (
              <button
                type="button"
                onClick={() => onRemoveAttachment(att.id)}
                className="p-0.5 rounded text-[#2D2A26]/40 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer ml-0.5"
                title="Remove this attachment"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
