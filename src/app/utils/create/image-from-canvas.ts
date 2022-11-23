import { MimeType } from '../mimetype';

export function createImageFromCanvas(canvas: HTMLCanvasElement, mime = MimeType.PNG): HTMLImageElement {
  const image = new Image();
  image.src = canvas.toDataURL(mime);

  return image;
}
