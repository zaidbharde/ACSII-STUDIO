import { useState, useRef, useEffect } from "react";

interface Props {
  art: string;
  accentColor: string;
}

export default function AsciiPreview({ art, accentColor }: Props) {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(10);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    // Auto-fit font size based on content width
    if (preRef.current && art) {
      const lines = art.split("\n");
      const maxLineLen = Math.max(...lines.map((l) => l.length));
      const containerWidth = preRef.current.parentElement?.clientWidth || 600;
      const estimatedCharWidth = 0.6; // Approximate character width ratio for monospace
      const idealFontSize = Math.min(
        14,
        Math.max(4, (containerWidth - 40) / (maxLineLen * estimatedCharWidth))
      );
      setFontSize(Math.round(idealFontSize * 10) / 10);
    }
  }, [art]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(art);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = art;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([art], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ascii-art.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ASCII Art</title>
<style>
body { background: #0a0a0a; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
pre { color: #e0e0e0; font-family: 'Courier New', monospace; font-size: 10px; line-height: 1.1; }
</style>
</head>
<body>
<pre>${art.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ascii-art.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!art) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white/30">
        <div className="text-6xl mb-4">✨</div>
        <p className="text-lg font-medium">Your ASCII art will appear here</p>
        <p className="text-sm mt-1">Configure options on the left and generate</p>
      </div>
    );
  }

  const lineCount = art.split("\n").length;
  const charCount = art.length;

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="text-white/40 text-xs font-mono">
            {lineCount} lines • {charCount} chars
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFontSize(Math.max(3, fontSize - 1))}
              className="w-6 h-6 rounded bg-white/10 text-white/60 hover:bg-white/20 hover:text-white text-xs transition-colors flex items-center justify-center"
            >
              −
            </button>
            <span className="text-white/50 text-xs font-mono w-8 text-center">
              {fontSize}px
            </span>
            <button
              onClick={() => setFontSize(Math.min(20, fontSize + 1))}
              className="w-6 h-6 rounded bg-white/10 text-white/60 hover:bg-white/20 hover:text-white text-xs transition-colors flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              copied
                ? "bg-green-500/30 text-green-300 border border-green-400/50"
                : `bg-white/10 text-white/70 border border-white/10 hover:bg-white/20 hover:text-white`
            }`}
          >
            {copied ? "✓ Copied!" : "📋 Copy"}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white/70 border border-white/10 hover:bg-white/20 hover:text-white transition-all"
          >
            💾 .txt
          </button>
          <button
            onClick={handleDownloadHTML}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white/70 border border-white/10 hover:bg-white/20 hover:text-white transition-all"
          >
            🌐 .html
          </button>
        </div>
      </div>

      {/* Preview */}
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10"
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)`,
        }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-white/30 text-xs font-mono ml-2">
            ascii-art-output
          </span>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[500px] p-4 scrollbar-thin">
          <pre
            key={art ? art.slice(0, 50) : "empty"}
            ref={preRef}
            className="leading-tight preview-in"
            style={{
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              fontSize: `${fontSize}px`,
              lineHeight: "1.15",
              color: accentColor,
              whiteSpace: "pre",
              tabSize: 4,
            }}
          >
            {art}
          </pre>
        </div>
      </div>
    </div>
  );
}
