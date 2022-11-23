import { Rgb } from './rgb';

export function rgbToString(rgb: Rgb) {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
}
