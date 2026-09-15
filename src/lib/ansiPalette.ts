export type PaletteName = "cyan" | "violet" | "amber" | "rose";

const COLORS: Record<PaletteName, string[]> = {
  cyan: ["36", "96"],
  violet: ["35", "95"],
  amber: ["33", "93"],
  rose: ["31", "91"],
};

export function colorizeLines(art: string, palette: PaletteName, bold = false): string {
  const [base, highlight] = COLORS[palette];
  const weight = bold ? "1;" : "";
  return art
    .split("\n")
    .map((line, index) => `\x1b[${weight}${index % 2 ? highlight : base}m${line}\x1b[0m`)
    .join("\n");
}
