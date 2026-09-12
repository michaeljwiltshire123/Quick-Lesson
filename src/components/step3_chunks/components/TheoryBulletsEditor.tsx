import React, { useState, useEffect } from 'react';

interface TheoryBulletsEditorProps {
  classroomNotes: string;
  onChangeNotes: (stitchedNotes: string) => void;
}

export const TheoryBulletsEditor: React.FC<TheoryBulletsEditorProps> = ({
  classroomNotes,
  onChangeNotes,
}) => {
  const parseNotes = (raw: string) => {
    if (!raw) return { how: '', why: '' };
    const parts = raw.split(/### Why to Use\n?/i);
    const how = parts[0]?.replace(/### How to Use\n?/i, '').trim() || '';
    const why = parts[1]?.trim() || '';
    return { how, why };
  };

  const [howText, setHowText] = useState('');
  const [whyText, setWhyText] = useState('');

  useEffect(() => {
    const { how, why } = parseNotes(classroomNotes);
    setHowText(how);
    setWhyText(why);
  }, [classroomNotes]);

  const handleBlur = () => {
    const stitched = `### How to Use\n${howText}\n\n### Why to Use\n${whyText}`;
    if (stitched !== classroomNotes) {
      onChangeNotes(stitched);
    }
  };

  return (
    <div className="space-y-1">
      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60">Theory Bullets (Pedagogy)</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <span className="block text-[9px] font-extrabold uppercase text-[#D97706] mb-1">How to Use</span>
          <textarea
            value={howText}
            onChange={(e) => setHowText(e.target.value)}
            onBlur={handleBlur}
            rows={2}
            placeholder="Step-by-step classroom application..."
            className="w-full text-xs bg-white border border-[#2D2A26]/15 rounded-xl p-2 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30 leading-snug"
          />
        </div>
        <div>
          <span className="block text-[9px] font-extrabold uppercase text-[#D97706] mb-1">Why to Use</span>
          <textarea
            value={whyText}
            onChange={(e) => setWhyText(e.target.value)}
            onBlur={handleBlur}
            rows={2}
            placeholder="Underlying pedagogical rationale..."
            className="w-full text-xs bg-white border border-[#2D2A26]/15 rounded-xl p-2 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30 leading-snug"
          />
        </div>
      </div>
    </div>
  );
};
