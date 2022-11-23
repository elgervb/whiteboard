import { hex2rgb } from '../../color/hex-2-rgb';
import { rgbToString } from '../../color/rgb-to-string';
import { BrushContext, Point } from '../models';
import { averageColor, getColor } from '../utils';

import { Brush } from './brush';

export class CircularLines implements Brush {

  private ctx: CanvasRenderingContext2D;
  previous: Point;

  constructor(private context: BrushContext) {
    this.ctx = this.context.canvas.getContext('2d');
    this.setContext(context);
  }

  setContext(context: BrushContext) {
    this.context = context;
  }

  up() {
    //
  }

  down(from: Point) {
    this.previous = from;
  }

  move(to: Point) {
    this.ctx.lineWidth = this.context.lineWidth;
    this.ctx.globalAlpha = this.context.globalAlpha;
    if (this.context.data && this.context.data.average) {
      const colByCoords = getColor(this.ctx, to.x, to.y);
      const rgb = averageColor(colByCoords, hex2rgb(this.context.color));
      this.ctx.strokeStyle = rgbToString(rgb);
    } else {
      this.ctx.strokeStyle = this.context.color;
    }
    // tslint:disable
    // this.ctx.globalAlpha = .1;
    this.ctx.lineJoin = this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(this.previous.x, this.previous.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.closePath();
    this.ctx.stroke();
  }
}
