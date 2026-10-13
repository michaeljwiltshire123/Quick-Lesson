import { SlideElement } from '../../../../types/slideTypes';

export type DiagramOptions = Record<string, string>;

export const DIAGRAM_PALETTES: Record<string, string[]> = {
  ocean: ['#DBEAFE', '#BFDBFE', '#BAE6FD', '#CFFAFE', '#E0F2FE', '#A5F3FC'],
  sunset: ['#FFEDD5', '#FED7AA', '#FECACA', '#FBCFE8', '#FEF3C7', '#FDBA74'],
  botanical: ['#DCFCE7', '#BBF7D0', '#D9F99D', '#A7F3D0', '#ECFCCB', '#86EFAC'],
  plum: ['#F3E8FF', '#E9D5FF', '#FCE7F3', '#DDD6FE', '#FAE8FF', '#C4B5FD'],
};
const DIAGRAM_TEXT_PALETTES: Record<string, string[]> = {
  ocean: ['#1D4ED8', '#0369A1', '#0E7490', '#155E75', '#1E40AF', '#0F766E'],
  sunset: ['#C2410C', '#B45309', '#BE123C', '#9D174D', '#A16207', '#C2410C'],
  botanical: ['#15803D', '#047857', '#4D7C0F', '#166534', '#3F6212', '#0F766E'],
  plum: ['#7E22CE', '#6B21A8', '#BE185D', '#5B21B6', '#86198F', '#4338CA'],
};

export function getDiagramPalette(options: DiagramOptions): string[] {
  return DIAGRAM_PALETTES[options.style] || DIAGRAM_PALETTES.ocean;
}

export function getDiagramTextPalette(options: DiagramOptions): string[] {
  return DIAGRAM_TEXT_PALETTES[options.style] || DIAGRAM_TEXT_PALETTES.ocean;
}

export function getDiagramCount(options: DiagramOptions, key: string, fallback: number): number {
  const value = Number(options[key]);
  return Number.isInteger(value) && value > 0 ? Math.min(value, 9) : fallback;
}

export function createDiagramId(name: string): string {
  return `${name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function makeDiagramNode(
  id: string, content: string, x: number, y: number, width: number, height: number,
  fillColor = '#DBEAFE', shapeType: SlideElement['shapeType'] = 'rounded',
): SlideElement {
  return {
    id, type: 'shape', shapeType, x, y, width, height, content, fillColor,
    borderColor: '#64748B', borderWidth: 1.5,
    textStyle: { bold: true, align: 'center', fontSize: 16 },
    meta: { diagramTemplate: true },
  };
}

export function makeDiagramText(
  id: string, content: string, x: number, y: number, width: number, height: number,
  fontSize = 14, color = '#334155',
): SlideElement {
  return {
    id, type: 'text', x, y, width, height, content,
    textStyle: { bold: true, align: 'center', fontSize, color },
    meta: { diagramTemplate: true },
  };
}
