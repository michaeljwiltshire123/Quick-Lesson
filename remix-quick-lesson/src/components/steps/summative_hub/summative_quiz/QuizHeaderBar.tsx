import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface Props {
  quizTitle: string;
  onChangeTitle: (t: string) => void;
  onGenerateAi: () => void;
  isGenerating: boolean;
}

export const QuizHeaderBar: React.FC<Props> = ({
  quizTitle, onChangeTitle, onGenerateAi, isGenerating,
}) => (
  <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex-1 min-w-[240px]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Summative Quiz Builder</span>
          <button
            type="button"
            onClick={onGenerateAi}
            disabled={isGenerating}
            className={`flex items-center gap-1.5 px-3 py-1 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all ${
              isGenerating
                ? 'bg-amber-600 animate-pulse opacity-90 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600 active:scale-95'
            }`}
          >
            {isGenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>{isGenerating ? 'Generating Questions...' : 'Generate Questions'}</span>
          </button>
        </div>
        <h3 className="text-base sm:text-lg font-black text-[#2D2A26] mt-1.5">{quizTitle}</h3>
      </div>
    </div>
  </div>
);
