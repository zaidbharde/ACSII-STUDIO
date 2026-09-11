export interface GlyphRun {
  glyph: string;
  count: number;
}

/** Compresses adjacent equal glyphs while preserving order and empty input semantics. */
export function encodeGlyphRuns(glyphs: string[]): GlyphRun[] {
  const runs: GlyphRun[] = [];
  for (const glyph of glyphs) {
    const previous = runs[runs.length - 1];
    if (previous?.glyph === glyph) previous.count += 1;
    else runs.push({ glyph, count: 1 });
  }
  return runs;
}

export function decodeGlyphRuns(runs: GlyphRun[]): string[] {
  const glyphs: string[] = [];
  for (const run of runs) {
    if (!Number.isInteger(run.count) || run.count < 0) throw new RangeError('Run count must be non-negative');
    for (let index = 0; index < run.count; index += 1) glyphs.push(run.glyph);
  }
  return glyphs;
}
