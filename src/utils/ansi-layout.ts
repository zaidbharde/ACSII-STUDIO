export interface LayoutCell { text: string; visibleWidth: number; }

export function stripAnsi(value: string): string {
  return value.replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, '');
}

export function visibleWidth(value: string): number {
  return [...stripAnsi(value)].length;
}

export function padVisible(value: string, width: number, alignment: 'left' | 'right' | 'center' = 'left'): string {
  const padding = Math.max(0, width - visibleWidth(value));
  if (alignment === 'right') return ' '.repeat(padding) + value;
  if (alignment === 'center') {
    const left = Math.floor(padding / 2);
    return ' '.repeat(left) + value + ' '.repeat(padding - left);
  }
  return value + ' '.repeat(padding);
}

export function wrapVisible(value: string, width: number): string[] {
  if (!Number.isInteger(width) || width < 1) throw new Error('width must be positive');
  const words = stripAnsi(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > width && current) { lines.push(current); current = word; }
    else current = candidate;
  }
  if (current) lines.push(current);
  return lines;
}
