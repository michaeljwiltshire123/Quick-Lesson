import PptxGenJS from 'pptxgenjs';
import { SlideItem } from '../../../step6/types/slideTypes';
import { writePptxElement } from './pptxObjectWriter';
import { safeFilename } from './downloadFile';
import { formatSpeakerNotes } from './formatSpeakerNotes';
import { addNativeTransitions } from './addNativeTransitions';
import { downloadFile } from './downloadFile';

export async function exportPowerPoint(title: string, slides: SlideItem[]) {
  if (!slides.length) throw new Error('There are no slides to export.');
  const deck = new PptxGenJS();
  deck.layout = 'LAYOUT_WIDE';
  deck.author = 'Quick Lesson';
  deck.subject = 'Editable lesson slides';
  deck.title = title || 'Lesson';
  const slideIndex = new Map(slides.map((item, index) => [item.id, index + 1]));
  slides.forEach((item) => {
    const slide = deck.addSlide();
    slide.background = { color: item.theme?.backgroundColor?.replace('#', '') || 'FAF9F5' };
    slide.addText(item.title, { x: 0.5, y: 0.3, w: 12.3, h: 0.75, fontSize: item.archetype === 'title' ? 34 : 25, bold: true, color: item.theme?.textColor?.replace('#', '') || '1C1917' });
    if (item.subtitle) slide.addText(item.subtitle, { x: 0.55, y: 1.05, w: 12, h: 0.4, fontSize: 13, italic: true });
    item.elements.forEach((element) => writePptxElement(slide, element, slideIndex));
    slide.addNotes(formatSpeakerNotes(item.speakerNotes));
  });
  const filename = `${safeFilename(title)}.pptx`;
  if (typeof window === 'undefined') return deck.writeFile({ fileName: filename });
  const packageBlob = await deck.write({ outputType: 'blob' });
  if (!(packageBlob instanceof Blob)) throw new Error('PowerPoint generation did not return a browser file.');
  const finished = await addNativeTransitions(packageBlob, slides);
  downloadFile(finished, 'application/vnd.openxmlformats-officedocument.presentationml.presentation', filename);
}
