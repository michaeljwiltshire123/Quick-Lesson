import { QuestionCard } from '../types/competitiveQuizTypes';

const toText = (val: any): string => {
  if (typeof val === 'string') return val;
  if (val && typeof val === 'object') {
    return val.left && val.right ? `${val.left} ➔ ${val.right}` : val.text || Object.values(val).join(' ➔ ');
  }
  return String(val ?? '');
};

export const exportQuestionsToGoogleFormsCsv = (
  lessonTitle: string,
  questions: QuestionCard[]
): void => {
  const headers = [
    'Question Text',
    'Question Type',
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Correct Answer',
    'Explanation / Mark Scheme',
    'Points',
  ];

  const escapeCsv = (val: any) => `"${toText(val).replace(/"/g, '""')}"`;

  const rows = questions.map((q) => {
    const opts = q.options || [];
    const correctLetter = q.correctIndex !== undefined ? String.fromCharCode(65 + q.correctIndex) : 'A';
    const correctChoiceText = q.correctIndex !== undefined && opts[q.correctIndex] ? toText(opts[q.correctIndex]) : correctLetter;

    return [
      escapeCsv(q.prompt),
      escapeCsv(q.formatLabel || 'Multiple Choice'),
      escapeCsv(opts[0] || ''),
      escapeCsv(opts[1] || ''),
      escapeCsv(opts[2] || ''),
      escapeCsv(opts[3] || ''),
      escapeCsv(correctChoiceText),
      escapeCsv(q.explanation || ''),
      q.potValue || 10,
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  const sanitizedTitle = (lessonTitle || 'quiz')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .slice(0, 30);

  link.setAttribute('href', url);
  link.setAttribute('download', `${sanitizedTitle}_google_forms_import.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
