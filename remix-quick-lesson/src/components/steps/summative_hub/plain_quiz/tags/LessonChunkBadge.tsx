import React from 'react';
import { BookOpen, Target } from 'lucide-react';

interface Props {
  chunkIndex?: number;
  chunkTitle?: string;
  learningIntent?: string;
  compact?: boolean;
}

export const LessonChunkBadge: React.FC<Props> = ({
  chunkIndex,
  chunkTitle,
  learningIntent,
  compact = false,
}) => {
  if (!chunkTitle && chunkIndex === undefined) return null;

  const displayTitle = chunkTitle || (chunkIndex !== undefined ? `Lesson Chunk ${chunkIndex + 1}` : 'Core Concept');
  const indexLabel = chunkIndex !== undefined ? `Chunk ${chunkIndex + 1}` : 'Source';

  if (compact) {
    return (
      <span
        title={learningIntent ? `Objective: ${learningIntent}` : `From ${displayTitle}`}
        className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-[10px] font-bold"
      >
        <BookOpen className="w-3 h-3 text-amber-600" />
        <span>{indexLabel}: {displayTitle}</span>
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-[#F8F6F0] border border-[#2D2A26]/10 rounded-xl">
      <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D2A26]">
        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded font-mono text-[10px] font-bold">
          {indexLabel}
        </span>
        <span>{displayTitle}</span>
      </div>
      {learningIntent && (
        <div className="flex items-center gap-1 text-[11px] text-gray-600 border-l border-gray-300 pl-2">
          <Target className="w-3 h-3 text-emerald-600 shrink-0" />
          <span className="truncate max-w-xs">{learningIntent}</span>
        </div>
      )}
    </div>
  );
};
