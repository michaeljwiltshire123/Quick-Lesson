import React, { useState } from 'react';
import { X, Eye } from 'lucide-react';
import { ImposterQuestion } from '../types/imposterTypes';
import { ProjectorImposterPreview } from './ProjectorImposterPreview';
import { StudentPhoneImposterPreview } from './StudentPhoneImposterPreview';
import { ImposterSimulatorControls } from './ImposterSimulatorControls';
import { ImposterPhaseFlowBar } from './ImposterPhaseFlowBar';
import { BoardPhase } from './ProjectorHeaderNav';
import { GAME_LOOP_TIMINGS, NEXT_PHASE_MAP } from './ImposterLoopConstants';
import { useImposterGameLoop } from './useImposterGameLoop';
import { ImposterVoiceConfig } from '../setup/ImposterVoiceSettingsCard';
import { AttackGameState } from './attacks/attackTypes';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  questions: ImposterQuestion[];
  roomCode?: string;
  voiceConfig?: ImposterVoiceConfig;
}

export const ImposterSimulatorModal: React.FC<Props> = ({
  isOpen, onClose, questions = [], roomCode = 'ABCD', voiceConfig,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [boardPhase, setBoardPhase] = useState<BoardPhase>('task');
  const [timer, setTimer] = useState(GAME_LOOP_TIMINGS.task);
  const [isRunning, setIsRunning] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [attackState, setAttackState] = useState<AttackGameState>({
    energyPoints: 200, sneakPeekClue: null, queuedQuestionSwap: null,
    queuedDecoy: null, isShadowVoteArmed: false,
  });

  const clearSingleUseAttacks = () => setAttackState((prev) => ({ ...prev, isShadowVoteArmed: false }));

  useImposterGameLoop({
    isRunning: isOpen && isRunning, isMuted, voiceConfig, boardPhase,
    questionsLength: questions.length, setTimer, setBoardPhase, setActiveIdx,
    onPhaseTransition: (from, to) => {
      if (from === 'voting' || to === 'task' || to === 'discussion') clearSingleUseAttacks();
    },
  });

  const handleManualPhaseSelect = (phase: BoardPhase) => {
    if (boardPhase === 'voting' || phase === 'task' || phase === 'discussion') clearSingleUseAttacks();
    setBoardPhase(phase);
    setTimer(GAME_LOOP_TIMINGS[phase]);
  };

  const handleFastForward = () => {
    const nextPhase = NEXT_PHASE_MAP[boardPhase];
    if (boardPhase === 'voting' || nextPhase === 'task' || nextPhase === 'discussion') clearSingleUseAttacks();
    setBoardPhase(nextPhase);
    if (boardPhase === 'elimination') {
      setActiveIdx((i) => (i + 1) % questions.length);
      setAttackState((prev) => ({ ...prev, energyPoints: prev.energyPoints + 40, isShadowVoteArmed: false }));
    }
    setTimer(GAME_LOOP_TIMINGS[nextPhase]);
  };

  if (!isOpen || questions.length === 0) return null;
  const currentQ = questions[activeIdx % questions.length];

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl max-w-5xl w-full p-5 text-white space-y-3.5 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-base uppercase tracking-wider text-white">Classroom Imposter &mdash; Live Preview</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <ImposterPhaseFlowBar currentPhase={boardPhase} onSelectPhase={handleManualPhaseSelect} />

        <ImposterSimulatorControls
          activeIdx={activeIdx} totalCount={questions.length} timer={timer} isRunning={isRunning}
          isMuted={isMuted || (voiceConfig && !voiceConfig.enabled)}
          onToggleMute={() => setIsMuted(!isMuted)}
          onPrev={() => { setActiveIdx((i) => Math.max(0, i - 1)); clearSingleUseAttacks(); }}
          onNext={() => { setActiveIdx((i) => Math.min(questions.length - 1, i + 1)); clearSingleUseAttacks(); }}
          onToggleTimer={() => setIsRunning(!isRunning)}
          onResetTimer={() => { setTimer(GAME_LOOP_TIMINGS.task); setBoardPhase('task'); setIsRunning(true); clearSingleUseAttacks(); }}
          onFastForwardPhase={handleFastForward}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-7">
            <ProjectorImposterPreview
              question={currentQ} currentIndex={activeIdx} totalQuestions={questions.length}
              roomCode={roomCode} timerSeconds={timer} boardPhase={boardPhase}
              onPhaseChange={handleManualPhaseSelect} isShadowVote={attackState.isShadowVoteArmed && boardPhase === 'voting'}
            />
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <StudentPhoneImposterPreview
              question={currentQ} boardPhase={boardPhase} attackState={attackState} timeRemaining={timer}
              onUpdateAttackState={setAttackState} onHalveTimer={() => setTimer((t) => Math.max(3, Math.floor(t / 2)))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
