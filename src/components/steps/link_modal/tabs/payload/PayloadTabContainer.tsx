import React, { useState } from 'react';
import { PayloadControls } from './PayloadControls';
import { PayloadReviewCards } from './PayloadReviewCards';
import { PayloadExportActions } from './PayloadExportActions';
import { QuizQuestionItem, QuestionMixType } from './types';
import { getAccessToken, googleSignIn } from '../../../../../services/google/googleAuth';
import { ChunkAttachment } from '../../../../../types';

interface PayloadTabContainerProps {
  chunkTitle: string;
  subject?: string;
  gradeLevel?: string;
  onAddAttachment?: (att: Partial<ChunkAttachment>) => void;
}

export const PayloadTabContainer: React.FC<PayloadTabContainerProps> = ({
  chunkTitle, subject, gradeLevel, onAddAttachment,
}) => {
  const [questionCount, setQuestionCount] = useState(5);
  const [questionMix, setQuestionMix] = useState<QuestionMixType>('mix');
  const [customFocus, setCustomFocus] = useState('');
  const [questions, setQuestions] = useState<QuizQuestionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExportingDrive, setIsExportingDrive] = useState(false);
  const [driveFormUrl, setDriveFormUrl] = useState<string | null>(null);
  const [downloadedCsvName, setDownloadedCsvName] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch('/api/generate-lesson-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'interactive_payloads', chunkTitle, subject, gradeLevel, questionCount, questionMix, customFocus }),
      });
      const data = await resp.json();
      if (Array.isArray(data.questions) && data.questions.length > 0) setQuestions(data.questions);
    } catch {
      setQuestions([
        { id: '1', question: `What is the key principle of ${chunkTitle}?`, options: ['Core foundation', 'Secondary factor', 'Misconception', 'Unrelated parameter'], correctAnswer: 1, explanation: 'Direct foundation of the topic.' },
        { id: '2', question: `Applying ${chunkTitle} requires evaluating which element?`, options: ['Measured outcome', 'Arbitrary index', 'Static assumption', 'Unverified metric'], correctAnswer: 1, explanation: 'Verifies analytical rigor.' },
      ]);
    } finally { setIsLoading(false); }
  };

  const handleUpdateQuestion = (idx: number, updated: QuizQuestionItem) => {
    setQuestions((prev) => prev.map((q, i) => (i === idx ? updated : q)));
  };

  const handleExportGoogleDrive = async () => {
    let token = getAccessToken();
    if (!token) {
      const authResult = await googleSignIn();
      token = authResult?.token || null;
    }
    if (!token) return;
    setIsExportingDrive(true);
    try {
      const res = await fetch('/api/export-to-google-drive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ lessonTitle: chunkTitle, questions }),
      });
      const data = await res.json();
      if (data.formUrl) {
        setDriveFormUrl(data.formUrl);
        onAddAttachment?.({ name: `Quiz: ${chunkTitle}`, url: data.formUrl, platform: 'google_forms', type: 'quiz' });
      }
    } finally { setIsExportingDrive(false); }
  };

  const handleDownloadKahootCsv = () => {
    const header = 'Question,Answer 1,Answer 2,Answer 3,Answer 4,Time limit,Correct answer';
    const rows = questions.map((q) => `"${q.question.replace(/"/g, '""')}","${(q.options[0] || '').replace(/"/g, '""')}","${(q.options[1] || '').replace(/"/g, '""')}","${(q.options[2] || '').replace(/"/g, '""')}","${(q.options[3] || '').replace(/"/g, '""')}",30,${q.correctAnswer}`);
    const csvContent = [header, ...rows].join('\n');
    const fileName = `kahoot_${chunkTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_quiz.csv`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = fileName; link.click(); URL.revokeObjectURL(url);
    setDownloadedCsvName(fileName);
    onAddAttachment?.({ name: `Kahoot: ${chunkTitle}`, url: `file://${fileName}`, platform: 'kahoot', type: 'quiz' });
  };

  return (
    <div className="space-y-4">
      <PayloadControls questionCount={questionCount} onQuestionCountChange={setQuestionCount} questionMix={questionMix} onQuestionMixChange={setQuestionMix} customFocus={customFocus} onCustomFocusChange={setCustomFocus} onGenerate={handleGenerate} isLoading={isLoading} />
      <PayloadReviewCards questions={questions} onUpdateQuestion={handleUpdateQuestion} />
      <PayloadExportActions onExportGoogleDrive={handleExportGoogleDrive} onDownloadKahootCsv={handleDownloadKahootCsv} isExportingDrive={isExportingDrive} hasQuestions={questions.length > 0} driveFormUrl={driveFormUrl} downloadedCsvName={downloadedCsvName} />
    </div>
  );
};
