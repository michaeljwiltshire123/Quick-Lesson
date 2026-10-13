import React from 'react';
import { Ghost, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { Player } from '../types/imposterTypes';

interface Props {
  player: Player;
  questionsPenned?: number;
  eliminationsTriggered?: number;
  isMaster?: boolean;
}

export const GhostWriterBadgeCard: React.FC<Props> = ({
  player,
  questionsPenned = 1,
  eliminationsTriggered = 0,
  isMaster = false,
}) => {
  return (
    <div id={`ghost-badge-card-${player.id}`} className="p-3.5 rounded-2xl bg-white border border-[#2D2A26]/15 flex items-center justify-between gap-3 shadow-2xs">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center relative ${
          isMaster ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-400' : 'bg-stone-100 text-stone-600'
        }`}>
          <Ghost className="w-5 h-5" />
          {isMaster && (
            <Sparkles className="w-3.5 h-3.5 text-amber-500 absolute -top-1 -right-1" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-black text-[#2D2A26]">{player.name}</h4>
            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
              isMaster
                ? 'bg-purple-100 text-purple-800 border-purple-300'
                : 'bg-stone-100 text-stone-700 border-stone-200'
            }`}>
              {isMaster ? 'Ghost Writing Master' : 'Ghost Writer'}
            </span>
          </div>
          <p className="text-[10px] text-[#2D2A26]/60">
            {questionsPenned} decoy {questionsPenned === 1 ? 'question' : 'questions'} authored
          </p>
        </div>
      </div>

      <div className="text-right">
        <span className="text-xs font-mono font-black text-purple-900 flex items-center justify-end gap-1">
          {eliminationsTriggered > 0 && <Award className="w-3 h-3 text-amber-600" />}
          {eliminationsTriggered}
        </span>
        <span className="text-[9px] text-[#2D2A26]/60 block">Exposures</span>
      </div>
    </div>
  );
};
