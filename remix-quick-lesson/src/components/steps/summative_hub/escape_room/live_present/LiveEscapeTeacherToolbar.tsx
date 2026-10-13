import React from 'react';
import { Download, ChevronRight } from 'lucide-react';
import { TeamProgress } from './typesLiveEscape';

interface Props {
  teams: TeamProgress[];
  onAdvanceTeam: (teamId: string) => void;
  onExportSlides: () => void;
}

export const LiveEscapeTeacherToolbar: React.FC<Props> = ({
  teams, onAdvanceTeam, onExportSlides,
}) => (
  <div className="flex flex-wrap items-center justify-between gap-2 px-1">
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[11px] font-bold text-[#2D2A26]/70">Teacher Progression:</span>
      {teams.map((t) => (
        <button
          key={t.id}
          type="button"
          disabled={t.hasEscaped}
          onClick={() => onAdvanceTeam(t.id)}
          className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg border border-[#2D2A26]/15 bg-white hover:bg-amber-50 text-[#2D2A26] disabled:opacity-40 cursor-pointer shadow-2xs"
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.colorHex }} />
          <span>{t.name} +1 Lock</span>
          <ChevronRight className="w-3 h-3 text-[#D97706]" />
        </button>
      ))}
    </div>
    <button
      type="button"
      onClick={onExportSlides}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-[#F8F6F0] text-[#2D2A26] border border-[#2D2A26]/15 cursor-pointer shadow-2xs transition-all active:scale-98"
    >
      <Download className="w-3.5 h-3.5 text-[#D97706]" />
      <span>Export Post-Game Slides</span>
    </button>
  </div>
);
