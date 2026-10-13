import React from 'react';
import { Users, Sparkles, HelpCircle, Trash2, FileText } from 'lucide-react';
import { LessonChunk } from '../../../types';

interface ClassroomActionSlateProps {
  chunk: LessonChunk;
  onUpdateChunk: (updated: LessonChunk) => void;
  onOpenFormativeModal: () => void;
  onOpenCheckModal: () => void;
}

export const ClassroomActionSlate: React.FC<ClassroomActionSlateProps> = ({
  chunk, onUpdateChunk, onOpenFormativeModal, onOpenCheckModal,
}) => {
  const checkQuestions = (chunk.attachments || []).filter((a) => a.type === 'document');

  const removeTask = () => {
    onUpdateChunk({ ...chunk, formativeTaskTitle: undefined, formativeTaskDetails: undefined, formativeTaskBadge: undefined });
  };

  const removeQuestion = (id: string) => {
    onUpdateChunk({ ...chunk, attachments: (chunk.attachments || []).filter((a) => a.id !== id) });
  };

  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-2xs space-y-3 mt-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#2D2A26]">
          <Users className="w-4 h-4 text-[#D97706]" />
          <span>Classroom Task</span>
        </div>
        {chunk.formativeTaskGrouping && (
          <span className="text-xs font-extrabold bg-[#F8F6F0] text-[#D97706] px-2.5 py-0.5 rounded-full border border-[#2D2A26]/10 uppercase">
            {chunk.formativeTaskGrouping}
          </span>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A26]/70 mb-1">Student Grouping</label>
        <select
          value={chunk.formativeTaskGrouping || 'Pairs'}
          onChange={(e) => onUpdateChunk({ ...chunk, formativeTaskGrouping: e.target.value })}
          className="w-full text-xs sm:text-sm font-bold bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl px-3 py-1.5 text-[#2D2A26] focus:outline-none cursor-pointer focus:ring-2 focus:ring-[#F59E0B]/30"
        >
          <option value="Solo">Solo</option>
          <option value="Pairs">Pairs</option>
          <option value="Trios">Trios</option>
          <option value="Small Groups">Small Groups</option>
          <option value="Whole Class">Whole Class</option>
        </select>
      </div>

      {chunk.formativeTaskTitle && (
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1 relative">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-amber-100 text-amber-900 rounded border border-amber-300">{chunk.formativeTaskBadge || 'TASK'}</span>
            <button type="button" onClick={removeTask} className="p-1 text-red-600 hover:bg-red-100 rounded-lg cursor-pointer" title="Remove Active Task"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
          <h5 className="text-xs font-bold text-[#2D2A26] leading-tight">{chunk.formativeTaskTitle}</h5>
          {chunk.formativeTaskDetails && <p className="text-[11px] text-[#2D2A26]/80 leading-snug line-clamp-2">{chunk.formativeTaskDetails}</p>}
        </div>
      )}

      {checkQuestions.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-[#2D2A26]/10">
          <span className="text-xs font-bold text-[#2D2A26] flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-[#D97706]" /> Attached Questions ({checkQuestions.length})</span>
          <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
            {checkQuestions.map((q) => (
              <div key={q.id} className="p-2 bg-[#F8F6F0] border border-[#2D2A26]/10 rounded-lg flex items-start justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <p className="font-semibold text-[#2D2A26] leading-snug">{q.name}</p>
                  {q.url && <p className="text-[10px] text-[#2D2A26]/60 italic">{q.url}</p>}
                </div>
                <button type="button" onClick={() => removeQuestion(q.id)} className="p-0.5 text-[#2D2A26]/50 hover:text-red-600 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#2D2A26]/10">
        <button type="button" onClick={onOpenFormativeModal} className="px-2.5 py-2.5 bg-[#F8F6F0] hover:bg-amber-100 text-[#2D2A26] border border-[#2D2A26]/15 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-98">
          <Sparkles className="w-4 h-4 text-[#D97706]" />
          <span>{chunk.formativeTaskTitle ? 'Change Task' : 'Add Task'}</span>
        </button>
        <button type="button" onClick={onOpenCheckModal} className="px-2.5 py-2.5 bg-[#F8F6F0] hover:bg-amber-100 text-[#2D2A26] border border-[#2D2A26]/15 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-98">
          <HelpCircle className="w-4 h-4 text-[#D97706]" />
          <span>Attach Questions</span>
        </button>
      </div>
    </div>
  );
};
