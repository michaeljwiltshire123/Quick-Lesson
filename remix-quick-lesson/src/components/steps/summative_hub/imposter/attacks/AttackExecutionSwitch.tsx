import React, { useState } from 'react';
import { RefreshCw, TimerReset, EyeOff, Radio, Send, Check } from 'lucide-react';
import { ImposterAttackKey } from '../types/imposterTypes';
import { ATTACK_REGISTRY } from './imposterAttacks';

interface Props {
  attackKey: ImposterAttackKey;
  onExecuteAttack: (payload?: { customQuestion?: string }) => void;
  onCancel?: () => void;
}

export const AttackExecutionSwitch: React.FC<Props> = ({ attackKey, onExecuteAttack, onCancel }) => {
  const [customQuestion, setCustomQuestion] = useState('');
  const [isExecuted, setIsExecuted] = useState(false);
  const info = ATTACK_REGISTRY[attackKey];

  const handleConfirm = () => {
    setIsExecuted(true);
    onExecuteAttack({ customQuestion: customQuestion.trim() });
  };

  return (
    <div id="attack-execution-card" className="p-4 rounded-2xl bg-rose-950 text-white border border-rose-500/40 space-y-3 shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          {attackKey === 'question_swap' && <RefreshCw className="w-4 h-4 text-amber-400" />}
          {attackKey === 'timed_panic' && <TimerReset className="w-4 h-4 text-rose-400" />}
          {attackKey === 'vote_shadow' && <EyeOff className="w-4 h-4 text-purple-400" />}
          {attackKey === 'echo_prompt' && <Radio className="w-4 h-4 text-sky-400" />}
          <h4 className="text-xs font-black tracking-wide text-white">{info.title}</h4>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80">
          {info.tagline}
        </span>
      </div>

      <p className="text-xs text-white/80 leading-relaxed">{info.effectDescription}</p>

      {attackKey === 'question_swap' && (
        <div className="space-y-2 pt-1">
          <textarea
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Write a question about the topic for the other players..."
            rows={2}
            maxLength={140}
            className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-amber-400"
          />
        </div>
      )}

      {attackKey === 'timed_panic' && (
        <div className="p-2.5 rounded-xl bg-white/10 text-xs border border-white/10 space-y-1">
          <span className="text-[10px] text-amber-300 font-bold uppercase">Sneak Peek Clue</span>
          <p className="text-white text-xs font-medium">"Hint: Think about what was discussed in the lesson."</p>
        </div>
      )}

      {attackKey === 'echo_prompt' && (
        <div className="p-2.5 rounded-xl bg-white/10 text-xs border border-white/10">
          <span className="text-[10px] text-sky-300 font-bold uppercase">Selected Players</span>
          <p className="text-white text-xs font-medium">Sent to: <strong>Oliver</strong> and <strong>Ava</strong></p>
        </div>
      )}

      <div className="flex items-center justify-end gap-2 pt-1">
        {onCancel && !isExecuted && (
          <button type="button" onClick={onCancel} className="px-3 py-1.5 rounded-xl text-xs text-white/70 hover:text-white cursor-pointer">
            Cancel
          </button>
        )}
        <button
          type="button"
          disabled={isExecuted || (attackKey === 'question_swap' && !customQuestion.trim())}
          onClick={handleConfirm}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
        >
          {isExecuted ? <><Check className="w-3.5 h-3.5" /> Activated</> : <><Send className="w-3.5 h-3.5" /> Use Power</>}
        </button>
      </div>
    </div>
  );
};
