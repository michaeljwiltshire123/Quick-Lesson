import React from 'react';
import { SlideElement } from '../../../types/slideTypes';
import { Smile, CheckCircle, XCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

interface MediaAvatarsExtensionProps {
  onInsertElement: (element: SlideElement) => void;
}

const AVATAR_PRESETS = [
  { id: 'tf_true', label: 'True Mascot', emoji: '🦖 ✅ True!', color: '#D1FAE5', border: '#059669' },
  { id: 'tf_false', label: 'False Mascot', emoji: '🦉 ❌ False!', color: '#FEE2E2', border: '#DC2626' },
  { id: 'thumb_up', label: 'Thumbs Up', emoji: '👍 Great Job!', color: '#FEF3C7', border: '#D97706' },
  { id: 'thumb_down', label: 'Needs Check', emoji: '👎 Let\'s Review', color: '#F3F4F6', border: '#6B7280' },
  { id: 'yes_no', label: 'Agree / Disagree', emoji: '🤔 What do you think?', color: '#E0E7FF', border: '#4F46E5' },
];

export const MediaAvatarsExtension: React.FC<MediaAvatarsExtensionProps> = ({ onInsertElement }) => {
  const handleInsertAvatar = (preset: typeof AVATAR_PRESETS[0]) => {
    onInsertElement({
      id: `el-avatar-${Date.now()}`,
      type: 'shape',
      shapeType: 'rounded',
      x: 70,
      y: 25,
      width: 25,
      height: 18,
      content: preset.emoji,
      fillColor: preset.color,
      borderColor: preset.border,
      borderWidth: 2,
      textStyle: { bold: true, align: 'center', fontSize: 16 },
      meta: { isReactionAvatar: true, avatarId: preset.id },
    });
  };

  return (
    <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl">
      <div className="font-bold text-stone-800 flex items-center gap-1.5">
        <Smile className="w-3.5 h-3.5 text-amber-700" />
        <span>Classroom Mascot Avatars</span>
      </div>
      <p className="text-[10px] text-stone-500">Insert 1-click True/False & thumbs-up checks.</p>
      <div className="grid grid-cols-2 gap-1 pt-1">
        {AVATAR_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleInsertAvatar(p)}
            className="py-1 px-1.5 bg-white hover:bg-amber-50 border border-stone-200 rounded-lg text-left text-[10px] font-semibold text-stone-700 truncate cursor-pointer transition-colors"
          >
            {p.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
