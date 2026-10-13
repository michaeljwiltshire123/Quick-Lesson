import React, { useState } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { getSelectedText, replaceSelectedTextWith } from '../canvas/richTextFormatter';
import { Gauge, ArrowDownUp, Check } from 'lucide-react';

interface ReadingLevelDifferentiatorProps {
  selectedElement?: SlideElement;
  onUpdateContent: (newContent: string) => void;
}

const TIERS = [
  { id: 'foundation', label: 'Foundation (Simpler)', desc: 'Shorter sentences & core words' },
  { id: 'core', label: 'Core Standard', desc: 'Standard curriculum phrasing' },
  { id: 'higher', label: 'Higher / Extension', desc: 'Advanced academic vocabulary' },
] as const;

export const ReadingLevelDifferentiator: React.FC<ReadingLevelDifferentiatorProps> = ({
  selectedElement, onUpdateContent,
}) => {
  const [activeTier, setActiveTier] = useState<'foundation' | 'core' | 'higher'>('core');

  const applyReadingTier = (tier: 'foundation' | 'core' | 'higher') => {
    setActiveTier(tier);
    const selText = getSelectedText();
    if (selText && selText.trim().length > 0) {
      if (tier === 'foundation') {
        const simplified = selText.replace(/;|, which|although/gi, '.').split('.').map((s) => s.trim()).filter((s) => s.length > 2).slice(0, 2).join('. ') + '.';
        replaceSelectedTextWith(simplified, onUpdateContent);
      } else if (tier === 'higher') {
        const higherText = `${selText} (🔍 Critical Inquiry: Justify primary factors)`;
        replaceSelectedTextWith(higherText, onUpdateContent);
      }
      return;
    }

    const text = selectedElement?.content || '';
    if (!text.trim()) return;
    if (tier === 'foundation') {
      const simplified = text.replace(/;|, which|although/gi, '.').split('.').map((s) => s.trim()).filter((s) => s.length > 3).slice(0, 4).map((s) => `• ${s}.`).join('\n');
      onUpdateContent(simplified || text);
    } else if (tier === 'higher') {
      onUpdateContent(`${text}\n\n🔍 Critical Inquiry: Evaluate the primary causal factors and justify your reasoning.`);
    }
  };

  return (
    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-amber-800" />
          Reading Level Differentiator
        </span>
        <ArrowDownUp className="w-3.5 h-3.5 text-stone-400" />
      </div>

      <div className="grid grid-cols-3 gap-1 pt-1">
        {TIERS.map((t) => (
          <button
            key={t.id}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyReadingTier(t.id)}
            className={`py-1.5 px-1.5 rounded-lg text-center cursor-pointer transition-all border ${
              activeTier === t.id ? 'bg-amber-800 text-white border-amber-900 font-bold shadow-xs' : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
            }`}
            title={t.desc}
          >
            <div className="text-[11px] leading-tight flex items-center justify-center gap-0.5">
              {activeTier === t.id && <Check className="w-2.5 h-2.5 inline" />}
              <span>{t.label.split(' ')[0]}</span>
            </div>
          </button>
        ))}
      </div>
      <p className="text-[10px] text-stone-500 italic">{TIERS.find((t) => t.id === activeTier)?.desc}</p>
    </div>
  );
};
