export interface SelectionRange {
  start: number;
  end: number;
}

export function clampSelection(range: SelectionRange, length: number): SelectionRange {
  const clamp = (value: number) => Math.min(Math.max(Math.floor(value), 0), length);
  const start = clamp(range.start);
  const end = clamp(range.end);
  return start <= end ? { start, end } : { start: end, end: start };
}

export function replaceSelection(text: string, range: SelectionRange, replacement: string): string {
  const safe = clampSelection(range, text.length);
  return `${text.slice(0, safe.start)}${replacement}${text.slice(safe.end)}`;
}
