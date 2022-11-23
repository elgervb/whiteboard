import { createCanvasFromImage } from '../create/canvas-from-image';

import { Rgb } from './rgb';

const ROW_PADDING = 4;

export function average(image: HTMLImageElement | HTMLCanvasElement, blockSize = 5): Rgb | null {

  let canvas: HTMLCanvasElement;

  canvas = image instanceof HTMLImageElement ? createCanvasFromImage(image) : image;
  const context = canvas.getContext('2d');

  let data: ImageData;
  const rgb: Rgb = { r: 0, g: 0, b: 0, a: 1 };

  try {
    data = context.getImageData(0, 0, canvas.width, canvas.height);
  } catch (e) { // security error, img on diff domain
    console.log(e);
    return rgb;
  }

  const length = data.data.length;
  let i = 0;
  let count = 0;

  // tslint:disable-next-line:no-conditional-assignment
  while ((i += blockSize * ROW_PADDING) < length) {
    count++;

    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  // tslint:disable:no-bitwise
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);
  rgb.a = 1;

  return rgb;
}
