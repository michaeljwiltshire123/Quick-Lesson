import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { getSelectedText, replaceSelectedTextWith } from '../canvas/richTextFormatter';
import { FilePenLine, HelpCircle, RefreshCw } from 'lucide-react';

interface FillInBlanksControlProps {
  selectedElement?: SlideElement;
  onUpdateContent: (newContent: string) => void;
}

export const FillInBlanksControl: React.FC<FillInBlanksControlProps> = ({
  selectedElement, onUpdateContent,
}) => {
  const handleClozeSelected = () => {
    const selectedText = getSelectedText();
    if (selectedText && selectedText.trim().length > 0) {
      const blank = `______ [${selectedText.trim().slice(0, 1)}...]`;
      replaceSelectedTextWith(blank, onUpdateContent);
      return;
    }
    const content = selectedElement?.content || '';
    const cloze = content.replace(/\b[A-Za-z]{6,}\b/g, (m) => `_______ [${m.slice(0, 1)}...]`);
    onUpdateContent(cloze);
  };

  const handleCreateWorksheetBlank = () => {
    const selectedText = getSelectedText();
    if (selectedText && selectedText.trim().length > 0) {
      replaceSelectedTextWith('__________________', onUpdateContent);
      return;
    }
    const content = selectedElement?.content || '';
    const blanked = content.replace(/[A-Z][a-z]+/g, '__________________');
    onUpdateContent(blanked);
  };

  return (
    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
          <FilePenLine className="w-3.5 h-3.5 text-amber-800" />
          Fill-in-the-Blanks (Cloze)
        </span>
        <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">Scaffolding</span>
      </div>

      <p className="text-[11px] text-stone-600 leading-relaxed">
        Highlight any word on canvas to turn it into a blank line, or auto-blank key terms for printable pupil worksheets.
      </p>

      <div className="grid grid-cols-2 gap-1.5 pt-1">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleClozeSelected}
          className="py-1.5 px-2 bg-white hover:bg-amber-50 border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 flex items-center justify-center gap-1 cursor-pointer transition-colors"
          title="Convert highlighted word or long terms into blank lines"
        >
          <RefreshCw className="w-3 h-3 text-amber-700" />
          <span>Blank Keywords</span>
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleCreateWorksheetBlank}
          className="py-1.5 px-2 bg-white hover:bg-amber-50 border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 flex items-center justify-center gap-1 cursor-pointer transition-colors"
          title="Turn highlighted word or line into fill-in worksheet line"
        >
          <HelpCircle className="w-3 h-3 text-amber-700" />
          <span>Worksheet Line</span>
        </button>
      </div>
    </div>
  );
};
