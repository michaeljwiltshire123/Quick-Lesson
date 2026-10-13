import { SlideElement } from '../../../../../../types/slideTypes';
import { createDiagramId, DiagramOptions, getDiagramCount, getDiagramPalette, makeDiagramNode, makeDiagramText } from '../../diagramFactory';

export function createCycle(options: DiagramOptions): SlideElement[] {
  const id = createDiagramId('cycle');
  const count = getDiagramCount(options, 'stages', 4);
  const palette = getDiagramPalette(options);
  const positions = Array.from({ length: count }, (_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / count;
    return { x: 50 + Math.cos(angle) * 31 - 12, y: 50 + Math.sin(angle) * 31 - 10 };
  });
  return [
    ...positions.map((point, i) => makeDiagramText(`${id}-arrow-${i}`, '→', point.x + 22, point.y + 4, 8, 8, 16, '#64748B')),
    ...positions.map((point, i) => makeDiagramNode(`${id}-stage-${i}`, `Stage ${i + 1}`, point.x, point.y, 24, 20, palette[i % palette.length], 'circle')),
  ];
}
