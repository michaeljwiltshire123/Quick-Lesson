export function downloadFile(content: BlobPart, mime: string, filename: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const safeFilename = (value: string) =>
  (value || 'lesson').replace(/[<>:"/\\|?*\x00-\x1F]/g, '-').slice(0, 80);
