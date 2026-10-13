import React, { useState } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { ImposterRoomConfig, ImposterGameState, ImposterQuestion } from '../types/imposterTypes';
import { LessonChunk } from '../../../../../types';
import { ImposterConfigControls } from './ImposterConfigControls';
import { ImposterGamePlanControls } from './ImposterGamePlanControls';
import { RoomLauncherCard } from './RoomLauncherCard';
import { ImposterSetupToolbar } from './ImposterSetupToolbar';
import { ImposterDeckManager } from '../editor';
import { ImposterSimulatorModal } from '../preview';
import { ImposterQualityInspectorModal } from '../inspector';
import { ImposterVoiceSettingsCard, ImposterVoiceConfig } from './ImposterVoiceSettingsCard';
import { ImposterInsightsCard } from './ImposterInsightsCard';
import { fetchChunkGroundedImposterQuestions } from '../factories/chunkGroundedImposterFactory';
import { getInitialImposterDeck } from '../services/imposterQuestionService';

interface Props {
  lessonTitle: string;
  chunks?: LessonChunk[];
  onLaunchLobby?: (config: ImposterRoomConfig) => Promise<ImposterGameState | void>;
  onAttach?: (config: ImposterRoomConfig) => void;
  isAttached?: boolean;
  initialConfig?: ImposterRoomConfig;
  onCancel?: () => void;
}

const generateRandomRoomCode = (): string =>
  Array.from({ length: 4 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.floor(Math.random() * 24)]).join('');

export const ImposterInlineSetupView: React.FC<Props> = ({
  lessonTitle, chunks = [], onLaunchLobby, onAttach, isAttached = false, initialConfig, onCancel,
}) => {
  const [config, setConfig] = useState<ImposterRoomConfig>(() => initialConfig ?? {
    imposterCount: 1, timerPreset: 30, offlinePrintable: false,
    roomCode: generateRandomRoomCode(), lessonTitle: lessonTitle || 'Classroom Inquiry',
    estimatedPlayers: 6, roundsPerGame: 3, targetGamesCount: 3,
  });
  const [voiceConfig, setVoiceConfig] = useState<ImposterVoiceConfig>({
    enabled: true, voiceURI: 'default-uk', speed: 1.0,
  });
  const [questions, setQuestions] = useState<ImposterQuestion[]>(() => getInitialImposterDeck(lessonTitle, chunks, 16));
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [insights, setInsights] = useState(false);

  const handleGenerateAi = async () => {
    setIsGenerating(true);
    try {
      const neededCount = Math.max(12, (config.roundsPerGame || 3) * (config.targetGamesCount || 3) * 2);
      const gen = await fetchChunkGroundedImposterQuestions(lessonTitle, chunks, neededCount);
      if (gen?.length > 0) setQuestions(gen);
    } finally { setIsGenerating(false); }
  };

  return (
    <div id="imposter-inline-setup-view" className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-amber-100 text-amber-800"><Sparkles className="w-4 h-4" /></span>
          <div>
            <h3 className="text-sm font-black text-[#2D2A26]">Room Setup &amp; Question Deck</h3>
            <p className="text-[11px] text-[#2D2A26]/60">Configure classroom parameters and question prompts</p>
          </div>
        </div>
        {initialConfig && onCancel && (
          <button type="button" onClick={onCancel} className="text-xs font-bold text-[#2D2A26]/70 hover:text-[#2D2A26] flex items-center gap-1 cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" /> Back to Active Lobby
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div className="space-y-4">
          <RoomLauncherCard roomCode={config.roomCode} lessonTitle={config.lessonTitle} onRegenerateCode={() => setConfig((p) => ({ ...p, roomCode: generateRandomRoomCode() }))} />
          <ImposterVoiceSettingsCard config={voiceConfig} onChangeConfig={setVoiceConfig} />
        </div>
        <div className="space-y-4">
          <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#2D2A26]/15">
            <ImposterConfigControls config={config} onChange={(upd) => setConfig((p) => ({ ...p, ...upd }))} />
          </div>
          <ImposterGamePlanControls config={config} onChange={(upd) => setConfig((p) => ({ ...p, ...upd }))} />
        </div>
      </div>

      <ImposterSetupToolbar offlinePrintable={config.offlinePrintable} isAttached={isAttached} onAttach={() => onAttach?.(config)} onOpenInspector={() => setIsInspectorOpen(true)} onOpenSimulator={() => setIsSimulatorOpen(true)} onLaunchLobby={onLaunchLobby ? () => onLaunchLobby(config) : undefined} onGenerateAi={handleGenerateAi} isGenerating={isGenerating} />
      <ImposterInsightsCard insights={insights} setInsights={setInsights} lessonTitle={lessonTitle} questions={questions} chunks={chunks} />
      <ImposterDeckManager questions={questions} onChangeQuestions={setQuestions} lessonTitle={lessonTitle} chunks={chunks} isGenerating={isGenerating} onGenerateAi={handleGenerateAi} />
      <ImposterSimulatorModal isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} questions={questions} roomCode={config.roomCode} voiceConfig={voiceConfig} />
      <ImposterQualityInspectorModal isOpen={isInspectorOpen} onClose={() => setIsInspectorOpen(false)} questions={questions} lessonTitle={lessonTitle} />
    </div>
  );
};
