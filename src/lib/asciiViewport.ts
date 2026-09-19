export interface Viewport {
  offsetX: number;
  offsetY: number;
  scale: number;
}

export interface CanvasSize { width: number; height: number; }

const MIN_SCALE = 0.25;
const MAX_SCALE = 8;

export function clampViewport(viewport: Viewport, canvas: CanvasSize, view: CanvasSize): Viewport {
  const scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, viewport.scale));
  const maxX = Math.max(0, canvas.width * scale - view.width);
  const maxY = Math.max(0, canvas.height * scale - view.height);
  return {
    scale,
    offsetX: Math.max(0, Math.min(maxX, viewport.offsetX)),
    offsetY: Math.max(0, Math.min(maxY, viewport.offsetY)),
  };
}

export function zoomAroundPoint(
  viewport: Viewport,
  point: { x: number; y: number },
  nextScale: number,
): Viewport {
  const scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, nextScale));
  const ratio = scale / viewport.scale;
  return {
    scale,
    offsetX: point.x - (point.x - viewport.offsetX) * ratio,
    offsetY: point.y - (point.y - viewport.offsetY) * ratio,
  };
}

export function fitCanvas(canvas: CanvasSize, view: CanvasSize, padding = 16): Viewport {
  const usableWidth = Math.max(1, view.width - padding * 2);
  const usableHeight = Math.max(1, view.height - padding * 2);
  const scale = Math.min(usableWidth / canvas.width, usableHeight / canvas.height);
  return { offsetX: 0, offsetY: 0, scale: Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale)) };
}
