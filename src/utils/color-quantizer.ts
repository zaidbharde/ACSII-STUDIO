import type { Rgb } from "./luminance";

export interface PaletteEntry extends Rgb {
  label: string;
}

function distance(first: Rgb, second: Rgb): number {
  const red = first.red - second.red;
  const green = first.green - second.green;
  const blue = first.blue - second.blue;
  return red * red + green * green + blue * blue;
}

export function nearestPaletteColor(color: Rgb, palette: readonly PaletteEntry[]): PaletteEntry {
  if (palette.length === 0) throw new Error("palette cannot be empty");
  return palette.reduce((nearest, candidate) => distance(color, candidate) < distance(color, nearest) ? candidate : nearest);
}

export function quantizeColors(colors: readonly Rgb[], palette: readonly PaletteEntry[]): PaletteEntry[] {
  return colors.map((color) => nearestPaletteColor(color, palette));
}

export function paletteUsage(colors: readonly Rgb[], palette: readonly PaletteEntry[]): Map<string, number> {
  const counts = new Map(palette.map((entry) => [entry.label, 0]));
  for (const color of colors) {
    const label = nearestPaletteColor(color, palette).label;
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return counts;
}
