export function getShapeContainerClass(shapeType?: string): string {
  switch (shapeType) {
    case 'circle':
      return 'rounded-full aspect-square';
    case 'sticky_note':
      return 'shadow-md rotate-[-1deg] border-t-8 border-t-amber-400';
    case 'callout':
      return 'rounded-2xl after:content-[""] after:absolute after:-bottom-3 after:left-6 after:border-8 after:border-transparent after:border-t-inherit';
    case 'diamond':
      return 'rotate-45 [&>textarea]:-rotate-45';
    default:
      return 'rounded-xl';
  }
}

export function getShapeSvgPath(shapeType?: string): string {
  return '';
}
