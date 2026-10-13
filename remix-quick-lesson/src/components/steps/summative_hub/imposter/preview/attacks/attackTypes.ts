import React from 'react';

export interface ImposterAttackOption {
  id: 'question_swap' | 'timed_panic' | 'echo_prompt' | 'shadow_vote';
  name: string;
  cost: number;
  desc: string;
  icon: React.ElementType;
}

export interface QueuedQuestionSwap {
  customPrompt: string;
  armedBy: string;
}

export interface QueuedDecoy {
  decoyPrompt: string;
  category: string;
  targetPupilNames: string[];
}

export interface AttackGameState {
  energyPoints: number;
  sneakPeekClue: string | null;
  queuedQuestionSwap: QueuedQuestionSwap | null;
  queuedDecoy: QueuedDecoy | null;
  isShadowVoteArmed: boolean;
}
