import React, { useState } from 'react';
import { Smartphone, Send } from 'lucide-react';

interface Props {
  role: 'innocent' | 'imposter';
  onSubmit: (ans: string) => void;
}

export const StudentPhoneAnswerForm: React.FC<Props> = ({ role, onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    setSubmitted(true);
    onSubmit(answer.trim());
  };

  if (submitted) {
    return (
      <div className="p-2.5 bg-emerald-900/40 border border-emerald-500/30 rounded-xl text-center space-y-1">
        <p className="text-xs font-bold text-emerald-300">Answer Submitted!</p>
        <p className="text-[10px] text-white/70">&ldquo;{answer}&rdquo;</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-[10px] font-bold text-emerald-400 underline cursor-pointer"
        >
          Edit Response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-1.5">
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={role === 'innocent' ? 'Type curriculum answer...' : 'Type plausible bluff answer...'}
        className="w-full px-2.5 py-1.5 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400"
      />
      <button
        type="submit"
        disabled={!answer.trim()}
        className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
      >
        <Send className="w-3 h-3" /> Submit Answer
      </button>
    </form>
  );
};
