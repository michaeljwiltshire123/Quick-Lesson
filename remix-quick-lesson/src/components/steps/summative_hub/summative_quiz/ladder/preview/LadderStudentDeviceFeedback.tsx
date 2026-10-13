import React from 'react';
import { Check, X } from 'lucide-react';
import { LadderRungQuestion } from '../typesLadder';

interface Props {
  rung: LadderRungQuestion; selectedAnswer: number | null;
}

export const LadderStudentDeviceFeedback: React.FC<Props> = ({ rung, selectedAnswer }) => {
  const isCorrect = selectedAnswer === rung.correctChoiceIndex;

  return (
    <div className="flex-1 flex flex-col justify-between text-left space-y-2 font-sans text-white text-[10px] h-full overflow-hidden animate-in zoom-in-95">
      <div className={`p-2.5 rounded-xl border text-center font-black uppercase tracking-wider shrink-0 ${isCorrect ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-rose-500/20 border-rose-500/40 text-rose-300'}`}>
        <span>{isCorrect ? '✨ Correct! +Points Earned' : '❌ Incorrect!'}</span>
      </div>

      <div className="flex-1 flex flex-col justify-around gap-1.5 py-1">
        {rung.choices.map((choice, idx) => {
          const isCorrectChoice = idx === rung.correctChoiceIndex;
          const isMyWrongChoice = !isCorrect && selectedAnswer === idx;

          return (
            <div key={idx} className={`py-1.5 px-2.5 rounded-lg border text-[9px] font-bold flex items-center gap-2 ${isCorrectChoice ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : isMyWrongChoice ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-white/5 border-white/5 text-gray-500 opacity-40'}`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black shrink-0 ${isCorrectChoice ? 'bg-emerald-500 text-[#12110F]' : isMyWrongChoice ? 'bg-rose-500 text-[#12110F]' : 'bg-white/10'}`}>
                {isCorrectChoice ? <Check className="w-2.5 h-2.5 stroke-[4]" /> : isMyWrongChoice ? <X className="w-2.5 h-2.5 stroke-[4]" /> : ['A', 'B', 'C', 'D'][idx]}
              </span>
              <span className="flex-1 whitespace-normal break-words leading-tight text-[9px]">{choice}</span>
            </div>
          );
        })}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-2 shrink-0">
        <span className="text-[8px] uppercase tracking-wider text-amber-400 font-bold block mb-0.5 font-sans">Quick Explanation:</span>
        <p className="text-[9px] text-gray-300 leading-normal line-clamp-3 font-sans">{rung.explanation}</p>
      </div>
    </div>
  );
};
