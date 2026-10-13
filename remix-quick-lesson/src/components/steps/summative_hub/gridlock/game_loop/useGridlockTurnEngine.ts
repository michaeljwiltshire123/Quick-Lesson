import { useState, useEffect, useCallback } from 'react';
import { HexTile, TeamColor } from '../types/gridlockTypes';
import { playTileSelectTone, playCorrectChime, playBounceBuzzer } from '../helpers/audioBeepEngine';
import { isAnswerFuzzyMatch } from '../helpers/fuzzyMatcher';

export type GamePhase = 'picking' | 'answering' | 'bounce' | 'scored';

export function useGridlockTurnEngine(
  initialGrid: HexTile[][],
  onTileClaimed?: (tileId: string, team: TeamColor) => void,
  onMatchWin?: (team: TeamColor) => void
) {
  const [grid, setGrid] = useState<HexTile[][]>(initialGrid);
  const [activeTileId, setActiveTileId] = useState<string | null>(
    initialGrid[2]?.[2]?.id || initialGrid[0]?.[0]?.id || null
  );
  const [turnTeam, setTurnTeam] = useState<TeamColor>('red');
  const [answeringTeam, setAnsweringTeam] = useState<TeamColor>('red');
  const [phase, setPhase] = useState<GamePhase>('picking');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [redStreak, setRedStreak] = useState<number>(0);
  const [blueStreak, setBlueStreak] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const activeTile = grid.flat().find((t) => t.id === activeTileId) || null;

  const selectTile = useCallback((tile: HexTile) => {
    if (tile.owner !== 'none') return;
    setActiveTileId(tile.id);
    setAnsweringTeam(turnTeam);
    setPhase('answering');
    setTimeLeft(30);
    setFeedback(`Letter '${tile.letter}' selected! ${turnTeam.toUpperCase()} Team answering...`);
    playTileSelectTone();
  }, [turnTeam]);

  const swapActiveQuestion = useCallback(() => {
    if (!activeTile || !activeTile.backupQuestions || activeTile.backupQuestions.length === 0) return;
    const nextQ = activeTile.backupQuestions[0];
    const remainingBackups = activeTile.backupQuestions.slice(1);

    const nextGrid = grid.map((r) =>
      r.map((t) =>
        t.id === activeTile.id
          ? { ...t, letter: nextQ.letter, activeQuestion: nextQ, backupQuestions: remainingBackups }
          : t
      )
    );
    setGrid(nextGrid);
    setPhase('answering');
    setTimeLeft(30);
    setFeedback(`Question swapped to '${nextQ.letter}'!`);
  }, [activeTile, grid]);

  const submitAnswer = useCallback((answer: string) => {
    if (!activeTile || !activeTile.activeQuestion) return { isCorrect: false };
    const q = activeTile.activeQuestion;
    const match = isAnswerFuzzyMatch(answer, q.targetAnswer, q.acceptableAnswers);

    if (match.isMatch) {
      playCorrectChime();
      if (answeringTeam === 'red') setRedStreak((s) => s + 1);
      else setBlueStreak((s) => s + 1);

      const nextGrid = grid.map((r) => r.map((t) => (t.id === activeTile.id ? { ...t, owner: answeringTeam } : t)));
      setGrid(nextGrid);
      onTileClaimed?.(activeTile.id, answeringTeam);
      setTurnTeam(answeringTeam);
      setPhase('scored');
      setFeedback(`Correct! ${answeringTeam.toUpperCase()} captures Hex '${activeTile.letter}'!`);
      return { isCorrect: true, matchedAnswer: q.targetAnswer };
    } else {
      playBounceBuzzer();
      if (answeringTeam === 'red') setRedStreak(0);
      else setBlueStreak(0);

      const opposing: TeamColor = answeringTeam === 'red' ? 'blue' : 'red';
      setPhase('bounce');
      setTimeLeft(0);
      setFeedback(`Wrong! Answer was "${q.targetAnswer}". Turn passes to ${opposing.toUpperCase()} Team.`);
      return { isCorrect: false, targetAnswer: q.targetAnswer };
    }
  }, [activeTile, answeringTeam, grid, onTileClaimed]);

  useEffect(() => {
    if (phase !== 'answering' && phase !== 'bounce') return;
    if (timeLeft <= 0) {
      submitAnswer('');
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft, submitAnswer]);

  return {
    grid, setGrid, activeTile, activeTileId, setActiveTileId,
    turnTeam, setTurnTeam, answeringTeam, phase, setPhase,
    timeLeft, redStreak, blueStreak, feedback, selectTile, submitAnswer, swapActiveQuestion,
  };
}
