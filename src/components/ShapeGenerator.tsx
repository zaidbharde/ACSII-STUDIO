import { useState, useEffect } from "react";
import { createShape, type ShapeType } from "../lib/asciiEngine";

interface Props {
  onGenerate: (art: string) => void;
}

const SHAPES: { key: ShapeType; icon: string; label: string }[] = [
  { key: "triangle", icon: "△", label: "Triangle" },
  { key: "square", icon: "□", label: "Square" },
  { key: "diamond", icon: "◇", label: "Diamond" },
  { key: "circle", icon: "○", label: "Circle" },
  { key: "heart", icon: "♥", label: "Heart" },
  { key: "star", icon: "★", label: "Star" },
  { key: "spiral", icon: "🌀", label: "Spiral" },
  { key: "wave", icon: "〰", label: "Wave" },
  { key: "pyramid", icon: "▲", label: "Pyramid" },
];

const FILL_OPTIONS = [
  { label: "*", value: "*" },
  { label: "#", value: "#" },
  { label: "@", value: "@" },
  { label: "█", value: "█" },
  { label: "•", value: "•" },
  { label: "♦", value: "♦" },
  { label: "◆", value: "◆" },
  { label: "○", value: "○" },
];

export default function ShapeGenerator({ onGenerate }: Props) {
  const [shape, setShape] = useState<ShapeType>("heart");
  const [size, setSize] = useState(8);
  const [fillChar, setFillChar] = useState("*");

  useEffect(() => {
    const art = createShape(shape, size, fillChar);
    onGenerate(art);
  }, [shape, size, fillChar, onGenerate]);

  return (
    <div className="space-y-5">
      {/* Shape selection */}
      <div>
        <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
          Shape
        </label>
        <div className="grid grid-cols-3 gap-2">
          {SHAPES.map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setShape(key)}
              className={`py-3 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                shape === key
                  ? "bg-amber-500/30 text-amber-300 border border-amber-400/50 shadow-lg shadow-amber-500/10"
                  : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70"
              }`}
            >
              <span className="text-xl block mb-1">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Size slider */}
      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">
          Size
        </label>
        <input
          type="range"
          min={3}
          max={15}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full accent-amber-400"
        />
        <div className="text-right text-amber-400 text-sm font-mono">
          {size}
        </div>
      </div>

      {/* Fill character */}
      <div>
        <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
          Fill Character
        </label>
        <div className="flex flex-wrap gap-2">
          {FILL_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFillChar(value)}
              className={`w-10 h-10 rounded-xl text-lg font-mono transition-all duration-200 ${
                fillChar === value
                  ? "bg-amber-500/30 text-amber-300 border border-amber-400/50"
                  : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
