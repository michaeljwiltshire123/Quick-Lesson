import { Request, Response } from 'express';
import { executeGenAI, resetCircuitBreaker } from './aiHandlers';

export async function handleInteractivePayloads(req: Request, res: Response) {
  const { chunkTitle, lessonTitle, subject, gradeLevel, questionCount = 5, questionMix = 'mix', customFocus } = req.body;
  const topic = chunkTitle || lessonTitle || 'Teaching Concept';
  const count = Math.min(Math.max(Number(questionCount) || 5, 3), 10);
  const mixGuide = questionMix === 'tf'
    ? 'All questions MUST be True/False (options: ["True", "False"], correctAnswer: 1 or 2).'
    : questionMix === 'mcq'
    ? 'All questions MUST be 4-option multiple-choice (options: 4 distinct choices, correctAnswer: 1-4).'
    : 'Provide a balanced mix of 4-option multiple-choice and True/False questions.';

  const prompt = `You are a Senior UK Curriculum Assessor. Generate exactly ${count} diagnostic quiz questions for "${topic}".
Focus Area: "${customFocus || 'Core syllabus principles and practical application'}".
Subject: "${subject || 'General'}", Key Stage: "${gradeLevel || 'Secondary'}".
Format: ${mixGuide}. Use British English spelling throughout.

Return ONLY raw JSON:
{
  "questions": [
    {
      "id": "q1",
      "question": "Clear question text?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": 1,
      "explanation": "Pedagogical rationale"
    }
  ]
}`;

  const fallbackQuestions = Array.from({ length: count }, (_, i) => ({
    id: `q${i + 1}`,
    question: `Key diagnostic check ${i + 1}: What is the core principle of ${topic}?`,
    options: questionMix === 'tf' ? ['True', 'False'] : ['Core principle', 'Secondary factor', 'Common misconception', 'Unrelated parameter'],
    correctAnswer: 1,
    explanation: `Assesses fundamental comprehension of ${topic}.`,
  }));

  try {
    const parsed = await executeGenAI(prompt, JSON.stringify({ questions: fallbackQuestions }));
    resetCircuitBreaker();
    const questions = Array.isArray(parsed?.questions) && parsed.questions.length > 0 ? parsed.questions : fallbackQuestions;
    return res.json({ questions });
  } catch {
    return res.json({ questions: fallbackQuestions });
  }
}
