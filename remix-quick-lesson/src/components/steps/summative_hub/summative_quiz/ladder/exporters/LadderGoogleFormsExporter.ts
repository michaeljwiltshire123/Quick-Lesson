import { LadderRungQuestion } from '../typesLadder';

export function exportToGoogleFormsCsv(rungs: LadderRungQuestion[], title: string) {
  const headers = ['Question Prompt', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Feedback Explanation'];
  const rows = rungs.map((rung) => {
    const correctVal = rung.choices[rung.correctChoiceIndex] || 'Option A';
    return [
      `"${rung.prompt.replace(/"/g, '""')}"`,
      `"${rung.choices[0]?.replace(/"/g, '""') || ''}"`,
      `"${rung.choices[1]?.replace(/"/g, '""') || ''}"`,
      `"${rung.choices[2]?.replace(/"/g, '""') || ''}"`,
      `"${rung.choices[3]?.replace(/"/g, '""') || ''}"`,
      `"${correctVal.replace(/"/g, '""')}"`,
      `"${rung.explanation.replace(/"/g, '""')}"`
    ];
  });

  const csvContent = 'data:text/csv;charset=utf-8,' 
    + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${title.replace(/\s+/g, '_')}_GoogleForms_Export.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
