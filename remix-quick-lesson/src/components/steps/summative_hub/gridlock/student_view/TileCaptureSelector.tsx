import React from 'react';
import { HexTile, TeamColor } from '../types/gridlockTypes';
import { Crown, Sparkles } from 'lucide-react';
import { PhoneMiniBoardPicker } from './PhoneMiniBoardPicker';

interface Props {
  grid?: HexTile[][];
  fastestStudentName: string;
  winningTeam: TeamColor;
  unclaimedTiles: HexTile[];
  isCurrentStudentFastest: boolean;
  onSelectNextTile: (tileId: string) => void;
}

export const TileCaptureSelector: React.FC<Props> = ({
  grid,
  fastestStudentName,
  winningTeam,
  unclaimedTiles,
  isCurrentStudentFastest,
  onSelectNextTile,
}) => {
  const isRed = winningTeam === 'red';

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#2D2A26]/10 shadow-sm space-y-3.5">
      <div
        className={`p-3 rounded-xl border flex items-center justify-between ${
          isRed ? 'bg-red-50 border-red-200 text-red-950' : 'bg-blue-50 border-blue-200 text-blue-950'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Crown className={`w-5 h-5 ${isRed ? 'text-red-600' : 'text-blue-600'}`} />
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider opacity-75">
              Round Winner ({isRed ? 'Red Squad' : 'Blue Squad'})
            </span>
            <div className="text-xs font-black">Choosing Next Target: {fastestStudentName}</div>
          </div>
        </div>
        <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
      </div>

      {grid ? (
        <PhoneMiniBoardPicker
          grid={grid}
          choosingTeam={winningTeam}
          isUserTeamTurn={isCurrentStudentFastest}
          onSelectTile={(t) => onSelectNextTile(t.id)}
        />
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-slate-950 rounded-xl border border-[#2D2A26]/10">
          {unclaimedTiles.map((tile) => (
            <button
              key={tile.id}
              type="button"
              disabled={!isCurrentStudentFastest}
              onClick={() => onSelectNextTile(tile.id)}
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              className={`w-10 h-11 flex flex-col items-center justify-center font-mono font-black text-xs text-center border transition-all cursor-pointer hover:scale-110 ${
                tile.isGold
                  ? 'bg-amber-300 text-amber-950 border-amber-500 shadow-xs'
                  : 'bg-white text-[#2D2A26] border-slate-300 hover:bg-amber-100'
              }`}
            >
              <span>{tile.letter}</span>
              {tile.isGold && <span className="text-[6px] text-amber-900 font-sans leading-none">2X</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
