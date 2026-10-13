import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { ModuleScheme } from '../../../types';

interface ExamplesDemonstrationEditorProps {
  intent: string;
  chunkTitle: string;
  lessonTitle?: string;
  subject?: string;
  gradeLevel?: string;
  themeNotes?: string;
  moduleScheme?: ModuleScheme;
  onChangeIntent: (val: string) => void;
  onSaveIntent: (val: string) => void;
}

export const ExamplesDemonstrationEditor: React.FC<ExamplesDemonstrationEditorProps> = ({
  intent, chunkTitle, lessonTitle, subject, gradeLevel, themeNotes, moduleScheme,
  onChangeIntent, onSaveIntent,
}) => {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const wordCount = intent.trim() ? intent.trim().split(/\s+/).length : 0;

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const res = await fetch('/api/generate-lesson-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'core_explanation',
          chunkTitle,
          lessonTitle,
          courseTitle: moduleScheme?.courseTitle || moduleScheme?.unitName || '',
          subject,
          gradeLevel,
          themeNotes,
        }),
      });
      const data = await res.json();
      const freshEx = data?.example || data?.demonstration || data?.workedExample;
      if (freshEx) {
        onChangeIntent(freshEx);
        onSaveIntent(freshEx);
      }
    } catch (err) {
      console.warn('Regenerate example error:', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-0.5">
        <div className="flex items-center gap-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60">
            Examples / Demonstration
          </label>
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isRegenerating}
            title="Regenerate this example using the updated prompt"
            className="text-[10px] text-[#D97706] hover:text-[#B45309] flex items-center gap-1 font-semibold cursor-pointer disabled:opacity-40 transition-colors"
          >
            <RefreshCw className={`w-2.5 h-2.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            {isRegenerating ? 'Refreshing...' : 'Regenerate'}
          </button>
        </div>
        {wordCount > 0 && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${wordCount <= 60 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>
            {wordCount} words {wordCount <= 60 ? '✓' : '⚠️ Long'}
          </span>
        )}
      </div>
      <textarea
        value={intent}
        onChange={(e) => onChangeIntent(e.target.value)}
        onBlur={() => onSaveIntent(intent)}
        rows={3}
        placeholder="Concrete example or demonstration of this concept in action..."
        className="w-full text-xs bg-[#F8F6F0]/60 border border-[#2D2A26]/15 rounded-xl p-2.5 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30 leading-relaxed"
      />
    </div>
  );
};
