import { LociScriptOutput, LociScriptStationItem } from './types';

const triggerIframePrint = (html: string) => {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;
  doc.open();
  doc.write(html);
  doc.close();

  iframe.contentWindow?.focus();
  setTimeout(() => {
    iframe.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 350);
};

export const printLociScript = (scriptData: LociScriptOutput, routeName?: string) => {
  const title = routeName || scriptData.title;
  const stationsHtml = scriptData.stations.map((s, idx) => `
    <div style="margin-bottom: 16px; padding: 12px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid;">
      <div style="display: flex; justify-content: space-between; font-weight: bold; border-bottom: 1px solid #eee; padding-bottom: 4px; margin-bottom: 8px;">
        <span>Station ${idx + 1}: ${s.station}</span>
        <span style="color: #b45309;">${s.term} ${s.phoneticBreakdown ? '(' + s.phoneticBreakdown + ')' : ''}</span>
      </div>
      <p style="margin: 4px 0; font-size: 13px;"><strong>Visual Scene:</strong> ${s.explicitScene || s.association}</p>
      ${s.mnemonicBreakdown ? `<p style="margin: 4px 0; font-size: 12px; color: #555;"><strong>Mnemonic:</strong> ${s.mnemonicBreakdown}</p>` : ''}
      ${s.guidedVisualizationPrompt ? `<p style="margin: 4px 0; font-size: 12px; font-style: italic;"><strong>Teacher Cue:</strong> "${s.guidedVisualizationPrompt}"</p>` : ''}
    </div>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Memory Palace: ${title}</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1a1a1a; line-height: 1.5; font-size: 12pt; }
          h1 { font-size: 18pt; margin-bottom: 4px; color: #2D2A26; }
          .intro { font-size: 11pt; color: #444; margin-bottom: 20px; }
          .footer-box { margin-top: 20px; padding: 12px; background: #f9f9f9; border: 1px solid #eee; border-radius: 8px; font-size: 11pt; }
        </style>
      </head>
      <body>
        <h1>🏛️ Method of Loci Palace: ${title}</h1>
        <div class="intro">${scriptData.introduction}</div>
        <div>${stationsHtml}</div>
        ${scriptData.peerTeachingPrompt ? `<div class="footer-box"><strong>Peer-Teaching Prompt:</strong> ${scriptData.peerTeachingPrompt}</div>` : ''}
        ${scriptData.summary ? `<div class="footer-box"><strong>Summary:</strong> ${scriptData.summary}</div>` : ''}
      </body>
    </html>
  `;
  triggerIframePrint(html);
};

export const printLociFlashcards = (stations: LociScriptStationItem[], title: string) => {
  const cardsHtml = stations.map((s, idx) => `
    <div style="border: 2px dashed #999; border-radius: 8px; padding: 14px; margin: 8px; page-break-inside: avoid; display: flex; flex-direction: column; justify-content: space-between; height: 160px; box-sizing: border-box;">
      <div>
        <div style="font-size: 10pt; text-transform: uppercase; color: #777; font-weight: bold;">Station ${idx + 1}: ${s.station}</div>
        <div style="font-size: 14pt; font-weight: bold; margin: 6px 0; color: #b45309;">${s.term} ${s.phoneticBreakdown ? '<span style="font-size: 11pt; color: #555;">(' + s.phoneticBreakdown + ')</span>' : ''}</div>
      </div>
      <div style="font-size: 10pt; color: #333; background: #fdfaf4; padding: 6px; border-radius: 4px; border: 1px solid #fae8c8;">
        <strong>Prompt:</strong> ${s.guidedVisualizationPrompt || s.explicitScene || s.association}
      </div>
    </div>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Revision Flashcards: ${title}</title>
        <style>
          @page { size: A4 portrait; margin: 10mm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1a1a1a; margin: 0; }
          h2 { text-align: center; margin-bottom: 12px; font-size: 16pt; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        </style>
      </head>
      <body>
        <h2>🃏 Revision Flashcards — ${title}</h2>
        <div class="grid">${cardsHtml}</div>
      </body>
    </html>
  `;
  triggerIframePrint(html);
};
