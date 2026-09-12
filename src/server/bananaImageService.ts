import { getAI } from './aiHandlers';

const createGraphicThumbnail = (term: string, clue: string, rebus?: string) => {
  const safeTerm = (term || 'Curriculum Puzzle').replace(/[<>&"]/g, '');
  const safeClue = (clue || 'Absurd Visual Memory Aid').replace(/[<>&"]/g, '').slice(0, 75);
  const safeRebus = (rebus || '💡 + 🎯').replace(/[<>&"]/g, '');
  const hash = safeTerm.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 3), 0);
  const hues = [[245, 158, 11], [16, 185, 129], [59, 130, 246], [139, 92, 246], [236, 72, 153]];
  const [r, g, b] = hues[hash % hues.length];

  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="rgb(${r},${g},${b})" stop-opacity="0.15"/><stop offset="100%" stop-color="%23FFFFFF"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23bg)"/><rect x="16" y="16" width="448" height="288" rx="16" fill="%23FFFFFF" stroke="rgb(${r},${g},${b})" stroke-width="2" stroke-opacity="0.4"/><text x="240" y="85" font-size="44" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(safeRebus)}</text><text x="240" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="%232D2A26" text-anchor="middle">${encodeURIComponent(safeTerm)}</text><text x="240" y="210" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-style="italic" fill="%236B7280" text-anchor="middle">${encodeURIComponent(safeClue)}</text><rect x="140" y="245" width="200" height="30" rx="8" fill="rgb(${r},${g},${b})" fill-opacity="0.2"/><text x="240" y="265" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="%232D2A26" text-anchor="middle">🎨 Classroom Visual Puzzle Clue</text></svg>`;
};

export async function generateBananaPuzzleImage(term: string, rebus?: string, clue?: string): Promise<string> {
  const prompt = `Vivid classroom cartoon memory illustration for teaching the vocabulary word "${term}". Visual scene: ${clue || rebus || 'Memorable visual pun'}. High contrast, vibrant colours, clean white background, educational puzzle artwork style.`;
  const ai = getAI();
  try {
    const resp = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: { parts: [{ text: prompt }] }
    });
    for (const cand of resp.candidates || []) {
      for (const part of cand.content?.parts || []) {
        if (part.inlineData?.data) return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }
  } catch {}

  try {
    const imgResp = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg' }
    });
    const bytes = imgResp.generatedImages?.[0]?.image?.imageBytes;
    if (bytes) return `data:image/jpeg;base64,${bytes}`;
  } catch {}

  return createGraphicThumbnail(term, clue || '', rebus);
}
