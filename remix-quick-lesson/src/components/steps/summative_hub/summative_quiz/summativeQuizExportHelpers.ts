import { SummativeQuizQuestion } from './typesSummativeQuiz';

export function downloadKahootCsv(title: string, questions: SummativeQuizQuestion[]): void {
  const headers = ['Question - 120 seconds max', 'Answer 1', 'Answer 2', 'Answer 3', 'Answer 4', 'Time limit (sec)', 'Correct Answer(s)'];
  const rows = questions.map((q) => {
    const choices = [q.choices[0] || '', q.choices[1] || '', q.choices[2] || '', q.choices[3] || ''];
    const correctNum = (q.correctChoiceIndex + 1).toString();
    return [`"${q.prompt.replace(/"/g, '""')}"`, ...choices.map(c => `"${c.replace(/"/g, '""')}"`), '20', correctNum];
  });

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}_kahoot_import.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToGoogleForms(title: string, questions: SummativeQuizQuestion[]): string {
  const formPayload = {
    title,
    documentTitle: `${title} - Summative Assessment`,
    items: questions.map((q, idx) => ({
      questionNumber: idx + 1,
      questionText: q.prompt,
      choices: q.choices,
      correctIndex: q.correctChoiceIndex,
      explanation: q.explanation,
    })),
  };
  return `https://docs.google.com/forms/create?usp=quicklesson&data=${encodeURIComponent(JSON.stringify(formPayload))}`;
}
