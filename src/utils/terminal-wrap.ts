import { measureAnsiText, stripAnsi } from './ansi-width';

export interface WrapOptions {
  width: number;
  preserveWords?: boolean;
}

/** Wraps display text to a terminal width while keeping long tokens usable. */
export function wrapTerminalText(value: string, options: WrapOptions): string[] {
  if (!Number.isInteger(options.width) || options.width < 1) throw new RangeError('Width must be positive');
  const preserveWords = options.preserveWords ?? true;
  const lines: string[] = [];
  let current = '';
  for (const token of value.split(/(\s+)/)) {
    const candidate = current + token;
    if (measureAnsiText(candidate).visible <= options.width) {
      current = candidate;
      continue;
    }
    if (current.trim()) lines.push(current.trimEnd());
    current = token.trimStart();
    if (!preserveWords && measureAnsiText(current).visible > options.width) {
      const plain = stripAnsi(current);
      for (let offset = 0; offset < plain.length; offset += options.width) lines.push(plain.slice(offset, offset + options.width));
      current = '';
    }
  }
  if (current.trim()) lines.push(current.trimEnd());
  return lines.length ? lines : [''];
}
