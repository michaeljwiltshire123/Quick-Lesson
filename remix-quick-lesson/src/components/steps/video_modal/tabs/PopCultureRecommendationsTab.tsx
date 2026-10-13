import React, { useState } from 'react';
import { Sparkles, Film, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import { POP_CULTURE_CATEGORIES, PopCultureCategory, PopCultureScene } from '../presetData';
import { PopCultureSceneCard } from '../PopCultureSceneCard';
import { useCategorySceneQueue } from '../hooks/useCategorySceneQueue';

interface PopCultureRecommendationsTabProps {
  chunkTitle: string;
  lessonTitle?: string;
  subject?: string;
  gradeLevel?: string;
  themeNotes?: string;
  requiredDeliverables?: string[];
  assessedCriteria?: string[];
  onApplyScene: (scene: PopCultureScene) => void;
}

export const PopCultureRecommendationsTab: React.FC<PopCultureRecommendationsTabProps> = ({
  chunkTitle, lessonTitle, subject, gradeLevel, themeNotes, onApplyScene,
}) => {
  const [selectedCat, setSelectedCat] = useState<PopCultureCategory>('Movie');
  const { cache, status, fetchCategory, startBackgroundQueue } = useCategorySceneQueue({
    chunkTitle, lessonTitle, subject, gradeLevel, themeNotes,
  });

  const handleGenerateAll = () => {
    startBackgroundQueue(selectedCat);
  };
  const handleSelectCat = (cat: PopCultureCategory) => {
    setSelectedCat(cat);
    if (!cache[cat] && status[cat] === 'idle') {
      fetchCategory(cat);
    }
  };

  const currentScenes = cache[selectedCat] || [];
  const isCurrentLoading = status[selectedCat] === 'loading';
  const hasLoaded = status[selectedCat] === 'ready' || status[selectedCat] === 'empty' || status[selectedCat] === 'error';
  const topicQuery = encodeURIComponent(`${subject || ''} ${chunkTitle} ${selectedCat}`.trim());

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#2D2A26]">Video Category (Queued & Verified)</label>
          <span className="text-[10px] text-amber-800 font-medium">Automatic background checks active</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {POP_CULTURE_CATEGORIES.map((cat) => {
            const st = status[cat];
            const count = (cache[cat] || []).length;
            return (
              <button
                key={cat} type="button" onClick={() => handleSelectCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                  selectedCat === cat ? 'bg-[#F59E0B] text-white border-amber-600 shadow-2xs' : 'bg-white text-[#2D2A26]/75 border-[#2D2A26]/15 hover:bg-[#F8F6F0]'
                }`}
              >
                <span>{cat}</span>
                {st === 'loading' && <Loader2 className="w-3 h-3 animate-spin opacity-75" />}
                {st === 'ready' && <span className="text-[9px] bg-emerald-600 text-white font-bold px-1 rounded-full">{count}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button" disabled={isCurrentLoading} onClick={handleGenerateAll}
        className="w-full py-2.5 px-4 bg-[#2D2A26] hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        {isCurrentLoading ? <Film className="w-4 h-4 text-amber-400 animate-pulse" /> : <Sparkles className="w-4 h-4 text-amber-400" />}
        <span>{isCurrentLoading ? 'Auditioning & Verifying Clips in Background...' : 'Generate & Queue All Categories ✨'}</span>
      </button>

      {isCurrentLoading ? (
        <div className="p-8 text-center bg-white border border-stone-200 rounded-xl space-y-2">
          <Film className="w-8 h-8 text-amber-600 animate-bounce mx-auto" />
          <p className="text-xs font-bold text-stone-800">Verifying {selectedCat} clips via live YouTube playback check...</p>
          <p className="text-[11px] text-stone-500">Other categories are continuing to queue and verify in the background.</p>
        </div>
      ) : currentScenes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
          {currentScenes.map((scene) => (
            <PopCultureSceneCard key={scene.id} scene={scene} onApply={onApplyScene} />
          ))}
        </div>
      ) : hasLoaded ? (
        <div className="p-6 text-center bg-white border border-dashed border-stone-300 rounded-xl space-y-3">
          <AlertCircle className="w-6 h-6 text-stone-400 mx-auto" />
          <p className="text-xs font-semibold text-stone-700">{status[selectedCat] === 'error' ? `Clip checks failed for ${selectedCat}. Try generating again or search YouTube directly.` : `No verified working clips passed link checks for ${selectedCat}.`}</p>
          <button
            type="button" onClick={() => window.open(`https://www.youtube.com/results?search_query=${topicQuery}&sp=EgIYAQ%3D%3D`, '_blank')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
            <span>Search YouTube for "{chunkTitle}"</span>
          </button>
        </div>
      ) : (
        <div className="p-6 text-center bg-white/60 border border-stone-200 rounded-xl">
          <p className="text-xs text-stone-500">Generate queues up to three categories at once; direct YouTube searches use its under-four-minute video filter.</p>
        </div>
      )}
    </div>
  );
};
