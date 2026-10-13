import React from 'react';
import { MousePointer, Zap, Clock } from 'lucide-react';

interface TimingTriggerSegmentProps {
  trigger: string;
  onSelectTrigger: (trigger: string) => void;
}

export const TimingTriggerSegment: React.FC<TimingTriggerSegmentProps> = ({
  trigger,
  onSelectTrigger,
}) => {
  const options = [
    {
      id: 'onClick',
      label: 'On Click',
      Icon: MousePointer,
      description: 'Waits for presenter click to reveal at your chosen moment.',
    },
    {
      id: 'withPrevious',
      label: 'Together',
      Icon: Zap,
      description: 'Enters simultaneously with the slide or previous item.',
    },
    {
      id: 'afterPrevious',
      label: 'Succession',
      Icon: Clock,
      description: 'Plays automatically right after the previous item completes.',
    },
  ] as const;

  const currentOption = options.find((o) => o.id === trigger) || options[0];

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black uppercase tracking-wider text-stone-700">
          Start Trigger
        </label>
        <span className="text-[9.5px] font-semibold text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
          {currentOption.label}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200/70">
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
              className={`py-1.5 px-1 rounded-lg text-[10px] font-bold flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all ${
                isActive
                  ? 'bg-white text-stone-900 shadow-xs ring-1 ring-stone-900/10'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/50'
              }`}
            >
              <Icon className={`w-3 h-3 ${isActive ? 'text-amber-700' : 'text-stone-400'}`} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <p className="text-[9.5px] text-stone-500 leading-snug px-0.5">
        {currentOption.description}
      </p>
    </div>
  );
};
