import React from 'react';
import { AdjudicationState } from '../types/dontSayItTypes';
import { CheckCircle2, Play, Scale, Ear, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  adjudication?: AdjudicationState;
  onConfirm: () => void;
  onContinue: () => void;
  onTeacherOverride?: () => void;
}

export const AdjudicationModal: React.FC<Props> = ({
  isOpen,
  adjudication,
  onConfirm,
  onContinue,
  onTeacherOverride,
}) => {
  if (!isOpen || !adjudication || !adjudication.isActive) return null;

  const isHeardTheWord = adjudication.type === 'heard_the_word';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white w-full max-w-sm rounded-3xl p-6 border-2 border-amber-400/50 shadow-2xl space-y-4 text-center animate-in zoom-in-95">
        <div className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center border ${
          isHeardTheWord
            ? 'bg-emerald-600/30 text-emerald-400 border-emerald-500'
            : 'bg-red-600/30 text-red-400 border-red-500'
        }`}>
          {isHeardTheWord ? <Ear className="w-6 h-6" /> : <Scale className="w-6 h-6" />}
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
            {isHeardTheWord ? 'Heard the Word Confirmation' : 'Foul Objection Review'}
          </div>
          <h3 className="text-lg font-black tracking-tight text-white">
            {isHeardTheWord ? 'Confirm Correct Guess?' : 'Uphold Foul Penalty?'}
          </h3>
          <p className="text-xs text-slate-300">
            {isHeardTheWord
              ? `Did the guesser speak the target term? Confirming awards +${adjudication.frozenPoints} pts automatically.`
              : 'Did the clue-giver use a forbidden word or rhyme?'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <button
            type="button"
            onClick={onConfirm}
            className={`py-3 px-3 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer shadow-md text-white ${
              isHeardTheWord ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{isHeardTheWord ? 'Correct (Award Pts)' : 'Foul Upheld (-50)'}</span>
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="py-3 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer shadow-md border border-white/10"
          >
            <Play className="w-5 h-5 text-amber-400" />
            <span>{isHeardTheWord ? 'Continue Round' : 'Play On (No Foul)'}</span>
          </button>
        </div>

        {onTeacherOverride && (
          <button
            type="button"
            onClick={onTeacherOverride}
            className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer pt-1 block mx-auto"
          >
            Teacher Override
          </button>
        )}
      </div>
    </div>
  );
};
