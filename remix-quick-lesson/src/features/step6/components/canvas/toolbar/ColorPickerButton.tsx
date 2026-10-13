import React, { useState } from 'react';
import { PaintBucket, Pencil, Highlighter } from 'lucide-react';

interface ColorPickerButtonProps {
  type: 'fill' | 'border' | 'text' | 'highlight';
  currentColor?: string;
  onChangeColor: (color: string) => void;
}

const PRESET_COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF',
  '#980000', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF',
  '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
  '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
  '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
];

export const ColorPickerButton: React.FC<ColorPickerButtonProps> = ({
  type, currentColor = '#000000', onChangeColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isTransparent = currentColor === 'transparent';

  return (
    <div className="relative">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setIsOpen(!isOpen)}
        className="w-7 h-7 flex flex-col items-center justify-center rounded hover:bg-stone-200/70 text-stone-700 cursor-pointer"
        title={type === 'fill' ? 'Fill colour' : type === 'border' ? 'Border colour' : type === 'text' ? 'Text colour' : 'Highlight colour'}
      >
        {type === 'fill' && <PaintBucket className="w-3.5 h-3.5" />}
        {type === 'border' && <Pencil className="w-3.5 h-3.5" />}
        {type === 'highlight' && <Highlighter className="w-3.5 h-3.5" />}
        {type === 'text' && <span className="text-xs font-black">A</span>}
        <span style={{ backgroundColor: isTransparent ? '#E5E7EB' : currentColor }} className="w-4 h-1 rounded-full mt-0.5" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 p-2 bg-white rounded-xl shadow-xl border border-stone-200 z-50 w-56 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between pb-1 border-b border-stone-100">
            <span className="text-[10px] font-bold text-stone-600 uppercase">{type} Colour</span>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { onChangeColor('transparent'); setIsOpen(false); }}
              className="text-[10px] font-bold text-amber-800 hover:underline cursor-pointer"
            >
              Transparent
            </button>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {PRESET_COLORS.map((c, i) => (
              <button
                key={`${c}-${i}`}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { onChangeColor(c); setIsOpen(false); }}
                style={{ backgroundColor: c }}
                className="w-4 h-4 rounded-xs border border-stone-300 hover:scale-125 transition-transform cursor-pointer"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
