import React, { useState } from 'react';
import { X, Sparkles, Plus, Trash2, Save } from 'lucide-react';
import { SecretWordCard } from '../types/dontSayItTypes';
import { regenerateSingleTabooCard } from '../services/tabooCardService';

interface Props {
  isOpen: boolean;
  card: SecretWordCard | null;
  lessonTitle: string;
  onSave: (updatedCard: SecretWordCard) => void;
  onClose: () => void;
}

export const TabooCardEditorModal: React.FC<Props> = ({ isOpen, card, lessonTitle, onSave, onClose }) => {
  if (!isOpen || !card) return null;

  const [targetWord, setTargetWord] = useState(card.targetWord);
  const [banned, setBanned] = useState<string[]>([...(card.activeBannedWords?.length ? card.activeBannedWords : card.studentBannedWords || [])]);
  const [hint, setHint] = useState(card.hint || '');
  const [isRerolling, setIsRerolling] = useState(false);

  const handleReroll = async () => {
    setIsRerolling(true);
    const fresh = await regenerateSingleTabooCard(card, lessonTitle);
    setTargetWord(fresh.targetWord);
    setBanned(fresh.activeBannedWords);
    setHint(fresh.hint || '');
    setIsRerolling(false);
  };

  const handleSave = () => {
    onSave({
      ...card,
      targetWord,
      activeBannedWords: banned.filter(Boolean),
      studentBannedWords: banned.filter(Boolean),
      hint,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl max-w-lg w-full p-5 text-gray-900 space-y-3.5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
          <h3 className="font-black text-sm uppercase text-gray-900">Edit Taboo Card</h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"><X className="w-4 h-4" /></button>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Target Word / Concept:</label>
            <input type="text" value={targetWord} onChange={(e) => setTargetWord(e.target.value)} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm" />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Forbidden Taboo Words (3–4):</label>
            <div className="space-y-1.5">
              {banned.map((w, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input type="text" value={w} onChange={(e) => { const next = [...banned]; next[idx] = e.target.value; setBanned(next); }} className="flex-1 p-1.5 bg-rose-50/50 border border-rose-200 rounded-lg text-xs font-semibold text-rose-950" />
                  <button type="button" onClick={() => setBanned(banned.filter((_, i) => i !== idx))} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
              {banned.length < 5 && (
                <button type="button" onClick={() => setBanned([...banned, ''])} className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                  <Plus className="w-3 h-3" /> Add Forbidden Word
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Teacher Hint / Definition Note:</label>
            <input type="text" value={hint} onChange={(e) => setHint(e.target.value)} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 gap-2">
          <button type="button" onClick={handleReroll} disabled={isRerolling} className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer">
            <Sparkles className={`w-3.5 h-3.5 ${isRerolling ? 'animate-spin' : ''}`} />
            <span>AI Re-roll Card</span>
          </button>
          <button type="button" onClick={handleSave} className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-sm">
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
