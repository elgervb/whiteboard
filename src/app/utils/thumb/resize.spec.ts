import { createCanvas } from '../create/canvas';

import { resize } from './resize';

describe('resize', () => {

  it('returns a copy', () => {
    const canvas = createCanvas(2, 3);
    const copy = resize(canvas, 2, 3);

    expect(copy).not.toBe(canvas);
  });

  it('should not modify dimensions', () => {
    const canvas = createCanvas(2, 3);
    const copy = resize(canvas, 2, 3);

    expect(copy.height).toBe(2);
    expect(copy.width).toBe(3);
  });

  it('should modify the dimensions by ratio based on height', () => {
    const canvas = createCanvas(4, 2);
    const copy = resize(canvas, 2, 2, 'height');

    expect(copy.height).toBe(2);
    expect(copy.width).toBe(1);
  });

  it('should modify the dimensions by ratio based on width', () => {
    const canvas = createCanvas(2, 4);
    const copy = resize(canvas, 2, 2, 'width');

    expect(copy.height).toBe(1);
    expect(copy.width).toBe(2);
  });

});
