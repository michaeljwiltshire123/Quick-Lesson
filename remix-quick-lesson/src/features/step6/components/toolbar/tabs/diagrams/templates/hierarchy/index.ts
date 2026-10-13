import { SlideElement } from '../../../../../../types/slideTypes';
import { createDiagramId, DiagramOptions, getDiagramCount, getDiagramPalette, makeDiagramNode, makeDiagramText } from '../../diagramFactory';

export function createHierarchy(options: DiagramOptions): SlideElement[] {
  const id = createDiagramId('hierarchy');
  const count = getDiagramCount(options, 'branches', 3);
  const depth = getDiagramCount(options, 'levels', 2);
  const palette = getDiagramPalette(options);
  const step = 82 / count;
  return [
    makeDiagramNode(`${id}-root`, 'Top level', 37, 8, 26, 14, '#FDE68A'),
    ...Array.from({ length: count }, (_, i) => {
      const x = 9 + i * step;
      return [
        makeDiagramText(`${id}-link-${i}`, '│', x + step / 2 - 2, 23, 4, 8, 14),
        makeDiagramNode(`${id}-child-${i}`, `Branch ${i + 1}`, x, 31, step - 2, 16, palette[i % palette.length]),
        ...(depth === 3 ? [makeDiagramText(`${id}-detail-${i}`, '│', x + step / 2 - 2, 48, 4, 8, 12), makeDiagramNode(`${id}-leaf-${i}`, 'Detail', x, 57, step - 2, 15, palette[(i + 1) % palette.length])] : []),
      ];
    }).flat(),
  ];
}
