export function createCanvas(height?: number, width?: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');

  if (height) {
    canvas.height = height;
  }
  if (width) {
    canvas.width = width;
  }

  return canvas;
}
