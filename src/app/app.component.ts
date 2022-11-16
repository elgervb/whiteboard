import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { clear, grid, resize } from './utils/canvas';
// infinite zoom / pan: https://stackoverflow.com/questions/74307643/js-canvas-simulate-infinite-pan-and-zoomable-grid
// pan & zoom https://codepen.io/chengarda/pen/wRxoyB

@Component({
  selector: 'cv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('whiteboard') whiteboard!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.ctx = this.whiteboard.nativeElement.getContext('2d');
    if (this.ctx === null) {
      throw new Error('Canvas context is null');
    }

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
      correctionX: this.movedX,
      correctionY: this.movedY
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

  private isPanning = false
  private startPanX: number;
  private startPanY: number;
  @HostListener('pointerdown', ['$event'])
  pointerDown($event: PointerEvent): void {
    this.isPanning = true;
    this.startPanX = $event.clientX;
    this.startPanY = $event.clientY;
  }

  @HostListener('pointerup', ['$event'])
  pointerUp($event: PointerEvent): void {
    this.isPanning = false;
  }
  private movedX = 0;
  private movedY = 0;
  @HostListener('pointermove', ['$event'])
  pointerMove($event: PointerEvent): void {
    if(this.isPanning) {
      const panX = $event.clientX;
      const panY = $event.clientY;
      this.ctx.translate(panX - this.startPanX, panY - this.startPanY);
      this.draw();

      this.movedX += panX - this.startPanX;
      this.movedY += panY - this.startPanY;
      this.startPanX = panX;
      this.startPanY = panY;
    }
  }
}
