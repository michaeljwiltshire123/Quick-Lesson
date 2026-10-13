import React, { useState } from 'react';
import { HexTile, GridlockQuestion } from '../types/gridlockTypes';
import { Check, Replace } from 'lucide-react';
import { createDefaultTileQuestion } from '../services/gridlockTileService';

interface Props {
  grid: HexTile[][];
  onReplaceTile: (row: number, col: number, question: GridlockQuestion) => void;
}

export const CustomTileCreatorCard: React.FC<Props> = ({ grid, onReplaceTile }) => {
  const [selectedLetter, setSelectedLetter] = useState('M');
  const [customWord, setCustomWord] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [targetCoord, setTargetCoord] = useState<{ r: number; c: number }>({ r: 0, c: 0 });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWord.trim()) return;
    const baseQuestion = createDefaultTileQuestion(selectedLetter, customWord);
    const customQuestion: GridlockQuestion = {
      ...baseQuestion,
      prompt: customPrompt.trim() || `What '${selectedLetter.toUpperCase()}' is ${customWord}?`,
      acceptableAnswers: [customWord.trim().toLowerCase(), `${customWord.trim().toLowerCase()}s`],
    };
    onReplaceTile(targetCoord.r, targetCoord.c, customQuestion);
    setCustomWord('');
    setCustomPrompt('');
  };

  const allTiles = (grid || []).flatMap((row) => row || []);

  return (
    <div className="bg-white p-4 rounded-2xl border border-[#2D2A26]/15 shadow-xs space-y-3">
      <div className="flex items-center gap-2 border-b border-[#2D2A26]/10 pb-2">
        <Replace className="w-4 h-4 text-amber-600" />
        <h4 className="text-xs font-black uppercase text-[#2D2A26] tracking-wider">
          Custom Tile Creator (Replace Rare Letters)
        </h4>
      </div>

      <form onSubmit={handleApply} className="space-y-3 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="font-bold text-[10px] uppercase text-gray-500 block mb-1">Target Letter</label>
            <input type="text" maxLength={2} value={selectedLetter} onChange={(e) => setSelectedLetter(e.target.value.toUpperCase() || 'A')} className="w-full p-2 bg-[#FAF8F5] border border-[#2D2A26]/20 rounded-xl font-mono font-black text-center text-sm" />
          </div>
          <div>
            <label className="font-bold text-[10px] uppercase text-gray-500 block mb-1">Replace At Position</label>
            <select value={`${targetCoord.r}-${targetCoord.c}`} onChange={(e) => { const [r, c] = e.target.value.split('-').map(Number); setTargetCoord({ r, c }); }} className="w-full p-2 bg-[#FAF8F5] border border-[#2D2A26]/20 rounded-xl font-bold cursor-pointer">
              {allTiles.map((t) => (
                <option key={`opt-${t.row}-${t.col}`} value={`${t.row}-${t.col}`}>
                  Hex [{t.row + 1},{t.col + 1}]: Current '{t.letter}' ({(t.activeQuestion?.targetAnswer || t.letter || '').slice(0, 10)})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-bold text-[10px] uppercase text-gray-500 block mb-1">Target Answer Term</label>
            <input type="text" placeholder="e.g. Mitochondria" value={customWord} onChange={(e) => setCustomWord(e.target.value)} className="w-full p-2 bg-[#FAF8F5] border border-[#2D2A26]/20 rounded-xl font-bold" />
          </div>
        </div>

        <div>
          <label className="font-bold text-[10px] uppercase text-gray-500 block mb-1">Custom Clue Prompt</label>
          <div className="flex gap-2">
            <input type="text" placeholder="What 'M' is the powerhouse of the cell?" value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)} className="flex-1 p-2 bg-[#FAF8F5] border border-[#2D2A26]/20 rounded-xl" />
            <button type="submit" disabled={!customWord.trim()} className="py-2 px-4 bg-[#2D2A26] hover:bg-black text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer disabled:opacity-40 shadow-xs shrink-0">
              <Check className="w-3.5 h-3.5" /> <span>Insert Hex</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
