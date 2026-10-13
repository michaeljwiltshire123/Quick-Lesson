import React, { useState } from 'react';
import { DontSayItRoomConfig, SecretWordCard, DontSayItGameState } from '../types/dontSayItTypes';
import { DontSayItMainBoard } from '../board/DontSayItMainBoard';
import { FloatingEmoji } from '../board/FloatingReactionsOverlay';
import { DontSayItSimulationBar } from './DontSayItSimulationBar';
import { DevicePhoneMockup } from './DevicePhoneMockup';
import { DeviceRoleSwitcher, PreviewRoleOption } from './DeviceRoleSwitcher';
import { StudentDontSayItContainer } from '../student_view/StudentDontSayItContainer';
import { DontSayItAnalytics } from '../analytics/DontSayItAnalytics';
import { buildSimulatedState } from './DontSayItPreviewStateHelper';
import { DontSayItPreviewScreenTabs } from './DontSayItPreviewScreenTabs';
import { usePreviewGameSession } from './usePreviewGameSession';

interface Props {
  config: DontSayItRoomConfig;
  cards: SecretWordCard[];
  onBackToSetup: () => void;
  onNotice?: (msg: string) => void;
}

export const DontSayItPlayPreview: React.FC<Props> = ({ config, cards, onBackToSetup, onNotice }) => {
  const [activeRole, setActiveRole] = useState<PreviewRoleOption>('clue_giver');
  const [reactions, setReactions] = useState<FloatingEmoji[]>([]);
  const [adjudication, setAdjudication] = useState<DontSayItGameState['adjudication']>({
    type: 'foul', triggeredByPlayerId: 'p-judge-1', triggeredByName: 'Amelia (Judge)', votesFor: 0, votesAgainst: 0, totalJudges: 2, frozenTimeLeft: 42, frozenPoints: 720, isActive: false,
  });

  const session = usePreviewGameSession(cards);
  const statusOverride: DontSayItGameState['status'] = session.phase === 'standings' ? 'round_recap' : session.phase === 'live_game' ? 'in_game' : 'lobby';
  const { gameState, currentPupil } = buildSimulatedState(config, cards, activeRole, adjudication, session.phase === 'live_game', statusOverride, session.teams);

  const handleSendReaction = (emoji: string) => {
    const newEmoji: FloatingEmoji = { id: `rx-${Date.now()}`, emoji, xPercent: 12 + Math.random() * 75, authorName: currentPupil.name };
    setReactions((prev) => [...prev.slice(-6), newEmoji]);
    setTimeout(() => setReactions((prev) => prev.filter((r) => r.id !== newEmoji.id)), 3500);
  };

  return (
    <div className="space-y-4">
      <DontSayItSimulationBar
        isAdjudicating={Boolean(adjudication?.isActive)}
        isRoundActive={session.phase === 'live_game'}
        onBackToSetup={onBackToSetup}
        onTriggerFoul={() => { session.triggerFoulForfeit(); onNotice?.('Foul flagged! Round forfeited.'); }}
        onHeardTheWord={() => { session.triggerWordGuessed(760); onNotice?.('Word guessed! Showing points & standings.'); }}
        onSendReaction={handleSendReaction}
        onResetTimer={() => session.setPhase('live_game')}
        onToggleRound={() => session.setPhase(session.phase === 'live_game' ? 'setup' : 'live_game')}
      />

      <DontSayItPreviewScreenTabs currentPhase={session.phase} onChangePhase={session.setPhase} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between px-1 text-xs font-black uppercase text-gray-700">
            <span>Projector Display: {session.phase === 'live_game' ? '🎮 Live Game Screen' : session.phase === 'standings' ? '🏆 Standings & Points Recap' : '📋 Between-Rounds Setup'}</span>
            <span className="text-[10px] text-amber-600 font-bold">Turn: {session.activeTeam.name}</span>
          </div>
          <DontSayItMainBoard
            gameState={gameState}
            resolution={session.resolution}
            reactions={reactions}
            isUnlocked={session.phase === 'live_game'}
            onStartRound={() => { session.setPhase('live_game'); onNotice?.('60s round is live!'); }}
            onAdvanceToSetup={() => { session.advanceToNextRoundSetup(); onNotice?.('Advanced to next squad setup!'); }}
            onAwardTeacherBonus={(pts) => { session.awardTeacherBonus(pts); onNotice?.(`Awarded +${pts} pts!`); }}
            onTimeout={() => { session.triggerTimeout(); onNotice?.('Time ran out!'); }}
          />
        </div>

        <div className="lg:col-span-5 space-y-3">
          <DeviceRoleSwitcher activeRole={activeRole} onChangeRole={setActiveRole} />
          <DevicePhoneMockup roleLabel={activeRole.replace('_', ' ')} pupilName={currentPupil.name}>
            <StudentDontSayItContainer
              currentStudent={currentPupil}
              gameState={gameState}
              resolution={session.resolution}
              isRoundActive={session.phase === 'live_game'}
              onUnlockAntiPeek={() => { session.setPhase('live_game'); onNotice?.('Round started!'); }}
              onAdvanceToSetup={() => { session.advanceToNextRoundSetup(); onNotice?.('Next squad setup ready!'); }}
              onSendReaction={handleSendReaction}
              onTriggerFoul={() => session.triggerFoulForfeit()}
              onHeardTheWord={() => session.triggerWordGuessed(760)}
              onConfirmAdjudication={() => setAdjudication((p) => ({ ...p!, isActive: false }))}
              onContinueAdjudication={() => setAdjudication((p) => ({ ...p!, isActive: false }))}
              onNotice={onNotice}
            />
          </DevicePhoneMockup>
        </div>
      </div>

      <DontSayItAnalytics lessonTitle={config.lessonTitle} totalCardsPlayed={cards.length} />
    </div>
  );
};
