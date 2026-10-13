import React, { useState } from 'react';
import { HexTile, GridlockQuestion } from '../types/gridlockTypes';
import { X, Sparkles, Check, HelpCircle } from 'lucide-react';
import { reRollSingleTile } from '../services/gridlockTileService';
import { LessonChunk } from '../../../../../types';

interface Props {
  tile: HexTile | null;
  lessonTitle: string;
  chunks?: LessonChunk[];
  onClose: () => void;
  onSave: (updatedQuestion: GridlockQuestion) => void;
}

export const GridlockTileEditorModal: React.FC<Props> = ({ tile, lessonTitle, chunks = [], onClose, onSave }) => {
  if (!tile) return null;
  const [form, setForm] = useState<GridlockQuestion>({ ...tile.activeQuestion });
  const [isReRolling, setIsReRolling] = useState(false);

  const handleReRoll = async () => {
    setIsReRolling(true);
    const newQuestion = await reRollSingleTile(tile, lessonTitle, chunks);
    setForm(newQuestion);
    setIsReRolling(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-[#FAF8F5] w-full max-w-xl rounded-3xl border border-[#2D2A26]/20 p-5 shadow-2xl space-y-4 text-[#2D2A26]">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-amber-500 text-white font-mono font-black text-lg flex items-center justify-center shadow-xs">
              {tile.letter}
            </span>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wide">Edit Hexagon Clue & Target</h3>
              <p className="text-[11px] text-gray-500">Row {tile.row + 1}, Column {tile.col + 1} • {form.targetAnswer}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/5 cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-bold text-[10px] uppercase text-gray-600 block mb-1">Target Answer Term</label>
            <input type="text" value={form.targetAnswer} onChange={(e) => setForm({ ...form, targetAnswer: e.target.value })} className="w-full p-2 bg-white border border-[#2D2A26]/20 rounded-xl font-bold" />
          </div>
          <div>
            <label className="font-bold text-[10px] uppercase text-gray-600 block mb-1">Bloom's Taxonomy Level</label>
            <select value={form.bloomsLevel || 'Understand'} onChange={(e) => setForm({ ...form, bloomsLevel: e.target.value as any })} className="w-full p-2 bg-white border border-[#2D2A26]/20 rounded-xl font-bold cursor-pointer">
              {['Remember', 'Understand', 'Apply', 'Analyse', 'Evaluate'].map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <label className="font-bold text-[10px] uppercase text-gray-600 block mb-1">Gameshow Primary Clue ("What '{tile.letter}' is...")</label>
            <textarea rows={2} value={form.prompt} onChange={(e) => setForm({ ...form, prompt: e.target.value })} className="w-full p-2 bg-white border border-[#2D2A26]/20 rounded-xl font-medium" />
          </div>
          <div>
            <label className="font-bold text-[10px] uppercase text-gray-600 block mb-1">Secondary Backup Clue (For Steal Buzzes)</label>
            <input type="text" value={form.backupPrompt || ''} onChange={(e) => setForm({ ...form, backupPrompt: e.target.value })} className="w-full p-2 bg-white border border-[#2D2A26]/20 rounded-xl font-medium" />
          </div>
          <div>
            <label className="font-bold text-[10px] uppercase text-gray-600 block mb-1">Acceptable Answer Variants (Comma separated)</label>
            <input type="text" value={form.acceptableAnswers.join(', ')} onChange={(e) => setForm({ ...form, acceptableAnswers: e.target.value.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean) })} className="w-full p-2 bg-white border border-[#2D2A26]/20 rounded-xl font-mono text-[11px]" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#2D2A26]/10">
          <button type="button" disabled={isReRolling} onClick={handleReRoll} className="py-2 px-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isReRolling ? 'Synthesising...' : 'Re-extract Single Tile ✨'}</span>
          </button>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onClose} className="py-2 px-3 border border-[#2D2A26]/20 rounded-xl text-xs font-bold hover:bg-black/5 cursor-pointer">Cancel</button>
            <button type="button" onClick={() => onSave(form)} className="py-2 px-4 bg-[#2D2A26] hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs">
              <Check className="w-3.5 h-3.5" />
              <span>Save Tile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
