import React, { useState } from 'react';
import { DontSayItConfigControls } from './DontSayItConfigControls';
import { DontSayItRoomLauncherCard } from './DontSayItRoomLauncherCard';
import { DontSayItCardPreviewList } from './DontSayItCardPreviewList';
import { DontSayItPlayPreview } from '../preview/DontSayItPlayPreview';
import { DontSayItInsightsCard } from './DontSayItInsightsCard';
import { useDontSayItSetup } from './useDontSayItSetup';
import { LessonChunk, ModuleScheme } from '../../../../../types';

interface Props {
  lessonTitle: string;
  chunks?: LessonChunk[];
  moduleScheme?: ModuleScheme;
  onNotice?: (msg: string) => void;
}

export const DontSayItInlineSetupView: React.FC<Props> = ({
  lessonTitle, chunks = [], onNotice,
}) => {
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [insights, setInsights] = useState(false);
  const {
    roomCode, config, cards, isAttached, setIsAttached, setCards,
    handleConfigChange, handleAiExtract,
  } = useDontSayItSetup(lessonTitle, chunks);

  if (isPreviewActive) {
    return (
      <div id="dont-say-it-preview-mode" className="space-y-4">
        <DontSayItPlayPreview config={config} cards={cards} onBackToSetup={() => setIsPreviewActive(false)} onNotice={onNotice} />
      </div>
    );
  }

  return (
    <div id="dont-say-it-setup-view" className="space-y-4">
      <DontSayItRoomLauncherCard
        roomCode={roomCode}
        isAttached={isAttached}
        onAttachToLesson={() => {
          sessionStorage.setItem('attached_dont_say_it', JSON.stringify({ config, cards }));
          setIsAttached(true);
          onNotice?.(`Attached "Don't Say It!" (${cards.length} Cards) to Lesson Plan!`);
        }}
        onLaunchPreview={() => {
          setIsPreviewActive(true);
          onNotice?.('Opened Live Match & Pupil Phones Preview!');
        }}
        onCopyLink={() => {
          navigator.clipboard.writeText(`${window.location.origin}?dontSayIt=${roomCode}`);
          onNotice?.(`Copied student join link for room ${roomCode}!`);
        }}
        onCopySlidesEmbed={() => {
          navigator.clipboard.writeText(`<iframe src="${window.location.origin}?dontSayItEmbed=${roomCode}" width="800" height="600" />`);
          onNotice?.('Copied Google Slides embed code!');
        }}
      />
      <DontSayItConfigControls config={config} onChangeConfig={handleConfigChange} />
      <DontSayItInsightsCard insights={insights} setInsights={setInsights} cards={cards} />
      <DontSayItCardPreviewList cards={cards} lessonTitle={lessonTitle} onUpdateCards={setCards} onResetCards={() => handleAiExtract(onNotice)} />
    </div>
  );
};
