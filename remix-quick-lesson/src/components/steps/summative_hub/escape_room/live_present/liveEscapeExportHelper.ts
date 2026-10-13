import { EscapeRoomConfig } from '../typesEscape';
import { TeamProgress, SabotageEvent } from './typesLiveEscape';

export const exportPostGameSlides = (
  config: EscapeRoomConfig,
  teams: TeamProgress[],
  events: SabotageEvent[],
  lessonTitle?: string,
) => {
  const title = config.customThemeTitle || lessonTitle || 'Classroom Escape Room';
  const lines = [
    `# ${title} — Post-Mission Debrief Slides`,
    `**Theme**: ${config.themePreset.toUpperCase()}`,
    `**Scenario Brief**: ${config.narrativeBrief}`,
    '',
    '## 1. MISSION LEADERBOARD & RESULTS',
    ...teams.map((t, idx) =>
      `- **Rank ${idx + 1}: ${t.name}** | Status: ${t.hasEscaped ? `ESCAPED (${t.escapedTimeSeconds || 680}s)` : `Solved ${t.solvedLockIds.length}/4 Locks`}`
    ),
    '',
    '## 2. LOCK CURRICULUM RECAP',
    ...config.locks.map((l) => [
      `### Lock ${l.lockNumber}: ${l.title}`,
      `- **Cipher System**: ${l.cipherType.replace('_', ' ').toUpperCase()}`,
      `- **Investigation Question**: ${l.cluePrompt}`,
      `- **Master Solution**: ${l.solutionCode}`,
      '',
    ].join('\n')),
    '## 3. HINDRANCE & SABOTAGE LOG',
    ...events.map((e) => `- [${e.timestamp}] ${e.attackerTeamName} deployed ${e.effect.toUpperCase()} on ${e.targetTeamName}: ${e.description}`),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `escape-room-debrief-slides-${config.themePreset}.md`;
  a.click();
  URL.revokeObjectURL(url);
};
