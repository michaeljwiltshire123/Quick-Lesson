import React from 'react';
import { X, Users, Archive } from 'lucide-react';
import { ClassCohortResult } from './typesSummativeQuiz';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentCohortTag: string;
  onChangeTag: (tag: string) => void;
  cohortHistory: ClassCohortResult[];
  onArchiveCohort: () => void;
}

export const ClassSessionManagerModal: React.FC<Props> = ({
  isOpen, onClose, currentCohortTag, onChangeTag, cohortHistory, onArchiveCohort,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-3xl w-full max-w-lg p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <div className="flex items-center gap-2 font-bold text-[#2D2A26] text-sm">
            <Users className="w-4 h-4 text-[#D97706]" />
            <span>Class Session & Cohort Manager</span>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/5 text-[#2D2A26]"><X className="w-4 h-4" /></button>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#2D2A26] mb-1">Active Class / Period Tag</label>
          <input type="text" value={currentCohortTag} onChange={(e) => onChangeTag(e.target.value)}
            className="w-full px-3.5 py-2 text-xs font-medium text-[#2D2A26] bg-white border border-[#2D2A26]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="e.g. Period 2 Media Studies" />
        </div>
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#2D2A26]">Archived Cohorts ({cohortHistory.length})</div>
          <div className="max-h-36 overflow-y-auto space-y-1.5">
            {cohortHistory.length === 0 ? <p className="text-xs text-[#2D2A26]/60 italic">No archived cohort sessions yet.</p> :
              cohortHistory.map((c, idx) => (
                <div key={idx} className="bg-white border border-[#2D2A26]/10 rounded-xl p-2.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[#2D2A26]">{c.className}</div>
                    <div className="text-[11px] text-[#2D2A26]/60">Avg: {c.averageScorePercent}% | {c.totalSubmissions} Subs</div>
                  </div>
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">Archived</span>
                </div>
              ))}
          </div>
        </div>
        <div className="flex justify-end pt-2 border-t border-[#2D2A26]/10">
          <button type="button" onClick={() => { onArchiveCohort(); onClose(); }}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all">
            <Archive className="w-3.5 h-3.5" /><span>Archive & Clear Scores for Next Class</span>
          </button>
        </div>
      </div>
    </div>
  );
};
