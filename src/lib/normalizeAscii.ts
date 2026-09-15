export interface NormalizeOptions {
  trimTrailingWhitespace?: boolean;
  preserveBlankLines?: boolean;
}

export function normalizeAscii(art: string, options: NormalizeOptions = {}): string {
  const { trimTrailingWhitespace = true, preserveBlankLines = true } = options;
  let lines = art.replace(/\r\n/g, "\n").split("\n");
  if (trimTrailingWhitespace) lines = lines.map((line) => line.replace(/[ \t]+$/g, ""));
  if (!preserveBlankLines) {
    while (lines[0] === "") lines.shift();
    while (lines.at(-1) === "") lines.pop();
  }
  const leftPadding = lines.filter(Boolean).reduce((min, line) => {
    const padding = line.match(/^\s*/)?.[0].length ?? 0;
    return Math.min(min, padding);
  }, Number.POSITIVE_INFINITY);
  return Number.isFinite(leftPadding)
    ? lines.map((line) => line.slice(leftPadding)).join("\n")
    : lines.join("\n");
}
