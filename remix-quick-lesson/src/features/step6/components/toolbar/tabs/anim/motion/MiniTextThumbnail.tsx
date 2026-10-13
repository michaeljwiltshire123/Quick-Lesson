import React from 'react';

interface MiniTextThumbnailProps {
  content?: string;
}

export const MiniTextThumbnail: React.FC<MiniTextThumbnailProps> = ({ content = '' }) => {
  const clean = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = clean.split(' ').filter(Boolean);
  const line1 = words[0]?.slice(0, 6) || clean.slice(0, 5) || 'Text';
  const line2 = words[1]?.slice(0, 6) || clean.slice(5, 11) || '';

  return (
    <div
      className="w-4 h-4 bg-white border border-stone-300 rounded shadow-2xs overflow-hidden flex flex-col justify-center px-0.5 select-none shrink-0"
      title={clean || 'Text box'}
    >
      <span className="text-[5.5px] leading-[6px] font-sans font-medium text-stone-700 truncate tracking-tighter">
        {line1}
      </span>
      {line2 ? (
        <span className="text-[5.5px] leading-[6px] font-sans font-medium text-stone-500 truncate tracking-tighter">
          {line2}
        </span>
      ) : (
        <span className="text-[5px] leading-[5px] font-sans text-stone-400">...</span>
      )}
    </div>
  );
};
