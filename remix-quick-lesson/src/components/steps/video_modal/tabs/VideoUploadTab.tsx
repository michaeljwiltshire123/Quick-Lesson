import React, { useState, useRef } from 'react';
import { HardDrive, Sparkles, CheckCircle2, Film } from 'lucide-react';
import { ChunkAttachment } from '../../../../types';
import { captureGhostThumbnail } from '../ghostCapture';

interface VideoUploadTabProps {
  onAttachVideo: (att: Partial<ChunkAttachment>) => void;
}

export const VideoUploadTab: React.FC<VideoUploadTabProps> = ({ onAttachVideo }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [recentName, setRecentName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('video/')) return;
    setProcessing(true);
    try {
      const microThumb = await captureGhostThumbnail(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      setRecentName(cleanName);
      onAttachVideo({ name: cleanName, type: 'video', platform: 'other', microThumbnail: microThumb, url: '' });
    } catch {
      // Gracefully continue
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
        className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
          isDragging ? 'border-[#D97706] bg-amber-50/50' : 'border-[#2D2A26]/20 bg-[#F8F6F0]/50 hover:bg-[#F8F6F0]'
        }`}
      >
        <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        <div className="w-12 h-12 rounded-xl bg-white border border-[#2D2A26]/10 flex items-center justify-center text-[#D97706] shadow-2xs">
          {processing ? <Sparkles className="w-6 h-6 animate-spin" /> : <Film className="w-6 h-6" />}
        </div>
        <div>
          <p className="text-xs sm:text-sm font-bold text-[#2D2A26]">Drop classroom video file here, or browse</p>
          <p className="text-[11px] text-[#2D2A26]/60 mt-0.5">MP4, WebM, or MOV. Fast ghost-player micro-thumbnail capture (&lt;5KB).</p>
        </div>
      </div>

      {recentName && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Attached "{recentName}" to slide resources!
        </div>
      )}

      <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-2.5 text-xs text-amber-950">
        <HardDrive className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Google Drive Storage Recommendation</p>
          <p className="text-[11px] text-amber-900/80 leading-relaxed">
            To keep lesson files light and shareable with supply teachers, store large lesson video files in Google Drive or OneDrive, then paste the shared link in the Details tab.
          </p>
        </div>
      </div>
    </div>
  );
};
