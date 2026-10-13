import React, { useState, useMemo } from 'react';
import { Player, GridlockGameState } from '../types/gridlockTypes';
import { StudentTypedInputCard } from './StudentTypedInputCard';
import { TileCaptureSelector } from './TileCaptureSelector';
import { resolveRoundWinner, StudentSubmission } from './PercentageScoringEngine';
import { StudentContainerHeader } from './StudentContainerHeader';

interface Props {
  gameState: GridlockGameState;
  currentStudent: Player;
  onSelectNextTile?: (tileId: string) => void;
  onNotice?: (msg: string) => void;
}

export const StudentGridlockContainer: React.FC<Props> = ({
  gameState,
  currentStudent,
  onSelectNextTile,
  onNotice,
}) => {
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [roundCompleted, setRoundCompleted] = useState(false);

  const activeTile = useMemo(() => {
    return (
      gameState.grid.flat().find((t) => t.id === gameState.activeTileId) ||
      gameState.grid[2]?.[2] ||
      gameState.grid[Math.floor(gameState.grid.length / 2)]?.[Math.floor((gameState.grid[0]?.length || 5) / 2)] ||
      gameState.grid[0]?.[0] ||
      null
    );
  }, [gameState.grid, gameState.activeTileId]);

  const unclaimedTiles = useMemo(() => {
    return gameState.grid.flat().filter((t) => t.owner === 'none');
  }, [gameState.grid]);

  const roundResolution = useMemo(() => {
    return resolveRoundWinner(gameState.players, submissions);
  }, [gameState.players, submissions]);

  const isAllPlayersSubmitted = useMemo(() => {
    return gameState.players.length === 0 ? submissions.length >= 1 : submissions.length >= gameState.players.length;
  }, [gameState.players, submissions]);

  const handleStudentSubmit = (answer: string, isCorrect: boolean) => {
    const newSub: StudentSubmission = {
      playerId: currentStudent.id,
      playerName: currentStudent.name,
      team: currentStudent.team,
      submittedAnswer: answer,
      isCorrect,
      responseTimeMs: Math.floor(Math.random() * 3000) + 1200,
    };
    setSubmissions((prev) => [...prev, newSub]);
    onNotice?.(isCorrect ? 'Correct! Turn won!' : 'Recorded answer.');
  };

  const handleTimeExpired = () => {
    onNotice?.('Timer elapsed! Turn ended.');
    setRoundCompleted(true);
  };

  return (
    <div className="max-w-md mx-auto space-y-4 p-2 sm:p-4">
      <StudentContainerHeader currentStudent={currentStudent} roomCode={gameState.roomCode} />

      {!roundCompleted && activeTile ? (
        <StudentTypedInputCard
          prompt={activeTile.activeQuestion.prompt}
          letter={activeTile.letter}
          targetAnswer={activeTile.activeQuestion.targetAnswer}
          acceptableAnswers={activeTile.activeQuestion.acceptableAnswers}
          totalTimeSeconds={30}
          allPlayersSubmitted={isAllPlayersSubmitted}
          onSubmitAnswer={handleStudentSubmit}
          onTimeExpired={handleTimeExpired}
        />
      ) : roundResolution.winningTeam ? (
        <TileCaptureSelector
          grid={gameState.grid}
          fastestStudentName={roundResolution.fastestPlayer?.playerName || currentStudent.name}
          winningTeam={roundResolution.winningTeam}
          unclaimedTiles={unclaimedTiles}
          isCurrentStudentFastest={roundResolution.fastestPlayer?.playerId === currentStudent.id}
          onSelectNextTile={(id) => {
            onSelectNextTile?.(id);
            setRoundCompleted(false);
            setSubmissions([]);
          }}
        />
      ) : null}
    </div>
  );
};
