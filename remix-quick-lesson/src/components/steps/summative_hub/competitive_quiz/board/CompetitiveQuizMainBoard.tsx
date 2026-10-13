import React from 'react';
import { Timer, Zap } from 'lucide-react';
import { QuestionCard, TTSVoicePreset, DecoyViolation } from '../types/competitiveQuizTypes';
import { SecretPatternRenderer, BackgroundPatternId } from './SecretPatternRenderer';
import { AccumulatorPotBanner } from './AccumulatorPotBanner';
import { TtsPresenterBanner } from './TtsPresenterBanner';
import { DecoyViolationBanner } from './DecoyViolationBanner';
import { LightningChestOverlay } from './LightningChestOverlay';

interface Props {
  roomCode: string;
  roundNumber: number;
  totalRounds: number;
  activeQuestion: QuestionCard;
  secondsRemaining: number;
  patternId?: BackgroundPatternId;
  voicePreset: TTSVoicePreset;
  activeViolation?: DecoyViolation | null;
  isChestDropActive?: boolean;
  onDismissViolation?: () => void;
  onDismissChestDrop?: () => void;
}

export const CompetitiveQuizMainBoard: React.FC<Props> = ({
  roomCode,
  roundNumber,
  totalRounds,
  activeQuestion,
  secondsRemaining,
  patternId,
  voicePreset,
  activeViolation = null,
  isChestDropActive = false,
  onDismissViolation,
  onDismissChestDrop,
}) => {
  const currentPattern = (activeQuestion.patternId || patternId || 'true_gold_honeycomb') as BackgroundPatternId;
  const currentAccumulatedPot = activeQuestion.accumulatedPot || 250 + (roundNumber * 200);
  const timerPercent = Math.max(0, Math.min(100, (secondsRemaining / (activeQuestion.speedLimitSeconds || 10)) * 100));

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl p-5 border-2 border-white/10 shadow-2xl space-y-4 min-h-[480px] flex flex-col justify-between">
      <SecretPatternRenderer patternId={currentPattern} />
      <LightningChestOverlay isOpen={isChestDropActive} onDismiss={onDismissChestDrop} />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-mono font-black text-xs border border-amber-400/30">
            ROOM: {roomCode}
          </span>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Round {roundNumber} of {totalRounds}
          </span>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black border ${secondsRemaining <= 3 ? 'bg-rose-600/30 border-rose-500 text-rose-300 animate-pulse' : 'bg-white/10 border-white/10 text-white'}`}>
          <Timer className="w-3.5 h-3.5" />
          <span>{secondsRemaining}s</span>
        </div>
      </div>

      {/* Prominent Accumulator Pot Banner */}
      <AccumulatorPotBanner potValue={activeQuestion.potValue} accumulatedPot={currentAccumulatedPot} patternId={currentPattern} />

      {/* Timer Bar */}
      <div className="relative z-10 w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-300 ${secondsRemaining <= 3 ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-500 to-yellow-400'}`} style={{ width: `${timerPercent}%` }} />
      </div>

      <div className="relative z-10"><DecoyViolationBanner violation={activeViolation} onDismiss={onDismissViolation} /></div>

      {/* Question Prompt */}
      <div className="relative z-10 space-y-2.5 my-auto">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider">
          <Zap className="w-3 h-3 fill-slate-950" />
          <span>{activeQuestion.formatLabel}</span>
        </div>
        <h2 className="text-xl md:text-2xl font-black text-white leading-snug">{activeQuestion.prompt}</h2>
      </div>

      <div className="relative z-10 pt-1"><TtsPresenterBanner promptText={activeQuestion.prompt} preset={voicePreset} /></div>
    </div>
  );
};
