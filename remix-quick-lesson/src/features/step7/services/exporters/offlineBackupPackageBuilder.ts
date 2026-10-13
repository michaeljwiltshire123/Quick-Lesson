import JSZip from 'jszip';
import { SlideItem } from '../../../step6/types/slideTypes';
import { offlineInteractiveHtml } from '../../live/offline/offlineInteractiveViewer';
import { downloadFile, safeFilename } from './downloadFile';

export async function buildOfflineBackup(title: string, slides: SlideItem[]) {
  if (!slides.length) throw new Error('Add slides before creating the offline backup.');
  const archive = new JSZip();
  archive.file('index.html', offlineInteractiveHtml(title, slides));
  archive.file('README.txt', 'Open index.html in a browser to present offline. Embedded media works offline; externally hosted video links require internet.');
  return archive.generateAsync({ type: 'blob' });
}

export async function downloadOfflineBackup(title: string, slides: SlideItem[]) {
  const file = await buildOfflineBackup(title, slides);
  downloadFile(file, 'application/zip', `${safeFilename(title)}-offline-backup.zip`);
}
