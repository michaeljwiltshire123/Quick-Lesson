import React from 'react';
import { GlossaryItem } from '../../types/slideTypes';
import { BookOpen, Plus, Trash2 } from 'lucide-react';

interface GlossarySectionProps {
  glossary: GlossaryItem[];
  onUpdate: (glossary: GlossaryItem[]) => void;
}

export const GlossarySection: React.FC<GlossarySectionProps> = ({ glossary, onUpdate }) => {
  const handleAdd = () => onUpdate([...glossary, { term: '', definition: '' }]);
  const handleEdit = (idx: number, patch: Partial<GlossaryItem>) =>
    onUpdate(glossary.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  const handleRemove = (idx: number) => onUpdate(glossary.filter((_, i) => i !== idx));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
          <BookOpen className="w-4 h-4 text-amber-700" />
          <span>Key Vocabulary Glossary</span>
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="text-xs text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Term
        </button>
      </div>

      {glossary.length === 0 ? (
        <p className="text-xs text-stone-400 italic bg-stone-50 p-2.5 rounded-lg border border-dashed border-stone-200">
          No glossary terms attached. Click "Add Term" to define subject keywords for this slide.
        </p>
      ) : (
        <div className="space-y-2">
          {glossary.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={item.term}
                onChange={(e) => handleEdit(i, { term: e.target.value })}
                placeholder="Term (e.g. Velocity)"
                className="w-1/3 text-xs bg-white border border-stone-200 rounded-lg p-2 font-semibold text-stone-800 focus:outline-none focus:border-amber-600"
              />
              <input
                type="text"
                value={item.definition}
                onChange={(e) => handleEdit(i, { definition: e.target.value })}
                placeholder="Pupil-friendly definition..."
                className="flex-1 text-xs bg-white border border-stone-200 rounded-lg p-2 text-stone-700 focus:outline-none focus:border-amber-600"
              />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="p-1.5 text-stone-400 hover:text-red-600 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
