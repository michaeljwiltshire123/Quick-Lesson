import React from 'react';
import { Skull, Trophy, Flame, Zap, ShieldAlert } from 'lucide-react';
import { BlitzGameState } from './binaryBlitzEngine';

interface Props {
  gameState: BlitzGameState;
  prompt: string;
  onNextRound?: () => void;
}

export const BinaryBlitzProjectorArena: React.FC<Props> = ({ gameState, prompt, onNextRound }) => {
  const aliveCount = gameState.survivors.filter((s) => s.isAlive).length;
  const champion = gameState.winnerId ? gameState.survivors.find((s) => s.id === gameState.winnerId) : null;

  return (
    <div className="bg-slate-950 text-white p-6 rounded-3xl border-2 border-red-500 shadow-2xl space-y-5">
      {/* Header with Jackpot and Timer */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-500/30 pb-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-red-600/30 border border-red-500 text-red-400">
            <Flame className="w-6 h-6 animate-pulse" />
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400">
              Sudden Death Elimination • Round {gameState.round}
            </span>
            <h3 className="text-xl font-black text-white">Binary Blitz Survival</h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-black/60 px-4 py-2 rounded-2xl border border-amber-400/40 text-center">
            <span className="text-[9px] font-bold uppercase text-amber-400 block">Accumulated Jackpot</span>
            <span className="text-2xl font-black font-mono text-amber-300">+{gameState.currentPot} pts</span>
          </div>
          <div className="bg-red-950/80 px-4 py-2 rounded-2xl border border-red-500 text-center">
            <span className="text-[9px] font-bold uppercase text-red-400 block">Speed Limit</span>
            <span className="text-2xl font-black font-mono text-white">{gameState.speedLimitSeconds}s</span>
          </div>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="p-4 bg-slate-900 border border-white/10 rounded-2xl text-center">
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Fast-Fire True or False</span>
        <p className="text-lg font-bold text-gray-100 mt-1">"{prompt}"</p>
      </div>

      {/* Arena Survivor Floor */}
      <div>
        <div className="flex justify-between items-center text-xs font-bold mb-3">
          <span className="text-amber-400">{aliveCount} Pupils Still Standing</span>
          <span className="text-gray-400">{gameState.survivors.length - aliveCount} Eliminated</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 max-h-48 overflow-y-auto pr-1">
          {gameState.survivors.map((p) => (
            <div
              key={p.id}
              className={`p-2 rounded-xl text-center transition-all ${
                p.isAlive
                  ? 'bg-amber-500/20 border-2 border-amber-400 shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-black/40 border border-white/5 opacity-30 grayscale'
              }`}
            >
              <div className="text-xl mb-1">{p.avatar}</div>
              <span className="text-[10px] font-black truncate block">{p.name}</span>
              {!p.isAlive && <Skull className="w-3 h-3 text-red-500 mx-auto mt-0.5" />}
            </div>
          ))}
        </div>
      </div>

      {/* Champion Victory Podium */}
      {gameState.isGameOver && champion && (
        <div className="p-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 rounded-2xl text-slate-950 text-center font-black animate-bounce space-y-1">
          <Trophy className="w-8 h-8 mx-auto text-slate-950" />
          <h4 className="text-base uppercase tracking-tight">
            {gameState.surpriseConsolation ? 'Surprise Last Stand Winner!' : 'Sole Survivor & Jackpot Champion!'}
          </h4>
          <p className="text-xs">
            {champion.name} claims the entire {gameState.currentPot} point bounty!
          </p>
        </div>
      )}
    </div>
  );
};
