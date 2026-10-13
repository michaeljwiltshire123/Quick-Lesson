import React from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { ImposterQuestion } from '../types/imposterTypes';
import { ImposterRigorBreakdownCard } from './ImposterRigorBreakdownCard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  questions: ImposterQuestion[];
  lessonTitle: string;
}

export const ImposterQualityInspectorModal: React.FC<Props> = ({
  isOpen, onClose, questions, lessonTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-[#2D2A26]/20 rounded-3xl max-w-3xl w-full p-6 text-[#2D2A26] space-y-4 shadow-2xl relative max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-100 text-amber-800">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-black text-sm text-[#2D2A26]">Question Quality Inspector</h3>
              <p className="text-[11px] text-[#2D2A26]/60">Pedagogical rigor and curriculum coverage audit for &ldquo;{lessonTitle}&rdquo;</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto flex-1 pr-1">
          <ImposterRigorBreakdownCard questions={questions} />

          <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#2D2A26]/15 space-y-2">
            <h4 className="text-xs font-black text-[#2D2A26] uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" /> Lesson Milestone Coverage
            </h4>
            <div className="space-y-1.5">
              {questions.map((q, idx) => (
                <div key={q.id} className="bg-white p-2.5 rounded-xl border border-[#2D2A26]/10 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono font-bold text-[#2D2A26]/50">#{idx + 1}</span>
                    <span className="font-semibold text-[#2D2A26] truncate">{q.prompt}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    {q.chunkTitle || 'Core Concept'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#2D2A26]/10">
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ready for classroom deployment</span>
          </div>
          <button type="button" onClick={onClose} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl cursor-pointer">
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
