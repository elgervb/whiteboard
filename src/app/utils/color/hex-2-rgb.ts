import { Rgb } from './rgb';

export function hex2rgb(hex: string): Rgb {
  // long version
  let r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (r) {
    const rgbIndex = 4;
    const rgb = r.slice(1, rgbIndex)
      .map(x => parseInt(x, 16));

    return {
      r: rgb[0],
      g: rgb[1],
      b: rgb[2],
      a: 255
    };
  }
  // short version
  r = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (r) {
    // tslint:disable no-magic-numbers
    const rgb = r.slice(1, 4).map(x => parseInt(x, 16) * 0x11);
    return {
      r: rgb[0],
      g: rgb[1],
      b: rgb[2],
      a: 255
    };
  }
  return {
    r: 0,
    g: 0,
    b: 0,
    a: 0
  };
}
