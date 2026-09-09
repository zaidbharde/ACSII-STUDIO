export interface CommandToken {
  value: string;
  quoted: boolean;
  start: number;
  end: number;
}

export function tokenizeCommand(input: string): CommandToken[] {
  const tokens: CommandToken[] = [];
  let cursor = 0;
  while (cursor < input.length) {
    while (/\s/.test(input[cursor] ?? '')) cursor += 1;
    if (cursor >= input.length) break;
    const start = cursor;
    const quote = input[cursor] === '"' || input[cursor] === "'" ? input[cursor++] : null;
    let value = '';
    while (cursor < input.length) {
      if (quote && input[cursor] === quote) { cursor += 1; break; }
      if (!quote && /\s/.test(input[cursor])) break;
      if (input[cursor] === '\\' && cursor + 1 < input.length) cursor += 1;
      value += input[cursor++];
    }
    tokens.push({ value, quoted: quote !== null, start, end: cursor });
  }
  return tokens;
}

export function commandArguments(input: string): string[] {
  return tokenizeCommand(input).map((token) => token.value);
}
