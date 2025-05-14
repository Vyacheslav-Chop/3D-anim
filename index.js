(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();const h={canvas:document.querySelector("#canvas"),gl:document.querySelector("#canvas").getContext("webgl")};function A(e,n){if(!e||!n)return;const s=n.parentElement,t=s.offsetWidth,r=s.offsetHeight;n.width=t,n.height=r,e.viewport(0,0,n.width,n.height)}function S(e,n=1){if(Array.isArray(e))return e.length===4?e:[...e,n];if(typeof e=="string"){if(e.startsWith("#")){const s=e.replace("#",""),t=parseInt(s,16),r=(t>>16&255)/255,a=(t>>8&255)/255,i=(t&255)/255;return[r,a,i,n]}if(e.startsWith("rgba")){const s=new RegExp("rgba|\\(|\\)|\\s","g"),t=e.replace(s,"").split(",").map((f,p)=>p<3?parseInt(f):parseFloat(f)),[r,a,i,m=1]=t;return[r/255,a/255,i/255,m]}if(e.startsWith("rgb")){const s=new RegExp("rgb|\\(|\\)|\\s","g");return[...e.replace(s,"").split(",").map(r=>parseInt(r)/255),n]}}return[0,0,0,1]}function R(e,n="#000000",s=1){const t=S(n,s);e.clearColor(...t),e.clear(e.COLOR_BUFFER_BIT)}const{canvas:b}=h;let u=0,c=new Float32Array([-.5,-.5,.5,-.5,0,.5]);const o=document.querySelector("#canvas").getContext("webgl2")||document.querySelector("#canvas").getContext("webgl");if(!o)console.error("Не вдалося отримати контекст WebGL!");else{document.addEventListener("DOMContentLoaded",()=>{A(o,b),R(o),requestAnimationFrame(l)});const e=`
    precision mediump float;
    attribute vec4 a_position;
    varying vec4 v_color;

    void main() {
      v_color = vec4(1.0, 0.0, 0.5, 1.0);
      gl_Position = a_position;
    }
  `,n=`
    precision mediump float;
    varying vec4 v_color;

    void main() {
      gl_FragColor = v_color;
    }
  `,s=d(o,o.VERTEX_SHADER,e),t=d(o,o.FRAGMENT_SHADER,n);if(!s||!t)console.error("Не вдалося створити шейдери");else{const r=_(o,s,t);o.useProgram(r);const a=o.getAttribLocation(r,"a_position"),i=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,i),o.bufferData(o.ARRAY_BUFFER,c,o.STATIC_DRAW),o.vertexAttribPointer(a,2,o.FLOAT,!1,0,0),o.enableVertexAttribArray(a),o.clearColor(.1,.1,.1,1),o.clear(o.COLOR_BUFFER_BIT),g(c),requestAnimationFrame(l)}}function l(){u+=.01;const e=Math.cos(u),n=Math.sin(u);c=new Float32Array([-.5*e-.5*n,-.5*n+.5*e,.5*e-.5*n,-.5*n-.5*e,0,.5]),g(c),requestAnimationFrame(l)}function g(e){o.clear(o.COLOR_BUFFER_BIT),o.bufferData(o.ARRAY_BUFFER,e,o.STATIC_DRAW),o.drawArrays(o.TRIANGLES,0,3)}function d(e,n,s){const t=e.createShader(n);return e.shaderSource(t,s),e.compileShader(t),e.getShaderParameter(t,e.COMPILE_STATUS)?(console.log("Шейдер успішно скомпільований"),t):(console.log("Помилка компіляції шейдера:"),console.log(e.getShaderInfoLog(t)),e.deleteShader(t),null)}function _(e,n,s){var t=e.createProgram();e.attachShader(t,n),e.attachShader(t,s),e.linkProgram(t);var r=e.getProgramParameter(t,e.LINK_STATUS);return r?t:(console.log("Помилка лінкування програми:"),console.log(e.getProgramInfoLog(t)),e.deleteProgram(t),null)}
//# sourceMappingURL=index.js.map
