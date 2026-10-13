import { SlideElement } from '../../../../../../types/slideTypes';
import { createDiagramId, DiagramOptions, getDiagramCount, getDiagramPalette, makeDiagramNode } from '../../diagramFactory';

export function createMatrix(options: DiagramOptions): SlideElement[] {
  const id = createDiagramId('matrix');
  const rows = getDiagramCount(options, 'rows', 2);
  const columns = getDiagramCount(options, 'columns', 2);
  const palette = getDiagramPalette(options);
  const cellWidth = 84 / columns;
  const cellHeight = 76 / rows;
  return Array.from({ length: rows * columns }, (_, i) => {
    const row = Math.floor(i / columns);
    const column = i % columns;
    return makeDiagramNode(`${id}-cell-${i}`, `Cell ${i + 1}\nAdd your label`, 8 + column * cellWidth, 12 + row * cellHeight, cellWidth - 2, cellHeight - 2, palette[i % palette.length]);
  });
}
