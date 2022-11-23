import { Rgb } from './rgb';

export function rgb2Hex(rgb: Rgb) {
  // tslint:disable-next-line:no-magic-numbers
  return `#${Number(rgb.r).toString(16)}${Number(rgb.g).toString(16)}${Number(rgb.b).toString(16)}`;
}
