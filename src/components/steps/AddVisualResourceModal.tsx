import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { ChunkAttachment } from '../../types';
import { IngestAndSearchTab } from './visual_modal/tabs/IngestAndSearchTab';
import { PromptLabTab } from './visual_modal/tabs/PromptLabTab';
import { VisualModalTabBar } from './visual_modal/VisualModalTabBar';

export interface AddVisualResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (name: string, url: string, microThumbnail?: string) => void;
  onAddAttachment?: (attachment: ChunkAttachment) => void;
  attachments?: ChunkAttachment[];
  slideTitle?: string;
  themeNotes?: string;
}

export const AddVisualResourceModal: React.FC<AddVisualResourceModalProps> = ({
  isOpen, onClose, onAdd, onAddAttachment, attachments = [], slideTitle, themeNotes,
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'prompt'>('search');
  const [localAttached, setLocalAttached] = useState<ChunkAttachment[]>([]);

  useEffect(() => {
    if (isOpen) setLocalAttached([]);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAttachVisual = (name: string, url: string, microThumbnail?: string) => {
    const att: ChunkAttachment = {
      id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name, type: 'image', url, microThumbnail,
    };
    if (onAddAttachment) onAddAttachment(att);
    if (onAdd) onAdd(name, url, microThumbnail);
    setLocalAttached((prev) => [...prev, att]);
  };

  const allImages = [...attachments.filter((a) => a.type === 'image'), ...localAttached];
  const imageAttachments = allImages.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.id === item.id ||
          (t.url && item.url && t.url === item.url) ||
          (t.microThumbnail && item.microThumbnail && t.microThumbnail === item.microThumbnail)
      )
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2A26]/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl flex flex-col my-auto max-h-[92vh]">
        <div className="p-4 border-b border-[#2D2A26]/10 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-6 h-6 text-[#D97706]" />
            <h3 className="text-base sm:text-lg font-bold text-[#2D2A26]">Add Classroom Visual Resource</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-[#2D2A26]/60 hover:text-[#2D2A26] hover:bg-black/5 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {imageAttachments.length > 0 && (
          <div className="px-4 py-2 bg-amber-50/80 border-b border-[#2D2A26]/10 flex items-center gap-2.5 overflow-x-auto shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] shrink-0">Attached ({imageAttachments.length}):</span>
            {imageAttachments.map((att) => (
              <div key={att.id} className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg border border-[#2D2A26]/15 shrink-0 text-xs font-semibold text-[#2D2A26]">
                {att.microThumbnail ? <img src={att.microThumbnail} alt={att.name} className="w-6 h-6 rounded object-cover" /> : <ImageIcon className="w-4 h-4 text-[#D97706]" />}
                <span className="max-w-[130px] truncate">{att.name}</span>
              </div>
            ))}
          </div>
        )}

        <VisualModalTabBar activeTab={activeTab} onSelectTab={setActiveTab} />

        <div className="p-4 sm:p-5 overflow-y-auto">
          {activeTab === 'search' && <IngestAndSearchTab onAttachVisual={handleAttachVisual} slideTitle={slideTitle} />}
          {activeTab === 'prompt' && <PromptLabTab onAttachVisual={handleAttachVisual} slideTitle={slideTitle} themeNotes={themeNotes} />}
        </div>

        <div className="p-4 border-t border-[#2D2A26]/10 bg-white flex items-center justify-between shrink-0">
          <span className="text-xs sm:text-sm text-[#2D2A26]/70 font-semibold">Modal remains open after attaching so you can add multiple visuals.</span>
          <button type="button" onClick={onClose} className="px-6 py-2.5 bg-[#2D2A26] hover:bg-black text-white text-sm font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition-colors">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Done
          </button>
        </div>
      </div>
    </div>
  );
};
