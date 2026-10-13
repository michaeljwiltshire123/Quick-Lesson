import React from 'react';
import { HexTile, TeamColor, TournamentScore } from '../types/gridlockTypes';
import { TeamScoreTracker } from './TeamScoreTracker';
import { checkRedLeftToRightWin, checkBlueTopToBottomWin } from '../board/pathConnectionChecker';
import { Award, Zap, Check, X, ShieldAlert } from 'lucide-react';

interface Props {
  activeTile: HexTile | null;
  scores: TournamentScore;
  redAccuracy: number;
  blueAccuracy: number;
  activeBuzzerTeam?: TeamColor | null;
  onAwardTile: (team: TeamColor) => void;
  onClearActiveTile: () => void;
  onResetBuzzer: () => void;
}

export const GridlockLiveGameOverlay: React.FC<Props> = ({
  activeTile,
  scores,
  redAccuracy,
  blueAccuracy,
  activeBuzzerTeam,
  onAwardTile,
  onClearActiveTile,
  onResetBuzzer,
}) => {
  return (
    <div className="space-y-3 bg-black/40 p-4 rounded-3xl border border-white/10 backdrop-blur-xs">
      <TeamScoreTracker
        scores={scores}
        redAccuracy={redAccuracy}
        blueAccuracy={blueAccuracy}
        activeBuzzerTeam={activeBuzzerTeam}
      />

      {activeTile && (
        <div className="bg-slate-900/90 border border-amber-400/40 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
              Live Hexagon '{activeTile.letter}' • Target: {activeTile.activeQuestion.targetAnswer}
            </span>
            <p className="text-xs text-gray-200 font-medium">
              {activeTile.activeQuestion.prompt}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onAwardTile('red')}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-xl flex items-center gap-1 cursor-pointer shadow-md transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Award Red</span>
            </button>
            <button
              type="button"
              onClick={() => onAwardTile('blue')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl flex items-center gap-1 cursor-pointer shadow-md transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Award Blue</span>
            </button>
            <button
              type="button"
              onClick={onResetBuzzer}
              className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-bold rounded-xl cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
