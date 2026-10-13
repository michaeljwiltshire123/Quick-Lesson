import React from 'react';
import { ElementTextStyle } from '../../../types/slideTypes';
import { ColorPickerButton } from './ColorPickerButton';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link2, PenTool } from 'lucide-react';

interface ToolbarFormatButtonsProps {
  style: ElementTextStyle;
  onFormat: (cmd: string, val?: any, fallbackKey?: string) => void;
  onToggleDraw?: () => void;
  isDrawingActive?: boolean;
}

export const ToolbarFormatButtons: React.FC<ToolbarFormatButtonsProps> = ({
  style, onFormat, onToggleDraw, isDrawingActive,
}) => {
  return (
    <div className="flex items-center gap-0.5">
      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onFormat('bold', undefined, 'bold')} className={`w-7 h-7 flex items-center justify-center rounded cursor-pointer font-black ${style.bold ? 'bg-amber-200 font-bold text-amber-950' : 'hover:bg-stone-200/70'}`} title="Bold"><Bold className="w-3.5 h-3.5" /></button>
      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onFormat('italic', undefined, 'italic')} className={`w-7 h-7 flex items-center justify-center rounded cursor-pointer ${style.italic ? 'bg-amber-200 font-bold text-amber-950' : 'hover:bg-stone-200/70'}`} title="Italic"><Italic className="w-3.5 h-3.5" /></button>
      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onFormat('underline', undefined, 'underline')} className={`w-7 h-7 flex items-center justify-center rounded cursor-pointer ${style.underline ? 'bg-amber-200 font-bold text-amber-950' : 'hover:bg-stone-200/70'}`} title="Underline"><Underline className="w-3.5 h-3.5" /></button>
      <ColorPickerButton type="text" currentColor={style.color || '#000000'} onChangeColor={(color) => onFormat('color', color, 'color')} />
      <ColorPickerButton type="highlight" currentColor={style.highlight || '#FEF08A'} onChangeColor={(highlight) => onFormat('highlight', highlight, 'highlight')} />
      <div className="h-4 w-px bg-stone-300 mx-0.5" />

      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onFormat('justifyLeft', 'left', 'align')} className={`w-7 h-7 flex items-center justify-center rounded cursor-pointer ${style.align === 'left' || !style.align ? 'bg-amber-200 font-bold text-amber-950' : 'hover:bg-stone-200/70 text-stone-700'}`} title="Align Left"><AlignLeft className="w-3.5 h-3.5" /></button>
      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onFormat('justifyCenter', 'center', 'align')} className={`w-7 h-7 flex items-center justify-center rounded cursor-pointer ${style.align === 'center' ? 'bg-amber-200 font-bold text-amber-950' : 'hover:bg-stone-200/70 text-stone-700'}`} title="Align Centre"><AlignCenter className="w-3.5 h-3.5" /></button>
      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onFormat('justifyRight', 'right', 'align')} className={`w-7 h-7 flex items-center justify-center rounded cursor-pointer ${style.align === 'right' ? 'bg-amber-200 font-bold text-amber-950' : 'hover:bg-stone-200/70 text-stone-700'}`} title="Align Right"><AlignRight className="w-3.5 h-3.5" /></button>
      <div className="h-4 w-px bg-stone-300 mx-0.5" />

      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onFormat('createLink', prompt('Enter web link URL:', 'https://') || undefined)} className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-200/70 text-stone-700 cursor-pointer" title="Insert link"><Link2 className="w-3.5 h-3.5" /></button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={onToggleDraw}
        className={`w-7 h-7 flex items-center justify-center rounded cursor-pointer transition-colors ${
          isDrawingActive ? 'bg-amber-800 text-white font-bold shadow-xs' : 'hover:bg-stone-200/70 text-stone-700'
        }`}
        title="Draw & Highlight on Slide"
      >
        <PenTool className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
