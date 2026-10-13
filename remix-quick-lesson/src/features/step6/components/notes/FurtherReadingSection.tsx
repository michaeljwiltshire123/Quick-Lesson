import React from 'react';
import { Library, Plus, Trash2, ExternalLink } from 'lucide-react';

interface FurtherReadingSectionProps {
  reading: string[];
  onUpdate: (reading: string[]) => void;
}

export const FurtherReadingSection: React.FC<FurtherReadingSectionProps> = ({ reading, onUpdate }) => {
  const handleAdd = () => onUpdate([...reading, '']);
  const handleEdit = (idx: number, val: string) =>
    onUpdate(reading.map((it, i) => (i === idx ? val : it)));
  const handleRemove = (idx: number) => onUpdate(reading.filter((_, i) => i !== idx));

  return (
    <div className="space-y-2 pt-3 border-t border-stone-100">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
          <Library className="w-4 h-4 text-amber-700" />
          <span>Further Reading & Author References</span>
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="text-xs text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Reference
        </button>
      </div>

      {reading.length === 0 ? (
        <p className="text-xs text-stone-400 italic bg-stone-50 p-2.5 rounded-lg border border-dashed border-stone-200">
          No extension reading added. Add book titles, journal articles, or scholars for curious pupils.
        </p>
      ) : (
        <div className="space-y-1.5">
          {reading.map((refItem, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={refItem}
                onChange={(e) => handleEdit(i, e.target.value)}
                placeholder="e.g. Rosalind Driver (1994) Making Sense of Secondary Science"
                className="flex-1 text-xs bg-white border border-stone-200 rounded-lg p-2 text-stone-700 focus:outline-none focus:border-amber-600"
              />
              {refItem.trim() && (
                <a
                  href={`https://www.amazon.co.uk/s?k=${encodeURIComponent(refItem)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Search book on Amazon UK"
                  className="p-1.5 text-amber-800 hover:text-amber-950 bg-amber-50 rounded-lg border border-amber-200"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
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
