import React from 'react';
import { LaserBeamOverlay } from './LaserBeamOverlay';
import { MatrixRainOverlay } from './MatrixRainOverlay';
import { ThermalHeatmapOverlay } from './ThermalHeatmapOverlay';
import { CyberpunkPortalOverlay } from './CyberpunkPortalOverlay';
import { HologramBeamOverlay } from './HologramBeamOverlay';
import { PaperRipOverlay } from './PaperRipOverlay';
import { HoneycombGridOverlay } from './HoneycombGridOverlay';
import { WindowBlindsOverlay } from './WindowBlindsOverlay';
import { HorizontalBlindsOverlay } from './HorizontalBlindsOverlay';
import { GridTileFlipOverlay } from './GridTileFlipOverlay';
import { ConfettiBurstOverlay } from './ConfettiBurstOverlay';
import { WaterWaveOverlay } from './WaterWaveOverlay';
import { CellMitosisOverlay } from './CellMitosisOverlay';
import { VolcanicAshOverlay } from './VolcanicAshOverlay';
import { FadeCinematicOverlay } from './FadeCinematicOverlay';
import { SlideCinematicOverlay } from './SlideCinematicOverlay';
import { DissolveCinematicOverlay } from './DissolveCinematicOverlay';
import { ZoomCinematicOverlay } from './ZoomCinematicOverlay';
import { FlipCinematicOverlay } from './FlipCinematicOverlay';
import { WipeCinematicOverlay } from './WipeCinematicOverlay';
import { ChalkboardEraserOverlay } from './ChalkboardEraserOverlay';
import { RollerScreenOverlay } from './RollerScreenOverlay';
import { StickyNoteOverlay } from './StickyNoteOverlay';
import { ClassroomDoorOverlay } from './ClassroomDoorOverlay';
import { GoldStarOverlay } from './GoldStarOverlay';
import { TextbookFlipOverlay } from './TextbookFlipOverlay';
import { ZipperSplitOverlay } from './ZipperSplitOverlay';
import { MorphMagicOverlay } from './MorphMagicOverlay';
import { PaperCrumbleOverlay } from './PaperCrumbleOverlay';
import { VortexTwirlOverlay } from './VortexTwirlOverlay';
import { SolarEclipseOverlay } from './SolarEclipseOverlay';
import { SpiralSpinOverlay } from './SpiralSpinOverlay';
import { BlackHoleOverlay } from './BlackHoleOverlay';
import { ComicSlamOverlay } from './ComicSlamOverlay';
import { VhsRewindOverlay } from './VhsRewindOverlay';
import { QuantumSplitOverlay } from './QuantumSplitOverlay';

interface TransitionVisualOverlayProps {
  effectId: string;
  speed?: number;
  activeTab?: 'entry' | 'exit';
}

export const TransitionVisualOverlay: React.FC<TransitionVisualOverlayProps> = ({
  effectId,
  speed = 0.6,
}) => {
  if (effectId === 'fade') return <FadeCinematicOverlay speed={speed} />;
  if (
    effectId === 'slide_right' ||
    effectId === 'slide_left' ||
    effectId === 'slide_top' ||
    effectId === 'slide_bottom'
  ) {
    return <SlideCinematicOverlay effectId={effectId} speed={speed} />;
  }
  if (effectId === 'dissolve') return <DissolveCinematicOverlay speed={speed} />;
  if (effectId === 'zoom') return <ZoomCinematicOverlay speed={speed} />;
  if (effectId === 'flip') return <FlipCinematicOverlay speed={speed} />;
  if (effectId === 'wipe') return <WipeCinematicOverlay speed={speed} />;

  if (effectId === 'chalkboard_eraser') return <ChalkboardEraserOverlay speed={speed} />;
  if (effectId === 'roller_screen') return <RollerScreenOverlay speed={speed} />;
  if (effectId === 'sticky_note') return <StickyNoteOverlay speed={speed} />;
  if (effectId === 'door_push') return <ClassroomDoorOverlay speed={speed} />;
  if (effectId === 'gold_star') return <GoldStarOverlay speed={speed} />;
  if (effectId === 'textbook_flip') return <TextbookFlipOverlay speed={speed} />;
  if (effectId === 'zipper_split') return <ZipperSplitOverlay speed={speed} />;

  if (effectId === 'laser_scanline') return <LaserBeamOverlay speed={speed} />;
  if (effectId === 'matrix_rain') return <MatrixRainOverlay speed={speed} />;
  if (effectId === 'cyberpunk_portal') return <CyberpunkPortalOverlay speed={speed} />;
  if (effectId === 'heatmap_meltdown') return <ThermalHeatmapOverlay speed={speed} />;
  if (effectId === 'hologram_beam') return <HologramBeamOverlay speed={speed} />;
  if (effectId === 'rip_half') return <PaperRipOverlay speed={speed} />;
  if (effectId === 'honeycomb') return <HoneycombGridOverlay speed={speed} />;
  if (effectId === 'window_blinds') return <WindowBlindsOverlay speed={speed} />;
  if (effectId === 'horizontal_blinds') return <HorizontalBlindsOverlay speed={speed} />;
  if (effectId === 'grid_tile_flip') return <GridTileFlipOverlay speed={speed} />;
  if (effectId === 'confetti_burst') return <ConfettiBurstOverlay speed={speed} />;
  if (effectId === 'water_wave') return <WaterWaveOverlay speed={speed} />;
  if (effectId === 'cell_mitosis') return <CellMitosisOverlay speed={speed} />;
  if (effectId === 'volcanic_ash') return <VolcanicAshOverlay speed={speed} />;
  
  if (effectId === 'morph_magic') return <MorphMagicOverlay speed={speed} />;
  if (effectId === 'crumble_paper') return <PaperCrumbleOverlay speed={speed} />;
  if (effectId === 'vortex_twirl') return <VortexTwirlOverlay speed={speed} />;
  if (effectId === 'solar_eclipse') return <SolarEclipseOverlay speed={speed} />;
  if (effectId === 'spiral_spin') return <SpiralSpinOverlay speed={speed} />;
  if (effectId === 'black_hole') return <BlackHoleOverlay speed={speed} />;
  if (effectId === 'comic_slam') return <ComicSlamOverlay speed={speed} />;
  if (effectId === 'vhs_rewind') return <VhsRewindOverlay speed={speed} />;
  if (effectId === 'quantum_split') return <QuantumSplitOverlay speed={speed} />;

  return null;
};
