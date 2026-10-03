export type SortComparator<T> = (left: T, right: T) => number;

/** Sorts a copy while preserving input order for equal elements. */
export function stableSort<T>(items: readonly T[], compare: SortComparator<T>): T[] {
  return items
    .map((value, index) => ({ value, index }))
    .sort((left, right) => {
      const order = compare(left.value, right.value);
      return order === 0 ? left.index - right.index : order;
    })
    .map(({ value }) => value);
}

export function compareNumbers(left: number, right: number): number {
  return left - right;
}

export function compareStrings(left: string, right: string): number {
  return left.localeCompare(right, undefined, { sensitivity: "base" });
}
