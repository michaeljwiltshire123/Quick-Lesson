import { SlideItem, SlideElement } from '../types/slideTypes';

export function deduplicateSlideElements(elements: SlideElement[]): SlideElement[] {
  return elements.filter((el, idx, arr) => {
    // Keep elements that have animation rules to prevent them from being deduplicated away
    if (el.meta?.timelineEffects && el.meta.timelineEffects.length > 0) return true;

    if (el.type === 'text' && el.content) {
      const firstIdx = arr.findIndex((o) => o.type === 'text' && o.content.trim() === el.content.trim());
      return firstIdx === idx;
    }
    const posIdx = arr.findIndex((o) => Math.abs(o.x - el.x) < 2 && Math.abs(o.y - el.y) < 2 && o.type === el.type);
    return posIdx === idx;
  });
}

export function createNewBlankSlide(parentSlide?: SlideItem): SlideItem {
  return {
    id: `slide-custom-${Date.now()}`,
    chunkId: parentSlide?.chunkId,
    title: parentSlide?.title || 'New Teaching Point',
    subtitle: parentSlide?.subtitle,
    archetype: parentSlide?.archetype || 'custom',
    theme: parentSlide?.theme,
    elements: [
      { id: `el-${Date.now()}`, type: 'text', x: 10, y: 20, width: 80, height: 60, content: 'Add explanation, interactive task, or key vocabulary focus.' },
    ],
    speakerNotes: {
      teacherScript: parentSlide ? `Continue exploring ${parentSlide.title}.` : 'Introduce concept and invite active feedback.',
      pedagogicalTips: parentSlide?.speakerNotes?.pedagogicalTips || ['Target formative misconceptions early.'],
      timingMinutes: 5,
    },
  };
}

export function generateLayoutTemplateElements(templateName: string): SlideElement[] {
  const ts = Date.now();
  switch (templateName) {
    case 'split_two':
      return [
        { id: `el-col1-${ts}`, type: 'text', x: 5, y: 24, width: 42, height: 62, content: 'Column A: Theoretical Principle\n• Key definition\n• Core mechanism', fillColor: '#FFFFFF', borderColor: '#E2E8F0', borderWidth: 1, borderRadius: 12 },
        { id: `el-col2-${ts}`, type: 'text', x: 53, y: 24, width: 42, height: 62, content: 'Column B: Practical Application\n• Real-world scenario\n• Common pitfall to avoid', fillColor: '#FFFFFF', borderColor: '#E2E8F0', borderWidth: 1, borderRadius: 12 },
      ];
    case 'three_flow':
      return [
        { id: `el-step1-${ts}`, type: 'shape', shapeType: 'rounded', x: 5, y: 25, width: 28, height: 58, content: 'Step 1: Inspect\nObserve raw data & phenomenon', fillColor: '#EFF6FF', borderColor: '#3B82F6', borderWidth: 2 },
        { id: `el-step2-${ts}`, type: 'shape', shapeType: 'rounded', x: 36, y: 25, width: 28, height: 58, content: 'Step 2: Analyse\nIdentify variables & causal links', fillColor: '#FEF3C7', borderColor: '#F59E0B', borderWidth: 2 },
        { id: `el-step3-${ts}`, type: 'shape', shapeType: 'rounded', x: 67, y: 25, width: 28, height: 58, content: 'Step 3: Conclude\nFormulate reasoning & answer', fillColor: '#ECFDF5', borderColor: '#10B981', borderWidth: 2 },
      ];
    case 'big_stat':
      return [
        { id: `el-stat-${ts}`, type: 'text', x: 15, y: 24, width: 70, height: 35, content: '94% Success Rate', textStyle: { bold: true, align: 'center' }, fillColor: '#FEF3C7', borderColor: '#D97706', borderWidth: 2, borderRadius: 16 },
        { id: `el-stat-desc-${ts}`, type: 'text', x: 20, y: 62, width: 60, height: 24, content: 'Of pupils achieve mastery when formative retrieval is embedded early.', textStyle: { italic: true, align: 'center' } },
      ];
    default:
      return [{ id: `el-def-${ts}`, type: 'text', x: 10, y: 24, width: 80, height: 62, content: 'Concept exploration...' }];
  }
}

export function cycleSlideLayouts(_elements: SlideElement[]): SlideElement[] {
  const layouts = ['split_two', 'three_flow', 'big_stat'];
  const nextLayout = layouts[Math.floor(Math.random() * layouts.length)];
  return generateLayoutTemplateElements(nextLayout);
}

export function autoBeautifySlideElements(elements: SlideElement[]): SlideElement[] {
  return elements.map((el, idx, arr) => ({
    ...el,
    x: 10,
    y: Math.min(70, 20 + idx * Math.min(25, 60 / Math.max(1, arr.length))),
    width: 80,
  }));
}
