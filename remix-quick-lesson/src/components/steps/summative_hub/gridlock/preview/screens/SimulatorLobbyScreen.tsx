import React from 'react';
import { Users, QrCode, Play, ShieldAlert, Sparkles } from 'lucide-react';

interface Props {
  roomCode: string;
  lessonTitle: string;
  onStartGame: () => void;
}

export const SimulatorLobbyScreen: React.FC<Props> = ({ roomCode, lessonTitle, onStartGame }) => {
  return (
    <div className="bg-[#1A1816] p-6 rounded-3xl border-2 border-white/10 shadow-2xl max-w-2xl mx-auto space-y-6 text-center text-white animate-in fade-in">
      <div className="space-y-2">
        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" /> Step 1 • Beginning Match Lobby
        </span>
        <h2 className="text-2xl font-black text-white">GridLock Classroom Arena</h2>
        <p className="text-xs text-gray-400">Curriculum Topic: {lessonTitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        <div className="bg-red-950/40 p-4 rounded-2xl border border-red-500/30 space-y-2">
          <div className="flex items-center justify-between text-red-400 font-black text-xs uppercase">
            <span>Red Squad (Left ➔ Right)</span>
            <span className="text-[10px] bg-red-900/60 px-2 py-0.5 rounded-full">4 Players</span>
          </div>
          <p className="text-[11px] text-gray-300">Goal: Connect a continuous horizontal red pathway across the 5x5 hexagon grid.</p>
          <div className="text-[10px] font-mono text-red-300">Roster: Sophie T., Oliver P., Maya S., Liam K.</div>
        </div>

        <div className="bg-blue-950/40 p-4 rounded-2xl border border-blue-500/30 space-y-2">
          <div className="flex items-center justify-between text-blue-400 font-black text-xs uppercase">
            <span>Blue Squad (Top ➔ Bottom)</span>
            <span className="text-[10px] bg-blue-900/60 px-2 py-0.5 rounded-full">4 Players</span>
          </div>
          <p className="text-[11px] text-gray-300">Goal: Connect a continuous vertical blue pathway from top wall to bottom wall.</p>
          <div className="text-[10px] font-mono text-blue-300">Roster: Lucas M., Ethan B., Chloe H., Noah W.</div>
        </div>
      </div>

      <div className="bg-black/50 p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2 bg-amber-400 text-slate-950 rounded-xl font-mono font-black text-lg">
            {roomCode}
          </div>
          <div>
            <div className="text-xs font-black text-white">Room Code Active</div>
            <div className="text-[10px] text-gray-400">All 8 pupils connected and ready to challenge</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onStartGame}
          className="py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl flex items-center gap-2 cursor-pointer shadow-lg transition-all scale-105"
        >
          <Play className="w-4 h-4 fill-current" /> <span>START MATCH</span>
        </button>
      </div>
    </div>
  );
};
