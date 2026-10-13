import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface FontFamilyDropdownProps {
  currentFont?: string;
  onSelectFont: (font: string) => void;
}

const FONT_OPTIONS = [
  { id: 'Arial, sans-serif', label: 'Arial' },
  { id: 'Inter, sans-serif', label: 'Inter' },
  { id: 'Georgia, serif', label: 'Georgia' },
  { id: 'Comic Sans MS, cursive', label: 'Comic Sans' },
  { id: 'OpenDyslexic, sans-serif', label: 'OpenDyslexic' },
  { id: 'Caveat, cursive', label: 'Handwritten (Caveat)' },
  { id: 'Courier New, monospace', label: 'Courier Mono' },
];

export const FontFamilyDropdown: React.FC<FontFamilyDropdownProps> = ({
  currentFont = 'Arial, sans-serif', onSelectFont,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeLabel = FONT_OPTIONS.find((f) => f.id === currentFont)?.label || 'Arial';

  return (
    <div className="relative">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setIsOpen(!isOpen)}
        className="h-7 px-2 flex items-center gap-1.5 rounded hover:bg-stone-200/70 text-xs text-stone-800 font-medium cursor-pointer transition-colors"
        title="Font Family"
      >
        <span className="truncate max-w-[80px]">{activeLabel}</span>
        <ChevronDown className="w-3 h-3 text-stone-500" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-stone-200 p-1 z-50 space-y-0.5 animate-in fade-in">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font.id}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { onSelectFont(font.id); setIsOpen(false); }}
              style={{ fontFamily: font.id }}
              className="w-full flex items-center justify-between px-2 py-1 text-xs text-stone-800 rounded-lg hover:bg-stone-100 cursor-pointer"
            >
              <span>{font.label}</span>
              {currentFont === font.id && <Check className="w-3.5 h-3.5 text-amber-700" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
