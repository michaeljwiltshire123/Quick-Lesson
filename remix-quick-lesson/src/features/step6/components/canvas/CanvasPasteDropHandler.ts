import { SlideElement } from '../../types/slideTypes';

export function handleCanvasDropFile(
  e: React.DragEvent,
  onAddElement: (el: SlideElement) => void
) {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (!files || files.length === 0) return;

  const file = files[0];
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      onAddElement({
        id: `el-img-${Date.now()}`,
        type: 'image',
        x: 25,
        y: 20,
        width: 50,
        height: 55,
        content: base64,
        caption: file.name.replace(/\.[^/.]+$/, ''),
      });
    };
    reader.readAsDataURL(file);
  }
}

export function handleCanvasPasteClipboard(
  e: ClipboardEvent,
  onAddElement: (el: SlideElement) => void
) {
  const target = e.target as HTMLElement;
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

  const items = e.clipboardData?.items;
  if (!items) return;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.indexOf('image') !== -1) {
      const blob = item.getAsFile();
      if (!blob) continue;
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64 = uploadEvent.target?.result as string;
        onAddElement({
          id: `el-img-paste-${Date.now()}`,
          type: 'image',
          x: 25,
          y: 20,
          width: 50,
          height: 55,
          content: base64,
          caption: 'Pasted Diagram',
        });
      };
      reader.readAsDataURL(blob);
      e.preventDefault();
      return;
    }
  }

  const text = e.clipboardData?.getData('text');
  if (text && text.trim()) {
    onAddElement({
      id: `el-txt-paste-${Date.now()}`,
      type: 'text',
      x: 20,
      y: 25,
      width: 60,
      height: 45,
      content: text.trim(),
    });
    e.preventDefault();
  }
}
