import { SlideElement } from '../../../../../../types/slideTypes';
import { createDiagramId, getDiagramCount, getDiagramPalette, DiagramOptions, makeDiagramNode, makeDiagramText } from '../../diagramFactory';

export function createTimeline(options: DiagramOptions): SlideElement[] {
  const id = createDiagramId('timeline');
  const count = getDiagramCount(options, 'parts', 4);
  const palette = getDiagramPalette(options);
  const gap = 88 / count;
  return [
    makeDiagramText(`${id}-axis`, '━━━━━━━━━━━━━━━━━━━━━━━━', 6, 44, 88, 8, 18, '#64748B'),
    ...Array.from({ length: count }, (_, i) => {
      const x = 6 + i * gap;
      return makeDiagramNode(`${id}-event-${i}`, `Event ${i + 1}`, x, 31, gap - 2, 30, palette[i % palette.length]);
    }),
    ...Array.from({ length: count }, (_, i) =>
      makeDiagramText(`${id}-detail-${i}`, 'Date / detail', 6 + i * gap, 64, gap - 2, 14, 11),
    ),
  ];
}
