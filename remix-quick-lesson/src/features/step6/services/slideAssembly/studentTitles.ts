const labels: Record<string, string> = {
  true_false: 'True or False',
  forced_dichotomy: 'Choose a Side',
  paradox: 'Think It Through',
  would_you_rather: 'Would You Rather',
  predict_disaster: 'Make a Prediction',
  finger_scale: 'How Confident Are You?',
  socratic_tension: 'Compare the Claims',
};

export function studentTitle(value: string): string {
  const concise = value.trim()
    .replace(/^(?:lesson\s+)?(?:chunk|concept|phase|section|step)\s*#?\d+\s*[:—-]\s*/i, '')
    .replace(/^(lesson|topic|learning intention):\s*/i, '');
  return concise.split(/\s+(?:—|\|)\s+/)[0].trim();
}

export function starterTitle(formatType: string, prompt: string): string {
  return labels[formatType] || studentTitle(prompt);
}
