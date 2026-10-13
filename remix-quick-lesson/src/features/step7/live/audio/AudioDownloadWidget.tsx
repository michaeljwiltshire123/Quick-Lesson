import React, { useCallback, useEffect, useState } from 'react';
import { downloadFile, safeFilename } from '../../services/exporters/downloadFile';
import { listRecordings, SavedRecording } from './recordingStore';

interface Props { sessionId: string; lessonTitle: string }
export const AudioDownloadWidget: React.FC<Props> = ({ sessionId, lessonTitle }) => {
  const [items, setItems] = useState<SavedRecording[]>([]);
  const [error, setError] = useState('');
  const refresh = useCallback(() => {
    void listRecordings(sessionId).then(setItems).catch((reason: unknown) => {
      setError(reason instanceof Error ? reason.message : 'Could not load saved audio.');
    });
  }, [sessionId]);
  useEffect(() => {
    refresh();
    const saved = (event: Event) => { if ((event as CustomEvent).detail === sessionId) refresh(); };
    const failed = (event: Event) => setError(String((event as CustomEvent).detail));
    window.addEventListener('teacher-audio-recording-saved', saved);
    window.addEventListener('teacher-audio-recording-error', failed);
    return () => {
      window.removeEventListener('teacher-audio-recording-saved', saved);
      window.removeEventListener('teacher-audio-recording-error', failed);
    };
  }, [refresh, sessionId]);
  const download = async (item: SavedRecording) => {
    const extension = item.mimeType.includes('mpeg') ? 'mp3' : item.mimeType.includes('mp4') ? 'mp4' : 'webm';
    const base = `${safeFilename(lessonTitle)}-${new Date(item.createdAt).toLocaleTimeString().replace(/:/g, '-')}`;
    const chapters = JSON.stringify(item.markers.map((marker) => ({ ...marker, time: `${Math.floor(marker.elapsedMs / 60000)}:${String(Math.floor(marker.elapsedMs / 1000) % 60).padStart(2, '0')}` })), null, 2);
    try {
      const JSZip = (await import('jszip')).default;
      const archive = new JSZip();
      archive.file(`${base}.${extension}`, item.blob);
      archive.file(`${base}-slide-timestamps.json`, chapters);
      downloadFile(await archive.generateAsync({ type: 'blob' }), 'application/zip', `${base}-audio-and-timestamps.zip`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not prepare the audio download.');
    }
  };
  return <section className="rounded-lg border bg-white p-3"><h4 className="font-semibold">Saved teacher audio</h4>
    <p className="text-xs text-stone-500">Downloads use the browser-supported audio format and include slide timestamp JSON.</p>
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    {!items.length && !error && <p className="text-sm text-stone-500">Recordings for this lesson session will appear here.</p>}
    {items.map((item) => <button key={item.id} onClick={() => void download(item)} className="mt-2 block rounded border px-3 py-2 text-sm">
      Download {item.mimeType.includes('mpeg') ? 'MP3' : item.mimeType.includes('mp4') ? 'MP4' : 'WebM'} + slide timestamps · {new Date(item.createdAt).toLocaleString()}</button>)}
  </section>;
};
