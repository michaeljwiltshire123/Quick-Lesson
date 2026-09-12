import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { POP_CULTURE_CATEGORIES, PopCultureCategory, FALLBACK_POP_SCENES, PopCultureScene } from '../presetData';
import { PopCultureSceneCard } from '../PopCultureSceneCard';

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
  const [scenes, setScenes] = useState<PopCultureScene[]>(FALLBACK_POP_SCENES['Movie']);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const resp = await fetch('/api/generate-media-scenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCat,
          chunkTitle,
          lessonTitle: lessonTitle || chunkTitle,
          subject,
          gradeLevel,
          themeNotes,
        }),
      });
      if (!resp.ok) throw new Error('Failed to generate');
      const data = await resp.json();
      if (Array.isArray(data?.scenes) && data.scenes.length > 0) {
        setScenes(data.scenes);
      } else {
        setScenes(FALLBACK_POP_SCENES[selectedCat] || FALLBACK_POP_SCENES['Movie']);
      }
    } catch {
      setScenes(FALLBACK_POP_SCENES[selectedCat] || FALLBACK_POP_SCENES['Movie']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#2D2A26]">Video Category</label>
        <div className="flex flex-wrap gap-2">
          {POP_CULTURE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => { setSelectedCat(cat); setScenes(FALLBACK_POP_SCENES[cat] || []); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                selectedCat === cat
                  ? 'bg-[#F59E0B] text-white border-amber-600 shadow-2xs'
                  : 'bg-white text-[#2D2A26]/75 border-[#2D2A26]/15 hover:border-[#D97706]/40 hover:bg-[#F8F6F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={handleGenerate}
        className="w-full py-2.5 px-4 bg-[#2D2A26] hover:bg-[#2D2A26]/90 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-98"
      >
        <Sparkles className={`w-4 h-4 text-[#F59E0B] ${loading ? 'animate-spin' : ''}`} />
        <span>{loading ? 'Consulting Media Archives...' : 'Generate Scene Ideas ✨'}</span>
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
        {scenes.map((scene) => (
          <PopCultureSceneCard key={scene.id} scene={scene} onApply={onApplyScene} />
        ))}
      </div>
    </div>
  );
};
