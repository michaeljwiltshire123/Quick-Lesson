import React, { useState } from 'react';
import { ImposterQuestion, ImposterRole } from '../types/imposterTypes';
import { Smartphone, ShieldCheck, EyeOff, Zap } from 'lucide-react';
import { StudentPhoneRoleCard } from './StudentPhoneRoleCard';
import { StudentPhoneAnswerForm } from './StudentPhoneAnswerForm';
import { ImposterAttackDrawerMain } from './attacks/ImposterAttackDrawerMain';
import { StudentPhoneStageViews } from './StudentPhoneStageViews';
import { StudentPhoneImposterTaskView } from './StudentPhoneImposterTaskView';
import { BoardPhase } from './ProjectorHeaderNav';
import { AttackGameState } from './attacks/attackTypes';

interface Props {
  question: ImposterQuestion;
  boardPhase?: BoardPhase;
  attackState: AttackGameState;
  timeRemaining?: number;
  onUpdateAttackState: (updater: (prev: AttackGameState) => AttackGameState) => void;
  onHalveTimer: () => void;
}

export const StudentPhoneImposterPreview: React.FC<Props> = ({
  question, boardPhase = 'task', attackState, timeRemaining, onUpdateAttackState, onHalveTimer,
}) => {
  const [role, setRole] = useState<ImposterRole>('imposter');
  const [isAttackDrawerOpen, setIsAttackDrawerOpen] = useState(false);

  const activeInnocentPrompt = attackState.queuedQuestionSwap?.customPrompt ||
    (attackState.queuedDecoy?.targetPupilNames.includes('Oliver 🦉') ? attackState.queuedDecoy.decoyPrompt : question.prompt);

  return (
    <div className="w-[300px] mx-auto bg-slate-950 p-3 rounded-[36px] border-4 border-slate-700 shadow-2xl flex flex-col h-[490px] relative">
      <div className="flex items-center justify-between px-3 py-1 mb-2 text-white/50 text-[10px]">
        <span className="font-mono">09:41</span>
        <div className="w-12 h-2.5 bg-slate-800 rounded-full mx-auto" />
        <Smartphone className="w-3 h-3" />
      </div>

      <div className="flex bg-slate-900 p-0.5 rounded-xl border border-white/10 mb-2">
        <button type="button" onClick={() => setRole('innocent')} className={`flex-1 py-1 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer ${role === 'innocent' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>
          <ShieldCheck className="w-3 h-3" /> Honest Player
        </button>
        <button type="button" onClick={() => setRole('imposter')} className={`flex-1 py-1 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer ${role === 'imposter' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}>
          <EyeOff className="w-3 h-3" /> Imposter
        </button>
      </div>

      <div className="flex-1 bg-slate-900 border border-white/10 rounded-2xl p-3 flex flex-col justify-between overflow-y-auto">
        {role === 'innocent' ? (
          boardPhase === 'task' ? (
            <>
              <div className="space-y-2">
                <StudentPhoneRoleCard role="innocent" question={question} energyPoints={attackState.energyPoints} />
                <div className="p-2 bg-slate-800/90 rounded-xl">
                  <span className="text-[10px] font-bold text-white/50 block">PROMPT</span>
                  <p className="text-xs font-semibold text-white mt-0.5">{activeInnocentPrompt}</p>
                </div>
              </div>
              <div className="pt-2"><StudentPhoneAnswerForm role="innocent" onSubmit={() => {}} /></div>
            </>
          ) : (
            <StudentPhoneStageViews boardPhase={boardPhase} role="innocent" />
          )
        ) : (
          <>
            <div className="space-y-2 flex-1 overflow-y-auto">
              {boardPhase === 'task' ? (
                <StudentPhoneImposterTaskView
                  question={attackState.queuedQuestionSwap ? { ...question, topicClue: 'Swapped: ' + attackState.queuedQuestionSwap.customPrompt, imposterClue: 'You authored this custom question for innocent players.' } : question}
                  onBluffSubmitted={() => onUpdateAttackState((prev) => ({ ...prev, energyPoints: prev.energyPoints + 50 }))}
                />
              ) : (
                <StudentPhoneStageViews boardPhase={boardPhase} role="imposter" />
              )}
            </div>
            <div className="pt-2 mt-auto">
              <button type="button" onClick={() => setIsAttackDrawerOpen(true)} className="w-full py-1.5 px-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer">
                <Zap className="w-3 h-3 fill-current text-amber-300" />
                <span>Action Drawer ({attackState.energyPoints} pts)</span>
              </button>
            </div>
          </>
        )}
      </div>

      <ImposterAttackDrawerMain
        isOpen={isAttackDrawerOpen} onClose={() => setIsAttackDrawerOpen(false)}
        energyPoints={attackState.energyPoints} timeRemaining={timeRemaining}
        sneakPeekClue={attackState.sneakPeekClue} isShadowVoteArmed={attackState.isShadowVoteArmed}
        onArmQuestionSwap={(p) => onUpdateAttackState((prev) => ({ ...prev, energyPoints: Math.max(0, prev.energyPoints - 200), queuedQuestionSwap: { customPrompt: p, armedBy: 'Amelia 🦊' } }))}
        onTriggerTimedPanic={() => { onHalveTimer(); onUpdateAttackState((prev) => ({ ...prev, energyPoints: Math.max(0, prev.energyPoints - 150), sneakPeekClue: question.imposterClue || 'Key focus: Anaerobic respiration and lactic acid buildup' })); }}
        onSendDecoy={(p, c, t) => onUpdateAttackState((prev) => ({ ...prev, energyPoints: Math.max(0, prev.energyPoints - 100), queuedDecoy: { decoyPrompt: p, category: c, targetPupilNames: t } }))}
        onArmShadowVote={() => onUpdateAttackState((prev) => ({ ...prev, energyPoints: Math.max(0, prev.energyPoints - 50), isShadowVoteArmed: true }))}
      />
    </div>
  );
};
