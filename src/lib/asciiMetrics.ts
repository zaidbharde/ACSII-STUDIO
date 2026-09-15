export interface AsciiMetrics {
  lines: number;
  columns: number;
  visibleCharacters: number;
  density: number;
}

export function measureAscii(art: string): AsciiMetrics {
  const lines = art.split(/\r?\n/);
  const columns = lines.reduce((widest, line) => Math.max(widest, [...line].length), 0);
  const visibleCharacters = lines.reduce(
    (total, line) => total + [...line].filter((char) => !/\s/.test(char)).length,
    0,
  );
  const capacity = Math.max(lines.length * columns, 1);
  return { lines: lines.length, columns, visibleCharacters, density: visibleCharacters / capacity };
}
