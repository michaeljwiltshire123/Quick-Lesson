import React, { useState } from 'react';
import { Plus, Sparkles, BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import { LessonChunk } from '../../../../../types';
import { LociLinearTermsList } from './LociLinearTermsList';
import { LociRouteNameInput } from './LociRouteNameInput';

interface Props {
  terms: string[];
  onChangeTerms: (t: string[]) => void;
  routeName: string;
  onChangeRouteName: (name: string) => void;
  onStationsGenerated: (stations: string[]) => void;
  onNext: () => void;
  chunk?: LessonChunk;
  subject?: string;
}

export const LociWordSelector: React.FC<Props> = ({
  terms, onChangeTerms, routeName, onChangeRouteName, onStationsGenerated, onNext, chunk, subject,
}) => {
  const [customWord, setCustomWord] = useState('');
  const [topicPrompt, setTopicPrompt] = useState(chunk?.title || '');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (terms.length === 0 && chunk) {
      const raw = `${chunk.title || ''}, ${chunk.vocabulary || ''}, ${chunk.vocabularyTags || ''}, ${chunk.coreExplanation || ''}`;
      const found = raw.split(/[,;\n]+/).map((s) => s.trim()).filter((s) => s.length > 2 && s.length < 30);
      if (found.length > 0) {
        onChangeTerms(Array.from(new Set(found)).slice(0, 10));
      }
    }
  }, [chunk]);

  const addTerm = (word: string) => {
    const trimmed = word.trim();
    if (trimmed && !terms.includes(trimmed)) onChangeTerms([...terms, trimmed].slice(0, 15));
    setCustomWord('');
  };

  const pullFromChunk = () => {
    const raw = `${chunk?.title || ''}, ${chunk?.vocabulary || ''}`;
    const found = raw.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean);
    onChangeTerms(Array.from(new Set([...terms, ...found])).slice(0, 15));
  };

  const fetchAiKeywords = async () => {
    if (!topicPrompt.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-loci-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topicPrompt, subject }),
      });
      const data = await res.json();
      if (Array.isArray(data?.keywords) && data.keywords.length > 0) {
        onChangeTerms(data.keywords.slice(0, 15));
      }
    } catch {} finally { setIsLoading(false); }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={topicPrompt}
          onChange={(e) => setTopicPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchAiKeywords()}
          placeholder="Topic search (e.g. 12 principles of animation)..."
          className="flex-1 bg-white border border-[#2D2A26]/15 rounded-xl px-3 py-2 text-xs"
        />
        <button type="button" onClick={fetchAiKeywords} disabled={isLoading || !topicPrompt.trim()} className="px-3.5 py-2 bg-[#D97706] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40">
          {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} Get AI Keywords
        </button>
        {chunk && (
          <button type="button" onClick={pullFromChunk} className="px-3 py-2 bg-white border border-[#2D2A26]/15 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer">
            <BookOpen className="w-3.5 h-3.5 text-[#D97706]" /> Pull Chunk
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={customWord}
          onChange={(e) => setCustomWord(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTerm(customWord)}
          placeholder="Add term to sequence..."
          className="flex-1 bg-white border border-[#2D2A26]/15 rounded-xl px-3 py-2 text-xs"
        />
        <button type="button" onClick={() => addTerm(customWord)} className="px-3 py-2 bg-[#2D2A26] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>

      {terms.length > 0 && <LociLinearTermsList terms={terms} onChangeTerms={onChangeTerms} />}

      {/* Route Name & Presets Card placed right under linear sequence */}
      <LociRouteNameInput
        routeName={routeName}
        onChangeRouteName={onChangeRouteName}
        onStationsGenerated={onStationsGenerated}
        currentAssignedStations={[]}
        subject={subject}
      />

      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-[#2D2A26]/60">
          {!routeName.trim() ? '⚠️ Please enter or select a place/route name to continue' : terms.length === 0 ? 'Add at least one keyword to continue' : 'Ready to map stations!'}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={terms.length === 0 || !routeName.trim()}
          className="px-4 py-2 bg-[#2D2A26] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
        >
          Next: Route & Imagery <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
