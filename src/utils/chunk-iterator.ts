export function* chunk<T>(
  values: Iterable<T>,
  size: number,
): Generator<readonly T[], void, undefined> {
  if (!Number.isInteger(size) || size < 1) {
    throw new RangeError("chunk size must be a positive integer");
  }

  let current: T[] = [];
  for (const value of values) {
    current.push(value);
    if (current.length === size) {
      yield current;
      current = [];
    }
  }
  if (current.length > 0) {
    yield current;
  }
}

export function collectChunks<T>(values: Iterable<T>, size: number): T[][] {
  return Array.from(chunk(values, size), (part) => [...part]);
}
