import { SlideElement } from '../../../../../../types/slideTypes';
import { createDiagramId, DiagramOptions, getDiagramCount, getDiagramPalette, makeDiagramNode, makeDiagramText } from '../../diagramFactory';

export function createMindMap(options: DiagramOptions): SlideElement[] {
  const id = createDiagramId('mind-map');
  const count = getDiagramCount(options, 'branches', 4);
  const palette = getDiagramPalette(options);
  const branches = Array.from({ length: count }, (_, i) => {
    if (options.layout === 'sides') {
      const sideCount = Math.ceil(count / 2);
      const sidePosition = Math.floor(i / 2);
      return { x: i % 2 === 0 ? 7 : 70, y: 14 + (sidePosition * 70) / Math.max(sideCount, 1) };
    }
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / count;
    return { x: 50 + Math.cos(angle) * 32 - 11, y: 50 + Math.sin(angle) * 32 - 9 };
  });
  return [
    ...branches.map((branch, i) => makeDiagramText(`${id}-link-${i}`, '●', branch.x + 9, branch.y + 8, 6, 6, 9, '#94A3B8')),
    ...branches.map((branch, i) => makeDiagramNode(`${id}-branch-${i}`, `Branch ${i + 1}`, branch.x, branch.y, 22, 18, palette[i % palette.length])),
    makeDiagramNode(`${id}-centre`, 'Main idea', 38, 40, 24, 20, '#FDE68A'),
  ];
}
