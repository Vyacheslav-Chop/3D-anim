import { refs } from './refs';
import { setViewport } from './viewport';
import { clearScene } from './color';
const { canvas } = refs;

let angle = 0;
let vertices = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]);

const gl =
  document.querySelector('#canvas').getContext('webgl2') ||
  document.querySelector('#canvas').getContext('webgl');

if (!gl) {
  console.error('Не вдалося отримати контекст WebGL!');
} else {
  document.addEventListener('DOMContentLoaded', () => {
    setViewport(gl, canvas);
    clearScene(gl);

    requestAnimationFrame(animate);
  });

  const vertexShaderSource = `
    precision mediump float;
    attribute vec4 a_position;
    varying vec4 v_color;

    void main() {
      v_color = vec4(1.0, 0.0, 0.5, 1.0);
      gl_Position = a_position;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    varying vec4 v_color;

    void main() {
      gl_FragColor = v_color;
    }
  `;

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  if (!vertexShader || !fragmentShader) {
    console.error('Не вдалося створити шейдери');
  } else {
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    const positionAttributeLocation = gl.getAttribLocation(
      program,
      'a_position'
    );

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    drawTriangle(vertices);
    requestAnimationFrame(animate);
  }
}

function animate() {
  angle += 0.01;

  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);

  vertices = new Float32Array([
    -0.5 * cosAngle - 0.5 * sinAngle,
    -0.5 * sinAngle + 0.5 * cosAngle,
    0.5 * cosAngle - 0.5 * sinAngle,
    -0.5 * sinAngle - 0.5 * cosAngle,
    0.0,
    0.5,
  ]);

  drawTriangle(vertices);
  requestAnimationFrame(animate);
}

function drawTriangle(vertices) {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// Функція для створення шейдера
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    console.log('Шейдер успішно скомпільований');
    return shader;
  }
  console.log('Помилка компіляції шейдера:');
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

// Функція для створення програми
function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.log('Помилка лінкування програми:');
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}
