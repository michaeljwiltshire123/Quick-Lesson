import React from 'react';
import { DontSayItGameState } from '../types/dontSayItTypes';
import { RoundResolution } from '../types/roundResolutionTypes';
import { RoundResolutionBanner } from './RoundResolutionBanner';
import { MultiTeamStandingsBoard } from './MultiTeamStandingsBoard';
import { TeacherBonusButton } from './TeacherBonusButton';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { toggleAudioMute, getIsAudioMuted } from '../utils/dontSayItSoundEffects';

interface Props {
  gameState: DontSayItGameState;
  resolution: RoundResolution;
  onAdvanceToSetup: () => void;
  onAwardTeacherBonus: (pts: number, reason: string) => void;
}

export const RoundResolutionScreen: React.FC<Props> = ({
  gameState,
  resolution,
  onAdvanceToSetup,
  onAwardTeacherBonus,
}) => {
  const [isMuted, setIsMuted] = React.useState(getIsAudioMuted());
  const activeTeam = gameState.teams.find((t) => t.id === resolution.teamId) || gameState.teams[0];

  const handleToggleAudio = () => {
    const muted = toggleAudioMute();
    setIsMuted(muted);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-950 p-5 sm:p-6 rounded-3xl border-4 border-amber-400 shadow-2xl space-y-4 text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="text-xs font-black uppercase tracking-wider text-amber-400">
          Round {gameState.currentRound} of {gameState.totalRounds} Recap
        </span>
        <button
          type="button"
          onClick={handleToggleAudio}
          className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          <span>{isMuted ? 'Muted' : 'Sound On'}</span>
        </button>
      </div>

      <RoundResolutionBanner resolution={resolution} />

      <MultiTeamStandingsBoard
        teams={gameState.teams}
        activeTeamId={resolution.teamId}
        pointsAdded={resolution.pointsEarned + (resolution.bonusPoints || 0)}
      />

      <TeacherBonusButton
        activeTeamName={activeTeam.name}
        onAwardBonus={onAwardTeacherBonus}
      />

      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-gray-400">
        <span>Opposing Judge is reviewing standings on their phone...</span>
        <button
          type="button"
          onClick={onAdvanceToSetup}
          className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Teacher Override: Advance</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
