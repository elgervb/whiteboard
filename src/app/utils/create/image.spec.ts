
import { createImage } from './image';

describe('creatImage', () => {

  it('should create a new image', () => {
    const image = createImage();
    expect(image).toBeTruthy();
    expect(image instanceof HTMLImageElement).toBe(true);
  });

  it('should create a new image with attributes', () => {
    // tslint:disable:no-magic-numbers
    const image = createImage('http://test/asdf.png', 200, 400);
    expect(image).toBeTruthy();
    expect(image.src).toBe('http://test/asdf.png');
    expect(image.width).toBe(200);
    expect(image.height).toBe(400);
    // tslint:enable:no-magic-numbers
  });
});
