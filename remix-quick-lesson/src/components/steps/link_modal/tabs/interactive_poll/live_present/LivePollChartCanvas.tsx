import React from 'react';
import { Clock, Eye, EyeOff } from 'lucide-react';
import { PollType } from '../types';
import { LivePollState } from './typesLive';

interface Props {
  liveState: LivePollState;
  onToggleReveal: () => void;
}

export const LivePollChartCanvas: React.FC<Props> = ({ liveState, onToggleReveal }) => {
  const { pollConfig, voteCounts, totalVotes, isRevealed, remainingSeconds, wordCloudEntries } = liveState;
  const isWordCloud = pollConfig.pollType === PollType.Wordcloud;

  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#2D2A26]/10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]/70">
            Live Pupil Responses ({totalVotes})
          </span>
          {remainingSeconds !== null && (
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>{remainingSeconds}s remaining</span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onToggleReveal}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-[#2D2A26]/20 bg-[#F8F6F0] hover:bg-[#2D2A26]/5 text-[#2D2A26] transition-colors cursor-pointer"
        >
          {isRevealed ? <EyeOff className="w-3.5 h-3.5 text-[#D97706]" /> : <Eye className="w-3.5 h-3.5 text-[#D97706]" />}
          <span>{isRevealed ? 'Hide from Pupils' : 'Reveal Live Results'}</span>
        </button>
      </div>

      {!isRevealed ? (
        <div className="py-12 flex flex-col items-center justify-center text-center bg-[#F8F6F0]/50 rounded-xl border border-dashed border-[#2D2A26]/20">
          <EyeOff className="w-8 h-8 text-[#2D2A26]/40 mb-2" />
          <p className="text-xs font-bold text-[#2D2A26]">Blind Voting Active</p>
          <p className="text-[11px] text-[#2D2A26]/60">Results are concealed to prevent pupil conformity bias.</p>
        </div>
      ) : isWordCloud ? (
        <div className="p-6 bg-[#F8F6F0]/60 rounded-xl border border-[#2D2A26]/10 flex flex-wrap gap-3 items-center justify-center min-h-[160px]">
          {wordCloudEntries.length === 0 ? (
            <span className="text-xs text-[#2D2A26]/50 italic">Awaiting live pupil keywords...</span>
          ) : (
            wordCloudEntries.map((w) => (
              <span
                key={w.text}
                style={{ fontSize: `${Math.min(28, 12 + w.count * 3)}px` }}
                className="font-bold text-[#2D2A26] bg-white px-2.5 py-1 rounded-lg border border-amber-300 shadow-2xs"
              >
                {w.text} ({w.count})
              </span>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {pollConfig.options.map((opt) => {
            const votes = voteCounts[opt.id] || 0;
            const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
            return (
              <div key={opt.id} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-[#2D2A26]">
                  <span className="truncate pr-2">{opt.text}</span>
                  <span className="text-amber-800 font-bold">{votes} ({pct}%)</span>
                </div>
                <div className="w-full h-3 bg-[#F8F6F0] rounded-full overflow-hidden border border-[#2D2A26]/10">
                  <div
                    className="h-full bg-linear-to-r from-amber-400 to-[#F59E0B] rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
