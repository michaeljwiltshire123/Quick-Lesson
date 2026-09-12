export function getRouteFallback(name: string): string[] {
  const n = name.toLowerCase();
  if (n.includes('outdoor') || n.includes('park') || n.includes('ground') || n.includes('field')) {
    return [
      'Entrance Arch / Boundary', 'Main Approach Pathway', 'Central Landmark / Open Clearing',
      'Far Tree Line / Boundary Hedge', 'Crossroads / Path Junction', 'Elevated Ridge / Viewpoint',
      'Water Edge / Bridge Area', 'Sheltered Pavilion Zone', 'Perimeter Fence Line', 'Exit Gate / Final Waypoint',
    ];
  }
  if (n.includes('walk') || n.includes('building') || n.includes('school') || n.includes('corridor') || n.includes('hall')) {
    return [
      'Front Entrance Gate', 'Lobby / Reception Desk', 'Main Ground-Floor Hallway',
      'Staircase / Lift Bay', 'First Floor Landing', 'Central Staff Doorway',
      'Crossway Junction', 'Rear Corridor', 'Side Exit Foyer', 'External Courtyard Gate',
    ];
  }
  return [
    'Main Entrance / Doorway', 'Front Left Corner', 'Front Main Wall',
    'Centre Area / Main Table', 'Right Window / Side Wall', 'Rear Right Corner',
    'Rear Wall', 'Rear Left Corner', 'Left Side Wall', 'Exit / Back Doorway',
  ];
}
