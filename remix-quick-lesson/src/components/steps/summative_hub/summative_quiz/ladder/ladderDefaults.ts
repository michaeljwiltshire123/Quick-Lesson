import { LadderQuizConfig, LifelineType, LadderRungQuestion } from './typesLadder';
import { LessonChunk } from '../../../../../types';

export const DEFAULT_LIFELINES: LifelineType[] = ['fifty_fifty', 'ask_room', 'safety_shield'];

export function generateDefaultLadderRungs(count: number = 10, topic: string = 'Lesson Assessment', chunks: LessonChunk[] = []): LadderRungQuestion[] {
  const basePoints = [
    100, 200, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000,
    500000, 750000, 1000000, 1500000, 2000000, 2500000, 3000000, 4000000, 5000000, 6000000, 7500000, 9000000, 10000000
  ];
  
  return Array.from({ length: count }, (_, idx) => {
    const rungNum = idx + 1;
    const pts = basePoints[idx] || (rungNum * 10000);
    const chunk = chunks[idx % Math.max(chunks.length, 1)];
    const conceptName = chunk?.title || topic || 'Media Production';

    const styles = [
      {
        intro: `Welcome to Rung ${rungNum}! Let's check your key principles.`,
        prompt: `When directing a scene focused on ${conceptName}, what is the best first move?`,
        choices: [
          `Apply key principles of ${conceptName} to capture clear action`,
          'Skip planning and film randomly without focus',
          'Use an unrelated technique that ignores the scene goal',
          'Rely solely on post-production graphics to fix errors'
        ]
      },
      {
        intro: `Step right up for Rung ${rungNum}! Time to spot the mistake!`,
        prompt: `An editor tried using ${conceptName} but created a confusing clip. What went wrong?`,
        choices: [
          `They ignored the core rule of ${conceptName}`,
          'They double-checked their camera settings carefully',
          'They asked a peer to review the draft outline',
          'They followed the storyboard instructions step-by-step'
        ]
      },
      {
        intro: `Rung ${rungNum} is live! Show us your team strategy!`,
        prompt: `Your team needs to demonstrate ${conceptName} in 30 seconds. Which method works best?`,
        choices: [
          `Show a direct visual example illustrating ${conceptName}`,
          'Explain a completely unrelated topic',
          'Turn off the screen and talk without visuals',
          'Use misleading terminology that confuses the audience'
        ]
      },
      {
        intro: `Big points on Rung ${rungNum}! How do we ensure top quality?`,
        prompt: `When designing a digital project about ${conceptName}, which choice ensures high quality?`,
        choices: [
          `Prioritise clear formatting and accurate ${conceptName} application`,
          'Focus only on bright background colours',
          'Copy another project without checking facts',
          'Leave half of the project unfinished'
        ]
      }
    ];

    const chosen = styles[idx % styles.length];

    return {
      id: `rung-${rungNum}-${Date.now()}`,
      rungNumber: rungNum,
      pointValue: pts,
      presenterIntro: chosen.intro,
      prompt: chosen.prompt,
      choices: chosen.choices,
      correctChoiceIndex: 0,
      explanation: `Grounded in ${conceptName}.`,
      timerSeconds: 20,
      isSafetyNet: rungNum === 3 || rungNum === 7,
    };
  });
}

export function createDefaultLadderConfig(lessonTitle: string, chunks: LessonChunk[]): LadderQuizConfig {
  return {
    title: lessonTitle ? `${lessonTitle}: Escalation Ladder` : 'Escalation Ladder Assessment',
    totalRungs: 10,
    skin: 'film_tower',
    activeLifelines: ['fifty_fifty', 'ask_room', 'safety_shield', 'ask_player', 'question_swap'],
    maxStudentLifelines: 3,
    safetyNets: [3, 7],
    rungs: generateDefaultLadderRungs(10, lessonTitle, chunks),
  };
}
