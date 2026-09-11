export interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

export interface PaletteEntry extends RgbColor {
  name: string;
}

function distance(left: RgbColor, right: RgbColor): number {
  const red = left.red - right.red;
  const green = left.green - right.green;
  const blue = left.blue - right.blue;
  return red * red * 0.30 + green * green * 0.59 + blue * blue * 0.11;
}

/** Selects the nearest palette color using luminance-weighted RGB distance. */
export function nearestPaletteColor(color: RgbColor, palette: PaletteEntry[]): PaletteEntry {
  if (palette.length === 0) throw new Error('Palette must contain at least one entry');
  return palette.reduce((best, candidate) => distance(color, candidate) < distance(color, best) ? candidate : best);
}

export function quantizeColors(colors: RgbColor[], palette: PaletteEntry[]): PaletteEntry[] {
  return colors.map((color) => nearestPaletteColor(color, palette));
}
