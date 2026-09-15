export class HistoryStack<T> {
  private readonly entries: T[] = [];
  private cursor = -1;

  constructor(private readonly limit = 30) {}

  push(value: T): void {
    this.entries.splice(this.cursor + 1);
    this.entries.push(value);
    if (this.entries.length > this.limit) this.entries.shift();
    this.cursor = this.entries.length - 1;
  }

  undo(): T | undefined {
    if (this.cursor <= 0) return this.entries[0];
    return this.entries[--this.cursor];
  }

  redo(): T | undefined {
    if (this.cursor >= this.entries.length - 1) return this.entries[this.cursor];
    return this.entries[++this.cursor];
  }

  current(): T | undefined { return this.entries[this.cursor]; }
  get size(): number { return this.entries.length; }
}
