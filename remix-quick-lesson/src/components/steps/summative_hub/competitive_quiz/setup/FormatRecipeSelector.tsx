import React from 'react';
import { Sparkles, Check, Flame, Award, Zap } from 'lucide-react';
import { QuestionFormat } from '../types/competitiveQuizTypes';

export const ALL_FORMAT_OPTIONS: Array<{ id: QuestionFormat; label: string; icon: string; desc: string }> = [
  { id: 'spot_the_lie', label: 'Spot The Lie', icon: '🚨', desc: 'Find the single false statement' },
  { id: 'order_steps', label: 'Order Steps', icon: '🔢', desc: 'Drag chronologically 1 to 4' },
  { id: 'speed_match', label: 'Speed Match', icon: '⚡', desc: 'Pair 3 definitions in 12s' },
  { id: 'target_tap', label: 'Target Tap', icon: '🎯', desc: 'Tap diagram hotspot location' },
  { id: 'odd_one_out', label: 'Odd One Out', icon: '🔍', desc: 'Spot the rule-breaking concept' },
  { id: 'binary_blitz', label: 'Binary Blitz', icon: '⚡', desc: 'Rapid True/False survival' },
  { id: 'reverse_instruction', label: 'Reverse Reflex', icon: '🔄', desc: 'DO NOT select the right answer!' },
  { id: 'score_swap', label: 'Score Swap Duel', icon: '⚔️', desc: 'Midway leaderboard score trade' },
  { id: 'avatar_race', label: 'Avatar Sprint', icon: '🏃', desc: 'Tap right shape to run ahead' },
  { id: 'wager_drop', label: 'Wager Drop', icon: '💰', desc: 'Bid points before the question' },
  { id: 'draw_showdown', label: 'Draw Showdown', icon: '🎨', desc: 'Sketch diagram peer voting' },
];

interface Props {
  selectedFormats: QuestionFormat[];
  onChangeFormats: (formats: QuestionFormat[]) => void;
}

export const FormatRecipeSelector: React.FC<Props> = ({ selectedFormats, onChangeFormats }) => {
  const applyPreset = (formats: QuestionFormat[]) => onChangeFormats(formats);

  const toggleFormat = (id: QuestionFormat) => {
    if (selectedFormats.includes(id)) {
      if (selectedFormats.length > 1) onChangeFormats(selectedFormats.filter((f) => f !== id));
    } else {
      onChangeFormats([...selectedFormats, id]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-[#2D2A26]/15 shadow-xs space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h4 className="font-black uppercase tracking-wider text-[#2D2A26]">
            Question Type Mix & Recipes ({selectedFormats.length} Active Formats)
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={() => applyPreset(ALL_FORMAT_OPTIONS.map((o) => o.id))} className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold hover:bg-amber-200 cursor-pointer flex items-center gap-1">
            <Award className="w-3 h-3" /> Guaranteed 1 of Each
          </button>
          <button type="button" onClick={() => applyPreset(['reverse_instruction', 'score_swap', 'avatar_race', 'spot_the_lie', 'wager_drop'])} className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-900 font-bold hover:bg-rose-200 cursor-pointer flex items-center gap-1">
            <Flame className="w-3 h-3" /> Max Chaos
          </button>
          <button type="button" onClick={() => applyPreset(['speed_match', 'binary_blitz', 'wager_drop', 'target_tap'])} className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-900 font-bold hover:bg-blue-200 cursor-pointer flex items-center gap-1">
            <Zap className="w-3 h-3" /> Fast Blitz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {ALL_FORMAT_OPTIONS.map((item) => {
          const isSelected = selectedFormats.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleFormat(item.id)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2 ${
                isSelected
                  ? 'bg-amber-50/90 border-amber-400 text-slate-900 shadow-xs ring-1 ring-amber-300'
                  : 'bg-gray-50/70 border-gray-200 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <div className="min-w-0">
                <div className="font-bold flex items-center justify-between gap-1">
                  <span className="truncate">{item.label}</span>
                  {isSelected && <Check className="w-3 h-3 text-amber-600 shrink-0" />}
                </div>
                <p className="text-[10px] text-gray-500 truncate leading-tight mt-0.5">{item.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
