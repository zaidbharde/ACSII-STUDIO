# ASCII Art Studio

> A premium, futuristic web-based ASCII art generator. Create, convert, and export ASCII art from images, text, shapes, and patterns.

![screenshot](https://img.shields.io/badge/status-active-success)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6)
![Vite](https://img.shields.io/badge/Vite-7-646CFF)

---

## Features

| Feature | Description |
|---------|-------------|
| **Image → ASCII** | Upload any image and convert to ASCII with customizable character sets (standard, detailed, braille, blocks, and more) |
| **Text → ASCII** | Transform text into ASCII art with 5 font styles: Standard, Banner, Block, Shadow, 3D |
| **Shape Generator** | Generate geometric ASCII shapes — triangle, square, diamond, circle, heart, star, spiral, wave, pyramid |
| **Pattern Generator** | Create ASCII patterns — checkerboard, stripes, dots, zigzag, bricks |
| **Export** | Download as `.txt`, `.html`, or `.png` |
| **Color Mode** | Preserve original image colors in the ASCII output |
| **Gallery** | Curated collection of pre-made ASCII art |
| **Live Preview** | Instant preview with adjustable font size |
| **Auto-persist** | Your last creation is saved locally |

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
```

Output is a standalone single-file `dist/index.html`.

## Tech Stack

- **React 19** — UI framework
- **TypeScript 5.9** — Type safety
- **Vite 7** — Build tool
- **Tailwind CSS v4** — Utility-first styling
- **Glassmorphism** — Frosted glass UI aesthetic
- **vite-plugin-singlefile** — Everything inlines into one HTML file

## Project Structure

```
src/
├── lib/
│   └── asciiEngine.ts      # Core ASCII generation logic
├── components/
│   ├── AsciiPreview.tsx     # Preview panel with export options
│   ├── ImageToAscii.tsx     # Image upload and conversion controls
│   ├── TextToAscii.tsx      # Text input and font styling
│   ├── ShapeGenerator.tsx   # Shape selection and configuration
│   └── PatternGenerator.tsx # Pattern selection and sizing
├── App.tsx                  # Main app with tabs, gallery, layout
├── index.css                # Global styles and animations
└── main.tsx                 # Entry point
```

## Screenshots

> *Coming soon*

---

Built with monospace fonts and a lot of `█▓▒░`.
