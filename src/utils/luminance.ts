export interface Rgb {
  red: number;
  green: number;
  blue: number;
}

function linearize(channel: number): number {
  const normalized = Math.min(255, Math.max(0, channel)) / 255;
  return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

/** Return WCAG-relative luminance for an RGB color. */
export function relativeLuminance(color: Rgb): number {
  return 0.2126 * linearize(color.red) + 0.7152 * linearize(color.green) + 0.0722 * linearize(color.blue);
}

export function contrastRatio(first: Rgb, second: Rgb): number {
  const bright = Math.max(relativeLuminance(first), relativeLuminance(second));
  const dark = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (bright + 0.05) / (dark + 0.05);
}

export function grayscale(color: Rgb): number {
  return Math.round((0.299 * color.red) + (0.587 * color.green) + (0.114 * color.blue));
}

export function isReadable(foreground: Rgb, background: Rgb, threshold = 4.5): boolean {
  return contrastRatio(foreground, background) >= threshold;
}
