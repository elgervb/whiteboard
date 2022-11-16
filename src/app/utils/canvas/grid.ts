
export interface GridOptions {
  lineWidth: number;
  strokeStyle: string;
  gridGap: number;
  correctionX: number;
  correctionY: number;
}
export function grid(element: HTMLCanvasElement, options: GridOptions): void {

  const {height, width} = element;
  const ctx = element.getContext('2d');

  ctx.lineWidth = options.lineWidth;
  ctx.strokeStyle = options.strokeStyle;

  const startX = -options.correctionX + (options.correctionX % options.gridGap) + 0.5;
  const startY = -options.correctionY + (options.correctionY % options.gridGap) + 0.5;
  const correctedHeight = height - options.correctionY;
  const correctedWidth = width - options.correctionX;

  for (let x = startX; x < correctedWidth; x += options.gridGap) {
    ctx.moveTo(x, startY - (options.correctionY % options.gridGap));
    ctx.lineTo(x, correctedHeight);
  }
  ctx.stroke();

  for (let y = startY; y < correctedHeight; y += options.gridGap) {
    ctx.moveTo(startX - (options.correctionX % options.gridGap), y);
    ctx.lineTo(correctedWidth, y);
  }
  ctx.stroke();
}
