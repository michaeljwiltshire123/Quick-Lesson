import React from 'react';
import { X, ShieldAlert, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { LadderRungQuestion } from '../typesLadder';
import { RungRigorBreakdownCard } from './RungRigorBreakdownCard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  rungs: LadderRungQuestion[];
  gradeLevel: string;
}

export const LadderQualityInspectorModal: React.FC<Props> = ({ isOpen, onClose, rungs, gradeLevel }) => {
  if (!isOpen) return null;

  const total = rungs.length || 1;
  const recallCount = rungs.filter((r) => r.rungNumber <= 3).length;
  const applyCount = rungs.filter((r) => r.rungNumber >= 4 && r.rungNumber <= 7).length;
  const evalCount = rungs.filter((r) => r.rungNumber >= 8).length;

  const pctRecall = Math.round((recallCount / total) * 100);
  const pctApply = Math.round((applyCount / total) * 100);
  const pctEval = Math.round((evalCount / total) * 100);

  // Simple pedagogical analysis heuristics
  const totalLength = rungs.reduce((acc, r) => acc + r.prompt.length, 0);
  const avgLength = Math.round(totalLength / total);
  const readingAge = avgLength < 60 ? 'Suitable for Key Stage 3 / 4' : 'Optimal for Key Stage 5 & Advanced Level';

  return (
    <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#181614] text-white rounded-3xl border border-white/20 shadow-2xl max-w-4xl w-full max-h-[88vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wide">Rung Rigor & Quality Inspector</h3>
              <p className="text-[10px] text-gray-400 font-medium">Validating cognitive progression matching {gradeLevel}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Workspace */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Taxonomy progression bar */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Bloom's Cognitive Progression Check
            </h4>
            <div className="w-full h-3.5 bg-white/10 rounded-full flex overflow-hidden">
              <div className="bg-amber-500 h-full text-[9px] font-black font-mono text-slate-900 flex items-center justify-center transition-all" style={{ width: `${pctRecall}%` }} title="Factual Recall">
                {pctRecall}% Recall
              </div>
              <div className="bg-teal-500 h-full text-[9px] font-black font-mono text-slate-900 flex items-center justify-center transition-all" style={{ width: `${pctApply}%` }} title="Application">
                {pctApply}% Apply
              </div>
              <div className="bg-orange-500 h-full text-[9px] font-black font-mono text-slate-900 flex items-center justify-center transition-all" style={{ width: `${pctEval}%` }} title="Evaluation & Misconceptions">
                {pctEval}% Eval
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="flex items-center gap-2 bg-black/20 p-2.5 rounded-xl border border-white/5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-gray-400 block text-[10px]">Readability Standard</span>
                  <span className="font-bold text-gray-200">{readingAge}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-black/20 p-2.5 rounded-xl border border-white/5">
                <AlertCircle className="w-4 h-4 text-teal-400" />
                <div>
                  <span className="text-gray-400 block text-[10px]">Taxonomy Check</span>
                  <span className="font-bold text-gray-200">Balanced 10-Step Escalation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rungs detailed view */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Detailed Rung Stage Audits</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rungs.map((rung) => (
                <RungRigorBreakdownCard key={rung.id} rung={rung} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
