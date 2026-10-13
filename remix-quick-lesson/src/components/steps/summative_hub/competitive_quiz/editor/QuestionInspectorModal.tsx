import React from 'react';
import { X, Search, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';
import { QuestionCard } from '../types/competitiveQuizTypes';

interface Props {
  question: QuestionCard | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
}

export const QuestionInspectorModal: React.FC<Props> = ({
  question,
  isOpen,
  onClose,
  onEdit,
}) => {
  if (!isOpen || !question) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-blue-400 rounded-3xl p-5 max-w-md w-full text-white space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-400" />
            <h4 className="text-xs font-black uppercase tracking-wider text-blue-300">
              Pre-Flight Diagnostic Audit
            </h4>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-gray-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase">Format & Target Concept</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
                {cardFormatTitle(question.formatLabel)}
              </span>
              <span className="text-white font-black">{question.conceptCovered}</span>
            </div>
          </div>

          <div className="p-3 bg-black/40 rounded-xl border border-white/10">
            <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Question Prompt</span>
            <p className="font-bold text-gray-100">{question.prompt}</p>
          </div>

          <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Correct Concept Rationale</span>
            </div>
            <p className="text-gray-300 text-[11px]">{question.explanation}</p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
            <span>Cognitive Level: <strong className="text-white">Analysis & Application</strong></span>
            <span>Speed Limit: <strong className="text-amber-300">{question.speedLimitSeconds}s</strong></span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
          <button type="button" onClick={onClose} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold cursor-pointer">
            Close
          </button>
          {onEdit && (
            <button
              type="button"
              onClick={() => { onClose(); onEdit(); }}
              className="px-4 py-1.5 bg-blue-500 hover:bg-blue-400 text-slate-950 rounded-xl text-xs font-black uppercase cursor-pointer"
            >
              Edit Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const cardFormatTitle = (label: string) => label || 'Multiple Choice';
