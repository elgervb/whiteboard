import { Rgb } from './rgb';

export function colorPicker(canvas: HTMLCanvasElement, fromX: number, fromY: number): Rgb {
  const context = canvas.getContext('2d');

  const pixel = context.getImageData(fromX, fromY, 1, 1);
  const data = pixel.data;

  return {
    r: data[0],
    g: data[1],
    b: data[2],
    // tslint:disable-next-line:no-magic-numbers
    a: Math.round(data[3] / 255)
  };
}
