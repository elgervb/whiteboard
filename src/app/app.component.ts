import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

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

    this.positionCanvas();
    this.draw();
  }

  private scale = 0;
  private scaleFactor = .00008
  @HostListener('wheel', ['$event'])
  onWheel($event: WheelEvent): void {
    $event.preventDefault();
    let scale = this.scale - $event.deltaY * this.scaleFactor;
    scale = Math.max(1, Math.min(10, scale));

    this.scale = scale;
    this.ctx.translate($event.screenX/this.scale, $event.screenY/this.scale);
    this.ctx.scale(this.scale, this.scale)
    this.ctx.translate(-($event.screenX/this.scale), -($event.screenY/this.scale));

    this.draw();
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
    const {height, width} = this.whiteboard.nativeElement;
    const gridGap = 100;

    this.ctx.lineWidth = 1;

    const startX = -this.movedX + (this.movedX % gridGap) + 0.5;
    const startY = -this.movedY + (this.movedY % gridGap) + 0.5;
    const correctedHeight = height - this.movedY;
    const correctedWidth = width - this.movedX;

    for (let x = startX; x < correctedWidth; x += gridGap) {
      this.ctx.moveTo(x, startY - (this.movedY % gridGap));
      this.ctx.lineTo(x, correctedHeight);
    }
    this.ctx.strokeStyle = '#d4d4d4';
    this.ctx.stroke();

    for (let y = startY; y < correctedHeight; y += gridGap) {
      this.ctx.moveTo(startX - (this.movedX % gridGap), y);
      this.ctx.lineTo(correctedWidth, y);
    }
    this.ctx.stroke();
  }

  @HostListener('window:resize')
  private positionCanvas(): void {
    const element = this.whiteboard.nativeElement;
    element.height = window.innerHeight;
    element.width = window.innerWidth;

    this.draw();
  }


  private clearCanvas(): void {
    const {height, width} = this.whiteboard.nativeElement;
    // Store the current transformation matrix
    this.ctx.save();

    // Use the identity matrix while clearing the canvas
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, width, height);

    // Restore the transform
    this.ctx.restore();
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
