import React, { useState, useEffect } from 'react';
import { SlideElement } from '../../../types/slideTypes';
import { FontFamilyDropdown } from './FontFamilyDropdown';
import { FontSizeStepper } from './FontSizeStepper';
import { ColorPickerButton } from './ColorPickerButton';
import { BorderControlsDropdown } from './BorderControlsDropdown';
import { ImageToolbarControls } from './ImageToolbarControls';
import { ToolbarSpacingAndBullets } from './ToolbarSpacingAndBullets';
import { ToolbarFormatButtons } from './ToolbarFormatButtons';
import { formatSelectedText, hasActiveTextSelection, getSelectedFontSize, stripInlineFontSize } from '../richTextFormatter';
import { MousePointer2, Type, Shapes, CornerDownRight, Undo2, Redo2 } from 'lucide-react';

interface GoogleSlidesMasterToolbarProps {
  selectedElement?: SlideElement;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onInsertText: () => void;
  onInsertShape: () => void;
  onInsertConnector: () => void;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
  onOpenCrop?: () => void;
  onResetOrReplaceImage?: () => void;
  onAddComment?: () => void;
  onToggleDraw?: () => void;
  isDrawingActive?: boolean;
}

export const GoogleSlidesMasterToolbar: React.FC<GoogleSlidesMasterToolbarProps> = ({
  selectedElement, canUndo, canRedo, onUndo, onRedo, onInsertText, onInsertShape, onInsertConnector, onUpdateElement,
  onOpenCrop, onResetOrReplaceImage, onAddComment, onToggleDraw, isDrawingActive,
}) => {
  const style = selectedElement?.textStyle || {};
  const [selFontSize, setSelFontSize] = useState<number | null>(null);

  useEffect(() => {
    const handleSel = () => setSelFontSize(getSelectedFontSize());
    document.addEventListener('selectionchange', handleSel);
    return () => document.removeEventListener('selectionchange', handleSel);
  }, []);

  const displayFontSize = selFontSize ?? style.fontSize ?? 18;

  const handleFormat = (cmd: string, val?: any, fallbackKey?: string) => {
    if (hasActiveTextSelection()) {
      formatSelectedText(cmd, val, (newContent) => onUpdateElement({ content: newContent }));
      return;
    }
    if (fallbackKey) {
      onUpdateElement({ textStyle: { ...style, [fallbackKey]: (style as any)[fallbackKey] === val ? undefined : val } });
    }
  };

  const handleSizeChange = (newSize: number) => {
    if (hasActiveTextSelection()) {
      formatSelectedText('fontSize', `${newSize}`, (newContent) => onUpdateElement({ content: newContent }));
      setSelFontSize(newSize);
    } else {
      const cleaned = stripInlineFontSize(selectedElement?.content || '');
      onUpdateElement({ content: cleaned, textStyle: { ...style, fontSize: newSize } });
    }
  };

  const handleInsertBullet = (symbol: string) => {
    if (!selectedElement) return;
    const lines = (selectedElement.content || '').split('\n');
    const bulleted = lines.map((l) => (l.trim().startsWith(symbol.trim()) ? l : `${symbol}${l}`)).join('\n');
    onUpdateElement({ content: bulleted });
  };

  return (
    <div className="flex items-center flex-wrap gap-0.5 px-2 py-1 bg-stone-100/90 border border-stone-300 rounded-xl shadow-xs text-xs text-stone-700 select-none">
      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onUndo} disabled={!canUndo} className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-200/70 text-stone-700 disabled:opacity-30 cursor-pointer" title="Undo (Ctrl+Z)"><Undo2 className="w-3.5 h-3.5" /></button>
      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onRedo} disabled={!canRedo} className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-200/70 text-stone-700 disabled:opacity-30 cursor-pointer" title="Redo (Ctrl+Y)"><Redo2 className="w-3.5 h-3.5" /></button>
      <div className="h-4 w-px bg-stone-300 mx-0.5" />
      <button type="button" className="w-7 h-7 flex items-center justify-center rounded bg-blue-100 text-blue-700 font-bold cursor-pointer" title="Select (V)"><MousePointer2 className="w-3.5 h-3.5 fill-current" /></button>
      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onInsertText} className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-200/70 text-stone-700 cursor-pointer" title="Text box (T)"><Type className="w-3.5 h-3.5" /></button>
      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onInsertShape} className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-200/70 text-stone-700 cursor-pointer" title="Insert shape"><Shapes className="w-3.5 h-3.5" /></button>
      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onInsertConnector} className="w-7 h-7 flex items-center justify-center rounded hover:bg-stone-200/70 text-stone-700 cursor-pointer" title="Line / Connector"><CornerDownRight className="w-3.5 h-3.5" /></button>
      <div className="h-4 w-px bg-stone-300 mx-1" />

      <ColorPickerButton type="fill" currentColor={selectedElement?.fillColor || 'transparent'} onChangeColor={(fillColor) => onUpdateElement({ fillColor })} />
      <ColorPickerButton type="border" currentColor={selectedElement?.borderColor || '#D97706'} onChangeColor={(borderColor) => onUpdateElement({ borderColor, borderWidth: selectedElement?.borderWidth || 1 })} />
      <BorderControlsDropdown currentWeight={selectedElement?.borderWidth} onChangeWeight={(borderWidth) => onUpdateElement({ borderWidth })} />
      <div className="h-4 w-px bg-stone-300 mx-1" />

      <FontFamilyDropdown currentFont={style.fontFamily} onSelectFont={(font) => handleFormat('font', font, 'fontFamily')} />
      <FontSizeStepper currentSize={displayFontSize} onChangeSize={handleSizeChange} />
      <div className="h-4 w-px bg-stone-300 mx-1" />

      <ToolbarFormatButtons style={style} onFormat={handleFormat} onToggleDraw={onToggleDraw} isDrawingActive={isDrawingActive} />
      <div className="h-4 w-px bg-stone-300 mx-0.5" />

      <ToolbarSpacingAndBullets textStyle={style} onUpdateStyle={(p) => onUpdateElement({ textStyle: { ...style, ...p } })} onInsertBullet={handleInsertBullet} />

      <ImageToolbarControls
        selectedElement={selectedElement}
        onOpenCrop={() => onOpenCrop?.()}
        onUpdateMask={(m, isInverted, customPath, scale, x, y, isMaskEditing) => onUpdateElement({ meta: { ...(selectedElement?.meta || {}), maskShape: m, isInvertedMask: Boolean(isInverted), customPath, maskScale: scale, maskX: x, maskY: y, isMaskEditing: Boolean(isMaskEditing) } })}
        onResetOrReplaceImage={() => onResetOrReplaceImage?.()}
        onAddComment={() => onAddComment?.()}
      />
    </div>
  );
};
