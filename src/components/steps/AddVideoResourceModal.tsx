import React, { useState } from 'react';
import { X, Video, CheckCircle2 } from 'lucide-react';
import { ChunkAttachment } from '../../types';
import { VideoModalTabBar, VideoModalTabKey } from './video_modal/VideoModalTabBar';
import { QuickSearchAndDetailsTab } from './video_modal/tabs/QuickSearchAndDetailsTab';
import { VideoAiLabTabContainer } from './video_modal/tabs/VideoAiLabTabContainer';
import { PopCultureScene } from './video_modal/presetData';

export interface AddVideoResourceModalProps {
  isOpen: boolean; onClose: () => void;
  onAddAttachment: (att: Partial<ChunkAttachment>) => void;
  attachments?: ChunkAttachment[];
  slideTitle?: string; lessonTitle?: string; subject?: string; gradeLevel?: string;
  themeNotes?: string; requiredDeliverables?: string[]; assessedCriteria?: string[];
}

export const AddVideoResourceModal: React.FC<AddVideoResourceModalProps> = ({
  isOpen, onClose, onAddAttachment, attachments = [], slideTitle = '', lessonTitle, subject, gradeLevel, themeNotes, requiredDeliverables, assessedCriteria,
}) => {
  const [activeTab, setActiveTab] = useState<VideoModalTabKey>('search');
  const [editingData, setEditingData] = useState<Partial<ChunkAttachment>>({});

  if (!isOpen) return null;

  const handleApplyScene = (scene: PopCultureScene) => {
    const att: Partial<ChunkAttachment> = {
      name: scene.sceneTitle,
      url: `https://www.youtube.com/watch?v=${scene.youtubeId || ''}`,
      startTime: scene.startTime,
      endTime: scene.endTime,
      pauseCue: scene.pauseCue,
      platform: 'youtube',
      type: 'video',
    };
    onAddAttachment(att);
    setEditingData(att);
  };

  const videoAttachments = attachments.filter((a) => a.type === 'video' || a.type === 'link');

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2A26]/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-2xl w-full max-w-3xl overflow-hidden shadow-xl flex flex-col my-auto max-h-[92vh]">
        <div className="p-4 border-b border-[#2D2A26]/10 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <Video className="w-6 h-6 text-[#D97706]" />
            <h3 className="text-base sm:text-lg font-bold text-[#2D2A26]">Add Classroom Video Resource</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-[#2D2A26]/60 hover:text-[#2D2A26] hover:bg-black/5 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {videoAttachments.length > 0 && (
          <div className="px-4 py-2 bg-amber-50/80 border-b border-[#2D2A26]/10 flex items-center gap-2.5 overflow-x-auto shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] shrink-0">Attached ({videoAttachments.length}):</span>
            {videoAttachments.map((att) => (
              <div key={att.id} className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg border border-[#2D2A26]/15 shrink-0 text-xs font-semibold text-[#2D2A26]">
                {att.microThumbnail ? <img src={att.microThumbnail} alt={att.name} className="w-6 h-6 rounded object-cover" /> : <Video className="w-4 h-4 text-[#D97706]" />}
                <span className="max-w-[130px] truncate">{att.name}</span>
              </div>
            ))}
          </div>
        )}

        <VideoModalTabBar activeTab={activeTab} onSelectTab={setActiveTab} />

        <div className="p-4 sm:p-5 overflow-y-auto">
          {activeTab === 'search' ? (
            <QuickSearchAndDetailsTab
              onAttachVideo={onAddAttachment} initialData={editingData} slideTitle={slideTitle} lessonTitle={lessonTitle} subject={subject}
              gradeLevel={gradeLevel} themeNotes={themeNotes} requiredDeliverables={requiredDeliverables}
              assessedCriteria={assessedCriteria} onApplyScene={handleApplyScene}
            />
          ) : (
            <VideoAiLabTabContainer onAttachVideo={onAddAttachment} slideTitle={slideTitle} themeNotes={themeNotes} />
          )}
        </div>

        <div className="p-4 border-t border-[#2D2A26]/10 bg-white flex items-center justify-between shrink-0">
          <span className="text-xs sm:text-sm text-[#2D2A26]/70 font-semibold">Modal remains open after attaching so you can add multiple videos.</span>
          <button type="button" onClick={onClose} className="px-6 py-2.5 bg-[#2D2A26] hover:bg-black text-white text-sm font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition-colors">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Done
          </button>
        </div>
      </div>
    </div>
  );
};
