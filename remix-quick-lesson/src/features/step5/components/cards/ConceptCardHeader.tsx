import React from 'react';
import { Bookmark } from 'lucide-react';

interface ConceptCardHeaderProps {
  milestoneChunkId: string;
  conceptId?: string;
}

export const ConceptCardHeader: React.FC<ConceptCardHeaderProps> = ({
  milestoneChunkId,
}) => {
  return (
    <div className="flex items-center justify-between pb-3 border-b border-stone-200">
      <div className="flex items-center gap-2">
        <Bookmark className="w-4 h-4 text-amber-700" />
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
          Diagnostic Spark Card
        </span>
      </div>
      <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
        Peppered before {milestoneChunkId}
      </div>
    </div>
  );
};
