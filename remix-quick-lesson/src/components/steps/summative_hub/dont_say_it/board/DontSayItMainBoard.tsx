import React, { useState, useEffect } from 'react';
import { DontSayItGameState } from '../types/dontSayItTypes';
import { RoundResolution } from '../types/roundResolutionTypes';
import { DecayingScoreGauge } from './DecayingScoreGauge';
import { ClueGiverRotatorBanner } from './ClueGiverRotatorBanner';
import { ActiveSecretCardDisplay } from './ActiveSecretCardDisplay';
import { FloatingReactionsOverlay, FloatingEmoji } from './FloatingReactionsOverlay';
import { SecretWordBlackoutOverlay } from '../judging/SecretWordBlackoutOverlay';
import { InterTurnSetupBoard } from './InterTurnSetupBoard';
import { RoundResolutionScreen } from '../standings/RoundResolutionScreen';

interface Props {
  gameState: DontSayItGameState;
  resolution?: RoundResolution | null;
  reactions?: FloatingEmoji[];
  isUnlocked?: boolean;
  onStartRound?: () => void;
  onAdvanceToSetup?: () => void;
  onAwardTeacherBonus?: (pts: number, reason: string) => void;
  onTimeout?: () => void;
}

export const DontSayItMainBoard: React.FC<Props> = ({
  gameState,
  resolution,
  reactions = [],
  isUnlocked: controlledUnlocked,
  onStartRound,
  onAdvanceToSetup,
  onAwardTeacherBonus,
  onTimeout,
}) => {
  const [internalUnlocked, setInternalUnlocked] = useState(false);
  const isUnlocked = controlledUnlocked !== undefined ? controlledUnlocked : internalUnlocked;
  const [timeLeft, setTimeLeft] = useState(gameState.config?.timeLimitSeconds || 60);
  const isAdjudicating = Boolean(gameState.adjudication?.isActive);

  const activeTeam = gameState.teams[gameState.currentTeamIndex] || gameState.teams[0];
  const opposingTeam = gameState.teams.find((t) => t.id !== activeTeam.id) || gameState.teams[1] || activeTeam;
  const activeCard = gameState.cards[gameState.activeCardIndex] || gameState.cards[0];
  const teamPlayers = gameState.players.filter((p) => p.teamId === activeTeam.id);
  const guesser = teamPlayers.find((p) => p.role === 'guesser') || teamPlayers[0] || {
    id: 'p1', name: 'Pupil Guesser', teamId: activeTeam.id, role: 'guesser' as const,
  };

  useEffect(() => {
    if (isUnlocked) setTimeLeft(gameState.config?.timeLimitSeconds || 60);
  }, [isUnlocked, gameState.config?.timeLimitSeconds]);

  useEffect(() => {
    if (!isUnlocked || isAdjudicating || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeout?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isUnlocked, isAdjudicating, timeLeft, onTimeout]);

  if (gameState.status === 'round_recap' && resolution) {
    return (
      <RoundResolutionScreen
        gameState={gameState}
        resolution={resolution}
        onAdvanceToSetup={() => onAdvanceToSetup?.()}
        onAwardTeacherBonus={(pts, reason) => onAwardTeacherBonus?.(pts, reason)}
      />
    );
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-slate-950 p-5 rounded-3xl border-4 border-slate-800 shadow-2xl space-y-3.5 overflow-hidden">
      <FloatingReactionsOverlay reactions={reactions} />
      <SecretWordBlackoutOverlay adjudication={gameState.adjudication} />

      {!isUnlocked ? (
        <InterTurnSetupBoard nextGuesserName={guesser.name} activeTeamName={activeTeam.name} opposingTeamName={opposingTeam.name} onStartRound={() => { setInternalUnlocked(true); onStartRound?.(); }} />
      ) : (
        <>
          <DecayingScoreGauge timeLeft={timeLeft} totalTime={gameState.config?.timeLimitSeconds || 60} isPaused={isAdjudicating} />
          <ClueGiverRotatorBanner activeTeamPlayers={teamPlayers.length > 0 ? teamPlayers : [guesser]} excludedPlayerId={guesser.id} isGameActive={!isAdjudicating && timeLeft > 0} />
          {activeCard && !isAdjudicating && (
            <ActiveSecretCardDisplay card={activeCard} bannedWords={activeCard.studentBannedWords?.length ? activeCard.studentBannedWords : activeCard.activeBannedWords} />
          )}
        </>
      )}
    </div>
  );
};
