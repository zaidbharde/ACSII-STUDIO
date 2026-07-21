// Character sets for ASCII art generation
export const CHAR_SETS: Record<string, string> = {
  standard: "@%#*+=-:. ",
  detailed: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
  simple: "@#*+=-:. ",
  blocks: "█▓▒░ ",
  minimal: "#. ",
  dots: "⣿⣷⣶⣦⣤⣀ ",
  braille: "⠿⠽⠻⠺⠹⠸⠰⠠⠀",
};

// Letter definitions for text-to-ASCII
const LETTERS: Record<string, string[]> = {
  A: ["  A  ", " A A ", "AAAAA", "A   A", "A   A"],
  B: ["BBBB ", "B   B", "BBBB ", "B   B", "BBBB "],
  C: [" CCC ", "C   C", "C    ", "C   C", " CCC "],
  D: ["DDDD ", "D   D", "D   D", "D   D", "DDDD "],
  E: ["EEEEE", "E    ", "EEEE ", "E    ", "EEEEE"],
  F: ["FFFFF", "F    ", "FFFF ", "F    ", "F    "],
  G: [" GGG ", "G    ", "G  GG", "G   G", " GGG "],
  H: ["H   H", "H   H", "HHHHH", "H   H", "H   H"],
  I: ["IIIII", "  I  ", "  I  ", "  I  ", "IIIII"],
  J: ["JJJJJ", "    J", "    J", "J   J", " JJJ "],
  K: ["K   K", "K  K ", "KKK  ", "K  K ", "K   K"],
  L: ["L    ", "L    ", "L    ", "L    ", "LLLLL"],
  M: ["M   M", "MM MM", "M M M", "M   M", "M   M"],
  N: ["N   N", "NN  N", "N N N", "N  NN", "N   N"],
  O: [" OOO ", "O   O", "O   O", "O   O", " OOO "],
  P: ["PPPP ", "P   P", "PPPP ", "P    ", "P    "],
  Q: [" QQQ ", "Q   Q", "Q   Q", "Q  Q ", " QQ Q"],
  R: ["RRRR ", "R   R", "RRRR ", "R  R ", "R   R"],
  S: [" SSSS", "S    ", " SSS ", "    S", "SSSS "],
  T: ["TTTTT", "  T  ", "  T  ", "  T  ", "  T  "],
  U: ["U   U", "U   U", "U   U", "U   U", " UUU "],
  V: ["V   V", "V   V", "V   V", " V V ", "  V  "],
  W: ["W   W", "W   W", "W W W", "WW WW", "W   W"],
  X: ["X   X", " X X ", "  X  ", " X X ", "X   X"],
  Y: ["Y   Y", " Y Y ", "  Y  ", "  Y  ", "  Y  "],
  Z: ["ZZZZZ", "   Z ", "  Z  ", " Z   ", "ZZZZZ"],
  "0": [" 000 ", "0   0", "0   0", "0   0", " 000 "],
  "1": ["  1  ", " 11  ", "  1  ", "  1  ", "11111"],
  "2": [" 222 ", "2   2", "   2 ", "  2  ", "22222"],
  "3": ["3333 ", "    3", " 333 ", "    3", "3333 "],
  "4": ["4   4", "4   4", "44444", "    4", "    4"],
  "5": ["55555", "5    ", "5555 ", "    5", "5555 "],
  "6": [" 666 ", "6    ", "6666 ", "6   6", " 666 "],
  "7": ["77777", "    7", "   7 ", "  7  ", " 7   "],
  "8": [" 888 ", "8   8", " 888 ", "8   8", " 888 "],
  "9": [" 999 ", "9   9", " 9999", "    9", " 999 "],
  "!": ["  !  ", "  !  ", "  !  ", "     ", "  !  "],
  "?": [" ??? ", "?   ?", "   ? ", "     ", "  ?  "],
  ".": ["     ", "     ", "     ", "     ", "  .  "],
  ",": ["     ", "     ", "     ", "  ,  ", " ,   "],
  "-": ["     ", "     ", "-----", "     ", "     "],
  "+": ["     ", "  +  ", "+++++", "  +  ", "     "],
  "=": ["     ", "=====", "     ", "=====", "     "],
  "<": ["   < ", "  <  ", " <   ", "  <  ", "   < "],
  ">": [" >   ", "  >  ", "   > ", "  >  ", " >   "],
  "@": [" @@@ ", "@   @", "@ @@@", "@    ", " @@@ "],
  "#": [" # # ", "#####", " # # ", "#####", " # # "],
  "&": [" &&  ", "& &  ", " &&& ", "& & &", " && &"],
  "/": ["    /", "   / ", "  /  ", " /   ", "/    "],
  ":": ["     ", "  :  ", "     ", "  :  ", "     "],
  "'": ["  '  ", "  '  ", "     ", "     ", "     "],
};

