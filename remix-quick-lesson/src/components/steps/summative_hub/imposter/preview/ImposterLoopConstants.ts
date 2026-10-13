import { BoardPhase } from './ProjectorHeaderNav';

export interface PhaseTimingConfig {
  phase: BoardPhase;
  duration: number; // in seconds
  label: string;
}

export const GAME_LOOP_TIMINGS: Record<BoardPhase, number> = {
  task: 45,        // Step 3: Knowledge Task & Secret Submissions
  discussion: 25,  // Step 4: Class Discussion & Auto-cycling answers
  voting: 20,      // Step 5: Voting Ballot
  elimination: 12, // Step 6: Reveal double kills & ghost master
};

export const NEXT_PHASE_MAP: Record<BoardPhase, BoardPhase> = {
  task: 'discussion',
  discussion: 'voting',
  voting: 'elimination',
  elimination: 'task',
};
