import { SlideElement } from '../../../../../../types/slideTypes';
import { createDiagramId, DiagramOptions, getDiagramCount, getDiagramPalette, makeDiagramNode, makeDiagramText } from '../../diagramFactory';

export function createVenn(options: DiagramOptions): SlideElement[] {
  const id = createDiagramId('venn');
  const count = getDiagramCount(options, 'sets', 2);
  const palette = getDiagramPalette(options);
  const circles = count === 2
    ? [{ x: 17, y: 23 }, { x: 44, y: 23 }]
    : [{ x: 30, y: 17 }, { x: 17, y: 39 }, { x: 43, y: 39 }];
  return [
    ...circles.map((circle, i) => makeDiagramNode(`${id}-set-${i}`, `Concept ${String.fromCharCode(65 + i)}`, circle.x, circle.y, 39, 49, palette[i % palette.length], 'circle')),
    makeDiagramText(`${id}-shared`, 'Shared traits', 35, 48, 30, 12, 12),
  ];
}
