import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface VideoDropAreaProps {
  thumb: string;
  onFileSelect: (file: File) => void;
}

export const VideoDropArea: React.FC<VideoDropAreaProps> = ({ thumb, onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) onFileSelect(e.dataTransfer.files[0]); }}
      onClick={() => fileInputRef.current?.click()}
      className="border-2 border-dashed border-[#2D2A26]/20 hover:border-[#D97706] rounded-xl p-4 text-center bg-white cursor-pointer transition-colors"
    >
      <input ref={fileInputRef} type="file" accept="video/*" onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])} className="hidden" />
      <div className="flex flex-col items-center gap-1.5">
        {thumb ? (
          <img src={thumb} alt="Preview" className="w-14 h-14 rounded-lg object-cover border border-[#2D2A26]/15 shadow-xs" />
        ) : (
          <Upload className="w-6 h-6 text-[#D97706]" />
        )}
        <span className="font-bold text-[#2D2A26] text-sm sm:text-base">Drop video here, or click to upload</span>
        <span className="text-xs text-[#2D2A26]/60">Supports MP4, WebM, MOV with instant ghost-player micro-thumbnail capture (&lt;5KB)</span>
      </div>
    </div>
  );
};
