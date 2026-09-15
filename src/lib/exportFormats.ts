export type ExportFormat = "plain" | "markdown" | "html";

/** Formats generated art for downloads and copy-to-clipboard actions. */
export function exportAscii(art: string, format: ExportFormat, title = "ASCII Art"): string {
  const normalized = art.replace(/\r\n/g, "\n").trimEnd();
  if (format === "plain") return `${normalized}\n`;
  if (format === "markdown") return `# ${title}\n\n\`\`\`text\n${normalized}\n\`\`\`\n`;
  const escaped = normalized.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<!doctype html><meta charset="utf-8"><title>${title}</title><pre>${escaped}</pre>`;
}
