import { SlideElement, SpeakerNotesData } from '../types/slideTypes';

function asColumn(elements: SlideElement[], side: 'left' | 'right'): SlideElement[] {
  const start = side === 'left' ? 4 : 52;
  return elements.map((element) => ({
    ...element,
    x: start + element.x * 0.44,
    y: Math.min(element.y, 30),
    width: Math.min(element.width * 0.44, 42),
    height: Math.min(element.height, 64),
    textStyle: element.type === 'text' && element.textStyle?.fontSize
      ? { ...element.textStyle, fontSize: Math.min(element.textStyle.fontSize, 18) }
      : element.textStyle,
  }));
}

export function mergedElements(target: SlideElement[], source: SlideElement[]): SlideElement[] {
  const used = new Set<string>();
  return [...asColumn(target, 'left'), ...asColumn(source, 'right')].map((element) => {
    const id = used.has(element.id) ? `${element.id}-merged-${used.size}` : element.id;
    used.add(id);
    return id === element.id ? element : { ...element, id };
  });
}

const combine = (a?: string, b?: string) => [a, b].filter(Boolean).join('\n\n') || undefined;
const unique = <T,>(a: T[] = [], b: T[] = []) => [...a, ...b];

export function mergedNotes(target: SpeakerNotesData, source: SpeakerNotesData): SpeakerNotesData {
  const glossary = unique(target.glossary, source.glossary);
  const reading = unique(target.furtherReading, source.furtherReading);
  return {
    ...target,
    teacherScript: combine(target.teacherScript, source.teacherScript) || '',
    dupeLine: combine(target.dupeLine, source.dupeLine),
    stepInstructions: combine(target.stepInstructions, source.stepInstructions),
    studySuggestions: unique(target.studySuggestions, source.studySuggestions),
    zeroTechPlan: combine(target.zeroTechPlan, source.zeroTechPlan),
    pedagogicalTips: unique(target.pedagogicalTips, source.pedagogicalTips),
    timingMinutes: target.timingMinutes + source.timingMinutes,
    retrievalCues: combine(target.retrievalCues, source.retrievalCues),
    misconceptionsWarning: combine(target.misconceptionsWarning, source.misconceptionsWarning),
    glossary: glossary.length ? glossary : undefined,
    furtherReading: reading.length ? reading : undefined,
  };
}
