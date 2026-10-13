import React, { useState, useEffect } from 'react';
import { GridlockGameState, TeamColor, Player } from '../types/gridlockTypes';
import { GridlockMainBoard } from '../board/GridlockMainBoard';
import { StudentGridlockContainer } from '../student_view/StudentGridlockContainer';
import { TeamTrophyModal } from '../celebration/TeamTrophyModal';
import { GridlockArenaHeader } from './GridlockArenaHeader';
import { GridlockPostGameDebriefModal } from '../analytics/GridlockPostGameDebriefModal';
import { advanceGridToNextMatchRound } from '../game_loop/backupQuestionLoader';
import { TurnStatusBanner } from '../live/TurnStatusBanner';
import { useGridlockTurnEngine } from '../game_loop/useGridlockTurnEngine';
import { GridlockVoiceSettingsDialog } from '../helpers/GridlockVoiceSettingsDialog';
import { speakCurriculumPrompt, speakWrongAnswer, GridlockVoiceConfig, DEFAULT_GRIDLOCK_VOICE } from '../helpers/gridlockSpeechEngine';

interface Props {
  initialGameState: GridlockGameState;
  onClose: () => void;
  onNotice?: (msg: string) => void;
}

export const GridlockInteractiveArena: React.FC<Props> = ({ initialGameState, onNotice }) => {
  const [viewLayout, setViewLayout] = useState<'projector' | 'dual' | 'phone'>('dual');
  const [showTrophy, setShowTrophy] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [voiceConfig, setVoiceConfig] = useState<GridlockVoiceConfig>(DEFAULT_GRIDLOCK_VOICE);
  const [winningTeam, setWinningTeam] = useState<TeamColor>('red');
  const [scores, setScores] = useState(initialGameState.scores);

  const turnEngine = useGridlockTurnEngine(
    initialGameState.grid,
    (tileId, team) => onNotice?.(`Hex claimed by ${team.toUpperCase()} Team!`),
    (team) => handleMatchWin(team)
  );

  useEffect(() => {
    if (!voiceConfig.autoRead) return;
    if (turnEngine.phase === 'answering' && turnEngine.activeTile) {
      const t = setTimeout(() => speakCurriculumPrompt(turnEngine.activeTile!.activeQuestion.prompt, voiceConfig), 1000);
      return () => clearTimeout(t);
    } else if (turnEngine.phase === 'bounce' && turnEngine.activeTile?.activeQuestion?.targetAnswer) {
      const t = setTimeout(() => speakWrongAnswer(turnEngine.activeTile!.activeQuestion.targetAnswer, voiceConfig), 1000);
      return () => clearTimeout(t);
    }
  }, [turnEngine.activeTile?.id, turnEngine.phase, voiceConfig]);

  const testStudent: Player = { id: 'test-student-1', name: 'Oliver P.', team: turnEngine.answeringTeam };

  const handleMatchWin = (team: TeamColor) => {
    setWinningTeam(team);
    setShowTrophy(true);
    onNotice?.(`Hexagon Bridge Complete! ${team.toUpperCase()} Team wins round!`);
  };

  const handleNextRound = () => {
    setShowTrophy(false);
    const nextMatch = scores.currentMatch + 1;
    const freshGrid = advanceGridToNextMatchRound(turnEngine.grid, nextMatch, initialGameState.lessonTitle);
    turnEngine.setGrid(freshGrid);
    turnEngine.setActiveTileId(freshGrid[2]?.[2]?.id || freshGrid[0]?.[0]?.id || null);
    turnEngine.setPhase('picking');
    setScores((prev) => ({
      ...prev,
      currentMatch: nextMatch,
      redWins: winningTeam === 'red' ? prev.redWins + 1 : prev.redWins,
      blueWins: winningTeam === 'blue' ? prev.blueWins + 1 : prev.blueWins,
    }));
    onNotice?.(`Match ${nextMatch} loaded with fresh curriculum questions!`);
  };

  const activeGameState: GridlockGameState = { ...initialGameState, grid: turnEngine.grid, activeTileId: turnEngine.activeTileId, scores };

  return (
    <div className="space-y-3.5">
      <GridlockArenaHeader roomCode={initialGameState.roomCode} viewLayout={viewLayout} onViewLayoutChange={setViewLayout} onClaimTile={() => turnEngine.submitAnswer(turnEngine.activeTile?.activeQuestion?.targetAnswer || '')} onOpenVoiceSettings={() => setShowVoiceSettings(true)} />
      <TurnStatusBanner turnTeam={turnEngine.turnTeam} answeringTeam={turnEngine.answeringTeam} phase={turnEngine.phase} timeLeft={turnEngine.timeLeft} feedback={turnEngine.feedback} letter={turnEngine.activeTile?.letter} onSwapQuestion={turnEngine.swapActiveQuestion} hasBackups={Boolean(turnEngine.activeTile?.backupQuestions?.length)} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {(viewLayout === 'projector' || viewLayout === 'dual') && (
          <div className={viewLayout === 'dual' ? 'lg:col-span-7 xl:col-span-8' : 'col-span-12'}>
            <GridlockMainBoard gameState={activeGameState} onTileSelect={(tile) => turnEngine.selectTile(tile)} onMatchWin={handleMatchWin} />
          </div>
        )}
        {(viewLayout === 'phone' || viewLayout === 'dual') && (
          <div className={viewLayout === 'dual' ? 'lg:col-span-5 xl:col-span-4' : 'max-w-md mx-auto'}>
            <div className="bg-[#1E1C1A] p-4 rounded-3xl border-4 border-slate-700 shadow-2xl">
              <div className="w-16 h-1 bg-white/20 rounded-full mx-auto mb-3" />
              <StudentGridlockContainer gameState={activeGameState} currentStudent={testStudent} onSelectNextTile={(id) => { const target = turnEngine.grid.flat().find((t) => t.id === id); if (target) turnEngine.selectTile(target); }} onNotice={onNotice} />
            </div>
          </div>
        )}
      </div>
      <TeamTrophyModal isOpen={showTrophy} winningTeam={winningTeam} finalScores={{ red: scores.redWins + (winningTeam === 'red' ? 1 : 0), blue: scores.blueWins + (winningTeam === 'blue' ? 1 : 0) }} mvps={[{ rank: 1, studentName: 'Sophie T.', team: 'red', score: 140, fastestResponseSec: 1.8 }, { rank: 2, studentName: 'Oliver P.', team: 'red', score: 110, fastestResponseSec: 2.2 }, { rank: 3, studentName: 'Lucas M.', team: 'blue', score: 95, fastestResponseSec: 2.5 }]} onClose={() => setShowTrophy(false)} onNextRound={handleNextRound} onViewSummary={() => { setShowTrophy(false); setShowDebrief(true); }} />
      <GridlockPostGameDebriefModal isOpen={showDebrief} lessonTitle={initialGameState.lessonTitle} questions={turnEngine.grid.flatMap((r) => r.map((t) => t.activeQuestion))} winningTeam={winningTeam} onClose={() => setShowDebrief(false)} onNotice={onNotice} />
      <GridlockVoiceSettingsDialog isOpen={showVoiceSettings} config={voiceConfig} onChangeConfig={setVoiceConfig} onClose={() => setShowVoiceSettings(false)} />
    </div>
  );
};
