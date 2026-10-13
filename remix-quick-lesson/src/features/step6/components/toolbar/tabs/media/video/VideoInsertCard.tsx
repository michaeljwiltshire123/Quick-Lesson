import React, { useState } from 'react';
import { SlideElement } from '../../../../../types/slideTypes';
import { extractYouTubeId, extractGoogleDriveId, isYouTubeShortUrl } from '../../../../../utils/videoLinkValidator';
import { Play, HardDrive, Plus, CheckCircle2 } from 'lucide-react';

interface VideoInsertCardProps {
  onInsertElement: (element: SlideElement) => void;
}

export const VideoInsertCard: React.FC<VideoInsertCardProps> = ({ onInsertElement }) => {
  const [sourceType, setSourceType] = useState<'youtube' | 'drive'>('youtube');
  const [urlInput, setUrlInput] = useState('');

  const ytId = extractYouTubeId(urlInput);
  const driveId = extractGoogleDriveId(urlInput);
  const isShort = isYouTubeShortUrl(urlInput);
  const isValid = Boolean(sourceType === 'youtube' ? ytId : driveId);

  const handleAdd = () => {
    if (!isValid && !urlInput.trim()) return;
    const finalUrl = urlInput.trim();
    onInsertElement({
      id: `el-video-${Date.now()}`,
      type: 'video',
      x: isShort ? 35 : 20,
      y: 20,
      width: isShort ? 30 : 60,
      height: isShort ? 55 : 50,
      content: finalUrl,
      fillColor: '#1C1917',
      caption: sourceType === 'drive' ? 'Google Drive Video' : isShort ? 'YouTube Short' : 'Classroom Video',
      meta: {
        isAutoplay: false,
        isMuted: true,
        shadowStyle: 'soft',
        imageRadius: 12,
        aspectRatio: isShort ? '9:16' : '16:9',
        isClassroomClean: true,
        isGoogleDrive: sourceType === 'drive',
        isStageMode: true, // Stage mode active by default
      },
    });
    setUrlInput('');
  };

  return (
    <div className="p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 shadow-2xs space-y-2 text-stone-800">
      <div className="flex bg-stone-200/70 p-0.5 rounded-xl border border-stone-300/60">
        <button
          type="button" onClick={() => { setSourceType('youtube'); setUrlInput(''); }}
          className={`flex-1 py-1 px-2 rounded-lg text-[10.5px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            sourceType === 'youtube' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Play className="w-3 h-3 text-red-600 fill-red-600" />
          <span>YouTube / Web</span>
        </button>
        <button
          type="button" onClick={() => { setSourceType('drive'); setUrlInput(''); }}
          className={`flex-1 py-1 px-2 rounded-lg text-[10.5px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            sourceType === 'drive' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <HardDrive className="w-3 h-3 text-amber-700" />
          <span>Google Drive</span>
        </button>
      </div>

      <div className="space-y-1.5">
        <div className="flex gap-1.5">
          <input
            type="url" value={urlInput}
            placeholder={sourceType === 'drive' ? 'Paste Google Drive viewable share link...' : 'Paste YouTube or Shorts URL...'}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 text-[11px] p-2 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-amber-600 font-medium"
          />
          <button
            type="button" disabled={!urlInput.trim()} onClick={handleAdd}
            className="px-3 py-2 bg-amber-800 hover:bg-amber-900 disabled:opacity-40 text-white rounded-xl font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Video</span>
          </button>
        </div>

        {sourceType === 'drive' && (
          <p className="text-[9.5px] text-stone-500 italic px-1">Tip: In Google Drive, ensure link sharing is set to &quot;Anyone with the link can view&quot;.</p>
        )}

        {ytId && (
          <div className="p-1.5 bg-white border border-stone-200 rounded-xl flex items-center gap-2 shadow-2xs animate-in fade-in">
            <img src={`https://img.youtube.com/vi/${ytId}/default.jpg`} alt="Preview" className="w-12 h-9 object-cover rounded-lg" />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-stone-800 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Valid {isShort ? 'Shorts' : 'YouTube'} Video</span>
              <span className="text-[9px] text-stone-500 truncate block">Ready to insert onto slide</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
