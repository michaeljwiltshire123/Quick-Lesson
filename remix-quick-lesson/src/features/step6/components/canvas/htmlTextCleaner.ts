/**
 * HTML text parsing and style sanitisation helpers for slide elements
 * British English spelling throughout.
 */

export function stripInlineStyles(html: string, styleKeys: string[]): string {
  if (typeof document === 'undefined') return html;
  const div = document.createElement('div');
  div.innerHTML = html;
  div.querySelectorAll('*').forEach((el) => {
    const h = el as HTMLElement;
    styleKeys.forEach((key) => {
      (h.style as any)[key] = '';
    });
  });
  return div.innerHTML;
}

export function stripInlineFontSize(html: string): string {
  return stripInlineStyles(html, ['fontSize']);
}

export function transformHtmlText(html: string, fn: (text: string) => string): string {
  if (typeof document === 'undefined') return fn(html);
  const div = document.createElement('div');
  div.innerHTML = html;
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
      node.nodeValue = fn(node.nodeValue);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach(walk);
    }
  };
  div.childNodes.forEach(walk);
  return div.innerHTML;
}
