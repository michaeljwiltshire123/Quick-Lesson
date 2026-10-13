import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { ElementAnimationPicker } from './ElementAnimationPicker';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Palette, Square } from 'lucide-react';

interface GoogleSlidesFormatBarProps {
  selectedElement?: SlideElement;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
}

export const GoogleSlidesFormatBar: React.FC<GoogleSlidesFormatBarProps> = ({
  selectedElement, onUpdateElement,
}) => {
  if (!selectedElement) return null;
  const style = selectedElement.textStyle || {};

  const toggleStyle = (key: keyof typeof style, val: any) => {
    onUpdateElement({ textStyle: { ...style, [key]: style[key] === val ? undefined : val } });
  };

  return (
    <div className="flex items-center flex-wrap gap-1.5 p-1.5 bg-stone-900/90 text-white rounded-2xl shadow-xl backdrop-blur-md border border-stone-700 text-xs">
      <div className="flex items-center gap-1 pr-2 border-r border-stone-700">
        <label className="flex items-center gap-1 cursor-pointer p-1 rounded hover:bg-stone-800" title="Fill Colour">
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <input
            type="color" value={selectedElement.fillColor === 'transparent' ? '#FFFFFF' : (selectedElement.fillColor || '#FFFFFF')}
            onChange={(e) => onUpdateElement({ fillColor: e.target.value })}
            className="w-4 h-4 rounded border-none bg-transparent cursor-pointer"
          />
        </label>
        <button
          type="button" onClick={() => onUpdateElement({ fillColor: 'transparent' })}
          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${selectedElement.fillColor === 'transparent' ? 'bg-amber-600 text-white' : 'hover:bg-stone-800 text-stone-300'}`}
          title="Transparent Fill"
        >
          Transp
        </button>
        <label className="flex items-center gap-1 cursor-pointer p-1 rounded hover:bg-stone-800" title="Border Colour">
          <Square className="w-3.5 h-3.5 text-stone-300" />
          <input
            type="color" value={selectedElement.borderColor || '#D97706'}
            onChange={(e) => onUpdateElement({ borderColor: e.target.value, borderWidth: selectedElement.borderWidth || 2 })}
            className="w-4 h-4 rounded border-none bg-transparent cursor-pointer"
          />
        </label>
        <select
          value={selectedElement.borderWidth ?? 0}
          onChange={(e) => onUpdateElement({ borderWidth: parseInt(e.target.value) || 0 })}
          className="bg-stone-800 text-[10px] rounded px-1 py-1 text-stone-200 border border-stone-700 focus:outline-none"
        >
          <option value={0}>0px</option><option value={1}>1px</option><option value={2}>2px</option><option value={4}>4px</option>
        </select>
      </div>

      <div className="flex items-center gap-0.5 pr-2 border-r border-stone-700">
        <button type="button" onClick={() => toggleStyle('bold', true)} className={`p-1 rounded cursor-pointer ${style.bold ? 'bg-amber-600 text-white' : 'hover:bg-stone-800 text-stone-300'}`}><Bold className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => toggleStyle('italic', true)} className={`p-1 rounded cursor-pointer ${style.italic ? 'bg-amber-600 text-white' : 'hover:bg-stone-800 text-stone-300'}`}><Italic className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => toggleStyle('underline', true)} className={`p-1 rounded cursor-pointer ${style.underline ? 'bg-amber-600 text-white' : 'hover:bg-stone-800 text-stone-300'}`}><Underline className="w-3.5 h-3.5" /></button>
      </div>

      <div className="flex items-center gap-0.5 pr-2 border-r border-stone-700">
        <button type="button" onClick={() => toggleStyle('align', 'left')} className={`p-1 rounded cursor-pointer ${style.align === 'left' ? 'bg-amber-600' : 'hover:bg-stone-800 text-stone-300'}`}><AlignLeft className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => toggleStyle('align', 'center')} className={`p-1 rounded cursor-pointer ${style.align === 'center' ? 'bg-amber-600' : 'hover:bg-stone-800 text-stone-300'}`}><AlignCenter className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => toggleStyle('align', 'right')} className={`p-1 rounded cursor-pointer ${style.align === 'right' ? 'bg-amber-600' : 'hover:bg-stone-800 text-stone-300'}`}><AlignRight className="w-3.5 h-3.5" /></button>
      </div>

      <ElementAnimationPicker
        selectedElement={selectedElement}
        onUpdateElementMeta={(meta) => onUpdateElement({ meta })}
      />
    </div>
  );
};
