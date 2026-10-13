import { LociRoutePreset } from './types';

export const THEMED_ROUTE_PRESETS: LociRoutePreset[] = [
  {
    id: 'school_grounds',
    name: 'School Grounds Walk',
    stations: [
      'School Gates', 'Main Driveway', 'Reception Lobby', 'Main Hall Doors',
      'Dining Hall Counter', 'Science Wing Corridor', 'Library Steps',
      'Sports Pavilion', 'Courtyard Fountain', 'Playing Fields Gate',
    ],
  },
  {
    id: 'standard_classroom',
    name: 'Standard Classroom',
    stations: [
      'Front door', "Teacher's desk", 'Whiteboard', 'Projector screen',
      'Student pod 1', 'Bookshelf', 'Window ledge', 'Sink station',
      'Pencil sharpener table', 'Noticeboard',
    ],
  },
  {
    id: 'house_indoor',
    name: 'House / Indoor',
    stations: [
      'Front Porch & Doorbell', 'Hallway Mirror', 'Living Room Sofa',
      'Kitchen Island Sink', 'Dining Room Table', 'Staircase Landing',
      'Main Bedroom Wardrobe', 'Bathroom Washbasin', 'Study Bookshelf', 'Back Garden Patio',
    ],
  },
  {
    id: 'outdoor_playground',
    name: 'Outdoor / Playground',
    stations: [
      'Swing set', 'Slide', 'Basketball hoop', 'Climbing frame',
      'Sandbox', 'Park bench', 'Iron gate', 'Big Oak tree',
      'Water fountain', 'Picnic table',
    ],
  },
  {
    id: 'space_station',
    name: 'Space Station',
    stations: [
      'Airlock hatch', 'Command console', 'Cupola window', 'Zero-G sleep pod',
      'Solar panel array', 'Hydroponics bay', 'Centrifuge hub', 'Communication dish',
      'Laboratory glovebox', 'Docking adapter',
    ],
  },
  {
    id: 'aquarium',
    name: 'Aquarium',
    stations: [
      'Entrance turnstile', 'Touch tank', 'Coral reef tunnel', 'Jellyfish cylinder',
      'Deep sea cavern', 'Ray lagoon bridge', 'Penguin cove ledge', 'Submarine viewport',
      'Shark tank', 'Oceanarium exit',
    ],
  },
  {
    id: 'city_street',
    name: 'City / Street Walk',
    stations: [
      'Zebra Crossing', 'Red Post Box', 'Bus Shelter', 'Corner Bakery Window',
      'Clock Tower Arch', 'Park Entrance Gates', 'Library Steps', 'Town Square Fountain',
      'High Street Lamp-post', 'Train Station Ticket Hall',
    ],
  },
  {
    id: 'sports_field_gym',
    name: 'Sports Field / Gym',
    stations: [
      'Changing Room Door', 'Gymnasium Wall Bars', 'Vaulting Box', 'Centre Circle Spot',
      'Corner Flag', 'Penalty Spot', 'Substitutes Bench', 'Running Track Finish Line',
      'Spectator Bleachers', 'Equipment Store',
    ],
  },
  {
    id: 'custom_history',
    name: 'Custom History',
    stations: [
      'Trench Sandbags', 'Castle Keep Gate', 'Moat Drawbridge', 'Portcullis Grille',
      'Throne Room Dais', 'Armoury Weapon Rack', 'Cobblestone Courtyard',
      'Watchtower Parapet', 'Great Banquet Table', 'Dungeon Archway',
    ],
  },
];
