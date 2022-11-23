export function createImage(src?: string, width?: number, height?: number): HTMLImageElement {
  const img = document.createElement('img');
  if (src) { img.src = src; }
  if (height) { img.height = height; }
  if (width) { img.width = width; }

  return img;
}
