import React, { useState } from 'react';
import { Search, Film } from 'lucide-react';
import { ChunkAttachment } from '../../../../types';
import { VideoUploadZone } from '../VideoUploadZone';
import { VideoSearchTab } from './VideoSearchTab';
import { PopCultureRecommendationsTab } from './PopCultureRecommendationsTab';
import { PopCultureScene } from '../presetData';

interface QuickSearchAndDetailsTabProps {
  onAttachVideo: (att: Partial<ChunkAttachment>) => void;
  initialData?: Partial<ChunkAttachment>;
  slideTitle?: string;
  lessonTitle?: string;
  subject?: string;
  gradeLevel?: string;
  themeNotes?: string;
  requiredDeliverables?: string[];
  assessedCriteria?: string[];
  onApplyScene: (scene: PopCultureScene) => void;
}

export const QuickSearchAndDetailsTab: React.FC<QuickSearchAndDetailsTabProps> = ({
  onAttachVideo, initialData, slideTitle = '', lessonTitle, subject, gradeLevel, themeNotes, requiredDeliverables, assessedCriteria, onApplyScene,
}) => {
  const [subSection, setSubSection] = useState<'archetypes' | 'popculture'>('archetypes');

  return (
    <div className="space-y-4">
      <VideoUploadZone onAttachVideo={onAttachVideo} initialData={initialData} />

      <div className="flex p-1 bg-[#E8E3D8]/80 rounded-xl border border-[#2D2A26]/10 gap-1.5 overflow-x-auto">
        <button
          type="button"
          onClick={() => setSubSection('archetypes')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            subSection === 'archetypes' ? 'bg-white text-[#2D2A26] shadow-2xs border border-[#2D2A26]/15' : 'text-[#2D2A26]/70 hover:bg-white/50'
          }`}
        >
          <Search className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Search Video</span>
        </button>
        <button
          type="button"
          onClick={() => setSubSection('popculture')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            subSection === 'popculture' ? 'bg-white text-[#2D2A26] shadow-2xs border border-[#2D2A26]/15' : 'text-[#2D2A26]/70 hover:bg-white/50'
          }`}
        >
          <Film className="w-3.5 h-3.5 text-[#D97706]" />
          <span>AI Suggested Videos</span>
        </button>
      </div>

      <div className="pt-1">
        {subSection === 'archetypes' && <VideoSearchTab slideTitle={slideTitle} />}
        {subSection === 'popculture' && (
          <PopCultureRecommendationsTab
            chunkTitle={slideTitle} lessonTitle={lessonTitle} subject={subject} gradeLevel={gradeLevel} themeNotes={themeNotes}
            requiredDeliverables={requiredDeliverables} assessedCriteria={assessedCriteria} onApplyScene={onApplyScene}
          />
        )}
      </div>
    </div>
  );
};
