export interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

function linearChannel(value: number): number {
  const normalized = Math.max(0, Math.min(255, value)) / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(color: RgbColor): number {
  return (
    0.2126 * linearChannel(color.red) +
    0.7152 * linearChannel(color.green) +
    0.0722 * linearChannel(color.blue)
  );
}

export function contrastRatio(first: RgbColor, second: RgbColor): number {
  const brighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (brighter + 0.05) / (darker + 0.05);
}

export function meetsAaContrast(first: RgbColor, second: RgbColor): boolean {
  return contrastRatio(first, second) >= 4.5;
}
