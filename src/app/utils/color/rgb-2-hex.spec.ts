import { Rgb } from './rgb';
import { rgb2Hex } from './rgb-2-hex';

describe('rgb2hex', () => {

  it('should convert', () => {
    const rgb: Rgb = { r: 255, g: 255, b: 255 };
    expect(rgb2Hex(rgb)).toBe('#ffffff');
  });

  it('should convert', () => {
    const rgb: Rgb = { r: 0, g: 0, b: 0 };
    expect(rgb2Hex(rgb)).toBe('#000');
  });
});
