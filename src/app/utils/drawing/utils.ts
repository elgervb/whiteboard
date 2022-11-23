import { Rgb } from '../color/rgb';

import { Point } from './models';

export function distanceBetween(point1: Point, point2: Point) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
export function angleBetween(point1: Point, point2: Point) {
  return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

export function getColor(ctx: CanvasRenderingContext2D, x: number, y: number): Rgb {
  const imgData = ctx.getImageData(x, y, 1, 1);

  return {
    r: imgData.data[0],
    g: imgData.data[1],
    b: imgData.data[2],
    a: imgData.data[3]
  };
}

export function averageColor(rgb1: Rgb, rgb2: Rgb): Rgb {
  const half = .5;

  return {
    r: Math.round(half * rgb1.r + half * rgb2.r),
    g: Math.round(half * rgb1.g + half * rgb2.g),
    b: Math.round(half * rgb1.b + half * rgb2.b),
    a: Math.round(half * rgb1.a + half * rgb2.a)
  };
}

export function getMousePosition(evt: MouseEvent, el: Element): Point {
  const box = el.getBoundingClientRect();

  return { x: evt.clientX - box.left, y: evt.clientY - box.top };
}
