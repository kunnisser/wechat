globalThis.DOMParser = require('domParser/dom-parser').DOMParser;
import './js/libs/index';
import './js/libs/symbol';
// 预先创建webgl上下文，否则IOS 高性能模式会停留在封面无法渲染canvas
globalThis.gl = globalThis.canvas.getContext('webgl', {
  alpha: false,
  antialias: false,
  premultipliedAlpha: true,
  stencil: true,
  preserveDrawingBuffer: false,
});
