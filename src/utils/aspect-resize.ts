export interface ResizeOptions {
  targetWidth: number;
  cellAspect?: number;
}

/** Resize a rectangular scalar grid while compensating for terminal cell shape. */
export function resizeGrid(
  source: readonly number[],
  sourceWidth: number,
  options: ResizeOptions,
): { values: number[]; width: number; height: number } {
  if (!Number.isInteger(sourceWidth) || sourceWidth < 1 || source.length % sourceWidth !== 0) {
    throw new Error("sourceWidth must describe the source grid");
  }
  if (!Number.isInteger(options.targetWidth) || options.targetWidth < 1) {
    throw new Error("targetWidth must be positive");
  }
  const sourceHeight = source.length / sourceWidth;
  const aspect = Math.max(0.1, options.cellAspect ?? 0.5);
  const targetHeight = Math.max(1, Math.round(sourceHeight * options.targetWidth / sourceWidth * aspect));
  const values: number[] = [];

  for (let y = 0; y < targetHeight; y += 1) {
    const sourceY = Math.min(sourceHeight - 1, Math.floor(y * sourceHeight / targetHeight));
    for (let x = 0; x < options.targetWidth; x += 1) {
      const sourceX = Math.min(sourceWidth - 1, Math.floor(x * sourceWidth / options.targetWidth));
      values.push(source[sourceY * sourceWidth + sourceX]);
    }
  }
  return { values, width: options.targetWidth, height: targetHeight };
}
