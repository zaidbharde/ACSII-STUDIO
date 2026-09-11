const ANSI_ESCAPE = /\u001B\[[0-?]*[ -/]*[@-~]/g;

export interface WidthMetrics {
  visible: number;
  control: number;
  graphemes: number;
}

/** Measures terminal text without counting ANSI styling bytes as visible content. */
export function measureAnsiText(value: string): WidthMetrics {
  let control = 0;
  const visibleText = value.replace(ANSI_ESCAPE, (sequence) => {
    control += sequence.length;
    return '';
  });
  const graphemes = [...visibleText].length;
  return { visible: graphemes, control, graphemes };
}

export function stripAnsi(value: string): string {
  return value.replace(ANSI_ESCAPE, '');
}
