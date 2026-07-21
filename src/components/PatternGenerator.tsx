import { useState, useEffect } from "react";
import { createPattern } from "../lib/asciiEngine";

interface Props {
  onGenerate: (art: string) => void;
}

const PATTERNS = [
  { key: "checkerboard", icon: "▓░", label: "Checkerboard" },
  { key: "stripes", icon: "═─", label: "Stripes" },
  { key: "dots", icon: "• •", label: "Dots" },
  { key: "zigzag", icon: "/\\", label: "Zigzag" },
  { key: "bricks", icon: "┤├", label: "Bricks" },
];

export default function PatternGenerator({ onGenerate }: Props) {
  const [pattern, setPattern] = useState("checkerboard");
  const [width, setWidth] = useState(40);
  const [height, setHeight] = useState(15);

  useEffect(() => {
    const art = createPattern(pattern, width, height);
    onGenerate(art);
  }, [pattern, width, height, onGenerate]);

  return (
    <div className="space-y-5">
      {/* Pattern selection */}
      <div>
        <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
          Pattern
        </label>
        <div className="grid grid-cols-5 gap-2">
          {PATTERNS.map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setPattern(key)}
              className={`py-3 px-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                pattern === key
                  ? "bg-rose-500/30 text-rose-300 border border-rose-400/50 shadow-lg shadow-rose-500/10"
                  : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70"
              }`}
            >
              <span className="text-sm font-mono block mb-1">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Width */}
      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">
          Width
        </label>
        <input
          type="range"
          min={10}
          max={80}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-full accent-rose-400"
        />
        <div className="text-right text-rose-400 text-sm font-mono">
          {width}
        </div>
      </div>

      {/* Height */}
      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">
          Height
        </label>
        <input
          type="range"
          min={5}
          max={30}
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full accent-rose-400"
        />
        <div className="text-right text-rose-400 text-sm font-mono">
          {height}
        </div>
      </div>
    </div>
  );
}
