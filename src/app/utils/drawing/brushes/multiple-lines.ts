import { BrushContext, Point } from '../models';

import { Brush } from './brush';

const LINE_OFFSET = 4;

export class MultipleLines implements Brush {

  private ctx: CanvasRenderingContext2D;
  private points: Point[] = [];

  constructor(private context: BrushContext) {
    this.ctx = this.context.canvas.getContext('2d');
    this.setContext(context);
  }

  setContext(context: BrushContext) {
    this.context = context;
  }

  up() {
    this.points = [];
  }

  down() {
    this.ctx.lineWidth = this.context.lineWidth;
    this.ctx.lineJoin = this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.context.color;
    this.ctx.globalAlpha = this.context.globalAlpha;
  }

  move(to: Point) {
    this.points.push(to);

    const offset = this.context.lineWidth - 1 + LINE_OFFSET;

    this.draw(offsetPoints(offset * -1, this.points));
    this.draw(offsetPoints(offset * -1 / 2, this.points));
    this.draw(this.points);
    this.draw(offsetPoints(offset / 2, this.points));
    this.draw(offsetPoints(offset, this.points));
  }

  private draw(points: Point[]) {
    let p1 = points[0];
    let p2 = points[1];

    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);

    // tslint:disable-next-line one-variable-per-declaration
    for (let i = 1, len = points.length; i < len; i++) {
      // we pick the point between pi+1 & pi+2 as the
      // end point and p1 as our control point
      const midPoint = midPointBtw(p1, p2);
      this.ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      p1 = points[i];
      p2 = points[i + 1];
    }
    // Draw last line as a straight line while
    // we wait for the next point to be able to calculate
    // the bezier control point
    this.ctx.lineTo(p1.x, p1.y);
    this.ctx.stroke();
  }
}

function midPointBtw(p1: Point, p2: Point): Point {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  };
}

function offsetPoints(offset: number, points: Point[]): Point[] {
  const offsets = [];
  for (const point of points) {
    offsets.push({
      x: point.x + offset,
      y: point.y + offset
    });
  }
  return offsets;
}
