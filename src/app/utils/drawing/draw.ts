import { brushFactory } from './brushes';
import { Brush } from './brushes/brush';
import { BrushContext, BrushType, Point } from './models';
import { getMousePosition } from './utils';

export class CanvasDraw {

  private isDrawing = false;
  private brush: Brush;

  constructor(private element: HTMLCanvasElement, private brushType: BrushType, private brushContext: BrushContext) {
    this.setBrush({brushType, brushContext: this.brushContext});
  }

  setBrush({ brushType, brushContext }: { brushType: BrushType; brushContext: BrushContext; }): void {
    this.brush = brushFactory(
      brushType || this.brushType,
      brushContext || this.brushContext
    );
  }

  brushDown(event: MouseEvent, correction?: Point): void {
    this.isDrawing = true;
    const point = getMousePosition(event, this.element);
    this.brush.down(this.correctPoint(point, correction));
  }

  brushUp(event?: MouseEvent, correction?: Point): void {
    this.isDrawing = false;
    const point = getMousePosition(event, this.element);
    this.brush.up(this.correctPoint(point, correction));
  }

  brushMove(event: MouseEvent, correction?: Point): void {
    if (this.isDrawing) {
      const point = getMousePosition(event, this.element);
      this.brush.move(this.correctPoint(point, correction));
    }
  }

  private correctPoint(point: Point, correction: Point): Point {
    return {
      x: point.x - (correction?.x || 0),
      y: point.y - (correction?.y || 0)
    };
  }
}


export function enableDrawing(canvas: HTMLCanvasElement, brush: Brush, isDrawingEnabled: () => boolean) {
  let isDrawing = false;
  canvas.onmousedown = (evt: MouseEvent) => {
    if (isDrawingEnabled()) {
      isDrawing = true;

      brush.down(getMousePosition(evt, canvas));
    }
  };

  canvas.onmousemove = (evt: MouseEvent) => {
    if (isDrawingEnabled() && isDrawing) {
      brush.move(getMousePosition(evt, canvas));
    }
  };

  canvas.onmouseup = (evt: MouseEvent) => {
    if (isDrawingEnabled()) {
      isDrawing = false;
      brush.up(getMousePosition(evt, canvas));
    }
  };
}

export function disableDrawing(canvas: HTMLCanvasElement) {
  canvas.onmousedown = undefined;
  canvas.onmousemove = undefined;
  canvas.onmouseup = undefined;
}
