import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { clear, grid, resize } from './utils/canvas';
import { CanvasPan } from './utils/canvas/pan';
// infinite zoom / pan: https://stackoverflow.com/questions/74307643/js-canvas-simulate-infinite-pan-and-zoomable-grid
// pan & zoom https://codepen.io/chengarda/pen/wRxoyB

@Component({
  selector: 'cv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {

  @ViewChild('whiteboard') whiteboard!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private pan: CanvasPan;

  ngAfterViewInit(): void {
    this.ctx = this.whiteboard.nativeElement.getContext('2d');
    if (this.ctx === null) {
      throw new Error('Canvas context is null');
    }

    this.pan = new CanvasPan(this.whiteboard.nativeElement);

    this.resizeCanvas();
  }

  draw(): void {
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

    this.draw();
  }

  private clearCanvas(): void {
   clear(this.whiteboard.nativeElement);
  }

  @HostListener('pointerdown', ['$event'])
  pointerDown($event: PointerEvent): void {
    this.pan.startPanning({x: $event.clientX, y: $event.clientY});
  }

  @HostListener('pointerup', ['$event'])
  pointerUp($event: PointerEvent): void {
    this.pan.stopPanning();
  }
  @HostListener('pointermove', ['$event'])
  pointerMove($event: PointerEvent): void {
    if(this.pan.isPanning) {
      this.pan.move({x: $event.clientX, y: $event.clientY});
      this.draw();
    }
  }
}
