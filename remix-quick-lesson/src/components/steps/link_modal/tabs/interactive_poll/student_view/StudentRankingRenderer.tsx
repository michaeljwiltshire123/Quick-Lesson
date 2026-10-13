import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { PollOption } from '../types';

interface Props {
  options: PollOption[];
  rankingOrder: string[];
  onChangeOrder: (nextOrder: string[]) => void;
  disabled: boolean;
}

export const StudentRankingRenderer: React.FC<Props> = ({
  options, rankingOrder, onChangeOrder, disabled,
}) => {
  const list = rankingOrder.length === options.length ? rankingOrder : options.map((o) => o.id);

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...list];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChangeOrder(next);
  };

  return (
    <div className="space-y-1.5">
      {list.map((optId, idx) => {
        const opt = options.find((o) => o.id === optId);
        return (
          <div key={optId} className="flex items-center justify-between p-2.5 bg-white border border-[#2D2A26]/15 rounded-xl text-xs">
            <span className="font-semibold text-[#2D2A26] truncate flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span className="truncate">{opt?.text || optId}</span>
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                disabled={disabled || idx === 0}
                onClick={() => move(idx, -1)}
                className="p-1 hover:bg-black/5 rounded cursor-pointer disabled:opacity-30"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={disabled || idx === list.length - 1}
                onClick={() => move(idx, 1)}
                className="p-1 hover:bg-black/5 rounded cursor-pointer disabled:opacity-30"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
