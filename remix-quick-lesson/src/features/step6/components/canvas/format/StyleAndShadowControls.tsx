import React, { useState } from 'react';
import { ElementTextStyle } from '../../../types/slideTypes';
import { applyInlineShadow, applyInlineGlow, hasActiveTextSelection } from '../richTextFormatter';
import { Sparkles, SunMedium, Paintbrush, Check } from 'lucide-react';

interface StyleAndShadowControlsProps {
  textStyle?: ElementTextStyle;
  onUpdateStyle: (patch: Partial<ElementTextStyle>) => void;
  onUpdateContent?: (content: string) => void;
  copiedStyle: ElementTextStyle | null;
  onCopyStyle: (style: ElementTextStyle) => void;
  onPasteStyle: () => void;
}

export const StyleAndShadowControls: React.FC<StyleAndShadowControlsProps> = ({
  textStyle = {}, onUpdateStyle, onUpdateContent, copiedStyle, onCopyStyle, onPasteStyle,
}) => {
  const [justCopied, setJustCopied] = useState(false);

  const handleCopy = () => {
    onCopyStyle(textStyle);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 1500);
  };

  const handleToggleShadow = () => {
    if (hasActiveTextSelection()) {
      applyInlineShadow(undefined, (newContent) => onUpdateContent?.(newContent));
    } else {
      onUpdateStyle({ textShadow: !textStyle.textShadow });
    }
  };

  const handleToggleGlow = () => {
    if (hasActiveTextSelection()) {
      applyInlineGlow((newContent) => onUpdateContent?.(newContent));
    } else {
      onUpdateStyle({ neonGlow: !textStyle.neonGlow });
    }
  };

  return (
    <div className="flex items-center gap-1 border-r border-stone-200 pr-1.5 mr-0.5">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleToggleShadow}
        className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs cursor-pointer transition-colors ${
          textStyle.textShadow ? 'bg-amber-800 text-white font-bold shadow-xs' : 'hover:bg-stone-100 text-stone-700'
        }`}
        title="Apply Soft Shadow to Highlighted Words (or Entire Text Box)"
      >
        <SunMedium className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleToggleGlow}
        className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs cursor-pointer transition-colors ${
          textStyle.neonGlow ? 'bg-amber-500 text-stone-900 font-bold shadow-xs' : 'hover:bg-stone-100 text-stone-700'
        }`}
        title="Apply Neon Glow to Highlighted Words (or Entire Text Box)"
      >
        <Sparkles className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-center gap-0.5 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleCopy}
          className="px-1.5 py-1 flex items-center gap-1 rounded hover:bg-white text-stone-700 hover:text-stone-900 cursor-pointer text-[11px] font-bold"
          title="Format Painter: Copy this text style"
        >
          {justCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Paintbrush className="w-3 h-3 text-amber-700" />}
          <span className="hidden md:inline">{justCopied ? 'Copied' : 'Copy Style'}</span>
        </button>
        {copiedStyle && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onPasteStyle}
            className="px-1.5 py-1 rounded bg-amber-800 text-white hover:bg-amber-900 cursor-pointer text-[11px] font-bold animate-in fade-in"
            title="Paste copied text formatting"
          >
            Paste Style
          </button>
        )}
      </div>
    </div>
  );
};
