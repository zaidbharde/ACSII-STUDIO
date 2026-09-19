export interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

const clampChannel = (value: number): number =>
  Math.max(0, Math.min(255, Math.round(value)));

export function parseHexColor(value: string): RgbColor {
  const normalized = value.replace(/^#/, "");
  if (!/^[0-9a-f]{6}$/i.test(normalized)) {
    throw new Error(`Invalid six-digit color: ${value}`);
  }
  return {
    red: Number.parseInt(normalized.slice(0, 2), 16),
    green: Number.parseInt(normalized.slice(2, 4), 16),
    blue: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

export function toHexColor(color: RgbColor): string {
  const channel = (value: number) => clampChannel(value).toString(16).padStart(2, "0");
  return `#${channel(color.red)}${channel(color.green)}${channel(color.blue)}`;
}

export function interpolateColor(start: RgbColor, end: RgbColor, amount: number): RgbColor {
  const t = Math.max(0, Math.min(1, amount));
  return {
    red: start.red + (end.red - start.red) * t,
    green: start.green + (end.green - start.green) * t,
    blue: start.blue + (end.blue - start.blue) * t,
  };
}

export function createColorRamp(startHex: string, endHex: string, steps: number): string[] {
  if (!Number.isInteger(steps) || steps < 2) {
    throw new Error("A color ramp needs at least two steps");
  }
  const start = parseHexColor(startHex);
  const end = parseHexColor(endHex);
  return Array.from({ length: steps }, (_, index) =>
    toHexColor(interpolateColor(start, end, index / (steps - 1))),
  );
}
