import React from 'react';
import { Zap, Shield, Clock, Flame } from 'lucide-react';
import { ImposterAttackKey } from '../types/imposterTypes';
import { ATTACK_REGISTRY, getRandomAttackKey } from './imposterAttacks';

interface Props {
  chargePercentage: number;
  onApplyBonus: (bonus: 'survival_bonus' | 'speedy_blend') => void;
  onSelectAttack: (key: ImposterAttackKey) => void;
  activeAttack?: ImposterAttackKey | null;
  disabled?: boolean;
}

export const AttackBarControls: React.FC<Props> = ({
  chargePercentage,
  onApplyBonus,
  onSelectAttack,
  activeAttack,
  disabled = false,
}) => {
  const safeCharge = Math.max(0, Math.min(100, Number.isFinite(chargePercentage) ? chargePercentage : 0));
  const isFull = safeCharge >= 100;

  const handleLaunchRandom = () => {
    const selected = getRandomAttackKey();
    onSelectAttack(selected);
  };

  return (
    <div id="imposter-attack-bar-controls" className="p-4 bg-white rounded-2xl border border-[#2D2A26]/15 space-y-3 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
            <Flame className="w-4 h-4" />
          </span>
          <div>
            <h4 className="text-xs font-black text-[#2D2A26]">Imposter Attack Energy</h4>
            <p className="text-[10px] text-[#2D2A26]/60">Fill energy gauge to 100% to unlock covert abilities</p>
          </div>
        </div>
        <span className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-full border ${
          isFull ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse' : 'bg-stone-100 text-stone-700 border-stone-200'
        }`}>
          {safeCharge}% CHARGE
        </span>
      </div>

      <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-stone-200">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isFull ? 'bg-linear-to-r from-amber-500 to-rose-600' : 'bg-amber-500'
          }`}
          style={{ width: `${safeCharge}%` }}
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap pt-1">
        <button
          type="button"
          disabled={disabled || isFull}
          onClick={() => onApplyBonus('survival_bonus')}
          className="flex-1 min-w-[120px] py-1.5 px-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-[11px] font-bold flex items-center justify-center gap-1 transition-all disabled:opacity-50"
        >
          <Shield className="w-3 h-3 text-emerald-600" />
          Survival Bonus (+50%)
        </button>

        <button
          type="button"
          disabled={disabled || isFull}
          onClick={() => onApplyBonus('speedy_blend')}
          className="flex-1 min-w-[120px] py-1.5 px-2.5 rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-900 text-[11px] font-bold flex items-center justify-center gap-1 transition-all disabled:opacity-50"
        >
          <Clock className="w-3 h-3 text-sky-600" />
          Speedy Blend (+50%)
        </button>
      </div>

      {isFull && (
        <div className="pt-2 border-t border-[#2D2A26]/10 flex items-center justify-between">
          <span className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Ability Armed
          </span>
          <button
            type="button"
            onClick={handleLaunchRandom}
            className="py-1.5 px-4 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-700 text-white shadow-xs flex items-center gap-1.5 transition-all active:scale-98"
          >
            {activeAttack ? `Deploy ${ATTACK_REGISTRY[activeAttack]?.title}` : 'Arm Random Covert Attack'}
          </button>
        </div>
      )}
    </div>
  );
};
