import { createCanvas } from './canvas';

export function createCanvasFromImage(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = createCanvas();
  const context = canvas.getContext('2d');
  canvas.height = img.naturalHeight || img.offsetHeight || img.height;
  canvas.width = img.naturalWidth || img.offsetWidth || img.width;

  context.drawImage(img, 0, 0);

  return canvas;
}
