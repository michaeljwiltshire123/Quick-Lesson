import React, { useState, useEffect, useMemo } from 'react';
import { GridlockGameState, HexTile, TeamColor } from '../types/gridlockTypes';
import { HexGridContainer } from './HexGridContainer';
import { GridlockHeaderBanner } from './GridlockHeaderBanner';
import { checkRedLeftToRightWin, checkBlueTopToBottomWin } from './pathConnectionChecker';

interface Props {
  gameState: GridlockGameState;
  onTileSelect?: (tile: HexTile) => void;
  onMatchWin?: (winningTeam: TeamColor, pathTileIds: string[]) => void;
}

export const GridlockMainBoard: React.FC<Props> = ({ gameState, onTileSelect, onMatchWin }) => {
  const [timerSeconds, setTimerSeconds] = useState(180);

  useEffect(() => {
    if (gameState.status !== 'in_game') return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState.status]);

  const redWinResult = useMemo(() => checkRedLeftToRightWin(gameState.grid), [gameState.grid]);
  const blueWinResult = useMemo(() => checkBlueTopToBottomWin(gameState.grid), [gameState.grid]);

  useEffect(() => {
    if (redWinResult.hasWon && redWinResult.winningTeam) {
      onMatchWin?.(redWinResult.winningTeam, redWinResult.pathTileIds);
    } else if (blueWinResult.hasWon && blueWinResult.winningTeam) {
      onMatchWin?.(blueWinResult.winningTeam, blueWinResult.pathTileIds);
    }
  }, [redWinResult, blueWinResult, onMatchWin]);

  const winningPathIds = redWinResult.hasWon
    ? redWinResult.pathTileIds
    : blueWinResult.hasWon
    ? blueWinResult.pathTileIds
    : [];

  return (
    <div className="space-y-4 w-full max-w-4xl mx-auto">
      <GridlockHeaderBanner
        scores={gameState.scores}
        roundTimerSeconds={timerSeconds}
        redStreak={3}
        blueStreak={2}
        currentMvp="Sophie T. (Red)"
      />

      <HexGridContainer
        grid={gameState.grid}
        activeTileId={gameState.activeTileId}
        winningPathIds={winningPathIds}
        onTileClick={onTileSelect}
      />
    </div>
  );
};
