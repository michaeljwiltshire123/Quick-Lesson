import React from 'react';
import { Player } from '../types/dontSayItTypes';
import { RoundResolution } from '../types/roundResolutionTypes';
import { JudgeRoundAdvancePanel } from '../standings/JudgeRoundAdvancePanel';
import { ActiveTeamCelebrationOverlay } from '../standings/ActiveTeamCelebrationOverlay';
import { SpectatorMvpPoll } from '../standings/SpectatorMvpPoll';

interface Props {
  currentStudent: Player;
  resolution: RoundResolution;
  nextTeamName: string;
  nextGuesserName: string;
  candidatePlayers: Player[];
  onAdvanceToSetup: () => void;
}

export const StudentRecapRoleDispatcher: React.FC<Props> = ({
  currentStudent,
  resolution,
  nextTeamName,
  nextGuesserName,
  candidatePlayers,
  onAdvanceToSetup,
}) => {
  const isJudge = currentStudent.role === 'judge';
  const isActiveTeam = currentStudent.teamId === resolution.teamId;

  if (isJudge) {
    return (
      <JudgeRoundAdvancePanel
        judgeName={currentStudent.name}
        resolution={resolution}
        nextTeamName={nextTeamName}
        nextGuesserName={nextGuesserName}
        onAdvanceToSetup={onAdvanceToSetup}
      />
    );
  }

  if (isActiveTeam) {
    return (
      <ActiveTeamCelebrationOverlay
        points={resolution.pointsEarned}
        teamName={resolution.teamName}
      />
    );
  }

  return (
    <SpectatorMvpPoll
      candidatePlayers={candidatePlayers}
    />
  );
};
