import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { PollOption, PollType } from './types';

interface Props {
  pollType: PollType;
  options: PollOption[];
  onChangeOptions: (opts: PollOption[]) => void;
}

export const PollOptionsEditor: React.FC<Props> = ({ pollType, options, onChangeOptions }) => {
  if (pollType === PollType.Open || pollType === PollType.Wordcloud) {
    return (
      <div className="p-3 bg-[#F8F6F0]/60 border border-[#2D2A26]/10 rounded-xl text-xs text-[#2D2A26]/70 italic">
        {pollType === PollType.Open
          ? 'Pupils will provide free-form text responses during the live classroom session.'
          : 'Pupil submissions will dynamically aggregate into a live visual word cloud.'}
      </div>
    );
  }

  const handleUpdate = (idx: number, patch: Partial<PollOption>) => {
    onChangeOptions(options.map((opt, i) => (i === idx ? { ...opt, ...patch } : opt)));
  };

  const handleAdd = () => {
    onChangeOptions([...options, { id: `opt-${Date.now()}`, text: `Option ${options.length + 1}` }]);
  };

  const handleRemove = (idx: number) => {
    if (options.length <= 2) return;
    onChangeOptions(options.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#2D2A26]/70">
          Response Options ({options.length})
        </label>
        {options.length < 6 && pollType !== PollType.Likert && (
          <button
            type="button"
            onClick={handleAdd}
            className="text-[11px] font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Add Option
          </button>
        )}
      </div>
      <div className="space-y-1.5">
        {options.map((opt, idx) => (
          <div key={opt.id} className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#2D2A26]/50 w-5 text-right">{idx + 1}.</span>
            <input
              type="text"
              value={opt.text}
              onChange={(e) => handleUpdate(idx, { text: e.target.value })}
              placeholder={`Option ${idx + 1}`}
              className="flex-1 text-xs bg-white border border-[#2D2A26]/15 rounded-lg px-2.5 py-1.5 text-[#2D2A26] focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
            />
            {pollType === PollType.Image && (
              <input
                type="text"
                value={opt.imageUrl || ''}
                onChange={(e) => handleUpdate(idx, { imageUrl: e.target.value })}
                placeholder="Image URL..."
                className="w-32 text-[11px] bg-white border border-[#2D2A26]/15 rounded-lg px-2 py-1.5 text-[#2D2A26]"
              />
            )}
            {options.length > 2 && pollType !== PollType.Likert && (
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="p-1 text-[#2D2A26]/40 hover:text-red-600 rounded cursor-pointer"
                title="Remove option"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
