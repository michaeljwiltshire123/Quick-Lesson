import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

export const Step5Header: React.FC<{ lessonTitle?: string }> = ({ lessonTitle }) => {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-semibold text-sm">
              05
            </span>
            <h1 className="text-2xl font-bold text-stone-900">Diagnostic Discussion Starters</h1>
          </div>
          <p className="text-stone-600 text-sm max-w-2xl">
            Spark immediate classroom dialogue, surface subtle misconceptions, and challenge student assumptions before deep teaching begins.
          </p>
        </div>
        {lessonTitle && (
          <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-right">
            <div className="text-xs text-stone-500 font-medium uppercase tracking-wider">Active Lesson</div>
            <div className="text-sm font-semibold text-stone-900 truncate max-w-xs">{lessonTitle}</div>
          </div>
        )}
      </div>
    </div>
  );
};
