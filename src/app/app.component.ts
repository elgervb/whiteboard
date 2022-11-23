import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { clear, grid, resize } from './utils/canvas';
import { CanvasPan } from './utils/canvas/pan';
import { CanvasDraw } from './utils/drawing/draw';
import { BrushType } from './utils/drawing/models';

enum CanvasState  {
  PAN,
  DRAW
}

@Component({
  selector: 'cv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {

  @ViewChild('whiteboard') whiteboard!: ElementRef<HTMLCanvasElement>;

  CanvasState = CanvasState;

  private state = CanvasState.DRAW;

  private ctx: CanvasRenderingContext2D;
  private pan: CanvasPan;
  private draw: CanvasDraw;

  ngAfterViewInit(): void {
    this.ctx = this.whiteboard.nativeElement.getContext('2d');
    if (this.ctx === null) {
      throw new Error('Canvas context is null');
    }

    this.pan = new CanvasPan(this.whiteboard.nativeElement);
    this.draw = new CanvasDraw(this.whiteboard.nativeElement, BrushType.pen, {
      canvas: this.whiteboard.nativeElement,
      color: '#999',
      lineWidth: 30,
      globalAlpha: 1
    });

    this.resizeCanvas();
  }

  setState(canvasState: CanvasState): void {
    this.state = canvasState;
  }

  eventTrap($event: MouseEvent) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
  }

  private paint(): void {
    requestAnimationFrame(() => {
      this.clearCanvas();
      this.drawGrid();

      this.ctx.beginPath();
      this.ctx.arc(150, 150, 75, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = 'green';
      this.ctx.fill();
      this.ctx.lineWidth = 0;
      this.ctx.stroke();
    })
  }

  private drawGrid(): void {
    grid(this.whiteboard.nativeElement, {
      lineWidth: 1,
      strokeStyle: '#d4d4d4',
      gridGap: 100,
      correctionX: this.pan.moved?.x || 0,
      correctionY: this.pan.moved?.y || 0
    });
  }

  @HostListener('window:resize')
  private resizeCanvas(): void {
    resize(this.whiteboard.nativeElement);

    this.paint();
  }

  private clearCanvas(): void {
   clear(this.whiteboard.nativeElement);
  }

  @HostListener('pointerdown', ['$event'])
  pointerDown($event: PointerEvent): void {
    if (this.state === CanvasState.PAN) {
      this.pan.startPanning({x: $event.clientX, y: $event.clientY});
    }
    if (this.state === CanvasState.DRAW) {
      this.draw.brushDown($event, this.pan.moved);
    }
  }

  @HostListener('pointerup', ['$event'])
  pointerUp($event: PointerEvent): void {
    if (this.state === CanvasState.PAN) {
      this.pan.stopPanning();
    }
    if (this.state === CanvasState.DRAW) {
      this.draw.brushUp($event, this.pan.moved);
    }
  }
  @HostListener('pointermove', ['$event'])
  pointerMove($event: PointerEvent): void {
    if (this.state === CanvasState.PAN) {
      if(this.pan.isPanning) {
        this.pan.move({x: $event.clientX, y: $event.clientY});
        this.paint();
      }
    }
    if (this.state === CanvasState.DRAW) {
      this.draw.brushMove($event, this.pan.moved);
    }
  }
}
