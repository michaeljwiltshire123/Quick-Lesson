export interface PersonaStyle {
  name: string;
  description: string;
  instruction: string;
}

export const PERSONA_STYLES: Record<string, PersonaStyle> = {
  scenarios: {
    name: 'Real-World Scenarios',
    description: 'Practical, scenario-led scenarios in professional settings.',
    instruction: 'Framed as real-world scenarios or industrial case studies that require practical analysis.',
  },
  exam: {
    name: 'Exam Practice',
    description: 'Formatted to align with UK board specifications (AQA, Pearson, OCR).',
    instruction: 'Structured with explicit command words (e.g. "Identify", "Explain", "Evaluate") matching UK standard specifications.',
  },
  concise: {
    name: 'Direct & Concise',
    description: 'Straightforward, distraction-free assessment questions.',
    instruction: 'Direct, clear, simple phrasing, avoiding any fluff, unnecessary context, or trick words.',
  },
};

export const GRADE_LEVELS = [
  { value: 'KS3', label: 'Key Stage 3' },
  { value: 'KS4', label: 'Key Stage 4' },
  { value: 'A-Level', label: 'A-Level (Key Stage 5)' },
  { value: 'BTEC', label: 'BTEC Professional Suite' },
];

export function getPersonaInstruction(personaKey: string, grade: string): string {
  const persona = PERSONA_STYLES[personaKey] || PERSONA_STYLES.scenarios;
  return `Target Pupil Academic Grade: ${grade}. Persona Tone & Phrasing: ${persona.instruction}. Ensure British English spellings (e.g., "programme", "behaviour", "prioritise").`;
}
