import React, { useState } from 'react';
import { GridlockConfigControls } from './GridlockConfigControls';
import { GridlockRoomLauncherCard } from './GridlockRoomLauncherCard';
import { GridlockAttachedBanner } from './GridlockAttachedBanner';
import { GridlockQuestionInspector } from './GridlockQuestionInspector';
import { GridlockSetupModals } from './GridlockSetupModals';
import { GridlockInsightsCard } from './GridlockInsightsCard';
import { useGridlockSetupState } from './useGridlockSetupState';
import { GridlockVoiceSettingsDialog } from '../helpers/GridlockVoiceSettingsDialog';
import { GridlockVoiceConfig, DEFAULT_GRIDLOCK_VOICE } from '../helpers/gridlockSpeechEngine';
import { LessonChunk, ModuleScheme } from '../../../../../types';

interface Props {
  lessonTitle: string;
  chunks?: LessonChunk[];
  moduleScheme?: ModuleScheme;
  onNotice?: (msg: string) => void;
}

export const GridlockInlineSetupView: React.FC<Props> = ({ lessonTitle, chunks = [], moduleScheme, onNotice }) => {
  const s = useGridlockSetupState(lessonTitle, chunks, moduleScheme);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [voiceConfig, setVoiceConfig] = useState<GridlockVoiceConfig>(DEFAULT_GRIDLOCK_VOICE);
  const [insights, setInsights] = useState(false);

  const handleGenerateAi = async () => {
    const res = await s.generateAi(moduleScheme);
    if (res.success) onNotice?.(`Generated ${res.count} gameshow hex questions with randomised board order! ✨`);
    else onNotice?.('Could not generate AI questions. Retained extracted lesson keywords.');
  };

  const handleAttach = () => {
    sessionStorage.setItem('attached_gridlock_game', JSON.stringify({ roomCode: s.roomCode, lessonTitle, tournamentFormat: s.tournamentFormat, questions: s.questions }));
    s.setIsAttached(true);
    onNotice?.('Attached GridLock 5x5 to Lesson Plan!');
  };

  const handleNavigateStep5 = () => {
    sessionStorage.setItem('active_lesson_step', '5');
    window.dispatchEvent(new CustomEvent('quicklesson_step_change', { detail: { step: 5, stepKey: 'discussion_starters' } }));
  };

  return (
    <div id="gridlock-setup-container" className="space-y-4">
      {s.isAttached && <GridlockAttachedBanner roomCode={s.roomCode} onContinueToStep5={handleNavigateStep5} />}
      <GridlockConfigControls tournamentFormat={s.tournamentFormat} onFormatChange={s.setTournamentFormat} goldHexCount={s.goldHexCount} onGoldHexToggle={() => s.setGoldHexCount((p) => (p > 0 ? 0 : 2))} onOpenVoiceSettings={() => setShowVoiceSettings(true)} />
      <GridlockRoomLauncherCard
        roomCode={s.roomCode}
        isAttached={s.isAttached}
        onAttachToLesson={handleAttach}
        onCopyLink={() => { navigator.clipboard.writeText(`${window.location.origin}?gridlock=${s.roomCode}`); onNotice?.('Copied student link!'); }}
        onShuffleGrid={() => { s.reshuffleBoard(); onNotice?.('Randomised 5x5 hexagon board order for next match!'); }}
        onOpenPreFlight={() => s.setIsPreFlightOpen(true)}
        onOpenProjector={() => s.setIsProjectorOpen(true)}
        onOpenSimulator={() => s.setIsSimulatorOpen(true)}
      />
      <GridlockInsightsCard insights={insights} setInsights={setInsights} questions={s.questions} tournamentFormat={s.tournamentFormat} />
      <GridlockQuestionInspector questions={s.questions} tournamentFormat={s.tournamentFormat} isGenerating={s.isGenerating} onGenerateAi={handleGenerateAi} onUpdateQuestion={(idx, upd) => { const updated = [...s.questions]; updated[idx] = upd; s.setQuestions(updated); }} />
      <GridlockSetupModals
        isPreFlightOpen={s.isPreFlightOpen}
        isSimulatorOpen={s.isSimulatorOpen}
        isProjectorOpen={s.isProjectorOpen}
        questions={s.questions}
        grid={s.grid}
        lessonTitle={lessonTitle}
        chunks={chunks}
        activeGameState={s.activeGameState}
        onClosePreFlight={() => s.setIsPreFlightOpen(false)}
        onLaunchTournament={() => { s.setIsPreFlightOpen(false); s.setIsProjectorOpen(true); }}
        onCloseSimulator={() => s.setIsSimulatorOpen(false)}
        onCloseProjector={() => s.setIsProjectorOpen(false)}
        onNotice={onNotice}
      />
      <GridlockVoiceSettingsDialog isOpen={showVoiceSettings} config={voiceConfig} onChangeConfig={setVoiceConfig} onClose={() => setShowVoiceSettings(false)} />
    </div>
  );
};
