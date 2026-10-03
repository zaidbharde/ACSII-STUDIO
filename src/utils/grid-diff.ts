export interface GridChange<T> {
  row: number;
  column: number;
  before: T | undefined;
  after: T | undefined;
}

export function diffGrid<T>(
  before: readonly (readonly T[])[],
  after: readonly (readonly T[])[],
): GridChange<T>[] {
  const height = Math.max(before.length, after.length);
  const changes: GridChange<T>[] = [];

  for (let row = 0; row < height; row += 1) {
    const oldRow = before[row] ?? [];
    const newRow = after[row] ?? [];
    const width = Math.max(oldRow.length, newRow.length);
    for (let column = 0; column < width; column += 1) {
      const oldValue = oldRow[column];
      const newValue = newRow[column];
      if (!Object.is(oldValue, newValue)) {
        changes.push({ row, column, before: oldValue, after: newValue });
      }
    }
  }
  return changes;
}

export function changedCellCount<T>(
  before: readonly (readonly T[])[],
  after: readonly (readonly T[])[],
): number {
  return diffGrid(before, after).length;
}
