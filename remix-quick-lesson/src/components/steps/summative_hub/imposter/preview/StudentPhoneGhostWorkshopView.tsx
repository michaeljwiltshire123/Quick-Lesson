import React, { useState } from 'react';
import { Ghost, Send, Award } from 'lucide-react';

interface Props {
  topic?: string;
}

export const StudentPhoneGhostWorkshopView: React.FC<Props> = ({ topic = 'Core Topic' }) => {
  const [decoyText, setDecoyText] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleTransmit = () => {
    const text = decoyText.trim();
    if (!text) return;
    try {
      const raw = sessionStorage.getItem('imposter_pupil_ghost_decoys');
      const existing: string[] = raw ? JSON.parse(raw) : [];
      sessionStorage.setItem('imposter_pupil_ghost_decoys', JSON.stringify([text, ...existing.filter((t) => t !== text)]));
    } catch {}
    setIsSent(true);
  };

  return (
    <div className="space-y-3">
      <div className="p-2.5 rounded-xl bg-purple-950/70 border border-purple-400/40 text-purple-200 text-center space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-xs font-black text-indigo-300">
          <Ghost className="w-4 h-4" /> Ghost Helper Workshop
        </div>
        <p className="text-[10px] text-white/80">
          You are eliminated! Author decoy questions to mislead the Imposter.
        </p>
      </div>

      {isSent ? (
        <div className="p-4 bg-slate-800/90 rounded-2xl border border-indigo-400/40 text-center space-y-2">
          <Award className="w-7 h-7 text-amber-400 mx-auto animate-bounce" />
          <h5 className="text-xs font-black text-white">Decoy Transmitted!</h5>
          <p className="text-[10px] text-white/70">
            Earn Ghost Points &amp; the Ghost Writing Master Accolade when an imposter triggers your trap!
          </p>
          <button
            type="button"
            onClick={() => { setIsSent(false); setDecoyText(''); }}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold cursor-pointer"
          >
            Craft Another Trap
          </button>
        </div>
      ) : (
        <div className="space-y-2 bg-slate-800/80 p-2.5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-indigo-300">Topic: {topic}</span>
            <span className="text-white/40 font-mono">{decoyText.length}/120</span>
          </div>
          <textarea
            rows={3}
            maxLength={120}
            value={decoyText}
            onChange={(e) => setDecoyText(e.target.value)}
            placeholder="Write a clever 120-character decoy question..."
            className="w-full px-2.5 py-1.5 bg-slate-900 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-400"
          />
          <button
            type="button"
            disabled={!decoyText.trim()}
            onClick={handleTransmit}
            className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-xs"
          >
            <Send className="w-3 h-3" /> Transmit Decoy
          </button>
        </div>
      )}
    </div>
  );
};
