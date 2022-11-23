import { MimeType } from '../mimetype';

export function toDataUrl(element: string | HTMLCanvasElement, mimeType: MimeType) {
  if (element instanceof HTMLCanvasElement) {
    return element.toDataURL(mimeType);
  }
  return `data:${mimeType};base64,${element}`;
}
