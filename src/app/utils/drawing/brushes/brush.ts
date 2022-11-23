import { BrushContext, Point } from '../models';

export interface Brush {

  down(from: Point): void;
  move(to: Point): void;
  setContext(context: BrushContext): void;
  up(position: Point): void;
}
