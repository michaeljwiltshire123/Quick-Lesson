import React from 'react';
import { BulkTimingMode } from './types';
import { Layers, Clock, MousePointer, X } from 'lucide-react';

interface AnimationTimingModalProps {
  isOpen: boolean;
  selectedCount: number;
  effectName: string;
  onConfirm: (mode: BulkTimingMode) => void;
  onCancel: () => void;
}

export const AnimationTimingModal: React.FC<AnimationTimingModalProps> = ({
  isOpen, selectedCount, effectName, onConfirm, onCancel,
}) => {
  if (!isOpen) return null;

  const choices: { id: BulkTimingMode; title: string; subtitle: string; icon: any }[] = [
    {
      id: 'together',
      title: 'At the same time',
      subtitle: 'All selected elements animate simultaneously as a unified group.',
      icon: Layers,
    },
    {
      id: 'successive',
      title: 'In succession automatically',
      subtitle: 'Elements play one after another automatically with smooth pacing.',
      icon: Clock,
    },
    {
      id: 'onClick',
      title: 'In succession on click',
      subtitle: 'Advance each element step-by-step with each teacher click or tap.',
      icon: MousePointer,
    },
  ];

  return (
    <div className="fixed inset-0 z-60 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in select-none">
      <div className="bg-[#FAF9F5] border border-stone-300 rounded-3xl max-w-lg w-full p-5 shadow-2xl space-y-4 text-stone-900">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-black text-amber-950">Sequence Arrangement</h3>
            <p className="text-xs text-stone-600 mt-0.5">
              You have <strong>{selectedCount} elements</strong> selected. How would you like <strong>{effectName}</strong> to happen?
            </p>
          </div>
          <button type="button" onClick={onCancel} className="p-1.5 hover:bg-stone-200 rounded-xl cursor-pointer text-stone-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {choices.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onConfirm(c.id)}
                className="p-3.5 rounded-2xl border border-stone-300 bg-white hover:border-amber-500 hover:bg-amber-50/70 text-left transition-all flex items-start gap-3 cursor-pointer group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 group-hover:bg-amber-800 group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-extrabold text-xs text-stone-900 group-hover:text-amber-950">
                    {c.title}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    {c.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-1.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
