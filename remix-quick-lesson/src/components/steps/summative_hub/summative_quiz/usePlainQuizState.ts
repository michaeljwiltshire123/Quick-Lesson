import { useState, useEffect } from 'react';
import { SummativeQuizQuestion, QuizViewMode, DurationPreset, QuizSummaryReport } from './typesSummativeQuiz';
import { generateQuizQuestions } from './quizGenerator';
import { generateGroundedQuizQuestions } from './services/quizGenerator';
import { QuizQuestionStyle } from './services/quizPromptBuilder';
import { LessonChunk, ModuleScheme } from '../../../../types';

export const usePlainQuizState = (
  lessonTitle: string,
  chunks: LessonChunk[],
  gradeLevel?: string,
  moduleScheme?: ModuleScheme,
  onNotice?: (msg: string) => void
) => {
  const [quizTitle, setQuizTitle] = useState(
    lessonTitle ? `${lessonTitle}: Summative Quiz` : 'Summative Assessment Quiz'
  );
  // Start with lightweight array instantly to prevent any UI freeze
  const [questions, setQuestions] = useState<SummativeQuizQuestion[]>([]);
  const [durationPreset, setDurationPreset] = useState<DurationPreset>('10m');
  const [questionCount, setQuestionCount] = useState(6);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(10);
  const [questionStyle, setQuestionStyle] = useState<QuizQuestionStyle>('teen_engaging');
  const [viewMode, setViewMode] = useState<QuizViewMode>('edit');
  const [cohortTag, setCohortTag] = useState('Period 1 Media');
  const [summaryReport, setSummaryReport] = useState<QuizSummaryReport | null>(null);
  const [isAttached, setIsAttached] = useState(() => Boolean(sessionStorage.getItem('attached_summative_quiz')));
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const activeGradeLevel = gradeLevel || moduleScheme?.gradeLevel || 'BTEC Level 3';

  // Generate questions non-blockingly on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuestions(generateQuizQuestions(lessonTitle, chunks, 6));
    }, 10);
    return () => clearTimeout(timer);
  }, [lessonTitle, chunks]);

  const handleAddQuestion = () => {
    if (questions.length >= 25) return;
    const nextIdx = questions.length;
    const chunkIdx = chunks.length > 0 ? nextIdx % chunks.length : undefined;
    const chunk = chunkIdx !== undefined ? chunks[chunkIdx] : undefined;
    setQuestions([
      ...questions,
      {
        id: `q-${Date.now()}`,
        questionNumber: nextIdx + 1,
        prompt: 'New assessment question...',
        choices: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctChoiceIndex: 0,
        explanation: 'Explanation for correct choice.',
        chunkIndex: chunkIdx,
        chunkTitle: chunk?.title,
        learningIntent: chunk?.learningIntent,
      },
    ]);
    setQuestionCount(nextIdx + 1);
  };

  const handlePresetChange = (preset: DurationPreset, qCount: number, minutes: number) => {
    setDurationPreset(preset);
    setQuestionCount(qCount);
    setTimeLimitMinutes(minutes);
    if (questions.length < qCount) {
      const needed = qCount - questions.length;
      const extra = generateQuizQuestions(lessonTitle, chunks, needed).map((q, idx) => ({
        ...q,
        id: `q-${Date.now()}-${idx}`,
        questionNumber: questions.length + idx + 1,
      }));
      setQuestions([...questions, ...extra]);
    } else if (questions.length > qCount) {
      setQuestions(questions.slice(0, qCount));
    }
  };

  const handleGenerateAi = async () => {
    setIsGenerating(true);
    try {
      const grounded = await generateGroundedQuizQuestions(
        quizTitle,
        activeGradeLevel,
        chunks,
        [],
        questionCount,
        questionStyle
      );
      setQuestions(grounded);
      onNotice?.(`Generated ${grounded.length} lesson-grounded questions for ${activeGradeLevel}.`);
    } catch {
      setQuestions(generateQuizQuestions(lessonTitle, chunks, questionCount));
      onNotice?.('Applied lesson questions.');
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    quizTitle, setQuizTitle, questions, setQuestions,
    durationPreset, questionCount, timeLimitMinutes, questionStyle, setQuestionStyle,
    gradeLevel: activeGradeLevel,
    viewMode, setViewMode, cohortTag, setCohortTag,
    summaryReport, setSummaryReport, isAttached, setIsAttached,
    isGenerating, isPreviewOpen, setIsPreviewOpen,
    handleAddQuestion, handlePresetChange, handleGenerateAi,
  };
};
