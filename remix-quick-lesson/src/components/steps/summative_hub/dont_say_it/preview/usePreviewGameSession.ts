import { useState } from 'react';
import { TeamConfig, SecretWordCard } from '../types/dontSayItTypes';
import { RoundResolution } from '../types/roundResolutionTypes';
import { PreviewScreenPhase } from './DontSayItPreviewScreenTabs';
import { playSuccessFanfare, playTimeoutSound, playFoulBuzzer } from '../utils/dontSayItSoundEffects';

const INITIAL_TEAMS: TeamConfig[] = [
  { id: 'team-1', name: 'Team Red', color: 'red', score: 1480 },
  { id: 'team-2', name: 'Team Blue', color: 'blue', score: 1220 },
  { id: 'team-3', name: 'Team Emerald', color: 'emerald', score: 860 },
];

export const usePreviewGameSession = (cards: SecretWordCard[]) => {
  const [phase, setPhase] = useState<PreviewScreenPhase>('live_game');
  const [teams, setTeams] = useState<TeamConfig[]>(INITIAL_TEAMS);
  const [currentTeamIndex, setCurrentTeamIndex] = useState<number>(0);
  const [resolution, setResolution] = useState<RoundResolution | null>({
    reason: 'word_guessed',
    pointsEarned: 760,
    timeTakenSeconds: 24,
    targetWord: cards[0]?.targetWord || 'Photosynthesis',
    forbiddenWords: cards[0]?.activeBannedWords || ['Sunlight', 'Plant', 'Leaf', 'Chlorophyll', 'Oxygen'],
    teamId: 'team-1',
    teamName: 'Team Red',
  });

  const activeTeam = teams[currentTeamIndex] || teams[0];
  const activeCard = cards[0] || { targetWord: 'Photosynthesis', activeBannedWords: ['Sunlight', 'Leaf'] };

  const triggerWordGuessed = (pts: number = 760) => {
    playSuccessFanfare();
    const newRes: RoundResolution = {
      reason: 'word_guessed',
      pointsEarned: pts,
      timeTakenSeconds: 24,
      targetWord: activeCard.targetWord,
      forbiddenWords: activeCard.activeBannedWords || [],
      teamId: activeTeam.id,
      teamName: activeTeam.name,
    };
    setResolution(newRes);
    setTeams((prev) => prev.map((t) => (t.id === activeTeam.id ? { ...t, score: t.score + pts } : t)));
    setPhase('standings');
  };

  const triggerTimeout = () => {
    playTimeoutSound();
    setResolution({
      reason: 'time_expired',
      pointsEarned: 0,
      timeTakenSeconds: 60,
      targetWord: activeCard.targetWord,
      forbiddenWords: activeCard.activeBannedWords || [],
      teamId: activeTeam.id,
      teamName: activeTeam.name,
    });
    setPhase('standings');
  };

  const triggerFoulForfeit = () => {
    playFoulBuzzer();
    setResolution({
      reason: 'foul_forfeit',
      pointsEarned: 0,
      timeTakenSeconds: 32,
      targetWord: activeCard.targetWord,
      forbiddenWords: activeCard.activeBannedWords || [],
      teamId: activeTeam.id,
      teamName: activeTeam.name,
    });
    setPhase('standings');
  };

  const advanceToNextRoundSetup = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % teams.length);
    setPhase('setup');
  };

  const awardTeacherBonus = (pts: number) => {
    setTeams((prev) => prev.map((t) => (t.id === activeTeam.id ? { ...t, score: t.score + pts } : t)));
    setResolution((prev) => (prev ? { ...prev, bonusPoints: pts } : null));
  };

  return {
    phase,
    setPhase,
    teams,
    currentTeamIndex,
    activeTeam,
    resolution,
    triggerWordGuessed,
    triggerTimeout,
    triggerFoulForfeit,
    advanceToNextRoundSetup,
    awardTeacherBonus,
  };
};
