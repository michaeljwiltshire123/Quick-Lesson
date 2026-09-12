import React, { useState, useEffect } from 'react';

interface ChunkExplanationInputProps {
  value: string;
  onSave: (val: string) => void;
}

export const ChunkExplanationInput: React.FC<ChunkExplanationInputProps> = ({ value, onSave }) => {
  const [text, setText] = useState(value);

  useEffect(() => { setText(value); }, [value]);

  const handleBlur = () => {
    if (text !== value) onSave(text);
  };

  return (
    <div>
      <label className="block text-xs font-bold text-[#2D2A26] mb-1">Core Explanation & Teacher Script</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        rows={3}
        placeholder="Outline teacher explanation and key talking points..."
        className="w-full text-xs bg-[#F8F6F0]/50 border border-[#2D2A26]/15 rounded-xl p-3 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30 leading-relaxed"
      />
    </div>
  );
};
