import React, { useState } from 'react';
import { HexTile, TeamColor, GamePhase } from '../types/gridlockTypes';
import { playCorrectChime, playBounceBuzzer } from '../helpers/audioBeepEngine';
import { TeamInputPhoneHeader } from './TeamInputPhoneHeader';
import { TeamInputFeedbackCard } from './TeamInputFeedbackCard';
import { TeamPhoneAnswerForm } from './TeamPhoneAnswerForm';
import { PhoneMiniBoardPicker } from '../student_view/PhoneMiniBoardPicker';

interface Props {
  grid?: HexTile[][];
  turnTeam?: TeamColor;
  phase?: GamePhase;
  activeTile: HexTile | null;
  activeTeam: TeamColor;
  onSwitchTeam: (team: TeamColor) => void;
  onSelectTile?: (tile: HexTile) => void;
  onSubmitAnswer: (answer: string) => { isCorrect: boolean; matchedAnswer?: string };
  onAwardTileToTeam: (team: TeamColor) => void;
}

export const TeamInputPhonePreview: React.FC<Props> = ({
  grid,
  turnTeam = 'red',
  phase = 'picking',
  activeTile,
  activeTeam,
  onSwitchTeam,
  onSelectTile,
  onSubmitAnswer,
  onAwardTileToTeam,
}) => {
  const [typedInput, setTypedInput] = useState('');
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [streakCount, setStreakCount] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim()) return;
    const result = onSubmitAnswer(typedInput);
    if (result.isCorrect) {
      playCorrectChime();
      setLastFeedback({ isCorrect: true, text: `Correct! Accepted '${result.matchedAnswer}'.` });
      setStreakCount((prev) => prev + 1);
      onAwardTileToTeam(activeTeam);
    } else {
      playBounceBuzzer();
      const ans = activeTile?.activeQuestion?.targetAnswer || '';
      setLastFeedback({ isCorrect: false, text: `Wrong! The correct answer was '${ans}'. Turn ended.` });
      setStreakCount(1);
    }
    setTypedInput('');
  };

  const isChoosingMode = phase === 'picking' || phase === 'scored' || !activeTile;
  const isMyTeamTurnToChoose = activeTeam === turnTeam;

  return (
    <div className="bg-[#2D2A26] text-white p-4 sm:p-5 rounded-3xl border-2 border-white/10 shadow-2xl space-y-3.5 max-w-sm mx-auto">
      <TeamInputPhoneHeader activeTeam={activeTeam} streakCount={streakCount} onSwitchTeam={onSwitchTeam} />

      {isChoosingMode && grid ? (
        <PhoneMiniBoardPicker
          grid={grid}
          choosingTeam={turnTeam}
          isUserTeamTurn={isMyTeamTurnToChoose}
          onSelectTile={(tile) => onSelectTile?.(tile)}
        />
      ) : activeTile ? (
        <div className="space-y-3">
          <TeamPhoneAnswerForm
            activeTile={activeTile}
            activeTeam={activeTeam}
            typedInput={typedInput}
            onChangeInput={setTypedInput}
            onSubmit={handleSubmit}
          />
          {lastFeedback && <TeamInputFeedbackCard isCorrect={lastFeedback.isCorrect} text={lastFeedback.text} />}
        </div>
      ) : null}
    </div>
  );
};
