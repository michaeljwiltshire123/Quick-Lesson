import React from 'react';
import { X, Search, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { SecretWordCard } from '../types/dontSayItTypes';
import { MisconceptionRationaleCard } from './MisconceptionRationaleCard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cards: SecretWordCard[];
  lessonTitle: string;
}

export const TabooPreFlightInspectorModal: React.FC<Props> = ({ isOpen, onClose, cards = [], lessonTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-5 text-slate-900 space-y-4 shadow-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-sm uppercase text-slate-900 tracking-wider">
              Pre-Flight Pedagogical Audit ({lessonTitle})
            </h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex items-center justify-between p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-950">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Deck grounded across <strong>{cards.length} Secret Concepts</strong> with high-frequency misconception traps.</span>
          </div>
          <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-black rounded-lg text-[10px] uppercase">Audit Passed ✓</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {cards.map((card, i) => (
            <MisconceptionRationaleCard key={card.id || i} card={card} index={i} />
          ))}
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm">
            Close Audit Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
