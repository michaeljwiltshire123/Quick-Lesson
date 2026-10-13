import React, { useState, useEffect } from 'react';
import { LessonChunk } from '../../types';

interface WarmupClosingCardProps {
  chunk: LessonChunk;
  phaseLabel: string;
  onUpdateChunk: (updated: LessonChunk) => void;
}

export const WarmupClosingCard: React.FC<WarmupClosingCardProps> = ({
  chunk,
  phaseLabel,
  onUpdateChunk,
}) => {
  const [title, setTitle] = useState(chunk.title);
  const [notes, setNotes] = useState(chunk.classroomNotes || '');

  useEffect(() => { setTitle(chunk.title); }, [chunk.title]);
  useEffect(() => { setNotes(chunk.classroomNotes || ''); }, [chunk.classroomNotes]);

  const handleBlurTitle = () => { if (title !== chunk.title) onUpdateChunk({ ...chunk, title }); };
  const handleBlurNotes = () => { if (notes !== chunk.classroomNotes) onUpdateChunk({ ...chunk, classroomNotes: notes }); };

  return (
    <div className="bg-amber-50/20 border border-amber-900/10 rounded-2xl p-5 shadow-2xs space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full">
          {phaseLabel}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-[#2D2A26] mb-1">Phase Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlurTitle}
            className="w-full text-xs font-semibold bg-white border border-[#2D2A26]/15 rounded-xl px-3 py-2 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2D2A26] mb-1">Activity Notes & Objectives</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={handleBlurNotes}
            rows={2}
            placeholder="Outline retrieval prompt, starter activity, or plenary synthesis..."
            className="w-full text-xs bg-white border border-[#2D2A26]/15 rounded-xl p-3 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
          />
        </div>
      </div>
    </div>
  );
};
