export interface Histogram {
  bins: number[];
  minimum: number;
  maximum: number;
  mean: number;
}

/** Build a fixed-width luminance histogram for an image-like value array. */
export function brightnessHistogram(values: readonly number[], binCount = 16): Histogram {
  if (!Number.isInteger(binCount) || binCount < 1) {
    throw new Error("binCount must be a positive integer");
  }
  if (values.length === 0) {
    return { bins: Array(binCount).fill(0), minimum: 0, maximum: 0, mean: 0 };
  }

  const finite = values.map((value) => Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0);
  const minimum = Math.min(...finite);
  const maximum = Math.max(...finite);
  const mean = finite.reduce((sum, value) => sum + value, 0) / finite.length;
  const bins = Array(binCount).fill(0) as number[];
  for (const value of finite) {
    const index = Math.min(binCount - 1, Math.floor(value * binCount));
    bins[index] += 1;
  }
  return { bins, minimum, maximum, mean };
}

export function histogramPeak(histogram: Histogram): number {
  return histogram.bins.reduce((peak, count, index) => count > histogram.bins[peak] ? index : peak, 0);
}
