import { SlideElement } from '../types/slideTypes';

export function getSelectedElementStrict(
  elements: SlideElement[],
  selectedElementId: string | null
): SlideElement | undefined {
  if (!selectedElementId) return undefined;
  return elements.find((el) => el.id === selectedElementId);
}
