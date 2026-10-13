import React from 'react';
import { EyeOff, Activity, Wind, RotateCw } from 'lucide-react';
import { ElementStudioTypewriterVector } from './ElementStudioTypewriterVector';

interface ElementStudioAdvancedControlsProps {
  isText: boolean;
  dimPrevious: boolean;
  onDimPreviousChange: (val: boolean) => void;
  animEasing: string;
  onAnimEasingChange: (val: string) => void;
  typewriterSpeed: string;
  onTypewriterSpeedChange: (val: string) => void;
  motionPath: string;
  onMotionPathChange: (val: string) => void;
  ambientLoop: string;
  onAmbientLoopChange: (val: string) => void;
  repeatTimes: number;
  onRepeatTimesChange: (val: number) => void;
}

export const ElementStudioAdvancedControls: React.FC<ElementStudioAdvancedControlsProps> = (props) => {
  const {
    isText, dimPrevious, onDimPreviousChange, animEasing, onAnimEasingChange,
    typewriterSpeed, onTypewriterSpeedChange, motionPath, onMotionPathChange,
    ambientLoop, onAmbientLoopChange, repeatTimes, onRepeatTimesChange,
  } = props;

  return (
    <div className="space-y-2.5 p-2.5 bg-amber-50/70 border border-amber-200/90 rounded-2xl text-[11px] text-stone-700">
      <div className="flex items-center justify-between font-bold text-stone-800 text-xs">
        <span className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-amber-700" />
          <span>Dynamics & Looping</span>
        </span>
        <label className="flex items-center gap-1.5 cursor-pointer text-[10.5px] font-bold text-stone-700">
          <EyeOff className="w-3 h-3 text-amber-800" />
          <span>Dim Prior Steps</span>
          <input
            type="checkbox" checked={dimPrevious} onChange={(e) => onDimPreviousChange(e.target.checked)}
            className="rounded accent-amber-800 cursor-pointer"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="font-bold text-stone-700 block mb-0.5">Easing Curve</label>
          <select
            value={animEasing} onChange={(e) => onAnimEasingChange(e.target.value)}
            className="w-full bg-white border border-stone-300 rounded-lg p-1 text-[10.5px] font-semibold"
          >
            <option value="ease-out">Gentle Ease-Out</option>
            <option value="snappy">Snappy Elastic</option>
            <option value="linear">Smooth Linear</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-stone-700 flex items-center gap-1 mb-0.5">
            <Wind className="w-3 h-3 text-amber-700" /> Ambient Idle
          </label>
          <select
            value={ambientLoop} onChange={(e) => onAmbientLoopChange(e.target.value)}
            className="w-full bg-white border border-stone-300 rounded-lg p-1 text-[10.5px] font-semibold"
          >
            <option value="none">None (Static)</option>
            <option value="soft_pulse">Breathing Pulse</option>
            <option value="gentle_float">Gentle Float</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-amber-200/80">
        <label className="font-bold text-stone-700 flex items-center gap-1">
          <RotateCw className="w-3 h-3 text-amber-700" /> Replay Loops:
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 5].map((cnt) => (
            <button
              key={cnt} type="button" onClick={() => onRepeatTimesChange(cnt)}
              className={`px-2 py-0.5 rounded border text-[10px] font-bold cursor-pointer ${
                repeatTimes === cnt ? 'bg-amber-800 text-white border-amber-900' : 'bg-white border-stone-300 text-stone-700'
              }`}
            >
              {cnt}×
            </button>
          ))}
        </div>
      </div>

      <ElementStudioTypewriterVector
        isText={isText} motionPath={motionPath} onMotionPathChange={onMotionPathChange}
        typewriterSpeed={typewriterSpeed} onTypewriterSpeedChange={onTypewriterSpeedChange}
      />
    </div>
  );
};
