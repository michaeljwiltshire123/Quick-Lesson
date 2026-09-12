import { LOCI_ROUTE_PRESETS } from './constants';

const VAULT_KEY = 'loci_vault_used_routes';
const PERSONAL_LIB_KEY = 'loci_vault_personal_routes';

export interface SavedPersonalRoute {
  name: string;
  stations: string[];
}

export function getUsedRoutesFromVault(): string[] {
  try {
    const raw = localStorage.getItem(VAULT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function recordRouteInVault(routeName: string): void {
  try {
    const existing = getUsedRoutesFromVault();
    if (!existing.includes(routeName)) {
      localStorage.setItem(VAULT_KEY, JSON.stringify([...existing, routeName].slice(-20)));
    }
  } catch {}
}

export function isRouteInVault(routeName: string): boolean {
  return getUsedRoutesFromVault().includes(routeName);
}

export function getPersonalSavedRoutes(): SavedPersonalRoute[] {
  try {
    const raw = localStorage.getItem(PERSONAL_LIB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function autoSaveRouteToLibrary(name: string, stations: string[]): void {
  const trimmed = name.trim();
  if (!trimmed) return;
  try {
    const current = getPersonalSavedRoutes();
    const filtered = current.filter((r) => r.name.toLowerCase() !== trimmed.toLowerCase());
    const validStations = stations.map((s) => s.trim()).filter(Boolean);
    const updated = [{ name: trimmed, stations: validStations }, ...filtered];
    localStorage.setItem(PERSONAL_LIB_KEY, JSON.stringify(updated.slice(0, 30)));
    recordRouteInVault(trimmed);
  } catch {}
}

export function removePersonalSavedRoute(name: string): void {
  try {
    const current = getPersonalSavedRoutes();
    const updated = current.filter((r) => r.name.toLowerCase() !== name.toLowerCase());
    localStorage.setItem(PERSONAL_LIB_KEY, JSON.stringify(updated));
  } catch {}
}

export function findMatchingTripletInHistory(stations: string[]): { sequence: string; routeName: string } | null {
  const cleaned = stations.map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (cleaned.length < 3) return null;
  const allRoutes = [...LOCI_ROUTE_PRESETS, ...getPersonalSavedRoutes()];

  for (let i = 0; i <= cleaned.length - 3; i++) {
    const [s1, s2, s3] = [cleaned[i], cleaned[i + 1], cleaned[i + 2]];
    for (const r of allRoutes) {
      const rStations = r.stations.map((s) => s.trim().toLowerCase());
      for (let j = 0; j <= rStations.length - 3; j++) {
        if (rStations[j] === s1 && rStations[j + 1] === s2 && rStations[j + 2] === s3) {
          const original = [stations[i], stations[i + 1], stations[i + 2]].join(' ➔ ');
          return { sequence: original, routeName: r.name };
        }
      }
    }
  }
  return null;
}
