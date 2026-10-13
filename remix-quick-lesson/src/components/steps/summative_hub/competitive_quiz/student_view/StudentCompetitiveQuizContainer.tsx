import React, { useState } from 'react';
import { Shield, Flame, Smartphone } from 'lucide-react';
import { PlayerState, QuestionCard, PowerUpItem } from '../types/competitiveQuizTypes';
import { useGyroscopeSensor } from './useGyroscopeSensor';
import { FormatAnswerCard } from './FormatAnswerCard';
import { MysteryChestPickerCard } from './MysteryChestPickerCard';
import { PotStealInputCard } from './PotStealInputCard';

interface Props {
  player: PlayerState;
  activeQuestion: QuestionCard;
  secondsRemaining: number;
  isChestDropActive?: boolean;
  onLockInAnswer: (choiceIndex: number, wager?: number) => void;
  onSelectChest: (item: PowerUpItem) => void;
  onPotStealAttempt: () => void;
  onNotice?: (msg: string) => void;
}

export const StudentCompetitiveQuizContainer: React.FC<Props> = ({
  player,
  activeQuestion,
  secondsRemaining,
  isChestDropActive = false,
  onLockInAnswer,
  onSelectChest,
  onPotStealAttempt,
  onNotice,
}) => {
  const [isLockedIn, setIsLockedIn] = useState(false);
  const { isFlippedUpsideDown, simulateFlipToggle } = useGyroscopeSensor((flipped) => {
    if (flipped) onNotice?.('Phone inverted to attempt pot heist.');
  });

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {/* Top Pupil Status Bar */}
      <div className="bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between text-white text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-xs">
            {player.name.charAt(0)}
          </div>
          <div>
            <span className="font-bold block truncate max-w-[110px]">{player.name}</span>
            <span className="text-[10px] text-amber-400 font-mono font-black">{player.score} pts</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {player.shields > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-black flex items-center gap-1 border border-cyan-500/30">
              <Shield className="w-3 h-3" /> {player.shields}
            </span>
          )}
          {player.streak > 1 && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-black flex items-center gap-1 border border-amber-500/30">
              <Flame className="w-3 h-3" /> {player.streak}x
            </span>
          )}
          <button
            type="button"
            onClick={simulateFlipToggle}
            title="Turn Phone Upside Down (Pot Heist Mode)"
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
              isFlippedUpsideDown
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-gray-300 border-white/10'
            }`}
          >
            <Smartphone className={`w-3.5 h-3.5 transition-transform ${isFlippedUpsideDown ? 'rotate-180 text-slate-950' : ''}`} />
            <span>{isFlippedUpsideDown ? 'Inverted' : 'Flip Phone'}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Screen State */}
      {isFlippedUpsideDown ? (
        <PotStealInputCard
          activeQuestion={activeQuestion}
          onExecuteSteal={(choice) => {
            setIsLockedIn(true);
            onLockInAnswer(choice);
            onPotStealAttempt();
            simulateFlipToggle();
          }}
          onCancel={simulateFlipToggle}
        />
      ) : isChestDropActive ? (
        <MysteryChestPickerCard onSelectChest={onSelectChest} />
      ) : (
        <FormatAnswerCard
          card={activeQuestion}
          secondsRemaining={secondsRemaining}
          isLockedIn={isLockedIn}
          onLockInAnswer={(choice, wager) => {
            setIsLockedIn(true);
            onLockInAnswer(choice, wager);
          }}
        />
      )}
    </div>
  );
};
