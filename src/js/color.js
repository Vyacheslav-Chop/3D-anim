import { parseColorToRGBA } from './utils';

export function clearScene(gl, color = '#000000', opacity = 1.0) {
  const rgba = parseColorToRGBA(color, opacity);

  gl.clearColor(...rgba);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
