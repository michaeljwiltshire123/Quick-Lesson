import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { HelpCircle, Hand } from 'lucide-react';

interface PollControlsProps {
  selectedElement: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
}

export const PollControls: React.FC<PollControlsProps> = ({
  selectedElement,
  onUpdateElementMeta,
}) => {
  const meta = selectedElement.meta || {};
  const pollType = meta.pollType || 'multiple_choice';
  const correctAnswer = meta.correctAnswer ?? 0;
  const options: string[] = meta.options || ['Option A', 'Option B', 'Option C', 'Option D'];

  const handleOptionChange = (index: number, val: string) => {
    const nextOptions = [...options];
    nextOptions[index] = val;
    onUpdateElementMeta({ ...meta, options: nextOptions });
  };

  return (
    <div className="space-y-3 pt-3 border-t border-stone-100">
      <div className="flex items-center gap-2 pb-1 border-b border-stone-100">
        <HelpCircle className="w-4 h-4 text-amber-700" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">Live & Finger Polling</h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onUpdateElementMeta({ ...meta, pollType: 'multiple_choice' })}
          className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
            pollType === 'multiple_choice' ? 'bg-amber-100 border-amber-500 text-amber-900' : 'bg-white border-stone-200 text-stone-600'
          }`}
        >
          A / B / C / D
        </button>
        <button
          type="button"
          onClick={() => onUpdateElementMeta({ ...meta, pollType: 'finger_scale' })}
          className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center justify-center gap-1 ${
            pollType === 'finger_scale' ? 'bg-amber-100 border-amber-500 text-amber-900' : 'bg-white border-stone-200 text-stone-600'
          }`}
        >
          <Hand className="w-3 h-3" /> 1–5 Fingers
        </button>
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-semibold text-stone-600">Answer Options & Key</span>
        {options.slice(0, pollType === 'finger_scale' ? 5 : 4).map((opt, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onUpdateElementMeta({ ...meta, correctAnswer: i })}
              title="Click to set as correct answer"
              className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer transition-colors ${
                correctAnswer === i ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {pollType === 'finger_scale' ? i + 1 : String.fromCharCode(65 + i)}
            </button>
            <input
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              className="flex-1 text-xs bg-white border border-stone-200 rounded-lg px-2 py-1 text-stone-800 focus:outline-none focus:border-amber-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
