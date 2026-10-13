import { useEffect } from 'react';
import { BoardPhase } from './ProjectorHeaderNav';
import { GAME_LOOP_TIMINGS, NEXT_PHASE_MAP } from './ImposterLoopConstants';
import { playImposterSound } from './imposterSoundEffects';
import { speakPresenterNarration, cancelPresenterNarration, PRESENTER_PHASE_SCRIPTS } from './imposterPresenterVoice';
import { ImposterVoiceConfig } from '../setup/ImposterVoiceSettingsCard';

interface UseImposterGameLoopProps {
  isRunning: boolean;
  isMuted?: boolean;
  voiceConfig?: ImposterVoiceConfig;
  boardPhase: BoardPhase;
  questionsLength: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  setBoardPhase: (phase: BoardPhase) => void;
  setActiveIdx: React.Dispatch<React.SetStateAction<number>>;
  onPhaseTransition?: (from: BoardPhase, to: BoardPhase) => void;
}

export function useImposterGameLoop({
  isRunning, isMuted = false, voiceConfig, boardPhase, questionsLength,
  setTimer, setBoardPhase, setActiveIdx, onPhaseTransition,
}: UseImposterGameLoopProps) {
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          const nextPhase = NEXT_PHASE_MAP[boardPhase];
          onPhaseTransition?.(boardPhase, nextPhase);
          setBoardPhase(nextPhase);
          if (boardPhase === 'elimination' && questionsLength > 0) {
            setActiveIdx((i) => (i + 1) % questionsLength);
          }
          return GAME_LOOP_TIMINGS[nextPhase];
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, boardPhase, questionsLength, setTimer, setBoardPhase, setActiveIdx, onPhaseTransition]);

  const voiceEnabled = voiceConfig?.enabled ?? true;
  const voiceURI = voiceConfig?.voiceURI;
  const voiceSpeed = voiceConfig?.speed ?? 1.0;

  useEffect(() => {
    if (!isRunning) return;

    if (boardPhase === 'task') playImposterSound('alarm');
    else if (boardPhase === 'discussion') playImposterSound('phase_change');
    else if (boardPhase === 'voting') playImposterSound('voting');
    else if (boardPhase === 'elimination') playImposterSound('reveal');

    const shouldMute = isMuted || !voiceEnabled;

    const speechTimeout = setTimeout(() => {
      const script = PRESENTER_PHASE_SCRIPTS[boardPhase];
      if (script) speakPresenterNarration(script, shouldMute, voiceURI, voiceSpeed);
    }, 1000);

    return () => {
      clearTimeout(speechTimeout);
      cancelPresenterNarration();
    };
  }, [boardPhase, isRunning, isMuted, voiceEnabled, voiceURI, voiceSpeed]);
}
