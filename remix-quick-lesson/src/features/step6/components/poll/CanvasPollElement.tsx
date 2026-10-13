import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { HelpCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

interface CanvasPollElementProps {
  element: SlideElement;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
  onStartDrag: (e: React.PointerEvent) => void;
}

export const CanvasPollElement: React.FC<CanvasPollElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdateElement,
  onStartDrag,
}) => {
  const meta = element.meta || {};
  const pollType = meta.pollType || 'multiple_choice';
  const showAnswer = Boolean(meta.showTeacherAnswer);
  const correctAnswer = meta.correctAnswer ?? 0;
  const options: string[] = meta.options || ['Option A', 'Option B', 'Option C', 'Option D'];

  const toggleAnswerReveal = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateElement({ meta: { ...meta, showTeacherAnswer: !showAnswer } });
  };

  return (
    <div
      onPointerDown={onStartDrag}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
        width: `${element.width}%`,
      }}
      className={`absolute z-20 cursor-move bg-white/95 backdrop-blur-xs border-2 rounded-2xl p-4 shadow-md transition-all ${
        isSelected ? 'border-amber-600 ring-2 ring-amber-400' : 'border-stone-300 hover:border-amber-400'
      }`}
    >
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-stone-100">
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
          <HelpCircle className="w-4 h-4 text-amber-700" />
          <span>{pollType === 'finger_scale' ? 'Finger Vote (Scale 1–5)' : 'Classroom Poll (A–D)'}</span>
        </div>
        <button
          type="button"
          onClick={toggleAnswerReveal}
          className="text-[11px] font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 cursor-pointer"
        >
          {showAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showAnswer ? 'Hide Answer' : 'Reveal Answer'}</span>
        </button>
      </div>

      <p className="text-sm font-bold text-stone-900 mb-3">{element.content || 'Classroom Poll Question'}</p>

      {pollType === 'finger_scale' ? (
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((num, i) => (
            <div
              key={num}
              className={`p-2 rounded-xl text-center border font-bold text-xs transition-colors ${
                showAnswer && correctAnswer === i
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400'
                  : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              <div className="text-base">{num} 🖐️</div>
              <div className="text-[10px] truncate text-stone-500">{options[i] || `Level ${num}`}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const isCorrect = showAnswer && correctAnswer === i;
            return (
              <div
                key={i}
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-800 font-medium'
                }`}
              >
                <span className={`w-6 h-6 rounded-lg text-xs flex items-center justify-center font-black ${
                  isCorrect ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  {letter}
                </span>
                <span className="text-xs truncate flex-1">{opt}</span>
                {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
