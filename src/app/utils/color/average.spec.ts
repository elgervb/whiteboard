import { createCanvasFromImage } from '../create/canvas-from-image';
import { createImage } from '../create/image';

import { average } from './average';

jest.mock('../create/canvas-from-image');

const expectedRbg = { r: 127, g: 127, b: 127, a: 1 };

// @ts-ignore
createCanvasFromImage.mockImplementation(() => ({
  height: 10,
  width: 10,
  getContext: () => ({
    getImageData: () => ({
      // tslint:disable-next-line:no-magic-numbers
      data: Array(10 * 10 * 3).fill(127, 0, 10 * 10 * 3)
    })
  })
}));

describe('average', () => {

  it('calculates the average color of an image', () => {
    const avg = average(createImage());

    expect(avg).toBeTruthy();
    expect(avg).toEqual(expectedRbg);
  });
});
