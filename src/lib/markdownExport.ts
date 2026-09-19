export interface ExportOptions {
  title?: string;
  language?: string;
  includeMetadata?: boolean;
  metadata?: Record<string, string | number>;
}

const escapeCell = (line: string): string => line.replace(/```/g, "`​``");

export function toMarkdownDocument(lines: readonly string[], options: ExportOptions = {}): string {
  const title = options.title?.trim() || "ASCII Artwork";
  const language = options.language?.trim() || "text";
  const body = lines.map(escapeCell).join("\n");
  const sections = [`# ${title}`];

  if (options.includeMetadata && options.metadata) {
    const entries = Object.entries(options.metadata);
    if (entries.length > 0) {
      sections.push("", "## Metadata", ...entries.map(([key, value]) => `- **${key}:** ${value}`));
    }
  }

  sections.push("", `\`\`\`${language}`, body, "\`\`\`");
  return `${sections.join("\n")}\n`;
}

export function downloadName(title: string, extension = "md"): string {
  const safeTitle = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${safeTitle || "ascii-art"}.${extension.replace(/^\./, "")}`;
}
