const ANSI_SEQUENCE = /\u001B(?:\[[0-?]*[ -/]*[@-~]|\][^\u0007]*(?:\u0007|\u001B\\))/gu;

export interface VisibleText {
  text: string;
  columns: number;
  lines: number;
}

export function stripAnsi(input: string): string {
  return input.replace(ANSI_SEQUENCE, "");
}

export function measureVisibleText(input: string): VisibleText {
  const text = stripAnsi(input).replace(/\r\n/gu, "\n");
  const rows = text.split("\n");
  return {
    text,
    columns: rows.reduce((width, row) => Math.max(width, [...row].length), 0),
    lines: rows.length,
  };
}

export function padVisible(input: string, width: number, fill = " "): string {
  if ([...fill].length !== 1) throw new Error("fill must contain one character");
  const visible = measureVisibleText(input).columns;
  return visible >= width ? input : input + fill.repeat(width - visible);
}
