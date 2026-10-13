import { TeamProgress, SabotageEvent } from './typesLiveEscape';

export const INITIAL_TEAMS: TeamProgress[] = [
  { id: 'team-amber', name: 'Amber Enigma', colorHex: '#D97706', currentLockNumber: 1, solvedLockIds: [], hasEscaped: false },
  { id: 'team-sapphire', name: 'Sapphire Cipher', colorHex: '#2563EB', currentLockNumber: 2, solvedLockIds: ['lock-1'], hasEscaped: false },
  { id: 'team-emerald', name: 'Emerald Vector', colorHex: '#059669', currentLockNumber: 3, solvedLockIds: ['lock-1', 'lock-2'], hasEscaped: false },
  { id: 'team-ruby', name: 'Ruby Codex', colorHex: '#DC2626', currentLockNumber: 1, solvedLockIds: [], hasEscaped: false },
];

export const INITIAL_EVENTS: SabotageEvent[] = [
  {
    id: 'evt-1',
    timestamp: '14:20',
    attackerTeamName: 'Emerald Vector',
    targetTeamName: 'Sapphire Cipher',
    effect: 'fog',
    description: 'Obscured Lock 2 decipher interface with sensory smoke fog.',
  },
  {
    id: 'evt-2',
    timestamp: '11:45',
    attackerTeamName: 'Sapphire Cipher',
    targetTeamName: 'Amber Enigma',
    effect: 'freeze',
    description: 'Enacted 15-second cryo freeze hindering active keypad entry.',
  },
];
