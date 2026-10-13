import React, { useState } from 'react';
import { ImposterQuestion } from '../types/imposterTypes';
import { Send, CheckCircle2 } from 'lucide-react';

interface Props {
  question: ImposterQuestion;
  onBluffSubmitted?: () => void;
}

export const StudentPhoneImposterTaskView: React.FC<Props> = ({ question, onBluffSubmitted }) => {
  const [ans, setAns] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    onBluffSubmitted?.();
  };

  return (
    <div className="space-y-3">
      <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 space-y-1">
        <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 block">
          Bluffing Dossier
        </span>
        <div className="text-[11px] font-medium space-y-1">
          <p>
            <span className="text-white/60">General Topic:</span>{' '}
            <strong className="text-white">{question.topicClue || 'Lesson Core Subject'}</strong>
          </p>
          <p className="text-amber-300">
            {question.imposterClue || 'You do not get to see the exact technical question. Provide a plausible answer!'}
          </p>
        </div>
      </div>

      <div className="p-2 bg-slate-800/80 rounded-xl border border-white/5 space-y-1">
        <span className="text-[10px] font-bold text-indigo-300 block">Live Eavesdrop Feed</span>
        <p className="text-[11px] text-white/70 italic">Listen out for terms mentioned by peers...</p>
      </div>

      {submitted ? (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-center space-y-1">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
          <p className="text-xs font-bold text-emerald-200">Bluff Submitted!</p>
          <span className="text-[10px] text-amber-300 font-mono">+50pt Speedy Blend Bonus</span>
        </div>
      ) : (
        <div className="space-y-1.5">
          <textarea
            rows={2}
            value={ans}
            onChange={(e) => setAns(e.target.value)}
            placeholder="Type a plausible curriculum answer..."
            className="w-full px-2.5 py-1.5 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-rose-400"
          />
          <button
            type="button"
            disabled={!ans.trim()}
            onClick={handleSubmit}
            className="w-full py-1.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-xs"
          >
            <Send className="w-3 h-3" /> Submit Bluff
          </button>
        </div>
      )}
    </div>
  );
};
