import { DontSayItRoomConfig, SecretWordCard, DontSayItGameState, Player, TeamConfig } from '../types/dontSayItTypes';
import { PreviewRoleOption } from './DeviceRoleSwitcher';

export const buildSimulatedState = (
  config: DontSayItRoomConfig,
  cards: SecretWordCard[],
  activeRole: PreviewRoleOption,
  adjudication: DontSayItGameState['adjudication'],
  isRoundActive: boolean = false,
  statusOverride?: DontSayItGameState['status'],
  teamScoresOverride?: TeamConfig[]
): { gameState: DontSayItGameState; currentPupil: Player } => {
  const baseCard = cards[0];
  const activeCard: SecretWordCard = baseCard
    ? {
        ...baseCard,
        studentBannedWords: baseCard.studentBannedWords?.length ? baseCard.studentBannedWords : ['Sunlight', 'Plant', 'Leaf', 'Chlorophyll', 'Oxygen'],
        activeBannedWords: baseCard.studentBannedWords?.length ? baseCard.studentBannedWords : ['Sunlight', 'Plant', 'Leaf', 'Chlorophyll', 'Oxygen'],
      }
    : {
        id: 'c1',
        targetWord: 'Photosynthesis',
        studentBannedWords: ['Sunlight', 'Plant', 'Leaf', 'Chlorophyll', 'Oxygen'],
        aiFallbackBannedWords: ['Sunlight', 'Chlorophyll'],
        activeBannedWords: ['Sunlight', 'Plant', 'Leaf', 'Chlorophyll', 'Oxygen'],
      };

  const teams: TeamConfig[] = teamScoresOverride || [
    { id: 'team-1', name: 'Team Red', color: 'red', score: 1480 },
    { id: 'team-2', name: 'Team Blue', color: 'blue', score: 1220 },
    { id: 'team-3', name: 'Team Emerald', color: 'emerald', score: 860 },
  ];

  const gameState: DontSayItGameState = {
    roomCode: config.roomCode || 'S45M',
    lessonTitle: config.lessonTitle,
    status: statusOverride || (isRoundActive ? 'in_game' : 'lobby'),
    currentRound: 1,
    totalRounds: config.totalRounds || 3,
    currentTeamIndex: 0,
    activeCardIndex: 0,
    cards: [activeCard],
    teams,
    players: [
      { id: 'p1', name: 'Oliver (Guesser)', teamId: 'team-1', role: 'guesser' },
      { id: 'p2', name: 'Charlotte (Clue Giver)', teamId: 'team-1', role: 'clue_giver' },
      { id: 'p3', name: 'Lucas (Guessing Judge)', teamId: 'team-1', role: 'guessing_judge' },
      { id: 'p4', name: 'Amelia (Opposing Judge)', teamId: 'team-2', role: 'judge' },
      { id: 'p5', name: 'Noah (Spectator)', teamId: 'team-3', role: 'spectator' },
    ],
    config: { ...config, teams },
    timerSeconds: 45,
    adjudication,
  };

  const roleNameMap: Record<PreviewRoleOption, string> = {
    opposing_judge: 'Amelia (Opposing Judge)',
    clue_giver: 'Charlotte (Clue Giver)',
    guesser: 'Oliver (Guesser)',
    guessing_judge: 'Lucas (Guess Judge)',
    saboteur: 'Noah (Opposing Saboteur)',
    spectator: 'Liam (Spectator)',
  };

  const currentPupil: Player = {
    id: 'sim-pupil',
    name: roleNameMap[activeRole] || 'Student Device',
    teamId: ['opposing_judge', 'saboteur'].includes(activeRole) ? 'team-2' : activeRole === 'spectator' ? 'team-3' : 'team-1',
    role: activeRole === 'opposing_judge' ? 'judge' : activeRole === 'saboteur' ? 'spectator' : (activeRole as Player['role']),
  };

  return { gameState, currentPupil };
};
