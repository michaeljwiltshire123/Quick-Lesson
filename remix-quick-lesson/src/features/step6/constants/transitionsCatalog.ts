export interface TransitionItem {
  id: string;
  name: string;
  category: 'standard' | 'classroom' | 'scifi' | 'wild';
  exportFallback: string;
  description: string;
  isWebOnly?: boolean;
}

export const TRANSITIONS_CATALOG: TransitionItem[] = [
  // 1. Standard Presentation
  { id: 'fade', name: 'Smooth Fade', category: 'standard', exportFallback: 'Fade In', description: 'Classic soft cross-dissolve' },
  { id: 'slide_right', name: 'Push / Slide Right', category: 'standard', exportFallback: 'Push Right', description: 'Glides in from right' },
  { id: 'slide_left', name: 'Push / Slide Left', category: 'standard', exportFallback: 'Push Left', description: 'Glides in from left' },
  { id: 'slide_top', name: 'Push Down from Top', category: 'standard', exportFallback: 'Push Down', description: 'Pushes down from top' },
  { id: 'slide_bottom', name: 'Push Up from Bottom', category: 'standard', exportFallback: 'Push Up', description: 'Pushes up from bottom' },
  { id: 'dissolve', name: 'Dissolve & Expand', category: 'standard', exportFallback: 'Dissolve', description: 'Soft particle expand' },
  { id: 'zoom', name: '3D Focus Zoom', category: 'standard', exportFallback: 'Zoom In', description: '3D camera zoom focus' },
  { id: 'flip', name: '3D Card Flip (Cube)', category: 'standard', exportFallback: 'Fly In Right', description: '180° 3D box rotation' },
  { id: 'wipe', name: 'Wipe / Split', category: 'standard', exportFallback: 'Wipe Left', description: 'Clean directional edge wipe' },

  // 2. Classroom & Subject
  { id: 'chalkboard_eraser', name: 'Chalkboard Eraser Wipe', category: 'classroom', exportFallback: 'Wipe Left', description: 'Felt eraser sweeps away chalk notes', isWebOnly: true },
  { id: 'roller_screen', name: 'Roller Projection Screen', category: 'classroom', exportFallback: 'Push Up', description: 'Spring screen rolls up to reveal board', isWebOnly: true },
  { id: 'sticky_note', name: 'Sticky Note Peel', category: 'classroom', exportFallback: 'Fly In', description: 'Peels off like a Post-it note', isWebOnly: true },
  { id: 'door_push', name: 'Classroom Door Push', category: 'classroom', exportFallback: 'Doors Open', description: 'Double oak doors swing open', isWebOnly: true },
  { id: 'gold_star', name: 'Gold Star Stamp', category: 'classroom', exportFallback: 'Zoom In', description: 'Pulsing star stamps Slide 1 then bounces away', isWebOnly: true },
  { id: 'textbook_flip', name: 'Textbook Hardcover Flip', category: 'classroom', exportFallback: 'Page Turn', description: 'Heavy textbook page fold', isWebOnly: true },
  { id: 'zipper_split', name: 'Split-Screen Zipper', category: 'classroom', exportFallback: 'Split', description: 'Vertical zip splits slide open', isWebOnly: true },

  // 3. Sci-Fi & Special
  { id: 'laser_scanline', name: 'Laser Scanline Beam', category: 'scifi', exportFallback: 'Wipe Down', description: 'Fatter neon laser sweeps down slide', isWebOnly: true },
  { id: 'matrix_rain', name: 'Matrix Code Rain', category: 'scifi', exportFallback: 'Dissolve', description: '01 binary code rains down and clears', isWebOnly: true },
  { id: 'cyberpunk_portal', name: 'Cyberpunk Neon Portal', category: 'scifi', exportFallback: 'Zoom In', description: 'Pulsing neon ring opens and fades away', isWebOnly: true },
  { id: 'heatmap_meltdown', name: 'Thermal Heatmap Meltdown', category: 'scifi', exportFallback: 'Fade In', description: 'Infrared heat shifts, explodes in radiant shockwave, and dissolves into slide', isWebOnly: true },
  { id: 'hologram_beam', name: 'Hologram Beam Teleport', category: 'scifi', exportFallback: 'Fade In', description: 'Cyan hologram beam dematerializes', isWebOnly: true },

  // 4. Wild & Creative
  { id: 'morph_magic', name: 'Morph Magic Move', category: 'wild', exportFallback: 'Fade In', description: 'Elements seamlessly fluid-morph between slides' },
  { id: 'crumble_paper', name: 'Paper Crumble & Drop', category: 'wild', exportFallback: 'Dissolve', description: 'Slide 1 crumbles into a paper ball and drops', isWebOnly: true },
  { id: 'rip_half', name: 'Tear / Rip in Half', category: 'wild', exportFallback: 'Split', description: 'Slide 1 tears down the middle and pulls apart', isWebOnly: true },
  { id: 'honeycomb', name: 'Honeycomb Hexagon Grid', category: 'wild', exportFallback: 'Dissolve', description: 'Hexagonal honeycomb grid reveals new slide', isWebOnly: true },
  { id: 'vortex_twirl', name: 'Vortex / Twirl Swirl', category: 'wild', exportFallback: 'Spin', description: 'Rapid 360° whirlpool spin into Slide 2', isWebOnly: true },
  { id: 'window_blinds', name: 'Vertical Window Blinds', category: 'wild', exportFallback: 'Blinds', description: 'Vertical window blind slats flip over simultaneously' },
  { id: 'horizontal_blinds', name: 'Horizontal Venetian Blinds', category: 'wild', exportFallback: 'Blinds', description: 'Horizontal Venetian blind slats tilt and open simultaneously' },
  { id: 'grid_tile_flip', name: 'Grid Tile 3D Flip', category: 'wild', exportFallback: 'Flip', description: '4x4 square grid tiles flip over sequentially', isWebOnly: true },
  { id: 'confetti_burst', name: 'Confetti Celebration Burst', category: 'wild', exportFallback: 'Zoom In', description: 'Dual high-velocity confetti cannons blast colourful 3D foil ribbons and streamers', isWebOnly: true },
  { id: 'water_wave', name: 'Liquid Water Wave', category: 'wild', exportFallback: 'Wipe Right', description: 'Fluid water ripple wave washes across', isWebOnly: true },
  { id: 'cell_mitosis', name: 'Cell Division (Mitosis)', category: 'wild', exportFallback: 'Split', description: 'Slide 1 pinches and divides in two daughter cells', isWebOnly: true },
  { id: 'volcanic_ash', name: 'Volcanic Ash Cloud-Burst', category: 'wild', exportFallback: 'Fade In', description: 'Dramatic volcanic ash cloud puffs and clears', isWebOnly: true },
  { id: 'solar_eclipse', name: 'Solar Eclipse Sweep', category: 'wild', exportFallback: 'Wipe', description: 'Dark moon shadow sweeps across in solar corona', isWebOnly: true },
  { id: 'spiral_spin', name: 'Spiral 3D Spin (5x)', category: 'wild', exportFallback: 'Spin', description: 'Spins 5 times in 3D perspective into Slide 2', isWebOnly: true },
  { id: 'black_hole', name: 'Black Hole Vortex', category: 'wild', exportFallback: 'Zoom In', description: 'Gravitational whirlpool pulls in then disappears', isWebOnly: true },
  { id: 'comic_slam', name: 'Comic Book KAPOW Slam', category: 'wild', exportFallback: 'Zoom In', description: 'KAPOW stamp slams, crumbles, and flies off', isWebOnly: true },
  { id: 'vhs_rewind', name: 'VHS Tape Rewind Glitch', category: 'wild', exportFallback: 'Wipe', description: '90s tracking lines and tape rewind static', isWebOnly: true },
  { id: 'quantum_split', name: 'Quantum Superposition', category: 'wild', exportFallback: 'Fade In', description: 'Ghosted parallel slide collapse', isWebOnly: true },
];
