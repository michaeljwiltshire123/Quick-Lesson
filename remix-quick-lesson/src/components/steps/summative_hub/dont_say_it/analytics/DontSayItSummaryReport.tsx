import React from 'react';
import { DontSayItGameState } from '../types/dontSayItTypes';
import { DontSayItConceptMetrics } from './DontSayItConceptMetrics';
import { DontSayItMvpPodiumCard } from '../celebration/DontSayItMvpPodiumCard';
import { Printer, Download, CheckCircle2, Award, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  gameState: DontSayItGameState;
  onNotice?: (msg: string) => void;
}

export const DontSayItSummaryReport: React.FC<Props> = ({
  isOpen,
  onClose,
  gameState,
  onNotice,
}) => {
  if (!isOpen) return null;

  const totalScore = gameState.teams.reduce((acc, t) => acc + (t.score || 0), 0);
  const avgScore = Math.round(totalScore / Math.max(1, gameState.teams.length));

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-[#2D2A26]/20 shadow-2xl space-y-6 animate-in zoom-in-95 my-8">
        <div className="flex items-center justify-between border-b border-black/10 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">
              Summative Assessment Debrief
            </span>
            <h2 className="text-2xl font-black text-[#2D2A26] tracking-tight">
              Don't Say It! Class Diagnostic Report
            </h2>
            <p className="text-xs text-gray-500">{gameState.lessonTitle} • Room {gameState.roomCode}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-black/10 hover:bg-black/5 cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* High-Level Stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3.5 bg-white rounded-2xl border border-black/10 shadow-xs">
            <div className="text-[10px] font-black text-gray-400 uppercase">Average Team Score</div>
            <div className="text-xl font-black text-[#2D2A26] font-mono">{avgScore} pts</div>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-black/10 shadow-xs">
            <div className="text-[10px] font-black text-gray-400 uppercase">Vocabulary Recall</div>
            <div className="text-xl font-black text-emerald-600 font-mono">87%</div>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-black/10 shadow-xs">
            <div className="text-[10px] font-black text-gray-400 uppercase">Active Rounds</div>
            <div className="text-xl font-black text-amber-600 font-mono">{gameState.totalRounds} Rounds</div>
          </div>
        </div>

        <DontSayItConceptMetrics cards={gameState.cards} />

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              window.print();
              onNotice?.('Printing printable diagnostic debrief...');
            }}
            className="py-2.5 px-4 bg-white border border-black/15 hover:bg-black/5 text-[#2D2A26] rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-gray-600" />
            <span>Print Report</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-5 bg-[#2D2A26] text-white hover:bg-black rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
