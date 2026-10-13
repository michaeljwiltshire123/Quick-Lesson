import React from 'react';
import { SecretWordCard } from '../types/dontSayItTypes';
import { Mic, ShieldAlert, Lock, Users } from 'lucide-react';

interface Props {
  card: SecretWordCard;
  turnSecondsRemaining?: number;
  totalTurnSeconds?: number;
  isCurrentSpeaker: boolean;
}

export const StudentClueGiverCard: React.FC<Props> = ({
  card,
  turnSecondsRemaining = 5,
  isCurrentSpeaker,
}) => {
  const bannedWords = (card.studentBannedWords && card.studentBannedWords.length > 0)
    ? card.studentBannedWords
    : (card.activeBannedWords && card.activeBannedWords.length > 0)
    ? card.activeBannedWords
    : card.aiFallbackBannedWords || [];

  const isPlayerCreated = card.studentBannedWords && card.studentBannedWords.length > 0;

  return (
    <div
      className={`p-5 rounded-3xl border-4 transition-all space-y-4 shadow-xl ${
        isCurrentSpeaker
          ? 'bg-emerald-500 border-emerald-300 text-white animate-pulse'
          : 'bg-white border-[#2D2A26]/20 text-[#2D2A26]'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${isCurrentSpeaker ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-[10px] font-black uppercase tracking-wider ${isCurrentSpeaker ? 'text-emerald-100' : 'text-gray-500'}`}>
              {isCurrentSpeaker ? '🔥 YOU ARE THE ACTIVE SPEAKER!' : 'Upcoming Speaker'}
            </div>
            <div className="text-sm font-bold">Describe Without Forbidden Terms</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-[9px] font-black uppercase tracking-wider opacity-80">Turn Clock</div>
          <div className="text-lg font-mono font-black">{turnSecondsRemaining}s</div>
        </div>
      </div>

      <div className={`p-4 rounded-2xl text-center space-y-1 ${isCurrentSpeaker ? 'bg-black/30 border border-white/20' : 'bg-[#FAF8F5] border border-black/10'}`}>
        <span className={`text-[10px] font-black uppercase tracking-wider ${isCurrentSpeaker ? 'text-emerald-200' : 'text-amber-700'}`}>
          Target Word To Describe
        </span>
        <h2 className="text-3xl font-black uppercase tracking-tight font-mono">{card.targetWord}</h2>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-rose-600">
          <span className="flex items-center gap-1.5"><ShieldAlert className="w-4 h-4" /> Forbidden Words (Do NOT Say!)</span>
          {isPlayerCreated && (
            <span className="text-[9px] bg-rose-100 text-rose-900 px-2 py-0.5 rounded-full font-bold border border-rose-300 flex items-center gap-1">
              <Users className="w-3 h-3" /> Player Created
            </span>
          )}
        </div>

        {bannedWords.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
            {bannedWords.map((word, idx) => (
              <div
                key={idx}
                className="py-2.5 px-3 bg-red-600 text-white border border-red-700 rounded-xl text-xs font-black uppercase text-center shadow-xs flex items-center justify-between gap-1"
              >
                <span className="truncate">{word}</span>
                <Lock className="w-3.5 h-3.5 text-white/80 shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center text-xs font-bold text-amber-900">
            ⏳ Opposing team is submitting forbidden words for this round...
          </div>
        )}
      </div>
    </div>
  );
};
