export interface Glyph {
  name: string;
  symbol: string;
  category: "faces" | "nature" | "symbols";
  tags: string[];
}

export const GLYPHS: readonly Glyph[] = [
  { name: "happy", symbol: ":)", category: "faces", tags: ["smile", "friendly"] },
  { name: "flower", symbol: "✿", category: "nature", tags: ["garden", "spring"] },
  { name: "spark", symbol: "✦", category: "symbols", tags: ["star", "highlight"] },
  { name: "wave", symbol: "≈", category: "nature", tags: ["water", "motion"] },
];

export function searchGlyphs(query: string): Glyph[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [...GLYPHS];
  return GLYPHS.filter(({ name, tags }) => [name, ...tags].some((value) => value.includes(needle)));
}