export type ShapeType = "triangle" | "square" | "diamond" | "circle" | "heart" | "star" | "spiral" | "wave" | "pyramid";
export type BorderStyle = "single" | "double" | "rounded" | "thick" | "ascii" | "stars" | "dots";
export type FontStyle = "standard" | "banner" | "block" | "shadow" | "3d";

// Convert image to ASCII art
export function imageToAscii(
  imageData: ImageData,
  width: number,
  charSet: string = "standard",
  invert: boolean = false,
  colorMode: boolean = false
): { text: string; colorData?: { char: string; r: number; g: number; b: number }[][] } {
  const chars = CHAR_SETS[charSet] || CHAR_SETS.standard;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  // Calculate height preserving aspect ratio
  const aspectRatio = imageData.height / imageData.width;
  const height = Math.round(width * aspectRatio * 0.55);

  canvas.width = width;
  canvas.height = height;

  // Create a temp canvas with original image
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = imageData.width;
  tempCanvas.height = imageData.height;
  const tempCtx = tempCanvas.getContext("2d")!;
  tempCtx.putImageData(imageData, 0, 0);

  // Draw scaled version
  ctx.drawImage(tempCanvas, 0, 0, width, height);
  const scaledData = ctx.getImageData(0, 0, width, height);

  let asciiStr = "";
  const colorData: { char: string; r: number; g: number; b: number }[][] = [];

  for (let y = 0; y < height; y++) {
    let row = "";
    const colorRow: { char: string; r: number; g: number; b: number }[] = [];

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = scaledData.data[idx];
      const g = scaledData.data[idx + 1];
      const b = scaledData.data[idx + 2];

      // Convert to grayscale using luminance formula
      let gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

      if (invert) gray = 255 - gray;

      const charIdx = Math.min(
        Math.floor((gray * chars.length) / 256),
        chars.length - 1
      );
      const char = chars[charIdx];
      row += char;

      if (colorMode) {
        colorRow.push({ char, r, g, b });
      }
    }

    asciiStr += row + "\n";
    if (colorMode) colorData.push(colorRow);
  }

  return {
    text: asciiStr.trimEnd(),
    colorData: colorMode ? colorData : undefined,
  };
}

// Convert text to ASCII art
export function textToAscii(
  text: string,
  font: FontStyle = "standard",
  fillChar?: string
): string {
  switch (font) {
    case "banner":
      return bannerFont(text);
    case "block":
      return blockFont(text);
    case "shadow":
      return shadowFont(text);
    case "3d":
      return threeDFont(text);
    default:
      return standardFont(text, fillChar);
  }
}

function standardFont(text: string, fillChar?: string): string {
  const lines = ["", "", "", "", ""];
  for (const ch of text.toUpperCase()) {
    if (ch in LETTERS) {
      for (let i = 0; i < 5; i++) {
        let row = LETTERS[ch][i];
        if (fillChar) {
          row = row
            .split("")
            .map((c) => (c !== " " ? fillChar : " "))
            .join("");
        }
        lines[i] += row + "  ";
      }
    } else {
      for (let i = 0; i < 5; i++) {
        lines[i] += "      ";
      }
    }
  }
  return lines.join("\n");
}

function bannerFont(text: string): string {
  const len = text.length;
  return [
    `╔${"═".repeat(len + 2)}╗`,
    `║ ${text} ║`,
    `╚${"═".repeat(len + 2)}╝`,
  ].join("\n");
}

function blockFont(text: string): string {
  return text
    .split("")
    .map((c) => (c !== " " ? `[${c}]` : "   "))
    .join(" ");
}

function shadowFont(text: string): string {
  const lines = ["", "", "", "", "", ""];
  for (const ch of text.toUpperCase()) {
    if (ch in LETTERS) {
      for (let i = 0; i < 5; i++) {
        lines[i] += LETTERS[ch][i] + "  ";
      }
      // Add shadow line
      lines[5] += " " + "░".repeat(LETTERS[ch][0].length - 1) + "  ";
    } else {
      for (let i = 0; i < 6; i++) {
        lines[i] += "      ";
      }
    }
  }
  return lines.join("\n");
}

