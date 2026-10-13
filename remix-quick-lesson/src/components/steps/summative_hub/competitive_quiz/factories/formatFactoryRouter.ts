import { QuestionCard, QuestionFormat } from '../types/competitiveQuizTypes';
import { createSpotTheLieQuestion } from './spotTheLieFactory';
import { createOrderStepsQuestion } from './orderStepsFactory';
import { createOddOneOutQuestion } from './oddOneOutFactory';
import { createTargetHotspotQuestion } from './targetHotspotFactory';
import { createReverseInstructionQuestion } from './reverseInstructionFactory';
import { createScoreSwapQuestion, createAvatarRaceQuestion, createDrawShowdownQuestion } from './actionShowdownFactory';

export const routeQuestionToFactory = (
  format: QuestionFormat,
  chunk: { title?: string; notes?: string },
  lessonTitle: string,
  index: number
): QuestionCard => {
  const topic = chunk.title || lessonTitle;

  switch (format) {
    case 'spot_the_lie':
      return createSpotTheLieQuestion(chunk, lessonTitle, index);
    case 'order_steps':
      return createOrderStepsQuestion(chunk, lessonTitle, index);
    case 'odd_one_out':
      return createOddOneOutQuestion(chunk, lessonTitle, index);
    case 'target_tap':
      return createTargetHotspotQuestion(chunk, lessonTitle, index);
    case 'reverse_instruction':
      return createReverseInstructionQuestion(chunk, lessonTitle, index);
    case 'score_swap':
      return createScoreSwapQuestion(chunk, lessonTitle, index);
    case 'avatar_race':
      return createAvatarRaceQuestion(chunk, lessonTitle, index);
    case 'draw_showdown':
      return createDrawShowdownQuestion(chunk, lessonTitle, index);
    case 'binary_blitz':
      return {
        id: `factory-bin-${index}-${Date.now().toString(36)}`,
        format: 'binary_blitz',
        formatLabel: 'Binary Blitz (True / False)',
        prompt: `True or False: In ${topic}, does the outcome require an external trigger catalyst?`,
        options: ['True', 'False'],
        binaryAnswer: true,
        correctIndex: 0,
        explanation: `True! Verified curriculum models confirm that an active catalyst initiates the transformation.`,
        speedLimitSeconds: 6,
        potValue: 120,
        conceptCovered: topic,
        difficulty: 'starter',
      };
    case 'speed_match': {
      const pairs = [
        { left: `${topic} Input`, right: 'Initial catalyst' },
        { left: `${topic} Process`, right: 'Core reaction' },
        { left: `${topic} Output`, right: 'Final measurable' },
      ];
      return {
        id: `factory-sm-${index}-${Date.now().toString(36)}`,
        format: 'speed_match',
        formatLabel: 'Speed Match Blitz',
        prompt: `Pair each component of ${topic} to its definition under the shrinking timer!`,
        matchedPairs: pairs,
        options: pairs.map((p) => `${p.left} ➔ ${p.right}`),
        correctIndex: 0,
        explanation: `Connecting input, process, and output validates systemic comprehension.`,
        speedLimitSeconds: 12,
        potValue: 160,
        conceptCovered: topic,
        difficulty: 'core',
      };
    }
    case 'wager_drop':
    default:
      return {
        id: `factory-wgr-${index}-${Date.now().toString(36)}`,
        format: 'wager_drop',
        formatLabel: 'Wager Drop (Bid Points)',
        prompt: `HIGH-STAKES BID: What governing law dictates the equilibrium of ${topic}?`,
        options: ['Conservation of dynamic balance', 'Random fluctuation hypothesis', 'Static inert barrier', 'Dissipative noise effect'],
        correctIndex: 0,
        explanation: `Conservation of dynamic balance is the verified law ensuring system equilibrium.`,
        speedLimitSeconds: 10,
        potValue: 220,
        conceptCovered: topic,
        difficulty: 'stretch',
      };
  }
};
