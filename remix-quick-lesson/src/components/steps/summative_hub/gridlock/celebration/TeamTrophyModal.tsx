import React from 'react';
import { TeamColor } from '../types/gridlockTypes';
import { MvpPodiumCard, MvpRankEntry } from './MvpPodiumCard';
import { Trophy, ArrowRight, X } from 'lucide-react';

interface Props {
  isOpen: boolean; winningTeam: TeamColor; isTournamentEnd?: boolean;
  finalScores: { red: number; blue: number }; mvps: MvpRankEntry[]; onClose: () => void;
  onNextRound?: () => void; onViewSummary?: () => void;
}

export const TeamTrophyModal: React.FC<Props> = ({
  isOpen, winningTeam, isTournamentEnd = false, finalScores, mvps, onClose, onNextRound, onViewSummary,
}) => {
  if (!isOpen) return null;
  const isRed = winningTeam === 'red';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-hidden">
      <style>{`
        @keyframes spotlightWhip { 0%, 100% { opacity: 0.15; transform: rotate(-8deg); } 50% { opacity: 0.35; transform: rotate(8deg); } }
        @keyframes trophyShine { 0% { transform: translateX(-150%) skewX(-25deg); } 100% { transform: translateX(150%) skewX(-25deg); } }
      `}</style>

      {/* Cinematic Spotlight Beams */}
      <div className="absolute inset-x-0 top-0 h-[450px] bg-gradient-to-b from-amber-400/10 via-transparent to-transparent opacity-45 pointer-events-none origin-top mix-blend-screen" style={{ animation: 'spotlightWhip 5s infinite ease-in-out' }} />
      <div className="absolute inset-x-0 top-0 h-[450px] bg-gradient-to-b from-purple-400/5 via-transparent to-transparent opacity-30 pointer-events-none origin-top mix-blend-screen" style={{ animation: 'spotlightWhip 4s infinite ease-in-out reverse' }} />

      <div className="bg-[#FAF8F5] w-full max-w-lg rounded-3xl border-2 border-[#2D2A26]/25 shadow-2xl p-6 space-y-4 relative z-10 overflow-hidden">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-gray-500 cursor-pointer z-20">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 relative">
          {/* Trophy Container with Reflective Sheen Sweep */}
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-amber-950 shadow-lg animate-bounce relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full" style={{ animation: 'trophyShine 2s infinite ease-in-out' }} />
            <Trophy className="w-10 h-10 drop-shadow-md" />
          </div>

          <h2 className="text-xl font-black text-[#2D2A26] uppercase tracking-wide">
            {isTournamentEnd ? '🏆 Tournament Champions!' : '🎉 Hexagon Bridge Complete!'}
          </h2>
          <div className={`inline-block px-4 py-1 rounded-full font-black text-xs uppercase tracking-wider text-white shadow-sm ${
            isRed ? 'bg-red-600' : 'bg-blue-600'
          }`}>
            {isRed ? 'Red Team Victory' : 'Blue Team Victory'}
          </div>
          <p className="text-xs text-gray-600">
            Final series score: <strong className="text-red-650">Red {finalScores.red}</strong> vs{' '}
            <strong className="text-blue-650">Blue {finalScores.blue}</strong>
          </p>
        </div>

        <MvpPodiumCard
          title={isTournamentEnd ? 'Tournament Podium Champions' : 'Match MVP Leaders'}
          isTournamentChampionView={isTournamentEnd}
          mvps={mvps}
        />

        <div className="flex items-center gap-3 pt-1">
          {onViewSummary && (
            <button type="button" onClick={onViewSummary} className="flex-1 py-3 px-4 bg-white hover:bg-[#F8F6F0] text-[#2D2A26] font-bold text-xs rounded-xl border border-[#2D2A26]/15 cursor-pointer shadow-2xs">
              Classroom Debrief Report
            </button>
          )}
          {onNextRound && !isTournamentEnd && (
            <button type="button" onClick={onNextRound} className="flex-1 py-3 px-4 bg-[#2D2A26] hover:bg-black text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md cursor-pointer">
              <span>Proceed to Match</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
