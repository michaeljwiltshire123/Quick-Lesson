import React, { useState } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { formatSelectedText } from '../canvas/richTextFormatter';
import { Bold, Sparkles, Check } from 'lucide-react';

interface AutoBoldVocabularyProps {
  selectedElement?: SlideElement;
  onUpdateContent: (newContent: string) => void;
}

const COMMON_ACADEMIC_KEYWORDS = [
  'photosynthesis', 'hypothesis', 'equation', 'chronology', 'analyze', 'evaluate', 'analyse',
  'catalyst', 'evidence', 'factor', 'metaphor', 'respiration', 'momentum', 'equilibrium',
  'consequence', 'perspective', 'interpretation', 'correlation', 'variable', 'methodology',
  'structure', 'function', 'impact', 'process', 'definition', 'compare', 'contrast',
];

export const AutoBoldVocabulary: React.FC<AutoBoldVocabularyProps> = ({
  selectedElement, onUpdateContent,
}) => {
  const [highlightedCount, setHighlightedCount] = useState<number | null>(null);

  const handleAutoBold = () => {
    // If text is highlighted, bold ONLY the highlighted words!
    const formatted = formatSelectedText('bold', undefined, onUpdateContent);
    if (formatted) {
      setHighlightedCount(1);
      setTimeout(() => setHighlightedCount(null), 3000);
      return;
    }

    // Otherwise, scan and bold vocabulary across entire text box
    const raw = selectedElement?.content || '';
    if (!raw.trim()) return;

    let count = 0;
    let result = raw;
    COMMON_ACADEMIC_KEYWORDS.forEach((kw) => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
      if (regex.test(result)) {
        result = result.replace(regex, (match) => { count++; return `<b>${match}</b>`; });
      }
    });

    result = result.replace(/\b([A-Z]{3,})\b/g, (match) => { count++; return `<b>${match}</b>`; });
    setHighlightedCount(count);
    onUpdateContent(result);
    setTimeout(() => setHighlightedCount(null), 3000);
  };

  return (
    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
          <Bold className="w-3.5 h-3.5 text-amber-800" />
          Auto-Bold Subject Vocabulary
        </span>
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
      </div>

      <p className="text-[11px] text-stone-600 leading-relaxed">
        Highlight specific words to bold them, or scan the entire slide text box to bold academic vocabulary.
      </p>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleAutoBold}
        className="w-full py-1.5 px-3 bg-white hover:bg-amber-50 border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
      >
        {highlightedCount !== null ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">{highlightedCount} term(s) emphasised!</span>
          </>
        ) : (
          <>
            <Bold className="w-3.5 h-3.5 text-amber-800" />
            <span>Bold Highlighted / Vocabulary</span>
          </>
        )}
      </button>
    </div>
  );
};
