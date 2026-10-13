import React from 'react';
import { MousePointer, Zap, Clock } from 'lucide-react';

interface GhostTriggerSegmentProps {
  trigger: string;
  onSelectTrigger: (trigger: string) => void;
}

export const GhostTriggerSegment: React.FC<GhostTriggerSegmentProps> = ({
  trigger, onSelectTrigger,
}) => {
  const triggers = [
    { id: 'onClick', label: 'On Click', icon: MousePointer },
    { id: 'withPrevious', label: 'Together', icon: Zap },
    { id: 'afterPrevious', label: 'Succession', icon: Clock },
  ];

  return (
    <div className="space-y-1">
      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Trigger</span>
      <div className="grid grid-cols-3 gap-1">
        {triggers.map((t) => {
          const Icon = t.icon;
          const active = trigger === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTrigger(t.id)}
              className={`py-1.5 px-1 rounded-xl text-[10px] font-bold flex flex-col items-center gap-0.5 border cursor-pointer transition-all ${
                active
                  ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                  : 'bg-stone-50/80 border-stone-200 hover:border-stone-300 hover:bg-stone-100 text-stone-600'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
