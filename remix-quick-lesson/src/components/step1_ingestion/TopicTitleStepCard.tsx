import React from 'react';
import { BookOpen } from 'lucide-react';

export interface TopicTitleStepCardProps {
  lessonTitle: string;
  onLessonTitleChange: (title: string) => void;
  onComplete: () => void;
  suggestions?: string[];
}

export const TopicTitleStepCard: React.FC<TopicTitleStepCardProps> = ({
  lessonTitle,
  onLessonTitleChange,
  onComplete,
  suggestions = [],
}) => {
  const canContinue = Boolean(lessonTitle.trim());
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl font-bold text-[#2D2A26]">What topic and title are we planning today?</h2>
        <p className="text-xs text-[#2D2A26]/70">Define an inspiring lesson title or topic focus for your class.</p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#2D2A26]">Please type your lesson title here</label>
          <input
            type="text"
            value={lessonTitle}
            onChange={(e) => onLessonTitleChange(e.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter' && canContinue) onComplete(); }}
            aria-required="true"
            placeholder="e.g. Scrooge's Cold Lexicon in Stave 1"
            className="w-full px-3 py-2.5 bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-xl text-xs text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none focus:border-[#F59E0B]"
          />
        </div>
        {suggestions.length > 0 && <div className="space-y-2"><p className="text-xs font-semibold text-[#2D2A26]">Possible lesson focuses from your brief</p>
          <div className="flex flex-wrap gap-2">{suggestions.map((title) => <button key={title} type="button" onClick={() => onLessonTitleChange(title)}
            className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-left text-xs text-amber-950 hover:bg-amber-100">{title}</button>)}</div></div>}
      </div>

      <div className="pt-1 flex items-center justify-end">
        <button
          type="button"
          onClick={onComplete}
          disabled={!canContinue}
          className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#2D2A26] font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-1.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Proceed to Lesson Parameters</span>
        </button>
      </div>
    </div>
  );
};
