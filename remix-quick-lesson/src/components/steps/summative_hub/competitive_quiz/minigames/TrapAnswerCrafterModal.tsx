import React, { useState, useEffect } from 'react';
import { Skull, Bomb, Clock, X } from 'lucide-react';
import { TrapCard } from './trapAnswerEngine';

interface Props {
  isOpen: boolean;
  authorId: string;
  authorName: string;
  onDeployTrap: (trap: TrapCard) => void;
  onClose: () => void;
}

export const TrapAnswerCrafterModal: React.FC<Props> = ({
  isOpen,
  authorId,
  authorName,
  onDeployTrap,
  onClose,
}) => {
  const [trap1, setTrap1] = useState('');
  const [trap2, setTrap2] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(15);

  useEffect(() => {
    if (!isOpen) return;
    setSecondsRemaining(15);
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trap1.trim()) return;
    onDeployTrap({
      authorId,
      authorName,
      trapAnswers: [trap1.trim(), trap2.trim() || 'Plausible false fact'],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-slate-900 border-2 border-purple-500 rounded-3xl p-5 max-w-sm w-full text-white space-y-4 shadow-2xl">
        <div className="flex justify-between items-center border-b border-purple-500/30 pb-2">
          <div className="flex items-center gap-2">
            <Bomb className="w-5 h-5 text-purple-400 animate-bounce" />
            <h3 className="text-xs font-black uppercase tracking-wider text-purple-300">
              Craft 2 Poison Trap Answers!
            </h3>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono font-black text-amber-400 bg-black/50 px-2 py-0.5 rounded-lg border border-amber-400/30">
            <Clock className="w-3.5 h-3.5" />
            <span>{secondsRemaining}s</span>
          </div>
        </div>

        <p className="text-[11px] text-gray-300">
          Write 2 devious wrong answers. Any pupil who clicks them loses <strong className="text-purple-300">20% of their points</strong> to you!
        </p>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Trap Answer #1 (e.g. Sounds true but isn't)..."
            value={trap1}
            onChange={(e) => setTrap1(e.target.value)}
            className="w-full bg-slate-800 border border-purple-400/50 rounded-xl p-2.5 text-xs text-white"
            required
            maxLength={60}
          />
          <input
            type="text"
            placeholder="Trap Answer #2 (optional decoy)..."
            value={trap2}
            onChange={(e) => setTrap2(e.target.value)}
            className="w-full bg-slate-800 border border-purple-400/50 rounded-xl p-2.5 text-xs text-white"
            maxLength={60}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
          <button type="button" onClick={onClose} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white font-bold">
            Skip
          </button>
          <button
            type="submit"
            disabled={!trap1.trim() || secondsRemaining === 0}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs uppercase cursor-pointer disabled:opacity-40 shadow-lg"
          >
            Plant Traps
          </button>
        </div>
      </form>
    </div>
  );
};
