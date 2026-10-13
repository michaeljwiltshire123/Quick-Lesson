import React, { useState, useEffect } from 'react';
import { HexTile, TournamentScore } from '../types/gridlockTypes';
import { checkRedLeftToRightWin, checkBlueTopToBottomWin } from '../board/pathConnectionChecker';
import { useGridlockTurnEngine } from '../game_loop/useGridlockTurnEngine';
import { SimulatorScreenTabs, SimulatorScreenMode } from './screens/SimulatorScreenTabs';
import { SimulatorLobbyScreen } from './screens/SimulatorLobbyScreen';
import { SimulatorScoredScreen } from './screens/SimulatorScoredScreen';
import { SimulatorBounceScreen } from './screens/SimulatorBounceScreen';
import { SimulatorDebriefScreen } from './screens/SimulatorDebriefScreen';
import { SimulatorLiveView } from './screens/SimulatorLiveView';
import { GridlockVoiceSettingsDialog } from '../helpers/GridlockVoiceSettingsDialog';
import { speakCurriculumPrompt, GridlockVoiceConfig, DEFAULT_GRIDLOCK_VOICE } from '../helpers/gridlockSpeechEngine';
import { X, Sliders } from 'lucide-react';
import { LessonChunk } from '../../../../../types';

interface Props {
  isOpen: boolean;
  initialGrid: HexTile[][];
  lessonTitle: string;
  chunks?: LessonChunk[];
  onClose: () => void;
  onNotice?: (msg: string) => void;
}

export const GridlockSimulatorModal: React.FC<Props> = ({
  isOpen, initialGrid, lessonTitle, onClose, onNotice,
}) => {
  if (!isOpen) return null;
  const [screenMode, setScreenMode] = useState<SimulatorScreenMode>('answering');
  const [voiceConfig, setVoiceConfig] = useState<GridlockVoiceConfig>(DEFAULT_GRIDLOCK_VOICE);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [scores, setScores] = useState<TournamentScore>({ redWins: 0, blueWins: 0, currentMatch: 1, format: 'best-of-3' });

  const turnEngine = useGridlockTurnEngine(initialGrid, (tileId, team) => {
    onNotice?.(`Hex claimed by ${team.toUpperCase()} Squad!`);
    const conn = team === 'red' ? checkRedLeftToRightWin(turnEngine.grid) : checkBlueTopToBottomWin(turnEngine.grid);
    if (conn.hasWon) {
      setScores((s) => ({ ...s, redWins: team === 'red' ? s.redWins + 1 : s.redWins, blueWins: team === 'blue' ? s.blueWins + 1 : s.blueWins }));
      setScreenMode('debrief');
    }
  });

  useEffect(() => {
    if (!voiceConfig.autoRead || !turnEngine.activeTile) return;
    if (screenMode === 'answering' || screenMode === 'picking') {
      const timer = setTimeout(() => speakCurriculumPrompt(turnEngine.activeTile.activeQuestion.prompt, voiceConfig), 1000);
      return () => clearTimeout(timer);
    }
  }, [turnEngine.activeTile?.id, voiceConfig, screenMode]);

  const redPath = checkRedLeftToRightWin(turnEngine.grid);
  const bluePath = checkBlueTopToBottomWin(turnEngine.grid);
  const winningPathIds = redPath.hasWon ? redPath.pathTileIds : bluePath.hasWon ? bluePath.pathTileIds : [];

  return (
    <div className="fixed inset-0 z-50 bg-[#121110]/95 backdrop-blur-md flex flex-col p-3 sm:p-5 overflow-y-auto animate-in fade-in text-white">
      <div className="w-full max-w-7xl mx-auto space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black uppercase text-amber-400">GridLock Match Simulator</span>
            <span className="text-[10px] font-bold text-gray-400 bg-white/10 px-2 py-0.5 rounded-full">Screen Explorer</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setShowVoiceSettings(true)} className="py-1.5 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-amber-500/30 cursor-pointer">
              <Sliders className="w-3.5 h-3.5" /> <span>Voice ({voiceConfig.rate}x)</span>
            </button>
            <button type="button" onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer"><X className="w-5 h-5" /></button>
          </div>
        </div>

        <SimulatorScreenTabs activeScreen={screenMode} onSelectScreen={setScreenMode} />

        {screenMode === 'lobby' && <SimulatorLobbyScreen roomCode="7849" lessonTitle={lessonTitle} onStartGame={() => setScreenMode('picking')} />}
        {screenMode === 'correct' && <SimulatorScoredScreen letter={turnEngine.activeTile?.letter || 'P'} winningTeam={turnEngine.answeringTeam} targetAnswer={turnEngine.activeTile?.activeQuestion?.targetAnswer || 'Photosynthesis'} streakCount={2} onContinueToNextPick={() => { turnEngine.setPhase('picking'); setScreenMode('picking'); }} />}
        {screenMode === 'bounce' && (
          <SimulatorBounceScreen
            letter={turnEngine.activeTile?.letter || 'P'}
            failedTeam={turnEngine.answeringTeam}
            targetAnswer={turnEngine.activeTile?.activeQuestion?.targetAnswer || 'Photosynthesis'}
            nextTurnTeam={turnEngine.answeringTeam === 'red' ? 'blue' : 'red'}
            voiceConfig={voiceConfig}
            onProceedNext={() => {
              turnEngine.setTurnTeam(turnEngine.answeringTeam === 'red' ? 'blue' : 'red');
              turnEngine.setPhase('picking');
              setScreenMode('picking');
            }}
          />
        )}
        {screenMode === 'debrief' && <SimulatorDebriefScreen lessonTitle={lessonTitle} questions={turnEngine.grid.flatMap((r) => r.map((t) => t.activeQuestion))} winningTeam="red" onRestartMatch={() => setScreenMode('lobby')} />}
        {(screenMode === 'answering' || screenMode === 'picking') && (
          <SimulatorLiveView turnEngine={turnEngine} scores={scores} winningPathIds={winningPathIds} onSubmitAnswer={(ans) => { const r = turnEngine.submitAnswer(ans); if (r.isCorrect) setScreenMode('correct'); else setScreenMode('bounce'); return r; }} />
        )}
      </div>

      <GridlockVoiceSettingsDialog isOpen={showVoiceSettings} config={voiceConfig} onChangeConfig={setVoiceConfig} onClose={() => setShowVoiceSettings(false)} />
    </div>
  );
};
