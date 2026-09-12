import React, { useState, useEffect } from 'react';
import { Plus, HardDrive } from 'lucide-react';
import { ChunkAttachment } from '../../../types';
import { captureGhostThumbnail } from './ghostCapture';
import { VideoDropArea } from './VideoDropArea';
import { VideoUrlAndTitleInputs } from './VideoUrlAndTitleInputs';

interface VideoUploadZoneProps {
  onAttachVideo: (att: Partial<ChunkAttachment>) => void;
  initialData?: Partial<ChunkAttachment>;
}

export const VideoUploadZone: React.FC<VideoUploadZoneProps> = ({ onAttachVideo, initialData }) => {
  const [title, setTitle] = useState(initialData?.name || '');
  const [url, setUrl] = useState(initialData?.url || '');
  const [thumb, setThumb] = useState<string>(initialData?.microThumbnail || '');
  const [attachedCount, setAttachedCount] = useState(0);
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);

  useEffect(() => {
    if (initialData?.name) setTitle(initialData.name);
    if (initialData?.url) setUrl(initialData.url);
    if (initialData?.microThumbnail) setThumb(initialData.microThumbnail);
  }, [initialData]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('video/')) return;
    if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ''));
    try {
      const microThumb = await captureGhostThumbnail(file);
      setThumb(microThumb);
    } catch {}
  };

  const handleUrlBlur = async () => {
    if (!url || title.trim()) return;
    if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('tiktok.com')) {
      setIsFetchingMeta(true);
      try {
        const res = await fetch('/api/video-metadata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        const data = await res.json();
        if (data?.title) setTitle(data.title);
      } catch {} finally {
        setIsFetchingMeta(false);
      }
    }
  };

  const handleAttach = () => {
    if (!title.trim() && !url.trim() && !thumb) return;
    const finalTitle = title.trim() || 'Classroom Video Resource';
    const platform: 'youtube' | 'google_drive' | 'other' =
      url.includes('youtube.com') || url.includes('youtu.be') ? 'youtube' :
      url.includes('drive.google.com') ? 'google_drive' : 'other';

    onAttachVideo({
      name: finalTitle,
      url: url.trim(),
      type: 'video',
      platform,
      microThumbnail: thumb,
    });
    setTitle(''); setUrl(''); setThumb(''); setAttachedCount((c) => c + 1);
  };

  return (
    <div className="bg-[#F8F6F0] p-4 rounded-xl border border-[#2D2A26]/10 space-y-3 text-sm">
      <VideoDropArea thumb={thumb} onFileSelect={handleFile} />
      <VideoUrlAndTitleInputs
        title={title} url={url} isFetchingMeta={isFetchingMeta}
        onTitleChange={setTitle} onUrlChange={setUrl} onUrlBlur={handleUrlBlur}
      />
      <div className="flex items-center justify-between pt-0.5 text-xs">
        <span className="text-[#2D2A26]/70 font-semibold flex items-center gap-1">
          <HardDrive className="w-3.5 h-3.5 text-[#D97706]" />
          {attachedCount > 0 ? `✓ ${attachedCount} video attached` : 'Sync heavy videos to Google Drive'}
        </span>
        <button
          type="button"
          onClick={handleAttach}
          disabled={!title.trim() && !url.trim() && !thumb}
          className="px-4 py-2 bg-[#D97706] hover:bg-amber-700 disabled:opacity-40 text-white font-bold rounded-lg text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
        >
          <Plus className="w-4 h-4" /> Attach Video
        </button>
      </div>
    </div>
  );
};
