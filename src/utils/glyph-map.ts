export interface GlyphRamp {
  characters: string;
  invert?: boolean;
}

export function mapBrightnessToGlyph(value: number, ramp: GlyphRamp): string {
  if (ramp.characters.length === 0) throw new Error("glyph ramp cannot be empty");
  const normalized = Math.min(1, Math.max(0, value));
  const position = ramp.invert ? 1 - normalized : normalized;
  const index = Math.min(ramp.characters.length - 1, Math.floor(position * ramp.characters.length));
  return ramp.characters[index];
}

export function renderGlyphRow(values: readonly number[], ramp: GlyphRamp): string {
  return values.map((value) => mapBrightnessToGlyph(value, ramp)).join("");
}

export function chooseRamp(average: number, dark: GlyphRamp, light: GlyphRamp): GlyphRamp {
  return average < 0.5 ? dark : light;
}

export function normalizeRamp(ramp: GlyphRamp): GlyphRamp {
  const characters = Array.from(ramp.characters).filter((character) => character !== "\n" && character !== "\r").join("");
  if (!characters) throw new Error("glyph ramp must contain printable characters");
  return { characters, invert: ramp.invert ?? false };
}
