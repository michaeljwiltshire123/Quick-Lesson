import React, { useState, useEffect } from 'react';
import { Circle, Square, Triangle, Diamond, Trophy, Flame, Zap, Rocket, ThumbsUp, Wind } from 'lucide-react';
import { RaceRunner } from '../types/minigameTypes';

export interface RaceQuestionLoopItem {
  id: string;
  prompt: string;
  correctAnswer: string;
  distractors: string[];
}

interface Props {
  isRacer: boolean;
  racers: RaceRunner[];
  bettingTimeRemaining: number;
  questionLoop?: RaceQuestionLoopItem[];
  onTapShape: (isCorrect: boolean) => void;
  onSubmitBet: (firstId: string, secondId: string) => void;
  onSendCheer?: (emoji: string) => void;
}

type ShapeKey = 'triangle' | 'square' | 'circle' | 'diamond';

export const AvatarRacePupilController: React.FC<Props> = ({
  isRacer,
  racers,
  bettingTimeRemaining,
  questionLoop = [],
  onTapShape,
  onSubmitBet,
  onSendCheer,
}) => {
  const [firstId, setFirstId] = useState(racers[0]?.id || '');
  const [secondId, setSecondId] = useState(racers[1]?.id || '');
  const [betSubmitted, setBetSubmitted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [shuffledSlots, setShuffledSlots] = useState<Array<{ shape: ShapeKey; text: string; isCorrect: boolean }>>([]);

  const defaultQuestions: RaceQuestionLoopItem[] = questionLoop.length > 0 ? questionLoop : [
    { id: '1', prompt: 'Primary energy unit of living cells?', correctAnswer: 'ATP', distractors: ['DNA', 'Glucose', 'Lipid'] },
    { id: '2', prompt: 'Process by which plants synthesise sugars?', correctAnswer: 'Photosynthesis', distractors: ['Respiration', 'Osmosis', 'Fermentation'] },
    { id: '3', prompt: 'Main gas consumed during cellular respiration?', correctAnswer: 'Oxygen', distractors: ['Carbon Dioxide', 'Nitrogen', 'Methane'] },
    { id: '4', prompt: 'Organelle known as the power station of the cell?', correctAnswer: 'Mitochondria', distractors: ['Nucleus', 'Ribosome', 'Vacuole'] },
  ];

  useEffect(() => {
    if (!isRacer) return;
    const currentQ = defaultQuestions[qIndex % defaultQuestions.length];
    const items = [
      { text: currentQ.correctAnswer, isCorrect: true },
      ...currentQ.distractors.slice(0, 3).map((d) => ({ text: d, isCorrect: false })),
    ].sort(() => 0.5 - Math.random());

    const shapes: ShapeKey[] = ['triangle', 'square', 'circle', 'diamond'];
    setShuffledSlots(items.map((it, idx) => ({ shape: shapes[idx], text: it.text, isCorrect: it.isCorrect })));

    const interval = setTimeout(() => {
      setQIndex((prev) => prev + 1);
    }, 2800 + Math.random() * 1500);

    return () => clearTimeout(interval);
  }, [qIndex, isRacer]);

  if (!isRacer) {
    return (
      <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-4 text-white space-y-3 text-center">
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
          Spectator & Betting Box ({bettingTimeRemaining > 0 ? `${bettingTimeRemaining}s` : 'Live'})
        </span>
        {!betSubmitted && bettingTimeRemaining > 0 ? (
          <div className="space-y-2 text-xs text-left">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Predict 1st Place (Full Pts):</label>
              <select value={firstId} onChange={(e) => setFirstId(e.target.value)} className="w-full bg-slate-800 border border-white/20 rounded-xl p-2 font-bold">
                {racers.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-1">Predict 2nd Place (Half Pts):</label>
              <select value={secondId} onChange={(e) => setSecondId(e.target.value)} className="w-full bg-slate-800 border border-white/20 rounded-xl p-2 font-bold">
                {racers.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
            <button type="button" onClick={() => { setBetSubmitted(true); onSubmitBet(firstId, secondId); }} className="w-full py-2 bg-amber-400 text-slate-950 font-black text-xs uppercase rounded-xl cursor-pointer">Lock In Wagers</button>
          </div>
        ) : (
          <div className="space-y-2.5">
            <p className="text-xs font-bold text-amber-300">Cheer on your runner to boost the track!</p>
            <div className="grid grid-cols-5 gap-1.5">
              {['🔥', '⚡', '🚀', '💨', '👏'].map((em) => (
                <button key={em} type="button" onClick={() => onSendCheer?.(em)} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-lg active:scale-125 transition-transform cursor-pointer">{em}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentQ = defaultQuestions[qIndex % defaultQuestions.length];

  return (
    <div className="bg-slate-900 border-2 border-cyan-400 rounded-3xl p-3.5 text-white space-y-2.5 text-center">
      <div className="bg-cyan-950/80 p-2 rounded-xl border border-cyan-400/40 text-left">
        <span className="text-[9px] font-black uppercase text-cyan-300 block">Q{((qIndex % 4) + 1)} of 4 (Silent Loop)</span>
        <p className="text-xs font-bold text-white truncate">{currentQ.prompt}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {shuffledSlots.map((slot) => (
          <button key={slot.shape} type="button" onClick={() => onTapShape(slot.isCorrect)} className="p-3 bg-white/10 hover:bg-white/20 active:scale-90 border-2 border-white/20 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all">
            {slot.shape === 'triangle' && <Triangle className="w-7 h-7 text-emerald-400 fill-emerald-400/30" />}
            {slot.shape === 'square' && <Square className="w-7 h-7 text-blue-400 fill-blue-400/30" />}
            {slot.shape === 'circle' && <Circle className="w-7 h-7 text-amber-400 fill-amber-400/30" />}
            {slot.shape === 'diamond' && <Diamond className="w-7 h-7 text-purple-400 fill-purple-400/30" />}
            <span className="text-[10px] font-black text-gray-200 truncate w-full">{slot.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
