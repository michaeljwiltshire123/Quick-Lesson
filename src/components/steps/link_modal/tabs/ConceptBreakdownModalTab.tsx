import React from 'react';
import { Layers } from 'lucide-react';
import { LessonChunk } from '../../../../types';
import { MetaphorCompareCard } from '../../../step3_chunks/components/MetaphorCompareCard';

interface ConceptBreakdownModalTabProps {
  chunk?: LessonChunk;
  onUpdateChunk?: (updated: LessonChunk) => void;
  slideTitle?: string;
  subject?: string;
  gradeLevel?: string;
  themeNotes?: string;
}

export const ConceptBreakdownModalTab: React.FC<ConceptBreakdownModalTabProps> = ({
  chunk, onUpdateChunk, slideTitle, subject, gradeLevel, themeNotes,
}) => {
  // If no full chunk object provided, synthesize fallback object for comparison
  const activeChunk: LessonChunk = chunk || {
    id: 'fallback-chunk',
    type: 'teaching',
    title: slideTitle || 'Active Concept',
    durationMinutes: 5,
    teacherScript: '',
    metaphor: '',
    metaphorBadge: '',
  };

  const handleUpdate = (updated: LessonChunk) => {
    onUpdateChunk?.(updated);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-[#D97706]/20 rounded-2xl p-4 shadow-2xs flex items-start gap-3">
        <div className="p-2 bg-[#D97706]/15 rounded-xl text-[#D97706] shrink-0 mt-0.5">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#2D2A26]">Concept Breakdown & Pedagogical Bridges</h3>
          <p className="text-xs text-[#2D2A26]/80 mt-1 leading-relaxed">
            Break down complex or abstract concepts into concrete student-friendly mental models, analogies, and real-world comparisons.
          </p>
        </div>
      </div>

      <MetaphorCompareCard
        chunk={activeChunk}
        onUpdateChunk={handleUpdate}
        subject={subject}
        gradeLevel={gradeLevel}
        themeNotes={themeNotes}
      />
    </div>
  );
};
