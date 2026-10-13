import React from 'react';
import { Check, MousePointer, Zap, Clock } from 'lucide-react';

interface GoogleSheetsTriggerItemsProps {
  trigger: string;
  onSelectTrigger: (trigger: string) => void;
}

export const GoogleSheetsTriggerItems: React.FC<GoogleSheetsTriggerItemsProps> = ({
  trigger,
  onSelectTrigger,
}) => {
  const triggerOptions = [
    { id: 'onClick', label: 'On Click', Icon: MousePointer },
    { id: 'withPrevious', label: 'With Previous', Icon: Zap },
    { id: 'afterPrevious', label: 'After Previous', Icon: Clock },
  ] as const;

  return (
    <div className="py-0.5 space-y-0.5">
      {triggerOptions.map(({ id, label, Icon }) => {
        const isSelected = trigger === id;
        return (
          <button
            key={id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectTrigger(id);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs text-left cursor-pointer transition-colors rounded-sm ${
              isSelected
                ? 'bg-amber-50 text-amber-950 font-semibold'
                : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900 font-normal'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-700' : 'text-stone-400'}`} />
              <span className="truncate">{label}</span>
            </div>
            {isSelected && <Check className="w-3.5 h-3.5 text-amber-700 stroke-[2.5] shrink-0" />}
          </button>
        );
      })}
    </div>
  );
};
