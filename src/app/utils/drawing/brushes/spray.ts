import { randomFloat } from '../../random/random-float';
import { BrushContext, Point } from '../models';

import { Brush } from './brush';

const DEFAULT_DENSITY = 50;
const RENDER_TIMEOUT = 50;

export class SprayBrush implements Brush {

  private ctx: CanvasRenderingContext2D;
  private density: number;

  // tslint:disable-next-line no-any
  private timeout: any;
  private position: Point;

  constructor(private context: BrushContext) {
    this.ctx = this.context.canvas.getContext('2d');
    this.setContext(context);
  }

  setContext(context: BrushContext) {
    this.context = context;

    this.density = (this.context.data && this.context.data.density) || DEFAULT_DENSITY;
  }

  up() {
    clearTimeout(this.timeout);
  }

  down(from: Point) {
    this.ctx.lineWidth = this.context.lineWidth;
    this.ctx.fillStyle = this.context.color;
    this.ctx.globalAlpha = this.context.globalAlpha;
    this.ctx.lineJoin = this.ctx.lineCap = 'round';
    this.position = from;

    this.timeout = setTimeout(() => this.draw(), RENDER_TIMEOUT);
  }

  move(to: Point) {
    this.position = to;
  }

  private draw() {
    for (let i = this.density; i--;) {
      const angle = randomFloat(0, Math.PI * 2);
      const radius = randomFloat(0, this.context.lineWidth);
      this.ctx.fillRect(
        this.position.x + radius * Math.cos(angle),
        this.position.y + radius * Math.sin(angle),
        1, 1);
    }
    if (!this.timeout) {
      return;
    }

    this.timeout = setTimeout(() => this.draw(), RENDER_TIMEOUT);
  }
}
