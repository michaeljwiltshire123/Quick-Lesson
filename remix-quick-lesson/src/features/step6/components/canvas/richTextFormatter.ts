/**
 * Rich text inline selection formatting helpers for Google Slides Toolbar & Right Panel
 */
export { stripInlineFontSize, stripInlineStyles, transformHtmlText } from './htmlTextCleaner';

export function hasActiveTextSelection(): boolean {
  if (typeof window === 'undefined') return false;
  const sel = window.getSelection();
  if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
    const txt = sel.toString();
    if (!txt || txt.trim().length === 0) return false;
    let node: Node | null = sel.getRangeAt(0).commonAncestorContainer;
    while (node && !(node as HTMLElement).getAttribute?.('contenteditable')) node = node.parentNode;
    return Boolean(node);
  }
  return false;
}

export function clearSelectionRange(): void {
  if (typeof window !== 'undefined') {
    window.getSelection()?.removeAllRanges();
  }
}

export function getSelectedFontSize(): number | null {
  if (typeof window === 'undefined') return null;
  const sel = window.getSelection();
  if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
    const parent = sel.getRangeAt(0).startContainer.parentElement;
    if (parent) {
      const sizeStr = window.getComputedStyle(parent).fontSize;
      const parsed = parseInt(sizeStr, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
  }
  return null;
}

function getActive(): { range: Range; editable: HTMLElement } | null {
  const sel = window.getSelection();
  if (sel && sel.rangeCount > 0 && !sel.isCollapsed && sel.toString().trim().length > 0) {
    let node: Node | null = sel.getRangeAt(0).commonAncestorContainer;
    while (node && !(node as HTMLElement).getAttribute?.('contenteditable')) node = node.parentNode;
    if (node) return { range: sel.getRangeAt(0), editable: node as HTMLElement };
  }
  return null;
}

function wrapCleanSpan(range: Range, styleKey: 'fontSize' | 'fontFamily' | 'color', val: string): void {
  const div = document.createElement('div');
  div.appendChild(range.extractContents());
  div.querySelectorAll('*').forEach((el) => { (el as HTMLElement).style[styleKey] = ''; });
  const span = document.createElement('span');
  span.style[styleKey] = styleKey === 'fontSize' ? `${val}px` : val;
  while (div.firstChild) span.appendChild(div.firstChild);
  range.insertNode(span);
  const newRange = document.createRange();
  newRange.selectNodeContents(span);
  const sel = window.getSelection();
  if (sel) { sel.removeAllRanges(); sel.addRange(newRange); }
}

export function formatSelectedText(cmd: string, val?: string, onUpdate?: (h: string) => void): boolean {
  const t = getActive();
  if (!t || t.range.collapsed) return false;
  try {
    if (cmd === 'fontSize') wrapCleanSpan(t.range, 'fontSize', val || '18');
    else if (cmd === 'font') wrapCleanSpan(t.range, 'fontFamily', val || 'inherit');
    else if (cmd === 'color') wrapCleanSpan(t.range, 'color', val || 'inherit');
    else if (cmd === 'highlight') {
      const span = document.createElement('span');
      span.style.backgroundColor = val || 'transparent';
      span.style.padding = '0 2px'; span.style.borderRadius = '3px';
      span.appendChild(t.range.extractContents()); t.range.insertNode(span);
    } else if (cmd === 'shadow') {
      const span = document.createElement('span'); span.style.textShadow = val || '2px 2px 4px rgba(0, 0, 0, 0.45)';
      span.appendChild(t.range.extractContents()); t.range.insertNode(span);
    } else if (cmd === 'glow') {
      const span = document.createElement('span'); span.style.textShadow = '0 0 8px #F59E0B, 0 0 16px #F59E0B'; span.style.fontWeight = 'bold';
      span.appendChild(t.range.extractContents()); t.range.insertNode(span);
    } else {
      document.execCommand(cmd, false, val);
    }
    if (onUpdate) onUpdate(t.editable.innerHTML);
    return true;
  } catch { return false; }
}

export const applyInlineShadow = (val?: string, onUp?: (h: string) => void) => formatSelectedText('shadow', val, onUp);
export const applyInlineGlow = (onUp?: (h: string) => void) => formatSelectedText('glow', undefined, onUp);
export const applyInlineHighlight = (col?: string, _id?: string, onUp?: (h: string) => void) => formatSelectedText('highlight', col, onUp);
export const applyInlineRainbow = (_id?: string, onUp?: (h: string) => void) => formatSelectedText('rainbow', undefined, onUp);
export function recordSelection(_id?: string): void {}
export function clearSavedSelection(): void {}
export function getSelectedText(): string { const t = getActive(); return t ? t.range.toString() : ''; }
export function replaceSelectedTextWith(rep: string, onUpdate?: (h: string) => void): boolean {
  const t = getActive();
  if (!t) return false;
  try {
    t.range.deleteContents();
    t.range.insertNode(document.createTextNode(rep));
    if (onUpdate) onUpdate(t.editable.innerHTML);
    return true;
  } catch { return false; }
}
