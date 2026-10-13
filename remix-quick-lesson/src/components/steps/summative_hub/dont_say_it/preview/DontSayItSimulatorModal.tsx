import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { SecretWordCard } from '../types/dontSayItTypes';
import { ClueGiverPreviewCard } from './ClueGiverPreviewCard';
import { RefereeBuzzerCard } from './RefereeBuzzerCard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cards: SecretWordCard[];
}

export const DontSayItSimulatorModal: React.FC<Props> = ({ isOpen, onClose, cards = [] }) => {
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) { setIsTimerRunning(false); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  if (!isOpen || cards.length === 0) return null;
  const currentCard = cards[activeCardIdx % cards.length];

  const handleNextCard = (deltaPts: number) => {
    setScore((s) => Math.max(0, s + deltaPts));
    setActiveCardIdx((i) => (i + 1) % cards.length);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl max-w-3xl w-full p-5 text-white space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-base uppercase tracking-wider text-white">Don't Say It! Interactive Simulator</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 font-mono font-black text-amber-400 text-lg">
            <span>⏱️ {timer}s</span>
            <button type="button" onClick={() => setIsTimerRunning(!isTimerRunning)} className="p-1.5 bg-amber-400 text-slate-950 rounded-lg text-xs uppercase font-black cursor-pointer">
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button type="button" onClick={() => { setTimer(60); setIsTimerRunning(false); }} className="p-1.5 bg-slate-700 text-white rounded-lg text-xs cursor-pointer"><RotateCcw className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-2 font-black text-emerald-400 text-base">
            <Trophy className="w-5 h-5" />
            <span>Score: {score} pts</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ClueGiverPreviewCard card={currentCard} cardIndex={activeCardIdx} totalCards={cards.length} onCorrect={() => handleNextCard(100)} />
          <RefereeBuzzerCard onFoul={() => handleNextCard(-50)} onPass={() => handleNextCard(-20)} />
        </div>
      </div>
    </div>
  );
};
