import React, { useState } from 'react';
import { CompetitiveQuizConfig, QuestionCard, QuestionFormat } from '../types/competitiveQuizTypes';
import { CompetitiveQuizLauncherCard } from './CompetitiveQuizLauncherCard';
import { MatchDurationStepperCard } from './MatchDurationStepperCard';
import { ChunkExtractionPipelineCard } from './ChunkExtractionPipelineCard';
import { FormatRecipeSelector } from './FormatRecipeSelector';
import { RoomConfigControls } from './RoomConfigControls';
import { VoiceSelectorCard } from './VoiceSelectorCard';
import { QuestionCardPreviewList } from './QuestionCardPreviewList';
import { CompetitiveQuizInsightsCard } from './CompetitiveQuizInsightsCard';
import { ExportModal } from '../exporters/ExportModal';
import { LiveArenaDualScreenPreviewModal } from './LiveArenaDualScreenPreviewModal';
import { DEFAULT_VOICE_PRESET } from '../services/ttsPresenterService';
import { generateJargonFreeQuestions, fetchAICompetitiveQuizQuestions, DEFAULT_MIX_FORMATS } from '../services/jargonFreeQuestionEngine';
import { createCompetitiveQuizRoom } from '../services/competitiveQuizApi';

interface Props {
  lessonTitle: string;
  chunks?: any[];
  moduleScheme?: any;
  onNotice?: (msg: string) => void;
}

export const CompetitiveQuizSetupView: React.FC<Props> = ({ lessonTitle, chunks = [], onNotice }) => {
  const [config, setConfig] = useState<CompetitiveQuizConfig>(() => ({
    roomCode: Math.random().toString(36).substring(2, 6).toUpperCase(),
    lessonTitle: lessonTitle || 'Lesson Challenge Arena',
    mode: 'individual', teamCount: 2, playerCountEstimate: 28, totalRounds: 8,
    speedLimitSeconds: 10, potPatternId: 'escalating', voicePreset: DEFAULT_VOICE_PRESET,
    allowPowerUps: true, gyroStealingEnabled: true, selectedFormats: DEFAULT_MIX_FORMATS,
  }));

  const [questions, setQuestions] = useState<QuestionCard[]>(() => generateJargonFreeQuestions(lessonTitle, chunks, DEFAULT_MIX_FORMATS, 8));
  const [isAttached, setIsAttached] = useState(() => Boolean(sessionStorage.getItem('attached_competitive_quiz')));
  const [isLoading, setIsLoading] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [insights, setInsights] = useState(false);

  const handleUpdateFormats = (newFormats: QuestionFormat[]) => {
    setConfig((c) => ({ ...c, selectedFormats: newFormats }));
    setQuestions(generateJargonFreeQuestions(lessonTitle, chunks, newFormats, config.totalRounds));
    onNotice?.(`Recipe updated with ${newFormats.length} interactive formats!`);
  };

  const handleChangeCount = (newCount: number) => {
    setConfig((c) => ({ ...c, totalRounds: newCount }));
    setQuestions(generateJargonFreeQuestions(lessonTitle, chunks, config.selectedFormats, newCount));
    onNotice?.(`Set match length to ${newCount} questions.`);
  };

  const handleLaunch = async () => {
    const res = await createCompetitiveQuizRoom(config, questions);
    if (res.success) onNotice?.(`Arena room ${config.roomCode} launched! Waiting for players.`);
  };

  return (
    <div id="competitive-quiz-setup-view" className="space-y-4">
      <CompetitiveQuizLauncherCard
        roomCode={config.roomCode} isAttached={isAttached}
        onAttachToLesson={() => { sessionStorage.setItem('attached_competitive_quiz', JSON.stringify({ config, questions })); setIsAttached(true); onNotice?.(`Attached Arena Quiz (${questions.length} rounds)!`); }}
        onLaunchLobby={handleLaunch} onOpenPreview={() => setIsPreviewOpen(true)} onOpenExport={() => setIsExportOpen(true)}
        onCopyLink={() => { navigator.clipboard.writeText(`${window.location.origin}?compQuiz=${config.roomCode}`); onNotice?.(`Copied join link for arena ${config.roomCode}!`); }}
        onCopySlidesEmbed={() => { navigator.clipboard.writeText(`<iframe src="${window.location.origin}?compQuizEmbed=${config.roomCode}" width="800" height="600" />`); onNotice?.('Copied Google Slides embed code!'); }}
      />
      <CompetitiveQuizInsightsCard insights={insights} setInsights={setInsights} questions={questions} totalRounds={config.totalRounds} />
      <MatchDurationStepperCard totalRounds={config.totalRounds} speedLimitSeconds={config.speedLimitSeconds} onChangeCount={handleChangeCount} />
      <ChunkExtractionPipelineCard lessonTitle={config.lessonTitle} chunks={chunks} questions={questions} totalRounds={config.totalRounds} selectedFormats={config.selectedFormats} onUpdateQuestions={setQuestions} onNotice={onNotice} />
      <FormatRecipeSelector selectedFormats={config.selectedFormats} onChangeFormats={handleUpdateFormats} />
      <RoomConfigControls config={config} onChangeConfig={setConfig} />
      <VoiceSelectorCard preset={config.voicePreset} onChangePreset={(vp) => setConfig({ ...config, voicePreset: vp })} />
      <QuestionCardPreviewList questions={questions} onChangeQuestions={setQuestions} onRefreshQuestions={async () => {
        setIsLoading(true);
        const fresh = await fetchAICompetitiveQuizQuestions(lessonTitle, chunks, config.totalRounds, config.selectedFormats);
        setQuestions(fresh);
        setIsLoading(false);
        onNotice?.('Fresh diverse curriculum questions generated!');
      }} isLoading={isLoading} />
      <ExportModal isOpen={isExportOpen} lessonTitle={config.lessonTitle} questions={questions} onClose={() => setIsExportOpen(false)} />
      <LiveArenaDualScreenPreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} roomCode={config.roomCode} questions={questions} voicePreset={config.voicePreset} onLaunchLobby={handleLaunch} />
    </div>
  );
};
