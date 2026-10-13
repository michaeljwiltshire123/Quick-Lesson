import { CanvasTheme, SlideArchetype, SlideElement } from '../../types/slideTypes';

const palette = [
  { backgroundColor: '#F6F3EC', textColor: '#28251F', accentColor: '#B85C38' },
  { backgroundColor: '#EEF3F1', textColor: '#20332F', accentColor: '#3A7768' },
  { backgroundColor: '#F2F0F8', textColor: '#2D2940', accentColor: '#7461A8' },
  { backgroundColor: '#F7F0E7', textColor: '#37291F', accentColor: '#C17A36' },
];

export function slideTheme(index: number, archetype: SlideArchetype): Partial<CanvasTheme> {
  if (archetype === 'title') {
    return { id: 'lesson-cover', name: 'Lesson Cover', backgroundColor: '#24231F', textColor: '#FFF9ED', cardColor: '#35322C', accentColor: '#E3A64B', fontFamily: 'Georgia, serif' };
  }
  const colors = palette[index % palette.length];
  return { ...colors, id: `lesson-${index}`, name: 'Lesson Editorial', cardColor: '#FFFFFF', cardBorderColor: `${colors.accentColor}45`, fontFamily: 'Inter, Arial, sans-serif', lineHeight: 1.45 };
}

export function themeIndex(key: string): number {
  return [...key].reduce((value, char) => value + char.charCodeAt(0), 0) % palette.length;
}

export function styledContentElement(element: SlideElement, accent: string): SlideElement {
  return {
    ...element, x: 7, y: 24, width: 86, height: 66, fillColor: '#FFFFFF',
    borderColor: `${accent}55`, borderWidth: 1, borderRadius: 18,
    textStyle: { fontSize: 22, lineHeight: 1.5, color: '#292722', align: 'left' },
  };
}

export function coverShapes(): SlideElement[] {
  return [
    { id: 'cover-orbit', type: 'shape', shapeType: 'circle', x: 76, y: 68, width: 16, height: 24, content: '', fillColor: '#E3A64B22', borderColor: '#E3A64B66', borderWidth: 2 },
    { id: 'cover-accent', type: 'shape', shapeType: 'rounded', x: 8, y: 82, width: 22, height: 1.2, content: '', fillColor: '#E3A64B', borderColor: '#E3A64B', borderWidth: 0 },
  ];
}