function threeDFont(text: string): string {
  const lines = ["", "", "", "", "", "", ""];
  for (const ch of text.toUpperCase()) {
    if (ch in LETTERS) {
      for (let i = 0; i < 5; i++) {
        const row = LETTERS[ch][i];
        lines[i] += " " + row + "  ";
        // 3D offset
        if (i < 5) {
          const shadowRow = row
            .split("")
            .map((c) => (c !== " " ? "/" : " "))
            .join("");
          if (i + 1 < 7) {
            // We'll overlay later
            lines[i + 1] =
              lines[i + 1] || "" + shadowRow.substring(0, 1) + "  ";
          }
        }
      }
      lines[5] += "/" + "─".repeat(LETTERS[ch][0].length) + "  ";
      lines[6] += " " + " ".repeat(LETTERS[ch][0].length) + "  ";
    } else {
      for (let i = 0; i < 7; i++) {
        lines[i] += "      ";
      }
    }
  }
  return lines.join("\n");
}

// Create ASCII shapes
export function createShape(
  shapeType: ShapeType,
  size: number,
  fillChar: string = "*"
): string {
  switch (shapeType) {
    case "triangle":
      return drawTriangle(size, fillChar);
    case "square":
      return drawSquare(size, fillChar);
    case "diamond":
      return drawDiamond(size, fillChar);
    case "circle":
      return drawCircle(size, fillChar);
    case "heart":
      return drawHeart(size, fillChar);
    case "star":
      return drawStar(size, fillChar);
    case "spiral":
      return drawSpiral(size, fillChar);
    case "wave":
      return drawWave(size, fillChar);
    case "pyramid":
      return drawPyramid(size, fillChar);
    default:
      return `Unknown shape: ${shapeType}`;
  }
}

function drawTriangle(h: number, c: string): string {
  const lines: string[] = [];
  for (let i = 1; i <= h; i++) {
    lines.push(" ".repeat(h - i) + c.repeat(2 * i - 1));
  }
  return lines.join("\n");
}

function drawSquare(s: number, c: string): string {
  const lines: string[] = [];
  for (let i = 0; i < s; i++) {
    if (i === 0 || i === s - 1) {
      lines.push(c.repeat(s));
    } else {
      lines.push(c + " ".repeat(s - 2) + c);
    }
  }
  return lines.join("\n");
}

function drawDiamond(h: number, c: string): string {
  const top: string[] = [];
  for (let i = 1; i <= h; i++) {
    top.push(" ".repeat(h - i) + c.repeat(2 * i - 1));
  }
  const bottom = [...top].reverse().slice(1);
  return [...top, ...bottom].join("\n");
}

function drawCircle(r: number, c: string): string {
  const lines: string[] = [];
  for (let y = -r; y <= r; y++) {
    let row = "";
    for (let x = -r; x <= r; x++) {
      const dist = Math.sqrt(x * x + y * y);
      if (dist >= r - 0.5 && dist <= r + 0.5) {
        row += c;
      } else {
        row += " ";
      }
    }
    lines.push(row);
  }
  return lines.join("\n");
}

function drawHeart(s: number, c: string): string {
  const lines: string[] = [];
  for (let y = s; y >= -s; y--) {
    let row = "";
    for (let x = -s; x <= s; x++) {
      const val =
        (x * x + y * y - s * s) ** 3 - x * x * y * y * y;
      row += val <= 0 ? c + " " : "  ";
    }
    lines.push(row);
  }
  return lines.join("\n");
}

function drawStar(size: number, c: string): string {
  const s = Math.max(3, size);
  const width = 2 * s + 1;
  const lines: string[] = [];

  // Top spike
  for (let i = 0; i < s; i++) {
    const row = " ".repeat(s - i) + c.repeat(2 * i + 1);
    lines.push(row.padEnd(width));
  }
  // Middle full row
  lines.push(c.repeat(width));
  // Lower body with indentation
  for (let i = s - 1; i >= 1; i--) {
    const indent = Math.floor((s - i) / 2);
    const row = " ".repeat(indent) + c.repeat(2 * i + 1);
    lines.push(row.padEnd(width));
  }

  return lines.join("\n");
}

