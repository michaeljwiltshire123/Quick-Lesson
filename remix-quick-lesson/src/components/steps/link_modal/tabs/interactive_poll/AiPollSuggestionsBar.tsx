import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { PollSuggestion } from './types';

interface Props {
  suggestions: PollSuggestion[];
  isLoading: boolean;
  onRefresh: () => void;
  onSelectSuggestion: (sugg: PollSuggestion) => void;
}

export const AiPollSuggestionsBar: React.FC<Props> = ({
  suggestions,
  isLoading,
  onRefresh,
  onSelectSuggestion,
}) => {
  return (
    <div className="bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl p-3 shadow-2xs space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D2A26]">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Suggested Diagnostic Checking Questions</span>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="px-2 py-1 rounded-lg bg-white border border-[#2D2A26]/15 text-[11px] font-semibold text-[#2D2A26] flex items-center gap-1 hover:bg-black/5 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-amber-600' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {suggestions.map((sugg) => (
          <button
            key={sugg.id}
            type="button"
            onClick={() => onSelectSuggestion(sugg)}
            className="text-left p-2 rounded-lg bg-white border border-[#2D2A26]/10 hover:border-[#F59E0B] hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                {sugg.pollType}
              </span>
              <span className="text-[10px] text-[#2D2A26]/50 group-hover:text-amber-700 font-semibold">
                Use prompt &rarr;
              </span>
            </div>
            <p className="text-xs text-[#2D2A26] line-clamp-2 font-medium">
              {sugg.question}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
