import React, { useState } from 'react';
import { ImposterGameState, Player } from '../types/imposterTypes';
import { MainBoardOverlay } from './MainBoardOverlay';
import { AvatarGrid } from './AvatarGrid';
import { VotingTallyBoard } from './VotingTallyBoard';
import { TieBreakerResolution } from './TieBreakerResolution';
import { ClassVictoryModal } from './ClassVictoryModal';
import { GhostWriterFanfare } from './GhostWriterFanfare';
import { ImposterAnalyticsDashboard } from '../analytics';
import { X, ShieldAlert, BarChart3 } from 'lucide-react';

interface Props {
  gameState: ImposterGameState;
  onClose: () => void;
  onNotice?: (msg: string) => void;
}

const DEFAULT_PUPILS: Player[] = [
  { id: 'p1', name: 'Oliver', role: 'innocent', isAlive: true, score: 10, completedTasks: 2 },
  { id: 'p2', name: 'Amelia', role: 'imposter', isAlive: true, score: 8, completedTasks: 1 },
  { id: 'p3', name: 'Harry', role: 'innocent', isAlive: true, score: 12, completedTasks: 3 },
  { id: 'p4', name: 'Isla', role: 'innocent', isAlive: true, score: 14, completedTasks: 3 },
  { id: 'p5', name: 'George', role: 'innocent', isAlive: true, score: 9, completedTasks: 2 },
  { id: 'p6', name: 'Ava', role: 'innocent', isAlive: true, score: 11, completedTasks: 2 },
];

export const TeacherLiveSessionContainer: React.FC<Props> = ({ gameState, onClose, onNotice }) => {
  const [players, setPlayers] = useState<Player[]>(gameState.players.length ? gameState.players : DEFAULT_PUPILS);
  const [seconds] = useState(gameState.config.timerPreset || 30);
  const [isVoting, setIsVoting] = useState(false);
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
  const [tiedPair, setTiedPair] = useState<[string, string] | null>(null);
  const [showVictory, setShowVictory] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [fanfareData, setFanfareData] = useState<{ ghost: string; eliminated: string } | null>(null);

  const alive = players.filter((p) => p.isAlive);
  const activeNonImposters = alive.filter((p) => p.role !== 'imposter').length;

  const handleStartVoting = () => {
    setIsVoting(true);
    const tally: Record<string, number> = {};
    alive.forEach((p, idx) => { tally[p.id] = idx < 2 ? 3 : 1; });
    setVoteCounts(tally);
  };

  const handleEliminate = (id: string) => {
    const eliminated = players.find((p) => p.id === id);
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, isAlive: false, badge: 'spectator' } : p)));
    setIsVoting(false);
    if (eliminated?.role === 'imposter') {
      const remainingImposters = players.filter((p) => p.role === 'imposter' && p.id !== id && p.isAlive);
      if (remainingImposters.length === 0) setShowVictory(true);
    } else if (activeNonImposters > 2 && eliminated) {
      setFanfareData({ ghost: 'Oliver', eliminated: eliminated.name });
    }
  };

  return (
    <div id="imposter-teacher-live-session" className="fixed inset-0 z-50 bg-[#F8F6F0] p-4 sm:p-6 overflow-y-auto flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-black uppercase tracking-widest text-[#2D2A26]">Classroom Imposter • Main Projector Display</h1>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setShowSummary(!showSummary)} className="px-3 py-1.5 rounded-xl bg-white border border-[#2D2A26]/15 text-xs font-bold text-[#2D2A26] flex items-center gap-1.5 cursor-pointer">
            <BarChart3 className="w-3.5 h-3.5 text-purple-600" /> {showSummary ? 'Live Display' : 'Debrief'}
          </button>
          {!isVoting && !showSummary && (
            <button id="btn-open-class-voting" type="button" onClick={handleStartVoting} className="px-3.5 py-1.5 rounded-xl bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer">
              <ShieldAlert className="w-3.5 h-3.5" /> Open Ballot
            </button>
          )}
          <button id="btn-close-live-session" type="button" onClick={onClose} className="p-2 rounded-xl bg-white border border-[#2D2A26]/15 hover:bg-black/5 text-[#2D2A26] cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
      </div>

      {showSummary ? (
        <ImposterAnalyticsDashboard lessonTitle={gameState.config.lessonTitle} roundsPlayed={gameState.currentRound || 1} players={players} onPlayAgain={() => { setShowSummary(false); setPlayers(DEFAULT_PUPILS); }} onClose={() => setShowSummary(false)} />
      ) : (
        <>
          <MainBoardOverlay roomCode={gameState.roomCode} lessonTitle={gameState.config.lessonTitle} currentRound={gameState.currentRound} remainingSeconds={seconds} totalSeconds={gameState.config.timerPreset || 30} aliveCount={alive.length} totalCount={players.length} isVotingOpen={isVoting} />
          <AvatarGrid players={players} />
          {isVoting && <VotingTallyBoard players={players} voteCounts={voteCounts} onTriggerTieBreaker={(pair) => setTiedPair(pair)} onConfirmElimination={handleEliminate} />}
        </>
      )}

      {tiedPair && (
        <TieBreakerResolution tiedPlayers={[players.find((p) => p.id === tiedPair[0])!, players.find((p) => p.id === tiedPair[1])!]} alivePlayers={alive} onResolveElimination={(id, note) => { setTiedPair(null); handleEliminate(id); onNotice?.(note); }} onCancel={() => setTiedPair(null)} />
      )}
      <ClassVictoryModal isOpen={showVictory} onClose={() => setShowVictory(false)} players={players} onViewReport={() => { setShowVictory(false); setShowSummary(true); }} onPlayAgain={() => { setShowVictory(false); setPlayers(DEFAULT_PUPILS); setIsVoting(false); }} />
      {fanfareData && <GhostWriterFanfare isOpen={Boolean(fanfareData)} onClose={() => setFanfareData(null)} ghostPlayerName={fanfareData.ghost} eliminatedPlayerName={fanfareData.eliminated} activeNonImposterCount={activeNonImposters} />}
    </div>
  );
};
