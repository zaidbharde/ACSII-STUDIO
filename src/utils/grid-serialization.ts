import { joinGrid, splitGrid } from "./grid-normalizer";

const ESCAPES: Record<string, string> = { "\\": "\\\\", "\n": "\\n", "\r": "\\r" };
const UNESCAPE = /\\([\\nrt])/gu;

function escapeRow(row: string): string {
  return Array.from(row).map((character) => ESCAPES[character] ?? character).join("");
}

function unescapeRow(row: string): string {
  return row.replace(UNESCAPE, (_, token: string) => ({ n: "\n", r: "\r", t: "\t", "\\": "\\" }[token] ?? token));
}

export function serializeGrid(rows: readonly string[]): string {
  return joinGrid(rows.map(escapeRow), "\n");
}

export function deserializeGrid(serialized: string): string[] {
  return splitGrid(serialized).map(unescapeRow);
}

export function serializeWithMetadata(rows: readonly string[], name: string): string {
  const safeName = name.replace(/[\r\n]/gu, " ").trim() || "untitled";
  return JSON.stringify({ version: 1, name: safeName, grid: serializeGrid(rows) });
}

export function deserializeWithMetadata(serialized: string): { name: string; grid: string[] } {
  const parsed = JSON.parse(serialized) as { version?: number; name?: string; grid?: string };
  if (parsed.version !== 1 || typeof parsed.name !== "string" || typeof parsed.grid !== "string") {
    throw new Error("unsupported ASCII grid document");
  }
  return { name: parsed.name, grid: deserializeGrid(parsed.grid) };
}
