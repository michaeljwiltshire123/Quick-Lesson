import React, { useState, useEffect, useCallback } from 'react';
import { Upload, Link as LinkIcon, Plus } from 'lucide-react';
import { compressImageToMicroThumbnail } from '../../../lib/imageCompressor';

interface UploadZoneProps {
  onAttachVisual: (title: string, url: string, microThumbnail?: string) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onAttachVisual }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [microThumb, setMicroThumb] = useState<string>('');
  const [attachedCount, setAttachedCount] = useState(0);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ''));
    const res = await compressImageToMicroThumbnail(file);
    setMicroThumb(res.microThumbnail);
    setUrl(res.displayUrl);
  };

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          processFile(file);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  const handleAttach = () => {
    if (!title.trim() && !url.trim() && !microThumb) return;
    const finalTitle = title.trim() || 'Classroom Visual Resource';
    const finalUrl = url.trim() || microThumb || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3';
    onAttachVisual(finalTitle, finalUrl, microThumb);
    setTitle(''); setUrl(''); setMicroThumb(''); setAttachedCount((c) => c + 1);
  };

  return (
    <div className="bg-[#F8F6F0] p-4 rounded-xl border border-[#2D2A26]/10 space-y-3.5 text-sm">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); }}
        className="border-2 border-dashed border-[#2D2A26]/20 hover:border-[#D97706] rounded-xl p-4 text-center bg-white cursor-pointer transition-colors"
      >
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} className="hidden" id="visual-file-input" />
        <label htmlFor="visual-file-input" className="cursor-pointer flex flex-col items-center gap-1.5">
          {microThumb ? (
            <img src={microThumb} alt="Preview" className="w-14 h-14 rounded-lg object-cover border border-[#2D2A26]/15 shadow-xs" />
          ) : (
            <Upload className="w-6 h-6 text-[#D97706]" />
          )}
          <span className="font-bold text-[#2D2A26] text-sm sm:text-base">Drop diagram here, click to upload, or paste (Ctrl+V)</span>
          <span className="text-xs text-[#2D2A26]/60">Supports PNG, JPG, WebP diagrams and classroom charts</span>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Visual Title (e.g. Plant Cell Diagram)" className="w-full bg-white border border-[#2D2A26]/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D97706]" />
        <div className="flex items-center gap-1.5 bg-white border border-[#2D2A26]/15 rounded-lg px-2.5 py-2">
          <LinkIcon className="w-4 h-4 text-[#2D2A26]/40 shrink-0" />
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Image URL (optional)" className="w-full bg-transparent text-sm focus:outline-none" />
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-xs sm:text-sm text-[#2D2A26]/70 font-semibold">{attachedCount > 0 ? `✓ ${attachedCount} item(s) attached to lesson chunk` : 'Ready to attach'}</span>
        <button type="button" onClick={handleAttach} disabled={!title.trim() && !url.trim() && !microThumb} className="px-4 py-2 bg-[#D97706] hover:bg-amber-700 disabled:opacity-40 text-white font-bold rounded-lg text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-xs">
          <Plus className="w-4 h-4" /> Attach Visual
        </button>
      </div>
    </div>
  );
};