function drawSpiral(size: number, c: string): string {
  const dim = size * 2 + 1;
  const grid: string[][] = Array.from({ length: dim }, () =>
    Array(dim).fill(" ")
  );
  const cx = size;
  const cy = size;

  for (let t = 0; t < size * 60; t++) {
    const angle = (t * Math.PI) / 30;
    const r = (t / 60) * size * 0.3;
    const x = Math.round(cx + r * Math.cos(angle));
    const y = Math.round(cy + r * Math.sin(angle) * 0.55);
    if (x >= 0 && x < dim && y >= 0 && y < dim) {
      grid[y][x] = c;
    }
  }
  return grid.map((row) => row.join("")).join("\n");
}

function drawWave(size: number, c: string): string {
  const width = size * 8;
  const height = size * 3;
  const lines: string[] = [];

  for (let y = 0; y < height; y++) {
    let row = "";
    for (let x = 0; x < width; x++) {
      const waveY =
        Math.sin((x / width) * Math.PI * 4) * (height / 3) + height / 2;
      if (Math.abs(y - waveY) < 0.8) {
        row += c;
      } else {
        row += " ";
      }
    }
    lines.push(row);
  }
  return lines.join("\n");
}

function drawPyramid(h: number, c: string): string {
  const lines: string[] = [];
  for (let i = 0; i < h; i++) {
    const width = 2 * i + 1;
    const padding = " ".repeat(h - i - 1);
    // Front face with shading
    let row = padding;
    for (let j = 0; j < width; j++) {
      if (j === 0 || j === width - 1 || i === h - 1) {
        row += c;
      } else if (j < width / 2) {
        row += "░";
      } else {
        row += "▒";
      }
    }
    lines.push(row);
  }
  return lines.join("\n");
}

// Create bordered text
export function createBorder(text: string, style: BorderStyle): string {
  const borders: Record<
    BorderStyle,
    [string, string, string, string, string, string]
  > = {
    single: ["┌", "┐", "└", "┘", "─", "│"],
    double: ["╔", "╗", "╚", "╝", "═", "║"],
    rounded: ["╭", "╮", "╰", "╯", "─", "│"],
    thick: ["┏", "┓", "┗", "┛", "━", "┃"],
    ascii: ["+", "+", "+", "+", "-", "|"],
    stars: ["*", "*", "*", "*", "*", "*"],
    dots: ["·", "·", "·", "·", "·", "·"],
  };

  const [tl, tr, bl, br, h, v] = borders[style] || borders.single;
  const lines = text.split("\n");
  const maxLen = Math.max(...lines.map((l) => l.length));

  const result: string[] = [];
  result.push(tl + h.repeat(maxLen + 2) + tr);
  for (const line of lines) {
    result.push(v + " " + line.padEnd(maxLen) + " " + v);
  }
  result.push(bl + h.repeat(maxLen + 2) + br);

  return result.join("\n");
}

// Create a pattern/texture
export function createPattern(
  type: string,
  width: number,
  height: number
): string {
  const lines: string[] = [];
  switch (type) {
    case "checkerboard":
      for (let y = 0; y < height; y++) {
        let row = "";
        for (let x = 0; x < width; x++) {
          row += (x + y) % 2 === 0 ? "█" : "░";
        }
        lines.push(row);
      }
      break;
    case "stripes":
      for (let y = 0; y < height; y++) {
        lines.push((y % 2 === 0 ? "═" : "─").repeat(width));
      }
      break;
    case "dots":
      for (let y = 0; y < height; y++) {
        let row = "";
        for (let x = 0; x < width; x++) {
          row += x % 2 === 0 && y % 2 === 0 ? "•" : " ";
        }
        lines.push(row);
      }
      break;
    case "zigzag":
      for (let y = 0; y < height; y++) {
        let row = "";
        for (let x = 0; x < width; x++) {
          const pos = (x + y) % 4;
          row += pos < 2 ? "/" : "\\";
        }
        lines.push(row);
      }
      break;
    case "bricks":
      for (let y = 0; y < height; y++) {
        let row = "";
        const offset = y % 2 === 0 ? 0 : 3;
        for (let x = 0; x < width; x++) {
          if (y % 3 === 0) row += "─";
          else if ((x + offset) % 6 === 0) row += "│";
          else row += " ";
        }
        lines.push(row);
      }
      break;
    default:
      return `Unknown pattern: ${type}`;
  }
  return lines.join("\n");
}
