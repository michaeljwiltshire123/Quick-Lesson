import { SlideItem } from '../../../step6/types/slideTypes';
import { exportPowerPoint } from './pptxExporter';

export async function downloadNativePowerPoint(title: string, slides: SlideItem[]) {
  if (!slides.length) throw new Error('Add slides before exporting PowerPoint.');
  await exportPowerPoint(title, slides);
}
