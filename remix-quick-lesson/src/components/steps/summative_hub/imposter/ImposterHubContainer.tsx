import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { ImposterGameState, ImposterRoomConfig } from './types/imposterTypes';
import { ImposterInlineSetupView } from './setup';
import { ImposterActiveRoomBanner } from './ImposterActiveRoomBanner';
import { ImposterAttachedBanner } from './ImposterAttachedBanner';
import { TeacherLiveSessionContainer } from './teacher_display';
import { createImposterRoom } from './services/imposterApi';
import { LessonChunk } from '../../../../types';

interface Props {
  lessonTitle: string;
  chunks?: LessonChunk[];
  onNotice?: (msg: string) => void;
}

export const ImposterHubContainer: React.FC<Props> = ({ lessonTitle, chunks = [], onNotice }) => {
  const [isLiveOpen, setIsLiveOpen] = useState(false);
  const [isReconfiguring, setIsReconfiguring] = useState(false);
  const [gameState, setGameState] = useState<ImposterGameState | null>(null);
  const [isAttached, setIsAttached] = useState(() => Boolean(sessionStorage.getItem('attached_imposter_game')));

  const handleLaunchLobby = async (config: ImposterRoomConfig) => {
    const created = await createImposterRoom(config);
    setGameState(created);
    setIsReconfiguring(false);
    onNotice?.(`Imposter room ${created.roomCode} launched successfully.`);
  };

  const handleAttach = (config: ImposterRoomConfig) => {
    sessionStorage.setItem('attached_imposter_game', JSON.stringify(config));
    setIsAttached(true);
    onNotice?.(`Attached Classroom Imposter game (Code: ${config.roomCode}) to lesson plan.`);
  };

  const handleContinueStep5 = () => {
    sessionStorage.setItem('active_lesson_step', '5');
    onNotice?.('Progressing to Step 5: Discussion Starters.');
    window.dispatchEvent(new CustomEvent('quicklesson_step_change', { detail: { step: 5, stepKey: 'discussion_starters' } }));
  };

  return (
    <div id="imposter-hub-container" className="bg-white border border-[#2D2A26]/15 rounded-3xl p-6 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2D2A26]/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
              Active Game
            </span>
            <span className="text-xs text-[#2D2A26]/60">Interactive Group Game</span>
          </div>
          <h2 className="text-xl font-black text-[#2D2A26]">Classroom Imposter</h2>
          <p className="text-xs text-[#2D2A26]/70 max-w-xl">
            Pupils work together to answer questions about the lesson, while hidden imposters try to blend in and bluff their way through!
          </p>
        </div>

        {gameState && !isReconfiguring && (
          <button
            id="btn-reconfigure-imposter"
            type="button"
            onClick={() => setIsReconfiguring(true)}
            className="px-4 py-2.5 rounded-2xl bg-white border border-[#2D2A26]/20 hover:border-amber-400 text-[#2D2A26] font-bold text-xs flex items-center gap-2 shadow-2xs transition-all cursor-pointer shrink-0"
          >
            <Settings className="w-4 h-4 text-amber-600" /> Game Settings
          </button>
        )}
      </div>

      {isAttached && <ImposterAttachedBanner onContinueToStep5={handleContinueStep5} />}

      {gameState && !isReconfiguring ? (
        <ImposterActiveRoomBanner
          gameState={gameState}
          onOpenSetup={() => setIsReconfiguring(true)}
          onPresentMainBoard={() => setIsLiveOpen(true)}
          onNotice={onNotice}
        />
      ) : (
        <ImposterInlineSetupView
          lessonTitle={lessonTitle}
          chunks={chunks}
          onLaunchLobby={handleLaunchLobby}
          onAttach={handleAttach}
          isAttached={isAttached}
          initialConfig={gameState?.config}
          onCancel={gameState ? () => setIsReconfiguring(false) : undefined}
        />
      )}

      {isLiveOpen && gameState && (
        <TeacherLiveSessionContainer gameState={gameState} onClose={() => setIsLiveOpen(false)} onNotice={onNotice} />
      )}
    </div>
  );
};
