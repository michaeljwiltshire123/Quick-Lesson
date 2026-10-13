export const getCoreExplanationPrompt = (title: string, lessonTitle: string, course: string, subject: string, gradeLevel: string, themeNotes: string) => `You are an expert UK teacher creating slide content for "${title}" in "${lessonTitle || title}" (Subject: ${subject || 'General'}, Level: ${gradeLevel || 'Secondary'}).
Theme Notes: "${themeNotes || ''}".
Rules:
1. British English spelling throughout.
2. coreExplanation: 1-2 punchy sentences (MAX 25 words).
3. howToUse: 3-5 bullets (MAX 8 words each, format "Header: Action").
4. whyToUse: 3-5 bullets (MAX 8 words each, format "Header: Benefit").
5. example: A concrete example or demonstration of this concept (under 50 words). Show a real classroom example, sample sentence, student demonstration, or practical application directly relevant to ${subject || 'the subject'}.
CRITICAL RULE: Do NOT include any maths, algebra, arithmetic, equations, or numbers unless the subject is explicitly Mathematics or Physics.
Return ONLY raw JSON:
{ "coreExplanation": "...", "howToUse": ["..."], "whyToUse": ["..."], "example": "..." }`;

export const getFormativeTaskPrompt = (title: string, subject: string, gradeLevel: string, grouping: string, nonce: any, themeNotes: string, deliverables: any, criteriaStr: string) => `You are a master UK curriculum educator. Generate 9 active formative tasks (3-8 min) for "${title}" (${subject || 'General'}, ${gradeLevel || 'Secondary'}).
Grouping: "${grouping || 'Any'}". Refresh Seed: ${nonce}. Theme: "${themeNotes || ''}". Deliverables: "${deliverables}". Criteria: "${criteriaStr}".
Use British English. Map 1 task to each of Howard Gardner's 9 Multiple Intelligences (Linguistic, Logical, Visual, Kinesthetic, Musical, Interpersonal, Intrapersonal, Naturalistic, Existential).
Return ONLY raw JSON:
{ "activities": [{ "id": "task-1", "title": "...", "intelligence": "...", "criteria": [], "task": "...", "rules": "..." }] }`;
