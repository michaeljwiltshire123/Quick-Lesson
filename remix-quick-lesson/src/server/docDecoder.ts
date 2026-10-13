// @ts-ignore
import pdf from 'pdf-parse/lib/pdf-parse.js';
import mammoth from 'mammoth';

export async function decodeDocText(fileName: string, base64: string, mime?: string): Promise<string> {
  try {
    const clean = base64.includes(',') ? base64.split(',')[1] : base64;
    const buf = Buffer.from(clean, 'base64');
    const lower = (fileName || '').toLowerCase();
    if (lower.endsWith('.pdf') || mime?.includes('pdf')) return (await pdf(buf))?.text || '';
    if (lower.endsWith('.docx') || lower.endsWith('.doc') || mime?.includes('word')) {
      return (await mammoth.extractRawText({ buffer: buf }))?.value || '';
    }
    return buf.toString('utf-8');
  } catch (err) {
    console.error('Document decode error:', err);
    return '';
  }
}
