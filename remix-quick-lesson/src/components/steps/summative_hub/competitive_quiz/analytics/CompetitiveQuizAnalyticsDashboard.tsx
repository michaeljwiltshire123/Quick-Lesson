import React from 'react';
import { Flame, Timer, Trophy, Zap, AlertTriangle, Printer } from 'lucide-react';
import { QuestionCard } from '../types/competitiveQuizTypes';

interface Props {
  questions: QuestionCard[];
  totalRounds: number;
}

export const CompetitiveQuizAnalyticsDashboard: React.FC<Props> = ({
  questions, totalRounds,
}) => {
  const mockPodium = [
    { rank: 1, name: 'Ava 🐨', score: 2850, streak: 8, avgSpeed: '2.1s' },
    { rank: 2, name: 'Oliver 🦉', score: 2620, streak: 6, avgSpeed: '2.4s' },
    { rank: 3, name: 'George 🐻', score: 2410, streak: 5, avgSpeed: '3.0s' },
    { rank: 4, name: 'Amelia 🦊', score: 2190, streak: 4, avgSpeed: '2.8s' },
  ];

  const firstQ = questions[0];
  const correctLabel = (firstQ?.options && firstQ.correctIndex !== undefined ? firstQ.options[firstQ.correctIndex] : firstQ?.conceptCovered) || 'Amylase';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3 flex items-center gap-2.5 shadow-xs">
          <Trophy className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div><span className="text-[10px] text-gray-500 block uppercase font-bold">Class Mean</span><span className="text-sm font-black text-[#2D2A26]">2,240 pts</span></div>
        </div>
        <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3 flex items-center gap-2.5 shadow-xs">
          <Flame className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <div><span className="text-[10px] text-gray-500 block uppercase font-bold">Max Streak</span><span className="text-sm font-black text-[#2D2A26]">8 Streak</span></div>
        </div>
        <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3 flex items-center gap-2.5 shadow-xs">
          <Timer className="w-5 h-5 text-indigo-600 flex-shrink-0" />
          <div><span className="text-[10px] text-gray-500 block uppercase font-bold">Avg Reaction</span><span className="text-sm font-black text-[#2D2A26]">2.6s</span></div>
        </div>
        <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3 flex items-center gap-2.5 shadow-xs">
          <Zap className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div><span className="text-[10px] text-gray-500 block uppercase font-bold">Accuracy</span><span className="text-sm font-black text-[#2D2A26]">73%</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3.5 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15 space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5 text-amber-500" /> Ranked Pupil Leaderboard</h5>
            <span className="text-[10px] text-gray-500 font-bold">Top Finishers</span>
          </div>
          <div className="space-y-1">
            {mockPodium.map((p) => (
              <div key={p.rank} className="p-2 bg-white rounded-xl border border-[#2D2A26]/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-300 font-mono font-black text-[10px] flex items-center justify-center">#{p.rank}</span>
                  <span className="font-bold text-[#2D2A26]">{p.name}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="text-gray-500">{p.avgSpeed}</span>
                  <span className="font-black text-amber-600">{p.score} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3.5 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> Toughest Question (Streak Buster)</h5>
              <span className="text-[10px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 font-bold">54% Missed</span>
            </div>
            <p className="text-xs font-semibold text-[#2D2A26] mt-2 leading-snug">{firstQ?.prompt || 'Which enzyme breaks down starch into maltose?'}</p>
            <p className="text-[10px] text-gray-600 mt-1">
              Correct: <span className="font-bold text-emerald-700">{correctLabel}</span> • Rushed under 3s and confused it with Protease.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#2D2A26]/10 text-[10px]">
            <span className="text-gray-500">{totalRounds} Live Arena Rounds Evaluated</span>
            <button type="button" onClick={() => window.print()} className="px-2.5 py-1 bg-[#2D2A26] text-white rounded-lg font-bold flex items-center gap-1 hover:bg-black cursor-pointer">
              <Printer className="w-3 h-3 text-amber-300" /> Export Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
