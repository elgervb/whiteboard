import { Rgb } from './rgb';

export function isDark(color: Rgb) {

  let hsp: number;

  // HSP equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(
    // tslint:disable:no-magic-numbers
    (color.r * color.r) * 0.299 +
    (color.g * color.g) * 0.587 +
    (color.b * color.b) * 0.114
  );

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return false;
  }
  return true;
}
