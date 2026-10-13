import React from 'react';
import { Ghost, ShieldCheck, Sparkles } from 'lucide-react';

export interface DecoyQuestionItem {
  id: string;
  topic: string;
  questionText: string;
  authorName: string;
  isAiFallback?: boolean;
}

interface Props {
  decoys: DecoyQuestionItem[];
  onSelectDecoy?: (decoy: DecoyQuestionItem) => void;
}

export const GhostDecoyBankCard: React.FC<Props> = ({ decoys, onSelectDecoy }) => {
  return (
    <div className="bg-slate-900 border border-indigo-500/30 p-4 rounded-2xl space-y-3 text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <Ghost className="w-4 h-4 text-indigo-400" />
          <h4 className="text-xs font-black uppercase tracking-wider text-indigo-300">
            Available Ghost Decoys ({decoys.length})
          </h4>
        </div>
        <span className="text-[10px] text-white/50">For Echo Prompt attacks</span>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {decoys.map((d) => (
          <div
            key={d.id}
            onClick={() => onSelectDecoy?.(d)}
            className="p-2.5 rounded-xl bg-slate-800/90 border border-white/10 hover:border-indigo-400 text-xs flex items-center justify-between gap-2 cursor-pointer transition-all"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[10px] text-indigo-300 font-bold mb-0.5">
                <span>{d.topic}</span>
                <span>•</span>
                <span className="text-white/60">By {d.authorName}</span>
                {d.isAiFallback && (
                  <span className="bg-indigo-950 px-1.5 py-0.5 rounded text-[9px] text-amber-300">
                    AI Pre-set
                  </span>
                )}
              </div>
              <p className="text-white font-medium text-[11px] truncate">{d.questionText}</p>
            </div>
            {onSelectDecoy && (
              <button
                type="button"
                className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold shrink-0 cursor-pointer"
              >
                Use
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
