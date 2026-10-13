import React, { useState } from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';
import { LessonChunk } from '../../../types';
import { MetaphorPopupModal } from './MetaphorPopupModal';

interface MetaphorCompareCardProps {
  chunk: LessonChunk;
  onUpdateChunk: (updated: LessonChunk) => void;
  subject?: string;
  gradeLevel?: string;
  themeNotes?: string;
}

export const MetaphorCompareCard: React.FC<MetaphorCompareCardProps> = ({
  chunk, onUpdateChunk, subject, gradeLevel, themeNotes,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectMetaphor = (metaphorText: string, metaphorBadge: string) => {
    onUpdateChunk({ ...chunk, metaphor: metaphorText, metaphorBadge });
  };

  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-2xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#2D2A26]">
          <Lightbulb className="w-4 h-4 text-[#D97706]" />
          <span>Metaphor Bridge</span>
        </div>
        {chunk.metaphorBadge && (
          <span className="text-xs font-extrabold bg-[#F8F6F0] text-[#D97706] px-2.5 py-0.5 rounded-full border border-[#2D2A26]/10 uppercase">
            {chunk.metaphorBadge}
          </span>
        )}
      </div>

      {chunk.metaphor ? (
        <div className="p-3.5 bg-[#F8F6F0]/70 border border-[#2D2A26]/10 rounded-xl space-y-1.5">
          <span className="text-xs font-bold text-[#2D2A26]/60 uppercase tracking-wider">Example Analogy</span>
          <p className="text-xs sm:text-sm text-[#2D2A26] leading-relaxed italic font-medium">"{chunk.metaphor}"</p>
        </div>
      ) : (
        <div className="p-3.5 bg-[#F8F6F0]/40 border border-dashed border-[#2D2A26]/20 rounded-xl text-center space-y-1">
          <p className="text-xs sm:text-sm text-[#2D2A26]/70">No metaphor attached yet. Bridge complex ideas with everyday analogies.</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="w-full py-2.5 bg-[#F8F6F0] hover:bg-amber-100 text-[#2D2A26] border border-[#2D2A26]/15 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-98"
      >
        <Sparkles className="w-4 h-4 text-[#D97706]" />
        <span>{chunk.metaphor ? 'Change Metaphor ✨' : 'Generate Metaphor ✨'}</span>
      </button>

      <MetaphorPopupModal
        isOpen={modalOpen}
        chunkTitle={chunk.title || 'Lesson Concept'}
        onClose={() => setModalOpen(false)}
        onSelectMetaphor={handleSelectMetaphor}
        subject={subject}
        gradeLevel={gradeLevel}
        themeNotes={themeNotes}
      />
    </div>
  );
};
