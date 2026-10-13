import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Edit3, Trash2, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { QuestionCard } from '../types/competitiveQuizTypes';

const formatOpt = (val: any): string => {
  if (typeof val === 'string') return val;
  if (val && typeof val === 'object') return val.left && val.right ? `${val.left} ➔ ${val.right}` : val.text || Object.values(val).join(' ➔ ');
  return String(val ?? '');
};

interface Props {
  card: QuestionCard;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onInspect: () => void;
  onDelete: () => void;
}

export const QuestionCardRow: React.FC<Props> = ({
  card,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onEdit,
  onInspect,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const correctIdx = card.correctIndex ?? 0;

  return (
    <div className="p-3.5 bg-white border border-[#2D2A26]/15 rounded-2xl shadow-xs hover:border-amber-400 transition-all text-xs space-y-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 min-w-0">
          <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 font-mono font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5">{index + 1}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-black text-amber-800 uppercase text-[9px] bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">{card.formatLabel}</span>
              <span className="text-[10px] text-gray-500 font-bold">{card.speedLimitSeconds}s • {card.potValue} pts</span>
            </div>
            <p className="font-bold text-gray-900 mt-1 leading-snug">{card.prompt}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button type="button" onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 text-gray-500 hover:text-black rounded-lg cursor-pointer">{isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}</button>
          <button type="button" onClick={onMoveUp} disabled={index === 0} className="p-1.5 text-gray-500 disabled:opacity-30 cursor-pointer"><ArrowUp className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={onMoveDown} disabled={index === total - 1} className="p-1.5 text-gray-500 disabled:opacity-30 cursor-pointer"><ArrowDown className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={onInspect} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer" title="Inspect"><Search className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={onEdit} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg cursor-pointer" title="Edit"><Edit3 className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={onDelete} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      {isExpanded && card.options && card.options.length > 0 && (
        <div className="pt-2 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-8">
          {card.options.map((rawOpt, oIdx) => {
            const isCorrect = oIdx === correctIdx;
            const isLie = card.format === 'spot_the_lie' && isCorrect;
            const isOutlier = card.format === 'odd_one_out' && isCorrect;
            return (
              <div key={oIdx} className={`p-2 rounded-xl flex items-start gap-2 border text-[11px] font-medium ${isLie ? 'bg-red-50 border-red-300 text-red-950 font-bold' : isOutlier ? 'bg-purple-50 border-purple-300 text-purple-950 font-bold' : isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' : 'bg-gray-50/80 border-gray-200 text-gray-700'}`}>
                <span className="w-4 h-4 rounded-full flex items-center justify-center font-mono font-bold text-[9px] bg-white border border-black/10 shrink-0">{String.fromCharCode(65 + oIdx)}</span>
                <span className="min-w-0 break-words">{formatOpt(rawOpt)} {isLie && <span className="ml-1 text-[9px] text-red-600 uppercase font-black">(LIE)</span>} {isOutlier && <span className="ml-1 text-[9px] text-purple-600 uppercase font-black">(OUTLIER)</span>} {!isLie && !isOutlier && isCorrect && <span className="ml-1 text-[9px] text-emerald-700 uppercase font-black">✓</span>}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
