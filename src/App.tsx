import { useState, useCallback, useRef, useEffect } from "react";
import ImageToAscii from "./components/ImageToAscii";
import TextToAscii from "./components/TextToAscii";
import ShapeGenerator from "./components/ShapeGenerator";
import PatternGenerator from "./components/PatternGenerator";
import AsciiPreview from "./components/AsciiPreview";

type TabId = "image" | "text" | "shapes" | "patterns";

const TABS: { id: TabId; icon: string; label: string; color: string; accent: string }[] = [
  { id: "image", icon: "🖼️", label: "Image", color: "emerald", accent: "#6ee7b7" },
  { id: "text", icon: "✍️", label: "Text", color: "violet", accent: "#c4b5fd" },
  { id: "shapes", icon: "⬡", label: "Shapes", color: "amber", accent: "#fcd34d" },
  { id: "patterns", icon: "🔲", label: "Patterns", color: "rose", accent: "#fda4af" },
];

const COLOR_CLASSES: Record<string, { active: string; hover: string }> = {
  emerald: {
    active: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-emerald-500/20",
    hover: "hover:bg-emerald-500/10 hover:text-emerald-300/80",
  },
  violet: {
    active: "bg-violet-500/20 text-violet-300 border-violet-400/50 shadow-violet-500/20",
    hover: "hover:bg-violet-500/10 hover:text-violet-300/80",
  },
  amber: {
    active: "bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-amber-500/20",
    hover: "hover:bg-amber-500/10 hover:text-amber-300/80",
  },
  rose: {
    active: "bg-rose-500/20 text-rose-300 border-rose-400/50 shadow-rose-500/20",
    hover: "hover:bg-rose-500/10 hover:text-rose-300/80",
  },
};

const GALLERY = [
  {
    name: "Cat",
    art: `  /\\_/\\  
 ( o.o ) 
  > ^ <  
 /|   |\\
(_|   |_)`,
  },
  {
    name: "Coffee",
    art: `    ( (
     ) )
  ._______.
  |       |]
  \\       /
   \`-----'`,
  },
  {
    name: "Robot",
    art: ` ╔═══════╗
 ║ ■   ■ ║
 ║   ▼   ║
 ║ ╰───╯ ║
 ╠═══════╣
 ║ ║   ║ ║
 ║ ║   ║ ║
 ╚═╩═══╩═╝`,
  },
  {
    name: "Rocket",
    art: `    /\\
   /  \\
  / .. \\
  |    |
  | [] |
 /|    |\\
/ |    | \\
  | /\\ |
  |/  \\|
   \\  /
    \\/
   /|\\
  / | \\`,
  },
  {
    name: "Tree",
    art: `      *
     /|\\
    / | \\
   /  |  \\
  /   |   \\
 /____|____\\
      |
      |
   ___|___`,
  },
  {
    name: "Music",
    art: `  ♪ ♫ ♪
  ╔═══╗
  ║   ║♬
  ║   ║
  ║   ║
  ╚═══╝
  ♫ ♪ ♫`,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("text");
  const [asciiArt, setAsciiArt] = useState("");
  const [showGallery, setShowGallery] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const id = showGallery ? "gallery" : activeTab;
    const btn = tabRefs.current[id];
    if (btn && tabBarRef.current) {
      const bar = tabBarRef.current.getBoundingClientRect();
      const b = btn.getBoundingClientRect();
      setIndicator({ left: b.left - bar.left, width: b.width });
    }
  }, [activeTab, showGallery]);

  const handleGenerate = useCallback((art: string) => {
    setAsciiArt(art);
    setPreviewKey((k) => k + 1);
  }, []);

  const activeTabData = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="animated-bg min-h-screen text-white relative overflow-hidden">
      {/* Background floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
            animation: "floatOrb1 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
            animation: "floatOrb2 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            animation: "floatOrb1 18s ease-in-out infinite reverse",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="logo-glow w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <span className="text-2xl">⌨</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0a0a0f] animate-pulse" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent tracking-tight">
                ASCII Art Studio
              </h1>
              <p className="text-white/40 text-xs sm:text-sm font-medium -mt-0.5">
                Create • Convert • Export
              </p>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div
            ref={tabBarRef}
            className="relative inline-flex bg-white/[0.04] rounded-2xl p-1 border border-white/[0.06] backdrop-blur-sm"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const colorClass = COLOR_CLASSES[tab.color];
              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[tab.id] = el; }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium z-10 ${
                    isActive
                      ? `${colorClass.active} shadow-lg`
                      : `text-white/40 ${colorClass.hover}`
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}

            <div className="w-px bg-white/[0.06] mx-0.5" />

            <button
              ref={(el) => { tabRefs.current["gallery"] = el; }}
              onClick={() => setShowGallery(!showGallery)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium z-10 ${
                showGallery
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                  : "text-white/40 hover:bg-cyan-500/10 hover:text-cyan-300/80"
              }`}
            >
              <span className="text-base">🎨</span>
              <span className="hidden sm:inline">Gallery</span>
            </button>

            {/* Sliding underline indicator */}
            {(indicator.width > 0) && (
              <div
                className="tab-indicator"
                style={{ left: indicator.left, width: indicator.width }}
              />
            )}
          </div>
        </div>

        {/* Gallery */}
        {showGallery && (
          <div className="mb-8 animate-in">
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-white/70 text-sm font-semibold mb-4 uppercase tracking-wider flex items-center gap-2">
                <span>🎨</span> Pre-made Art Gallery
                <span className="text-white/30 text-xs font-normal ml-1">Click to use</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {GALLERY.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setAsciiArt(item.art);
                      setShowGallery(false);
                      setPreviewKey((k) => k + 1);
                    }}
                    className="group bg-black/40 rounded-xl border border-white/10 p-3 hover:border-cyan-400/40 hover:bg-cyan-500/5 transition-all duration-300"
                  >
                    <pre
                      className="text-cyan-300/70 group-hover:text-cyan-300 transition-colors overflow-hidden"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "5px",
                        lineHeight: "6px",
                        maxHeight: "60px",
                      }}
                    >
                      {item.art}
                    </pre>
                    <p className="text-white/50 text-xs mt-2 font-medium group-hover:text-white/70">
                      {item.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="glass-card rounded-2xl p-5 sm:p-6 sticky top-6">
              <h2 className="text-white/80 text-sm font-semibold mb-5 uppercase tracking-wider flex items-center gap-2">
                <span>{activeTabData.icon}</span>
                {activeTabData.label} Settings
              </h2>

              {activeTab === "image" && (
                <ImageToAscii onGenerate={handleGenerate} />
              )}
              {activeTab === "text" && (
                <TextToAscii onGenerate={handleGenerate} />
              )}
              {activeTab === "shapes" && (
                <ShapeGenerator onGenerate={handleGenerate} />
              )}
              {activeTab === "patterns" && (
                <PatternGenerator onGenerate={handleGenerate} />
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <h2 className="text-white/80 text-sm font-semibold mb-4 uppercase tracking-wider flex items-center gap-2">
                <span>📺</span> Preview
              </h2>
              <AsciiPreview key={previewKey} art={asciiArt} accentColor={activeTabData.accent} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 sm:mt-12 pb-4">
          <div className="inline-flex items-center gap-3 text-white/20 text-xs">
            <span className="font-mono">ASCII Art Studio</span>
            <span>•</span>
            <span>Made with ♥ and monospace fonts</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
