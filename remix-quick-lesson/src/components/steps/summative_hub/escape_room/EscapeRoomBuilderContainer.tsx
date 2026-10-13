import React, { useState, useEffect } from 'react';
import { EscapeRoomConfig } from './typesEscape';
import { getDefaultEscapeConfig, fetchAiEscapeRoom } from './escapeThemeGenerator';
import { EscapeRoomControls } from './EscapeRoomControls';
import { EscapeNarrativeBanner } from './EscapeNarrativeBanner';
import { EscapeAttachedBanner } from './EscapeAttachedBanner';
import { PuzzleLockCard } from './PuzzleLockCard';
import { EscapeActionToolbar } from './EscapeActionToolbar';
import { EscapeRoomInsightsCard } from './EscapeRoomInsightsCard';
import { LiveEscapeViewContainer } from './live_present';
import { LessonChunk, ModuleScheme } from '../../../../types';

interface Props {
  lessonTitle: string;
  chunks: LessonChunk[];
  moduleScheme?: ModuleScheme;
  subject?: string;
  gradeLevel?: string;
  onNotice?: (msg: string) => void;
}

export const EscapeRoomBuilderContainer: React.FC<Props> = ({
  lessonTitle, chunks, moduleScheme, subject, gradeLevel, onNotice,
}) => {
  const [config, setConfig] = useState<EscapeRoomConfig>(() => getDefaultEscapeConfig('hollywood', lessonTitle));
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isAttached, setIsAttached] = useState(() => Boolean(sessionStorage.getItem('attached_escape_room')));
  const [insights, setInsights] = useState(false);

  useEffect(() => {
    if (lessonTitle && !config.customThemeTitle) {
      setConfig((p) => ({ ...p, customThemeTitle: `${lessonTitle}: Hollywood Red Carpet Crisis` }));
    }
  }, [lessonTitle]);

  const handleRegenerateAi = async () => {
    setIsGenerating(true);
    try {
      const gen = await fetchAiEscapeRoom(config.themePreset, lessonTitle, chunks, moduleScheme, subject, gradeLevel);
      setConfig(gen);
      onNotice?.(`Synthesised 4 non-numeric locks for "${gen.customThemeTitle || config.themePreset}".`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAttach = () => {
    sessionStorage.setItem('attached_escape_room', JSON.stringify(config));
    setIsAttached(true);
    onNotice?.(`Attached "${config.customThemeTitle || 'Escape Room'}" with QR badge & live link to lesson plan.`);
  };

  const handleContinueStep5 = () => {
    sessionStorage.setItem('active_lesson_step', '5');
    onNotice?.('Progressing to Step 5: Discussion Starters.');
    window.dispatchEvent(new CustomEvent('quicklesson_step_change', { detail: { step: 5, stepKey: 'discussion_starters' } }));
  };

  if (isLiveActive) {
    return <LiveEscapeViewContainer config={config} lessonTitle={lessonTitle} onClose={() => setIsLiveActive(false)} onNotice={onNotice} />;
  }

  return (
    <div className="space-y-4">
      <EscapeRoomControls config={config} onChangeConfig={setConfig} onRegenerateAi={handleRegenerateAi} isGenerating={isGenerating} />
      <EscapeNarrativeBanner config={config} onChangeBrief={(narrativeBrief) => setConfig({ ...config, narrativeBrief })} />
      {isAttached && <EscapeAttachedBanner onContinueToStep5={handleContinueStep5} />}
      <EscapeRoomInsightsCard insights={insights} setInsights={setInsights} config={config} lessonTitle={lessonTitle} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {config.locks.map((lock, idx) => (
          <PuzzleLockCard
            key={lock.id || idx}
            lock={lock}
            chunks={chunks}
            onChangeLock={(upd) => { const l = [...config.locks]; l[idx] = upd; setConfig({ ...config, locks: l }); }}
          />
        ))}
      </div>

      <EscapeActionToolbar
        config={config}
        isAttached={isAttached}
        onAttachToLesson={handleAttach}
        onPreviewLiveBoard={() => setIsLiveActive(true)}
      />
    </div>
  );
};
