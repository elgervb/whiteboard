import { isDark } from './is-dark';

describe('isDark', () => {

  it('black should be dark', () => {
    expect(isDark({ r: 0, g: 0, b: 0 })).toBe(true);
  });

  it('white should be light', () => {
    expect(isDark({ r: 255, g: 255, b: 255 })).toBe(false);
  });

  it('lightgray should be light', () => {
    expect(isDark({ r: 127, g: 127, b: 127 })).toBe(true);
  });

  it('darkgray should be dark', () => {
    expect(isDark({ r: 128, g: 128, b: 128 })).toBe(false);
  });

});
