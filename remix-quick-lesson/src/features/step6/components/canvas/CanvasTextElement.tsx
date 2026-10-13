import React, { CSSProperties, useRef, useEffect } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { calculateAutoFitFontSize } from './canvasUtils';
import { recordSelection } from './richTextFormatter';
import { GoogleSlidesBoundingBox } from './GoogleSlidesBoundingBox';
import { ResizeDirection } from './resizeHandler';
import { getTextEffectStyles } from './textEffectStyles';

interface CanvasTextElementProps {
  element: SlideElement;
  isSelected: boolean;
  animClass?: string;
  animStyle?: CSSProperties;
  onSelect: (e?: React.MouseEvent) => void;
  onUpdateContent: (content: string) => void;
  onUpdateElement?: (patch: Partial<SlideElement>) => void;
  onStartDrag: (e: React.MouseEvent) => void;
  onStartResize: (e: React.MouseEvent, dir: ResizeDirection) => void;
}

export const CanvasTextElement: React.FC<CanvasTextElementProps> = ({
  element, isSelected, animClass, animStyle, onSelect, onUpdateContent, onStartDrag, onStartResize,
}) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const autoFontSize = calculateAutoFitFontSize(element.content.length, element.width, element.height);
  const ts = (element.textStyle || {}) as any;
  const fill = element.fillColor || 'transparent';
  const borderCol = element.borderColor || 'transparent';
  const borderWidth = element.borderWidth ?? 0;
  const effectStyles = getTextEffectStyles(ts);

  useEffect(() => {
    if (editableRef.current && editableRef.current.innerHTML !== element.content && document.activeElement !== editableRef.current) {
      editableRef.current.innerHTML = element.content || '';
    }
  }, [element.content]);

  useEffect(() => {
    if (isSelected && editableRef.current && document.activeElement !== editableRef.current) {
      editableRef.current.focus();
    }
  }, [isSelected]);

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSelect(e); }}
      style={{
        left: `${element.x}%`, top: `${element.y}%`, width: `${element.width}%`, height: `${element.height}%`,
        backgroundColor: fill, borderColor: borderCol, borderWidth: `${borderWidth}px`, borderStyle: element.borderStyle || 'solid',
        borderRadius: `${element.borderRadius || 0}px`,
        ...animStyle,
      }}
      className={`absolute group select-none pointer-events-auto ${isSelected ? 'z-30' : 'hover:outline hover:outline-1 hover:outline-blue-300 z-10'} ${animClass || ''}`}
    >
      {isSelected && (
        <GoogleSlidesBoundingBox onStartDrag={onStartDrag} onStartResize={onStartResize} />
      )}

      <div className="w-full h-full p-1.5 overflow-hidden flex items-center justify-center">
        <div
          ref={editableRef} contentEditable suppressContentEditableWarning
          onInput={() => editableRef.current && onUpdateContent(editableRef.current.innerHTML)}
          onBlur={() => editableRef.current && onUpdateContent(editableRef.current.innerHTML)}
          onMouseUp={() => recordSelection(element.id)}
          onKeyUp={() => recordSelection(element.id)}
          onSelect={() => recordSelection(element.id)}
          style={{
            fontSize: ts.fontSize ? `${ts.fontSize}px` : `${autoFontSize}px`,
            lineHeight: ts.lineHeight || 1.35, letterSpacing: ts.letterSpacing ? `${ts.letterSpacing}px` : undefined,
            fontWeight: ts.bold !== undefined ? (ts.bold ? 'bold' : 'normal') : (element.id === 'el-title-h1' ? 'bold' : undefined),
            fontStyle: ts.italic !== undefined ? (ts.italic ? 'italic' : 'normal') : (element.id === 'el-title-sub' ? 'italic' : undefined),
            textDecoration: ts.underline ? 'underline' : undefined,
            textAlign: ts.align || (element.id?.includes('title') ? 'center' : 'left'),
            color: ts.color || undefined, backgroundColor: ts.highlight || 'transparent',
            fontFamily: ts.fontFamily || 'inherit',
            ...effectStyles,
          }}
          className="w-full h-full whitespace-pre-wrap break-words bg-transparent focus:outline-none placeholder:text-stone-400 font-medium select-text cursor-text"
        />
        {element.meta?.linkUrl && (
          <a href={element.meta.linkUrl} target="_blank" rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="absolute bottom-2 right-2 z-40 rounded-lg bg-amber-800 px-3 py-1.5 text-xs font-bold text-white shadow">
            Open resource
          </a>
        )}
      </div>
    </div>
  );
};
