import React, { useState } from 'react';
import { Sparkles, RefreshCw, Layers, CheckCircle, Zap } from 'lucide-react';
import { ChunkLike, fetchAICompetitiveQuizQuestions } from '../services/jargonFreeQuestionEngine';
import { QuestionCard, QuestionFormat } from '../types/competitiveQuizTypes';

interface Props {
  lessonTitle: string;
  chunks: ChunkLike[];
  questions: QuestionCard[];
  totalRounds: number;
  selectedFormats: QuestionFormat[];
  onUpdateQuestions: (newQuestions: QuestionCard[]) => void;
  onNotice?: (msg: string) => void;
}

export const ChunkExtractionPipelineCard: React.FC<Props> = ({
  lessonTitle,
  chunks = [],
  questions,
  totalRounds,
  selectedFormats,
  onUpdateQuestions,
  onNotice,
}) => {
  const [extractingStep, setExtractingStep] = useState<number | null>(null);
  const [rerollingIdx, setRerollingIdx] = useState<number | null>(null);

  const activeChunks: ChunkLike[] = chunks.length > 0 ? chunks : [
    { title: `${lessonTitle} - Key Concepts`, notes: 'Foundations and definitions' },
    { title: `${lessonTitle} - Core Mechanisms`, notes: 'Step-by-step processes and rules' },
    { title: `${lessonTitle} - Practical Applications`, notes: 'Tricky problems and edge cases' },
  ];

  const handleExtractAllHybrid = async () => {
    setExtractingStep(0);
    onNotice?.('Initiating Hybrid Arena Split across lesson sections...');
    try {
      const generated = await fetchAICompetitiveQuizQuestions(lessonTitle, activeChunks, totalRounds, selectedFormats);
      onUpdateQuestions(generated);
      onNotice?.(`Generated ${generated.length} balanced arena questions grounded in all lesson topics!`);
    } finally {
      setExtractingStep(null);
    }
  };

  const handleRerollSingle = async (idx: number, chunk: ChunkLike) => {
    setRerollingIdx(idx);
    try {
      const fresh = await fetchAICompetitiveQuizQuestions(lessonTitle, activeChunks, 2, selectedFormats, { index: idx, title: chunk.title || lessonTitle, notes: chunk.notes });
      if (fresh.length > 0) {
        const next = [...questions];
        const replaceIdx = idx % Math.max(1, next.length);
        next[replaceIdx] = fresh[0];
        if (fresh[1] && next.length > replaceIdx + 1) next[replaceIdx + 1] = fresh[1];
        onUpdateQuestions(next);
        onNotice?.(`Refreshed questions for "${chunk.title}"!`);
      }
    } finally {
      setRerollingIdx(null);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-[#2D2A26]/15 shadow-xs space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-600" />
          <h4 className="font-black uppercase tracking-wider text-[#2D2A26]">Lesson Grounding Pipeline</h4>
          <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">Hybrid Arena Split</span>
        </div>
        <button
          type="button"
          onClick={handleExtractAllHybrid}
          disabled={extractingStep !== null}
          className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-xl text-xs flex items-center gap-1.5 shadow-sm hover:opacity-95 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className={`w-3.5 h-3.5 ${extractingStep !== null ? 'animate-spin' : ''}`} />
          <span>{extractingStep !== null ? 'Extracting Across Topics...' : 'Extract All Lesson Topics'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {activeChunks.map((chunk, idx) => (
          <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-gray-200 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase text-gray-500 truncate block max-w-[140px]">{chunk.title}</span>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </div>
              <p className="text-[11px] text-gray-600 line-clamp-1">{chunk.notes || 'Core lesson knowledge & definitions'}</p>
            </div>
            <button
              type="button"
              disabled={rerollingIdx === idx}
              onClick={() => handleRerollSingle(idx, chunk)}
              className="w-full py-1 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg text-[10px] font-bold text-gray-700 flex items-center justify-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${rerollingIdx === idx ? 'animate-spin' : ''}`} />
              <span>Re-extract this topic</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
