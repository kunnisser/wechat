import "./js/libs/index";
import "./js/libs/symbol";
globalThis.gl = globalThis.canvas.getContext("webgl", {
  alpha: false,
  antialias: false,
  premultipliedAlpha: true,
  stencil: true,
  preserveDrawingBuffer: false
});
