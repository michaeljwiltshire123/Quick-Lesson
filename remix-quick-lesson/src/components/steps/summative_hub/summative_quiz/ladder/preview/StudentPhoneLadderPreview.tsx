import React from 'react';
import { Smartphone, Check, X, Shield, Users, EyeOff } from 'lucide-react';
import { LadderRungQuestion } from '../typesLadder';

interface Props {
  question?: LadderRungQuestion;
  onAnswer: (idx: number) => void;
  selectedAnswer: number | null;
  eliminatedChoices: number[];
  activeShield: boolean;
  askClassResults: number[] | null;
}

export const StudentPhoneLadderPreview: React.FC<Props> = ({
  question, onAnswer, selectedAnswer, eliminatedChoices, activeShield, askClassResults,
}) => {
  if (!question) {
    return (
      <div className="bg-[#181614] rounded-3xl border-4 border-slate-700 p-4 aspect-[9/16] max-w-[280px] mx-auto flex flex-col justify-center items-center text-center text-xs text-gray-400">
        <Smartphone className="w-8 h-8 mb-2 text-slate-500" />
        No active question rungs available
      </div>
    );
  }

  return (
    <div className="bg-[#181614] rounded-3xl border-4 border-slate-700 p-4 aspect-[9/16] max-w-[280px] mx-auto flex flex-col justify-between text-white shadow-2xl relative overflow-hidden font-sans">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="text-[9px] font-mono font-bold text-amber-400">Stage {question.rungNumber} Pupil View</span>
        <div className="flex items-center gap-1">
          {activeShield && <Shield className="w-3 h-3 text-emerald-400 fill-emerald-400/20" />}
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      <div className="flex-1 py-3 flex flex-col justify-center space-y-3.5">
        <div className="text-xs font-bold text-gray-100 leading-relaxed text-center">{question.prompt}</div>
        <div className="space-y-2">
          {question.choices.map((choice, idx) => {
            const isEliminated = eliminatedChoices.includes(idx);
            const isSelected = selectedAnswer === idx;
            const isCorrect = question.correctChoiceIndex === idx;

            let buttonStyle = 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-200';
            if (isEliminated) {
              buttonStyle = 'bg-black/40 border-white/5 text-gray-600 cursor-not-allowed opacity-30';
            } else if (selectedAnswer !== null) {
              buttonStyle = isSelected ? (isCorrect ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-rose-950/60 border-rose-500 text-rose-300') : (isCorrect ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400' : buttonStyle);
            }

            return (
              <button key={idx} type="button" disabled={isEliminated || selectedAnswer !== null} onClick={() => onAnswer(idx)}
                className={`w-full text-left p-2.5 rounded-xl border text-[10px] font-bold flex items-center justify-between transition-all cursor-pointer ${buttonStyle}`}>
                <span className="truncate">{choice}</span>
                {selectedAnswer !== null && isSelected && (isCorrect ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />)}
                {isEliminated && <EyeOff className="w-3 h-3 text-gray-600" />}
              </button>
            );
          })}
        </div>

        {askClassResults && (
          <div className="bg-black/50 p-2.5 rounded-xl border border-blue-500/20 space-y-1">
            <span className="text-[8px] uppercase font-bold text-blue-300 flex items-center gap-1"><Users className="w-2.5 h-2.5" /> Class Opinion Poll results:</span>
            <div className="grid grid-cols-4 gap-1 text-[8px] font-mono text-center">
              {askClassResults.map((pct, i) => (
                <div key={i} className="bg-white/5 p-1 rounded"><div className="font-bold text-blue-300">{pct}%</div><div className="text-gray-400">Opt {['A', 'B', 'C', 'D'][i]}</div></div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-[8px] text-gray-500 font-mono">Active Rung Reward: {question.pointValue.toLocaleString()} pts</div>
    </div>
  );
};
