import React from 'react';
import { MousePointer, Zap, Clock, Check } from 'lucide-react';

interface HudTriggerSelectorProps {
  currentTrigger: string;
  onSelectTrigger: (trigger: string) => void;
}

export const HudTriggerSelector: React.FC<HudTriggerSelectorProps> = ({
  currentTrigger, onSelectTrigger,
}) => {
  const triggers = [
    { id: 'onClick', label: 'On Click', subtitle: 'Teacher tap/click', icon: MousePointer },
    { id: 'withPrevious', label: 'Together', subtitle: 'At same time', icon: Zap },
    { id: 'afterPrevious', label: 'In Succession', subtitle: 'Automatic flow', icon: Clock },
  ];

  return (
    <div className="space-y-1.5 select-none">
      <div className="flex items-center justify-between text-[10px] font-bold text-stone-500 uppercase tracking-wider">
        <span>Trigger Flow</span>
        <span className="text-[9px] text-stone-400 lowercase font-medium">timing mode</span>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {triggers.map((t) => {
          const Icon = t.icon;
          const isSelected = currentTrigger === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTrigger(t.id)}
              className={`py-1.5 px-1 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-0.5 ${
                isSelected
                  ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                  : 'bg-stone-50/80 border-stone-200 hover:border-stone-300 hover:bg-stone-100 text-stone-700'
              }`}
            >
              <div className="flex items-center gap-1">
                <Icon className={`w-3 h-3 ${isSelected ? 'text-stone-200' : 'text-stone-400'}`} />
                {isSelected && <Check className="w-2.5 h-2.5 text-stone-200" />}
              </div>
              <span className="text-[10px] font-bold leading-tight">{t.label}</span>
              <span className={`text-[8.5px] leading-none ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>{t.subtitle}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
