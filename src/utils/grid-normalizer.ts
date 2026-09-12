export type AsciiGrid = string[];

export interface GridOptions {
  width?: number;
  padCharacter?: string;
  trimTrailing?: boolean;
}

/** Normalize rows into a rectangular grid without mutating the input. */
export function normalizeGrid(rows: AsciiGrid, options: GridOptions = {}): AsciiGrid {
  const pad = options.padCharacter ?? " ";
  if (pad.length !== 1) {
    throw new Error("padCharacter must contain exactly one character");
  }

  const cleaned = rows.map((row) => options.trimTrailing === false ? row : row.replace(/\s+$/u, ""));
  const inferredWidth = cleaned.reduce((largest, row) => Math.max(largest, row.length), 0);
  const width = options.width ?? inferredWidth;
  if (!Number.isInteger(width) || width < 0) {
    throw new Error("width must be a non-negative integer");
  }

  return cleaned.map((row) => {
    if (row.length > width) return row.slice(0, width);
    return row + pad.repeat(width - row.length);
  });
}

export function gridSize(grid: AsciiGrid): { width: number; height: number } {
  return {
    width: grid.reduce((largest, row) => Math.max(largest, row.length), 0),
    height: grid.length,
  };
}

export function joinGrid(grid: AsciiGrid, separator = "\n"): string {
  return grid.join(separator);
}

export function splitGrid(text: string): AsciiGrid {
  return text.replace(/\r\n/gu, "\n").split("\n");
}
