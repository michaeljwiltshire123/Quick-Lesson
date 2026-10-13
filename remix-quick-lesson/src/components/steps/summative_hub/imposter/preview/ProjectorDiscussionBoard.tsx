import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { MockPupil } from './ProjectorSubmissionTracker';

interface Props {
  pupils: MockPupil[];
}

export const ProjectorDiscussionBoard: React.FC<Props> = ({ pupils }) => {
  const PAGE_SIZE = 8;
  const totalPages = Math.ceil(pupils.length / PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(0);

  // Auto-carousel if more than 8 answers so teacher never touches screen
  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const displayedPupils = pupils.length > 8 
    ? pupils.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
    : pupils;

  const isDense = pupils.length > 4;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/30">
            <MessageSquare className="w-3 h-3" /> Class Discussion Phase
          </div>
          <span className="text-xs font-bold text-white">Compare Answers &amp; Spot the Bluff</span>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-0.5 rounded-md border border-white/10 text-[10px] text-amber-300 font-bold">
            <Sparkles className="w-2.5 h-2.5 animate-spin" />
            <span>Auto-Cycling Page {currentPage + 1} of {totalPages} (Every 6s)</span>
          </div>
        )}
      </div>

      <div className={`grid gap-2 ${
        isDense ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'
      }`}>
        {displayedPupils.map((p) => (
          <div
            key={p.name}
            className="p-2.5 bg-slate-800/90 rounded-xl border border-white/10 flex flex-col justify-between space-y-1 transition-all duration-500 animate-fadeIn"
          >
            <div className="flex items-center gap-1.5 border-b border-white/5 pb-1">
              <span className="text-sm">{p.avatar}</span>
              <span className="text-[11px] font-bold text-white truncate">{p.name}</span>
            </div>
            <div className="p-1.5 bg-slate-900/80 rounded-lg border border-white/5 flex-1 flex items-center">
              <p className="text-[11px] font-medium text-amber-200 leading-tight">
                &ldquo;{p.sampleAns}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-1 pt-0.5">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentPage === idx ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
