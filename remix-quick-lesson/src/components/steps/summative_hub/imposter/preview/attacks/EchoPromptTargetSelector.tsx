import React from 'react';
import { Users, Send, Check } from 'lucide-react';

interface Props {
  activePupils: string[];
  selectedTargets: string[];
  onToggleTarget: (name: string) => void;
  onConfirmSend: () => void;
  canSend: boolean;
  cost: number;
}

export const EchoPromptTargetSelector: React.FC<Props> = ({
  activePupils,
  selectedTargets,
  onToggleTarget,
  onConfirmSend,
  canSend,
  cost,
}) => {
  return (
    <div className="space-y-2.5 text-white">
      <div className="flex items-center justify-between text-[11px] border-b border-white/10 pb-1">
        <span className="font-bold text-amber-300 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" /> Step 2: Select 1 or 2 Victims
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30">
          {selectedTargets.length} / 2 Chosen
        </span>
      </div>

      <p className="text-[10px] text-white/70">
        Choose who receives your decoy question instead of the regular question next round:
      </p>

      <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
        {activePupils.map((pupil) => {
          const isSelected = selectedTargets.includes(pupil);
          const selectionIndex = selectedTargets.indexOf(pupil);
          return (
            <button
              key={pupil}
              type="button"
              onClick={() => onToggleTarget(pupil)}
              className={`p-2 rounded-xl text-[11px] font-bold border transition-all text-left flex items-center justify-between cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/20 text-white border-amber-400 ring-1 ring-amber-400/50 shadow-md'
                  : 'bg-slate-900 text-white/80 border-white/10 hover:border-white/30'
              }`}
            >
              <span className="truncate">{pupil}</span>
              {isSelected ? (
                <span className="text-[9px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-md font-black flex items-center gap-0.5">
                  <Check className="w-2.5 h-2.5" /> #{selectionIndex + 1}
                </span>
              ) : (
                <span className="text-[10px] text-white/40">+</span>
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!canSend}
        onClick={onConfirmSend}
        className="w-full py-2 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all mt-1"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Deploy Decoy to {selectedTargets.length} Player{selectedTargets.length === 1 ? '' : 's'} (-{cost} pts)</span>
      </button>
    </div>
  );
};
