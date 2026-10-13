import React from 'react';
import { Lock, Unlock, CheckCircle2, ShieldAlert, Trophy } from 'lucide-react';
import { TeamProgress } from './typesLiveEscape';
import { PuzzleLock } from '../typesEscape';

interface Props {
  teams: TeamProgress[]; locks: PuzzleLock[]; cluesRevealed: boolean;
}

export const LiveTeamLeaderboardGrid: React.FC<Props> = ({ teams, locks, cluesRevealed }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <style>{`
      @keyframes latchClick { 0% { transform: translateX(-35px) scaleX(0.2); opacity: 0.5; } 100% { transform: translateX(0) scaleX(1); opacity: 1; } }
    `}</style>
    {teams.map((team, rankIdx) => {
      const activeLock = locks.find((l) => l.lockNumber === team.currentLockNumber);
      return (
        <div
          key={team.id}
          className={`bg-white border rounded-2xl p-4 shadow-xs space-y-3 transition-all ${
            team.hasEscaped
              ? 'border-emerald-500/60 ring-2 ring-emerald-500/20 bg-emerald-50/20'
              : 'border-[#2D2A26]/15 hover:border-amber-400'
          }`}
        >
          <div className="flex items-center justify-between gap-2 border-b border-[#2D2A26]/10 pb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-xs" style={{ backgroundColor: team.colorHex }} />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#2D2A26]">{team.name}</h4>
                  {team.hasEscaped && (
                    <span className="flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      <Trophy className="w-3 h-3 text-emerald-600" />
                      <span>ESCAPED!</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#2D2A26]/60">
                  {team.hasEscaped ? `Vault unlocked in ${team.escapedTimeSeconds || 680}s` : `Tackling Lock ${team.currentLockNumber} of 4`}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#2D2A26]/40">#{rankIdx + 1}</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((lockNum) => {
              const isSolved = team.solvedLockIds.includes(`lock-${lockNum}`) || team.currentLockNumber > lockNum || team.hasEscaped;
              const isCurrent = team.currentLockNumber === lockNum && !team.hasEscaped;
              return (
                <div
                  key={lockNum}
                  className={`p-2 rounded-xl border text-center transition-all duration-300 relative overflow-hidden ${
                    isSolved
                      ? 'bg-gradient-to-b from-stone-100 via-stone-200 to-stone-300 text-stone-850 border-stone-400 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.95),0_2px_4px_rgba(0,0,0,0.1)] font-bold'
                      : isCurrent
                        ? 'bg-amber-500 text-white border-amber-600 shadow-2xs font-extrabold'
                        : 'bg-[#F8F6F0] border-[#2D2A26]/10 text-[#2D2A26]/40'
                  }`}
                >
                  {/* Heavy Metal Latch Bolt Sliding across Solved Boxes */}
                  {isSolved && (
                    <div 
                      className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-r from-stone-600 to-stone-400 border-r border-stone-800/40 shadow-xs"
                      style={{ animation: 'latchClick 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                    />
                  )}
                  <div className="flex justify-center mb-1">
                    {isSolved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-650" /> : isCurrent ? <Unlock className="w-3.5 h-3.5 text-white" /> : <Lock className="w-3.5 h-3.5 text-[#2D2A26]/40" />}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block">Lock {lockNum}</span>
                </div>
              );
            })}
          </div>

          {cluesRevealed && activeLock && !team.hasEscaped && (
            <div className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs text-[#2D2A26]">
              <span className="font-bold text-[#D97706] uppercase text-[10px] block tracking-wider">Lock {activeLock.lockNumber} Clue:</span>
              <p className="line-clamp-2 italic text-[11px] mt-0.5">{activeLock.cluePrompt}</p>
            </div>
          )}

          {team.activeHindrance && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-red-50 border border-red-200 text-[11px] font-bold text-red-800">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0 animate-pulse" />
              <span>Hindrance Effect: {team.activeHindrance.type.replace('_', ' ').toUpperCase()} from {team.activeHindrance.sourceTeamName}</span>
            </div>
          )}
        </div>
      );
    })}
  </div>
);
