export interface SlideMarker { elapsedMs: number; slideIndex: number; slideTitle: string }
export interface SavedRecording {
  id: string;
  sessionId: string;
  lessonTitle: string;
  createdAt: string;
  mimeType: string;
  blob: Blob;
  markers: SlideMarker[];
}
const database = 'quick-lesson-audio';
const store = 'recordings';

function openStore(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(database, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(store, { keyPath: 'id' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open audio storage.'));
  });
}
export async function saveRecording(recording: SavedRecording) {
  const db = await openStore();
  await new Promise<void>((resolve, reject) => {
    const request = db.transaction(store, 'readwrite').objectStore(store).put(recording);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error || new Error('Could not save audio recording.'));
  });
  db.close();
}
export async function listRecordings(sessionId: string): Promise<SavedRecording[]> {
  const db = await openStore();
  const items = await new Promise<SavedRecording[]>((resolve, reject) => {
    const request = db.transaction(store).objectStore(store).getAll();
    request.onsuccess = () => resolve((request.result as SavedRecording[]).filter((item) => item.sessionId === sessionId));
    request.onerror = () => reject(request.error || new Error('Could not load audio recordings.'));
  });
  db.close();
  return items.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}
