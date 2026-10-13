import React from 'react';
import { BookOpenCheck, Sparkles } from 'lucide-react';
import { SlideElement } from '../../types/slideTypes';

interface ReadingLevelToggleProps {
  elements: SlideElement[];
  onUpdateElements: (elements: SlideElement[]) => void;
}

export const ReadingLevelToggle: React.FC<ReadingLevelToggleProps> = ({
  elements,
  onUpdateElements,
}) => {
  const currentLevel = elements[0]?.meta?.readingLevel || 'core';

  const setReadingLevel = (level: 'foundational' | 'core' | 'stretch') => {
    const updated = elements.map((el) => {
      if (el.type !== 'text') return el;
      return {
        ...el,
        meta: { ...(el.meta || {}), readingLevel: level },
      };
    });
    onUpdateElements(updated);
  };

  return (
    <div className="space-y-2 pt-3 border-t border-stone-100">
      <div className="flex items-center justify-between pb-1 border-b border-stone-100">
        <div className="flex items-center gap-1.5">
          <BookOpenCheck className="w-4 h-4 text-amber-700" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">Differentiated Reading</h3>
        </div>
        <span className="text-[10px] text-stone-500 font-medium">1-Click Tier</span>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        <button
          type="button"
          onClick={() => setReadingLevel('foundational')}
          className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            currentLevel === 'foundational' ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-2xs' : 'bg-white border-stone-200 text-stone-600'
          }`}
        >
          Foundational
        </button>
        <button
          type="button"
          onClick={() => setReadingLevel('core')}
          className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            currentLevel === 'core' ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-2xs' : 'bg-white border-stone-200 text-stone-600'
          }`}
        >
          Core
        </button>
        <button
          type="button"
          onClick={() => setReadingLevel('stretch')}
          className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            currentLevel === 'stretch' ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-2xs' : 'bg-white border-stone-200 text-stone-600'
          }`}
        >
          <span className="flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-700" /> Stretch
          </span>
        </button>
      </div>

      <p className="text-[10px] text-stone-500 italic">
        {currentLevel === 'foundational'
          ? 'Clear short sentences, highlighted key terms for accessible learning.'
          : currentLevel === 'stretch'
          ? 'Enhanced academic vocabulary and deeper inquiry prompts.'
          : 'Standard curriculum grade-level phrasing.'}
      </p>
    </div>
  );
};
