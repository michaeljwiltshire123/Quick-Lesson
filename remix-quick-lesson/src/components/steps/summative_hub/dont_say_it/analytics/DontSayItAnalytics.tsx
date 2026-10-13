import React from 'react';
import { BarChart2, Printer, Trophy, ShieldCheck, Sparkles } from 'lucide-react';
import { ForbiddenWordHotspotsCard } from './ForbiddenWordHotspotsCard';
import { ReteachRecommendationsCard } from './ReteachRecommendationsCard';

interface Props {
  lessonTitle?: string;
  totalCardsPlayed?: number;
  foulCount?: number;
  successCount?: number;
  onPrintReport?: () => void;
}

export const DontSayItAnalytics: React.FC<Props> = ({
  lessonTitle = 'UK Curriculum Showdown',
  totalCardsPlayed = 8,
  foulCount = 3,
  successCount = 6,
  onPrintReport,
}) => {
  const fluencyScore = Math.round((successCount / Math.max(1, totalCardsPlayed)) * 100);

  return (
    <div className="bg-[#2D2A26] text-white p-5 rounded-3xl border border-white/10 shadow-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase border border-amber-500/30">
              Diagnostic Report
            </span>
            <span className="text-[11px] text-gray-400">{lessonTitle}</span>
          </div>
          <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-amber-400" />
            <span>Oral Vocabulary Diagnostic Suite</span>
          </h3>
        </div>

        <button
          type="button"
          onClick={() => {
            onPrintReport?.();
            window.print();
          }}
          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Printer className="w-4 h-4" />
          <span>Print Teacher Summary</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-black/40 border border-white/10 rounded-2xl text-center space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Class Oral Fluency Rate</span>
          <span className="text-2xl font-black text-amber-400 font-mono">{fluencyScore}%</span>
        </div>
        <div className="p-3 bg-black/40 border border-white/10 rounded-2xl text-center space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Successful Clues</span>
          <span className="text-2xl font-black text-emerald-400 font-mono">{successCount} Cards</span>
        </div>
        <div className="p-3 bg-black/40 border border-white/10 rounded-2xl text-center space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Taboo Fouls Triggered</span>
          <span className="text-2xl font-black text-rose-400 font-mono">{foulCount} Stumbles</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ForbiddenWordHotspotsCard />
        <ReteachRecommendationsCard />
      </div>
    </div>
  );
};
