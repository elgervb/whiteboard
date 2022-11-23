import { Point } from "../drawing/models";

export class CanvasPan {

  get isPanning(): boolean {
    return  this.busy;
  }

  moved: Point = {x: 0, y: 0};
  private ctx: CanvasRenderingContext2D;
  private busy = false;
  private start: Point;

  constructor(element: HTMLCanvasElement) {
    this.ctx = element.getContext('2d');
  }

  startPanning(start: Point) {
    this.busy = true;
    this.start = start;
  }

  stopPanning() {
    this.busy = false;
    this.start = undefined;
  }

  move(move: Point): Point | null {
    if (this.busy) {
      this.ctx.translate(move.x - this.start.x, move.y - this.start.y);

      this.moved = {
        x: this.moved.x + move.x  - this.start.x,
        y: this.moved.y + move.y  - this.start.y
      };

      this.start = {...move};
      return this.moved;
    }
    return null;
  }
}
