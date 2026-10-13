import { LadderRungQuestion } from '../typesLadder';

export function exportToKahootCsv(rungs: LadderRungQuestion[], title: string) {
  const headers = ['Question', 'Answer 1', 'Answer 2', 'Answer 3', 'Answer 4', 'Time limit (sec)', 'Correct answers'];
  const rows = rungs.map((rung) => {
    return [
      `"${rung.prompt.replace(/"/g, '""')}"`,
      `"${rung.choices[0]?.replace(/"/g, '""') || ''}"`,
      `"${rung.choices[1]?.replace(/"/g, '""') || ''}"`,
      `"${rung.choices[2]?.replace(/"/g, '""') || ''}"`,
      `"${rung.choices[3]?.replace(/"/g, '""') || ''}"`,
      rung.timerSeconds || 15,
      rung.correctChoiceIndex + 1
    ];
  });

  const csvContent = 'data:text/csv;charset=utf-8,' 
    + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${title.replace(/\s+/g, '_')}_Kahoot_Export.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
