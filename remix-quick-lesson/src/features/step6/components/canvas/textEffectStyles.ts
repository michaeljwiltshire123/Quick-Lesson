import { CSSProperties } from 'react';
import { ElementTextStyle } from '../../types/slideTypes';

const RIBBON_GRADIENTS: Record<string, string> = {
  'union-jack': 'linear-gradient(90deg, #00247D 0%, #00247D 30%, #FFFFFF 30%, #FFFFFF 38%, #CF142B 38%, #CF142B 62%, #FFFFFF 62%, #FFFFFF 70%, #00247D 70%)',
  'gold-medal': 'linear-gradient(90deg, #D97706, #FDE68A, #F59E0B, #FEF08A, #B45309)',
  'olympic': 'linear-gradient(90deg, #0085C7, #F4C300, #1F2937, #009F3D, #DF0024)',
  'royal-purple': 'linear-gradient(90deg, #6B21A8, #C084FC, #E11D48, #FDE047)',
  'emerald': 'linear-gradient(90deg, #065F46, #34D399, #10B981, #FBBF24)',
};

const STICKER_FILTERS: Record<string, string> = {
  white: 'drop-shadow(2px 0 0 #FFFFFF) drop-shadow(-2px 0 0 #FFFFFF) drop-shadow(0 2px 0 #FFFFFF) drop-shadow(0 -2px 0 #FFFFFF) drop-shadow(0 3px 6px rgba(0,0,0,0.3))',
  gold: 'drop-shadow(2px 0 0 #F59E0B) drop-shadow(-2px 0 0 #F59E0B) drop-shadow(0 2px 0 #F59E0B) drop-shadow(0 -2px 0 #F59E0B) drop-shadow(0 3px 6px rgba(245,158,11,0.4))',
  slate: 'drop-shadow(2px 0 0 #1E293B) drop-shadow(-2px 0 0 #1E293B) drop-shadow(0 2px 0 #1E293B) drop-shadow(0 -2px 0 #1E293B) drop-shadow(0 3px 6px rgba(0,0,0,0.4))',
};

export function getTextEffectStyles(ts: ElementTextStyle & Record<string, any>): CSSProperties {
  const styles: CSSProperties = {};

  if (ts.is3DBlock) {
    styles.textShadow = '1px 1px 0 rgba(0,0,0,0.65), 2px 2px 0 rgba(0,0,0,0.55), 3px 3px 0 rgba(0,0,0,0.45), 4px 4px 0 rgba(0,0,0,0.35), 6px 6px 8px rgba(0,0,0,0.3)';
    styles.fontWeight = '800';
  } else if (ts.neonGlow) {
    styles.textShadow = '0 0 8px #F59E0B, 0 0 16px #F59E0B';
  } else if (ts.textShadow) {
    styles.textShadow = '2px 2px 4px rgba(0,0,0,0.35)';
  }

  const sticker = ts.stickerOutline;
  if (sticker && sticker !== 'none' && STICKER_FILTERS[sticker]) {
    styles.filter = STICKER_FILTERS[sticker];
  }

  const ribbon = ts.ribbonGradient;
  if (ribbon === 'custom' && ts.customRibbonUrl) {
    styles.backgroundImage = `url("${ts.customRibbonUrl}")`;
    styles.backgroundSize = 'cover';
    styles.backgroundPosition = 'center';
    styles.WebkitBackgroundClip = 'text';
    styles.WebkitTextFillColor = 'transparent';
    styles.fontWeight = '800';
  } else if (ribbon && ribbon !== 'none' && RIBBON_GRADIENTS[ribbon]) {
    styles.backgroundImage = RIBBON_GRADIENTS[ribbon];
    styles.WebkitBackgroundClip = 'text';
    styles.WebkitTextFillColor = 'transparent';
    styles.fontWeight = 'bold';
  } else if (ts.isRainbow) {
    styles.backgroundImage = 'linear-gradient(90deg, #ef4444, #f97316, #eab308, #10b981, #06b6d4, #3b82f6, #8b5cf6)';
    styles.WebkitBackgroundClip = 'text';
    styles.WebkitTextFillColor = 'transparent';
    styles.fontWeight = 'bold';
  }

  return styles;
}
