import React, { useState } from 'react';
import { GridlockQuestion, TournamentFormat } from '../types/gridlockTypes';
import { GridlockQuestionPreviewCard } from './GridlockQuestionPreviewCard';
import { GridlockMatchRoundRows } from './GridlockMatchRoundRows';
import { Sparkles, HelpCircle } from 'lucide-react';

interface Props {
  questions: GridlockQuestion[];
  isGenerating?: boolean;
  onGenerateAi?: () => void;
  onUpdateQuestion?: (index: number, updated: GridlockQuestion) => void;
  tournamentFormat?: TournamentFormat;
}

export const GridlockQuestionInspector: React.FC<Props> = ({
  questions,
  isGenerating,
  onGenerateAi,
  onUpdateQuestion,
  tournamentFormat,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);

  const safeQuestions = questions || [];
  const active = safeQuestions[selectedIdx] || safeQuestions[0];

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#2D2A26]/15 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2D2A26]/10 pb-3">
        <div className="space-y-0.5">
          <h4 className="text-xs font-black text-[#2D2A26] uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            Gameshow Hexagon Question Bank ({safeQuestions.length} Hexes)
          </h4>
          <p className="text-[11px] text-gray-500">
            Click any letter across Match rows to inspect clue, backup clue, and acceptable variations.
          </p>
        </div>

        {onGenerateAi && (
          <button
            type="button"
            disabled={isGenerating}
            onClick={onGenerateAi}
            className="py-2 px-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Synthesising Gameshow Hexes...' : 'Generate AI Hexagons ✨'}</span>
          </button>
        )}
      </div>

      <GridlockMatchRoundRows
        questions={safeQuestions}
        selectedIdx={selectedIdx}
        tournamentFormat={tournamentFormat}
        onSelectIndex={(idx) => {
          setSelectedIdx(idx);
          setIsEditing(false);
        }}
      />

      {active && (
        <GridlockQuestionPreviewCard
          active={active}
          index={selectedIdx}
          isEditing={isEditing}
          onToggleEditing={() => setIsEditing(!isEditing)}
          onUpdateQuestion={onUpdateQuestion}
        />
      )}
    </div>
  );
};

