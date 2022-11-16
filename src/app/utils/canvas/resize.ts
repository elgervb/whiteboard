
/**
 * Resize the canvas Element. When height and width are not passed, it will fallback to the dimensions of the window
 */
export function resize(element: HTMLCanvasElement, height?: number, width?: number ) {
  height = height || window.innerHeight;
  width = width || window.innerWidth;

  element.height = height || window.innerHeight;
  element.width = width || window.innerWidth;
}
