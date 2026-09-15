export type FrameStyle = "single" | "double" | "rounded";

const FRAMES: Record<FrameStyle, [string, string, string, string]> = {
  single: ["┌", "┐", "└", "┘"],
  double: ["╔", "╗", "╚", "╝"],
  rounded: ["╭", "╮", "╰", "╯"],
};

export function frameAscii(art: string, style: FrameStyle = "single", padding = 1): string {
  const lines = art.split(/\r?\n/);
  const width = Math.max(...lines.map((line) => [...line].length), 0);
  const [topLeft, topRight, bottomLeft, bottomRight] = FRAMES[style];
  const horizontal = "─".repeat(width + padding * 2);
  const body = lines.map((line) => `${" ".repeat(padding)}${line.padEnd(width)}${" ".repeat(padding)}`);
  return [
    `${topLeft}${horizontal}${topRight}`,
    ...body.map((line) => `│${line}│`),
    `${bottomLeft}${horizontal}${bottomRight}`,
  ].join("\n");
}
