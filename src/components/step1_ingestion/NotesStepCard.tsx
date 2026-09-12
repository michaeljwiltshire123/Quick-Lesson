import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { NotesVideoLinks } from './NotesVideoLinks';
import { NotesDraftAttachment } from './NotesDraftAttachment';

export interface NotesStepCardProps {
  rawNotes: string;
  onRawNotesChange: (notes: string) => void;
  videoLinks: string[];
  onAddVideoLink: (link: string) => void;
  onRemoveVideoLink: (index: number) => void;
  draftFile: { name: string; content: string } | null;
  onUploadDraftFile: (file: { name: string; content: string } | null) => void;
  onNextStep: () => void;
}

export const NotesStepCard: React.FC<NotesStepCardProps> = ({
  rawNotes,
  onRawNotesChange,
  videoLinks,
  onAddVideoLink,
  onRemoveVideoLink,
  draftFile,
  onUploadDraftFile,
  onNextStep,
}) => {
  const [linkInput, setLinkInput] = useState('');

  const handleAddLink = () => {
    if (!linkInput.trim()) return;
    onAddVideoLink(linkInput.trim());
    setLinkInput('');
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl font-bold text-[#2D2A26]">
          Do you have a full or part of a lesson plan written out already?
        </h2>
        <p className="text-xs text-[#2D2A26]/70 leading-relaxed">
          This could be multiple notes, video ideas, images, or ideas you want to add to guide the ai planner.
        </p>
      </div>
      <textarea
        value={rawNotes}
        onChange={(e) => onRawNotesChange(e.target.value)}
        placeholder="Paste your rough lesson plan, learning intentions, or bullet points here..."
        className="w-full h-24 p-3 bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-xl text-xs text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none focus:border-[#F59E0B] resize-none"
      />
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="url"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
            placeholder="Add YouTube or video resource link..."
            className="flex-1 px-3 py-2 bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-xl text-xs text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none focus:border-[#F59E0B]"
          />
          <button
            type="button"
            onClick={handleAddLink}
            className="px-3 py-2 bg-white border border-[#2D2A26]/20 rounded-xl text-xs font-semibold text-[#2D2A26] hover:bg-[#F8F6F0] flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Add Link</span>
          </button>
        </div>
        <NotesVideoLinks videoLinks={videoLinks} onRemoveVideoLink={onRemoveVideoLink} />
      </div>
      <div className="pt-1 flex items-center justify-between">
        <NotesDraftAttachment draftFile={draftFile} onUploadDraftFile={onUploadDraftFile} />
        <button
          type="button"
          onClick={onNextStep}
          className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#2D2A26] font-semibold text-xs rounded-xl transition-colors cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
