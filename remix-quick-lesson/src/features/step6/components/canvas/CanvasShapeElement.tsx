import React, { CSSProperties, useRef, useEffect } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { getShapeContainerClass } from './shapeUtils';
import { GoogleSlidesBoundingBox } from './GoogleSlidesBoundingBox';
import { ResizeDirection } from './resizeHandler';

interface CanvasShapeElementProps {
  element: SlideElement;
  isSelected: boolean;
  animClass?: string;
  animStyle?: CSSProperties;
  onSelect: (e?: React.MouseEvent) => void;
  onUpdateContent: (content: string) => void;
  onStartDrag: (e: React.MouseEvent) => void;
  onStartResize: (e: React.MouseEvent, dir: ResizeDirection) => void;
}

export const CanvasShapeElement: React.FC<CanvasShapeElementProps> = ({
  element, isSelected, animClass, animStyle, onSelect, onUpdateContent, onStartDrag, onStartResize,
}) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const shape = element.shapeType || 'rounded';
  const fill = element.fillColor || '#FEF3C7';
  const borderCol = element.borderColor || '#D97706';
  const borderWidth = element.borderWidth ?? 2;
  const borderStyle = element.borderStyle || 'solid';
  const radius = element.borderRadius ?? (shape === 'rounded' ? 16 : shape === 'circle' ? 9999 : 4);
  const ts = element.textStyle || {};
  const isStamp = Boolean(element.meta?.isStamp || element.meta?.isFortuneStamp || element.meta?.isPraiseBadge || element.meta?.isTeacherWatermark);

  useEffect(() => {
    if (editableRef.current && editableRef.current.innerHTML !== element.content && document.activeElement !== editableRef.current) {
      editableRef.current.innerHTML = element.content || '';
    }
  }, [element.content]);

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSelect(e); }}
      onMouseDown={onStartDrag}
      style={{
        left: `${element.x}%`, top: `${element.y}%`, width: `${element.width}%`, height: `${element.height}%`,
        backgroundColor: fill, borderColor: borderCol, borderWidth: `${borderWidth}px`, borderStyle,
        borderRadius: `${radius}px`,
        ...animStyle,
      }}
      className={`absolute flex items-center justify-center p-3 cursor-move select-none transition-all ${getShapeContainerClass(shape)} ${
        isStamp ? 'animate-in zoom-in-75 fade-in duration-300 shadow-md hover:scale-[1.02]' : ''
      } ${isSelected ? 'z-30 ring-2 ring-blue-500 ring-offset-1' : 'hover:outline hover:outline-1 hover:outline-blue-300 z-10'} ${animClass || ''}`}
    >
      {isSelected && (
        <GoogleSlidesBoundingBox onStartDrag={onStartDrag} onStartResize={onStartResize} />
      )}

      <div
        ref={editableRef} contentEditable suppressContentEditableWarning
        onInput={() => editableRef.current && onUpdateContent(editableRef.current.innerHTML)}
        onBlur={() => editableRef.current && onUpdateContent(editableRef.current.innerHTML)}
        style={{
          fontSize: ts.fontSize ? `${ts.fontSize}px` : '13px',
          fontWeight: ts.bold ? 'bold' : 'normal',
          fontStyle: ts.italic ? 'italic' : 'normal',
          textDecoration: ts.underline ? 'underline' : 'none',
          textAlign: ts.align || 'center', color: ts.color || 'inherit',
          backgroundColor: ts.highlight || 'transparent', fontFamily: ts.fontFamily || 'inherit',
        }}
        className="w-full h-full bg-transparent resize-none border-none focus:outline-none placeholder:text-stone-400 font-medium flex items-center justify-center select-text cursor-text"
      />
    </div>
  );
};
