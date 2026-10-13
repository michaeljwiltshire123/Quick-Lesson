import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { JoyDockFortuneDrawer } from './JoyDockFortuneDrawer';
import { Stamp, ShieldCheck, Calendar } from 'lucide-react';

interface JoyDockStampsGroupProps {
  onInsertElement: (element: SlideElement) => void;
}

const PRAISE_BADGES = [
  { text: '🌟 Star Pupil Award', fill: '#FEF3C7', border: '#D97706', color: '#78350F' },
  { text: '🎯 Outstanding Focus', fill: '#EFF6FF', border: '#3B82F6', color: '#1E3A8A' },
  { text: '🧠 Master Thinker', fill: '#ECFDF5', border: '#10B981', color: '#064E3B' },
  { text: '🤝 Team Player', fill: '#FDF2F8', border: '#EC4899', color: '#831843' },
];

export const JoyDockStampsGroup: React.FC<JoyDockStampsGroupProps> = ({ onInsertElement }) => {
  const insertStamp = (content: string, fill: string, border: string, color: string, metaType: string) => {
    onInsertElement({
      id: `el-stamp-${Date.now()}`,
      type: 'shape',
      shapeType: 'rounded',
      x: 35, y: 35, width: 32, height: 18,
      content,
      fillColor: fill,
      borderColor: border,
      borderWidth: 2,
      textStyle: { bold: true, align: 'center', fontSize: 11, color },
      meta: { isStamp: true, isPraiseBadge: true, stampType: metaType },
    });
  };

  return (
    <div className="p-2 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
      <div className="flex items-center justify-between text-[11px] font-bold text-stone-800">
        <span className="flex items-center gap-1.5"><Stamp className="w-3.5 h-3.5 text-amber-700" />Stamps</span>
        <span className="text-[10px] text-amber-900 bg-amber-100 font-bold px-1.5 py-0.2 rounded">Animated</span>
      </div>

      <div className="grid grid-cols-2 gap-1">
        <button type="button" onClick={() => insertStamp('🚫 BUSTED!\n(Common Misconception)', '#FEE2E2', '#DC2626', '#991B1B', 'busted')} className="py-1 px-1.5 bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 font-bold rounded-lg text-[10px] cursor-pointer shadow-2xs hover:scale-105 active:scale-95 transition-transform truncate text-center">🚫 BUSTED!</button>
        <button type="button" onClick={() => insertStamp('✅ VERIFIED FACT!\n(Scientific Truth)', '#D1FAE5', '#059669', '#065F46', 'verified')} className="py-1 px-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 font-bold rounded-lg text-[10px] cursor-pointer shadow-2xs hover:scale-105 active:scale-95 transition-transform truncate text-center">✅ VERIFIED FACT</button>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {PRAISE_BADGES.map((b) => (
          <button key={b.text} type="button" onClick={() => insertStamp(b.text, b.fill, b.border, b.color, 'praise')} className="py-1 px-1 bg-white hover:bg-amber-50 text-stone-800 border border-stone-300 font-medium rounded-lg text-[10px] truncate cursor-pointer shadow-2xs hover:scale-105 active:scale-95 transition-transform text-center">{b.text}</button>
        ))}
      </div>

      <JoyDockFortuneDrawer onInsertStamp={onInsertElement} />

      <div className="grid grid-cols-2 gap-1 pt-0.5 border-t border-stone-200/80">
        <button type="button" onClick={() => insertStamp('🏫 Verified Dept Resource', '#F3F4F6', '#9CA3AF', '#4B5563', 'dept')} className="py-1 px-1 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-medium rounded-lg text-[9px] flex items-center justify-center gap-1 cursor-pointer truncate"><ShieldCheck className="w-2.5 h-2.5 text-amber-700 shrink-0" />Dept Badge</button>
        <button type="button" onClick={() => insertStamp(`📅 ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} • Period 1`, '#FEF3C7', '#D97706', '#78350F', 'period')} className="py-1 px-1 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-medium rounded-lg text-[9px] flex items-center justify-center gap-1 cursor-pointer truncate"><Calendar className="w-2.5 h-2.5 text-amber-700 shrink-0" />Period Stamp</button>
      </div>
    </div>
  );
};
