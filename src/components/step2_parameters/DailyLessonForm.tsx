import React from 'react';
import { BookMarked, Clock } from 'lucide-react';

interface DailyLessonFormProps {
  subject: string;
  onSubjectChange: (val: string) => void;
  gradeLevel: string;
  onGradeLevelChange: (val: string) => void;
  lessonTitle: string;
  onLessonTitleChange: (val: string) => void;
  lessonDuration: number;
  onLessonDurationChange: (val: number) => void;
  isAmberPulse?: boolean;
}

const GRADE_OPTIONS = ['Key Stage 3 (Years 7-9)', 'GCSE (Years 10-11)', 'BTEC Level 3', 'Custom'];

export const DailyLessonForm: React.FC<DailyLessonFormProps> = ({
  subject, onSubjectChange, gradeLevel, onGradeLevelChange,
  lessonTitle, onLessonTitleChange, lessonDuration, onLessonDurationChange,
  isAmberPulse,
}) => {
  const pulseClass = isAmberPulse ? 'animate-pulse border-amber-500/50 bg-amber-50/20 shadow-md transition-all duration-700' : 'bg-white border-[#2D2A26]/20';

  return (
    <section id="tour-lesson-parameters" className="w-full bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center gap-2.5 border-b border-[#2D2A26]/10 pb-3">
        <div className="w-8 h-8 rounded-lg bg-[#2D2A26] text-[#F59E0B] flex items-center justify-center">
          <BookMarked className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#2D2A26]">Today's Lesson Parameters</h3>
          <p className="text-xs text-[#2D2A26]/70">Customise lesson cohort, subject classification, and timings.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A26]">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            placeholder="e.g. Science, Mathematics, Media..."
            className={`w-full border rounded-xl px-3 py-2 text-xs text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none focus:border-[#F59E0B] ${pulseClass}`}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A26]">Key Stage / Grade Cohort</label>
          <input
            id="grade-level-input"
            type="text"
            list="grade-cohort-options"
            value={gradeLevel}
            onChange={(e) => onGradeLevelChange(e.target.value)}
            placeholder="e.g. BTEC Level 3, GCSE, Year 12, Key Stage 3..."
            className={`w-full border rounded-xl px-3 py-2 text-xs text-[#2D2A26] font-medium placeholder-[#2D2A26]/40 focus:outline-none focus:border-[#F59E0B] ${pulseClass}`}
          />
          <datalist id="grade-cohort-options">
            {GRADE_OPTIONS.map((opt) => <option key={opt} value={opt} />)}
          </datalist>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A26]">Lesson Title</label>
          <input
            type="text"
            value={lessonTitle}
            onChange={(e) => onLessonTitleChange(e.target.value)}
            placeholder="e.g. Introduction to Renewable Energy Systems"
            className={`w-full border rounded-xl px-3 py-2 text-xs text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none focus:border-[#F59E0B] ${pulseClass}`}
          />
        </div>
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2D2A26]">
            <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Duration (Minutes)</span>
          </label>
          <input
            type="number"
            min={1}
            max={360}
            value={lessonDuration}
            onChange={(e) => onLessonDurationChange(Math.max(1, Number(e.target.value) || 1))}
            className="w-full bg-white border border-[#2D2A26]/20 rounded-xl px-3 py-2 text-xs text-[#2D2A26] font-semibold focus:outline-none focus:border-[#F59E0B]"
          />
        </div>
      </div>
    </section>
  );
};
