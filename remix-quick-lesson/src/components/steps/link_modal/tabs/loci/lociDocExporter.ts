import { LociScriptOutput } from './types';

export const generateLociDocumentData = (
  scriptData: LociScriptOutput,
  mode: 'journey' | 'cards',
  routeName?: string,
) => {
  const title = routeName || scriptData.title;

  let bodyHtml = '';
  if (mode === 'journey') {
    const stations = scriptData.stations.map((s, idx) => `
      <div style="margin-bottom: 20px; padding: 14px; border: 1px solid #d1d5db; border-radius: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #1f2937;">Station ${idx + 1}: ${s.station}</h3>
        <p style="margin: 4px 0; color: #b45309; font-weight: bold;">Keyword: ${s.term} ${s.phoneticBreakdown ? '(' + s.phoneticBreakdown + ')' : ''}</p>
        <p style="margin: 6px 0;"><strong>Vivid Scene:</strong> ${s.explicitScene || s.association}</p>
        ${s.mnemonicBreakdown ? `<p style="margin: 6px 0; color: #4b5563;"><strong>Mnemonic Breakdown:</strong> ${s.mnemonicBreakdown}</p>` : ''}
        ${s.guidedVisualizationPrompt ? `<p style="margin: 6px 0; font-style: italic;"><strong>Pacing Cue:</strong> "${s.guidedVisualizationPrompt}"</p>` : ''}
      </div>
    `).join('');

    bodyHtml = `
      <h1>🏛️ Method of Loci Palace Walkthrough: ${title}</h1>
      <p style="font-size: 14px; color: #4b5563;">${scriptData.introduction}</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <div>${stations}</div>
      ${scriptData.peerTeachingPrompt ? `<div style="margin-top: 24px; padding: 12px; background: #f3f4f6; border-radius: 8px;"><strong>Peer-Teaching Prompt:</strong><br/>${scriptData.peerTeachingPrompt}</div>` : ''}
      ${scriptData.summary ? `<div style="margin-top: 16px; padding: 12px; background: #fef3c7; border-radius: 8px;"><strong>Lesson Summary:</strong><br/>${scriptData.summary}</div>` : ''}
    `;
  } else {
    const cards = scriptData.stations.map((s, idx) => `
      <div style="margin-bottom: 16px; border: 2px dashed #9ca3af; padding: 16px; border-radius: 8px;">
        <span style="font-size: 11px; text-transform: uppercase; color: #6b7280;">Station ${idx + 1}: ${s.station}</span>
        <h2 style="color: #b45309; margin: 4px 0 10px 0;">${s.term} ${s.phoneticBreakdown ? '(' + s.phoneticBreakdown + ')' : ''}</h2>
        <p style="margin: 0; font-size: 13px;"><strong>Recall Cue:</strong> ${s.guidedVisualizationPrompt || s.explicitScene || s.association}</p>
      </div>
    `).join('');

    bodyHtml = `
      <h1>🃏 Memory Palace Revision Cards: ${title}</h1>
      <p style="font-size: 13px; color: #4b5563;">Printable study flashcards for classroom or independent spaced retrieval.</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <div>${cards}</div>
    `;
  }

  const completeHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${title} - ${mode === 'journey' ? 'Journey' : 'Cards'}</title>
<style>
body { font-family: "Calibri", Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 800px; margin: 24px auto; padding: 0 16px; }
h1 { font-size: 24px; color: #111827; }
</style>
</head>
<body>${bodyHtml}</body>
</html>`;

  const blob = new Blob([completeHtml], { type: 'text/html;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);

  return {
    title: `${title} (${mode === 'journey' ? 'Walkthrough Script' : 'Revision Cards'})`,
    url: blobUrl,
    html: completeHtml,
  };
};
