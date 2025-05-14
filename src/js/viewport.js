export function setViewport(gl, canvas) {
  if (!gl || !canvas) return;

  const container = canvas.parentElement;
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  canvas.width = containerWidth;
  canvas.height = containerHeight;

  gl.viewport(0, 0, canvas.width, canvas.height);
}
