import { createCanvas } from './canvas';

describe('createCanvas', () => {

  it('creates a new canvas', () => {
    const canvas = createCanvas();
    expect(canvas).toBeTruthy();
    expect(canvas instanceof HTMLCanvasElement);
  });

  it('creates a new canvas element with 2d context', () => {
    const canvas = createCanvas();
    expect(canvas).toBeTruthy();
    const context = canvas.getContext('2d');

    expect(context).toBeTruthy();
  });

  it('sets the height and width of the canvas', () => {
    const height = 100;
    const width = 200;
    const canvas = createCanvas(height, width);

    expect(canvas.width).toBe(width);
    expect(canvas.height).toBe(height);
  });

});
