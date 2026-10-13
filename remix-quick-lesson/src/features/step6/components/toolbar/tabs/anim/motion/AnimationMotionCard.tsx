import React from 'react';
import { SlideAnimationRule } from '../../../../../types/animationTypes';
import { ENTRANCE_EFFECT_OPTIONS, EMPHASIS_EFFECT_OPTIONS, EXIT_EFFECT_OPTIONS } from './motionEffectOptions';
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';

interface AnimationMotionCardProps {
  rule: SlideAnimationRule;
  index: number;
  total: number;
  onUpdate: (ruleId: string, patch: { effectId?: string; trigger?: any; duration?: number }) => void;
  onDelete: (ruleId: string) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export const AnimationMotionCard: React.FC<AnimationMotionCardProps> = ({
  rule, index, total, onUpdate, onDelete, onMoveUp, onMoveDown,
}) => {
  const isEntrance = rule.ruleType === 'entrance';
  const isEmphasis = rule.ruleType === 'emphasis';
  const tagColor = isEntrance
    ? 'bg-blue-100 text-blue-900 border-blue-200'
    : isEmphasis
    ? 'bg-purple-100 text-purple-900 border-purple-200'
    : 'bg-rose-100 text-rose-900 border-rose-200';

  return (
    <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2 text-xs text-stone-800 transition-all hover:border-amber-400">
      <div className="flex items-center justify-between gap-1 pb-1 border-b border-stone-100">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-4 h-4 rounded-full bg-amber-800 text-white font-black text-[9px] flex items-center justify-center shrink-0">{index + 1}</span>
          <span className="font-extrabold text-[11px] text-stone-900 truncate" title={rule.elementLabel}>{rule.elementLabel || 'Slide element'}</span>
          <span className={`px-1.5 py-0.2 rounded-md border text-[8.5px] font-black uppercase tracking-wider shrink-0 ${tagColor}`}>{isEntrance ? 'Entry' : isEmphasis ? 'Anim' : 'Exit'}</span>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {onMoveUp && <button type="button" disabled={index === 0} onClick={onMoveUp} className="p-1 hover:bg-stone-100 disabled:opacity-20 rounded text-stone-600 cursor-pointer" title="Move Up"><ChevronUp className="w-3.5 h-3.5" /></button>}
          {onMoveDown && <button type="button" disabled={index === total - 1} onClick={onMoveDown} className="p-1 hover:bg-stone-100 disabled:opacity-20 rounded text-stone-600 cursor-pointer" title="Move Down"><ChevronDown className="w-3.5 h-3.5" /></button>}
          <button type="button" onClick={() => onDelete(rule.id)} className="p-1 hover:bg-rose-100 rounded text-stone-400 hover:text-rose-700 cursor-pointer transition-colors" title="Remove animation"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-stone-500 block">Effect</label>
          <select value={rule.effectId} onChange={(e) => onUpdate(rule.id, { effectId: e.target.value })} className="w-full bg-stone-50 border border-stone-300 rounded-xl px-2 py-1 text-[11px] font-bold text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500 cursor-pointer">
            <optgroup label="Entrance">{ENTRANCE_EFFECT_OPTIONS.map((o) => (<option key={o.id} value={o.id}>{o.label}</option>))}</optgroup>
            <optgroup label="Emphasis">{EMPHASIS_EFFECT_OPTIONS.map((o) => (<option key={o.id} value={o.id}>{o.label}</option>))}</optgroup>
            <optgroup label="Exit">{EXIT_EFFECT_OPTIONS.map((o) => (<option key={o.id} value={o.id}>{o.label}</option>))}</optgroup>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-semibold text-stone-500 block">Trigger</label>
          <select value={rule.trigger} onChange={(e) => onUpdate(rule.id, { trigger: e.target.value as any })} className="w-full bg-stone-50 border border-stone-300 rounded-xl px-2 py-1 text-[11px] font-bold text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500 cursor-pointer">
            <option value="onClick">On click</option>
            <option value="withPrevious">With previous</option>
            <option value="afterPrevious">After previous</option>
          </select>
        </div>
      </div>

      <div className="space-y-0.5 pt-1">
        <div className="flex items-center justify-between text-[9.5px] font-semibold text-stone-500">
          <span>Speed</span>
          <span className="font-mono text-stone-800">{(rule.duration ?? 0.8).toFixed(1)}s</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[8.5px] text-stone-400 font-bold">Fast</span>
          <input type="range" min="0.3" max="2.5" step="0.1" value={rule.duration ?? 0.8} onChange={(e) => onUpdate(rule.id, { duration: parseFloat(e.target.value) })} className="w-full accent-amber-600 cursor-pointer h-1 bg-stone-200 rounded-lg" />
          <span className="text-[8.5px] text-stone-400 font-bold">Slow</span>
        </div>
      </div>
    </div>
  );
};
