import { SlideElement } from '../../../../../../types/slideTypes';
import { createDiagramId, DiagramOptions, getDiagramCount, getDiagramPalette, makeDiagramNode } from '../../diagramFactory';

export function createPyramid(options: DiagramOptions): SlideElement[] {
  const id = createDiagramId('pyramid');
  const count = getDiagramCount(options, 'levels', 3);
  const palette = getDiagramPalette(options);
  return Array.from({ length: count }, (_, i) => {
    const width = 28 + (i / Math.max(count - 1, 1)) * 60;
    return makeDiagramNode(`${id}-level-${i}`, `Level ${count - i}`, 50 - width / 2, 12 + i * (76 / count), width, 72 / count, palette[i % palette.length]);
  });
}
