export interface PatternOptions {
  width: number;
  height: number;
  seed?: number;
  density?: number;
  glyphs?: string;
}

function nextRandom(state: { value: number }): number {
  state.value = (state.value * 1664525 + 1013904223) >>> 0;
  return state.value / 0x100000000;
}

export function samplePattern(options: PatternOptions): string[] {
  const { width, height } = options;
  if (width < 1 || height < 1 || !Number.isInteger(width) || !Number.isInteger(height)) {
    throw new Error("Pattern dimensions must be positive integers");
  }
  const glyphs = options.glyphs || " .:-=+*#%@";
  const density = Math.max(0, Math.min(1, options.density ?? 0.5));
  const state = { value: (options.seed ?? 1) >>> 0 };

  return Array.from({ length: height }, () => {
    const row: string[] = [];
    for (let column = 0; column < width; column += 1) {
      const random = nextRandom(state);
      if (random > density) row.push(glyphs[0]);
      else row.push(glyphs[Math.floor(random * glyphs.length)]);
    }
    return row.join("");
  });
}

export function mirrorPattern(lines: readonly string[]): string[] {
  return lines.map((line) => `${line}${line.split("").reverse().join("")}`);
}
