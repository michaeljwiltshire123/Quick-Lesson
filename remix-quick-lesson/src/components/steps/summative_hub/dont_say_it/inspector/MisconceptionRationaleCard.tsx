import React from 'react';
import { SecretWordCard } from '../types/dontSayItTypes';
import { Layers, HelpCircle, Lock, Lightbulb } from 'lucide-react';

interface Props {
  card: SecretWordCard;
  index: number;
}

export const MisconceptionRationaleCard: React.FC<Props> = ({ card, index }) => {
  const banned = card.activeBannedWords?.length ? card.activeBannedWords : card.studentBannedWords || [];

  return (
    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-lg bg-amber-100 text-amber-900 font-mono font-black text-[10px] flex items-center justify-center">
            {index + 1}
          </span>
          <h4 className="font-black text-slate-900 text-sm">{card.targetWord}</h4>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold border border-purple-200">
            {card.bloomsLevel || 'Understand'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-200 uppercase">
            {card.difficulty || 'Core'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
        <Layers className="w-3.5 h-3.5 text-purple-600 shrink-0" />
        <span>Lesson Topic: <strong>{card.chunkTitle || `Section ${(card.chunkIndex ?? 0) + 1}`}</strong></span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-rose-700">
          <Lock className="w-3 h-3 text-rose-600" />
          <span>Forbidden Taboo Words:</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {banned.map((b, i) => (
            <span key={i} className="px-2 py-0.5 bg-rose-100/80 text-rose-900 rounded-md font-bold text-[10px] border border-rose-300">
              🚫 {b}
            </span>
          ))}
        </div>
      </div>

      <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-950 flex items-start gap-1.5">
        <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-[10px] uppercase text-amber-900">Targeted Pupil Misconception & Rationale:</span>
          <span>{card.misconceptionRationale || 'Forbidden terms prevent pupils from using vague shortcuts, forcing explicit articulation of core principles.'}</span>
        </div>
      </div>
    </div>
  );
};
