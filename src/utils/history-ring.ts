export class HistoryRing<T> {
  private readonly entries: T[] = [];
  private cursor = -1;

  constructor(private readonly capacity: number) {
    if (!Number.isInteger(capacity) || capacity < 1) throw new Error('capacity must be positive');
  }

  push(value: T): void {
    if (this.entries.at(-1) !== value) this.entries.push(value);
    while (this.entries.length > this.capacity) this.entries.shift();
    this.cursor = this.entries.length;
  }

  previous(): T | undefined {
    if (!this.entries.length) return undefined;
    this.cursor = Math.max(0, this.cursor - 1);
    return this.entries[this.cursor];
  }

  next(): T | undefined {
    if (!this.entries.length) return undefined;
    this.cursor = Math.min(this.entries.length, this.cursor + 1);
    return this.entries[this.cursor];
  }

  values(): readonly T[] { return [...this.entries]; }
  get size(): number { return this.entries.length; }
  clear(): void { this.entries.length = 0; this.cursor = -1; }
}
