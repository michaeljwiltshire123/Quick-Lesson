import React, { useState } from 'react';
import { Player, DontSayItGameState } from '../types/dontSayItTypes';
import { RoundResolution } from '../types/roundResolutionTypes';
import { StudentClueGiverCard } from './StudentClueGiverCard';
import { BannedWordInputCard } from './BannedWordInputCard';
import { OpposingJudgePanel } from './OpposingJudgePanel';
import { SpectatorLivePanel } from './SpectatorLivePanel';
import { HeardTheWordButton } from '../judging/HeardTheWordButton';
import { AdjudicationModal } from '../judging/AdjudicationModal';
import { StudentRecapRoleDispatcher } from './StudentRecapRoleDispatcher';
import { EyeOff } from 'lucide-react';

interface Props {
  currentStudent: Player;
  gameState: DontSayItGameState;
  resolution?: RoundResolution | null;
  isRoundActive?: boolean;
  onUnlockAntiPeek?: () => void;
  onTriggerFoul?: () => void;
  onHeardTheWord?: () => void;
  onConfirmAdjudication?: () => void;
  onContinueAdjudication?: () => void;
  onSubmitBannedWords?: (words: string[]) => void;
  onSendReaction?: (emoji: string) => void;
  onAdvanceToSetup?: () => void;
  onNotice?: (msg: string) => void;
}

export const StudentDontSayItContainer: React.FC<Props> = ({
  currentStudent,
  gameState,
  resolution,
  isRoundActive = false,
  onUnlockAntiPeek,
  onTriggerFoul,
  onHeardTheWord,
  onConfirmAdjudication,
  onContinueAdjudication,
  onSubmitBannedWords,
  onSendReaction,
  onAdvanceToSetup,
  onNotice,
}) => {
  const [judgeAlert, setJudgeAlert] = useState<string | null>(null);
  const activeTeam = gameState.teams[gameState.currentTeamIndex] || gameState.teams[0];
  const nextTeamIndex = (gameState.currentTeamIndex + 1) % gameState.teams.length;
  const nextTeam = gameState.teams[nextTeamIndex] || gameState.teams[0];
  const isMyTeamActive = currentStudent.teamId === activeTeam?.id;
  const activeCard = gameState.cards[gameState.activeCardIndex] || gameState.cards[0];
  const isAdjudicating = Boolean(gameState.adjudication?.isActive);

  return (
    <div className="max-w-md mx-auto space-y-4 p-3">
      <div className="bg-[#2D2A26] text-white p-3.5 rounded-2xl border border-white/10 flex items-center justify-between shadow-md">
        <div>
          <div className="text-xs font-black">{currentStudent.name}</div>
          <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
            {gameState.status === 'round_recap' ? 'Round Standings Review' : isMyTeamActive ? `${activeTeam?.name} (Describing)` : 'Opposing Squad (Sabotaging)'}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] text-gray-400 uppercase font-bold">Room Code</div>
          <div className="text-xs font-mono font-black text-amber-400">{gameState.roomCode}</div>
        </div>
      </div>

      {gameState.status === 'round_recap' && resolution ? (
        <StudentRecapRoleDispatcher
          currentStudent={currentStudent}
          resolution={resolution}
          nextTeamName={nextTeam.name}
          nextGuesserName={gameState.players.find((p) => p.teamId === nextTeam.id && p.role === 'guesser')?.name || 'Next Guesser'}
          candidatePlayers={gameState.players.filter((p) => p.teamId === activeTeam.id && p.role !== 'guesser')}
          onAdvanceToSetup={() => onAdvanceToSetup?.()}
        />
      ) : currentStudent.role === 'guesser' ? (
        <div className="bg-amber-400 text-slate-950 p-6 rounded-3xl text-center space-y-2 shadow-xl">
          <EyeOff className="w-8 h-8 mx-auto text-slate-950" />
          <h3 className="text-lg font-black uppercase">You Are The Guesser!</h3>
          <p className="text-xs font-bold leading-relaxed">Turn around facing away from the screen!</p>
        </div>
      ) : currentStudent.role === 'guessing_judge' ? (
        <HeardTheWordButton judgeName={currentStudent.name} isGameRunning={isRoundActive} isAdjudicationActive={isAdjudicating} onHeardTheWord={() => onHeardTheWord?.()} />
      ) : currentStudent.role === 'judge' ? (
        <OpposingJudgePanel judgeName={currentStudent.name} isGameRunning={isRoundActive} isAntiPeekActive={!isRoundActive} whistleblowerAlert={judgeAlert} onUnlockAntiPeek={() => onUnlockAntiPeek?.()} onTriggerFoul={() => onTriggerFoul?.()} />
      ) : isMyTeamActive && activeCard ? (
        <StudentClueGiverCard card={activeCard} isCurrentSpeaker={currentStudent.role === 'clue_giver'} turnSecondsRemaining={5} />
      ) : isRoundActive ? (
        <SpectatorLivePanel studentName={currentStudent.name} onSendReaction={(e) => onSendReaction?.(e)} onWhistleblow={(r) => { setJudgeAlert(r); onNotice?.('Tip sent to judge!'); }} />
      ) : activeCard ? (
        <BannedWordInputCard targetWord={activeCard.targetWord} maxWords={gameState.config?.bannedWordsPerCard || 2} onSubmitBannedWords={(w) => { onSubmitBannedWords?.(w); onNotice?.('Submitted forbidden words!'); }} />
      ) : null}

      <AdjudicationModal isOpen={isAdjudicating} adjudication={gameState.adjudication} onConfirm={() => onConfirmAdjudication?.()} onContinue={() => onContinueAdjudication?.()} />
    </div>
  );
};
