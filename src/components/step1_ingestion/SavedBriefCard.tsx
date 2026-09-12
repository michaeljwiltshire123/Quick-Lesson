import React from 'react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

export interface SavedBriefItem {
  id?: string;
  name?: string;
  title?: string;
  subject?: string;
  unitDurationWeeks?: number;
  dateSaved?: string;
  cleanContent?: string;
  parsed?: any;
}

export interface SavedBriefCardProps {
  brief: SavedBriefItem;
  onSelect: (brief: SavedBriefItem) => void;
}

export const SavedBriefCard: React.FC<SavedBriefCardProps> = ({ brief, onSelect }) => {
  const p = brief.parsed || brief;
  const title = brief.title || p.unitName || p.courseTitle || p.assignmentTitle || brief.name || 'Saved Syllabus';
  const subject = brief.subject || p.subject || 'Curriculum';
  const weeks = brief.unitDurationWeeks || p.unitDurationWeeks || 1;
  const dateSaved = brief.dateSaved || 'Recently Saved';

  return (
    <button
      type="button"
      onClick={() => onSelect(brief)}
      className="text-left p-3.5 rounded-xl border border-[#2D2A26]/12 hover:border-[#F59E0B] bg-[#F8F6F0]/80 hover:bg-amber-50/60 transition-all cursor-pointer group shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-2.5"
    >
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#2D2A26]/5 text-[#2D2A26]/80 text-[10px] font-semibold">
            <BookOpen className="w-3 h-3 text-[#F59E0B]" />
            <span className="truncate max-w-[120px]">{subject}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-[#2D2A26]/60 font-medium">
            <Clock className="w-3 h-3 text-[#2D2A26]/40" />
            <span>{weeks} {weeks === 1 ? 'Week' : 'Weeks'}</span>
          </span>
        </div>
        <p className="text-xs font-bold text-[#2D2A26] line-clamp-1 group-hover:text-[#D97706] tracking-tight">
          {title}
        </p>
      </div>

      <div className="flex items-center justify-between pt-1.5 border-t border-[#2D2A26]/8 text-[10px] text-[#2D2A26]/60">
        <span className="inline-flex items-center gap-1">
          <Calendar className="w-3 h-3 text-[#2D2A26]/40" />
          <span>{dateSaved}</span>
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-[#D97706] group-hover:translate-x-0.5 transition-transform">
          <span>Open</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </button>
  );
};
