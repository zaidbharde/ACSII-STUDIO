export interface Run<T> {
  value: T;
  count: number;
}

export function encodeRuns<T>(values: readonly T[]): Run<T>[] {
  if (values.length === 0) return [];
  const runs: Run<T>[] = [{ value: values[0], count: 1 }];
  for (let index = 1; index < values.length; index += 1) {
    const current = runs[runs.length - 1];
    if (Object.is(current.value, values[index])) {
      current.count += 1;
    } else {
      runs.push({ value: values[index], count: 1 });
    }
  }
  return runs;
}

export function decodeRuns<T>(runs: readonly Run<T>[]): T[] {
  const values: T[] = [];
  for (const run of runs) {
    if (!Number.isInteger(run.count) || run.count < 0) {
      throw new Error("run counts must be non-negative integers");
    }
    for (let repeat = 0; repeat < run.count; repeat += 1) values.push(run.value);
  }
  return values;
}

export function compressionRatio<T>(values: readonly T[]): number {
  return values.length === 0 ? 1 : encodeRuns(values).length / values.length;
}
