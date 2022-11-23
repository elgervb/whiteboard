import { BrushContext, BrushType } from '../models';

import { Brush } from './brush';
import { CircularLines } from './circular-lines';
import { Marker } from './marker';
import { MultipleLines } from './multiple-lines';
import { Pen } from './pen';
import { SprayBrush } from './spray';

export function brushFactory(type: BrushType, context: BrushContext): Brush {
  switch (type) {
    case BrushType.marker:
      return new Marker(context);
    case BrushType.pen:
      return new Pen(context);
    case BrushType.circular:
      return new CircularLines(context);
    case BrushType.spray:
      return new SprayBrush(context);
    case BrushType.multipleLines:
      return new MultipleLines(context);

    default:
      throw new Error(`No such brush there ${type}`);
  }
}
