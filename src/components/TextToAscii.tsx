import { useState, useEffect } from "react";
import { textToAscii, createBorder, type FontStyle, type BorderStyle } from "../lib/asciiEngine";

interface Props {
  onGenerate: (art: string) => void;
}

const FILL_CHARS = [
  { label: "Letter", value: "" },
  { label: "Hash #", value: "#" },
  { label: "Star *", value: "*" },
  { label: "At @", value: "@" },
  { label: "Block █", value: "█" },
  { label: "Dot •", value: "•" },
  { label: "Dollar $", value: "$" },
  { label: "Percent %", value: "%" },
];

export default function TextToAscii({ onGenerate }: Props) {
  const [text, setText] = useState("HELLO");
  const [font, setFont] = useState<FontStyle>("standard");
  const [fillChar, setFillChar] = useState("");
  const [addBorder, setAddBorder] = useState(false);
  const [borderStyle, setBorderStyle] = useState<BorderStyle>("rounded");

  useEffect(() => {
    if (!text.trim()) {
      onGenerate("");
      return;
    }
    let art = textToAscii(text, font, fillChar || undefined);
    if (addBorder) {
      art = createBorder(art, borderStyle);
    }
    onGenerate(art);
  }, [text, font, fillChar, addBorder, borderStyle, onGenerate]);

  return (
    <div className="space-y-5">
      {/* Text input */}
      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">
          Enter Text
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          maxLength={20}
          className="w-full bg-white/10 text-white border border-white/10 rounded-xl px-4 py-3 text-lg font-mono placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all"
        />
        <p className="text-white/30 text-xs mt-1 text-right">
          {text.length}/20 characters
        </p>
      </div>

      {/* Font selection */}
      <div>
        <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
          Font Style
        </label>
        <div className="grid grid-cols-5 gap-2">
          {(
            [
              { key: "standard", icon: "Aa", label: "Standard" },
              { key: "banner", icon: "╔═╗", label: "Banner" },
              { key: "block", icon: "[A]", label: "Block" },
              { key: "shadow", icon: "A░", label: "Shadow" },
              { key: "3d", icon: "A/", label: "3D" },
            ] as const
          ).map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setFont(key)}
              className={`py-2.5 px-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                font === key
                  ? "bg-violet-500/30 text-violet-300 border border-violet-400/50 shadow-lg shadow-violet-500/10"
                  : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70"
              }`}
            >
              <div className="font-mono text-base mb-0.5">{icon}</div>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Fill character */}
      {font === "standard" && (
        <div>
          <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
            Fill Character
          </label>
          <div className="flex flex-wrap gap-2">
            {FILL_CHARS.map(({ label, value }) => (
              <button
                key={label}
                onClick={() => setFillChar(value)}
                className={`py-1.5 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                  fillChar === value
                    ? "bg-violet-500/30 text-violet-300 border border-violet-400/50"
                    : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Border option */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={addBorder}
              onChange={(e) => setAddBorder(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-white/10 rounded-full peer-checked:bg-violet-500 transition-colors" />
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
          </div>
          <span className="text-white/70 text-sm group-hover:text-white/90 transition-colors">
            Add border
          </span>
        </label>

        {addBorder && (
          <div className="flex flex-wrap gap-2 ml-11">
            {(
              [
                { key: "single", label: "Single ┌─┐" },
                { key: "double", label: "Double ╔═╗" },
                { key: "rounded", label: "Rounded ╭─╮" },
                { key: "thick", label: "Thick ┏━┓" },
                { key: "ascii", label: "ASCII +-+" },
                { key: "stars", label: "Stars ***" },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setBorderStyle(key)}
                className={`py-1.5 px-3 rounded-lg text-xs font-mono transition-all duration-200 ${
                  borderStyle === key
                    ? "bg-violet-500/30 text-violet-300 border border-violet-400/50"
                    : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
