import React from 'react';
import { MousePointer, Zap, Clock } from 'lucide-react';

interface ShelfTriggerPillsProps {
  trigger: string;
  onSelectTrigger: (trigger: string) => void;
}

export const ShelfTriggerPills: React.FC<ShelfTriggerPillsProps> = ({
  trigger,
  onSelectTrigger,
}) => {
  const options = [
    { id: 'onClick', label: 'On Click', Icon: MousePointer },
    { id: 'withPrevious', label: 'Together', Icon: Zap },
    { id: 'afterPrevious', label: 'Succession', Icon: Clock },
  ] as const;

  return (
    <div className="flex items-center gap-1">
      <span className="text-[9px] font-extrabold text-amber-950 uppercase tracking-wider shrink-0 w-11">
        Trigger:
      </span>
      <div className="flex items-center gap-1 flex-1">
        {options.map(({ id, label, Icon }) => {
          const isActive = trigger === id;
          return (
            <button
              key={id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectTrigger(id);
              }}
              className={`flex-1 py-1 px-1.5 rounded-lg text-[9.5px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                isActive
                  ? 'bg-amber-800 text-white shadow-2xs scale-[1.02]'
                  : 'bg-white hover:bg-amber-100/70 text-stone-700 border border-amber-200'
              }`}
            >
              <Icon className="w-2.5 h-2.5 shrink-0" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
