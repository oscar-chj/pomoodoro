import type { Durations } from "./useTimer";

export const MIN_MINUTES = 1;
export const MAX_MINUTES = 180;

/** Only the settings a link actually specified (and that were valid). */
export type Preset = {
  durations?: Partial<Durations>;
  sound?: boolean;
  hotkeys?: boolean;
};

export type PresetSettings = { durations: Durations; sound: boolean; hotkeys: boolean };

// Query parameter name for each duration. Names are case-sensitive.
const DURATION_PARAMS = { focus: "focus", short: "shortBreak", long: "longBreak" } as const;
export const PRESET_KEYS = [...Object.values(DURATION_PARAMS), "sound", "hotkeys"];

function parseMinutes(raw: string | null): number | undefined {
  if (raw === null || !/^\d+$/.test(raw)) return undefined;
  const n = Number(raw);
  return n >= MIN_MINUTES && n <= MAX_MINUTES ? n : undefined;
}

function parseFlag(raw: string | null): boolean | undefined {
  if (raw === null) return undefined;
  const v = raw.toLowerCase();
  if (v === "1" || v === "on" || v === "true") return true;
  if (v === "0" || v === "off" || v === "false") return false;
  return undefined;
}

/** Parse a query string ("?a=1" or "a=1"). Each invalid value is ignored on its own. Repeated params: first wins. */
export function parsePreset(search: string): Preset {
  const params = new URLSearchParams(search);
  const preset: Preset = {};
  for (const mode of Object.keys(DURATION_PARAMS) as (keyof Durations)[]) {
    const n = parseMinutes(params.get(DURATION_PARAMS[mode]));
    if (n !== undefined) (preset.durations ??= {})[mode] = n;
  }
  const sound = parseFlag(params.get("sound"));
  if (sound !== undefined) preset.sound = sound;
  const hotkeys = parseFlag(params.get("hotkeys"));
  if (hotkeys !== undefined) preset.hotkeys = hotkeys;
  return preset;
}

/** Query string (with leading "?") that reproduces the given settings. */
export function buildPresetQuery(s: PresetSettings): string {
  const params = new URLSearchParams({
    focus: String(s.durations.focus),
    shortBreak: String(s.durations.short),
    longBreak: String(s.durations.long),
    sound: s.sound ? "1" : "0",
    hotkeys: s.hotkeys ? "1" : "0",
  });
  return `?${params}`;
}

/** Location search string with the preset params removed, or null when none were present. */
export function stripPresetParams(search: string): string | null {
  const params = new URLSearchParams(search);
  if (!PRESET_KEYS.some((k) => params.has(k))) return null;
  for (const k of PRESET_KEYS) params.delete(k);
  const rest = params.toString();
  return rest ? `?${rest}` : "";
}
