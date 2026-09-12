const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
] as const;

export interface DitherOptions {
  strength?: number;
  matrixSize?: 4;
}

/** Apply ordered dithering to normalized grayscale samples. */
export function orderedDither(samples: readonly number[], width: number, options: DitherOptions = {}): number[] {
  if (!Number.isInteger(width) || width < 1 || samples.length % width !== 0) {
    throw new Error("width must divide the sample count");
  }
  const strength = Math.min(1, Math.max(0, options.strength ?? 0.35));
  return samples.map((sample, index) => {
    const x = index % width;
    const y = Math.floor(index / width);
    const threshold = (BAYER_4X4[y % 4][x % 4] + 0.5) / 16 - 0.5;
    const value = Math.min(1, Math.max(0, sample + threshold * strength));
    return Number(value.toFixed(4));
  });
}

export function thresholdSamples(samples: readonly number[], threshold = 0.5): boolean[] {
  return samples.map((sample) => sample >= threshold);
}
