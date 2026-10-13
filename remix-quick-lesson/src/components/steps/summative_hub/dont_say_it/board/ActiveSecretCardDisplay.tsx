import React from 'react';
import { SecretWordCard } from '../types/dontSayItTypes';
import { ShieldAlert, Users, Lock } from 'lucide-react';

interface Props {
  card: SecretWordCard;
  bannedWords?: string[];
  isGuesserRevealed?: boolean;
}

export const ActiveSecretCardDisplay: React.FC<Props> = ({ card, bannedWords: propBanned }) => {
  const allPlayerBanned = (card.studentBannedWords && card.studentBannedWords.length > 0)
    ? card.studentBannedWords
    : (card.activeBannedWords && card.activeBannedWords.length > 0)
    ? card.activeBannedWords
    : (propBanned && propBanned.length > 0)
    ? propBanned
    : card.aiFallbackBannedWords || [];

  const isPlayerCreated = card.studentBannedWords && card.studentBannedWords.length > 0;
  const wordCount = allPlayerBanned.length;

  // Big Screen Adaptive Grid Layout: Ensures 1 to 20+ words fit fully without scrolling!
  const gridCols =
    wordCount > 14
      ? 'grid-cols-3 sm:grid-cols-5'
      : wordCount > 8
      ? 'grid-cols-3 sm:grid-cols-4'
      : wordCount > 4
      ? 'grid-cols-2 sm:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2';

  const wordPadding = wordCount > 14 ? 'py-1 px-2 text-[10px]' : wordCount > 8 ? 'py-1.5 px-2.5 text-[11px]' : 'py-2 px-3 text-xs sm:text-sm';

  return (
    <div className="relative z-20 bg-white rounded-3xl p-4 sm:p-6 border-4 border-[#2D2A26] shadow-2xl space-y-3 text-center max-w-3xl mx-auto">
      <div className="space-y-0.5">
        <span className="px-3 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[10px] font-black uppercase tracking-wider">
          Secret Target Word
        </span>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#2D2A26] tracking-tight font-mono uppercase">
          {card.targetWord}
        </h1>
      </div>

      <div className="space-y-2 pt-1 border-t border-slate-100">
        <div className="flex items-center justify-center gap-2 text-xs font-black uppercase text-rose-600 tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Forbidden Words ({wordCount} Terms • Opposing Sabotage)</span>
          {isPlayerCreated && (
            <span className="px-2 py-0.5 bg-rose-100 text-rose-900 text-[9px] font-bold rounded-full flex items-center gap-1 border border-rose-300">
              <Users className="w-3 h-3" /> Player Created
            </span>
          )}
        </div>

        {wordCount > 0 ? (
          <div className={`grid ${gridCols} gap-1.5 w-full mx-auto`}>
            {allPlayerBanned.map((word, idx) => (
              <div
                key={idx}
                className={`${wordPadding} bg-rose-50 border-2 border-rose-300 rounded-xl font-black text-rose-950 uppercase tracking-wide flex items-center justify-between shadow-2xs gap-1`}
              >
                <span className="truncate">{word}</span>
                <Lock className="w-3 h-3 text-rose-600 shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-900">
            ⏳ Waiting for Opposing Players to create forbidden words...
          </div>
        )}
      </div>
    </div>
  );
};
