export interface RgbColor { red: number; green: number; blue: number; }

export interface PaletteEntry extends RgbColor { name: string; ansi: string; }

function clamp(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

export function rgb(name: string, red: number, green: number, blue: number): PaletteEntry {
  const color = { name, red: clamp(red), green: clamp(green), blue: clamp(blue) };
  return { ...color, ansi: `\x1b[38;2;${color.red};${color.green};${color.blue}m` };
}

export function interpolatePalette(start: RgbColor, end: RgbColor, steps: number): RgbColor[] {
  if (!Number.isInteger(steps) || steps < 2) throw new Error('palette requires at least two steps');
  return Array.from({ length: steps }, (_, index) => {
    const ratio = index / (steps - 1);
    return {
      red: clamp(start.red + (end.red - start.red) * ratio),
      green: clamp(start.green + (end.green - start.green) * ratio),
      blue: clamp(start.blue + (end.blue - start.blue) * ratio),
    };
  });
}

export function resetAnsi(): string { return '\x1b[0m'; }
