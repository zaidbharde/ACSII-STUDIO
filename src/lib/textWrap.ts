export interface WrappedText {
  lines: string[];
  truncated: boolean;
}

export function wrapText(text: string, width: number, maxLines = Number.POSITIVE_INFINITY): WrappedText {
  if (width < 1) throw new RangeError("width must be positive");
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (word.length > width) {
      if (current) lines.push(current), (current = "");
      for (let index = 0; index < word.length; index += width) lines.push(word.slice(index, index + width));
    } else if ((current ? current.length + 1 : 0) + word.length <= width) {
      current = current ? `${current} ${word}` : word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  const truncated = lines.length > maxLines;
  return { lines: truncated ? lines.slice(0, maxLines) : lines, truncated };
}
