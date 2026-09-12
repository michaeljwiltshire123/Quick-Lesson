import React, { useState } from 'react';
import { Image, Video, Link as LinkIcon } from 'lucide-react';
import { ChunkAttachment } from '../../types';
import { AttachmentGallery } from './toolbelt/AttachmentGallery';

interface InteractiveToolbeltProps {
  attachments?: ChunkAttachment[];
  onAddAttachment: (att: ChunkAttachment) => void;
  onRemoveAttachment: (id: string) => void;
  onOpenVisualModal: () => void;
  onOpenVideoModal: () => void;
  onOpenQuizModal?: () => void;
}

export const InteractiveToolbelt: React.FC<InteractiveToolbeltProps> = ({
  attachments = [],
  onAddAttachment,
  onRemoveAttachment,
  onOpenVisualModal,
  onOpenVideoModal,
  onOpenQuizModal,
}) => {
  const [showUrlForm, setShowUrlForm] = useState(false);
  const [urlName, setUrlName] = useState('');
  const [urlValue, setUrlValue] = useState('');

  const handleLinkClick = () => {
    if (onOpenQuizModal) {
      onOpenQuizModal();
    } else {
      setShowUrlForm(!showUrlForm);
    }
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlValue.trim()) return;
    onAddAttachment({
      id: `att-${Date.now()}`,
      name: urlName.trim() || 'External Web Link',
      type: 'quiz',
      url: urlValue.trim(),
      platform: 'other',
    });
    setUrlName('');
    setUrlValue('');
    setShowUrlForm(false);
  };

  return (
    <div className="mt-3 pt-3 border-t border-[#2D2A26]/10 space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-[10px] font-bold text-[#2D2A26]/70 uppercase tracking-wider">Projector Media Toolbelt</span>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={onOpenVisualModal} className="px-2.5 py-1 bg-[#F8F6F0] hover:bg-amber-100 text-[#2D2A26] border border-[#2D2A26]/15 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer">
            <Image className="w-3 h-3 text-[#D97706]" /><span>+ Add Visual</span>
          </button>
          <button type="button" onClick={onOpenVideoModal} className="px-2.5 py-1 bg-[#F8F6F0] hover:bg-amber-100 text-[#2D2A26] border border-[#2D2A26]/15 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer">
            <Video className="w-3 h-3 text-[#D97706]" /><span>+ Add Video</span>
          </button>
          <button type="button" onClick={handleLinkClick} className="px-2.5 py-1 bg-[#F59E0B] hover:bg-amber-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer">
            <LinkIcon className="w-3 h-3" /><span>+ Add Link</span>
          </button>
        </div>
      </div>

      {showUrlForm && (
        <form onSubmit={handleAddLink} className="p-2.5 bg-[#F8F6F0] rounded-xl border border-[#2D2A26]/15 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input type="text" value={urlName} onChange={(e) => setUrlName(e.target.value)} placeholder="Resource Name" className="text-xs bg-white border border-[#2D2A26]/15 rounded-lg px-2 py-1.5 text-[#2D2A26] focus:outline-none" />
            <input type="url" value={urlValue} onChange={(e) => setUrlValue(e.target.value)} placeholder="https://..." className="text-xs bg-white border border-[#2D2A26]/15 rounded-lg px-2 py-1.5 text-[#2D2A26] focus:outline-none" />
          </div>
          <div className="flex justify-end gap-1.5">
            <button type="button" onClick={() => setShowUrlForm(false)} className="px-2 py-1 bg-white border border-[#2D2A26]/20 rounded-lg text-xs font-bold">Cancel</button>
            <button type="submit" className="px-2 py-1 bg-[#2D2A26] text-white rounded-lg text-xs font-bold">Save Link</button>
          </div>
        </form>
      )}

      <AttachmentGallery attachments={attachments} onRemoveAttachment={onRemoveAttachment} />
    </div>
  );
};


