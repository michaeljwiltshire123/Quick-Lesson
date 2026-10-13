import React, { useState } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { playSynthesizedSound } from './SoundboardAndConfetti';
import { Sparkles, X, Plus } from 'lucide-react';

interface StampsAndFortuneCookieProps {
  onInsertStamp: (element: SlideElement) => void;
}

const FORTUNES = [
  '“Mistakes are proof that you are trying.” 🌟',
  '“Every expert was once a beginner.” 🚀',
  '“Curiosity is the wick in the candle of learning.” 🕯️',
  '“Questions are the keys to unlocking understanding.” 🔑',
  '“Small daily improvements over time lead to stunning results.” 📈',
];

export const StampsAndFortuneCookie: React.FC<StampsAndFortuneCookieProps> = ({ onInsertStamp }) => {
  const [fortune, setFortune] = useState<string | null>(null);

  const handleStamp = (type: 'busted' | 'verified') => {
    playSynthesizedSound('boom');
    onInsertStamp({
      id: `el-stamp-${Date.now()}`,
      type: 'shape',
      shapeType: 'rounded',
      x: 34, y: 35, width: 34, height: 22,
      content: type === 'busted' ? '🚫 BUSTED!\n(Common Misconception)' : '✅ VERIFIED FACT!\n(Scientific Truth)',
      fillColor: type === 'busted' ? '#FEE2E2' : '#D1FAE5',
      borderColor: type === 'busted' ? '#DC2626' : '#059669',
      borderWidth: 3,
      textStyle: { bold: true, align: 'center', fontSize: 13, color: type === 'busted' ? '#991B1B' : '#065F46' },
      meta: { isStamp: true, stampType: type },
    });
  };

  const handleInsertFortuneToSlide = (quote: string) => {
    playSynthesizedSound('applause');
    onInsertStamp({
      id: `el-fortune-${Date.now()}`,
      type: 'shape',
      shapeType: 'rounded',
      x: 25, y: 35, width: 50, height: 24,
      content: `🥠 Classroom Motivator:\n${quote}`,
      fillColor: '#FEF3C7',
      borderColor: '#F59E0B',
      borderWidth: 2,
      textStyle: { bold: true, italic: true, align: 'center', fontSize: 12, color: '#78350F' },
      meta: { isFortuneStamp: true },
    });
    setFortune(null);
  };

  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-3 gap-1">
        <button
          type="button" onClick={() => handleStamp('busted')}
          className="py-1.5 px-1 bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 font-extrabold rounded-xl text-[11px] cursor-pointer hover:scale-105 active:scale-90 transition-all flex items-center justify-center gap-1 shadow-2xs"
          title="Stamp 'BUSTED!' onto active slide"
        >
          <span>🚫 Busted!</span>
        </button>

        <button
          type="button" onClick={() => handleStamp('verified')}
          className="py-1.5 px-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 font-extrabold rounded-xl text-[11px] cursor-pointer hover:scale-105 active:scale-90 transition-all flex items-center justify-center gap-1 shadow-2xs"
          title="Stamp 'VERIFIED FACT!' onto active slide"
        >
          <span>✅ Verified!</span>
        </button>

        <button
          type="button" onClick={() => { playSynthesizedSound('horn'); setFortune(FORTUNES[Math.floor(Math.random() * FORTUNES.length)]); }}
          className="py-1.5 px-1 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-500 hover:to-yellow-400 text-amber-950 border border-amber-400 font-extrabold rounded-xl cursor-pointer text-[11px] flex items-center justify-center gap-1 hover:scale-105 active:scale-90 transition-all shadow-2xs"
          title="Crack Open Classroom Wisdom Fortune Cookie"
        >
          <span className="text-sm animate-bounce">🥠</span><span>Fortune</span>
        </button>
      </div>

      {fortune && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-amber-300 p-5 max-w-sm w-full space-y-3 animate-in zoom-in-95 text-stone-800 text-center">
            <div className="text-4xl animate-bounce">🥠</div>
            <h4 className="font-extrabold text-stone-900 text-base">Classroom Fortune of the Day</h4>
            <p className="text-xs italic text-amber-950 bg-amber-50 p-3 rounded-xl border border-amber-200 font-medium">{fortune}</p>
            <div className="flex items-center gap-2 pt-1">
              <button type="button" onClick={() => setFortune(null)} className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs cursor-pointer">Close</button>
              <button type="button" onClick={() => handleInsertFortuneToSlide(fortune)} className="flex-1 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow-xs cursor-pointer"><Plus className="w-3.5 h-3.5" /><span>Stamp to Slide</span></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
