import { LimerickFormState, LimerickItem } from './types';

export async function generateLimerickOptionsApi(formState: LimerickFormState, subject?: string, gradeLevel?: string): Promise<LimerickItem[]> {
  try {
    const res = await fetch('/api/generate-limerick', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        concept: formState.concept,
        takeawayGoal: formState.takeawayGoal,
        acronym: formState.mnemonic,
        poetryStyle: formState.style,
        subject: subject || 'General',
        gradeLevel: gradeLevel || 'General'
      })
    });
    if (!res.ok) throw new Error('Server generation failed');
    const data = await res.json();
    if (Array.isArray(data?.verses) && data.verses.length > 0) {
      return data.verses;
    }
  } catch (err) {
    console.warn('API generation fallback used:', err);
  }

  return [
    {
      id: `lim-${Date.now()}-1`,
      title: `${formState.concept} - Classic ${formState.style}`,
      style: formState.style,
      verses: [
        `There once was a concept so bright,`,
        `That shed on all learners a light.`,
        `With ${formState.takeawayGoal},`,
        `It reaches the goal,`,
        `And makes every problem feel right!`
      ],
      mnemonic: formState.mnemonic,
      takeawayGoal: formState.takeawayGoal,
      selected: true
    },
    {
      id: `lim-${Date.now()}-2`,
      title: `${formState.concept} - Rhythmic Flow`,
      style: formState.style,
      verses: [
        `Listen up students, take note of the rule,`,
        `The smartest approach in the classroom and school.`,
        `Focus on ${formState.concept} right from the start,`,
        `And master the method with science and art!`
      ],
      mnemonic: formState.mnemonic,
      takeawayGoal: formState.takeawayGoal,
      selected: false
    }
  ];
}
