import React from 'react';
import { Lock, Sparkles, CheckCircle, AlertTriangle, Users } from 'lucide-react';
import { SecretWordCard } from '../types/dontSayItTypes';

interface Props {
  card: SecretWordCard;
  cardIndex: number;
  totalCards: number;
  onCorrect: () => void;
}

export const ClueGiverPreviewCard: React.FC<Props> = ({ card, cardIndex, totalCards, onCorrect }) => {
  const bannedList = (card.studentBannedWords && card.studentBannedWords.length > 0)
    ? card.studentBannedWords
    : (card.activeBannedWords && card.activeBannedWords.length > 0)
    ? card.activeBannedWords
    : card.aiFallbackBannedWords || [];

  const isPlayerCreated = card.studentBannedWords && card.studentBannedWords.length > 0;

  return (
    <div className="relative z-20 bg-slate-900 border-2 border-amber-400 rounded-2xl p-4 text-white shadow-xl space-y-3 flex flex-col justify-between">
      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-amber-400 border-b border-white/10 pb-2">
        <span>Clue-Giver View • Card {cardIndex + 1} of {totalCards}</span>
        <span className="bg-amber-400/20 px-2 py-0.5 rounded text-amber-300 font-mono">DESCRIBE THIS WORD</span>
      </div>

      <div className="text-center py-2 bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 rounded-xl border border-amber-400/40">
        <span className="text-[9px] uppercase font-mono font-bold text-amber-300 block">Target Word</span>
        <h3 className="text-xl font-black tracking-tight text-white">{card.targetWord}</h3>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-black uppercase text-rose-400">
          <span className="flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> FORBIDDEN TABOO WORDS ({bannedList.length}):</span>
          {isPlayerCreated && <span className="text-[9px] bg-rose-900/60 text-rose-200 px-1.5 py-0.5 rounded font-bold border border-rose-500/40">PLAYER CREATED</span>}
        </div>

        {bannedList.length > 0 ? (
          <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-0.5">
            {bannedList.map((word, idx) => (
              <div key={idx} className="bg-rose-950/80 border border-rose-500/50 rounded-lg p-1.5 flex items-center gap-1.5 text-xs font-bold text-rose-200">
                <Lock className="w-3 h-3 text-rose-400 shrink-0" />
                <span className="truncate">{word}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-2 bg-amber-950/40 border border-amber-500/30 rounded-lg text-[10px] text-amber-300 text-center font-bold">
            Opposing players are submitting forbidden words...
          </div>
        )}
      </div>

      {card.hint && (
        <div className="p-2 bg-slate-800/80 rounded-lg border border-white/10 text-[10px] text-gray-300 flex items-start gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
          <span className="line-clamp-2">{card.hint}</span>
        </div>
      )}

      <button
        type="button"
        onClick={onCorrect}
        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-98 transition-all"
      >
        <CheckCircle className="w-4 h-4" />
        <span>Team Guessed Correctly (+100)</span>
      </button>
    </div>
  );
};
