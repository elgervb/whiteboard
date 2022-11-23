import { BrushContext, Point } from '../models';

import { Brush } from './brush';

export class Pen implements Brush {

  private ctx: CanvasRenderingContext2D;

  constructor(private context: BrushContext) {
    this.ctx = this.context.canvas.getContext('2d');
    this.setContext(context);
  }

  setContext(context: BrushContext) {
    this.context = context;
  }

  up() {
    this.ctx.closePath();
  }

  down(from: Point) {
    this.ctx.lineWidth = this.context.lineWidth;
    this.ctx.lineJoin = this.ctx.lineCap = 'round';
    this.ctx.globalAlpha = this.context.globalAlpha;
    this.ctx.strokeStyle = this.context.color;

    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
  }

  move(to: Point) {
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }
}
