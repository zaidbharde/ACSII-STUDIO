export interface ArtChange {
  line: number;
  before: string;
  after: string;
}

export function diffAscii(before: string, after: string): ArtChange[] {
  const oldLines = before.replace(/\r\n/g, "\n").split("\n");
  const newLines = after.replace(/\r\n/g, "\n").split("\n");
  const length = Math.max(oldLines.length, newLines.length);
  const changes: ArtChange[] = [];
  for (let index = 0; index < length; index += 1) {
    const previous = oldLines[index] ?? "";
    const next = newLines[index] ?? "";
    if (previous !== next) changes.push({ line: index + 1, before: previous, after: next });
  }
  return changes;
}
