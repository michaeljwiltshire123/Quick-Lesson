import JSZip from 'jszip';
import { SlideItem } from '../../../step6/types/slideTypes';

const transition: Record<string, string> = {
  fade: '<p:fade/>', fade_in: '<p:fade/>', fade_out: '<p:fade/>',
  dissolve: '<p:dissolve/>', wipe: '<p:wipe dir="l"/>',
  slide_right: '<p:push dir="r"/>', slide_left: '<p:push dir="l"/>',
  slide_top: '<p:push dir="d"/>', slide_bottom: '<p:push dir="u"/>',
  zoom: '<p:zoom dir="in"/>', zoom_out: '<p:zoom dir="out"/>',
  'fade in': '<p:fade/>', 'push right': '<p:push dir="r"/>', 'push left': '<p:push dir="l"/>',
  'push down': '<p:push dir="d"/>', 'push up': '<p:push dir="u"/>',
  'wipe left': '<p:wipe dir="l"/>', 'wipe right': '<p:wipe dir="r"/>', 'zoom in': '<p:zoom dir="in"/>',
};

export async function addNativeTransitions(data: Blob, slides: SlideItem[]) {
  const archive = await JSZip.loadAsync(data);
  for (const [index, slide] of slides.entries()) {
    const name = `ppt/slides/slide${index + 1}.xml`;
    const file = archive.file(name);
    const effect = slide.theme?.pageExitEffect || slide.theme?.transitionEffect || '';
    const record = transition[effect.toLowerCase()] || transition[effect.toLowerCase().replace(/ /g, '_')];
    if (!file || !record) continue;
    const xml = await file.async('string');
    const node = `<p:transition spd="med" advClick="1">${record}</p:transition>`;
    const updated = xml.includes('</p:clrMapOvr>')
      ? xml.replace('</p:clrMapOvr>', `</p:clrMapOvr>${node}`)
      : xml.replace('</p:sld>', `${node}</p:sld>`);
    archive.file(name, updated);
  }
  return archive.generateAsync({ type: 'blob' });
}
