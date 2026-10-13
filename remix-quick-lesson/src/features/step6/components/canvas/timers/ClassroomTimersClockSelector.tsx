import React from 'react';
import { ClockFormat, DigitalStyle, AnalogueStyle } from '../../../types/timerTypes';

interface ClassroomTimersClockSelectorProps {
  format: ClockFormat;
  digitalStyle: DigitalStyle;
  analogueStyle: AnalogueStyle;
  onFormatChange: (f: ClockFormat) => void;
  onDigitalStyleChange: (s: DigitalStyle) => void;
  onAnalogueStyleChange: (s: AnalogueStyle) => void;
}

const DIGITAL_STYLES: { id: DigitalStyle; name: string; desc: string }[] = [
  { id: 'radial', name: 'Radial Ring', desc: 'Circular progress dial' },
  { id: 'horizon', name: 'Horizon Bar', desc: 'Progress bar sweep' },
  { id: 'neon', name: 'Neon Glow', desc: 'Pulsing digital font' },
  { id: 'flip', name: 'Retro Flip', desc: 'Split-flap clock cards' },
];

const ANALOGUE_STYLES: { id: AnalogueStyle; name: string; desc: string }[] = [
  { id: 'wall', name: 'Wall Clock', desc: 'Classic British classroom face' },
  { id: 'iris', name: 'Iris Sweeper', desc: 'Conic pie-slice sweep' },
  { id: 'stopwatch', name: 'Stopwatch', desc: 'Vintage dual-hand gauge' },
  { id: 'hourglass', name: 'Hourglass', desc: 'Trickling sand animation' },
];

export const ClassroomTimersClockSelector: React.FC<ClassroomTimersClockSelectorProps> = ({
  format, digitalStyle, analogueStyle, onFormatChange, onDigitalStyleChange, onAnalogueStyleChange,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-stone-700">Clock Style Format</label>
        <div className="flex bg-stone-100 p-0.5 rounded-lg border border-stone-200">
          <button
            type="button" onClick={() => onFormatChange('digital')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
              format === 'digital' ? 'bg-white text-amber-900 shadow-2xs' : 'text-stone-600'
            }`}
          >
            Digital (4)
          </button>
          <button
            type="button" onClick={() => onFormatChange('analogue')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
              format === 'analogue' ? 'bg-white text-amber-900 shadow-2xs' : 'text-stone-600'
            }`}
          >
            Analogue (4)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {format === 'digital'
          ? DIGITAL_STYLES.map((st) => (
              <button
                key={st.id} type="button" onClick={() => onDigitalStyleChange(st.id)}
                className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                  digitalStyle === st.id ? 'bg-amber-100/70 border-amber-500 shadow-2xs' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="font-bold text-xs text-stone-900">{st.name}</div>
                <div className="text-[9.5px] text-stone-500">{st.desc}</div>
              </button>
            ))
          : ANALOGUE_STYLES.map((st) => (
              <button
                key={st.id} type="button" onClick={() => onAnalogueStyleChange(st.id)}
                className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                  analogueStyle === st.id ? 'bg-amber-100/70 border-amber-500 shadow-2xs' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="font-bold text-xs text-stone-900">{st.name}</div>
                <div className="text-[9.5px] text-stone-500">{st.desc}</div>
              </button>
            ))}
      </div>
    </div>
  );
};
