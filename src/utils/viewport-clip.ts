export interface Viewport {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function clipGrid(rows: readonly string[], viewport: Viewport): string[] {
  if (![viewport.left, viewport.top, viewport.width, viewport.height].every(Number.isInteger)) {
    throw new Error("viewport coordinates must be integers");
  }
  if (viewport.width < 0 || viewport.height < 0) throw new Error("viewport dimensions cannot be negative");
  return rows
    .slice(Math.max(0, viewport.top), Math.max(0, viewport.top) + viewport.height)
    .map((row) => row.slice(Math.max(0, viewport.left), Math.max(0, viewport.left) + viewport.width));
}

export function padViewport(rows: readonly string[], viewport: Viewport, fill = " "): string[] {
  if (fill.length !== 1) throw new Error("fill must contain one character");
  const clipped = clipGrid(rows, viewport);
  return Array.from({ length: viewport.height }, (_, index) => {
    const row = clipped[index] ?? "";
    return row.slice(0, viewport.width).padEnd(viewport.width, fill);
  });
}

export function viewportContains(viewport: Viewport, x: number, y: number): boolean {
  return x >= viewport.left && y >= viewport.top && x < viewport.left + viewport.width && y < viewport.top + viewport.height;
}
