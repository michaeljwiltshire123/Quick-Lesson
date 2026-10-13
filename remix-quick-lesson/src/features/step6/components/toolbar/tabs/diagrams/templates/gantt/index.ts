import { SlideElement } from '../../../../../../types/slideTypes';
import { createDiagramId, DiagramOptions, getDiagramCount, getDiagramPalette, makeDiagramNode, makeDiagramText } from '../../diagramFactory';

export function createGantt(options: DiagramOptions): SlideElement[] {
  const id = createDiagramId('gantt');
  const tasks = getDiagramCount(options, 'tasks', 4);
  const periods = getDiagramCount(options, 'periods', 4);
  const palette = getDiagramPalette(options);
  const row = 74 / tasks;
  return [
    ...Array.from({ length: periods }, (_, i) => makeDiagramText(`${id}-period-${i}`, `Period ${i + 1}`, 28 + i * (66 / periods), 5, 66 / periods, 10, 9)),
    ...Array.from({ length: tasks }, (_, i) => {
      const y = 17 + i * row;
      const x = 28 + (i % periods) * (60 / periods);
      return [
        makeDiagramText(`${id}-label-${i}`, `Task ${i + 1}`, 2, y, 25, row - 2, 10),
        makeDiagramNode(`${id}-track-${i}`, '', 28, y, 66, row - 2, '#F1F5F9'),
        makeDiagramNode(`${id}-bar-${i}`, 'Edit task', x, y, Math.max(8, (94 - x) / 2), row - 2, palette[i % palette.length]),
      ];
    }).flat(),
  ];
}
