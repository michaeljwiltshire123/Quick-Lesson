import React, { useState } from 'react';
import { ImposterRole, ImposterQuestion, ImposterAttackKey } from '../types/imposterTypes';
import { AvatarCustomizerModal } from './AvatarCustomizerModal';
import { SecretRoleCard } from './SecretRoleCard';
import { StudentAnswerForm } from './StudentAnswerForm';
import { WifiRecoveryGuard } from './WifiRecoveryGuard';
import { StudentHeaderBar } from './StudentHeaderBar';
import { AttackBarControls, AttackExecutionSwitch, calculateAttackCharge } from '../attacks';
import { GhostWorkshopModal } from '../ghost';

interface Props {
  lessonTitle: string;
  studentName: string;
  role: ImposterRole;
  question: ImposterQuestion;
  onSubmitAnswer: (ans: string) => void;
  onExit?: () => void;
}

export const StudentViewContainer: React.FC<Props> = ({
  lessonTitle,
  studentName,
  role,
  question,
  onSubmitAnswer,
  onExit,
}) => {
  const [avatar, setAvatar] = useState({ id: 'av-owl', emoji: '🦉', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' });
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(true);
  const [answer, setAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [charge, setCharge] = useState(50);
  const [armedAttack, setArmedAttack] = useState<ImposterAttackKey | null>(null);
  const [isGhostOpen, setIsGhostOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    onSubmitAnswer(answer.trim());
    setHasSubmitted(true);
    if (role === 'imposter') setCharge((prev) => calculateAttackCharge(prev, 'speedy_blend'));
  };

  return (
    <div id="imposter-student-view-container" className="max-w-md mx-auto min-h-screen bg-[#F8F6F0] p-4 flex flex-col justify-between space-y-4">
      <div className="space-y-4">
        <StudentHeaderBar
          studentName={studentName}
          avatarEmoji={avatar.emoji}
          avatarColor={avatar.color}
          onOpenCustomizer={() => setIsAvatarModalOpen(true)}
          onExit={onExit}
        />
        <SecretRoleCard role={role} question={question} lessonTitle={lessonTitle} />

        <StudentAnswerForm
          question={question}
          answer={answer}
          hasSubmitted={hasSubmitted}
          onAnswerChange={setAnswer}
          onSubmit={handleSubmit}
        />

        {role === 'imposter' && (
          <div className="space-y-3 pt-1">
            <AttackBarControls
              chargePercentage={charge}
              onApplyBonus={(bonus) => setCharge((prev) => calculateAttackCharge(prev, bonus))}
              onSelectAttack={(key) => setArmedAttack(key)}
              activeAttack={armedAttack}
            />
            {armedAttack && (
              <AttackExecutionSwitch
                attackKey={armedAttack}
                onExecuteAttack={() => { setArmedAttack(null); setCharge(0); }}
                onCancel={() => setArmedAttack(null)}
              />
            )}
          </div>
        )}
      </div>

      <AvatarCustomizerModal
        isOpen={isAvatarModalOpen}
        initialAvatarId={avatar.id}
        onSelectAvatar={(id, color, emoji) => {
          setAvatar({ id, emoji: emoji || '🦉', color: color || '' });
          setIsAvatarModalOpen(false);
        }}
      />
      <WifiRecoveryGuard isOffline={isOffline} onForcedResignation={() => { setIsOffline(false); onExit?.(); }} onManualReconnect={() => setIsOffline(false)} />
      <GhostWorkshopModal isOpen={isGhostOpen} onClose={() => setIsGhostOpen(false)} onSubmitDecoy={() => setIsGhostOpen(false)} studentName={studentName} />
    </div>
  );
};
