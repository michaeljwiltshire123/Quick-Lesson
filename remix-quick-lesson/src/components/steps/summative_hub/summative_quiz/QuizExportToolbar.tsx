import React from 'react';
import { Download, ExternalLink, QrCode, CheckCircle2, Eye, Sparkles, BarChart2 } from 'lucide-react';
import { SummativeQuizQuestion } from './typesSummativeQuiz';
import { downloadKahootCsv, exportToGoogleForms } from './summativeQuizExportHelpers';

interface Props {
  quizTitle: string;
  questions: SummativeQuizQuestion[];
  isAttached: boolean;
  onAttach: () => void;
  onOpenPreview?: () => void;
  onOpenInspector?: () => void;
  onToggleAnalytics?: () => void;
  showAnalytics?: boolean;
}

export const QuizExportToolbar: React.FC<Props> = ({
  quizTitle, questions, isAttached, onAttach, onOpenPreview, onOpenInspector, onToggleAnalytics, showAnalytics,
}) => (
  <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-xs">
    <div className="flex flex-wrap items-center gap-2">
      {onOpenPreview && (
        <button type="button" onClick={onOpenPreview} className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs cursor-pointer shadow-xs transition-all">
          <Eye className="w-3.5 h-3.5" /><span>Quiz Preview</span>
        </button>
      )}
      {onOpenInspector && (
        <button type="button" onClick={onOpenInspector} className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2D2A26] hover:bg-black text-amber-300 font-bold rounded-xl text-xs cursor-pointer shadow-xs transition-all">
          <Sparkles className="w-3.5 h-3.5" /><span>Quality Inspector</span>
        </button>
      )}
      {onToggleAnalytics && (
        <button type="button" onClick={onToggleAnalytics} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${showAnalytics ? 'bg-amber-600 text-white' : 'bg-[#F8F6F0] hover:bg-white text-[#2D2A26] border border-[#2D2A26]/15'}`}>
          <BarChart2 className="w-3.5 h-3.5 text-[#D97706]" /><span>{showAnalytics ? 'Edit Questions' : 'Quiz Analytics'}</span>
        </button>
      )}
      <button type="button" onClick={() => downloadKahootCsv(quizTitle, questions)} className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F8F6F0] hover:bg-white text-[#2D2A26] border border-[#2D2A26]/15 rounded-xl text-xs font-bold cursor-pointer">
        <Download className="w-3.5 h-3.5 text-[#D97706]" /><span>Kahoot CSV</span>
      </button>
      <a href={exportToGoogleForms(quizTitle, questions)} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F8F6F0] hover:bg-white text-[#2D2A26] border border-[#2D2A26]/15 rounded-xl text-xs font-bold cursor-pointer">
        <ExternalLink className="w-3.5 h-3.5 text-[#D97706]" /><span>Google Forms</span>
      </a>
    </div>
    <button type="button" onClick={onAttach} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${isAttached ? 'bg-emerald-600 text-white' : 'bg-[#2D2A26] hover:bg-black text-white'}`}>
      {isAttached ? <CheckCircle2 className="w-3.5 h-3.5" /> : <QrCode className="w-3.5 h-3.5 text-[#F59E0B]" />}
      <span>{isAttached ? 'Attached' : 'Attach to Plan'}</span>
    </button>
  </div>
);
