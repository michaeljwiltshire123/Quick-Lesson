import React, { useState, useEffect } from 'react';
import { EscapeRoomConfig } from '../typesEscape';
import { TeamProgress, SabotageEvent, ActiveSabotageEffect } from './typesLiveEscape';
import { LiveEscapeBoardHeader } from './LiveEscapeBoardHeader';
import { LiveEscapeTeacherToolbar } from './LiveEscapeTeacherToolbar';
import { LiveTeamLeaderboardGrid } from './LiveTeamLeaderboardGrid';
import { SabotageActivityFeed } from './SabotageActivityFeed';
import { INITIAL_TEAMS, INITIAL_EVENTS } from './liveEscapeStateDefaults';
import { exportPostGameSlides } from './liveEscapeExportHelper';

interface Props {
  config: EscapeRoomConfig;
  lessonTitle?: string;
  onClose?: () => void;
  onNotice?: (msg: string) => void;
}

export const LiveEscapeViewContainer: React.FC<Props> = ({ config, lessonTitle, onClose, onNotice }) => {
  const [timeRemaining, setTimeRemaining] = useState(15 * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [cluesRevealed, setCluesRevealed] = useState(false);
  const [teams, setTeams] = useState<TeamProgress[]>(INITIAL_TEAMS);
  const [events, setEvents] = useState<SabotageEvent[]>(INITIAL_EVENTS);

  useEffect(() => {
    if (isPaused || timeRemaining <= 0) return;
    const interval = setInterval(() => setTimeRemaining((p) => Math.max(0, p - 1)), 1000);
    return () => clearInterval(interval);
  }, [isPaused, timeRemaining]);

  const handleAdvanceTeam = (teamId: string) => {
    setTeams((prev) => prev.map((t) => {
      if (t.id !== teamId || t.hasEscaped) return t;
      const nextNum = t.currentLockNumber + 1;
      const hasEscaped = nextNum > 4;
      return {
        ...t,
        currentLockNumber: nextNum,
        solvedLockIds: [...t.solvedLockIds, `lock-${t.currentLockNumber}`],
        hasEscaped,
        escapedTimeSeconds: hasEscaped ? 900 - timeRemaining : undefined,
        activeHindrance: undefined,
      };
    }));
  };

  const handleSimulateSabotage = () => {
    const effects: ActiveSabotageEffect[] = ['fog', 'key_reset', 'mirror', 'freeze', 'glitch', 'flip'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    const newEvent: SabotageEvent = {
      id: `evt-${Date.now()}`,
      timestamp: `${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`,
      attackerTeamName: 'Amber Enigma',
      targetTeamName: 'Ruby Codex',
      effect: randomEffect,
      description: `Deployed ${randomEffect.replace('_', ' ')} Hindrance Shot to disrupt team focus.`,
    };
    setEvents((prev) => [newEvent, ...prev]);
    setTeams((prev) => prev.map((t) => t.id === 'team-ruby' ? { ...t, activeHindrance: { type: randomEffect, sourceTeamName: 'Amber Enigma', expiresAtSeconds: timeRemaining - 20 } } : t));
    onNotice?.(`Deployed ${randomEffect.replace('_', ' ')} against Ruby Codex.`);
  };

  const escapedCount = teams.filter((t) => t.hasEscaped).length;

  return (
    <div className="space-y-4 bg-[#F8F6F0] p-4 sm:p-6 rounded-3xl border border-[#2D2A26]/15 shadow-sm">
      <LiveEscapeBoardHeader
        scenarioTitle={config.customThemeTitle || lessonTitle || 'Live Classroom Escape'}
        timeRemainingSeconds={timeRemaining}
        isPaused={isPaused}
        cluesRevealed={cluesRevealed}
        escapedCount={escapedCount}
        totalTeams={teams.length}
        onTogglePause={() => setIsPaused((p) => !p)}
        onToggleClues={() => setCluesRevealed((c) => !c)}
        onClose={onClose}
      />

      <LiveEscapeTeacherToolbar
        teams={teams}
        onAdvanceTeam={handleAdvanceTeam}
        onExportSlides={() => {
          exportPostGameSlides(config, teams, events, lessonTitle);
          onNotice?.('Debrief slides exported successfully.');
        }}
      />

      <LiveTeamLeaderboardGrid teams={teams} locks={config.locks} cluesRevealed={cluesRevealed} />

      <SabotageActivityFeed events={events} onTriggerSimulatedSabotage={handleSimulateSabotage} />
    </div>
  );
};
