import React from 'react';
import { ElementTextStyle } from '../../../types/slideTypes';
import { BookOpen, CaseUpper, CaseLower, CaseSensitive } from 'lucide-react';

interface FontAndCaseControlsProps {
  textStyle?: ElementTextStyle;
  onUpdateStyle: (patch: Partial<ElementTextStyle>) => void;
  onConvertContentCase: (casing: 'uppercase' | 'lowercase' | 'capitalize') => void;
}

export const FontAndCaseControls: React.FC<FontAndCaseControlsProps> = ({
  textStyle = {}, onUpdateStyle, onConvertContentCase,
}) => {
  const isDyslexic = textStyle.fontFamily === 'OpenDyslexic, sans-serif' || textStyle.fontFamily === 'Lexend, sans-serif';

  const toggleDyslexiaFont = () => {
    onUpdateStyle({
      fontFamily: isDyslexic ? 'Arial, sans-serif' : 'OpenDyslexic, sans-serif',
      letterSpacing: isDyslexic ? 0 : 0.8,
      lineHeight: isDyslexic ? 1.35 : 1.6,
    });
  };

  return (
    <div className="flex items-center gap-1 border-r border-stone-200 pr-1.5 mr-0.5">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={toggleDyslexiaFont}
        className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
          isDyslexic ? 'bg-amber-800 text-white shadow-xs' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
        }`}
        title="Toggle Dyslexia-friendly font & spacing"
      >
        <BookOpen className="w-3.5 h-3.5" />
        <span className="text-[11px] hidden sm:inline">Dyslexia Font</span>
      </button>

      <div className="flex items-center gap-0.5 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onConvertContentCase('uppercase')}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-stone-700 hover:text-stone-900 cursor-pointer text-xs"
          title="Convert to ALL UPPERCASE"
        >
          <CaseUpper className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onConvertContentCase('lowercase')}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-stone-700 hover:text-stone-900 cursor-pointer text-xs"
          title="Convert to all lowercase"
        >
          <CaseLower className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onConvertContentCase('capitalize')}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-stone-700 hover:text-stone-900 cursor-pointer text-xs"
          title="Convert to Title Case"
        >
          <CaseSensitive className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
