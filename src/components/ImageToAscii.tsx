import { useState, useRef, useCallback } from "react";
import { imageToAscii, CHAR_SETS } from "../lib/asciiEngine";

interface Props {
  onGenerate: (art: string) => void;
}

export default function ImageToAscii({ onGenerate }: Props) {
  const [width, setWidth] = useState(100);
  const [charSet, setCharSet] = useState("standard");
  const [invert, setInvert] = useState(false);
  const [colorMode, setColorMode] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [colorArt, setColorArt] = useState<
    { char: string; r: number; g: number; b: number }[][] | null
  >(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setPreview(e.target?.result as string);
          const canvas = canvasRef.current!;
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const result = imageToAscii(imageData, width, charSet, invert, colorMode);
          onGenerate(result.text);
          setColorArt(result.colorData || null);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    [width, charSet, invert, colorMode, onGenerate]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        processImage(file);
      }
    },
    [processImage]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processImage(file);
    },
    [processImage]
  );

  const regenerate = useCallback(() => {
    if (preview) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current!;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const result = imageToAscii(imageData, width, charSet, invert, colorMode);
        onGenerate(result.text);
        setColorArt(result.colorData || null);
      };
      img.src = preview;
    }
  }, [preview, width, charSet, invert, colorMode, onGenerate]);

  return (
    <div className="space-y-5">
      <canvas ref={canvasRef} className="hidden" />

      {/* Drop zone */}
      <div
        className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 cursor-pointer ${
          isDragging
            ? "border-emerald-400 bg-emerald-400/10 scale-[1.02]"
            : "border-white/20 hover:border-white/40 bg-white/5"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {preview ? (
          <div className="flex items-center gap-4">
            <img
              src={preview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-white/10"
            />
            <div className="text-left">
              <p className="text-white/80 text-sm font-medium">
                Image loaded
              </p>
              <p className="text-white/40 text-xs mt-1">
                Click or drop to replace
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-4xl mb-3">🖼️</div>
            <p className="text-white/70 font-medium">
              Drop an image here or click to upload
            </p>
            <p className="text-white/40 text-sm mt-1">
              Supports JPG, PNG, GIF, WebP
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">
            Width (characters)
          </label>
          <input
            type="range"
            min={30}
            max={200}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full accent-emerald-400"
          />
          <div className="text-right text-emerald-400 text-sm font-mono">
            {width}
          </div>
        </div>

        <div>
          <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">
            Character Set
          </label>
          <select
            value={charSet}
            onChange={(e) => setCharSet(e.target.value)}
            className="w-full bg-white/10 text-white border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
          >
            {Object.keys(CHAR_SETS).map((key) => (
              <option key={key} value={key} className="bg-gray-900">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={invert}
              onChange={(e) => setInvert(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-white/10 rounded-full peer-checked:bg-emerald-500 transition-colors" />
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
          </div>
          <span className="text-white/70 text-sm group-hover:text-white/90 transition-colors">
            Invert
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={colorMode}
              onChange={(e) => setColorMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-white/10 rounded-full peer-checked:bg-emerald-500 transition-colors" />
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
          </div>
          <span className="text-white/70 text-sm group-hover:text-white/90 transition-colors">
            Color mode
          </span>
        </label>
      </div>

      {preview && (
        <button
          onClick={regenerate}
          className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-[0.98]"
        >
          🔄 Regenerate
        </button>
      )}

      {/* Color preview */}
      {colorMode && colorArt && colorArt.length > 0 && (
        <div className="mt-4">
          <p className="text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
            Color Preview
          </p>
          <div
            className="bg-black rounded-xl p-3 overflow-auto max-h-64"
            style={{ fontFamily: "monospace", fontSize: "6px", lineHeight: "7px" }}
          >
            {colorArt.map((row, y) => (
              <div key={y} style={{ whiteSpace: "pre" }}>
                {row.map((cell, x) => (
                  <span
                    key={x}
                    style={{ color: `rgb(${cell.r},${cell.g},${cell.b})` }}
                  >
                    {cell.char}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
