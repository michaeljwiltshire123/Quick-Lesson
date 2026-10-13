import { SlideElement } from '../../../../../../types/slideTypes';
import { createDiagramId, DiagramOptions, getDiagramCount, getDiagramTextPalette, makeDiagramText } from '../../diagramFactory';

export function createWordCloud(options: DiagramOptions): SlideElement[] {
  const id = createDiagramId('word-cloud');
  const count = getDiagramCount(options, 'words', 5);
  const palette = getDiagramTextPalette(options);
  const words = ['Your central word', 'Key idea', 'Audience word', 'Add a response', 'Another word', 'Big idea', 'Share thoughts', 'New insight', 'Your words'];
  const sizes = [24, 18, 17, 13, 14, 14, 12, 13, 12];
  return [
    ...Array.from({ length: count }, (_, i) => makeDiagramText(
      `${id}-word-${i}`, words[i], i === 0 ? 30 : 8 + ((i * 23) % 66), i === 0 ? 34 : 16 + ((i * 19) % 58),
      i === 0 ? 40 : 28, 16, sizes[i], palette[i % palette.length],
    )),
    makeDiagramText(`${id}-badge`, 'LIVE LESSON ONLY', 35, 83, 30, 8, 10, '#92400E'),
  ];
}
