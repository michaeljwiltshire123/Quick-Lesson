import React, { useState } from 'react';
import { X, ArrowLeftRight, Clock, MessageSquareText, EyeOff } from 'lucide-react';
import { ImposterEnergyBar } from './ImposterEnergyBar';
import { QuestionSwapWriterView } from './QuestionSwapWriterView';
import { EchoPromptWriterView } from './EchoPromptWriterView';
import { TimedPanicConfirmView } from './TimedPanicConfirmView';
import { ShadowVoteConfirmView } from './ShadowVoteConfirmView';
import { ImposterAttackOption } from './attackTypes';

export const ATTACKS_CONFIG: ImposterAttackOption[] = [
  { id: 'question_swap', name: 'Question Swap', cost: 200, desc: 'Rewrite prompt for all others next round', icon: ArrowLeftRight },
  { id: 'timed_panic', name: 'Timed Panic', cost: 150, desc: 'Halve round timer & gain secret clue', icon: Clock },
  { id: 'echo_prompt', name: 'Echo Prompt', cost: 100, desc: 'Send decoy question to 1-2 players', icon: MessageSquareText },
  { id: 'shadow_vote', name: 'Shadow Vote', cost: 50, desc: 'Conceal ballot counts on front board', icon: EyeOff },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  energyPoints: number;
  timeRemaining?: number;
  sneakPeekClue: string | null;
  isShadowVoteArmed: boolean;
  onArmQuestionSwap: (prompt: string) => void;
  onTriggerTimedPanic: () => void;
  onSendDecoy: (prompt: string, category: string, targets: string[]) => void;
  onArmShadowVote: () => void;
}

export const ImposterAttackDrawerMain: React.FC<Props> = ({
  isOpen, onClose, energyPoints, timeRemaining, sneakPeekClue, isShadowVoteArmed,
  onArmQuestionSwap, onTriggerTimedPanic, onSendDecoy, onArmShadowVote,
}) => {
  const [selectedAttackId, setSelectedAttackId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-x-1.5 bottom-1.5 top-12 bg-slate-950/98 border-2 border-rose-500/80 rounded-3xl p-3 z-30 shadow-2xl backdrop-blur-md flex flex-col justify-between text-white overflow-hidden animate-in slide-in-from-bottom duration-200">
      <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-1 flex-shrink-0" />
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 flex-shrink-0">
        <ImposterEnergyBar energyPoints={energyPoints} timeRemaining={timeRemaining} />
        <button type="button" onClick={() => { setSelectedAttackId(null); onClose(); }} className="text-gray-400 hover:text-white p-1 cursor-pointer">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 flex flex-col justify-between">
        {selectedAttackId === 'question_swap' && (
          <QuestionSwapWriterView energyPoints={energyPoints} cost={200} onArmQuestionSwap={(p) => { onArmQuestionSwap(p); setSelectedAttackId(null); onClose(); }} onBack={() => setSelectedAttackId(null)} />
        )}
        {selectedAttackId === 'timed_panic' && (
          <TimedPanicConfirmView energyPoints={energyPoints} cost={150} sneakPeekClue={sneakPeekClue} onTriggerTimedPanic={() => { onTriggerTimedPanic(); setSelectedAttackId(null); }} onBack={() => setSelectedAttackId(null)} />
        )}
        {selectedAttackId === 'echo_prompt' && (
          <EchoPromptWriterView energyPoints={energyPoints} cost={100} onSendDecoy={(p, c, t) => { onSendDecoy(p, c, t); setSelectedAttackId(null); onClose(); }} onBack={() => setSelectedAttackId(null)} />
        )}
        {selectedAttackId === 'shadow_vote' && (
          <ShadowVoteConfirmView energyPoints={energyPoints} cost={50} isArmed={isShadowVoteArmed} onArmShadowVote={() => { onArmShadowVote(); setSelectedAttackId(null); onClose(); }} onBack={() => setSelectedAttackId(null)} />
        )}

        {!selectedAttackId && (
          <div className="grid grid-cols-2 gap-2 my-auto">
            {ATTACKS_CONFIG.map((atk) => {
              const Icon = atk.icon;
              const canAfford = energyPoints >= atk.cost;
              return (
                <button key={atk.id} type="button" disabled={!canAfford} onClick={() => setSelectedAttackId(atk.id)} className="p-2.5 rounded-2xl bg-slate-900 border border-white/10 hover:border-rose-400 disabled:opacity-40 text-left transition-all cursor-pointer flex flex-col justify-between h-[82px] shadow-sm">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-[11px] font-bold truncate">{atk.name}</span>
                    </div>
                    <span className="text-[9px] font-mono font-black text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/20">{atk.cost}pt</span>
                  </div>
                  <p className="text-[10px] text-white/60 leading-tight line-clamp-2">{atk.desc}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
