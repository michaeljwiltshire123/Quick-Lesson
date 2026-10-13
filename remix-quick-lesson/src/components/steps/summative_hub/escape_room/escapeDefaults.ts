import { ThemePreset, PuzzleLock, EscapeRoomConfig } from './typesEscape';

export interface EscapePlanningExport {
  gamePin: string;
  studentJoinUrl: string;
  livePresentUrl: string;
  qrCodeUrl: string;
  slideDeckNote: string;
}

const RAW_THEMES: Record<ThemePreset, [string, string, string[]]> = {
  hollywood: ['Hollywood Red Carpet Crisis', "Director's cut locked in vault! Solve 4 studio locks.", ['Screenplay Cipher|word_cipher|PROTAGONIST|fog', 'Colour Keycard|color_keycard|EMERALD-AMBER-SAPPHIRE|key_reset', 'Production Sequence|icon_sequence|SCRIPT-CAMERA-REEL|freeze', 'Narrative Arc|concept_pathway|HOOK-CLIMAX-RESOLUTION|glitch']],
  cyber: ['Cyber Firewall Lockdown', 'Rogue algorithms locked communications! Decrypt 4 ciphers.', ['Terminal Pass|word_cipher|ENCRYPTION|fog', 'Spectrum Keycard|color_keycard|SAPPHIRE-RUBY-EMERALD|key_reset', 'Protocol Sequence|icon_sequence|KEY-LOCK-SHIELD|freeze', 'Data Stream|concept_pathway|INPUT-PROCESS-OUTPUT|glitch']],
  tomb: ['Archive of Alexandria', 'Ancient repository is sealing! Decode 4 ancient seals.', ['Scribe Glyph|word_cipher|PARCHMENT|fog', 'Pigment Keycard|color_keycard|AMBER-OCHRE-INDIGO|key_reset', 'Hieroglyph Order|icon_sequence|SUN-EYE-FEATHER|freeze', 'Wisdom Pathway|concept_pathway|QUESTION-HYPOTHESIS-PROOF|glitch']],
  space: ['Orbital Outpost Alpha', 'Atmospheric telemetry dropping! Realign station coordinates.', ['Telemetry Code|word_cipher|GRAVITY|fog', 'Reactor Keycard|color_keycard|CYAN-AMBER-VIOLET|key_reset', 'Module Sequence|icon_sequence|AIRLOCK-HATCH-BEACON|freeze', 'Flightpath Pathway|concept_pathway|IGNITION-BOOST-INSERTION|glitch']],
  custom: ['Vocational Challenge', 'Workplace emergency demands decisive team mastery.', ['Term Cipher|word_cipher|COMPLIANCE|fog', 'Safety Keycard|color_keycard|AMBER-EMERALD-SAPPHIRE|key_reset', 'Workflow Sequence|icon_sequence|TOOL-CHECK-SIGN|freeze', 'Diagnostic Pathway|concept_pathway|IDENTIFY-ANALYSE-SOLVE|glitch']],
};

export const THEME_DEFAULTS: Record<ThemePreset, { title: string; brief: string; locks: PuzzleLock[] }> =
  Object.fromEntries(Object.entries(RAW_THEMES).map(([preset, [title, brief, rawLocks]]) => [
    preset, {
      title, brief,
      locks: rawLocks.map((str, idx) => {
        const [ltitle, cipherType, solutionCode, sabotageReward] = str.split('|');
        return { id: `lock-${idx + 1}`, lockNumber: idx + 1, title: ltitle, cipherType: cipherType as any, cluePrompt: `Solve lock station for ${ltitle}.`, solutionCode, sabotageReward: sabotageReward as any };
      }),
    },
  ])) as any;

export function getDefaultEscapeConfig(theme: ThemePreset, lessonTitle?: string): EscapeRoomConfig {
  const t = THEME_DEFAULTS[theme] || THEME_DEFAULTS.hollywood;
  return {
    themePreset: theme,
    customThemeTitle: lessonTitle ? `${lessonTitle}: ${t.title}` : t.title,
    narrativeBrief: t.brief,
    batchSubmission: false,
    antiCheat: { tabFocusDetection: true, cooldownSeconds20: true, jigsawDeviceLock: false },
    locks: t.locks,
  };
}

export function getEscapePlanningExport(config: EscapeRoomConfig): EscapePlanningExport {
  const pin = (config.themePreset.slice(0, 3).toUpperCase()) + '4';
  const studentJoinUrl = `https://escape.quicklesson.co.uk/join?pin=${pin}`;
  return {
    gamePin: pin,
    studentJoinUrl,
    livePresentUrl: `https://escape.quicklesson.co.uk/present?pin=${pin}`,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(studentJoinUrl)}`,
    slideDeckNote: `Slide Station: ${config.customThemeTitle || 'Escape Room'} (4 Non-Numeric Locks Attached).`,
  };
}
