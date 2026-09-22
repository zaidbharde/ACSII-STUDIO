export type Cell = { row: number; column: number };

const DIRECTIONS: Cell[] = [
  { row: -1, column: 0 },
  { row: 1, column: 0 },
  { row: 0, column: -1 },
  { row: 0, column: 1 },
];

export function traceContour(grid: string[], start: Cell, marker = "#"): Cell[] {
  if (!grid[start.row]?.[start.column] || grid[start.row][start.column] !== marker) return [];
  const queue = [start];
  const visited = new Set<string>([`${start.row}:${start.column}`]);
  const contour: Cell[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    contour.push(current);
    for (const direction of DIRECTIONS) {
      const next = { row: current.row + direction.row, column: current.column + direction.column };
      const key = `${next.row}:${next.column}`;
      if (visited.has(key) || grid[next.row]?.[next.column] !== marker) continue;
      visited.add(key);
      queue.push(next);
    }
  }
  return contour;
}

export function contourBounds(cells: Cell[]): { top: number; left: number; bottom: number; right: number } | null {
  if (cells.length === 0) return null;
  return cells.reduce((bounds, cell) => ({
    top: Math.min(bounds.top, cell.row),
    left: Math.min(bounds.left, cell.column),
    bottom: Math.max(bounds.bottom, cell.row),
    right: Math.max(bounds.right, cell.column),
  }), { top: cells[0].row, left: cells[0].column, bottom: cells[0].row, right: cells[0].column });
}
