import React from 'react';
import { TeamVoteConsensus } from './typesStudentLadder';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
  choices: string[];
  selectedChoice: number | null;
  eliminatedChoices: number[];
  teamVotes: TeamVoteConsensus[];
  isSubmitted: boolean;
  onSelectChoice: (index: number) => void;
}

export const StudentLadderInputRenderers: React.FC<Props> = ({
  choices, selectedChoice, eliminatedChoices, teamVotes, isSubmitted, onSelectChoice,
}) => (
  <div className="space-y-2.5">
    {choices.map((choice, idx) => {
      const isEliminated = eliminatedChoices.includes(idx);
      const isSelected = selectedChoice === idx;
      const voteInfo = teamVotes.find((v) => v.choiceIndex === idx);
      const letter = String.fromCharCode(65 + idx);

      if (isEliminated) {
        return (
          <div
            key={idx}
            className="p-3 bg-gray-100 border border-gray-200 rounded-2xl opacity-40 text-xs font-bold text-gray-400 line-through flex items-center justify-between"
          >
            <span>{letter}: Option Eliminated</span>
            <XCircle className="w-4 h-4 text-gray-400" />
          </div>
        );
      }

      return (
        <button
          key={idx}
          type="button"
          disabled={isSubmitted}
          onClick={() => onSelectChoice(idx)}
          className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
            isSelected
              ? 'bg-amber-100 border-amber-500 shadow-xs font-extrabold text-[#2D2A26]'
              : 'bg-white border-[#2D2A26]/15 hover:bg-[#F8F6F0] text-[#2D2A26]'
          }`}
        >
          {voteInfo && voteInfo.percentage > 0 && (
            <div
              className="absolute left-0 top-0 bottom-0 bg-amber-500/10 pointer-events-none transition-all duration-500"
              style={{ width: `${voteInfo.percentage}%` }}
            />
          )}

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <span className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-bold ${
                isSelected ? 'bg-amber-500 text-white' : 'bg-[#F8F6F0] text-[#2D2A26]'
              }`}>
                {letter}
              </span>
              <span className="text-xs">{choice}</span>
            </div>

            {isSelected && <CheckCircle className="w-4 h-4 text-amber-600" />}
          </div>

          {voteInfo && voteInfo.percentage > 0 && (
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#2D2A26]/70 font-semibold relative z-10">
              <span>Classroom Vote Consensus:</span>
              <span className="font-extrabold text-amber-800">{voteInfo.percentage}% ({voteInfo.voterCount} votes)</span>
            </div>
          )}
        </button>
      );
    })}
  </div>
);
