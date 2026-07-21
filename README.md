<div align="center">

# ASCII Art Studio

**A premium, futuristic web app for creating, converting, and exporting ASCII art** — from images, text, shapes, and patterns.

![status](https://img.shields.io/badge/status-active-success)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

</div>

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

| Feature | Description |
|---|---|
| 🖼️ **Image → ASCII** | Upload any image and convert it to ASCII with customizable character sets — standard, detailed, braille, blocks, and more |
| ✍️ **Text → ASCII** | Turn text into ASCII art with 5 font styles: Standard, Banner, Block, Shadow, 3D |
| 🔺 **Shape Generator** | Generate geometric ASCII shapes — triangle, square, diamond, circle, heart, star, spiral, wave, pyramid |
| 🧩 **Pattern Generator** | Create ASCII patterns — checkerboard, stripes, dots, zigzag, bricks |
| 🎨 **Color Mode** | Preserve the original image's colors in the ASCII output |
| 📤 **Export** | Download as `.txt`, `.html`, or `.png` |
| 🖼️ **Gallery** | Browse a curated collection of pre-made ASCII art |
| ⚡ **Live Preview** | Instant preview with adjustable font size |
| 💾 **Auto-persist** | Your last creation is saved locally, so nothing's lost on refresh |

## Quick Start

**Prerequisites:** Node.js 18+ and npm

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output is a standalone, single-file `dist/index.html` — no server or dependencies required to run it.

## Tech Stack

- **[React 19](https://react.dev)** — UI framework
- **[TypeScript 5.9](https://www.typescriptlang.org)** — Type safety
- **[Vite 7](https://vitejs.dev)** — Build tool
- **[Tailwind CSS v4](https://tailwindcss.com)** — Utility-first styling
- **Glassmorphism** — Frosted-glass UI aesthetic
- **[vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile)** — Inlines everything into one HTML file

## Project Structure

```
src/
├── lib/
│   └── asciiEngine.ts       # Core ASCII generation logic
├── components/
│   ├── AsciiPreview.tsx      # Preview panel with export options
│   ├── ImageToAscii.tsx      # Image upload and conversion controls
│   ├── TextToAscii.tsx       # Text input and font styling
│   ├── ShapeGenerator.tsx    # Shape selection and configuration
│   └── PatternGenerator.tsx  # Pattern selection and sizing
├── App.tsx                   # Main app with tabs, gallery, layout
├── index.css                 # Global styles and animations
└── main.tsx                  # Entry point
```

## Screenshots

> Coming soon — add screenshots or a demo GIF here once available.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for bug fixes, new features, or improvements.

## License

[MIT](LICENSE)

---

<div align="center">

Built with monospace fonts and a lot of `█▓▒░`

</div>
