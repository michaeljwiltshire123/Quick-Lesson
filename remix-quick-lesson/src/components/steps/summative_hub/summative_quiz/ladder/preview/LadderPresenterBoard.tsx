import React from 'react';
import { Clock, Users, ShieldAlert, Check, X } from 'lucide-react';
import { LadderRungQuestion } from '../typesLadder';

interface Props {
  rung: LadderRungQuestion; revealed: boolean; selectedAnswer: number | null;
  timeLeft: number; showPollOverlay: boolean; pollGraceTime: number; showPeerWait: boolean;
}

export const LadderPresenterBoard: React.FC<Props> = ({
  rung, revealed, selectedAnswer, timeLeft, showPollOverlay, pollGraceTime, showPeerWait,
}) => {
  return (
    <div className="bg-[#1C1A17] border border-amber-500/20 rounded-2xl p-5 space-y-4 shadow-xl text-white font-sans">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <span className="text-[10px] font-bold text-amber-500">Presenter Board</span>
        <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-0.5 rounded text-xs font-bold text-gray-200 font-mono">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{revealed ? 'Answer Revealed' : showPollOverlay ? `Poll Grace: ${pollGraceTime}s` : showPeerWait ? 'Waiting for Nominee...' : `${timeLeft}s`}</span>
        </div>
      </div>

      {showPeerWait ? (
        <div className="p-8 text-center bg-purple-950/20 border border-purple-500/20 rounded-2xl space-y-3 animate-pulse">
          <ShieldAlert className="w-8 h-8 text-purple-400 mx-auto" />
          <h4 className="text-sm font-black uppercase">WAITING FOR NOMINATED PLAYER ACTION...</h4>
          <p className="text-[11px] text-gray-400 leading-relaxed">The nominee consult is currently reviewing advice on their handset device.</p>
        </div>
      ) : (
        <>
          <div className="space-y-1">
            <span className="text-xs text-gray-400">Rung {rung.rungNumber} • Reward: {rung.pointValue.toLocaleString()} pts</span>
            <h4 className="text-base font-bold text-white leading-relaxed">{rung.prompt}</h4>
          </div>

          {showPollOverlay ? (
            <div className="space-y-3 bg-black/30 p-4 rounded-xl border border-blue-500/20 animate-in zoom-in-95">
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-1.5">
                <span className="font-bold text-blue-400 uppercase flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Classroom opinion poll</span>
                <span className="text-amber-400 font-mono font-bold">10s Grace Window Active</span>
              </div>
              <div className="space-y-2">
                {rung.choices.map((choice, idx) => {
                  const isCorrect = idx === rung.correctChoiceIndex;
                  const pct = isCorrect ? 70 : idx === (rung.correctChoiceIndex + 1) % 4 ? 15 : idx === (rung.correctChoiceIndex + 2) % 4 ? 10 : 5;
                  return (
                    <div key={idx} className="space-y-1 text-[11px]">
                      <div className="flex justify-between text-gray-300 font-bold">
                        <span>{['A', 'B', 'C', 'D'][idx]}. {choice}</span>
                        <span className={isCorrect ? 'text-blue-300 font-mono font-bold' : 'text-gray-400 font-mono'}>{pct}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${isCorrect ? 'bg-blue-500 animate-pulse' : 'bg-white/15'}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : revealed ? (
            <div className="space-y-3 animate-in zoom-in-95">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {rung.choices.map((choice, idx) => {
                  const isCorrect = idx === rung.correctChoiceIndex;
                  const isWrong = selectedAnswer === idx && !isCorrect;
                  return (
                    <div key={idx} className={`p-3 rounded-xl font-bold border flex items-center gap-2.5 transition-all ${isCorrect ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.25)]' : isWrong ? 'bg-rose-500/20 border-rose-500/50 text-rose-300' : 'bg-white/5 border-white/5 text-gray-400 opacity-50'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${isCorrect ? 'bg-emerald-500 text-slate-950' : isWrong ? 'bg-rose-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                        {isCorrect ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : isWrong ? <X className="w-3.5 h-3.5 stroke-[3]" /> : ['A', 'B', 'C', 'D'][idx]}
                      </div>
                      <span className="flex-1">{choice}</span>
                    </div>
                  );
                })}
              </div>
              <div className="bg-emerald-950/30 border border-emerald-500/30 p-3.5 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Curriculum Explanation</span>
                <p className="text-xs text-gray-200 leading-relaxed font-sans">{rung.explanation}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {rung.choices.map((choice, idx) => (
                <div key={idx} className="p-3 rounded-xl font-bold bg-white/5 border border-white/10 text-gray-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-gray-400">{['A', 'B', 'C', 'D'][idx]}</span>
                  <span>{choice}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default LadderPresenterBoard;
