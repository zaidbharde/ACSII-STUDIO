export interface DensityRamp {
  characters: string;
  invert?: boolean;
}

/** Maps a normalized luminance value to a glyph, with optional dark-to-light inversion. */
export function luminanceToGlyph(luminance: number, ramp: DensityRamp): string {
  if (ramp.characters.length === 0) throw new Error('Density ramp cannot be empty');
  const clamped = Math.max(0, Math.min(1, luminance));
  const position = ramp.invert ? 1 - clamped : clamped;
  const index = Math.min(ramp.characters.length - 1, Math.round(position * (ramp.characters.length - 1)));
  return ramp.characters[index];
}

export function mapLuminanceGrid(grid: number[][], ramp: DensityRamp): string[] {
  return grid.map((row) => row.map((value) => luminanceToGlyph(value, ramp)).join(''));
}

export function averageLuminance(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + Math.max(0, Math.min(1, value)), 0) / values.length;
}
