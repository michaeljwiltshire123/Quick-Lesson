export type ThemePreset = 'hollywood' | 'cyber' | 'tomb' | 'space' | 'custom';

export type SabotageType = 'fog' | 'key_reset' | 'mirror' | 'freeze' | 'glitch' | 'flip';

export type CipherType = 'word_cipher' | 'color_keycard' | 'icon_sequence' | 'concept_pathway';

export interface PuzzleLock {
  id: string;
  lockNumber: number;
  title: string;
  cipherType: CipherType;
  cluePrompt: string;
  solutionCode: string;
  conceptChunkId?: string;
  sabotageReward: SabotageType;
}

export interface AntiCheatConfig {
  tabFocusDetection: boolean;
  cooldownSeconds20: boolean;
  jigsawDeviceLock: boolean;
}

export interface EscapeRoomConfig {
  themePreset: ThemePreset;
  customThemeTitle?: string;
  narrativeBrief: string;
  batchSubmission: boolean;
  antiCheat: AntiCheatConfig;
  locks: PuzzleLock[];
}
