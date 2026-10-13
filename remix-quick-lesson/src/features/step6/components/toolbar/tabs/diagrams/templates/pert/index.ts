import { SlideElement } from '../../../../../../types/slideTypes';
import { createDiagramId, DiagramOptions, getDiagramCount, getDiagramPalette, makeDiagramNode, makeDiagramText } from '../../diagramFactory';

export function createPert(options: DiagramOptions): SlideElement[] {
  const id = createDiagramId('pert');
  const count = getDiagramCount(options, 'tasks', 5);
  const palette = getDiagramPalette(options);
  const tasks = Array.from({ length: count }, (_, i) => {
    const linear = options.layout === 'linear';
    return { label: i === 0 ? 'Start' : i === count - 1 ? 'Finish' : `Task ${i}`, x: 6 + (i / Math.max(count - 1, 1)) * 76, y: linear ? 41 : 21 + ((i % 2) * 42) };
  });
  return [
    ...tasks.slice(0, -1).map((task, i) => makeDiagramText(`${id}-arrow-${i}`, '→', task.x + 17, (task.y + tasks[i + 1].y) / 2 + 4, 10, 10, 18, '#64748B')),
    ...tasks.map((task, i) => makeDiagramNode(
      `${id}-task-${i}`, `${task.label}\nDuration`, task.x, task.y, 17, 18, palette[i % palette.length],
    )),
  ];
}
