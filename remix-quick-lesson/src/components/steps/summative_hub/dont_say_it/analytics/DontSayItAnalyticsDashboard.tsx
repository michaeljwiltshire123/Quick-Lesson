import React from 'react';
import { VolumeX, Clock, Award, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';
import { SecretWordCard } from '../types/dontSayItTypes';

interface Props {
  cards: SecretWordCard[];
}

export const DontSayItAnalyticsDashboard: React.FC<Props> = ({ cards }) => {
  const sampleTrappedWords = [
    { target: cards[0]?.targetWord || 'Mitochondria', forbiddenTriggered: 'Powerhouse (3 fouls)', penaltyCount: 3 },
    { target: cards[1]?.targetWord || 'Photosynthesis', forbiddenTriggered: 'Sunlight (2 fouls)', penaltyCount: 2 },
    { target: cards[2]?.targetWord || 'Diffusion', forbiddenTriggered: 'High to low (2 fouls)', penaltyCount: 2 },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-bold">Winning Team</span>
            <span className="text-sm font-black text-[#2D2A26]">Team Alpha (18 - 14)</span>
          </div>
        </div>

        <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center">
            <VolumeX className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-bold">Forbidden Word Fouls</span>
            <span className="text-sm font-black text-[#2D2A26]">7 Slip-Ups Total</span>
          </div>
        </div>

        <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-bold">Avg Guess Velocity</span>
            <span className="text-sm font-black text-[#2D2A26]">18.4s per card</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15 space-y-2.5">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-500" /> Forbidden Word Slip-Up Traps
            </h5>
            <span className="text-[10px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 font-bold">Surface Recall Trap</span>
          </div>
          <p className="text-[11px] text-[#2D2A26]/70 leading-tight">
            Pupils defaulted to forbidden memorised buzzwords rather than describing the mechanism:
          </p>
          <div className="space-y-1.5">
            {sampleTrappedWords.map((w, idx) => (
              <div key={idx} className="p-2.5 bg-white rounded-xl border border-[#2D2A26]/10 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#2D2A26] block">{w.target}</span>
                  <span className="text-[10px] text-rose-600">Blurted: {w.forbiddenTriggered}</span>
                </div>
                <span className="text-[10px] font-black text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                  -{w.penaltyCount} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15 space-y-2.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Articulation &amp; Descriptive Mastery
              </h5>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">Oral Fluency</span>
            </div>
            <p className="text-[11px] text-[#2D2A26]/80 leading-relaxed">
              Teams demonstrated highest verbal fluency on anatomy definitions, but struggled to explain physical processes without relying on gesture and forbidden catchphrases.
            </p>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-[#2D2A26]/10 flex items-center justify-between text-[10px]">
            <span className="text-gray-500">{cards.length} Vocabulary Cards in Play</span>
            <button type="button" onClick={() => window.print()} className="px-2.5 py-1 bg-[#2D2A26] text-white rounded-lg font-bold flex items-center gap-1 hover:bg-black cursor-pointer">
              <FileText className="w-3 h-3 text-amber-300" /> Print Oral Debrief
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
