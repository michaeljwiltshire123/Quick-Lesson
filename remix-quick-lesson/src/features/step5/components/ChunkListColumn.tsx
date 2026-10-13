import React from 'react';
import { LessonChunk } from '../../../types';
import { BookOpen, Clock } from 'lucide-react';

interface ChunkListColumnProps {
  chunks: LessonChunk[];
  activeChunkId: string;
  onSelectChunk: (id: string) => void;
  starterCounts: Record<string, number>;
  onInspectActiveSparks?: (chunkId: string) => void;
}

export const ChunkListColumn: React.FC<ChunkListColumnProps> = ({
  chunks,
  activeChunkId,
  onSelectChunk,
  starterCounts,
  onInspectActiveSparks,
}) => {
  return (
    <div className="bg-white border border-[#2D2A26]/10 rounded-2xl p-4 lg:p-5 shadow-sm space-y-3.5">
      <div className="flex items-center gap-2.5 border-b border-[#2D2A26]/10 pb-3">
        <div className="w-8 h-8 rounded-xl bg-[#F59E0B]/10 text-[#D97706] flex items-center justify-center shrink-0">
          <BookOpen className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-[#2D2A26] text-sm">Lesson Chunks</h3>
          <p className="text-[11px] text-[#2D2A26]/60">Click a chunk or click active badge to inspect</p>
        </div>
      </div>

      <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
        {chunks.map((chunk, idx) => {
          const isActive = chunk.id === activeChunkId;
          const count = starterCounts[chunk.id] || 0;

          return (
            <div
              key={chunk.id}
              onClick={() => onSelectChunk(chunk.id)}
              className={`w-full text-left p-3.5 rounded-xl transition-all border flex flex-col gap-2 cursor-pointer ${
                isActive
                  ? 'bg-amber-50/90 border-[#F59E0B] ring-2 ring-[#F59E0B]/20 shadow-xs'
                  : 'bg-[#F8F6F0]/60 border-[#2D2A26]/10 hover:bg-[#F8F6F0]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F59E0B]/20 text-[#92400E] px-2 py-0.5 rounded-full border border-[#F59E0B]/30">
                  Chunk {idx + 1}
                </span>
                <span className="text-[11px] text-[#2D2A26]/60 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {chunk.durationMinutes}m
                </span>
              </div>
              <h4 className="font-bold text-[#2D2A26] text-xs leading-relaxed break-words">{chunk.title}</h4>
              <div className="flex items-center justify-between pt-1.5 border-t border-[#2D2A26]/5 text-[11px]">
                <span className="text-[#2D2A26]/60 font-medium">Assigned Sparks</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onInspectActiveSparks) {
                      onInspectActiveSparks(chunk.id);
                    } else {
                      onSelectChunk(chunk.id);
                    }
                  }}
                  title={count > 0 ? 'Click to navigate to active spark in panel' : 'No sparks attached yet'}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    count > 0
                      ? 'bg-[#F59E0B] text-amber-950 hover:bg-[#D97706] hover:text-white shadow-xs'
                      : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                  }`}
                >
                  <span>{count} active</span>
                  {count > 0 && <span className="text-[9px] opacity-75">↗</span>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
