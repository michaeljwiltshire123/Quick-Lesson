import { LociRoutePreset } from './types';
import { THEMED_ROUTE_PRESETS } from './themedPresets';

export const SPATIAL_ARCHETYPE_PRESETS: LociRoutePreset[] = [
  {
    id: 'single_indoor_room',
    name: 'Single Indoor Room',
    stations: [
      'Main Entrance / Doorway', 'Front Left Corner', 'Front Main Wall',
      'Centre Area / Main Table', 'Right Window / Side Wall', 'Rear Right Corner',
      'Rear Wall', 'Rear Left Corner', 'Left Side Wall', 'Exit / Back Doorway',
    ],
  },
  {
    id: 'building_walkthrough',
    name: 'Building Walkthrough',
    stations: [
      'Front Entrance Gate', 'Lobby / Reception Desk', 'Main Ground-Floor Hallway',
      'Staircase / Lift Bay', 'First Floor Landing', 'Central Staff Doorway',
      'Crossway Junction', 'Rear Corridor', 'Side Exit Foyer', 'External Courtyard Gate',
    ],
  },
  {
    id: 'outdoor_route',
    name: 'Outdoor Route',
    stations: [
      'Entrance Arch / Boundary', 'Main Approach Pathway', 'Central Landmark / Open Clearing',
      'Far Tree Line / Boundary Hedge', 'Crossroads / Path Junction', 'Elevated Ridge / Viewpoint',
      'Water Edge / Bridge Area', 'Sheltered Pavilion Zone', 'Perimeter Fence Line', 'Exit Gate / Final Waypoint',
    ],
  },
];

export const LOCI_ROUTE_PRESETS: LociRoutePreset[] = [
  ...SPATIAL_ARCHETYPE_PRESETS,
  ...THEMED_ROUTE_PRESETS,
];
