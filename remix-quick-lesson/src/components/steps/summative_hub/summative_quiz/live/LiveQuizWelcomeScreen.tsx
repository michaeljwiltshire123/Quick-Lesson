import React from 'react';
import { Play, Users, QrCode, Volume2, ArrowLeft } from 'lucide-react';

interface Props {
  quizTitle: string;
  currentCohortTag: string;
  totalQuestions: number;
  onChangeCohortTag: (tag: string) => void;
  onStartGame: () => void;
  onExit: () => void;
}

const DUMMY_PUPILS = ['Alex P.', 'Maya K.', 'Sam T.', 'Jordan B.', 'Liam W.', 'Chloe H.', 'Oliver M.', 'Grace L.'];

export const LiveQuizWelcomeScreen: React.FC<Props> = ({
  quizTitle, currentCohortTag, totalQuestions, onChangeCohortTag, onStartGame, onExit,
}) => (
  <div className="bg-[#181614] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6">
    <div className="flex items-center justify-between border-b border-white/10 pb-4">
      <button type="button" onClick={onExit} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all cursor-pointer">
        <ArrowLeft className="w-4 h-4" /><span>Back to Editor</span>
      </button>
      <div className="flex items-center gap-2 bg-amber-500/20 px-3 py-1 rounded-xl border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
        <span>PIN: 842-192</span>
        <QrCode className="w-4 h-4" />
      </div>
    </div>

    <div className="text-center space-y-3">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
        <span>Live Quiz Lobby ({totalQuestions} Questions)</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{quizTitle}</h1>
      <p className="text-xs text-gray-400 max-w-md mx-auto">
        Project this screen on the classroom board. Pupils join on their devices using the PIN code above.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/40 p-4 rounded-2xl border border-white/10">
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-amber-400" /> Class Group
        </label>
        <input
          type="text"
          value={currentCohortTag}
          onChange={(e) => onChangeCohortTag(e.target.value)}
          className="w-full px-3.5 py-2 bg-white/10 border border-white/15 rounded-xl text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Class / Group Tag"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
          <span>Connected Pupils (24 Ready)</span>
          <span className="text-emerald-400 flex items-center gap-1"><Volume2 className="w-3 h-3" /> Auto-Voice On</span>
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto pt-1">
          {DUMMY_PUPILS.map((name, i) => (
            <span key={i} className="px-2.5 py-1 bg-white/10 rounded-lg text-[11px] font-medium text-gray-200 border border-white/5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {name}
            </span>
          ))}
          <span className="px-2 py-1 text-[11px] font-mono text-gray-400">+16 more</span>
        </div>
      </div>
    </div>

    <div className="pt-2 text-center">
      <button
        type="button"
        onClick={onStartGame}
        className="w-full sm:w-auto px-10 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl text-sm shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto"
      >
        <Play className="w-4 h-4 fill-current" />
        <span>Start Live Quiz</span>
      </button>
    </div>
  </div>
);
