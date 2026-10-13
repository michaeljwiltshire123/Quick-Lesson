import React from 'react';
import { Download, ExternalLink, Plus, Eye } from 'lucide-react';
import { SummativeQuizQuestion } from './typesSummativeQuiz';
import { downloadKahootCsv, exportToGoogleForms } from './summativeQuizExportHelpers';

interface Props {
  quizTitle: string;
  questions: SummativeQuizQuestion[];
  onAddQuestion: () => void;
  onOpenPreview?: () => void;
}

export const QuizActionToolbar: React.FC<Props> = ({
  quizTitle,
  questions,
  onAddQuestion,
  onOpenPreview,
}) => (
  <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-xs">
    <div className="flex flex-wrap items-center gap-2">
      {onOpenPreview && (
        <button
          type="button"
          onClick={onOpenPreview}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs cursor-pointer shadow-xs transition-all"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quiz Preview</span>
        </button>
      )}
      <button
        type="button"
        onClick={() => downloadKahootCsv(quizTitle, questions)}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F8F6F0] hover:bg-white text-[#2D2A26] border border-[#2D2A26]/15 rounded-xl text-xs font-bold cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 text-[#D97706]" />
        <span>Kahoot 30s CSV Export</span>
      </button>
      <a
        href={exportToGoogleForms(quizTitle, questions)}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F8F6F0] hover:bg-white text-[#2D2A26] border border-[#2D2A26]/15 rounded-xl text-xs font-bold cursor-pointer"
      >
        <ExternalLink className="w-3.5 h-3.5 text-[#D97706]" />
        <span>Google Forms Exporter</span>
      </a>
    </div>
    <button
      type="button"
      onClick={onAddQuestion}
      className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2D2A26] hover:bg-black text-white rounded-xl text-xs font-bold cursor-pointer"
    >
      <Plus className="w-3.5 h-3.5 text-[#F59E0B]" />
      <span>Add Question</span>
    </button>
  </div>
);
