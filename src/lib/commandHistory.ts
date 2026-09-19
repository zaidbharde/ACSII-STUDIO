export interface HistoryEntry<T> {
  value: T;
  label: string;
}

export class CommandHistory<T> {
  private readonly undoStack: HistoryEntry<T>[] = [];
  private readonly redoStack: HistoryEntry<T>[] = [];

  constructor(private readonly capacity = 100) {
    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new Error("History capacity must be a positive integer");
    }
  }

  push(value: T, label: string): void {
    this.undoStack.push({ value, label });
    if (this.undoStack.length > this.capacity) this.undoStack.shift();
    this.redoStack.length = 0;
  }

  undo(current: T): T {
    const previous = this.undoStack.pop();
    if (!previous) return current;
    this.redoStack.push({ value: current, label: previous.label });
    return previous.value;
  }

  redo(current: T): T {
    const next = this.redoStack.pop();
    if (!next) return current;
    this.undoStack.push({ value: current, label: next.label });
    return next.value;
  }

  canUndo(): boolean { return this.undoStack.length > 0; }
  canRedo(): boolean { return this.redoStack.length > 0; }
  clear(): void { this.undoStack.length = 0; this.redoStack.length = 0; }
  get undoCount(): number { return this.undoStack.length; }
  get redoCount(): number { return this.redoStack.length; }
}
