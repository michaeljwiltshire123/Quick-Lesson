import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { Award } from 'lucide-react';

interface PupilPraiseBadgesProps {
  onInsertElement: (newElement: SlideElement) => void;
}

const PRAISE_LIST = [
  { text: '🌟 Star Pupil Award', fill: '#FEF3C7', border: '#D97706', color: '#78350F' },
  { text: '🎯 Outstanding Focus', fill: '#EFF6FF', border: '#3B82F6', color: '#1E3A8A' },
  { text: '🧠 Master Thinker', fill: '#ECFDF5', border: '#10B981', color: '#064E3B' },
  { text: '🤝 Team Player', fill: '#FDF2F8', border: '#EC4899', color: '#831843' },
];

export const PupilPraiseBadges: React.FC<PupilPraiseBadgesProps> = ({ onInsertElement }) => {
  const insertBadge = (badge: typeof PRAISE_LIST[0]) => {
    onInsertElement({
      id: `el-praise-${Date.now()}`,
      type: 'shape',
      shapeType: 'rounded',
      x: 65,
      y: 15,
      width: 28,
      height: 18,
      content: badge.text,
      fillColor: badge.fill,
      borderColor: badge.border,
      borderWidth: 2,
      textStyle: { bold: true, align: 'center', fontSize: 12, color: badge.color },
      meta: { isPraiseBadge: true },
    });
  };

  return (
    <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl">
      <div className="font-bold text-stone-800 flex items-center gap-1.5 text-[11px]">
        <Award className="w-3.5 h-3.5 text-amber-700" />
        <span>Instant Praise Badges</span>
      </div>
      <div className="grid grid-cols-2 gap-1 pt-0.5">
        {PRAISE_LIST.map((b) => (
          <button
            key={b.text}
            type="button"
            onClick={() => insertBadge(b)}
            className="py-1 px-1.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-medium rounded-lg text-[10px] truncate text-center cursor-pointer shadow-2xs"
          >
            {b.text}
          </button>
        ))}
      </div>
    </div>
  );
};
