import React, { useState } from 'react';
import { Eye, EyeOff, Smile, Image as ImageIcon, HelpCircle, Volume2 } from 'lucide-react';
import { WordBreakdownItem, ClueType } from './types';
import { LetterSlots } from './LetterSlots';
import { NanoBananaImageGenerator } from './NanoBananaImageGenerator';
import { resolveRebus } from './rebusGenerator';

interface Props {
  item: WordBreakdownItem;
  onUpdateClueType: (id: string, type: ClueType) => void;
  onUpdateImage?: (id: string, url: string) => void;
  globalRevealed?: boolean;
}

export const WordPuzzleCard: React.FC<Props> = ({ item, onUpdateClueType, onUpdateImage, globalRevealed }) => {
  const [localRevealed, setLocalRevealed] = useState(false);
  const isRevealed = globalRevealed !== undefined ? globalRevealed : localRevealed;
  const { rebus: activeRebus, hint: activeHint } = resolveRebus(item, 'phonetic');

  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2 border-b border-[#2D2A26]/10 pb-2">
        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-[#D97706] border border-amber-500/20">
          <Volume2 className="w-3 h-3" /> {item.phonetics}
        </span>
        <button
          type="button"
          onClick={() => setLocalRevealed(!localRevealed)}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
            isRevealed ? 'bg-emerald-100 text-emerald-800' : 'bg-[#F8F6F0] text-[#2D2A26]/80 hover:bg-black/5'
          }`}
        >
          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {isRevealed ? 'Conceal' : 'Reveal'}
        </button>
      </div>

      <div className="flex bg-[#F8F6F0] p-1 rounded-xl border border-[#2D2A26]/10 gap-1">
        {(['rebus', 'image', 'riddle'] as ClueType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onUpdateClueType(item.id, type)}
            className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all capitalize ${
              item.puzzleType === type ? 'bg-white text-[#D97706] shadow-2xs font-bold' : 'text-[#2D2A26]/70 hover:text-[#2D2A26]'
            }`}
          >
            {type === 'rebus' && <Smile className="w-3.5 h-3.5" />}
            {type === 'image' && <ImageIcon className="w-3.5 h-3.5" />}
            {type === 'riddle' && <HelpCircle className="w-3.5 h-3.5" />}
            {type}
          </button>
        ))}
      </div>

      <div className="min-h-[85px] flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-[#F8F6F0]/80 to-white border border-[#2D2A26]/10 text-center gap-1.5">
        {item.puzzleType === 'rebus' && (
          <>
            <div className="text-2xl sm:text-3xl tracking-widest font-bold py-1 select-none animate-in fade-in duration-150">{activeRebus}</div>
            {isRevealed && activeHint && (
              <span className="text-[11px] font-semibold text-[#D97706] bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 animate-in fade-in">
                {activeHint}
              </span>
            )}
          </>
        )}
        {item.puzzleType === 'image' && (
          <div className="w-full space-y-2">
            <p className="text-xs text-[#2D2A26]/85 italic line-clamp-2">"{item.imagePrompt}"</p>
            <NanoBananaImageGenerator
              term={item.term} rebus={activeRebus} clue={item.imagePrompt}
              currentImageUrl={item.imageUrl} onImageGenerated={(url) => onUpdateImage?.(item.id, url)}
            />
          </div>
        )}
        {item.puzzleType === 'riddle' && (
          <p className="text-xs sm:text-sm font-medium text-[#2D2A26] italic leading-relaxed whitespace-pre-line">"{item.riddleClue}"</p>
        )}
      </div>

      <LetterSlots term={item.term} isRevealed={isRevealed} />
    </div>
  );
};
