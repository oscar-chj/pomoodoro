import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Font entry in the shape ImageResponse expects. */
export type CardFont = {
  name: string;
  data: ArrayBuffer;
  style: "normal";
  weight: 400 | 500 | 600 | 700;
};

/**
 * Optional heavier Geist file. Drop a TTF/OTF (satori cannot read woff2) at this
 * path to get true semibold numerals; without it the card uses ImageResponse's
 * built-in Geist Regular, which is always available.
 */
const SEMIBOLD_PATH = join(process.cwd(), "app", "_seo", "cards", "fonts", "Geist-SemiBold.ttf");

/**
 * Load card fonts. Never throws: any failure returns an empty list so
 * ImageResponse falls back to its bundled Geist Regular.
 */
export async function loadCardFonts(): Promise<CardFont[]> {
  try {
    const file = await readFile(SEMIBOLD_PATH);
    const data = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength) as ArrayBuffer;
    return [{ name: "Geist", data, style: "normal", weight: 600 }];
  } catch {
    return [];
  }
}
