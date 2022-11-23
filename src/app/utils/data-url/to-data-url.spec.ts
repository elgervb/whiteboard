import { createCanvas } from '../create/canvas';
import { MimeType } from '../mimetype';

import { toDataUrl } from './to-data-url';

describe('to-data-url', () => {

  it('creates a data url', () => {
    const base64 = 'asdfsafa==';

    const dataUrl = toDataUrl(base64, MimeType.PNG);

    expect(dataUrl).toContain(base64);
    expect(dataUrl).toContain(`data:${MimeType.PNG}`);
  });

  it('creates a data url from an canvas', () => {
    const canvas = createCanvas();
    const base64 = 'asdfsafa==';
    const toDataUrlSpy = jest.fn(() => base64);
    canvas.toDataURL = toDataUrlSpy;

    const dataUrl = toDataUrl(canvas, MimeType.PNG);

    expect(dataUrl).toContain(base64);
  });
});
