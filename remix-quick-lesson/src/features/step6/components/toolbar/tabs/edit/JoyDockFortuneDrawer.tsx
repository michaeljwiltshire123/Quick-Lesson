import React, { useState } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { Sparkles, Plus, X } from 'lucide-react';

const FORTUNES = [
  '“Mistakes are proof that you are trying.” 🌟',
  '“Every expert was once a beginner.” 🚀',
  '“Curiosity is the wick in the candle of learning.” 🕯️',
  '“Questions are the keys to unlocking understanding.” 🔑',
  '“Small daily improvements lead to stunning results.” 📈',
];

export const JoyDockFortuneDrawer: React.FC<{ onInsertStamp: (el: SlideElement) => void }> = ({ onInsertStamp }) => {
  const [fortune, setFortune] = useState<string | null>(null);

  const handleOpenCookie = () => {
    const quote = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    setFortune(quote);
  };

  const handleInsert = () => {
    if (!fortune) return;
    onInsertStamp({
      id: `el-fortune-${Date.now()}`,
      type: 'shape',
      shapeType: 'rounded',
      x: 25, y: 35, width: 50, height: 22,
      content: `🥠 Classroom Motivator:\n${fortune}`,
      fillColor: '#FEF3C7',
      borderColor: '#F59E0B',
      borderWidth: 2,
      textStyle: { bold: true, italic: true, align: 'center', fontSize: 12, color: '#78350F' },
      meta: { isFortuneStamp: true, isStamp: true },
    });
    setFortune(null);
  };

  return (
    <div className="pt-0.5 space-y-1">
      <button
        type="button" onClick={handleOpenCookie}
        className="w-full py-1 px-2 bg-gradient-to-r from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 text-amber-950 border border-amber-300 font-bold rounded-lg text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-all shadow-2xs"
      >
        <Sparkles className="w-3 h-3 text-amber-700" />
        <span>🥠 Crack Fortune Motivator</span>
      </button>

      {fortune && (
        <div className="p-1.5 bg-amber-50 border border-amber-300 rounded-lg space-y-1 animate-in zoom-in-95">
          <p className="text-[10px] font-medium text-amber-900 italic text-center leading-tight">{fortune}</p>
          <div className="flex gap-1">
            <button type="button" onClick={handleInsert} className="flex-1 py-0.5 bg-amber-700 hover:bg-amber-800 text-white rounded font-bold text-[9px] flex items-center justify-center gap-1 cursor-pointer"><Plus className="w-2.5 h-2.5" />Stamp to Slide</button>
            <button type="button" onClick={() => setFortune(null)} className="px-1 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded text-[9px] cursor-pointer"><X className="w-2.5 h-2.5" /></button>
          </div>
        </div>
      )}
    </div>
  );
};
