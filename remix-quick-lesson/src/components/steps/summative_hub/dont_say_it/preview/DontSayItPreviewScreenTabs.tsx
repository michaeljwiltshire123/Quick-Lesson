import React from 'react';
import { Play, Trophy, Sparkles, LayoutTemplate } from 'lucide-react';

export type PreviewScreenPhase = 'live_game' | 'standings' | 'setup';

interface Props {
  currentPhase: PreviewScreenPhase;
  onChangePhase: (phase: PreviewScreenPhase) => void;
}

export const DontSayItPreviewScreenTabs: React.FC<Props> = ({ currentPhase, onChangePhase }) => {
  return (
    <div className="bg-slate-900 p-2 rounded-2xl border border-white/15 flex flex-wrap items-center justify-between gap-2 max-w-2xl mx-auto shadow-lg">
      <span className="text-xs font-black uppercase text-amber-400 px-2 flex items-center gap-1.5">
        <LayoutTemplate className="w-4 h-4" /> Game Screen Phase:
      </span>
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => onChangePhase('live_game')}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
            currentPhase === 'live_game'
              ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>1. Live Game</span>
        </button>

        <button
          type="button"
          onClick={() => onChangePhase('standings')}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
            currentPhase === 'standings'
              ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 fill-current" />
          <span>2. Points & Standings</span>
        </button>

        <button
          type="button"
          onClick={() => onChangePhase('setup')}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
            currentPhase === 'setup'
              ? 'bg-indigo-500 text-white ring-2 ring-indigo-300'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>3. Setup Screen</span>
        </button>
      </div>
    </div>
  );
};
