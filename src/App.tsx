import { useState, useCallback } from "react";
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

// Gallery of pre-made ASCII art
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

  const handleGenerate = useCallback((art: string) => {
    setAsciiArt(art);
  }, []);

  const activeTabData = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/3 rounded-full blur-[120px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
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
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
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
          <div className="inline-flex bg-white/5 rounded-2xl p-1.5 border border-white/10 backdrop-blur-sm">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const colorClass = COLOR_CLASSES[tab.color];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                    isActive
                      ? `${colorClass.active} shadow-lg`
                      : `border-transparent text-white/40 ${colorClass.hover}`
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}

            <div className="w-px bg-white/10 mx-1" />

            <button
              onClick={() => setShowGallery(!showGallery)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                showGallery
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                  : "border-transparent text-white/40 hover:bg-cyan-500/10 hover:text-cyan-300/80"
              }`}
            >
              <span className="text-base">🎨</span>
              <span className="hidden sm:inline">Gallery</span>
            </button>
          </div>
        </div>

        {/* Gallery */}
        {showGallery && (
          <div className="mb-8 animate-in">
            <div className="bg-white/[0.03] rounded-2xl border border-white/10 p-5 backdrop-blur-sm">
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
            <div className="bg-white/[0.03] rounded-2xl border border-white/10 p-5 sm:p-6 backdrop-blur-sm sticky top-6">
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
            <div className="bg-white/[0.03] rounded-2xl border border-white/10 p-5 sm:p-6 backdrop-blur-sm">
              <h2 className="text-white/80 text-sm font-semibold mb-4 uppercase tracking-wider flex items-center gap-2">
                <span>📺</span> Preview
              </h2>
              <AsciiPreview art={asciiArt} accentColor={activeTabData.accent} />
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
